import type { NextApiRequest, NextApiResponse } from 'next';

import {
  createAppliedJob,
  createEnquiry,
  createOfferApplication,
  createPopupSubmission,
  selectOffer,
  type WriteResult,
} from '../../../lib/content/writes';

/**
 * The single door every public form now writes through.
 *
 * Before this, all four forms inserted into Supabase from the browser using the
 * anon key. Three things followed from that, and all three are fixed by moving
 * the write here:
 *
 *  1. The anon key had to be public and RLS had to be `FOR ALL TO public`, so
 *     anyone holding it could read and delete every row in every table. The
 *     site literally could not work otherwise.
 *  2. The popup's reCAPTCHA was decorative. The token was checked for existence
 *     in the browser and never sent anywhere, so a bot that skipped the UI and
 *     posted straight to PostgREST was entirely unaffected. It is verified with
 *     Google here, server-side, where the result cannot be skipped.
 *  3. Nothing was rate-limited or validated beyond what the form itself did.
 *
 * Deliberately not doing:
 *  - Turning this into a general write proxy. It accepts four known shapes and
 *    rejects everything else; a generic endpoint would just be the anon key
 *    again with extra steps.
 *  - Returning database errors to the caller. A submitter gets "we could not
 *    save this"; the detail goes to the server log.
 */

type Kind = 'enquiry' | 'application' | 'offer' | 'offer-select' | 'popup';

const KINDS: Kind[] = ['enquiry', 'application', 'offer', 'offer-select', 'popup'];

/** Kinds whose form renders a reCAPTCHA today, and must therefore pass one. */
const CAPTCHA_REQUIRED: Kind[] = ['popup'];

// ---------------------------------------------------------------------------
// Rate limiting
//
// In-memory, so it is per-instance and resets on deploy. That is a real
// limitation and worth naming: it slows a single crude source, it does not stop
// a distributed one. It is here because the alternative today is nothing at
// all; a shared store is the upgrade when there is somewhere to put it.
// ---------------------------------------------------------------------------

const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

const rateLimited = (ip: string): boolean => {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t: number) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);

  // Bound the map so a spray of unique IPs cannot grow it without limit.
  if (hits.size > 5000) {
    Array.from(hits.keys()).forEach((key) => {
      const times = hits.get(key) ?? [];
      if (times.every((t: number) => now - t >= WINDOW_MS)) hits.delete(key);
    });
  }
  return recent.length > MAX_PER_WINDOW;
};

const clientIp = (req: NextApiRequest): string => {
  const forwarded = req.headers['x-forwarded-for'];
  const first = Array.isArray(forwarded) ? forwarded[0] : forwarded?.split(',')[0];
  return (first ?? req.socket.remoteAddress ?? 'unknown').trim();
};

// ---------------------------------------------------------------------------
// Validation
// ---------------------------------------------------------------------------

const str = (value: unknown, max = 2000): string | undefined => {
  if (typeof value !== 'string') return undefined;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed.slice(0, max) : undefined;
};

/** Deliberately permissive: this rejects nonsense, the mail provider judges deliverability. */
const isEmail = (value: unknown): value is string =>
  typeof value === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim()) && value.length < 320;

/**
 * Is a real secret configured?
 *
 * A secret that equals the published site key is not a secret — it is the same
 * string the browser already has. In this repo's .env.local both variables hold
 * an identical 11-character placeholder, which means captcha verification
 * cannot succeed for anyone.
 *
 * That leaves a genuine choice, and neither default is obviously right:
 * enforcing would reject every popup submission until real keys are set, while
 * skipping quietly would be the security theatre this endpoint exists to
 * remove. So: enforcement is skipped only when the secret is *definitionally
 * absent* — missing, or identical to the public key — and says so loudly every
 * time. Once a real secret is set, enforcement is strict with no flag to flip.
 *
 * Validation and rate limiting apply either way.
 */
const captchaConfigured = (): boolean => {
  const secret = process.env.RECAPTCHA_SECRET_KEY;
  if (!secret) return false;
  if (secret === process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY) return false;
  return true;
};

const verifyCaptcha = async (token: unknown): Promise<boolean> => {
  const secret = process.env.RECAPTCHA_SECRET_KEY;
  if (!captchaConfigured()) {
    console.error(
      '[forms] reCAPTCHA is NOT configured (RECAPTCHA_SECRET_KEY is missing, or ' +
        'identical to NEXT_PUBLIC_RECAPTCHA_SITE_KEY). Submissions are accepted ' +
        'without captcha verification until a real secret is set.'
    );
    return true;
  }
  if (typeof token !== 'string' || token.length === 0) return false;

  try {
    const res = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ secret: secret as string, response: token }),
    });
    const body = (await res.json()) as { success?: boolean };
    return body.success === true;
  } catch (error) {
    console.error('[forms] captcha verification failed to complete', error);
    return false;
  }
};

