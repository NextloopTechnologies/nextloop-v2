import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';

interface ProductCardProps {
  image: string | StaticImageData;
  title: string;
  description: string;
  link: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  image,
  title,
  description,
  link,
}) => (
  <Link href={link} className='block group relative w-full h-full'>
    <div className='relative h-96'>
      <Image
        src={image}
        alt={title}
        className='absolute inset-0 w-full h-full object-cover transition-transform duration-300 scale-100 group-hover:scale-110'
      />
      <div className='absolute inset-0 bg-black bg-opacity-50 transition-opacity group-hover:bg-opacity-60'></div>
      <div className='absolute inset-0 flex flex-col items-center justify-center text-center px-0'>
        <h3 className='text-white font-bold text-lg md:text-xl'>{title}</h3>
        {description && (
          <p className='text-white text-sm md:text-md mt-1'>{description}</p>
        )}
        <div className='absolute bottom-4 left-1/2 transform -translate-x-1/2 mt-4 text-white font-semibold text-sm md:text-md flex items-center space-x-2'>
          <span>View More</span>
          <span>→</span>
        </div>
      </div>
    </div>
  </Link>
);
