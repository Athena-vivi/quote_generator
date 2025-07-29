"use client"
import Script from "next/script"

export function GoogleAnalytics() {
  return (
    <>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-QGY8EPYE2Q"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-QGY8EPYE2Q', {
            page_title: document.title,
            page_location: window.location.href
          });
          
          // 调试信息 - 生产环境可以移除
          console.log('Google Analytics initialized with ID: G-QGY8EPYE2Q');
          console.log('Current page:', window.location.href);
          
          // 发送测试事件
          gtag('event', 'page_view', {
            page_title: document.title,
            page_location: window.location.href,
            custom_parameter: 'test_tracking'
          });
        `}
      </Script>
    </>
  )
}
