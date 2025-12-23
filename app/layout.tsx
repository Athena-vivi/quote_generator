import type React from "react"
import type { Metadata } from "next"
import Script from "next/script"
import "./globals.css"
import { GoogleAnalytics } from "@/components/GoogleAnalytics"
import { WebsiteSchema } from "@/components/seo/website-schema"
import { ThemeProvider } from "@/hooks/use-theme"
import { InlineCriticalCSS } from "@/components/ui/inline-critical-css"
import { FontLoader } from "@/components/ui/font-loader"

export const metadata: Metadata = {
  metadataBase: new URL('https://quotegenerator.org'),
  title: "QuoteGenerator - Transform Bible Quotes into Beautiful AI Art",
  description:
    "Create stunning, shareable images from Bible quotes with AI-powered backgrounds. Find daily inspiration, search by mood or reference, and share your faith beautifully on social media.",
  keywords: [
    "Bible quotes",
    "Christian quotes",
    "Bible verses",
    "AI art generator",
    "Scripture images",
    "Faith quotes",
    "Daily devotion",
    "Christian social media",
    "Bible verse art",
    "Inspirational quotes",
    "Religious quotes",
    "ESV Bible",
    "Quote generator",
    "Christian graphics",
    "Faith-based content",
  ],
  authors: [{ name: "QuoteGenerator Team" }],
  creator: "QuoteGenerator",
  publisher: "QuoteGenerator",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://quotegenerator.org",
    siteName: "QuoteGenerator",
    title: "QuoteGenerator - Transform Bible Quotes into Beautiful AI Art",
    description:
      "Create stunning, shareable images from Bible quotes with AI-powered backgrounds. Find daily inspiration, search by mood or reference, and share your faith beautifully.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "QuoteGenerator - Bible Quote Art Creator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "QuoteGenerator - Transform Bible Quotes into Beautiful AI Art",
    description:
      "Create stunning, shareable images from Bible quotes with AI-powered backgrounds. Find daily inspiration and share your faith beautifully.",
    images: ["/twitter-image.jpg"],
    creator: "@quotegenerator",
  },
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
    yahoo: "your-yahoo-verification-code",
  },
  alternates: {
    canonical: "https://quotegenerator.org",
  },
  category: "Religion & Spirituality",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>

        {/* Google Analytics - 使用组件实现 */}

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "QuoteGenerator",
              description:
                "Transform Bible quotes into beautiful AI-generated art for social media sharing",
              url: "https://quotegenerator.org",
              applicationCategory: "DesignApplication",
              operatingSystem: "Web Browser",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD",
              },
              creator: {
                "@type": "Organization",
                name: "QuoteGenerator Team",
                url: "https://quotegenerator.org/about",
              },
              featureList: [
                "Daily Bible quote recommendations",
                "Mood-based quote search",
                "AI-powered background generation",
                "High-resolution image downloads",
                "Social media sharing",
                "Favorite quotes management",
              ],
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "4.8",
                reviewCount: "1250",
              },
            }),
          }}
        />

        {/* Additional Meta Tags */}

        {/* Preconnect */}
        <link rel="preconnect" href="https://api.esv.org" />
        <link rel="preconnect" href="https://fal.run" />

        {/* Favicon & Icons */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />

        {/* PWA Manifest */}
        <link rel="manifest" href="/manifest.json" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="application-name" content="QuoteGenerator" />
        <meta name="apple-mobile-web-app-title" content="QuoteGenerator" />
        <meta name="msapplication-TileColor" content="#d4af37" />
        <meta name="theme-color" content="#d4af37" />

        {/* 字体预加载 - 不阻塞渲染 */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="preload"
          href="https://fonts.googleapis.com/css2?family=Crimson+Text:ital,wght@0,400;0,600;1,400&display=swap"
          as="style"
        />
        <noscript>
          <link
            href="https://fonts.googleapis.com/css2?family=Crimson+Text:ital,wght@0,400;0,600;1,400&display=swap"
            rel="stylesheet"
          />
        </noscript>

        {/* 异步加载字体 */}
        <Script
          id="font-loader"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              const link = document.createElement('link');
              link.href = 'https://fonts.googleapis.com/css2?family=Crimson+Text:ital,wght@0,400;0,600;1,400&display=swap';
              link.rel = 'stylesheet';
              document.head.appendChild(link);
            `
          }}
        />
      </head>

      <body className="scroll-smooth bg-amber-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 transition-colors">
        <InlineCriticalCSS />
        <FontLoader />
        <ThemeProvider
          defaultTheme="system"
          storageKey="quote-generator-theme"
        >
          <GoogleAnalytics />
          <WebsiteSchema
            siteName="QuoteGenerator"
            siteUrl="https://quotegenerator.org"
            description="Transform Bible quotes into beautiful AI-generated art for social media sharing"
          />
          {children}
        </ThemeProvider>

        {/* CSS Loading Diagnosis - Only in development */}
        {process.env.NODE_ENV === 'development' && (
          <Script
            id="css-diagnosis"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: "window.addEventListener('DOMContentLoaded',function(){console.log('CSS Diagnosis Started');try{const rootStyles=getComputedStyle(document.documentElement);console.log('CSS Variables:',{background:rootStyles.getPropertyValue('--background'),foreground:rootStyles.getPropertyValue('--foreground')});const testElement=document.createElement('div');testElement.className='hidden bg-red-500 text-white p-2';document.body.appendChild(testElement);const testStyles=window.getComputedStyle(testElement);console.log('Tailwind Working:',testStyles.display==='none');document.body.removeChild(testElement);const fontElements=document.querySelectorAll('link[href*=fonts.googleapis.com]');console.log('Google Fonts Loaded:',fontElements.length>0);const criticalCssElement=document.querySelector('[data-critical-css]');console.log('InlineCriticalCSS Found:',!!criticalCssElement);const fontLoaderElement=document.querySelector('[data-font-loader]');console.log('FontLoader Found:',!!fontLoaderElement);setTimeout(()=>{const bodyStyles=getComputedStyle(document.body);console.log('Body Background:',bodyStyles.backgroundColor);console.log('Body Color:',bodyStyles.color);},1000)}catch(e){console.error('CSS Diagnosis Error:',e)}});"
            }}
          />
        )}

        {/* Enhanced Chrome Runtime Error Fix */}
        <Script
          id="chrome-runtime-fix"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: "(function(){var originalError=console.error;var originalWarn=console.warn;function shouldSuppress(msg){var suppressPatterns=['message port closed before a response','runtime.lastError','Receiving end does not exist'];return suppressPatterns.some(function(pattern){return msg.toLowerCase().indexOf(pattern.toLowerCase())!==-1});}console.error=function(){var msg=Array.prototype.slice.call(arguments).join(' ');if(shouldSuppress(msg)){return}return originalError.apply(console,arguments)};console.warn=function(){var msg=Array.prototype.slice.call(arguments).join(' ');if(shouldSuppress(msg)){return}return originalWarn.apply(console,arguments)};if(window.addEventListener){window.addEventListener('error',function(e){if(e.message&&shouldSuppress(e.message)){e.preventDefault();e.stopPropagation();return false}},true);window.addEventListener('unhandledrejection',function(e){if(e.reason&&shouldSuppress(e.reason.toString())){e.preventDefault()}})}})();"
          }}
        />

        {/* Service Worker Registration - 暂时禁用以避免注册错误 */}
        {/*
        <Script
          id="service-worker"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator && window.location.protocol === 'https:') {
                navigator.serviceWorker.register('/sw.js')
                  .then((registration) => {
                    console.log('[SW] Registration successful', registration)
                  })
                  .catch((error) => {
                    console.log('[SW] Registration failed', error)
                  })
              }
            `,
          }}
        />
        */}
      </body>
    </html>
  )
}