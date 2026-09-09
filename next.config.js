/* eslint-disable import/no-extraneous-dependencies */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const withBundleAnalyzer = require('@next/bundle-analyzer')({
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
      "img-src 'self' data: https: " +
      'https://res.cloudinary.com ' +
      'https://embed.tawk.to ' +
      'https://*.tawk.to; ' +
      "media-src 'self' https://res.cloudinary.com; " +
      "style-src 'self' 'unsafe-inline' https://embed.tawk.to https://www.gstatic.com; " +
      "font-src 'self' data: https://embed.tawk.to; " +
      "frame-src 'self' https://embed.tawk.to https://www.google.com https://www.recaptcha.net;",
  },
];

/** @type {import('next').NextConfig} */
module.exports = withBundleAnalyzer({
  poweredByHeader: false,
  trailingSlash: true,
  basePath: '',
  reactStrictMode: true,

  async headers() {
    return [{ source: '/:path*', headers: securityHeaders }];
  },

  // 🔧 EMFILE / too-many-open-files FIX
  experimental: {
    workerThreads: false,
    cpus: 1,
  },

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ik.imagekit.io',
      },
    ],
  },
});
