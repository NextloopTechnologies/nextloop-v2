import Image from 'next/image';

import { ExpertiseData } from '../pages/services/BaseServicePages';

interface IconTextBoxZebraProps {
  data: ExpertiseData;
}

const IconTextBoxZebra: React.FC<IconTextBoxZebraProps> = ({ data }) => {
  return (
    <section className='flex flex-col py-20 px-4 md:px-40 text-center bg-gray-100'>
      <h3 className='text-3xl md:text-4xl font-bold'>
        <span className='text-orange-500'>
          {data?.headingData?.coloredHeading}
        </span>{' '}
        {data?.headingData?.heading}
      </h3>
      <p className='text-gray-600 mt-4'>{data?.headingData?.description}</p>
      <div className='grid md:grid-cols-2 mt-10'>
        {data?.items?.map((item) => (
          <div
            key={item?.id}
            className={`flex items-center p-6 rounded-lg shadow-md ${
              item?.dark ? 'bg-black text-white' : 'bg-white text-black border'
            }`}
          >
            <div className='w-13 h-13 relative mr-4'>
              <Image src={item?.image} alt={item?.title} />
            </div>
            <div className='text-left'>
              <h3 className='font-bold text-lg uppercase'>{item?.title}</h3>
              <p className='text-sm mt-2'>{item?.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default IconTextBoxZebra;
