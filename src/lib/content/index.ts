import type { BlogType, DBOffer, IPortfolio, Job } from '../../types';

/**
 * The one place the front end asks for content.
 *
 * The site reads from Supabase today and will read from Payload once the data
 * is migrated. Those two events are deliberately separated: the panel has to be
 * trusted before ~7,590 rows move, and after they move there is no going back.
 * So both readers exist side by side behind `CONTENT_SOURCE`, and **Supabase
 * stays the default** — a deploy that forgets the flag serves exactly what it
 * serves today rather than an empty site.
 *
 * Every function returns the same view types the pages already use, so the
 * components are untouched by the switch. That is the point: if a page renders
 * differently under the two sources, the adapter is wrong, and the regression
 * suite can prove it by running the same assertions against each.
 *
 * The Payload reader is imported dynamically. Pulling the Payload config into
 * the pages-router bundle would drag the whole admin dependency tree into every
 * page's server build for a flag that is off.
 */

export type ContentSource = 'supabase' | 'payload';

export const contentSource: ContentSource =
  process.env.CONTENT_SOURCE === 'payload' ? 'payload' : 'supabase';

/**
 * Not-found and failure are different outcomes and the pages treat them
 * differently: a missing slug must 404 (a soft 200 let Google index unlimited
 * junk URLs), while a database failure shows an error and must not 404, or an
 * outage would quietly deindex the whole section. So: `null` means "no such
 * document", and anything genuinely broken throws.
 */
export interface ContentReader {
  listBlogs(): Promise<BlogType[]>;
  /**
   * `includeDrafts` is only ever true behind a verified preview token. It is an
   * explicit argument rather than ambient state so that every caller able to
   * surface an unpublished post is visible in a grep for the word.
   */
  getBlogBySlug(slug: string, includeDrafts?: boolean): Promise<BlogType | null>;
  listJobs(): Promise<Job[]>;
  getJobByRef(ref: string): Promise<Job | null>;
  listPortfolio(): Promise<IPortfolio[]>;
  getPortfolioByRef(ref: string): Promise<IPortfolio | null>;
  /** Offers shown on /get-offer/specialoffers/. Read, not a write path. */
  listOffers(): Promise<DBOffer[]>;
}

const reader = async (): Promise<ContentReader> => {
  if (contentSource === 'payload') {
    const mod = await import('./payload');
    return mod.payloadReader;
  }
  const mod = await import('./supabase');
  return mod.supabaseReader;
};

export const listBlogs = async () => (await reader()).listBlogs();
export const getBlogBySlug = async (slug: string, includeDrafts = false) =>
  (await reader()).getBlogBySlug(slug, includeDrafts);
export const listJobs = async () => (await reader()).listJobs();
export const getJobByRef = async (ref: string) => (await reader()).getJobByRef(ref);
export const listPortfolio = async () => (await reader()).listPortfolio();
export const getPortfolioByRef = async (ref: string) => (await reader()).getPortfolioByRef(ref);
export const listOffers = async () => (await reader()).listOffers();
