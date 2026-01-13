import Image from 'next/image';

import styles from './SlidingImages.module.css';


interface SlidingImagesProps {
  images: string[];
}

const SlidingImages = ({ images }: SlidingImagesProps) => {
  return (
    <div className='w-full overflow-hidden py-12'>
      <div className={`${styles.marquee} gap-12`}>
        {[...images, ...images].map((src, index) => (
          <div
            key={index}
            className='relative h-[330px] w-[550px] flex-shrink-0'
          >
            <Image
              src={src}
              alt={`slide-${index}`}
              fill
              className='object-cover rounded-xl'
              priority={index < images.length}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SlidingImages;
