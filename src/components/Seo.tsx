import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';

import { getBaseUrl } from '../utils/getBaseUrl';

/**
 * Single place every page declares its search and social metadata.
 *
 * Written against three findings from the site audit:
 *  1. Eight routes shipped with no `<title>` at all — blog posts, portfolio
 *     detail, career detail, /domain, /domain/hotel, /get-offer,
 *     /get-offer/specialoffers and the 404 page.
 *  2. There were no Open Graph or Twitter tags anywhere, so every link shared
 *     to LinkedIn, WhatsApp or Slack rendered as a bare URL.
 *  3. Canonicals were built from `router.asPath`, which includes the query
 *     string — so `/portfolio/4/?scrollToHeader=true` self-canonicalised to a
 *     parameterised URL, splitting signals with the clean one.
 */

const SITE_NAME = 'Nextloop Technologies';
const DEFAULT_OG_IMAGE = '/images/who-we-are.jpg';
const TWITTER_HANDLE = '@nextloop';

export type SeoProps = {
  title: string;
  description?: string;
  /** Absolute or site-relative. Falls back to the org image. */
  image?: string;
  /** Override the derived canonical — use only for syndicated content. */
  canonical?: string;
  /** 'article' for blog posts, 'website' otherwise. */
  type?: 'website' | 'article';
  /** Keeps a page out of the index without removing it from the site. */
  noindex?: boolean;
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  /** One or more JSON-LD graphs. */
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
  children?: React.ReactNode;
};

/** Query strings and hashes must never appear in a canonical. */
export const cleanCanonical = (asPath: string, baseUrl: string): string => {
  const pathOnly = asPath.split('?')[0]?.split('#')[0] ?? '/';
  return new URL(pathOnly, baseUrl).toString();
};

/** Resolve against the site root, or null if there is nothing to resolve. */
const toAbsolute = (url: string | undefined | null, baseUrl: string): string | null => {
  const trimmed = url?.trim();
  if (!trimmed) return null;
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  try {
    return new URL(trimmed, baseUrl).toString();
  } catch {
    return null;
  }
};

/** Images fall back to the org image; a canonical must never fall back to one. */
const absoluteImage = (url: string | undefined, baseUrl: string): string =>
  toAbsolute(url, baseUrl) ?? new URL(DEFAULT_OG_IMAGE, baseUrl).toString();

export const Seo: React.FC<SeoProps> = ({
  title,
  description,
  image,
  canonical,
  type = 'website',
  noindex = false,
  publishedTime,
  modifiedTime,
  author,
  jsonLd,
  children,
}) => {
  const router = useRouter();
  const baseUrl = getBaseUrl(router);
  // The override comes from a database column, so it can be relative or
  // host-only. A relative canonical resolves against the current page —
  // href="www.example.com/x" on /blog/y becomes /blog/y/www.example.com/x,
  // which 404s and de-indexes the post. Normalised like every other URL here.
  const url = toAbsolute(canonical, baseUrl) ?? cleanCanonical(router.asPath, baseUrl);
  const ogImage = absoluteImage(image, baseUrl);
  const graphs = jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : [];

  return (
    <Head>
      <title>{title}</title>
      {description && <meta key='description' name='description' content={description} />}
      <link key='canonical' rel='canonical' href={url} />
      {noindex && <meta name='robots' content='noindex,follow' />}

      {/* Open Graph — previously absent site-wide */}
      <meta key='og:site_name' property='og:site_name' content={SITE_NAME} />
      <meta key='og:type' property='og:type' content={type} />
      <meta key='og:title' property='og:title' content={title} />
      {description && <meta key='og:description' property='og:description' content={description} />}
      <meta key='og:url' property='og:url' content={url} />
      <meta key='og:image' property='og:image' content={ogImage} />
      <meta key='og:image:width' property='og:image:width' content='1200' />
      <meta key='og:image:height' property='og:image:height' content='630' />
      <meta key='og:locale' property='og:locale' content='en_US' />
      {type === 'article' && publishedTime && (
        <meta property='article:published_time' content={publishedTime} />
      )}
      {type === 'article' && modifiedTime && (
        <meta property='article:modified_time' content={modifiedTime} />
      )}
      {type === 'article' && author && <meta property='article:author' content={author} />}

      {/* Twitter / X */}
      <meta key='twitter:card' name='twitter:card' content='summary_large_image' />
      <meta key='twitter:site' name='twitter:site' content={TWITTER_HANDLE} />
      <meta key='twitter:title' name='twitter:title' content={title} />
      {description && <meta key='twitter:description' name='twitter:description' content={description} />}
      <meta key='twitter:image' name='twitter:image' content={ogImage} />

      {graphs.map((graph, i) => (
        <script
          // eslint-disable-next-line react/no-array-index-key
          key={`ld-${i}`}
          type='application/ld+json'
          dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
        />
      ))}

      {children}
    </Head>
  );
};

export default Seo;
