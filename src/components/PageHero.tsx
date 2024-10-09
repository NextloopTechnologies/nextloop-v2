import Image, { StaticImageData } from 'next/image';

import palette from '../styles/pallette';

const PageHero: React.FC<{
  image: StaticImageData;
  title: string;
  subtitle: string;
  coloredTitle?: string;
  opacity?: string;
}> = ({
  image,
  subtitle,
  title,
  coloredTitle = false,
  opacity = 'opacity-40',
}) => {
  return (
    <div className='h-screen relative flex items-center justify-center text-white'>
      <Image
        src={image}
        className='absolute h-full w-full object-cover'
        alt='blogs background'
        quality={100}
      />
      <div className={`absolute inset-0 bg-black ${opacity}`}></div>
      <div className='flex flex-col gap-8 items-center z-20 px-4 lg:p-0'>
        {coloredTitle ? (
          <h1
            className={`${palette.fontSize.heading1.mobile} md:${palette.fontSize.heading1.desktop} font-bold uppercase`}
          >
            <span className='text-orange-500'>{coloredTitle}</span>
            {title}
          </h1>
        ) : (
          <h1
            className={`${palette.fontSize.heading1.mobile} md:${palette.fontSize.heading1.desktop} font-bold uppercase`}
          >
            {title}
          </h1>
        )}
        <span
          className={`${palette.fontSize.subtitle.mobile} md:${palette.fontSize.subtitle.desktop} md:w-[70%] text-center px-4 md:px-0`}
        >
          {subtitle}
        </span>
      </div>
    </div>
  );
};

export default PageHero;
