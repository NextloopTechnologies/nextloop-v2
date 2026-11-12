import { Manrope, Source_Sans_3 } from 'next/font/google';
import React, { ReactNode } from 'react';

import '../../styles/ai-service-pages.css';

import Layout from '../Layout/Layout';
import Seo from '../Seo';

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['500', '700', '800'],
  variable: '--nl-ai-heading',
  display: 'swap',
});

const sourceSans = Source_Sans_3({
  subsets: ['latin'],
  weight: ['400', '600'],
  variable: '--nl-ai-body',
  display: 'swap',
});

type Props = {
  title: string;
  description: string;
  variant?: 'default' | 'v2';
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
  children: ReactNode;
};

const AiServiceShell: React.FC<Props> = ({
  title,
  description,
  variant = 'default',
  jsonLd,
  children,
}) => (
  <Layout>
    <Seo title={title} description={description} jsonLd={jsonLd} />
    <div
      className={`${variant === 'v2' ? 'nl-ai nl-ai--v2' : 'nl-ai'} ${
        manrope.variable
      } ${sourceSans.variable}`}
    >
      {children}
    </div>
  </Layout>
);

export default AiServiceShell;
