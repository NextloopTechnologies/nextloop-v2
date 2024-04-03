/* eslint-disable @next/next/no-img-element */

import Image from 'next/image';
import { useRouter } from 'next/router';

import Layout from '../../components/Layout/Layout';
import PageHero from '../../components/PageHero';
import portfolioBg from '../../../assets/portfolioBg.png';

export const caseStudies = [
  {
    title: 'BREWPOD MOBILE APP',
  },
  {
    title: 'SHOWER WEBSITE',
  },
  {
    title: 'WPKIXX WEBSITE',
  },
  {
    title: 'BLUE BIRD EVENT WEBSITE',
  },
];

const Portfolio: React.FC = () => {
  return (
    <Layout>
      <PageHero
        image={portfolioBg}
        title='portfolio'
        subtitle="View the range of projects completed by Nextloop Technologies. We have provided assistance to a wide range of firms in various industries and locations across the globe, from small startups to large corporations. This demonstrates our exceptional ability to generate fresh concepts and tailor solutions to the specific needs of each client. So, if you're interested in learning more about what Nextloop can accomplish for your company, have a look at our portfolios!"
        opacity='opacity-90'
      />

      <div className='grid xl:grid-cols-2 grid-cols-1 gap-24 xl:p-24 md:p-8 p-4 place-items-center mb-16 xl:mb-0'>
        {caseStudies.map((proj, idx) => (
          <ProjectCard proj={proj} key={idx} id={idx} />
        ))}
      </div>
    </Layout>
  );
};

export default Portfolio;

const ProjectCard: React.FC<{
  proj: (typeof caseStudies)[number];
  id: number;
}> = ({ proj: { title }, id }) => {
  const router = useRouter();
  return (
    <div
      className='bg-[#F0F0F0] relative w-full flex flex-col items-center justify-end xl:h-[750px] xl:max-h-[750px]'
      onClick={() => {
        router.push(`/portfolio/${id}`);
      }}
    >
      <Image
        src={`/portfolio/${id}.svg`}
        alt=''
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
