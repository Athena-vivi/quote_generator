"use client"

import { useEffect } from "react"

interface StructuredDataProps {
  data: Record<string, any>
}

export function StructuredData({ data }: StructuredDataProps) {
  useEffect(() => {
    // 检查是否已经存在相同的结构化数据
    const existingScript = document.querySelector(
      `script[type="application/ld+json"][data-structured="${data["@type"] || "default"}"]`
    )

    if (existingScript) {
      existingScript.remove()
    }

    // 创建新的结构化数据脚本
    const script = document.createElement("script")
    script.type = "application/ld+json"
    script.setAttribute("data-structured", data["@type"] || "default")
    script.textContent = JSON.stringify(data)
    document.head.appendChild(script)

    // 清理函数
    return () => {
      script.remove()
    }
  }, [data])

  return null
}

interface ArticleStructuredDataProps {
  title: string
  description: string
  url: string
  datePublished?: string
  dateModified?: string
  author?: string
  image?: string
}

export function ArticleStructuredData({
  title,
  description,
  url,
  datePublished,
  dateModified,
  author = "QuoteGenerator Team",
  image
}: ArticleStructuredDataProps) {
  const articleData = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description: description,
    author: {
      "@type": "Organization",
      name: author,
      url: "https://quotegenerator.com"
    },
    publisher: {
      "@type": "Organization",
      name: "QuoteGenerator",
      logo: {
        "@type": "ImageObject",
        url: "https://quotegenerator.com/icon.png"
      }
    },
    datePublished: datePublished || new Date().toISOString(),
    dateModified: dateModified || new Date().toISOString(),
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url
    },
    ...(image && {
      image: {
        "@type": "ImageObject",
        url: image,
        width: 1200,
        height: 630
      }
    })
  }

  return <StructuredData data={articleData} />
}

interface BreadcrumbStructuredDataProps {
  items: Array<{
    name: string
    url: string
  }>
}

export function BreadcrumbStructuredData({ items }: BreadcrumbStructuredDataProps) {
  const breadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url
    }))
  }

  return <StructuredData data={breadcrumbData} />
}

interface FAQStructuredDataProps {
  faqs: Array<{
    question: string
    answer: string
  }>
}

export function FAQStructuredData({ faqs }: FAQStructuredDataProps) {
  const faqData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(faq => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer
      }
    }))
  }

  return <StructuredData data={faqData} />
}