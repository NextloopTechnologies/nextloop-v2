/* eslint-disable @next/next/next-script-for-ga */
import { Head, Html, Main, NextScript } from 'next/document';

export default function Document() {


  return (
    <Html lang='en'>
      <Head>
        
        {/* Google Site Verification */}
        <meta
          name='google-site-verification'
          content='rSkhwwyngCBXY24oCD9ERrGDGzkIFubisOa3k-JDjWs'
        />
      </Head>
      <body>
        {/* GTM NoScript Fallback */}
        <noscript
          dangerouslySetInnerHTML={{
            __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=G-ZZGFLK3MRW"
              height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
          }}
        />

        {/* Main Content */}
        <Main />
        <NextScript />

        {/* Apollo Tracker */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              function initApollo() {
                var n = Math.random().toString(36).substring(7);
                var o = document.createElement("script");
                o.src = "https://assets.apollo.io/micro/website-tracker/tracker.iife.js?nocache=" + n;
                o.async = true;
                o.defer = true;
                o.onload = function() {
                  if (window.trackingFunctions) {
                    window.trackingFunctions.onLoad({ appId: "6799e3966d69e201b08953e1" });
                  }
                };
                document.head.appendChild(o);
              }
              window.addEventListener("load", initApollo);
            `,
          }}
        />
      </body>
    </Html>
  );
}
