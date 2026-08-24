import { MoveLeft, MoveRight } from 'lucide-react';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';

import { ExpertiseData } from '../pages/services/BaseServicePages';

interface IconTextBoxZebraProps {
  data: ExpertiseData;
}

const IconTextBoxZebra: React.FC<IconTextBoxZebraProps> = ({ data }) => {
  const [current, setCurrent] = useState<number>(0);
  const [perView, setPerView] = useState<number>(2);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const handleResize = (): void => {
      setPerView(window.innerWidth >= 640 ? 2 : 1);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const move = (dir: number): void => {
    setCurrent((prev) => {
      let next = prev + dir * perView;
      if (next >= (data?.items?.length || 0)) next = 0;
      if (next < 0)
        next = Math.floor(((data?.items?.length || 0) - 1) / perView) * perView;
      return next;
    });
  };

  const startTimer = (): void => {
    timerRef.current = setInterval(() => move(1), 4000);
  };

  const resetTimer = (): void => {
    if (timerRef.current) clearInterval(timerRef.current);
    startTimer();
  };

  const handleManualMove = (dir: number): void => {
    resetTimer();
    move(dir);
  };

  useEffect(() => {
    startTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  });

  useEffect(() => {
    setCurrent(0);
  }, [perView]);

  const visible = data?.items?.slice(current, current + perView) || [];

  const renderIcon = (item: any) => {
    if (!item?.image) return null;
    if (typeof item.image === 'function') {
      return React.createElement(item.image, {
        className: 'w-8 h-8 text-orange-500',
      });
    }
    if (
      typeof item.image === 'string' ||
      (typeof item.image === 'object' && 'src' in item.image)
    ) {
      return (
        <Image
          src={item.image as any}
          alt={item?.title}
          width={32}
          height={32}
        />
      );
    }
    if (React.isValidElement(item.image)) {
      return React.cloneElement(item.image, {
        className: `${
          (item.image.props as any)?.className || ''
        } w-8 h-8 text-orange-500`,
      });
    }
    return null;
  };

  return (
    <section className='flex flex-col py-20 px-4 md:px-40 text-center bg-gray-100'>
      <h2 className='text-3xl md:text-4xl font-bold'>
        <span className='text-orange-500'>
          {data?.headingData?.coloredHeading}
        </span>
        {data?.headingData?.heading}
      </h2>
      <p className='text-gray-600 mt-4'>{data?.headingData?.description}</p>

      <div className='flex items-center gap-2 md:gap-4 mt-10'>
        <button
          onClick={() => handleManualMove(-1)}
          disabled={current === 0}
          className='flex-shrink-0 disabled:opacity-25 transition-opacity'
        >
          <MoveLeft className='text-orange-500 w-7 h-7 md:w-11 md:h-11' />
        </button>

        <div
          className={`grid flex-1 gap-4 md:gap-8 ${
            perView === 2 ? 'grid-cols-2' : 'grid-cols-1'
          }`}
        >
          {visible.map((item) => (
            <div
              key={item?.id}
              className={`flex items-center p-6 rounded-lg shadow-md ${
                item?.dark
                  ? 'bg-black text-white'
                  : 'bg-white text-black border'
              }`}
            >
              <div className='w-13 h-13 relative mr-4 flex items-center justify-center'>
                {renderIcon(item)}
              </div>
              <div className='text-left'>
                <h3 className='font-bold text-lg'>{item?.title}</h3>
                <p className='text-sm mt-2'>{item?.description}</p>
              </div>
            </div>
          ))}
        </div>
        <button
          onClick={() => handleManualMove(1)}
          disabled={current + perView >= (data?.items?.length || 0)}
          className='flex-shrink-0 disabled:opacity-25 transition-opacity'
        >
          <MoveRight className='text-orange-500 w-7 h-7 md:w-11 md:h-11' />
        </button>
      </div>
    </section>
  );
};

export default IconTextBoxZebra;
