import crypto from 'crypto';

/**
 * Draft preview tokens.
 *
 * Previewing an unpublished post means asking the public blog route to render
 * something it is otherwise built to hide, so the gate matters more than the
 * feature. Three properties, each deliberate:
 *
 *  - **Scoped to one post.** The token carries the slug and is checked against
 *    the slug being rendered, so a token minted for one draft cannot open
 *    another. A single "preview mode" flag would unlock every unpublished post
 *    at once.
 *  - **Short-lived.** Thirty minutes. A preview link pasted into Slack stops
 *    working on its own rather than becoming a permanent bypass.
 *  - **Signed, not guessed.** HMAC over the payload with `PAYLOAD_SECRET`, so
 *    the blog page can verify without a database round trip and nobody can
 *    forge one by editing a cookie.
 *
 * The token is set as an httpOnly cookie by `/api/preview`, never placed in the
 * URL — a URL token ends up in browser history, referrer headers and any log
 * that records query strings.
 */

const TTL_MS = 30 * 60 * 1000;

export const PREVIEW_COOKIE = 'nl_preview';

interface PreviewClaim {
  slug: string;
  exp: number;
}

const b64url = (input: Buffer | string): string =>
  Buffer.from(input).toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');

const fromB64url = (input: string): Buffer =>
  Buffer.from(input.replace(/-/g, '+').replace(/_/g, '/'), 'base64');

const secret = (): string | null => {
  const value = process.env.PAYLOAD_SECRET;
  // Signing with a fallback would produce tokens anyone could mint. No secret
  // means no preview, which is the safe direction to fail.
  return value && value.length > 0 ? value : null;
};

const sign = (payload: string, key: string): string =>
  b64url(crypto.createHmac('sha256', key).update(payload).digest());

export const mintPreviewToken = (slug: string): string | null => {
  const key = secret();
  if (!key) return null;
  const claim: PreviewClaim = { slug, exp: Date.now() + TTL_MS };
  const payload = b64url(JSON.stringify(claim));
  return `${payload}.${sign(payload, key)}`;
};

/**
 * Returns true only for a well-formed, unexpired token whose slug matches.
 * Every failure path returns false rather than throwing — a malformed cookie is
 * an ordinary condition here, not an error worth taking a route down for.
 */
export const verifyPreviewToken = (token: unknown, slug: string): boolean => {
  const key = secret();
  if (!key || typeof token !== 'string') return false;

  const [payload, signature] = token.split('.');
  if (!payload || !signature) return false;

  const expected = sign(payload, key);
  // Constant-time: a length-varying compare leaks how much of a forged
  // signature was correct.
  const a = Buffer.from(signature);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return false;

  try {
    const claim = JSON.parse(fromB64url(payload).toString('utf8')) as PreviewClaim;
    if (typeof claim.exp !== 'number' || Date.now() > claim.exp) return false;
    return claim.slug === slug;
  } catch {
    return false;
  }
};

/** Read one cookie from a raw Cookie header without pulling in a parser. */
export const readCookie = (header: string | undefined, name: string): string | undefined => {
  if (!header) return undefined;
  for (const part of header.split(';')) {
    const [key, ...rest] = part.trim().split('=');
    if (key === name) return decodeURIComponent(rest.join('='));
  }
  return undefined;
};
