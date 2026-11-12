import type { BlogType } from '../types';

/**
 * The one place the site decides what date a blog post carries.
 *
 * `published_at` is what an editor sets in the panel and what every visible
 * date on the site should be. `created_at` is when the row was written, which
 * is only the same thing by coincidence: a post drafted for a week, imported,
 * or deliberately backdated has two different dates, and until now the site
 * printed the wrong one of them with no way to correct it.
 *
 * The fallback is not a nicety. Supabase has no such column — the field exists
 * only in Payload — so under `CONTENT_SOURCE=supabase` every post arrives
 * without one and must keep rendering exactly what it renders today. Drafts
 * reached through the preview route have none either, by design.
 */
type DatedBlog = Pick<BlogType, 'published_at' | 'created_at'>;

/**
 * Dates are formatted in one fixed zone rather than the viewer's.
 *
 * A publication date is a fact about the post, not about who is reading it:
 * pinning the zone means London and Chicago are told the same day, and the
 * server-rendered HTML matches what React renders after hydration instead of
 * quietly disagreeing by a day for anyone east or west of the build machine.
 *
 * It has to be India specifically because of how the field is captured. The
 * panel's day-only picker sends local midnight, so an editor in IST choosing
 * 13 November stores `2026-11-12T18:30:00Z`. Read back in UTC that is the
 * 12th — the date would be a day earlier than the one they picked, on every
 * post, forever. Read back in Asia/Kolkata it is the 13th.
 */
const DISPLAY_TIME_ZONE = 'Asia/Kolkata';

const DEFAULT_FORMAT: Intl.DateTimeFormatOptions = {
  day: '2-digit',
  month: 'long',
  year: 'numeric',
};

/** The ISO timestamp to show for a post, or null if it has neither date. */
export const blogDate = (blog: DatedBlog): string | null =>
  blog.published_at || blog.created_at || null;

/**
 * The same date as a sortable number, for ordering a list by what it displays.
 *
 * An unparseable or missing date sorts last under a descending comparator
 * rather than throwing the whole order out: `NaN` makes every comparison
 * false, which leaves a list half-sorted in a way that is hard to see.
 */
export const blogDateValue = (blog: DatedBlog): number => {
  const iso = blogDate(blog);
  const ms = iso ? new Date(iso).getTime() : NaN;
  return Number.isNaN(ms) ? -Infinity : ms;
};

/** Formats a post's date for display, or returns undefined if there is none. */
export const formatBlogDate = (
  blog: DatedBlog,
  format: Intl.DateTimeFormatOptions = DEFAULT_FORMAT
): string | undefined => {
  const iso = blogDate(blog);
  if (!iso) return undefined;
  const parsed = new Date(iso);
  if (Number.isNaN(parsed.getTime())) return undefined;
  return parsed.toLocaleDateString('en-GB', {
    ...format,
    timeZone: DISPLAY_TIME_ZONE,
  });
};
