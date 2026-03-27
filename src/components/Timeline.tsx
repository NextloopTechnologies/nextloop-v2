'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

import palette from '../styles/pallette';

const timelineData = [
  { year: "2019", description: "Launched with a core engineering team of 4, delivering 6+ custom software projects." },
  { year: "2020", description: "Transitioned to remote-first execution and achieved 90% client retention despite global disruption." },
  { year: "2021", description: "Entered fintech and healthtech domains, grew the team by 60%, and launched cloud-native solution capabilities." },
  { year: "2022", description: "Delivered 20+ scalable platforms, introduced DevOps & cloud optimization services." },
  { year: "2023", description: "Partnered with high-growth startups, expanded staff augmentation services, and grew the engineering team." },
  { year: "2024", description: "Participated at GITEX Asia, expanded cross-border collaborations, and surpassed 50+ cumulative successful project deliveries." },
  { year: "2025", description: "Driving digital transformation with AI, automation, blockchain, and scalable cloud ecosystems." },
];

/* ─── SVG constants ─────────────────────────────────────────────────────────── */
const W = 2440;
const H = 560;
const EXTEND = 800;
const TOP_Y = 200;
const BOT_Y = 360;
const CR = 65;

const C1 = 440; const C2 = 880; const C3 = 1320;
const C4 = 1760; const C5 = 2200; const C6 = 2640;

const snakePath = `
  M 0,${TOP_Y}
  L ${C1 - CR},${TOP_Y}
  Q ${C1},${TOP_Y} ${C1},${TOP_Y + CR}
  L ${C1},${BOT_Y - CR}
  Q ${C1},${BOT_Y} ${C1 + CR},${BOT_Y}

  L ${C2 - CR},${BOT_Y}
  Q ${C2},${BOT_Y} ${C2},${BOT_Y - CR}
  L ${C2},${TOP_Y + CR}
  Q ${C2},${TOP_Y} ${C2 + CR},${TOP_Y}

  L ${C3 - CR},${TOP_Y}
  Q ${C3},${TOP_Y} ${C3},${TOP_Y + CR}
  L ${C3},${BOT_Y - CR}
  Q ${C3},${BOT_Y} ${C3 + CR},${BOT_Y}

  L ${C4 - CR},${BOT_Y}
  Q ${C4},${BOT_Y} ${C4},${BOT_Y - CR}
  L ${C4},${TOP_Y + CR}
  Q ${C4},${TOP_Y} ${C4 + CR},${TOP_Y}

  L ${C5 - CR},${TOP_Y}
  Q ${C5},${TOP_Y} ${C5},${TOP_Y + CR}
  L ${C5},${BOT_Y - CR}
  Q ${C5},${BOT_Y} ${C5 + CR},${BOT_Y}

  L ${C6 - CR},${BOT_Y}
  Q ${C6},${BOT_Y} ${C6},${BOT_Y - CR}
  L ${C6},${TOP_Y + CR}
  Q ${C6},${TOP_Y} ${C6 + CR},${TOP_Y}

  L ${W + EXTEND},${TOP_Y}
`;

const nodes = [
  { cx: C1 / 2, cy: TOP_Y, top: true },
  { cx: (C1 + C2) / 2, cy: BOT_Y, top: false },
  { cx: (C2 + C3) / 2, cy: TOP_Y, top: true },
  { cx: (C3 + C4) / 2, cy: BOT_Y, top: false },
  { cx: (C4 + C5) / 2, cy: TOP_Y, top: true },
  { cx: (C5 + C6) / 2, cy: BOT_Y, top: false },
  { cx: C6 + 250, cy: TOP_Y, top: true },
];

/* ─── Shared icon ────────────────────────────────────────────────────────────── */
const LightbulbIcon = ({ color }: { color?: string }) => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none"
    stroke={color ?? 'white'} strokeWidth="2.0"
    strokeLinecap="round" strokeLinejoin="round"
  >
    <path d="M9 18h6M10 22h4M12 2a7 7 0 0 1 7 7c0 2.5-1.3 4.7-3.3 6L15 17H9l-.7-2C6.3 13.7 5 11.5 5 9a7 7 0 0 1 7-7z" />
  </svg>
);

/* ─── Desktop card ─────────────────────────────────────────────────────────── */
const DesktopCard = ({
  item, top, index,
}: {
  item: (typeof timelineData)[0] | undefined;
  top: boolean;
  index: number;
}) => {
  if (!item) return null;
  const isOrange = index % 2 === 0;
  return (
    <div
      className={`absolute left-1/2 -translate-x-1/2 w-80 ${
        top ? 'top-[calc(50%+100px)]' : 'bottom-[calc(50%+100px)]'
      }`}
    >
      {/* connector */}
      <div
        className={`absolute left-1/2 -translate-x-1/2 w-px h-24 ${
          isOrange ? 'bg-white/30' : 'bg-orange-500/50'
        } ${top ? 'bottom-full' : 'top-full'}`}
      />
      <div
        className={`rounded-lg p-4 gap-6 flex flex-row justify-center items-center ${
          isOrange ? 'bg-orange-500' : 'bg-white'
        }`}
      >
        <div
          className={`w-10 h-10 p-3 rounded-full flex flex-col items-center justify-center mx-auto mb-2 ${
            isOrange ? 'bg-white/20' : 'bg-orange-100'
          }`}
        >
          <div className="p-2">
            <LightbulbIcon color={isOrange ? 'white' : '#f97316'} />
          </div>
          <h3 className={`text-lg font-bold mb-1 ${isOrange ? 'text-white' : 'text-black'}`}>
            {item.year}
          </h3>
        </div>
        <div>
          <p className={`text-semibold text-start leading-5 ${isOrange ? 'text-white/80' : 'text-gray-500'}`}>
            {item.description}
          </p>
        </div>
      </div>
    </div>
  );
};

