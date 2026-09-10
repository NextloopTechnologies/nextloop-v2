import { AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Script from 'next/script';
import React from 'react';

import '../styles/globals.css';

import { cleanCanonical } from '../components/Seo';
import { getBaseUrl } from '../utils/getBaseUrl';

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  const baseUrl = getBaseUrl(router);
  // Strip query and hash: `/portfolio/4/?scrollToHeader=true` was previously
  // self-canonicalising to the parameterised URL, splitting signals with the
  // clean one. Pages using <Seo> override this with their own canonical.
  const canonicalUrl = cleanCanonical(router.asPath, baseUrl);

  return (
    <>
      <Head>
        <link key='canonical' rel='canonical' href={canonicalUrl} />
        {/* Site-wide social defaults. next/head dedupes on `key`, so any page
            rendering <Seo> replaces these with its own values. Before this the
            site shipped no Open Graph or Twitter tags at all, so every shared
            link rendered as a bare URL. */}
        <meta key='og:site_name' property='og:site_name' content='Nextloop Technologies' />
        <meta key='og:type' property='og:type' content='website' />
        <meta key='og:title' property='og:title' content='Nextloop Technologies' />
        <meta
          key='og:description'
          property='og:description'
          content='Custom software, AI and dedicated development teams from Nextloop Technologies.'
        />
        <meta key='og:url' property='og:url' content={canonicalUrl} />
        <meta key='og:image' property='og:image' content={`${baseUrl}/images/who-we-are.jpg`} />
        <meta key='og:image:width' property='og:image:width' content='1200' />
        <meta key='og:image:height' property='og:image:height' content='630' />
        <meta key='og:locale' property='og:locale' content='en_US' />
        <meta key='twitter:card' name='twitter:card' content='summary_large_image' />
        <meta key='twitter:title' name='twitter:title' content='Nextloop Technologies' />
        <meta
          key='twitter:description'
          name='twitter:description'
          content='Custom software, AI and dedicated development teams from Nextloop Technologies.'
        />
        <meta key='twitter:image' name='twitter:image' content={`${baseUrl}/images/who-we-are.jpg`} />
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
