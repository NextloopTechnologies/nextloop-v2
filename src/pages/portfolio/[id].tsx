import Image from 'next/image';
import Layout from '../../components/Layout/Layout';
import PageHero from '../../components/PageHero';
import portfolioBg from '../../../assets/portfolioBg.png';
import { GetServerSideProps } from 'next';
import supabaseClient from '../../utils/client';
import { IPortfolio } from '../../types';

const PortfolioID: React.FC<{ data?: IPortfolio, error?: string }> = ({
  data,
  error
}) => {
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
              src={data?.image?.[0]?.url as string}
              alt='portfolio-image'
              className='object-contain'
              width={900}
              height={900}
            />
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

