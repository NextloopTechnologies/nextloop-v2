import type { CollectionAfterChangeHook } from 'payload';

import { emailConfigured } from './email';

/**
 * Staff notification when a lead arrives.
 *
 * Until now a contact form submission landed in a table and nothing told
 * anybody. Whether that mattered depended entirely on someone remembering to
 * open the admin panel, which is not a process.
 *
 * Three properties matter more than the email itself:
 *
 *  1. **A submission is never lost to a mail failure.** The hook runs after the
 *     document is written, and every path through it is caught. If Resend is
 *     down, mid-outage, rate-limiting us, or simply not configured, the lead is
 *     still saved and the visitor still sees a success message. Notification is
 *     a courtesy to staff; the record is the product.
 *  2. **It cannot hang the form.** `afterChange` runs inside the request, so an
 *     unbounded await on a third-party API would sit between the visitor and
 *     their confirmation. The send is raced against a timeout.
 *  3. **Values are escaped.** These fields are attacker-controlled — anyone on
 *     the internet can put anything in a contact form — and they are being
 *     rendered as HTML into a colleague's inbox. Unescaped, the message body is
 *     a free hand at the layout of an email your team trusts.
 *
 * Fire-and-forget was the alternative to racing a timeout, and it is worse:
 * on a serverless host the function can be frozen the moment the response is
 * sent, so a detached promise is not guaranteed to run at all.
 */

const SEND_TIMEOUT_MS = 5_000;

/** Never render these into an email, whatever collection they came from. */
const SKIP_FIELD = /^(id|_.*|updatedAt|.*password.*|.*salt.*|.*hash.*|.*token.*|.*secret.*)$/i;

const escapeHtml = (value: string): string =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

const label = (key: string): string =>
  key
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/[_-]+/g, ' ')
    .replace(/^./, (c) => c.toUpperCase());

/** Render only what can be shown as a line of text; skip relationships and blobs. */
const renderable = (value: unknown): string | null => {
  if (value === null || value === undefined || value === '') return null;
  if (typeof value === 'string') return value;
  if (typeof value === 'number' || typeof value === 'boolean') return String(value);
  if (Array.isArray(value) && value.every((v) => typeof v === 'string')) return value.join(', ');
  return null;
};

const rows = (doc: Record<string, unknown>): string =>
  Object.entries(doc)
    .filter(([key]) => !SKIP_FIELD.test(key))
    .map(([key, value]) => [key, renderable(value)] as const)
    .filter((entry): entry is readonly [string, string] => entry[1] !== null)
    .map(
      ([key, value]) =>
        `<tr>` +
        `<td style="padding:6px 12px 6px 0;color:#666;vertical-align:top;white-space:nowrap">${escapeHtml(label(key))}</td>` +
        `<td style="padding:6px 0;color:#111">${escapeHtml(value).replace(/\n/g, '<br>')}</td>` +
        `</tr>`
    )
    .join('');

/**
 * Where notifications go. Absent means notifications are off — which is a
 * legitimate configuration, not an error, so it is not logged as one.
 */
const recipients = (): string[] =>
  (process.env.LEAD_NOTIFICATION_TO || '')
    .split(',')
    .map((address) => address.trim())
    .filter(Boolean);

export const leadNotificationsConfigured = (): boolean =>
  recipients().length > 0 && emailConfigured();

/**
 * Exported so the escaping can be tested directly. The interesting cases are
 * not "does it render a name" but "what happens when the name is
 * `<img onerror=...>`" — and that is only reachable from outside the hook.
 */
export const buildLeadEmailHtml = (
  subject: string,
  doc: Record<string, unknown>,
  adminUrl: string | null
): string =>
  `<div style="font-family:system-ui,-apple-system,Segoe UI,sans-serif;font-size:14px;line-height:1.5">` +
  `<p style="margin:0 0 16px">A new ${escapeHtml(subject)} came in through the website.</p>` +
  `<table style="border-collapse:collapse">${rows(doc)}</table>` +
  (adminUrl
    ? `<p style="margin:20px 0 0"><a href="${escapeHtml(adminUrl)}" style="color:#2563eb">Open it in the admin panel</a></p>`
    : '') +
  `</div>`;

/**
 * A subject line is a mail *header*, not body content. A CR or LF in it ends
 * the header and starts a new one, so an unfiltered name lets a form submitter
 * append `Bcc:` and quietly receive a copy of every notification. Control
 * characters are stripped and the result is bounded — the name here comes
 * straight off a public form.
 */
export const leadEmailSubject = (subject: string, doc: Record<string, unknown>): string => {
  const raw = String(doc.fullname || doc.name || doc.mail || doc.email || 'website');
  // eslint-disable-next-line no-control-regex
  const safe = raw.replace(/[\u0000-\u001f\u007f]+/g, ' ').trim().slice(0, 120);
  return `New ${subject} — ${safe || 'website'}`;
};

/**
 * Builds the `afterChange` hook for one submission collection.
 *
 * @param subject  human name for the thing that arrived, e.g. 'enquiry'
 */
export const notifyOnCreate =
  (subject: string): CollectionAfterChangeHook =>
  async ({ doc, operation, req, collection }) => {
    // Edits and imports are not new leads.
    if (operation !== 'create') return doc;

    const to = recipients();
    if (to.length === 0 || !emailConfigured()) return doc;

    try {
      const record = doc as Record<string, unknown>;
      const adminUrl = process.env.NEXT_PUBLIC_SITE_URL
        ? `${process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, '')}/admin/collections/${collection.slug}/${record.id}`
        : null;

      await Promise.race([
        req.payload.sendEmail({
          to,
          subject: leadEmailSubject(subject, record),
          html: buildLeadEmailHtml(subject, record, adminUrl),
        }),
        new Promise((_, reject) =>
          setTimeout(() => reject(new Error(`timed out after ${SEND_TIMEOUT_MS}ms`)), SEND_TIMEOUT_MS)
        ),
      ]);
    } catch (error) {
      // Deliberately swallowed. The document is already written; a mail problem
      // must not turn a captured lead into a failed submission.
      req.payload.logger.error(
        { err: error },
        `[notify] ${subject} saved, but the notification email failed`
      );
    }

    return doc;
  };
