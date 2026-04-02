/* eslint-disable @next/next/no-img-element */
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState } from 'react';

import Layout from '../../components/Layout/Layout';
import PageHero from '../../components/PageHero';
import palette from '../../styles/pallette';
import { BlogType } from '../../types';
import supabaseClient from '../../utils/client';
import blogsBg from '../../../assets/blogs.png';

function stripHtml(html: string) {
  return html?.replace(/<[^>]*>/g, '') ?? '';
}

function BlogCard({ blog, onClick }: { blog: BlogType; onClick: () => void }) {
  return (
    <article
      onClick={onClick}
      className='group flex flex-col w-full h-full lg:max-w-[400px] self-start cursor-pointer
                  overflow-hidden p-3
                 bg-white border border-[#C8C8C8]
                 transition-all duration-300 ease-out
                 hover:bg-[#1D1D1D] hover:border-[#1D1D1D]'
    >
      <div className='relative w-full h-[200px] shrink-0 overflow-hidden'>
        {blog.image?.[0]?.url ? (
          <Image
            src={blog.image[0].url as string}
            alt={blog.title ?? 'blog image'}
            fill
            className='object-cover transition-transform duration-500 group-hover:scale-105'
            sizes='(max-width: 768px) 100vw, 400px'
          />
        ) : (
          <div className='w-full h-full bg-gradient-to-br from-[#1e3a5f] to-[#0d1b2e] animate-pulse ' />
        )}

        <div className='absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0d1b2e]/75 pointer-events-none' />
      </div>

      {/* Body */}
      <div className='flex flex-col flex-1 gap-2.5 px-1  py-4 '>
        <div className='flex flex-col gap-1'>
          <h2 className='text-[18px] leading-snug font-semibold text-black group-hover:text-white transition-colors duration-200'>
            {blog.title}
          </h2>

          <div className='flex items-center gap-2.5 flex-wrap'>
            {blog.created_at && (
              <span className='text-[12px] font-semibold text-black group-hover:text-white'>
                {new Date(blog.created_at).toLocaleDateString('en-GB', {
                  day: '2-digit',
                  month: 'long',
                  year: 'numeric',
                })}
              </span>
            )}
          </div>
        </div>

        <div className='w-full h-px bg-[#C8C8C8]' />

        {blog.descp && (
          <p className='text-[15px] font-light leading-relaxed text-[#222222] group-hover:text-white line-clamp-3 transition-colors duration-200'>
            {stripHtml(blog.descp)}
          </p>
        )}

        <button
          className='self-start mt-auto text-[11px] font-bold tracking-[0.08em] uppercase text-orange-500  transition-colors duration-200 bg-transparent border-none p-0 cursor-pointer'
          onClick={(e) => {
            e.stopPropagation();
            onClick();
          }}
        >
          READ MORE...
        </button>
      </div>
    </article>
  );
}

const BlogPage: React.FC<{ data?: BlogType[]; error?: string }> = ({
  data,
  error,
}) => {
  const router = useRouter();
  const [visibleCount, setVisibleCount] = useState(9);
  const filtered = data ? data.filter((blog) => blog.title && blog.descp) : [];
  const visibleBlogs = filtered.slice(0, visibleCount);

  return (
    <Layout>
      <Head>
        <title>
          Insights on IT, Software, AI, Digital Trends | Nextloop Blog
        </title>
        <meta
          name='description'
          content='Explore Nextloops blogs for expert insights on AI, cloud computing, software development, digital marketing & emerging tech trends shaping business in 2025'
        />
      </Head>

      <PageHero
        image={blogsBg}
        title='blogs'
        subtitle='If you are looking for a complete business solution at in one place in
          combination with distinctive designs, that is what you can expect from
          us. To stimulate the growth of your company, we focus on various
          services, although we do not limit ourselves to this. We keep learning
          and stay ourselves up to date with current market trends.'
      />

      {error ? (
        <div className='flex items-center justify-center h-screen text-4xl'>
          {error}
        </div>
      ) : (
        <div className='bg-white min-h-screen px-4 flex flex-col justify-center items-center md:px-8 xl:px-24 py-12 '>
          <div className='relative bg-black w-11/12 h-[75vh] '>
            {/* Background image */}
            {data?.[0]?.image?.[0]?.url ? (
              <Image
                src={data[0].image[0].url as string}
                alt={data[0].title ?? 'latest blog'}
                fill
                className='object-cover opacity-80'
                priority
              />
            ) : (
              <div className='w-full h-full bg-gradient-to-br from-[#1e3a5f] to-[#0d1b2e]' />
            )}

            <div className='absolute -bottom-16 right-0 bg-white w-3/4 h-[40vh] border-[#D8D8D8] border-2 p-6 flex flex-col gap-5 z-10'>
              {/* Date + Tag */}
              <div className='flex items-center gap-2.5 flex-wrap font-light '>
                {data?.[0]?.created_at && (
                  <span className='text-[12px] font-semibold text-slate-500'>
                    {new Date(data[0].created_at).toLocaleDateString('en-GB', {
                      day: '2-digit',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </span>
                )}
              </div>

              {/* Title */}
              <h3 className='text-4xl md:text-3xl sm:text-xl font-bold text-black  leading-snug line-clamp-2  sm:line-clamp-2'>
                {data?.[0]?.title ?? ''}
              </h3>

              {/* Excerpt */}
              {data?.[0]?.descp && (
                <p className='text-[14px] leading-relaxed text-[#1B1B1B] lg:line-clamp-2 md:line-clamp-4 sm:line-clamp-5 line-clamp-3'>
                  {stripHtml(data[0].descp)}
                </p>
              )}

              {/* Divider + Read More */}

              <button
                className='self-start text-[14px] font-bold w-44 h-10 uppercase bg-orange-500 rounded-3xl 
                 text-white  border-none p-0 cursor-pointer'
                onClick={(e) => {
                  e.stopPropagation();
                  router.push(`/blog/${data?.[0]?.id}`);
                }}
              >
                READ MORE
              </button>
            </div>
          </div>
          <h2
            className={`${palette.fontSize.heading2.mobile} md:text-4xl uppercase font-bold text-black mt-20 `}
          >
            ALL <span className='text-orange-500'>BLOGS</span>
          </h2>

          <div className='grid grid-cols-1 mt-12 md:grid-cols-2 xl:grid-cols-3 gap-6 items-stretch w-full'>
            {visibleBlogs.length > 0 ? (
              visibleBlogs.map((blog) => (
                <BlogCard
                  key={blog.id}
                  blog={blog}
                  onClick={() => router.push(`/blog/${blog.id}`)}
                />
              ))
            ) : (
              <p className='col-span-3 text-center text-gray-400 text-lg py-20'>
                No blogs found.
              </p>
            )}
          </div>

          {visibleCount < filtered.length && (
            <button
              onClick={() => setVisibleCount((prev) => prev + 9)}
              className='mt-10 px-10 py-3 text-[13px] font-bold uppercase tracking-widest 
                         border-2 border-[#8F8F8F] text-orange-500 hover:bg-orange-500 
                         hover:text-white transition-all duration-300 rounded-3xl cursor-pointer'
            >
              Load More
            </button>
          )}
        </div>
      )}
    </Layout>
  );
};

export default BlogPage;

export async function getServerSideProps() {
  const { data, error } = await supabaseClient
    .from('blogs')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    return { props: { error: error.message } };
  }

  return { props: { data: data || [] } };
}
