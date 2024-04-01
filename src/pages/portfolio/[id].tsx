/* eslint-disable @next/next/no-img-element */
import { GetServerSideProps } from 'next';

import Layout from '../../components/Layout/Layout';
import PageHero from '../../components/PageHero';
import { Blog } from '../../types';
import supabaseClient from '../../utils/client';
import portfolioBg from '../../../assets/portfolioBg.png';

const PortfolioID: React.FC<{ data?: Blog[]; error?: string }> = ({
  data,
  error,
}) => {
  if (error)
    return (
      <Layout>
        <PageHero
          image={portfolioBg}
          title='portfolio'
          subtitle="View the range of projects completed by Nextloop Technologies. We have provided assistance to a wide range of firms in various industries and locations across the globe, from small startups to large corporations. This demonstrates our exceptional ability to generate fresh concepts and tailor solutions to the specific needs of each client. So, if you're interested in learning more about what Nextloop can accomplish for your company, have a look at our portfolios!"
          opacity='opacity-90'
        />
        <div className='h-screen flex items-center justify-center text-2xl'>
          {error}
        </div>
      </Layout>
    );

  return (
    <Layout>
      <PageHero
        image={portfolioBg}
        title='portfolio'
        subtitle="View the range of projects completed by Nextloop Technologies. We have provided assistance to a wide range of firms in various industries and locations across the globe, from small startups to large corporations. This demonstrates our exceptional ability to generate fresh concepts and tailor solutions to the specific needs of each client. So, if you're interested in learning more about what Nextloop can accomplish for your company, have a look at our portfolios!"
        opacity='opacity-90'
      />
      <div className='xl:p-24 lg:p-8 p-4 flex flex-col'>
        {data?.map((blog) => (
          <div
            className='flex flex-col lg:flex-row gap-8 w-full min-h-screen items-center lg:items-start'
            key={blog.id}
          >
            {blog.image && (
              <div className='lg:w-1/2 flex items-start'>
                <img
                  src={blog.image}
                  alt='blog image'
                  className='object-contain h-full '
                />
              </div>
            )}
            <div className='flex lg:w-1/2 flex-col gap-8 text-left'>
              <p className='font-medium lg:text-5xl text-3xl'>{blog.title}</p>
              <p className='text-lg'>{blog.descp}</p>
              <button className='flex rounded-3xl px-6 border-orange-500 text-orange-500 border py-1 text-lg justify-center w-fit'>
                View full case study &#10230;
              </button>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default PortfolioID;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  // Fetch data from Supabase
  const { data, error } = await supabaseClient
    .from('portfolio')
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
