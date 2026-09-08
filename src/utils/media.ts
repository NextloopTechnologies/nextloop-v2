import type { IFileUpload } from '../types';

/**
 * Reading the first image off a legacy `image` column.
 *
 * The two content tables disagree about how they store it, and the difference
 * is invisible until you look at the rendered page:
 *
 *  - `blogs.image` is `jsonb` holding `[{fileId, url}]`. `image[0]` is an
 *    object, so `image[0].url` works.
 *  - `portfolio.image` is `jsonb[]` — a Postgres *array of* jsonb. Each element
 *    comes back as a JSON **string**, so `image[0].url` is `undefined`.
 *
 * The seed script has always known this (`firstImage()` in seed-payload.mts
 * parses the string case); the front end never did. So every case study renders
 * `<img src="">` on the detail page and falls back to `/placeholder.png` on the
 * listing — a broken image that no status check or type checker can see, because
 * `as string` silences the one signal there was.
 *
 * Handles both shapes, plus a bare object and a bare JSON string, and returns
 * null rather than throwing on anything else. Cheap insurance: the cost of
 * being wrong about which shape a row uses is a broken image on a client-facing
 * case study.
 */
export const firstImage = (raw: unknown): IFileUpload | null => {
  if (!raw) return null;

  const first = Array.isArray(raw) ? raw[0] : raw;
  if (!first) return null;

  if (typeof first === 'string') {
    // A jsonb[] element, or a URL stored bare.
    if (/^https?:\/\//i.test(first)) return { fileId: '', url: first };
    try {
      const parsed = JSON.parse(first) as { url?: unknown; fileId?: unknown };
      return typeof parsed?.url === 'string'
        ? { fileId: typeof parsed.fileId === 'string' ? parsed.fileId : '', url: parsed.url }
        : null;
    } catch {
      return null;
    }
  }

  if (typeof first === 'object') {
    const { url, fileId } = first as { url?: unknown; fileId?: unknown };
    if (typeof url === 'string' && url.length > 0) {
      return { fileId: typeof fileId === 'string' ? fileId : '', url };
    }
  }

  return null;
};

/** The URL alone, or null. */
export const firstImageUrl = (raw: unknown): string | null => firstImage(raw)?.url ?? null;