// ---------------------------------------------------------------------------

const handlers: Record<Kind, (body: Record<string, unknown>) => Promise<WriteResult>> = {
  async enquiry(body) {
    const fullname = str(body.fullname, 200);
    const subject = str(body.subject, 300);
    if (!fullname || !isEmail(body.email) || !subject) {
      return { success: false, msgText: 'Name, a valid email and subject are required.', status: 400 };
    }
    return createEnquiry({
      fullname,
      email: (body.email as string).trim(),
      contact: str(body.contact, 50),
      subject,
      message: str(body.message, 5000),
    });
  },

  async application(body) {
    const fullname = str(body.fullname, 200);
    const phone = str(body.phone, 50);
    if (!fullname || !isEmail(body.email) || !phone) {
      return { success: false, msgText: 'Name, a valid email and phone are required.', status: 400 };
    }
    return createAppliedJob({
      job_id: typeof body.job_id === 'number' ? body.job_id : null,
      fullname,
      email: (body.email as string).trim(),
      phone,
      resume_url: str(body.resume_url, 1000) ?? '',
      resume_id: str(body.resume_id, 200) ?? '',
      cover_letter: str(body.cover_letter, 5000) ?? '',
      github_url: str(body.github_url, 500) ?? '',
      linkedin_url: str(body.linkedin_url, 500) ?? '',
      experience: str(body.experience, 50),
    });
  },

  async offer(body) {
    const name = str(body.name, 200);
    const mobile = str(body.mobile, 50);
    if (!name || !isEmail(body.email) || !mobile) {
      return { success: false, msgText: 'Name, a valid email and mobile are required.', status: 400 };
    }
    return createOfferApplication({
      name,
      email: (body.email as string).trim(),
      mobile,
      company_name: str(body.company_name, 200),
    });
  },

  async 'offer-select'(body) {
    const id = Number(body.id);
    const name = str(body.name, 200);
    const mobile = str(body.mobile, 50);
    if (!Number.isInteger(id) || id <= 0 || !name || !isEmail(body.email) || !mobile) {
      return { success: false, msgText: 'A valid application and offer are required.', status: 400 };
    }
    return selectOffer(id, {
      id,
      name,
      email: (body.email as string).trim(),
      mobile,
      offer_id: typeof body.offer_id === 'number' ? body.offer_id : undefined,
    });
  },

  async popup(body) {
    const name = str(body.name, 200);
    const service = str(body.service, 200);
    if (!name || !isEmail(body.email) || !service) {
      return { success: false, msgText: 'Name, a valid email and service are required.', status: 400 };
    }
    return createPopupSubmission({
      name,
      email: (body.email as string).trim(),
      service,
      phone: str(body.phone, 50),
      country: str(body.country, 100),
    });
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ success: false, msgText: 'Method not allowed.' });
  }

  const kind = String(req.query.kind ?? '') as Kind;
  if (!KINDS.includes(kind)) {
    return res.status(404).json({ success: false, msgText: 'Unknown form.' });
  }

  if (rateLimited(clientIp(req))) {
    return res
      .status(429)
      .json({ success: false, msgText: 'Too many submissions. Please wait a moment.' });
  }

  const body = (typeof req.body === 'object' && req.body !== null ? req.body : {}) as Record<
    string,
    unknown
  >;

  // Honeypot. NOTE: no form renders this field yet, so today this catches
  // nothing — it is here so that adding a hidden `company_website` input to a
  // form is the whole change, with no server work. Answered with a success so a
  // bot learns nothing from the response.
  if (str(body.company_website)) {
    return res.status(200).json({ success: true, msgText: 'Created!', status: 201 });
  }

  // A token is verified whenever one is sent, even for the forms that do not yet
  // render the widget — so adding it to another form needs no change here.
  const needsCaptcha = CAPTCHA_REQUIRED.includes(kind) || body.captchaToken !== undefined;
  if (needsCaptcha && !(await verifyCaptcha(body.captchaToken))) {
    return res
      .status(400)
      .json({ success: false, msgText: 'Captcha verification failed. Please try again.' });
  }

  try {
    const result = await handlers[kind](body);
    return res.status(result.success ? 201 : result.status).json(result);
  } catch (error) {
    // The submitter gets nothing useful out of a database error, and a raw
    // PostgREST message is exactly the sort of thing that used to end up
    // rendered on a page.
    console.error(`[forms] ${kind} failed`, error);
    return res
      .status(500)
      .json({ success: false, msgText: 'We could not save that. Please try again.' });
  }
}
