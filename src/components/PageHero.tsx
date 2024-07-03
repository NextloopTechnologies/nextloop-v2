import Image, { StaticImageData } from 'next/image';

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
          <h1 className='font-bold lg:text-9xl text-6xl md:text-6xl uppercase '>
            <span className='text-orange-500'>{coloredTitle}</span>
            {title}
          </h1>
        ) : (
          <h1 className='font-bold lg:text-9xl text-3xl md:text-6xl uppercase '>
            {title}
          </h1>
        )}
        <span className='text-lg lg:text-[16px] xl:w-[50%] md:w-[60%] text-center'>
          {subtitle}
        </span>
      </div>
    </div>
  );
};

export default PageHero;
