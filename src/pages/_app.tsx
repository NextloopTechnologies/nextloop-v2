import { AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Script from 'next/script';
import React from 'react';

import '../styles/globals.css';

import { getBaseUrl } from '../utils/getBaseUrl';

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  const baseUrl = getBaseUrl(router);
  const canonicalUrl = new URL(router.asPath, baseUrl).toString();

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
      <Script
        id='tawkto'
        strategy='afterInteractive'
        dangerouslySetInnerHTML={{
          __html: `
              var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
              (function(){
                var s1=document.createElement("script"),
                s0=document.getElementsByTagName("script")[0];
                s1.async=true;
                s1.src='https://embed.tawk.to/6a05861ef7c7ab1c39ff2cb2/1joip7qnk';
                s1.charset='UTF-8';
                s1.setAttribute('crossorigin','*');
                s0.parentNode.insertBefore(s1,s0);
              })();
            `,
        }}
      />
    </>
  );
}
