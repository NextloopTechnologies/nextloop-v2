export function getBaseUrl() {
  // Browser
  if (typeof window !== 'undefined') {
    return window.location.origin;
  }

  // Vercel server (preview + production)
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  // Local dev fallback
  return process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';
}
