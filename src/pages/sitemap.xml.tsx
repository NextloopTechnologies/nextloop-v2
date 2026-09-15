import type { GetServerSideProps } from 'next';

import { renderSitemapIndex, resolveBaseUrl, XML_HEADERS } from '../utils/sitemap';

/**
 * Sitemap index.
 *
 * Split into three children rather than one flat file so the job sitemap can be
 * submitted to Google Jobs on its own — job URLs benefit from being
 * discoverable independently of the marketing pages, and a crawler fetching
 * only the jobs file sees a change the moment a posting opens or closes.
 */

const CHILDREN = ['/sitemap-pages.xml', '/sitemap-content.xml', '/sitemap-jobs.xml'];

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const xml = renderSitemapIndex(CHILDREN, resolveBaseUrl(req));

  Object.entries(XML_HEADERS).forEach(([key, value]) => res.setHeader(key, value));
  res.write(xml);
  res.end();

  return { props: {} };
};

const SitemapIndex = () => null;
export default SitemapIndex;
