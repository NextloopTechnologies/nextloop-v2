export function getBaseUrl(router?: { basePath?: string }) {
  const basePath = router?.basePath ?? '';

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (siteUrl) {
    return `${siteUrl.replace(/\/$/, '')}${basePath}`;
  }

  if (typeof window !== 'undefined') {
    return `${window.location.origin}${basePath}`;
  }

  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}${basePath}`;
  }

  return `http://localhost:3000${basePath}`;
}
