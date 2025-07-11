import type React from "react"
import type { Metadata } from "next"
import Script from "next/script"
import "./globals.css"
import { GoogleAnalytics } from "@/components/GoogleAnalytics"

export const metadata: Metadata = {
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
    url: "https://quotegenerator.com",
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
    canonical: "https://quotegenerator.com",
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

        {/* Google Analytics */}
{process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
  <>
    <Script
      src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`}
      strategy="afterInteractive"
    />
    <Script id="google-analytics" strategy="afterInteractive">
      {`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}');
      `}
    </Script>
  </>
)}

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
              url: "https://quotegenerator.com",
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
                url: "https://quotegenerator.com/about",
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
        <meta name="theme-color" content="#d4af37" />
        <meta name="msapplication-TileColor" content="#d4af37" />
        <meta name="apple-mobile-web-app-title" content="QuoteGenerator" />

        {/* Preconnect */}
        <link rel="preconnect" href="https://api.esv.org" />
        <link rel="preconnect" href="https://fal.run" />

        {/* Favicon */}
        <link rel="icon" href="/favicon.ico?v=2" />
        <link rel="icon" type="image/png" href="/icon.png?v=2" />

        {/* Google Fonts for religious content */}
        <link 
          href="https://fonts.googleapis.com/css2?family=Crimson+Text:ital,wght@0,400;0,600;1,400&family=Merriweather:ital,wght@0,300;0,400;0,700;1,300;1,400&family=Lora:ital,wght@0,400;0,500;0,600;1,400&family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400&family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=Open+Sans:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Source+Sans+Pro:ital,wght@0,300;0,400;0,600;1,300;1,400&display=swap" 
          rel="stylesheet"
        />
      </head>

      <body className="scroll-smooth bg-amber-50 text-gray-800">
        {children}
        {/* ✅ 只有 GA ID 存在时才注入脚本 */}
       {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
      <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID} />
       )}
      </body>
    </html>
  )
}
