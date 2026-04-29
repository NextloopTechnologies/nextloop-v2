import { AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Script from 'next/script';
import React from 'react';

import '../styles/globals.css';

import { getBaseUrl } from '../utils/getBaseUrl';

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  const baseUrl = getBaseUrl();
  const canonicalUrl = `${baseUrl}${router.asPath}`;

  return (
    <>
      <Head>
        <link rel='canonical' href={canonicalUrl} />
      </Head>

      {/* Google tag (gtag.js) */}
      <Script
        src='https://www.googletagmanager.com/gtag/js?id=G-1Z6KPDDQSB'
        strategy='lazyOnload'
      />
      <Script id='google-analytics' strategy='lazyOnload'>
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-1Z6KPDDQSB');
        `}
      </Script>

      <Component {...pageProps} />
    </>
  );
}
