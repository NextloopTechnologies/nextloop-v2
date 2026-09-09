import { resendAdapter } from '@payloadcms/email-resend';
import type { EmailAdapter } from 'payload';

/**
 * Outbound email.
 *
 * The bug this exists to fix is not "Payload cannot send email" — it is that
 * without an adapter Payload substitutes a console logger, and every send
 * *appears to succeed*. `POST /payload-api/users/forgot-password` returned HTTP
 * 200 `{"message":"Success"}` while writing the reset link to the server
 * console, so a locked-out admin was told to check their inbox for a mail that
 * was never going to arrive. A visible failure would have been recoverable;
 * an invisible one is not.
 *
 * (Worth separating the two halves of that: forgot-password returning success
 * for an address that does not exist is deliberate and correct — it stops the
 * endpoint being used to enumerate accounts. Returning success when no mail
 * could possibly be sent is the part that was wrong.)
 *
 * So the rule here is that a misconfigured mailer is loud everywhere it can be:
 *
 *  - **At boot**, in production, `assertEmailConfigured` logs an error naming
 *    the missing variables. It does not throw: refusing to start the whole
 *    marketing site because password resets are unavailable would trade a small
 *    outage for a total one.
 *  - **On send**, the fallback adapter throws instead of pretending. A 500 on
 *    forgot-password is a bad day; a silent success is a bad quarter.
 *  - **In development**, no adapter is returned at all, so Payload's console
 *    logger takes over. Printing a reset link to the terminal is genuinely the
 *    most useful behaviour locally, and there is no one to mislead.
 *
 * Every value is server-only. None of these may ever take a `NEXT_PUBLIC_`
 * prefix — that would inline the API key into the browser bundle.
 */

interface EmailSettings {
  apiKey: string;
  fromAddress: string;
  fromName: string;
}

const read = (): Partial<EmailSettings> => ({
  apiKey: process.env.RESEND_API_KEY || undefined,
  fromAddress: process.env.EMAIL_FROM_ADDRESS || undefined,
  fromName: process.env.EMAIL_FROM_NAME || 'NextLoop Technologies',
});

/** Names of the settings that are missing. Never the values. */
export const missingEmailSettings = (): string[] => {
  const settings = read();
  const missing: string[] = [];
  if (!settings.apiKey) missing.push('RESEND_API_KEY');
  if (!settings.fromAddress) missing.push('EMAIL_FROM_ADDRESS');
  return missing;
};

export const emailConfigured = (): boolean => missingEmailSettings().length === 0;

/**
 * An adapter that fails honestly.
 *
 * Used in production when the real one cannot be built. It satisfies the
 * interface, so Payload boots and the site serves; it throws on send, so the
 * failure surfaces at the point where a human is waiting for an email rather
 * than being swallowed.
 */
const unconfiguredAdapter = (missing: string[]): EmailAdapter => () => ({
  name: 'unconfigured',
  defaultFromAddress: 'noreply@invalid',
  defaultFromName: 'NextLoop Technologies',
  sendEmail: async () => {
    throw new Error(
      `Refusing to send: email is not configured. Missing ${missing.join(', ')}.`
    );
  },
});

/**
 * Logs, once, if production is running without a mailer. Called from the
 * config so it runs at boot rather than on the first send — the point is that
 * somebody sees it before a person is locked out, not after.
 */
export const assertEmailConfigured = (): void => {
  const missing = missingEmailSettings();
  if (missing.length === 0) return;

  if (process.env.NODE_ENV === 'production') {
    // eslint-disable-next-line no-console
    console.error(
      `[email] NOT CONFIGURED — missing ${missing.join(', ')}. ` +
        'Password resets, admin invites and lead notifications will fail loudly ' +
        'until these are set.'
    );
  }
};

export const buildEmailAdapter = (): EmailAdapter | undefined => {
  const missing = missingEmailSettings();

  if (missing.length === 0) {
    const { apiKey, fromAddress, fromName } = read() as EmailSettings;
    return resendAdapter({
      apiKey,
      defaultFromAddress: fromAddress,
      defaultFromName: fromName,
      /**
       * A staging deploy pointed at production data would otherwise mail real
       * candidates and real leads while someone is clicking around testing.
       * Setting this redirects every recipient to one inbox.
       */
      ...(process.env.EMAIL_OVERRIDE_RECIPIENT
        ? { overrideRecipientAddress: process.env.EMAIL_OVERRIDE_RECIPIENT }
        : {}),
    });
  }

  // Development: let Payload's console logger take over. Useful, and nobody is
  // being told an email was sent to them.
  if (process.env.NODE_ENV !== 'production') return undefined;

  return unconfiguredAdapter(missing);
};
