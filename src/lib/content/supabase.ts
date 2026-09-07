import type { ContentReader } from './index';
import type { BlogType, IPortfolio, Job } from '../../types';
import supabaseClient from '../../utils/client';

/**
 * The reader the site uses today.
 *
 * These are the queries that were inline in each page's `getServerSideProps`,
 * moved verbatim — same filters, same ordering, same columns. Nothing here is
 * an improvement on what shipped, on purpose: this side of the seam is the
 * control the Payload side is measured against, so any behaviour change here
 * would corrupt the comparison.
 */

/** PostgREST's "no rows returned from .single()". A miss, not a failure. */
const NO_ROWS = 'PGRST116';

const fail = (context: string, message: string): never => {
  throw new Error(`${context}: ${message}`);
};

export const supabaseReader: ContentReader = {
  async listBlogs() {
    const { data, error } = await supabaseClient
      .from('blogs')
      .select('*')
      .eq('status', 'published')
      .order('created_at', { ascending: false });

    if (error) fail('listBlogs', error.message);
    return (data ?? []) as BlogType[];
  },

  async getBlogBySlug(slug) {
    const { data, error } = await supabaseClient
      .from('blogs')
      .select('*,author(*), categories(*)')
      .eq('status', 'published')
      .filter('slug', 'eq', slug)
      .single();

    if (error) {
      // Read the message before the narrowing below: `.single()` types `error`
      // as a discriminated union, and the NO_ROWS comparison narrows it to
      // `never` on the remaining branch.
      const { message } = error;
      if (error.code === NO_ROWS || !data) return null;
      fail('getBlogBySlug', message);
    }
    return (data as BlogType) ?? null;
  },

  async listJobs() {
    const { data, error } = await supabaseClient
      .from('jobs')
      .select('*')
      .filter('visibility', 'eq', true);

    if (error) fail('listJobs', error.message);
    return (data ?? []) as Job[];
  },

  async getJobByRef(ref) {
    // The live routes are /career/<numeric id>/. Slugs exist in Payload but no
    // job has ever been served by one, so a non-numeric ref cannot match here.
    if (!/^\d+$/.test(ref)) return null;

    const { data, error } = await supabaseClient
      .from('jobs')
      .select('*')
      .filter('id', 'eq', ref);

    if (error) fail('getJobByRef', error.message);
    const job = (data ?? [])[0] as (Job & { visibility?: boolean }) | undefined;
    if (!job) return null;
    // Hidden postings 404 rather than render: they are unlisted, not merely
    // unlinked, and a live URL for a closed role is worse than a 404.
    if (job.visibility === false) return null;
    return job;
  },

  async listPortfolio() {
    const { data, error } = await supabaseClient
      .from('portfolio')
      .select('id, title, image')
      .order('id', { ascending: false });

    if (error) fail('listPortfolio', error.message);
    return (data ?? []) as IPortfolio[];
  },

  async getPortfolioByRef(ref) {
    if (!/^\d+$/.test(ref)) return null;

    const { data, error } = await supabaseClient
      .from('portfolio')
      .select('id, title, descp, image')
      .filter('id', 'eq', ref)
      .single();

    if (error) {
      const { message } = error;
      if (error.code === NO_ROWS || !data) return null;
      fail('getPortfolioByRef', message);
    }
    return (data as IPortfolio) ?? null;
  },
};
