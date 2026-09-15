import type { GetServerSideProps } from 'next';

import {
  blogEntries,
  portfolioEntries,
  renderUrlset,
  resolveBaseUrl,
  XML_HEADERS,
} from '../utils/sitemap';

/**
 * Blog posts and case studies — none of which appeared in the old sitemap.
 *
 * The two queries settle independently: a failure in one must not cost us the
 * other, and an empty urlset is a valid sitemap where a 500 is not.
 */

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const [blogs, portfolio] = await Promise.all([blogEntries(), portfolioEntries()]);
  const xml = renderUrlset([...blogs, ...portfolio], resolveBaseUrl(req));

  Object.entries(XML_HEADERS).forEach(([key, value]) => res.setHeader(key, value));
  res.write(xml);
  res.end();

  return { props: {} };
};

const SitemapContent = () => null;
export default SitemapContent;
