"use client"
import Script from "next/script"

export function GoogleAnalytics() {
  const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  const isProduction = process.env.NODE_ENV === 'production';

  if (!GA_MEASUREMENT_ID) {
    return null;
  }

  return (
    <>
      {/* Load GTM script with lazyOnload strategy for better performance */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="lazyOnload"
      />

      {/* Initialize GA configuration */}
      <Script
        id="google-analytics"
        strategy="lazyOnload"
      >
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}', {
            page_title: document.title,
            page_location: window.location.href,
            ${isProduction ? '' : 'debug_mode: true'},
            send_page_view: true,
            transport_type: 'beacon'
          });
        `}
      </Script>
    </>
  )
}
