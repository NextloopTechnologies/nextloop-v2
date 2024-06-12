import Image from 'next/image';

import {
  ProWebsite1,
  ProWebsite2,
  ProWebsite3,
  ProWebsite4,
} from '../../../../assets';

const sampleData = [
  {
    id: 1,
    image: ProWebsite1,
    title: 'List your rooms on leading metasearch sites',
    description:
      'Enjoy more direct bookings when your hotel is highly visible on sites such as Google Hotel Ads, Trivago and Tripadvisor.',
  },
  {
    id: 2,
    image: ProWebsite2,
    title: 'SEO-friendly web design',
    description:
      'Drive more organic visits to your site with a website builder that makes search engine optimisations easy.',
  },
  {
    id: 3,
    image: ProWebsite3,
    title: 'Hotel App Store',
    description:
      'Enhance your website experience and improve conversion with easy access to 100+ hotel apps ranging from upselling and reviews to loyalty and guest messaging.',
  },
  {
    id: 4,
    image: ProWebsite4,
    title: 'A range of hotel website designs to choose from',
    description:
      'Stand out from the crowd with multiple customisable themes to make your website wholly unique.',
  },
];

const ProfessionalWebsite = () => {
  return (
    <div className='flex flex-col py-[122px] mx-auto gap-[109px]'>
      <h1 className='text-3xl mx-3 md:text-7xl uppercase max-w-[1200px] md:mx-auto font-bold text-center'>
        A professional{' '}
        <span className='text-orange-500'>website development</span> that makes
        you impossible to ignore
      </h1>

      <div className='grid grid-cols-1 md:grid-cols-2 md:rounded-xl gap-4 md:gap-0 mx-5 md:mx-16'>
        {sampleData.map((data, index) => (
          <div
            key={data.id}
            className={`flex flex-col md:flex-row items-center p-7 gap-10 shadow-md ${(index === 1 || index === 2) && 'bg-[#1D1D1D] text-white'
              } ${index === 2
                ? 'md:rounded-bl-xl'
                : index === 1 && 'md:rounded-tr-xl'
              }`}
          >
            <Image
              src={data.image}
              alt={data.title}
              className='h-16 w-16 object-contain'
            />

            <div className='flex flex-col gap-5'>
              <h2 className='text-xl font-medium uppercase'>{data.title}</h2>

              <p className='text-lg font-normal'>{data.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfessionalWebsite;