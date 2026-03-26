import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

import { NextLoopColoredLogo } from '../../assets';

const StarRating = ({ count = 5 }: { count?: number }) => (
  <div className="flex gap-0.5">
    {Array.from({ length: count }).map((_, i) => (
      <svg key={i} className="w-3 h-3 text-yellow-400 fill-yellow-400" viewBox="0 0 20 20">
        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
      </svg>
    ))}
  </div>
);

const ReviewCard = ({
  score,
  logo,
}: {
  score: string | null;
  logo: 'google' | 'clutch' | 'g2' | 'reviews';
}) => {
  const logos: Record<string, React.ReactNode> = {
    google: (
      <span className="font-semibold text-xs">
        <span style={{ color: '#4285F4' }}>G</span>
        <span style={{ color: '#EA4335' }}>o</span>
        <span style={{ color: '#FBBC04' }}>o</span>
        <span style={{ color: '#34A853' }}>g</span>
        <span style={{ color: '#EA4335' }}>l</span>
        <span style={{ color: '#4285F4' }}>e</span>
      </span>
    ),
    clutch: <span className="font-bold text-xs text-gray-800">Clutch</span>,

    reviews: null,
  };

  return (
    <div className="flex flex-col items-center justify-center border border-gray-200 rounded-xl px-2 py-2 gap-1 flex-1">
      {logo === 'reviews' ? (
        <>
          <span className="text-sm font-bold text-gray-800 leading-tight">100+</span>
          <span className="text-[9px] text-gray-500 font-medium text-center leading-tight">REVIEWS</span>
        </>
      ) : (
        <>
          <span className="text-sm font-bold text-gray-800">{score}</span>
          <StarRating />
          {logos[logo]}
        </>
      )}
    </div>
  );
};

const PopupForm: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [country, setCountry] = useState('');
  const [service, setService] = useState('');
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const dismissed = sessionStorage.getItem('popupDismissed');
    if (dismissed) return;

    const showTimer = setTimeout(() => {
      setIsVisible(true);
    }, 5000);

    return () => clearTimeout(showTimer);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    sessionStorage.setItem('popupDismissed', 'true');
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4"
          onClick={(e) => e.target === e.currentTarget && handleClose()}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="relative bg-white border border-white/10 rounded-2xl p-8 w-full max-w-4xl"
          >
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 bg-gray-300 text-gray-600 cursor-pointer w-7 h-7 rounded-full flex items-center justify-center hover:bg-gray-400 transition-colors z-10"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Header */}
            <div className="text-center mb-6">
              <h2 className="text-xl md:text-2xl font-bold text-orange-500 leading-snug">
                Looking for vetted developer / offshore development center?
              </h2>
              <p className="text-gray-400 text-sm mt-1">
                Connect with GraffersID experts to hire remote developer on contractual basis.
              </p>
            </div>

            {/* Two Column Body */}
            <div className="flex flex-row items-start gap-4">
              {/* LEFT COLUMN */}
              <div className="w-1/2 flex flex-col gap-3">
                {/* Logo */}
              
                  <div className="flex flex-col items-center ">
                    <Image
                      src={NextLoopColoredLogo}
                      width={150}
                      height={60}
                      alt='NextLoopLogo'
                    />
                  </div>
                 
               

                {/* Promo Card */}
                <div className="border-2 border-orange-500 rounded-2xl px-5 py-5 text-center">
                  <p className="text-gray-800 text-base leading-snug">
                    Hire Smarter and Faster with{' '}
                    <span className="font-black text-lg">1 Week</span> risk free trial.
                  </p>
                  <button
                    className="mt-4 w-full py-3 rounded-md text-white bg-orange-500 font-semibold text-sm tracking-widest uppercase transition hover:opacity-90"
                    
                  >
                    Book Consultation
                  </button>
                </div>

                {/* Review Cards */}
                <div className="flex gap-2">
                  <ReviewCard score="4.9" logo="google" />
                  <ReviewCard score="5.0" logo="clutch" />
                  

                </div>
              </div>

              {/* Center Divider */}
              <div className="flex flex-col items-center self-stretch">
                <div className="flex-1 w-px bg-gray-200" />
                <span className="text-gray-400 text-xs font-semibold my-2">OR</span>
                <div className="flex-1 w-px bg-gray-200" />
              </div>

              {/* RIGHT COLUMN */}
              <div className="w-1/2 flex flex-col gap-3">
                {/* Email + Phone row */}
                <div className="flex gap-2">
                  <input
                    type="email"
                    placeholder="name@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 min-w-0"
                  />
                  <div className="flex items-center border border-gray-300 rounded-md px-2 gap-1">
                    
                    
                    <input
                      type="tel"
                      placeholder="123-456-7890"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-24 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                </div>

                {/* Country */}
                <input
                  type="text"
                  placeholder="Country"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 w-full"
                />

                {/* Service Dropdown */}
                <div>
                  <p className="text-xs text-gray-400 mb-1">0 of 25 max characters.</p>
                  <div className="relative">
                    <select
                      value={service}
                      onChange={(e) => setService(e.target.value)}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 appearance-none bg-white"
                    >
                      <option value="" disabled>Select a Service</option>
                      <option value="web">Web Development</option>
                      <option value="app">App Development</option>
                      <option value="hire">Hire Developer</option>
                      <option value="other">Other</option>
                    </select>
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none text-xs">▾</span>
                  </div>
                </div>

               
                

                {/* reCAPTCHA */}
                <div className="border border-gray-300 rounded-md px-3 py-3 flex items-center justify-between bg-gray-50">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={(e) => setChecked(e.target.checked)}
                      className="w-4 h-4 border-gray-400 rounded cursor-pointer"
                    />
                    <span className="text-sm text-gray-600">I'm not a robot</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <svg viewBox="0 0 64 64" className="w-8 h-8">
                      <circle cx="32" cy="32" r="28" fill="#4A90D9" />
                      <circle cx="32" cy="32" r="20" fill="#fff" />
                      <path d="M32 20l8 12H24z" fill="#4A90D9" />
                    </svg>
                    <span className="text-[9px] text-gray-400 font-semibold">reCAPTCHA</span>
                    <span className="text-[7px] text-gray-400">Privacy · Terms</span>
                  </div>
                </div>

                {/* CTA */}
                <button
                  className="w-full py-4 rounded-lg text-white bg-orange-500 font-bold text-base flex items-center justify-center gap-3 transition hover:opacity-90"
                  
                >
                  Let's Get In Touch
                  <span className="text-lg">→</span>
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PopupForm;