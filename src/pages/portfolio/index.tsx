/* eslint-disable @next/next/no-img-element */

import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';

import Layout from '../../components/Layout/Layout';
import PageHero from '../../components/PageHero';
import { IPortfolio } from '../../types';
import supabaseClient from '../../utils/client';
import portfolioBg from '../../../assets/portfolioBg.png';

const Portfolio: React.FC<{ data?: IPortfolio[]; error?: string }> = ({
  data,
  error,
}) => {
  return (
    <Layout>
      <Head>
        <title>
          Customised IT solutions across Industries | Nextloop Portfolio
        </title>
        <meta
          name='description'
          content='Discover Nextloop’s portfolio of custom software, web development & cloud solutions delivering digital transformation for diverse industries & clients worldwide'
        />
      </Head>
      <PageHero
        image={portfolioBg}
        title='portfolio'
        subtitle="View the range of projects completed by Nextloop Technologies. We have provided assistance to a wide range of firms in various industries and locations across the globe, from small startups to large corporations. This demonstrates our exceptional ability to generate fresh concepts and tailor solutions to the specific needs of each client. So, if you're interested in learning more about what Nextloop can accomplish for your company, have a look at our portfolios!"
        opacity='opacity-90'
      />
      {data?.length ? (
        <div className='grid xl:grid-cols-2 grid-cols-1 gap-24 xl:p-24 md:p-8 p-4 place-items-center mb-16 xl:mb-0'>
          {data.map((portfolio: IPortfolio, index: number) => (
            <ProjectCard proj={portfolio} key={portfolio.id} index={index} />
          ))}
        </div>
      ) : (
        <div className='h-screen flex items-center justify-center text-2xl'>
          {error}
        </div>
      )}
    </Layout>
  );
};

export default Portfolio;

const ProjectCard: React.FC<{ proj: IPortfolio; index: number }> = ({
  proj: { title, id },
  index,
}) => {
  const router = useRouter();
  return (
    <div
      className='relative w-full flex flex-col items-center justify-end cursor-pointer'
      onClick={() => {
        router.push(`/portfolio/${id}`);
      }}
    >
      <Image
        src={`/portfolio/${index}.png`}
        alt={`portfolio-image-${index}`}
        className='object-contain max-h-[650px]'
        width={650}
        height={650}
      />

      <div className='absolute bg-white w-[80%] xl:px-16 py-8 flex flex-col items-center gap-4 -bottom-16 shadow-lg text-center'>
        <p className='font-medium xl:text-4xl lg:text-2xl text-xl'>{title}</p>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const { data, error } = await supabaseClient
    .from('portfolio')
    .select('id, title, image')
    .order('id', { ascending: false });

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
