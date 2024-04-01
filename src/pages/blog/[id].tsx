/* eslint-disable @next/next/no-img-element */
import dayjs from 'dayjs';
import { GetServerSideProps } from 'next';

import Layout from '../../components/Layout/Layout';
import PageHero from '../../components/PageHero';
import { Blog } from '../../types';
import supabaseClient from '../../utils/client';
import blogsBg from '../../../assets/blogs.png';

const BlogID: React.FC<{ data?: Blog[]; error?: string }> = ({
  data,
  error,
}) => {
  if (error)
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
        <div className='h-screen flex items-center justify-center text-2xl'>
          {error}
        </div>
      </Layout>
    );

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
      <div className='xl:p-24 lg:p-8 p-4 flex flex-col'>
        {data?.map((blog) => (
          <div className='flex flex-col gap-8 w-full' key={blog.id}>
            {blog.image ? (
              <img
                src={blog.image}
                alt='blog image'
                className='object-contain'
                height={400}
                width={400}
              />
            ) : (
              <div className='w-full xl:h-[800px] h-[400px] animate-pulse bg-slate-100' />
            )}
            <span className='font-medium text-4xl '>{blog.title}</span>
            <div className='text-lg font-light'>{blog.descp}</div>
            <span className='text-sm'>
              {dayjs(blog.created_at).format('DD/MMM/YYYY')}
            </span>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default BlogID;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  // Fetch data from Supabase
  const { data, error } = await supabaseClient
    .from('blogs')
    .select('*')
    .filter('id', 'eq', params?.id);

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
};
