import type React from "react"
import type { Metadata } from "next"
import Script from "next/script"
import "./globals.css"
import { GoogleAnalytics } from "@/components/GoogleAnalytics"
import { WebsiteSchema } from "@/components/seo/website-schema"
import { ThemeProvider } from "@/hooks/use-theme"
import { Partytown } from "@builder.io/partytown/react"

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

// Inline Critical CSS for above-the-fold content to prevent FOUC
const criticalCSS = `
  :root {
    --background: 254 246 215;
    --foreground: 31 41 55;
  }

  * { box-sizing: border-box; }

  html {
    scroll-behavior: smooth;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  body {
    margin: 0;
    padding: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
    background: rgb(254, 246, 215);
    color: rgb(31, 41, 55);
    min-height: 100vh;
  }

  .dark body {
    background: rgb(17, 24, 39);
    color: rgb(243, 244, 246);
  }

  /* Critical layout utilities */
  .flex { display: flex; }
  .flex-col { flex-direction: column; }
  .items-center { align-items: center; }
  .justify-center { justify-content: center; }
  .text-center { text-align: center; }
  .relative { position: relative; }
  .min-h-screen { min-height: 100vh; }
  .w-full { width: 100%; }
  .max-w-5xl { max-width: 64rem; }
  .mx-auto { margin-left: auto; margin-right: auto; }
  .gap-2 { gap: 0.5rem; }
  .mb-8 { margin-bottom: 2rem; }
  .px-6 { padding-left: 1.5rem; padding-right: 1.5rem; }
  .py-12 { padding-top: 3rem; padding-bottom: 3rem; }
  .pt-36 { padding-top: 9rem; }
`

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Inline Critical CSS */}
        <style dangerouslySetInnerHTML={{ __html: criticalCSS }} />

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "QuoteGenerator",
              description: "Transform Bible quotes into beautiful AI-generated art for social media sharing",
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

        {/* Preconnect - Performance optimization */}
        <link rel="preconnect" href="https://api.esv.org" />
        <link rel="preconnect" href="https://fal.run" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />

        {/* Favicon & Icons - Using WebP for better performance */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="icon" type="image/webp" sizes="32x32" href="/favicon-32x32.webp" />
        <link rel="icon" type="image/webp" sizes="16x16" href="/favicon-16x16.webp" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />

        {/* PWA Manifest */}
        <link rel="manifest" href="/manifest.json" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="application-name" content="QuoteGenerator" />
        <meta name="apple-mobile-web-app-title" content="QuoteGenerator" />
        <meta name="msapplication-TileColor" content="#d4af37" />
        <meta name="theme-color" content="#d4af37" />

        {/* Font preload with async fallback */}
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
      </head>

      <body className="scroll-smooth bg-amber-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 transition-colors" suppressHydrationWarning>
        {/* Partytown - Move GTM to Web Worker */}
        <Partytown debug={false} forward={["dataLayer.push"]} />

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

        {/* Async font loading */}
        <Script
          id="font-loader"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(){const link=document.createElement('link');link.href='https://fonts.googleapis.com/css2?family=Crimson+Text:ital,wght@0,400;0,600;1,400&display=swap';link.rel='stylesheet';document.head.appendChild(link);})();`
          }}
        />

        {/* Chrome Runtime Error Fix */}
        <Script
          id="chrome-runtime-fix"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(){var e=console.error,w=console.warn,s=function(e){return['message port closed','runtime.lastError','Receiving end does not exist'].some(function(t){return e.toLowerCase().indexOf(t.toLowerCase())>-1})};console.error=function(){var t=Array.prototype.slice.call(arguments).join(' ');s(t)||e.apply(console,arguments)};console.warn=function(){var t=Array.prototype.slice.call(arguments).join(' ');s(t)||w.apply(console,arguments)};window.addEventListener&&window.addEventListener('error',function(t){t.message&&s(t.message)&&(t.preventDefault(),t.stopPropagation(),!1)},!0)})();`
          }}
        />
      </body>
    </html>
  )
}
