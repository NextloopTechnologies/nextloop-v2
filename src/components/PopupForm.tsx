'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

import supabaseClient from '../utils/client';

const StarRating = ({ count = 5 }: { count?: number }) => (
  <div className='flex gap-0.5'>
    {Array.from({ length: count }).map((_, i) => (
      <svg
        key={i}
        className='w-3 h-3 text-yellow-400 fill-yellow-400'
        viewBox='0 0 20 20'
      >
        <path d='M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z' />
      </svg>
    ))}
  </div>
);

const ReviewCard = ({
  score,
  logo,
}: {
  score: string | null;
  logo: 'google' | 'clutch' | 'reviews';
}) => {
  const logos: Record<string, React.ReactNode> = {
    google: (
      <span className='font-semibold text-xs'>
        <span style={{ color: '#4285F4' }}>G</span>
        <span style={{ color: '#EA4335' }}>o</span>
        <span style={{ color: '#FBBC04' }}>o</span>
        <span style={{ color: '#34A853' }}>g</span>
        <span style={{ color: '#EA4335' }}>l</span>
        <span style={{ color: '#4285F4' }}>e</span>
      </span>
    ),
    clutch: <span className='font-bold text-xs text-gray-800'>Clutch</span>,

    reviews: null,
  };

  return (
    <div className='flex flex-col items-center justify-center border border-gray-200 rounded-xl px-2 py-2 gap-1 flex-1'>
      {logo === 'reviews' ? (
        <>
          <span className='text-sm font-bold text-gray-800 leading-tight'>
            100+
          </span>
          <span className='text-[9px] text-gray-500 font-medium text-center leading-tight'>
            REVIEWS
          </span>
        </>
      ) : (
        <>
          <span className='text-sm font-bold text-gray-800'>{score}</span>
          <StarRating />
          {logos[logo]}
        </>
      )}
    </div>
  );
};

