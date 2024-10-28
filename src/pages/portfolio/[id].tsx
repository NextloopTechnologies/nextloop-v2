import parse from 'html-react-parser';
import { GetServerSideProps } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useRef } from 'react';

import Layout from '../../components/Layout/Layout';
import PageHero from '../../components/PageHero';
import { IPortfolio } from '../../types';
import supabaseClient from '../../utils/client';
import portfolioBg from '../../../assets/portfolioBg.png';

const PortfolioID: React.FC<{ data?: IPortfolio; error?: string }> = ({
  data,
  error,
}) => {
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (router.query.scrollToHeader && titleRef.current) {
      titleRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [router.query.scrollToHeader]);

  return (
    <Layout>
      <PageHero
        image={portfolioBg}
        title='portfolio'
        subtitle="View the range of projects completed by Nextloop Technologies. We have provided assistance to a wide range of firms in various industries and locations across the globe, from small startups to large corporations. This demonstrates our exceptional ability to generate fresh concepts and tailor solutions to the specific needs of each client. So, if you're interested in learning more about what Nextloop can accomplish for your company, have a look at our portfolios!"
        opacity='opacity-90'
      />
      <div className='xl:p-24 lg:p-8 p-4 flex flex-col'>
        {data ? (
          <div className='flex flex-col w-full min-h-screen items-center justify-center'>
            <h1 ref={titleRef} className='font-bold text-4xl mt-5 mb-14'>
              {data.title}
            </h1>
            <Image
              src={data?.image?.[0]?.url as string}
              alt='portfolio-image'
              className='object-contain'
              width={900}
              height={900}
            />
            {parse(`<h1>${data.descp!}</h1>`)}
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

export default PortfolioID;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { data, error } = await supabaseClient
    .from('portfolio')
    .select('id, title, descp, image')
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
      data: data || [],
    },
  };
};
