/* eslint-disable @next/next/no-img-element */
// import dayjs from 'dayjs';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';

import Layout from '../../components/Layout/Layout';
import PageHero from '../../components/PageHero';
import palette from '../../styles/pallette';
import { BlogType } from '../../types';
import supabaseClient from '../../utils/client';
import blogsBg from '../../../assets/blogs.png';

const BlogPage: React.FC<{ data?: BlogType[]; error?: string }> = ({
  data,
  error,
}) => {
  const router = useRouter();
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
        subtitle='If you are looking for a complete business solution at a one place in
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
        <div className='grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5 xl:p-24 md:p-8 p-4 place-items-center'>
          {data?.map((blog) => (
            <div
              className='flex flex-col lg:max-w-[400px] w-full self-start cursor-pointer'
              key={blog.id}
              onClick={() => router.push(`/blog/${blog.id}`)}
            >
              {blog.image ? (
                <Image
                  src={blog?.image?.[0]?.url as string}
                  alt='blog image'
                  className='w-[400px] h-[250px] object-contain'
                  height={250}
                  width={400}
                />
              ) : (
                <div className='lg:w-[400px] h-[400px] animate-pulse bg-slate-100' />
              )}
              <span
                className={`${palette.fontSize.subtitle.mobile} ,md:${palette.fontSize.subtitle.desktop} font-bold`}
              >
                {blog.title}
              </span>
              <span className='text-sm mt-2'>
                {/* {dayjs(blog.created_at).format('DD/MMM/YYYY')} */}
              </span>
            </div>
          ))}
        </div>
      )}
    </Layout>
  );
};

export default BlogPage;

export async function getServerSideProps() {
  // Fetch data from Supabase
  const { data, error } = await supabaseClient.from('blogs').select('*');

  if (error) {
    return {
      props: {
        error: error.message,
      },
    };
  }

  return {
    props: {
      data: data || [],
    },
  };
}
