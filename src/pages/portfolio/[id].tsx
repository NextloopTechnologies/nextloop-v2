import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { caseStudies } from '.';
import Layout from '../../components/Layout/Layout';
import PageHero from '../../components/PageHero';
import portfolioBg from '../../../assets/portfolioBg.png';

const PortfolioID: React.FC = () => {
  const router = useRouter();

  const [data, setData] = useState<{ title: string } | undefined>();
  const [ID, setID] = useState<number>();
  useEffect(() => {
    const id = router.query?.id;
    if (id) {
      setID(parseInt(id as string));
      const caseStudy = caseStudies[parseInt(id as string)];
      setData(caseStudy);
    }
  }, [router]);

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
          <div className='flex w-full min-h-screen items-center justify-center'>
            <Image
              src={`/portfolio/case-studies/${ID}.svg`}
              alt=''
              className='object-contain'
              width={900}
              height={900}
            />
          </div>
        ) : null}
      </div>
    </Layout>
  );
};

export default PortfolioID;
