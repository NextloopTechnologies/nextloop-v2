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
        <title>Software Development Portfolio for Super App Development</title>
        <meta
          name='description'
          content='Nextloop Technologies has a proven track record of delivering tailored technology, from custom IoT app development & vendor management software to learning management system development'
        />
      </Head>
      <PageHero
        image={portfolioBg}
        title='Portfolio'
        subtitle='Explore projects done by Nextloop Technologies. We worked with startups and established companies in different industries and countries. We helped them build digital solutions that are scalable and give good results. Our projects show how we turn ideas into custom technology solutions. These solutions help each client achieve their goals and meet their needs. Each project shows we care about being creative, technically good and focused on business. If you want to know how Nextloop Technologies can help your business grow, look at our projects. You can see the impact of our work yourself. '
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
  proj,
}) => {
  const router = useRouter();

  const imageUrl = proj.image?.[0]?.url || '/placeholder.png';

  return (
    <div
      className=' w-full flex flex-col items-center justify-end cursor-pointer group'
      onClick={() => router.push(`/portfolio/${proj.id}`)}
    >
      <Image
        src={imageUrl}
        alt={proj.title ?? 'portfolio-image'}
        className='object-contain max-h-[650px] transition-transform duration-300 group-hover:scale-105'
        width={650}
        height={650}
      />

      <div className=' bg-white w-[80%] xl:px-16 py-8 flex flex-col items-center gap-4 -bottom-16 shadow-lg text-center rounded-xl'>
        <p className='font-medium xl:text-4xl lg:text-2xl text-xl'>
          {proj.title}
        </p>
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
