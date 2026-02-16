import { AppProps } from 'next/app';
import Script from 'next/script';
import React from 'react';

import '../styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {


  return (
    <>
      {/* Google tag (gtag.js) */}
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-1Z6KPDDQSB"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-1Z6KPDDQSB');
        `}
      </Script>
      <Component {...pageProps} />;
    </>
  )
}
