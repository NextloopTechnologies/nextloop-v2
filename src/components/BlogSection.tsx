import Image from 'next/image';
import { StaticImageData } from 'next/image';
import React from 'react';

interface BlogItem {
  id: number;
  title: string;
  description: string;
  image: StaticImageData;
}

interface BlogSectionProps {
  blogData: BlogItem[];
}

const BlogSection: React.FC<BlogSectionProps> = ({ blogData }) => {
  return (
    <section className='flex flex-col py-16 px-4 md:px-10 text-center'>
      <h2 className='text-3xl md:text-4xl font-bold'>
        OUR <span className='text-orange-500'>BLOGS</span>
      </h2>
      <div className='grid md:grid-cols-3 gap-6 mt-10'>
        {blogData.map((blog) => (
          <div
            key={blog.id}
            className='bg-white rounded-lg shadow-md p-4 border'
          >
            <div className='relative w-full h-56 mb-4'>
              <Image
                src={blog.image}
                alt={blog.title}
                layout='fill'
                objectFit='cover'
                className='rounded-t-lg'
              />
            </div>
            <h3 className='font-bold text-lg text-left'>{blog.title}</h3>
            <p className='text-sm text-gray-600 text-left mt-2'>
              {blog.description}
            </p>
            <div className='text-left mt-4'>
              <a
                href='#'
                className='text-black font-bold flex items-center hover:underline'
              >
                Learn More <span className='ml-2'>→</span>
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BlogSection;
