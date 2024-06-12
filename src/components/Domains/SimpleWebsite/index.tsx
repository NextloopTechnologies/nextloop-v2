import { Card, Data as ShadowCardData } from '../DesignYourEvents';
import {
  SimpleWebsite1,
  SimpleWebsite2,
  SimpleWebsite3,
  SimpleWebsite4,
} from '../../../../assets';

const sampleData: ShadowCardData[] = [
  {
    id: 1,
    image: SimpleWebsite1,
    title: 'Build your website, without compromise',
    description:
      'Create a professional hotel website, without the hassle of finding and managing web developers.',
  },
  {
    id: 2,
    image: SimpleWebsite2,
    title: 'Attract more direct bookings',
    description:
      'Drive more direct revenue to your property by seamlessly connecting your website with the SiteMinder booking engine.',
  },
  {
    id: 3,
    image: SimpleWebsite3,
    title: 'A website in your local language',
    description:
      'Attract global travellers with the option to view your website in more than 20 languages.',
  },
  {
    id: 4,
    image: SimpleWebsite4,
    title: 'Website design for all devices',
    description:
      'Leverage our mobile-optimised themes and templates to ensure your guests are able to book on-the-go.',
  },
];

const SimpleWebsite = () => {
  return (
    <div className='flex flex-col py-[122px] mx-auto gap-[109px]'>
      <h1 className='text-3xl mx-1 md:text-7xl uppercase max-w-[1200px] md:mx-auto font-bold text-center'>
        A simple website development for{' '}
        <span className='text-orange-500'>hotels</span>
      </h1>

      <div className='flex flex-wrap items-center gap-5 mx-auto'>
        {sampleData.map((data) => (
          <Card
            key={data.id}
            data={data}
            classname='mx-auto md:w-[350px] h-[510px]'
            imageClassname='md:w-[300px] h-[286px] object-cover'
            titleClassname='-mx-0 md:mx-0'
          />
        ))}
      </div>
    </div>
  );
};

export default SimpleWebsite;