/* eslint-disable @next/next/next-script-for-ga */
import { Head, Html, Main, NextScript } from 'next/document';

export default function Document() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Nextloop Technologies',
    url: 'https://www.nextlooptechnologies.com/',
    logo: 'https://www.nextlooptechnologies.com/static/logo.jpeg', // Replace with static logo URL
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
          dangerouslySetInnerHTML={{
            __html: `
  (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-TPBJB3VM');
  `,
          }}
        />
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <link rel='canonical' href='https://www.nextlooptechnologies.com/' />
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
