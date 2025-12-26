"use client"

import { useEffect } from "react"

interface ThemeSchemaProps {
  themeName: string
  themeSlug: string
  description: string
  verses: Array<{ reference: string; content: string }>
  siteUrl: string
}

export function ThemeSchema({ themeName, themeSlug, description, verses, siteUrl }: ThemeSchemaProps) {
  useEffect(() => {
    const pageUrl = `${siteUrl}/themes/${themeSlug}`

    // CollectionPage Schema for theme pages
    const collectionData = {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "name": `${themeName} Bible Verses`,
      "description": description,
      "url": pageUrl,
      "inLanguage": "en-US",
      "isPartOf": {
        "@type": "WebSite",
        "url": siteUrl,
        "name": "QuoteGenerator"
      },
      "about": {
        "@type": "Thing",
        "name": themeName,
        "description": `Bible verses about ${themeName.toLowerCase()}`
      },
      "publisher": {
        "@type": "Organization",
        "name": "QuoteGenerator",
        "url": siteUrl,
        "logo": {
          "@type": "ImageObject",
          "url": `${siteUrl}/icon.png`,
          "width": 512,
          "height": 512
        }
      },
      "author": {
        "@type": "Organization",
        "name": "QuoteGenerator"
      },
      "image": {
        "@type": "ImageObject",
        "url": `${siteUrl}/images/example-background-448.webp`,
        "width": 1200,
        "height": 1200,
        "caption": `${themeName} Bible Verses - QuoteGenerator`
      },
      "mainEntity": {
        "@type": "ItemList",
        "name": `${themeName} Bible Scriptures`,
        "description": `Curated collection of Bible verses about ${themeName.toLowerCase()}`,
        "numberOfItems": verses.length,
        "itemListElement": verses.slice(0, 10).map((verse, index) => ({
          "@type": "Quote",
          "position": index + 1,
          "text": verse.content,
          "author": {
            "@type": "Person",
            "name": "God"
          },
          "isPartOf": {
            "@type": "CreativeWork",
            "name": "Holy Bible",
            "inLanguage": "en",
            "translationOfWork": {
              "@type": "CreativeWork",
              "name": "Bible",
              "inLanguage": "he"
            }
          }
        }))
      },
      "keywords": [themeName, "Bible verses", "scripture", "ESV Bible", `${themeName} scriptures`, `Bible quotes about ${themeName.toLowerCase()}`],
      "specialty": verses.length > 0 ? {
        "@type": "Specialty",
        "name": "Bible Scripture Collection"
      } : undefined
    }

    // BreadcrumbList Schema
    const breadcrumbData = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": siteUrl
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Themes",
          "item": `${siteUrl}/themes`
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": themeName,
          "item": pageUrl
        }
      ]
    }

    // 创建或更新脚本
    const createOrUpdateScript = (data: any, id: string) => {
      let script = document.querySelector(`script[data-theme-schema="${id}"]`) as HTMLScriptElement

      if (!script) {
        script = document.createElement("script")
        script.type = "application/ld+json"
        script.setAttribute("data-theme-schema", id)
        document.head.appendChild(script)
      }

      script.textContent = JSON.stringify(data)
    }

    createOrUpdateScript(collectionData, "collection")
    createOrUpdateScript(breadcrumbData, "breadcrumb")

    // 清理函数
    return () => {
      const scripts = document.querySelectorAll('script[data-theme-schema]')
      scripts.forEach(script => script.remove())
    }
  }, [themeName, themeSlug, description, verses, siteUrl])

  return null
}
