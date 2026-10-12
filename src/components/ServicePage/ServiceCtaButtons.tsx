import Link from 'next/link';
import React from 'react';

const ServiceCtaButtons: React.FC<{ tone?: 'dark' | 'light' }> = ({
  tone = 'light',
}) => {
  const primary =
    'inline-flex items-center justify-center bg-orange-500 hover:bg-orange-600 text-white font-semibold text-sm px-6 py-3 rounded-full transition-colors duration-200';
  const secondary =
    tone === 'dark'
      ? 'inline-flex items-center justify-center bg-transparent text-white font-semibold text-sm px-6 py-3 rounded-full border border-white/80 hover:bg-white hover:text-black transition-colors duration-200'
      : 'inline-flex items-center justify-center bg-white text-gray-900 font-semibold text-sm px-6 py-3 rounded-full border border-gray-300 hover:border-orange-500 hover:text-orange-500 transition-colors duration-200';

  return (
    <div className='flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4'>
      <Link href='/contact-us/' className={primary}>
        Request a Consultation
      </Link>
      <Link href='/portfolio/' className={secondary}>
        View Case Studies
      </Link>
    </div>
  );
};

export default ServiceCtaButtons;
