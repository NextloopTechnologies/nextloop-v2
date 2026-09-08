/* eslint-disable import/no-extraneous-dependencies */
import { withPayload } from '@payloadcms/next/withPayload';
import bundleAnalyzer from '@next/bundle-analyzer';

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

const securityHeaders = [
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
  {
    key: 'Content-Security-Policy',
    value:
      "default-src 'self'; " +
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' " +
      'https://www.googletagmanager.com ' +
      'https://www.google-analytics.com ' +
      'https://aplo-evnt.com ' +
      'https://embed.tawk.to ' +
      'https://cdn.jsdelivr.net ' +
      'https://assets.apollo.io ' +
      'https://www.google.com ' +
      'https://www.gstatic.com; ' +
      "connect-src 'self' " +
      'https://aplo-evnt.com ' +
      'https://www.google-analytics.com ' +
      'https://*.google-analytics.com ' +
      'https://*.analytics.google.com ' +
      'https://www.googletagmanager.com ' +
      'https://embed.tawk.to ' +
      'wss://*.tawk.to ' +
      'https://*.tawk.to ' +
      'https://*.supabase.co; ' +
      "img-src 'self' data: blob: https: " +
      'https://res.cloudinary.com ' +
      'https://embed.tawk.to ' +
      'https://*.tawk.to; ' +
      "media-src 'self' blob: https://res.cloudinary.com; " +
      "style-src 'self' 'unsafe-inline' https://embed.tawk.to https://www.gstatic.com; " +
      "font-src 'self' data: https://embed.tawk.to; " +
      "frame-src 'self' https://embed.tawk.to https://www.google.com https://www.recaptcha.net;",
  },
];

/** @type {import('next').NextConfig} */
export default withPayload(withBundleAnalyzer({
  poweredByHeader: false,
  trailingSlash: true,
  basePath: '',
  reactStrictMode: true,

  async headers() {
    return [{ source: '/:path*', headers: securityHeaders }];
  },

  /**
   * Minification: on, by default, and deliberately not configured here.
   *
   * This config used to carry `swcMinify: true`. It was removed in the Next 15
   * upgrade (8e07e25) because the option no longer exists: SWC minification
   * became the default in Next 13.5 and the flag was dropped in 15. Leaving it
   * in does not enable anything — it produces an "Unrecognized key(s)" warning
   * on every build and is then ignored.
   *
   * If you are here because a build output looked unminified: check which build
   * you looked at. `.next/` from `npm run dev` is never minified and carries an
   * `eval-source-map` banner. A production chunk from `npm run build` is one
   * long line with mangled identifiers.
   *
   * The only minification knob Next 15 still has turns it OFF. Don't.
   */

  // 🔧 EMFILE / too-many-open-files FIX
  experimental: {
    workerThreads: false,
    cpus: 1,
  },

  images: {
    /**
     * Image URLs come out of the database, so a row can point anywhere. A host
     * that is not listed here fails differently in each environment and neither
     * failure is obvious: production serves a 400 from /_next/image (a broken
     * image), while the dev loader *throws*, taking the whole route down.
     *
     * The CSP below already permits Cloudinary, so legacy rows on that host are
     * plausible; listing it here makes the two agree. Add a host only when
     * content actually lives there — this list is what the optimiser is willing
     * to go and fetch on request.
     */
    remotePatterns: [
      { protocol: 'https', hostname: 'ik.imagekit.io' },
      { protocol: 'https', hostname: 'res.cloudinary.com' },
    ],
  },
}));
