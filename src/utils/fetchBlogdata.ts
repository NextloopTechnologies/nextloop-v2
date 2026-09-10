import { listBlogs } from '../lib/content';
import { BlogData } from '../types';

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
 */
export async function fetchLatestBlogs(limit = 3): Promise<BlogData[]> {
  try {
    // listBlogs already filters to published and sorts newest first.
    return (await listBlogs()).slice(0, limit).map((blog) => ({
      id: blog.id,
      title: blog.title,
      slug: blog.slug ?? '',
      descp: blog.descp,
      image: blog.image ?? [],
    }));
  } catch (error) {
    console.error('Error fetching blogs:', error instanceof Error ? error.message : error);
    return [];
  }
}
