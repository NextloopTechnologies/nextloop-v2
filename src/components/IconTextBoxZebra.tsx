import Image from 'next/image';
import { StaticImageData } from 'next/image';

interface DataItem {
  id: number;
  title: string;
  description: string;
  image: StaticImageData;
  dark?: boolean;
}

interface IconTextBoxZebraProps {
  data: DataItem[];
}

const IconTextBoxZebra: React.FC<IconTextBoxZebraProps> = ({ data }) => {
  return (
    <section className='flex flex-col py-16 px-4 md:px-40 text-center'>
      <h3 className='text-3xl md:text-4xl font-bold'>
        OUR EXPERTISE IN{' '}
        <span className='text-orange-500'>CUSTOM SOFTWARE DEVELOPMENT</span>
      </h3>
      <p className='text-gray-600 mt-4'>
        We bring extensive experience across a wide range of industries. Our
        custom solutions include:
      </p>
      <div className='grid md:grid-cols-2 mt-10'>
        {data.map((item) => (
          <div
            key={item.id}
            className={`flex items-center p-6 rounded-lg shadow-md ${
              item.dark ? 'bg-black text-white' : 'bg-white text-black border'
            }`}
          >
            <div className='w-13 h-13 relative mr-4'>
              <Image src={item.image} alt={item.title} />
            </div>
            <div className='text-left'>
              <h3 className='font-bold text-lg'>{item.title}</h3>
              <p className='text-sm mt-2'>{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default IconTextBoxZebra;
