/* eslint-disable @next/next/no-img-element */
import dayjs from 'dayjs';
import { useRouter } from 'next/router';

import Layout from '../../components/Layout/Layout';
import PageHero from '../../components/PageHero';
import { Blog } from '../../types';
import supabaseClient from '../../utils/client';
import blogsBg from '../../../assets/blogs.png';

const Blog: React.FC<{ data?: Blog[]; error?: string }> = ({ data, error }) => {
  const router = useRouter();
  return (
    <Layout>
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
        <div className='grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-y-24 xl:p-24 md:p-8 p-4 place-items-center'>
          {data?.map((blog) => (
            <div
              className='flex flex-col gap-4 lg:max-w-[400px] w-full self-start'
              key={blog.id}
              onClick={() => router.push(`/blog/${blog.id}`)}
            >
              {blog.image ? (
                <img
                  src={blog.image}
                  alt='blog image'
                  className='object-contain'
                  height={400}
                  width={400}
                />
              ) : (
                <div className='lg:w-[400px] h-[400px] animate-pulse bg-slate-100' />
              )}
              <span className='font-medium md:text-4xl text-2xl'>
                {blog.title}
              </span>
              <span className='text-sm'>
                {dayjs(blog.created_at).format('DD/MMM/YYYY')}
              </span>
            </div>
          ))}
        </div>
      )}
    </Layout>
  );
};

export default Blog;

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
