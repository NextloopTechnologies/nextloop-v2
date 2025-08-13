import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';

// Strip HTML tags from a string
const stripHtml = (html: string): string => {
  if (!html) return '';
  return html.replace(/<[^>]*>?/gm, '');
};

interface BlogItem {
  id: number;
  title: string;
  descp: string;
  image: { url: string; fileId: string }[];
}

interface BlogSectionProps {
  blogData: BlogItem[];
}

const BlogSection: React.FC<BlogSectionProps> = ({ blogData }) => {
  const router = useRouter();

  return (
    <section className='flex flex-col py-16 px-4 md:px-10 text-center'>
      <h2 className='text-3xl md:text-4xl font-bold'>
        OUR <span className='text-orange-500'>BLOGS</span>
      </h2>
      <div className='grid md:grid-cols-3 gap-6 mt-10'>
        {blogData?.map((blog) => {
          const imageUrl = blog.image?.[0]?.url || '/fallback-image.jpg'; // fallback if image missing
          const shortDesc = stripHtml(blog.descp).slice(0, 150) + '...'; // short preview

          return (
            <div
              key={blog.id}
              className='bg-white rounded-lg shadow-md p-4 border cursor-pointer flex flex-col h-full'
              onClick={() => router.push(`/blog/${blog.id}`)}
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
                  Learn More <span className='ml-2'>→</span>
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default BlogSection;
