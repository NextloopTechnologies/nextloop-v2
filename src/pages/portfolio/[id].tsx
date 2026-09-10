import parse from 'html-react-parser';
import { GetServerSideProps } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useRef } from 'react';

import Layout from '../../components/Layout/Layout';
import Seo from '../../components/Seo';
import { getPortfolioByRef } from '../../lib/content';
import { IPortfolio } from '../../types';
import { getBaseUrl } from '../../utils/getBaseUrl';
import { firstImageUrl } from '../../utils/media';
import { breadcrumbSchema, caseStudySchema, toPlainText } from '../../utils/structuredData';

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
      <Seo
        title={`${data?.title ?? 'Case study'} | Portfolio | Nextloop Technologies`}
        description={toPlainText(data?.descp, 158)}
        image={data?.image?.[0]?.url}
        jsonLd={[
          caseStudySchema({
            title: data?.title ?? 'Case study',
            description: toPlainText(data?.descp, 300),
            url: `${getBaseUrl()}/portfolio/${data?.id ?? ''}/`,
            image: data?.image?.[0]?.url,
          }),
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Portfolio', path: '/portfolio/' },
            { name: data?.title ?? 'Case study', path: `/portfolio/${data?.id ?? ''}/` },
          ]),
        ]}
      />
      <div className='xl:p-24 lg:p-8 p-4 flex flex-col'>
        {data ? (
          <div className='flex flex-col w-full min-h-screen items-center justify-center'>
            <h1 ref={titleRef} className='font-bold text-4xl mt-5 mb-14'>
              {data.title}
            </h1>
            {/* `as string` was hiding an undefined src on every case study:
                portfolio.image is jsonb[], so image[0] is a JSON string. */}
            <Image
              src={firstImageUrl(data.image) ?? '/placeholder.png'}
              alt='portfolio-image'
              className='object-contain'
              width={900}
              height={900}
            />
            {/* This was `parse(\`<h1>${'${data.descp}'}</h1>\`)` — the entire case
                study, headings and all, wrapped in a second H1. It looked fine
                only because Tailwind's preflight resets heading sizes, so the
                damage was invisible on screen and total to a parser: every case
                study claimed a multi-paragraph H1 and had no readable outline.
                The body is already HTML, so it just needs a prose container. */}
            {data.descp && (
              <div className='prose prose-lg mt-10 w-full max-w-3xl'>
                {parse(data.descp)}
              </div>
            )}
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
  const ref = typeof params?.id === 'string' ? params.id : '';
  if (!ref) return { notFound: true };

  try {
    // Was HTTP 200 with the raw PostgREST error on screen — a soft 404 that let
    // Google index unlimited /portfolio/<anything> URLs as valid pages.
    const data = await getPortfolioByRef(ref);
    if (!data) return { notFound: true };
    return { props: { data } };
  } catch {
    return { props: { error: 'Unable to load this case study.' } };
  }
};
