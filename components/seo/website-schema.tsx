"use client"

import { useEffect } from "react"

interface WebsiteSchemaProps {
  siteName: string
  siteUrl: string
  description: string
}

export function WebsiteSchema({ siteName, siteUrl, description }: WebsiteSchemaProps) {
  useEffect(() => {
    // Website Schema
    const websiteData = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": siteName,
      "url": siteUrl,
      "description": description,
      "potentialAction": {
        "@type": "SearchAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": `${siteUrl}/api/verses/search?q={search_term_string}`
        },
        "query-input": "required name=search_term_string"
      },
      "publisher": {
        "@type": "Organization",
        "name": siteName,
        "url": siteUrl,
        "logo": {
          "@type": "ImageObject",
          "url": `${siteUrl}/icon.png`,
          "width": 512,
          "height": 512
        },
        "sameAs": [
          "https://twitter.com/quotegenerator",
          "https://facebook.com/quotegenerator",
          "https://instagram.com/quotegenerator"
        ]
      }
    }

    // SoftwareApplication Schema
    const softwareData = {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": siteName,
      "url": siteUrl,
      "description": description,
      "applicationCategory": "DesignApplication",
      "operatingSystem": "Web Browser",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.8",
        "reviewCount": "1250"
      },
      "featureList": [
        "Daily Bible quote recommendations",
        "Mood-based quote search",
        "AI-powered background generation",
        "High-resolution image downloads",
        "Social media sharing",
        "Favorite quotes management"
      ]
    }

    // 创建或更新脚本
    const createOrUpdateScript = (data: any, type: string) => {
      let script = document.querySelector(`script[data-website-schema="${type}"]`) as HTMLScriptElement

      if (!script) {
        script = document.createElement("script")
        script.type = "application/ld+json"
        script.setAttribute("data-website-schema", type)
        document.head.appendChild(script)
      }

      script.textContent = JSON.stringify(data)
    }

    createOrUpdateScript(websiteData, "website")
    createOrUpdateScript(softwareData, "software")

    // 清理函数
    return () => {
      const scripts = document.querySelectorAll('script[data-website-schema]')
      scripts.forEach(script => script.remove())
    }
  }, [siteName, siteUrl, description])

  return null
}