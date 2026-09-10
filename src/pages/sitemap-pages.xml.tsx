import type { GetServerSideProps } from 'next';

import { renderUrlset, resolveBaseUrl, STATIC_ROUTES, XML_HEADERS } from '../utils/sitemap';

/** The 27 advertised static routes. No database, so this one cannot degrade. */

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const xml = renderUrlset(STATIC_ROUTES, resolveBaseUrl(req));

  Object.entries(XML_HEADERS).forEach(([key, value]) => res.setHeader(key, value));
  res.write(xml);
  res.end();

  return { props: {} };
};

const SitemapPages = () => null;
export default SitemapPages;
