"use client";

import { useEffect, useRef, useState } from "react";

interface StatCounterProps {
  end: number;
  duration?: number;
  suffix?: string;
}

const StatCounter: React.FC<StatCounterProps> = ({
  end,
  duration = 2000,
  suffix = "",
}) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement | null>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;

        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;

          let start = 0;
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
        }
      },
      { threshold: 0.4 }
    );

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, [end, duration]);

  return (
    <span ref={ref} className="text-4xl font-bold text-orange-400">
      {count}
      {suffix}
    </span>
  );
};

export default StatCounter;
