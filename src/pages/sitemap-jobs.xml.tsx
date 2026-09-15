import type { GetServerSideProps } from 'next';

import { jobEntries, renderUrlset, resolveBaseUrl, XML_HEADERS } from '../utils/sitemap';

/**
 * Jobs only, so this file can be submitted to Google Jobs on its own.
 *
 * The 64 live postings now carry `JobPosting` JSON-LD (commit `417a994`) but
 * had no path into the index at all — the static sitemap listed `/career/` and
 * stopped there, and nothing on the site links to an individual posting except
 * that one listing page.
 */

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const xml = renderUrlset(await jobEntries(), resolveBaseUrl(req));

  Object.entries(XML_HEADERS).forEach(([key, value]) => res.setHeader(key, value));
  res.write(xml);
  res.end();

  return { props: {} };
};

const SitemapJobs = () => null;
export default SitemapJobs;
