import { Dot, Mail, MapPin, Phone } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { FC } from 'react';

import {
  Certificate1,
  Certificate2,
  Certificate3,
  Certificate5,
} from '../../../assets';
import { NextLoopColoredLogo } from '../../../assets';

interface ServiceCardProps {
  image: string;
}

const OURVALUES_DATA: ServiceCardProps[] = [
  {
    image: Certificate1 as unknown as string,
  },
  {
    image: Certificate2 as unknown as string,
  },
  {
    image: Certificate3 as unknown as string,
  },
  {
    image: Certificate5 as unknown as string,
  },
];

const services = [
  {
    label: 'Custom Software Development',
    href: '/services/custom-software-development',
  },
  { label: 'IT Staff Augmentation', href: '/services/staffing' },
  { label: 'Web Development', href: '/services/web-development' },
  { label: 'Mobile Development', href: '/services/mobile-development' },
  { label: 'MVP Development', href: '/services/mvp-development' },
  { label: 'AI/ML Development', href: '/services/ai-ml' },
  { label: 'Cloud Services', href: '/services/cloud-services' },
  { label: 'UI/UX Development', href: '/services/ui-ux-development' },
];

const industrySolutions = [
  { label: 'Events', href: '/domain/events' },
  { label: 'Fin-Tech', href: '/domain/fintech' },
  { label: 'Healthcare', href: '/domain/healthcare' },
  // { label: 'Hotel', href: '/domain/hotel' },
  { label: 'Oil And Gas', href: '/domain/oil-and-gas' },
  { label: 'Food And Beverages', href: '/domain/food-and-beverages' },
  { label: 'Travel And Hospitality', href: '/domain/travel-and-hospitality' },
];

