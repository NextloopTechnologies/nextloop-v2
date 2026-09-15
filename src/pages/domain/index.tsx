import Link from 'next/link';
import React from 'react';

import Layout from '../../components/Layout/Layout';
import Seo from '../../components/Seo';
import { breadcrumbSchema } from '../../utils/structuredData';

/**
 * Industry hub.
 *
 * This route previously rendered `<div>Domain</div>` — a stub with no title, no
 * description and no content, live and indexable at /domain/. It now acts as the
 * hub the individual industry pages link up to, which also gives those pages an
 * internal link source they did not have.
 */

const INDUSTRIES = [
  {
    name: 'Fin-Tech',
    href: '/domain/fintech/',
    blurb:
      'Payments, lending and wealth platforms built to clear compliance and scale with transaction volume.',
  },
  {
    name: 'Healthcare',
    href: '/domain/healthcare/',
    blurb:
      'Patient-facing and clinical systems where uptime, records handling and interoperability are the hard requirements.',
  },
  {
    name: 'Oil and Gas',
    href: '/domain/oil-and-gas/',
    blurb:
      'Field data, asset monitoring and enterprise systems for operations that run around the clock.',
  },
  {
    name: 'Food and Beverages',
    href: '/domain/food-and-beverages/',
    blurb:
      'Ordering, delivery and inventory software for hospitality businesses working on thin margins.',
  },
];

const DomainIndex: React.FC = () => (
  <Layout>
    <Seo
      title='Industry Software Solutions | Fintech, Healthcare, Energy | Nextloop'
      description='Industry-specific software from Nextloop Technologies — fintech, healthcare, oil and gas, and food and beverage platforms built by teams who know the domain.'
      jsonLd={breadcrumbSchema([
        { name: 'Home', path: '/' },
        { name: 'Industries', path: '/domain/' },
      ])}
    />

    <section className='bg-white px-4 py-20 md:px-8 xl:px-24'>
      <div className='mx-auto max-w-5xl'>
        <h1 className='text-3xl font-bold text-black md:text-4xl'>
          Industries we <span className='text-orange-500'>build for</span>
        </h1>
        <p className='mt-4 max-w-3xl text-[15px] leading-relaxed text-[#222222]'>
          Sector knowledge changes what good software looks like. These are the
          industries where we have shipped enough to know the constraints before
          the first sprint.
        </p>

        <div className='mt-12 grid grid-cols-1 gap-6 md:grid-cols-2'>
          {INDUSTRIES.map((industry) => (
            <Link
              key={industry.href}
              href={industry.href}
              className='group flex flex-col gap-3 rounded-lg border border-[#C8C8C8] p-6 transition-all duration-300 hover:border-[#1D1D1D] hover:bg-[#1D1D1D]'
            >
              <h2 className='text-xl font-semibold text-black group-hover:text-white'>
                {industry.name}
              </h2>
              <p className='text-[15px] font-light leading-relaxed text-[#222222] group-hover:text-white'>
                {industry.blurb}
              </p>
              <span className='mt-auto text-[11px] font-bold uppercase tracking-[0.08em] text-orange-500'>
                Explore {industry.name} →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  </Layout>
);

export default DomainIndex;
