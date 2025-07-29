"use client"
import Script from "next/script"

export function GoogleAnalytics() {
  const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  if (!GA_MEASUREMENT_ID) {
    console.warn('Google Analytics Measurement ID not found');
    return null;
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
        onLoad={() => {
          console.log('Google Analytics script loaded successfully');
        }}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        onLoad={() => {
          console.log('Google Analytics config script executed');
        }}
      >
        {`
          console.log('Google Analytics script starting...');
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          
          console.log('Configuring Google Analytics with ID: ${GA_MEASUREMENT_ID}');
          gtag('config', '${GA_MEASUREMENT_ID}', {
            page_title: document.title,
            page_location: window.location.href,
            debug_mode: true
          });
          
          console.log('Google Analytics initialized successfully');
          console.log('Current page:', window.location.href);
          console.log('DataLayer:', window.dataLayer);
          
          // 发送测试事件
          gtag('event', 'page_view', {
            page_title: document.title,
            page_location: window.location.href,
            custom_parameter: 'test_tracking'
          });
          
          console.log('Test event sent to GA ID: ${GA_MEASUREMENT_ID}');
        `}
      </Script>
    </>
  )
}
