import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';
import React from 'react';
import { BiRightArrowAlt } from 'react-icons/bi';

type ImageLike = string | StaticImageData | React.ReactNode | React.ElementType;

interface ProductCardProps {
  image: ImageLike;
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
      {/* support image or icon */}
      {React.isValidElement(image) ? (
        React.cloneElement(image, {
          ...image.props,
          className: `${image.props?.className || ''} absolute inset-0 dark:text-white text-black dark:group-hover:text-white group-hover:text-black w-full h-full object-cover text-orange-600`.trim(),
          size: image.props?.size || 48,
          color: image.props?.color ?? 'currentColor',
        })
      ) : typeof image === 'function' ? (
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        React.createElement(image as any, { className: 'absolute inset-0 w-full h-full object-cover text-orange-500', size: 48, color: 'currentColor dark:text-white text-black dark:group-hover:text-white group-hover:text-black' })
      ) : typeof image === 'object' && (image as any).src ? (
        <Image
          src={image as any}
          fill
          alt={title}
          className='absolute inset-0 w-full h-full object-cover transition-transform duration-300 scale-100 group-hover:scale-110 dark:text-white text-black dark:group-hover:text-white group-hover:text-black'
        />
      ) : typeof image === 'string' ? (
        <Image
          src={image as string}
          fill
          alt={title}
          className='absolute inset-0 w-full h-full object-cover transition-transform duration-300 scale-100 group-hover:scale-110 dark:text-white text-black dark:group-hover:text-white group-hover:text-black'
        />
      ) : null}
      <div className='absolute inset-0 bg-black bg-opacity-50 transition-opacity group-hover:bg-opacity-60'></div>
      <div className='absolute inset-0 flex flex-col items-center justify-center text-center px-0'>
        <h3 className='text-white font-bold text-lg md:text-xl'>{title}</h3>
        {description && (
          <p className='text-white text-sm md:text-md mt-1'>{description}</p>
        )}
        <div className='absolute bottom-4 left-1/2 transform -translate-x-1/2 mt-4 text-white font-semibold text-sm md:text-md flex items-center space-x-2'>
          <span>View More</span>
          <BiRightArrowAlt className='inline-block transition-transform duration-300 group-hover:translate-x-1' />
        </div>
      </div>
    </div>
  </Link>
);
