/* eslint-disable @next/next/next-script-for-ga */
import { Head, Html, Main, NextScript } from 'next/document';

export default function Document() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Nextloop Technologies',
    url: 'https://www.nextlooptechnologies.com/',
    logo: 'https://www.nextlooptechnologies.com/static/logo.jpeg',
    sameAs: [
      'https://www.facebook.com/profile.php?id=61556914381569',
      'https://x.com/Nextloop_',
      'https://www.instagram.com/nextloop_technologies',
      'https://www.linkedin.com/company/nextloop-technologies-llp',
    ],
  };
  return (
    <Html lang='en'>
      <Head>
        <script
          async
          src='https://www.googletagmanager.com/gtag/js?id=G-Y1VSVNV5D3'
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag() { window.dataLayer.push(arguments); }
              gtag('js', new Date());
              gtag('config', 'G-Y1VSVNV5D3');
            `,
          }}
        ></script>
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <link rel='canonical' href='https://www.nextlooptechnologies.com/' />
        <meta
          name='google-site-verification'
          content='1ZvPKSWx3wAqnYNwsBJFWw-0JipRSjhH68LI0Gxs8J4'
        />
      </Head>
      <body>
        <noscript
          dangerouslySetInnerHTML={{
            __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-TPBJB3VM"
              height="0" width="0" style="display:none;visibility:hidden">`,
          }}
        />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
