import { useCallback, useEffect, useRef, useState } from 'react';

const ITEM_H = 54;
const PANEL_H = 160;
const SCROLL_THRESHOLD = 60;

interface StepItem {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
}

interface HeadingData {
  heading: string;
  coloredHeading: string;
  description?: string;
}

export interface ProcessData {
  headingData: HeadingData;
  items: StepItem[];
}

interface OurProcessProps {
  processData: ProcessData;
}

const OurProcess: React.FC<OurProcessProps> = ({ processData }) => {
  const { headingData, items } = processData;

  const [activeIndex, setActiveIndex] = useState(0);
  const accumulatedDelta = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const goTo = useCallback(
    (index: number) => {
      setActiveIndex(Math.max(0, Math.min(items.length - 1, index)));
    },
    [items]
  );

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      accumulatedDelta.current += e.deltaY;
      if (accumulatedDelta.current > SCROLL_THRESHOLD) {
        setActiveIndex((prev) => Math.min(items.length - 1, prev + 1));
        accumulatedDelta.current = 0;
      } else if (accumulatedDelta.current < -SCROLL_THRESHOLD) {
        setActiveIndex((prev) => Math.max(0, prev - 1));
        accumulatedDelta.current = 0;
      }
    };

    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, [items]);

  const touchStartY = useRef(0);

  const onTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    if (touch) touchStartY.current = touch.clientY;
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    const touch = e.changedTouches[0];
    if (touch) {
      const diff = touchStartY.current - touch.clientY;
      if (Math.abs(diff) > 30) goTo(activeIndex + (diff > 0 ? 1 : -1));
    }
  };

  const centerOffset = PANEL_H / 2 - ITEM_H / 2;
  const titleTrackY = centerOffset - activeIndex * ITEM_H;
  const descTrackY = -activeIndex * PANEL_H;

  return (
    <section className='bg-[#f0f0f0] flex flex-col items-center px-6 py-20 font-sans'>
      {/* Dynamic heading — same pattern as expertiseData */}
      <h2 className='text-3xl md:text-4xl font-bold tracking-tight text-center mb-4'>
        <span className='text-gray-900'>{headingData.heading}</span>
        <span className='text-orange-500'>{headingData.coloredHeading}</span>
      </h2>

      {/* Optional description — only renders if provided in static data */}
      {headingData.description && (
        <p className='text-gray-600 text-center max-w-6xl mb-12 text-base'>
          {headingData.description}
        </p>
      )}

      {/* Scrolling panel */}
      <div
        ref={containerRef}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        // className='w-full max-w-4xl flex items-stretch cursor-ns-resize select-none'
        // style={{ height: `${PANEL_H}px` }}
        className='w-full max-w-4xl flex flex-col md:flex-row items-stretch cursor-ns-resize select-none'
        style={{ height: undefined }}
      >
        {/* Left — scrolling titles */}
        <div className='relative overflow-hidden w-full md:w-[260px] h-[160px] shrink-0'>
          <div
            className='absolute w-full transition-transform duration-400 ease-[cubic-bezier(0.4,0,0.2,1)]'
            style={{ transform: `translateY(${titleTrackY}px)` }}
          >
            {items.map((step, index) => {
              const dist = Math.abs(index - activeIndex);
              const isActive = dist === 0;
              return (
                <div
                  key={index}
                  onClick={() => goTo(index)}
                  className={`
                    h-[54px] flex items-center px-3 rounded-lg cursor-pointer
                    font-bold text-[13px] transition-all duration-400
                    ${isActive ? 'bg-black text-white opacity-100' : ''}
                    ${!isActive && dist === 1 ? 'opacity-50 text-gray-600' : ''}
                    ${!isActive && dist > 1 ? 'opacity-20 text-gray-500' : ''}
                  `}
                >
                  <h3>{step.title}</h3>
                </div>
              );
            })}
          </div>
          <div className='absolute top-0 left-0 right-0 h-12 bg-gradient-to-b from-[#f0f0f0] to-transparent pointer-events-none z-10' />
          <div className='absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-[#f0f0f0] to-transparent pointer-events-none z-10' />
        </div>

        {/* Divider */}
        <div className='mx-3 md:mx-8 w-px bg-orange-400 shrink-0 hidden md:block' />

        {/* Right — scrolling descriptions */}
        <div className='relative overflow-hidden w-full flex-1 h-[160px] mt-4 md:mt-0'>
          <div
            className='absolute w-full transition-transform duration-400 ease-[cubic-bezier(0.4,0,0.2,1)]'
            style={{ transform: `translateY(${descTrackY}px)` }}
          >
            {items.map((step, index) => (
              <div
                key={index}
                className={`
                  h-[160px] flex flex-col gap-4 justify-center items-center pr-2
                  transition-opacity duration-400
                  ${index === activeIndex ? 'opacity-100' : 'opacity-0'}
                `}
              >
                <p className='text-sm text-gray-700 leading-relaxed m-0 text-center'>
                  {step.description}
                </p>
              </div>
            ))}
          </div>
          <div className='absolute top-0 left-0 right-0 h-12 bg-gradient-to-b from-[#f0f0f0] to-transparent pointer-events-none z-10' />
          <div className='absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-[#f0f0f0] to-transparent pointer-events-none z-10' />
        </div>
      </div>
    </section>
  );
};

export default OurProcess;