/* ─── Desktop horizontal-scroll snake ───────────────────────────────────────── */
const DesktopTimeline = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });
  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-51%']);

  return (
    <div ref={containerRef} className="relative h-[500vh] bg-[#0a0a0a]">
      <div className="sticky top-0 h-screen flex flex-col items-center overflow-hidden">

        {/* ── Heading & description pinned at top of sticky viewport ── */}
        <div className="w-full text-center px-6 pt-24  shrink-0">
          <h2
            className={`${palette.fontSize.heading2.mobile} md:${palette.fontSize.heading2.desktop} uppercase font-bold text-white`}
          >
            Our <span className="text-orange-500">Journey</span>
          </h2>
          <p className="mt-3 text-white/70 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
            Nextloop Technologies started with a belief that technology should move businesses forward.
            From solving individual challenges to building scalable digital ecosystems across industries,
            every step was intentional.
          </p>
        </div>

        {/* ── Snake road ── */}
        <div className="flex-1 flex items-center overflow-hidden w-full">
          <motion.div style={{ x }} className="relative will-change-transform shrink-0">
            <svg
              width={W + EXTEND}
              height={H}
              viewBox={`0 0 ${W + EXTEND} ${H}`}
              fill="none"
              className="block"
            >
              
              <path d={snakePath} stroke="#FA8145" strokeWidth="25"
                strokeLinecap="round" strokeLinejoin="round" fill="none" />
              <path d={snakePath} stroke="white" strokeWidth="2.5"
                strokeLinecap="round" fill="none" strokeDasharray="18 20" />
            </svg>

            <div className="absolute inset-0">
              {nodes.map((node, index) => (
                <div
                  key={index}
                  className="absolute w-[210px] h-[300px] -translate-x-1/2 -translate-y-1/2"
                  style={{ left: node.cx, top: node.cy }}
                >
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[20px] h-[20px] rounded-full bg-white z-20">
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[12px] h-[12px] rounded-full bg-black" />
                  </div>
                  <DesktopCard item={timelineData[index]} top={node.top} index={index} />
                </div>
              ))}
            </div>
          </motion.div>
        </div>

      </div>
    </div>
  );
};

/* ─── Mobile vertical timeline ───────────────────────────────────────────────── */
const MobileCard = ({
  item,
  index,
}: {
  item: (typeof timelineData)[0];
  index: number;
}) => {
  const isOrange = index % 2 === 0;
  return (
    <motion.div
      initial={{ opacity: 0, x: -24 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.45, delay: 0.05 * index }}
      className="flex gap-4 items-start"
    >
      {/* Left: dot + vertical line */}
      <div className="flex flex-col items-center shrink-0 pt-1">
        <div className="w-5 h-5 rounded-full bg-white flex items-center justify-center z-10 shrink-0">
          <div className="w-3 h-3 rounded-full bg-[#0a0a0a]" />
        </div>
        {index < timelineData.length - 1 && (
          <div className="w-px flex-1 min-h-[64px] bg-orange-500/40 mt-1" />
        )}
      </div>

      {/* Right: card */}
      <div
        className={`mb-6 rounded-xl p-4 flex gap-4 items-center flex-1 ${
          isOrange ? 'bg-orange-500' : 'bg-white'
        }`}
      >
        <div
          className={`shrink-0 w-14 h-14 rounded-full flex flex-col items-center justify-center gap-0.5 ${
            isOrange ? 'bg-white/20' : 'bg-orange-100'
          }`}
        >
          <LightbulbIcon color={isOrange ? 'white' : '#f97316'} />
          <span className={`text-[10px] font-bold leading-none ${isOrange ? 'text-white' : 'text-orange-500'}`}>
            {item.year}
          </span>
        </div>

        <p className={`text-base leading-5 ${isOrange ? 'text-white/90' : 'text-gray-600'}`}>
          {item.description}
        </p>
      </div>
    </motion.div>
  );
};

const MobileTimeline = () => (
  <div className="bg-[#0a0a0a] h-auto px-5 py-16">
    {/* Header */}
    <div className="mb-12 text-center">
      <h2
        className={`${palette.fontSize.heading2.mobile} md:${palette.fontSize.heading2.desktop} uppercase font-bold text-white`}
      >
        Our <span className="text-orange-500">Journey</span>
      </h2>
      <p className="mt-3 text-white/70 text-sm leading-relaxed">
        Nextloop Technologies started with a belief that technology should move businesses forward.
        From solving individual challenges to building scalable digital ecosystems across industries,
        every step was intentional.
      </p>
    </div>

    <div className="max-w-3xl mx-auto">
      {timelineData.map((item, i) => (
        <MobileCard key={item.year} item={item} index={i} />
      ))}
    </div>
  </div>
);

/* ─── Root: pick layout by breakpoint ───────────────────────────────────────── */
const Timeline = () => {
  const [breakpoint, setBreakpoint] = useState<'mobile' | 'tablet' | 'desktop'>('desktop');

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      if (w < 640) setBreakpoint('mobile');
      else if (w <= 1024) setBreakpoint('tablet');
      else setBreakpoint('desktop');
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  if (breakpoint === 'mobile' || breakpoint === 'tablet') return <MobileTimeline />;
  return <DesktopTimeline />;
};

export default Timeline;
