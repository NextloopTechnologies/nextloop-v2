/* eslint-disable @next/next/no-img-element */
import { useRouter } from 'next/router';

import Layout from '../../components/Layout/Layout';
import PageHero from '../../components/PageHero';
import { Blog } from '../../types';
import supabaseClient from '../../utils/client';
import portfolioBg from '../../../assets/portfolioBg.png';

const Portfolio: React.FC<{ data?: Blog[]; error?: string }> = ({
  data,
  error,
}) => {
  return (
    <Layout>
      <PageHero
        image={portfolioBg}
        title='portfolio'
        subtitle="View the range of projects completed by Nextloop Technologies. We have provided assistance to a wide range of firms in various industries and locations across the globe, from small startups to large corporations. This demonstrates our exceptional ability to generate fresh concepts and tailor solutions to the specific needs of each client. So, if you're interested in learning more about what Nextloop can accomplish for your company, have a look at our portfolios!"
        opacity='opacity-90'
      />
      {error ? (
        <div className='flex items-center justify-center h-screen text-4xl'>
          {error}
        </div>
      ) : (
        <div className='grid xl:grid-cols-2 grid-cols-1 gap-24 xl:p-24 md:p-8 p-4 place-items-center mb-16 xl:mb-0'>
          {data?.map((proj) => (
            <ProjectCard proj={proj} key={proj.id} />
          ))}
        </div>
      )}
    </Layout>
  );
};

const ProjectCard: React.FC<{ proj: Blog }> = ({
  proj: { image, title, descp, id },
}) => {
  const router = useRouter();
  return (
    <div
      className='bg-[#F0F0F0] relative w-full flex flex-col items-center justify-end xl:h-[750px] xl:max-h-[750px]'
      onClick={() => {
        router.push(`/portfolio/${id}`);
      }}
    >
      {image && (
        <img src={image} alt='' className='object-cover max-h-[650px]' />
      )}
      <div className='absolute bg-white w-[80%] xl:px-16 py-8 flex flex-col items-center gap-4 -bottom-16 shadow-lg text-center'>
        <p className='font-medium xl:text-4xl lg:text-2xl text-xl'>{title}</p>
        <p className='text-lg flex-wrap'>{descp}</p>
      </div>
    </div>
  );
};

export default Portfolio;

export async function getServerSideProps() {
  // Fetch data from Supabase
  const { data, error } = await supabaseClient.from('portfolio').select('*');

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
