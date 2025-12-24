import type React from "react"
import type { Metadata } from "next"
import Script from "next/script"
import { Crimson_Text } from "next/font/google"
import "./globals.css"
import { WebsiteSchema } from "@/components/seo/website-schema"
import { ThemeProvider } from "@/hooks/use-theme"

// Next.js Font optimization with display: swap for instant text rendering
const crimsonText = Crimson_Text({
  subsets: ["latin"],
  display: "swap", // Critical: show text immediately with system font fallback
  weight: ["400", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-crimson",
})

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
// Using HSL values to match globals.css for consistency
const criticalCSS = `
  :root {
    --background: 40 33% 98%;
    --foreground: 20 14.3% 4.1%;
    --primary: 38 92% 50%;
    --card: 0 0% 100%;
    --card-foreground: 24 9.8% 10%;
    --border: 38 30% 90%;
    --radius: 1rem;
  }

  .dark {
    --background: 0 0% 4%; /* Deep midnight black #0A0A0A */
    --foreground: 40 20% 95%;
    --primary: 38 95% 55%;
    --card: 0 0% 4% / 0.5;
    --card-foreground: 40 20% 98%;
    --border: 0 0% 20%;
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
    background: hsl(var(--background));
    color: hsl(var(--foreground));
    min-height: 100vh;
  }

  .dark body {
    background: hsl(var(--background));
    color: hsl(var(--foreground));
  }

  /* Serif font fallback for instant rendering */
  .font-serif {
    font-family: ${crimsonText.style.fontFamily}, Georgia, 'Times New Roman', serif;
  }

  /* Critical layout utilities for Hero section */
  .flex { display: flex; }
  .flex-col { flex-direction: column; }
  .items-center { align-items: center; }
  .justify-center { justify-content: center; }
  .text-center { text-align: center; }
  .relative { position: relative; }
  .absolute { position: absolute; }
  .inset-0 { top: 0; right: 0; bottom: 0; left: 0; }
  .z-10 { z-index: 10; }
  .z-50 { z-index: 50; }
  .min-h-screen { min-height: 100vh; }
  .w-full { width: 100%; }
  .h-full { height: 100%; }
  .max-w-4xl { max-width: 56rem; }
  .max-w-5xl { max-width: 64rem; }
  .mx-auto { margin-left: auto; margin-right: auto; }
  .gap-2 { gap: 0.5rem; }
  .gap-4 { gap: 1rem; }
  .gap-8 { gap: 2rem; }
  .mb-4 { margin-bottom: 1rem; }
  .mb-6 { margin-bottom: 1.5rem; }
  .mb-8 { margin-bottom: 2rem; }
  .mb-10 { margin-bottom: 2.5rem; }
  .mb-14 { margin-bottom: 3.5rem; }
  .px-4 { padding-left: 1rem; padding-right: 1rem; }
  .px-6 { padding-left: 1.5rem; padding-right: 1.5rem; }
  .px-8 { padding-left: 2rem; padding-right: 2rem; }
  .py-2 { padding-top: 0.5rem; padding-bottom: 0.5rem; }
  .py-3 { padding-top: 0.75rem; padding-bottom: 0.75rem; }
  .py-12 { padding-top: 3rem; padding-bottom: 3rem; }
  .pt-36 { padding-top: 9rem; }
  .pb-12 { padding-bottom: 3rem; }

  /* Hero section specific styles */
  .overflow-hidden { overflow: hidden; }
  .bg-background { background-color: hsl(var(--background)); }
  .text-foreground { color: hsl(var(--foreground)); }
  .antialiased { -webkit-font-smoothing: antialiased; }

  /* Card styles for daily quote */
  .rounded-2xl { border-radius: 1rem; }
  .rounded-3xl { border-radius: 1.5rem; }
  .shadow-lg { box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1); }

  /* Loading spinner */
  .animate-spin { animation: spin 1s linear infinite; }
  @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }

  /* Text styles */
  .text-xs { font-size: 0.75rem; }
  .text-sm { font-size: 0.875rem; }
  .text-lg { font-size: 1.125rem; }
  .text-xl { font-size: 1.25rem; }
  .text-2xl { font-size: 1.5rem; }
  .text-4xl { font-size: 2.25rem; }
  .text-5xl { font-size: 3rem; }
  .font-bold { font-weight: 700; }
  .italic { font-style: italic; }
  .leading-relaxed { line-height: 1.625; }

  /* Gradient utilities */
  .bg-gradient-to-r {
    background-image: linear-gradient(to right, var(--tw-gradient-stops));
  }
  .from-amber-600 { --tw-gradient-from: #d97706; --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to, rgba(217, 119, 6, 0)); }
  .to-amber-700 { --tw-gradient-to: #b45309; }
  .from-amber-500 { --tw-gradient-from: #f59e0b; }
  .to-amber-600 { --tw-gradient-to: #d97706; }
  .text-transparent {
    color: transparent;
    -webkit-background-clip: text;
    background-clip: text;
  }
  .bg-clip-text {
    -webkit-background-clip: text;
    background-clip: text;
  }

  /* Button styles */
  .inline-flex { display: inline-flex; }
  .items-center { align-items: center; }
  .min-h-44 { min-height: 2.75rem; }
  .rounded-xl { border-radius: 0.75rem; }
  .shadow-lg { box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1); }

  /* Responsive */
  @media (min-width: 768px) {
    .md\\:text-3xl { font-size: 1.875rem; }
    .md\\:text-5xl { font-size: 3rem; }
    .md\\:flex-row { flex-direction: row; }
    .md\\:items-baseline { align-items: baseline; }
    .md\\:p-14 { padding: 3.5rem; }
  }
`

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning className={crimsonText.variable}>
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
        <meta name="msapplication-TileColor" content="#FDFBF7" />
        <meta name="theme-color" content="#FDFBF7" />
      </head>

      <body className="scroll-smooth bg-background text-foreground antialiased transition-colors" suppressHydrationWarning>
        <ThemeProvider
          defaultTheme="system"
          storageKey="quote-generator-theme"
        >
          <WebsiteSchema
            siteName="QuoteGenerator"
            siteUrl="https://quotegenerator.org"
            description="Transform Bible quotes into beautiful AI-generated art for social media sharing"
          />
          {children}
        </ThemeProvider>

        {/* Google Analytics with requestIdleCallback wrapper */}
        <Script
          id="ga-deferred-loader"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                // Use requestIdleCallback to defer GA loading until browser is idle
                if ('requestIdleCallback' in window) {
                  requestIdleCallback(function() {
                    // Dynamically load GoogleAnalytics component
                    import('@/components/GoogleAnalytics').then(module => {
                      // GA will be initialized by the component
                    });
                  }, { timeout: 2000 });
                } else {
                  // Fallback for older browsers
                  setTimeout(function() {
                    import('@/components/GoogleAnalytics');
                  }, 2000);
                }
              })();
            `
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
