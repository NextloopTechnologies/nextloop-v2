/**
 * JSON-LD builders for the entity types this site actually has.
 *
 * Beyond classic SEO, these are what answer engines (AI Overviews, Perplexity,
 * ChatGPT search) and Google's specialised surfaces read. Two are worth calling
 * out because they unlock placements the site cannot get today:
 *
 *  - `JobPosting` is the schema behind the Google Jobs carousel. Without it,
 *    64 live job postings are invisible to the single biggest source of job
 *    search traffic.
 *  - `FAQPage` is the schema most often lifted verbatim into AI answers, and
 *    the domain pages already have FAQ content rendered as plain markup.
 */

const SITE = 'https://www.nextlooptechnologies.com';
const ORG_ID = `${SITE}/#organization`;

export const organizationRef = { '@id': ORG_ID };

/** Article — for blog posts. */
export const articleSchema = (a: {
  title: string;
  description?: string;
  url: string;
  image?: string;
  datePublished?: string;
  dateModified?: string;
  authorName?: string;
  wordCount?: number;
}) => ({
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  // `.slice` on a null title threw during render — after getServerSideProps
  // had already succeeded, so the route's own try/catch could not see it and
  // /blog/<slug> returned a hard 500 for that one post.
  headline: (a.title ?? '').slice(0, 110),
  ...(a.description ? { description: a.description } : {}),
  mainEntityOfPage: { '@type': 'WebPage', '@id': a.url },
  url: a.url,
  ...(a.image ? { image: [a.image] } : {}),
  ...(a.datePublished ? { datePublished: a.datePublished } : {}),
  // Falls back to publish date rather than "now" — a dateModified that is always
  // today is a false freshness signal, which is what the old schema emitted.
  ...(a.dateModified || a.datePublished
    ? { dateModified: a.dateModified ?? a.datePublished }
    : {}),
  author: a.authorName
    ? { '@type': 'Person', name: a.authorName }
    : { '@type': 'Organization', name: 'Nextloop Technologies', ...organizationRef },
  publisher: {
    '@type': 'Organization',
    name: 'Nextloop Technologies',
    ...organizationRef,
    logo: { '@type': 'ImageObject', url: `${SITE}/images/logo.png` },
  },
  ...(a.wordCount ? { wordCount: a.wordCount } : {}),
});

/**
 * JobPosting — the schema Google Jobs indexes.
 *
 * `datePosted` and `hiringOrganization` are required; `validThrough` is strongly
 * recommended or listings get aged out. Salary is omitted rather than guessed:
 * a wrong `baseSalary` is worse than none.
 */
export const jobPostingSchema = (j: {
  title: string;
  description: string;
  url: string;
  datePosted?: string;
  validThrough?: string;
  location?: string;
  jobMode?: string | null;
  jobType?: string | null;
}) => {
  const remote = (j.jobMode ?? '').toLowerCase() === 'remote';
  const employmentType = ({
    'Full Time': 'FULL_TIME',
    'Part Time': 'PART_TIME',
    Contract: 'CONTRACTOR',
  } as Record<string, string>)[j.jobType ?? ''];

  return {
    '@context': 'https://schema.org',
    '@type': 'JobPosting',
    title: j.title,
    description: j.description,
    url: j.url,
    ...(j.datePosted ? { datePosted: j.datePosted } : {}),
    ...(j.validThrough ? { validThrough: j.validThrough } : {}),
    ...(employmentType ? { employmentType } : {}),
    hiringOrganization: {
      '@type': 'Organization',
      name: 'Nextloop Technologies',
      sameAs: SITE,
      logo: `${SITE}/images/logo.png`,
    },
    ...(remote
      ? {
          jobLocationType: 'TELECOMMUTE',
          applicantLocationRequirements: { '@type': 'Country', name: 'IN' },
        }
      : {
          jobLocation: {
            '@type': 'Place',
            address: {
              '@type': 'PostalAddress',
              addressLocality: j.location || 'Indore',
              addressRegion: 'Madhya Pradesh',
              addressCountry: 'IN',
            },
          },
        }),
  };
};

/** BreadcrumbList — renders the path under the result instead of a bare URL. */
export const breadcrumbSchema = (crumbs: { name: string; path: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: crumbs.map((c, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: c.name,
    item: `${SITE}${c.path}`,
  })),
});

/** FAQPage — the schema most readily quoted by AI answer engines. */
export const faqSchema = (faqs: { question: string; answer: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((f) => ({
    '@type': 'Question',
    name: f.question,
    acceptedAnswer: { '@type': 'Answer', text: f.answer },
  })),
});

/** CreativeWork — for portfolio case studies. */
export const caseStudySchema = (c: {
  title: string;
  description?: string;
  url: string;
  image?: string;
}) => ({
  '@context': 'https://schema.org',
  '@type': 'CreativeWork',
  name: c.title,
  ...(c.description ? { description: c.description } : {}),
  url: c.url,
  ...(c.image ? { image: c.image } : {}),
  creator: { '@type': 'Organization', name: 'Nextloop Technologies', ...organizationRef },
});

/** Strips HTML and collapses whitespace, for descriptions built from body copy. */
export const toPlainText = (html: string | null | undefined, maxLength = 160): string => {
  if (!html) return '';
  const text = html
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/\s+/g, ' ')
    .trim();
  if (text.length <= maxLength) return text;
  // Cut on a word boundary so descriptions don't end mid-word.
  return `${text.slice(0, maxLength - 1).replace(/\s+\S*$/, '')}…`;
};
