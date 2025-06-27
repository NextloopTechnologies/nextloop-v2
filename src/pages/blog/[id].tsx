/* eslint-disable @next/next/no-img-element */

import { GetServerSideProps } from 'next';
import Image from 'next/image';

import 'react-quill/dist/quill.snow.css';
import Layout from '../../components/Layout/Layout';
import PageHero from '../../components/PageHero';
import { BlogType } from '../../types';
import supabaseClient from '../../utils/client';
import blogsBg from '../../../assets/blogs.png';

const BlogID: React.FC<{ data?: BlogType; error?: string }> = ({
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
        {data ? (
          <div className='flex flex-col gap-8 w-full'>
            {data.image ? (
              <div className='flex justify-center'>
                <Image
                  src={data?.image?.[0]?.url as string}
                  alt='blog image'
                  className='w-fit object-contain'
                  height={400}
                  width={400}
                />
              </div>
            ) : (
              <div className='w-full xl:h-[800px] h-[400px] animate-pulse bg-slate-100' />
            )}
            <span className='font-medium text-4xl '>{data.title}</span>
            <div className="ql-snow">
              <div
                className="ql-editor"
                dangerouslySetInnerHTML={{ __html: data.descp }}
              />
            </div>
            {/* <span className='text-sm'>
              {dayjs(data.created_at).format('DD/MMM/YYYY')}
            </span> */}
          </div>
        ) : (
          <div className='h-screen flex items-center justify-center text-2xl'>
            {error}
          </div>
        )}
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
    .filter('id', 'eq', params?.id)
    .single();

  if (error) {
    return {
      props: {
        error: error.message,
      },
    };
  }

  return {
    props: {
      data: data || undefined,
    },
  };
};
