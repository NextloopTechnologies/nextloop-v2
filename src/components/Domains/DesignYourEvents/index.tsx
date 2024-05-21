import Image, { StaticImageData } from 'next/image';

import {
  Charity,
  Conferences,
  Exhibitions,
  Fashion,
  Music,
  Seminars,
} from '../../../../assets';

type Data = {
  id: number;
  image: StaticImageData;
  title: string;
};

const sampleData: Data[] = [
  {
    id: 1,
    image: Music,
    title: 'Music Venue',
  },
  {
    id: 2,
    image: Fashion,
    title: 'Fashion shows and red carpets',
  },
  {
    id: 3,
    image: Conferences,
    title: 'Conferences',
  },
  {
    id: 4,
    image: Charity,
    title: 'Charity Events',
  },
  {
    id: 5,
    image: Seminars,
    title: 'Seminars',
  },
  {
    id: 6,
    image: Exhibitions,
    title: 'Exhibitions',
  },
];

type Props = {
  data: Data;
};

const Card = ({ data }: Props) => (
  <div className='flex flex-col justify-center items-center h-auto py-4 md:py-5 w-[380px] md:mx-0 md:w-[430px] gap-8 rounded-lg bg-white shadow-lg'>
    <Image
      src={data.image}
      className='w-[350px] md:w-[392px] object-contain rounded-lg'
      alt={data.title}
    />
    <h3 className='font-medium text-2xl leading-6 uppercase text-center mx-20'>
      {data.title}
    </h3>
  </div>
);

const DesignYourEvents = () => {
  return (
    <div className='flex flex-col py-[122px] mx-auto gap-[109px]'>
      <h1 className='text-3xl md:text-7xl uppercase max-w-[1058px] mx-auto font-bold text-center'>
        Design your events website the way{' '}
        <span className='text-orange-500'>you want</span>
      </h1>

      <div className='grid gap-20 mx-auto grid-cols-1 lg:grid-cols-3 md:grid-cols-2'>
        {sampleData.map((data) => (
          <Card key={data.id} data={data} />
        ))}
      </div>
    </div>
  );
};

export default DesignYourEvents;
