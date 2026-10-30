import { listBlogs } from '../lib/content';
import { BlogData } from '../types';

const LIVE_ORIGIN = 'https://www.nextlooptechnologies.com';

const toCard = (blog: {
  id: number;
  title: string;
  slug?: string | null;
  descp: string;
  image?: BlogData['image'] | null;
}): BlogData => ({
  id: blog.id,
  title: blog.title,
  slug: blog.slug ?? '',
  descp: blog.descp,
  image: blog.image ?? [],
});

const FALLBACK_LATEST_BLOGS: BlogData[] = [
  {
    id: 13,
    title:
      'Legacy System Modernization: A Complete Guide to Upgrading Factory Data',
    slug: 'legacy-system-modernization-industrial-iot',
    descp:
      'Factories and energy plants rely on massive heavy machinery. These industrial pumps, complex assembly lines, and high-pressure compressors were built to last for multiple decades.',
    image: [
      {
        fileId: '25',
        url: `${LIVE_ORIGIN}/payload-api/media/file/image_5K-Fa9rAM-3.png`,
      },
    ],
  },
  {
    id: 12,
    title:
      'Microservices Evolving into Distributed Cloud-Native Applications: A New Era in Software Development',
    slug: 'microservices-evolving-into-distributed-cloud-native-applications-a-new-era-in-software-development',
    descp:
      "In today's fast-paced digital world, businesses are constantly looking for ways to scale efficiently and respond quickly to changing customer needs.",
    image: [
      {
        fileId: '17',
        url: `${LIVE_ORIGIN}/payload-api/media/file/microservices_VIISR2rhK.png`,
      },
    ],
  },
  {
    id: 11,
    title: 'Exploring the Future of Web Development',
    slug: 'exploring-the-future-of-web-development',
    descp:
      'The web development world is changing rapidly. At Nextloop Technologies, we stay ahead of these changes to deliver the best software solutions.',
    image: [
      {
        fileId: '16',
        url: `${LIVE_ORIGIN}/payload-api/media/file/future_of_web_development_E8rotcLoe.png`,
      },
    ],
  },
];

/**
 * The "latest posts" strip on the eight service pages.
 *
 * This read Supabase directly, which would have survived the cutover as a split
 * brain: the blog section rendering from Payload while these strips kept
 * showing Supabase posts on the same site. Routed through the seam so one flag
 * moves everything.
 *
 * Failures stay swallowed, as before. The strip is decorative — a service page
 * losing it is a cosmetic gap; a service page 500ing over it is an outage.
 * When the CMS is not configured locally, the current live posts still render
 * so the section is not missing from the page.
 */
export async function fetchLatestBlogs(limit = 3): Promise<BlogData[]> {
  try {
    const fromCms = (await listBlogs()).slice(0, limit).map(toCard);
    if (fromCms.length > 0) return fromCms;
  } catch (error) {
    console.error(
      'Error fetching blogs:',
      error instanceof Error ? error.message : error
    );
  }

  return FALLBACK_LATEST_BLOGS.slice(0, limit);
}
