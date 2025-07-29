"use client"
import Script from "next/script"

export function GoogleAnalytics() {
  return (
    <!-- Google tag (gtag.js) -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-QGY8EPYE2Q"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
    
      gtag('config', 'G-QGY8EPYE2Q');
    </script>
  )
}
