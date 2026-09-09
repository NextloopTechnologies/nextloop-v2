import type { NextApiRequest, NextApiResponse } from 'next';

import { mintPreviewToken, PREVIEW_COOKIE } from '../../lib/preview';

/**
 * Entry point for the admin's Preview button.
 *
 * Authorisation is the whole point of this file, so it is worth being explicit
 * about what it does and does not rely on:
 *
 *  - It authenticates the **Payload session**, not a shared secret in the URL.
 *    A `?secret=` link is a password that lives in browser history, referrer
 *    headers and every access log it passes through, and it never expires. Here
 *    the caller must already be logged into the admin on this origin.
 *  - It mints a token scoped to a single slug and sets it as an httpOnly
 *    cookie, then redirects. The token never appears in a URL.
 *  - It redirects to the real page rather than rendering a special one, so what
 *    an editor previews is the actual template, not an approximation of it.
 */

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ message: 'Method not allowed.' });
  }

  const slug = typeof req.query.slug === 'string' ? req.query.slug.trim() : '';
  // Anything that could escape the /blog/ path is refused outright rather than
  // sanitised — an open redirect on an authenticated endpoint is worse than a
  // broken preview button.
  if (!slug || !/^[a-z0-9-]+$/i.test(slug)) {
    return res.status(400).json({ message: 'A valid slug is required.' });
  }

  try {
    const [{ getPayload }, config] = await Promise.all([
      import('payload'),
      import('@payload-config').then((m) => m.default),
    ]);
    const payload = await getPayload({ config });

    // The admin and the site share an origin, so the session cookie is already
    // on this request. Node types a header value as `string | string[]`, and
    // the Headers constructor rejects the array form, so build it explicitly
    // rather than casting and hoping no repeated header ever arrives.
    const headers = new Headers();
    Object.entries(req.headers).forEach(([key, value]) => {
      if (typeof value === 'string') headers.set(key, value);
      else if (Array.isArray(value)) value.forEach((v) => headers.append(key, v));
    });

    const { user } = await payload.auth({ headers });

    if (!user) {
      return res.status(401).json({ message: 'Log in to the admin to preview drafts.' });
    }

    const token = mintPreviewToken(slug);
    if (!token) {
      // mintPreviewToken only fails when PAYLOAD_SECRET is unset, which would
      // mean tokens anyone could forge.
      console.error('[preview] PAYLOAD_SECRET is not set — refusing to mint a preview token');
      return res.status(500).json({ message: 'Preview is not configured.' });
    }

    res.setHeader('Set-Cookie', [
      `${PREVIEW_COOKIE}=${encodeURIComponent(token)}`,
      'Path=/',
      'HttpOnly',
      'SameSite=Lax',
      `Max-Age=${30 * 60}`,
      ...(process.env.NODE_ENV === 'production' ? ['Secure'] : []),
    ].join('; '));

    return res.redirect(307, `/blog/${slug}/`);
  } catch (error) {
    console.error('[preview] failed', error);
    return res.status(500).json({ message: 'Preview failed.' });
  }
}
