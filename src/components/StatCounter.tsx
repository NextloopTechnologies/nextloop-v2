'use client';

import { useEffect, useRef, useState } from 'react';

interface StatCounterProps {
  end: number;
  duration?: number;
  suffix?: string;
}

const StatCounter: React.FC<StatCounterProps> = ({
  end = 0,
  duration = 2000,
  suffix = '',
}) => {
  const [count, setCount] = useState(end);
  const ref = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    if (!ref.current) return;

    let start = 0;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;

        if (entry.isIntersecting) {
          setCount(0);
          const increment = end / (duration / 16);

          const animate = () => {
            start += increment;
            if (start < end) {
              setCount(Math.floor(start));
              requestAnimationFrame(animate);
            } else {
              setCount(end);
            }
          };

          animate();
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, [end, duration]);

  return (
    <span ref={ref} className='text-4xl font-bold text-orange-400'>
      {count}
      {suffix}
    </span>
  );
};

export default StatCounter;
