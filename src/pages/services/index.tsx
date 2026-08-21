import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

import Layout from '../../components/Layout/Layout';
import PageHero from '../../components/PageHero';
import { getSchemaMarkup } from '../../utils/seoSchemas';
import { availableServices } from '../../utils/staticTextImgData';
import servicesBg from '../../../assets/servicesBg.webp';

const Services = () => {
  return (
    <Layout>
      <Head>
        <title>
          Offshore development center | Custom Web & software services provider
        </title>
        <meta
          name='description'
          content='Get bespoke software development services tailored to your needs. We offer remote IT staffing services and custom mobile app & web development services to scale faster.'
        />
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{
            __html: getSchemaMarkup('services'),
          }}
        />
      </Head>
      <PageHero
        image={servicesBg}
        coloredTitle='Custom Software Development '
        title='& IT Staff Augmentation Services'
        subtitle='Work with our offshore development teams across India and USA to build reliable web and mobile applications. From providing AI development services to cloud & DevOps services, we focus on creating scalable, practical solutions that align with your business goals and support long-term growth through a flexible and efficient development approach.'
        opacity='opacity-80'
      />
      <div className='grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-12 xl:p-24 md:p-8 p-4 place-items-center'>
        {availableServices.map((service, idx) => (
          <Link href={service.href} key={service.href}>
            <div className='flex flex-col items-center justify-center text-center gap-8 shadow-md md:h-[580px] px-8 py-8 md:py-0 bg-white text-black hover:bg-[#1D1D1D] hover:text-white transition-all duration-200 ease-in-out'>
              <Image
                src={`/services/${idx}.png`}
                alt={`service: ${service.name}`}
                height={140}
                width={140}
              />
              <h2 className='font-medium lg:text-3xl text-2xl w-full'>
                {service.name}
              </h2>
              <p>{service.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </Layout>
  );
};

export default Services;
