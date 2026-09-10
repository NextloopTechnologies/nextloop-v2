import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { BiRightArrowAlt } from 'react-icons/bi';

// Strip HTML tags from a string
const stripHtml = (html: string): string => {
  if (!html) return '';
  return html.replace(/<[^>]*>?/gm, '');
};

interface BlogItem {
  id: number;
  title: string;
  descp: string;
  slug: string;
  image: { url: string; fileId: string }[];
}

interface BlogSectionProps {
  blogData: BlogItem[];
}

/**
 * These cards were `<div onClick={router.push(...)}>`. That is not a link:
 * a crawler sees no href, so ten service pages were passing exactly zero
 * internal link equity to the blog; keyboard users could not reach them; and
 * nobody could middle-click one open. `next/link` fixes all three and keeps the
 * styling. The href carries the trailing slash `next.config.mjs` enforces —
 * router.push without it cost every click a redirect.
 */
const BlogSection: React.FC<BlogSectionProps> = ({ blogData }) => {
  return (
    <section className='flex flex-col py-16 px-4 md:px-10 text-center'>
      <h2 className='text-3xl md:text-4xl font-bold'>
        Our <span className='text-orange-500'>Blogs</span>
      </h2>
      <div className='grid md:grid-cols-3 gap-6 mt-10'>
        {blogData?.map((blog) => {
          const imageUrl = blog.image?.[0]?.url || '/fallback-image.jpg'; // fallback if image missing
          const plain = stripHtml(blog.descp);
          // Was unconditional: an empty body rendered a card whose text was
          // just "...".
          const shortDesc = plain.length > 150 ? `${plain.slice(0, 150)}...` : plain;

          return (
            <Link
              key={blog.id}
              href={`/blog/${blog.slug}/`}
              className='bg-white rounded-lg shadow-md p-4 border cursor-pointer flex flex-col h-full text-left'
            >
              <div className='relative w-full h-56 mb-4'>
                <Image
                  src={imageUrl}
                  alt={blog.title}
                  layout='fill'
                  objectFit='cover'
                  className='rounded-t-lg'
                  unoptimized={true}
                />
              </div>
              <h3 className='font-bold text-lg text-left'>{blog.title}</h3>
              <p className='text-sm text-gray-600 text-left mt-2 line-clamp-3'>
                {shortDesc}
              </p>

              <div className='text-left mt-auto pt-4'>
                <span className='text-black font-bold flex items-center hover:underline'>
                  Learn More <BiRightArrowAlt className='ml-1' />
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default BlogSection;