const PopupForm: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [service, setService] = useState('');
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState('');

  const [status, setStatus] = useState<{ msg: string; ok: boolean } | null>(
    null
  );
  const [loading, setLoading] = useState(false);
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);

  useEffect(() => {
    const dismissed = sessionStorage.getItem('popupDismissed');
    if (dismissed) return;
    const t = setTimeout(() => setIsVisible(true), 3000);
    return () => clearTimeout(t);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    sessionStorage.setItem('popupDismissed', 'true');
  };

  const handleBookConsultation = () => {
    window.open(
      'https://calendly.com/piyush-cwqc/quick-discussion',
      '_blank',
      'noopener,noreferrer'
    );
  };

  const handleSubmit = async () => {
    setStatus(null);

    if (!name.trim())
      return setStatus({ msg: 'Please enter your name.', ok: false });
    if (!email.trim())
      return setStatus({ msg: 'Enter valid email.', ok: false });
    if (!service) return setStatus({ msg: 'Select service.', ok: false });
    if (!captchaToken)
      return setStatus({ msg: 'Please complete the reCAPTCHA.', ok: false });

    setLoading(true);
    try {
      const { error } = await supabaseClient
        .from('popup_form')
        .insert([{ name, email, service, phone, country }]);

      if (error) throw new Error(error.message);

      setStatus({ msg: 'Submitted! We will contact you soon.', ok: true });
      setName('');
      setEmail('');
      setService('');
      setPhone('');
      setCountry('');
      setCaptchaToken(null);
      recaptchaRef.current?.reset();
    } catch (error) {
      setStatus({
        msg: error instanceof Error ? error.message : 'Something went wrong.',
        ok: false,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div className='fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 py-6'>
          <motion.div className='bg-white rounded-2xl p-6 w-full max-w-md relative max-h-[calc(100vh-3rem)] overflow-y-auto'>
            <button onClick={handleClose} className='absolute top-2 right-2'>
              <X />
            </button>

            <div className='relative mb-6'>
              <div className='border-2 border-orange-500 rounded-2xl px-5 py-6 text-center'>
                <p>
                  Hire Smarter and Faster with <b>5 Days</b> risk free trial.
                </p>
              </div>

              <div className='absolute left-1/2 -bottom-4 -translate-x-1/2'>
                <button
                  type='button'
                  onClick={handleBookConsultation}
                  className='bg-orange-500 hover:opacity-90 text-white px-5 py-2 rounded-md font-semibold text-sm uppercase whitespace-nowrap'
                >
                  BOOK CONSULTATION
                </button>
              </div>
            </div>

            <div className='flex flex-col items-start'>
              <div className=' md:p-2 flex flex-col gap-2 w-full'>
                <div className='grid grid-cols-2 gap-2 sm:grid-cols-3'>
                  <ReviewCard score='5.0' logo='google' />
                  <ReviewCard score='4.8' logo='clutch' />
                  <ReviewCard score={null} logo='reviews' />
                </div>
              </div>

              <form className='flex flex-col gap-1 md:gap-3 w-full'>
                <div className='grid gap-3 sm:grid-cols-2'>
                  <label className='flex flex-col gap-2 text-sm text-gray-600'>
                    <span className='font-medium'>Full Name *</span>
                    <input
                      type='text'
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder='Name'
                      className='w-full border border-gray-300 rounded-xl px-4 py-3 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500'
                    />
                  </label>

                  <label className='flex flex-col gap-2 text-sm text-gray-600'>
                    <span className='font-medium'>Email Address *</span>
                    <input
                      type='email'
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder='name@company.com'
                      className='w-full border border-gray-300 rounded-xl px-4 py-3 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500'
                    />
                  </label>
                </div>

                <label className='flex flex-col gap-2 text-sm text-gray-600'>
                  <span className='font-medium'>
                    Select a Service / Inquiry *
                  </span>
                  <div className='relative'>
                    <select
                      value={service}
                      onChange={(e) => setService(e.target.value)}
                      className='w-full border border-gray-300 rounded-xl px-4 py-3 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500 appearance-none bg-white'
                      aria-label='Select a service'
                    >
                      <option value=''>Select a service</option>
                      <option value='Hire'>Hire Remote Developers</option>
                      <option value='website'>
                        Website/App/Software Development
                      </option>
                      <option value='cost estimate'>Get a Cost Estimate</option>
                      <option value='consultation'>
                        Consultation for My Project
                      </option>
                      <option value='customization'>
                        Customize an Existing Solution
                      </option>
                      <option value='other'>Others</option>
                    </select>
                    <span className='pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-400'>
                      ▾
                    </span>
                  </div>
                </label>

                <div className='grid gap-3 sm:grid-cols-2'>
                  <label className='flex flex-col gap-2 text-sm text-gray-600'>
                    <span className='font-medium'>Phone (optional)</span>
                    <input
                      type='tel'
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder='123-456-7890'
                      className='w-full border border-gray-300 rounded-xl px-4 py-3 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500'
                    />
                  </label>

                  <label className='flex flex-col gap-2 text-sm text-gray-600'>
                    <span className='font-medium'>Country (optional)</span>
                    <input
                      type='text'
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      placeholder='Country'
                      className='w-full border border-gray-300 rounded-xl px-4 py-3 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500'
                    />
                  </label>
                </div>

                <p className='text-xs text-gray-500'>
                  By proceeding, you agree to receive relevant updates and
                  assistance. We respect your privacy and won't spam you.
                </p>

                <ReCAPTCHA
                  ref={recaptchaRef}
                  sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ''}
                  onChange={(token) => setCaptchaToken(token)}
                  onExpired={() => setCaptchaToken(null)}
                />

                {status && (
                  <div
                    className={`rounded-xl px-4 py-3 text-sm ${
                      status.ok
                        ? 'bg-emerald-100 text-emerald-700'
                        : 'bg-rose-100 text-rose-700'
                    }`}
                  >
                    {status.msg}
                  </div>
                )}

                <button
                  type='button'
                  onClick={handleSubmit}
                  disabled={loading}
                  className='w-full py-4 rounded-xl text-white bg-orange-500 font-bold text-base transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70'
                >
                  {loading ? 'Sending...' : "Let's Get In Touch →"}
                </button>
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PopupForm;