const quickLinks = [
  { label: 'About us', href: '/about-us' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Services', href: '/services' },
  { label: 'Careers', href: '/career' },
  { label: 'Blogs', href: '/blog' },
  { label: 'Culture', href: '/culture' },
  { label: 'Contact Us', href: '/contact-us' },
];

const Pitchthought: FC = () => {
  const location =
    '101, Kanchan Sagar, 18/1, Near Industry House, Old Palasia, Indore, Madhya Pradesh 452001';

  return (
    <footer className='bg-[#111111] text-white'>
      <div className='max-w-7xl mx-auto px-6 py-14'>
        <div className='grid grid-cols-1 lg:grid-cols-5 gap-5'>
          <div className='lg:col-span-1 flex flex-col gap-3'>
            <div className='flex items-center gap-2'>
              <Image
                src={NextLoopColoredLogo}
                width={80}
                height={60}
                alt='NextLoopLogo'
              />
              <div>
                <p className='text-white font-bold text-base leading-tight tracking-widest'>
                  NEXTLOOP
                </p>
                <p className='text-gray-400 text-[10px] tracking-[0.2em]'>
                  TECHNOLOGIES
                </p>
              </div>
            </div>

            <div>
              <p className='text-gray-400 text-xs mb-3 uppercase tracking-wider'>
                Certificates
              </p>
              <div className='flex flex-wrap gap-2'>
                {OURVALUES_DATA.map((cert, index) => (
                  <div
                    key={index}
                    className='w-10 h-10 bg-white rounded-full border border-gray-600 flex items-center justify-center overflow-hidden'
                  >
                    <Image
                      src={cert.image}
                      alt={`Certificate ${index + 1}`}
                      width={40}
                      height={40}
                      className='object-contain'
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className='lg:col-span-3 grid grid-cols-2 sm:grid-cols-3 gap-8'>
            <div>
              <h3 className='text-white font-semibold text-sm mb-5 uppercase tracking-wider'>
                Services
              </h3>
              <ul className='space-y-2'>
                {services.map(({ label, href }) => (
                  <li key={label}>
                    <Link
                      href={href}
                      className='text-white text-sm hover:text-orange-400 transition-colors'
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className='text-white font-semibold text-sm mb-5 uppercase tracking-wider'>
                Industry Solutions
              </h3>
              <ul className='space-y-2'>
                {industrySolutions.map(({ label, href }) => (
                  <li key={label}>
                    <Link
                      href={href}
                      className='text-white text-sm hover:text-orange-400 transition-colors'
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className='col-span-2 sm:col-span-1'>
              <h3 className='text-white font-semibold text-sm mb-5 uppercase tracking-wider'>
                Quick Links
              </h3>
              <ul className='space-y-2'>
                {quickLinks.map(({ label, href }) => (
                  <li key={label}>
                    <Link
                      href={href}
                      className='text-white text-sm hover:text-orange-400 transition-colors'
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className='lg:col-span-1'>
            <h3 className='text-white font-semibold text-sm mb-5 uppercase tracking-wider'>
              Contact Us
            </h3>
            <ul className='space-y-4'>
              {/* Email */}
              <li className='flex items-start gap-3'>
                <div className='mt-0.5 w-5 h-5 flex-shrink-0 text-orange-400'>
                  <Mail className='w-5 h-5' />
                </div>
                <a
                  href='mailto:info@nextlooptechnologies.com'
                  className='text-white text-sm hover:text-orange-400 transition-colors break-all'
                >
                  info@nextlooptechnologies.com
                </a>
              </li>

              <li className='flex items-start gap-3'>
                <div className='mt-0.5 w-5 h-5 flex-shrink-0 text-orange-400'>
                  <Phone className='w-5 h-5' />
                </div>
                <div className='text-white text-sm flex flex-col gap-1'>
                  <a
                    href='tel:+916103542991'
                    className='hover:text-orange-400 transition-colors'
                  >
                    +916103542991
                  </a>
                  <a
                    href='tel:+919893954583'
                    className='hover:text-orange-400 transition-colors'
                  >
                    +919893954583
                  </a>
                </div>
              </li>

              {/* Address */}
              <li className='flex items-start gap-3'>
                <div className='mt-0.5 w-5 h-5 flex-shrink-0 text-orange-400'>
                  <MapPin className='w-5 h-5' />
                </div>
                <a
                  href={`https://www.google.com/maps?q=${encodeURIComponent(
                    location
                  )}`}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-white text-sm hover:text-orange-400 transition-colors leading-relaxed'
                >
                  {location}
                </a>
              </li>

              {/* Social Icons */}
              <li className='pt-2'>
                <div className='flex gap-3 flex-wrap'>
                  <a
                    href='https://www.facebook.com/profile.php?id=61556914381569'
                    target='_blank'
                    rel='noopener noreferrer'
                    className='w-9 h-9 rounded-full bg-white text-black hover:bg-orange-500 transition-colors flex items-center justify-center'
                  >
                    <svg
                      viewBox='0 0 24 24'
                      className='w-4 h-4'
                      fill='currentColor'
                    >
                      <path d='M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z' />
                    </svg>
                  </a>
                  <a
                    href='https://www.instagram.com/nextloop.technologies/'
                    target='_blank'
                    rel='noopener noreferrer'
                    className='w-9 h-9 rounded-full bg-white text-black hover:bg-orange-500 transition-colors flex items-center justify-center'
                  >
                    <svg
                      viewBox='0 0 24 24'
                      className='w-4 h-4'
                      fill='none'
                      stroke='currentColor'
                      strokeWidth='2'
                    >
                      <rect x='2' y='2' width='20' height='20' rx='5' ry='5' />
                      <circle cx='12' cy='12' r='4' />
                      <circle cx='17.5' cy='6.5' r='1' fill='currentColor' />
                    </svg>
                  </a>
                  <a
                    href='https://www.youtube.com'
                    target='_blank'
                    rel='noopener noreferrer'
                    className='w-9 h-9 rounded-full bg-white text-black hover:bg-orange-500 transition-colors flex items-center justify-center'
                  >
                    <svg
                      viewBox='0 0 24 24'
                      className='w-4 h-4'
                      fill='currentColor'
                    >
                      <path d='M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58a2.78 2.78 0 0 0 1.95 1.95C5.12 20 12 20 12 20s6.88 0 8.59-.47a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z' />
                      <polygon
                        points='9.75 15.02 15.5 12 9.75 8.98 9.75 15.02'
                        fill='white'
                      />
                    </svg>
                  </a>
                  <a
                    href='https://www.linkedin.com/company/nextloop-technologies-llp'
                    target='_blank'
                    rel='noopener noreferrer'
                    className='w-9 h-9 rounded-full bg-white text-black hover:bg-orange-500 transition-colors flex items-center justify-center'
                  >
                    <svg
                      viewBox='0 0 24 24'
                      className='w-4 h-4'
                      fill='currentColor'
                    >
                      <path d='M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z' />
                      <rect x='2' y='9' width='4' height='12' />
                      <circle cx='4' cy='4' r='2' />
                    </svg>
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className='border-t border-gray-800'>
        <div className='max-w-7xl mx-auto px-6 py-4 flex flex-col sm:flex-row sm:justify-between items-center gap-2 text-white text-xs'>
          <p>
            © {new Date().getFullYear()} Nextloop Technologies Pvt. Ltd. All
            Rights Reserved.
          </p>
          <p className='flex items-center gap-1'>
            <Link
              href='/terms-of-use'
              className='hover:text-orange-400 transition-colors'
            >
              Terms of Use
            </Link>
            <Dot className='w-4 h-4' />
            <Link
              href='/cookies-policy'
              className='hover:text-orange-400 transition-colors'
            >
              Cookie Policy
            </Link>
            <Dot className='w-4 h-4' />
            <Link
              href='/terms-and-conditions'
              className='hover:text-orange-400 transition-colors'
            >
              Terms &amp; Conditions
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Pitchthought;
