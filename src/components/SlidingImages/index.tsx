import Image from 'next/image';

import styles from './Sliding.module.css';

interface SlidingImagesProps {
  images?: string[];
}

const SlidingImages = ({ images = [] }: SlidingImagesProps) => {
  if (!images.length) return null;

  return (
    <div className="w-full overflow-hidden py-8 md:py-12">
      <div className={styles.marquee}>
        {[...images].map((src, index) => (
          <div
            key={index}
            className=" relative h-[180px] w-[260px] sm:h-[220px] sm:w-[320px] md:h-[280px] md:w-[380px] lg:h-[350px] lg:w-[460px] flex-shrink-0 mx-3 sm:mx-4"
          >
            <Image
              src={src}
              alt={`slide-${index}`}
              fill
              className="object-cover rounded-xl"
              priority={index < images.length}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SlidingImages;
