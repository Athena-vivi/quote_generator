"use client"

import { useState } from "react"
import { Metadata } from "next"
import { HelpCircle, Search, ChevronDown, ChevronUp, Palette, Heart, BookOpen, Download, Image as ImageIcon, Bug, MessageSquare } from "lucide-react"
import { PageLayout } from "@/components/page-layout"
import Link from "next/link"

interface FAQItem {
  question: string
  answer: string
  category: string
}

const faqs: FAQItem[] = [
  // Getting Started
  {
    question: "How do I find Bible verses on QuoteGenerator?",
    answer: "You can find Bible verses in several ways: (1) Use the 'Find Wisdom' section on the homepage to search by mood or keyword, (2) Browse our 30+ curated theme categories, or (3) Explore our pre-made collections. Each verse includes the full ESV text with proper references.",
    category: "Getting Started"
  },
  {
    question: "Do I need to create an account?",
    answer: "No! QuoteGenerator is completely free to use without creating an account. You can generate images, explore themes, and save favorites—all without signing up. Your favorite verses are stored locally in your browser.",
    category: "Getting Started"
  },
  {
    question: "What Bible translation do you use?",
    answer: "We use the English Standard Version (ESV) Bible through the official ESV API. The ESV is known for its accuracy and faithfulness to the original text, making it ideal for study and memorization. We fetch scripture text in real-time from their servers.",
    category: "Getting Started"
  },

  // Image Generation
  {
    question: "How do I create an image with a Bible verse?",
    answer: "Click the 'Create Divine Image' button on any verse card. This opens our image generator where you can customize fonts, themes, colors, and background styles. When you're satisfied, click 'Generate Image' to create your artwork, then download it to share on social media.",
    category: "Image Generation"
  },
  {
    question: "Can I customize the appearance of my images?",
    answer: "Yes! The image generator offers multiple customization options: choose from serif or sans-serif fonts, select from 30+ themed backgrounds, adjust text colors and alignment, and pick between light or dark themes. Each image is unique and generated in real-time.",
    category: "Image Generation"
  },
  {
    question: "What resolution are the downloaded images?",
    answer: "Generated images are high-resolution (1080x1920 pixels for vertical format), perfect for social media sharing on Instagram, Facebook, WhatsApp, and more. The images include your selected Bible verse and a subtle 'quotegenerator.org' watermark.",
    category: "Image Generation"
  },
  {
    question: "Can I remove the watermark from generated images?",
    answer: "The watermark is included for brand attribution. While you may crop or edit the image for personal use, we appreciate keeping the watermark when sharing publicly to help others discover our service.",
    category: "Image Generation"
  },

  // Favorites
  {
    question: "How do I save verses to my collection?",
    answer: "Click the heart icon in the top-right corner of any verse card. The verse will be saved to your browser's local storage. You can view all your saved favorites by clicking the heart icon in the navigation bar or visiting /favorites.",
    category: "Favorites & Storage"
  },
  {
    question: "Where are my favorite verses stored?",
    answer: "Your favorites are stored locally in your browser using local storage—NOT on our servers. This means your data stays private and on your device. However, if you clear your browser data or switch devices/browsers, your favorites will not be preserved.",
    category: "Favorites & Storage"
  },
  {
    question: "How do I remove a verse from my favorites?",
    answer: "Click the heart icon again on any favorited verse to remove it from your collection, or visit the Favorites page and click the heart icon there. The verse will be immediately removed.",
    category: "Favorites & Storage"
  },

  // ESV Bible API
  {
    question: "What is the ESV Bible API?",
    answer: "The ESV Bible API is an official service provided by Crossway Bibles that allows applications to fetch scripture text programmatically. We use this API to retrieve accurate Bible verses for our themes and collections. All scripture text is fetched from their servers in real-time.",
    category: "ESV Bible API"
  },
  {
    question: "Can I use the generated images commercially?",
    answer: "You retain ownership of the AI-generated images and can use them for personal projects, ministries, and social media. However, the ESV Bible text itself is copyrighted and subject to Crossway's usage terms. For commercial use beyond personal sharing, please review the ESV usage policy at ESV.org/usage.",
    category: "ESV Bible API"
  },

  // Themes & Collections
  {
    question: "What's the difference between themes and collections?",
    answer: "Themes (30+ available) are curated verse selections organized by topics like peace, anxiety, love, or wisdom. Collections are broader groupings that combine multiple themes—like 'Emotional Support' or 'Spiritual Growth.' Both help you discover relevant Scripture for your current needs.",
    category: "Themes & Collections"
  },
  {
    question: "How many themes are available?",
    answer: "We offer 30+ scripture themes covering emotional support, life & relationships, spiritual growth, and special occasions. Each theme includes 18-20 carefully selected ESV verses with full text and references.",
    category: "Themes & Collections"
  },

  // Troubleshooting
  {
    question: "Why isn't the image generation working?",
    answer: "If image generation fails, try these steps: (1) Refresh the page and try again, (2) Check your internet connection, (3) Clear your browser cache, (4) Try a different browser. If the issue persists, please report a bug through our contact form.",
    category: "Troubleshooting"
  },
  {
    question: "Why don't I see any Bible verses?",
    answer: "This could be due to a temporary ESV API outage. Check your internet connection and try refreshing the page. If the problem continues, the ESV service might be temporarily unavailable. Please try again later.",
    category: "Troubleshooting"
  },
  {
    question: "My favorites disappeared. What happened?",
    answer: "Since favorites are stored in your browser's local storage, they can be lost if you clear browser data, use incognito/private mode, or switch to a different browser or device. Unfortunately, we cannot recover locally stored data once it's cleared.",
    category: "Troubleshooting"
  },
  {
    question: "The page looks broken on my device.",
    answer: "QuoteGenerator is optimized for modern browsers (Chrome, Firefox, Safari, Edge). Ensure your browser is updated to the latest version. If issues persist, try clearing your cache or using a different browser.",
    category: "Troubleshooting"
  },

  // Privacy & Data
  {
    question: "Do you track my browsing activity?",
    answer: "No. We do not use third-party tracking cookies or sell your data. We only collect basic technical information (IP address, browser type) for security and service improvement. Your favorite verses are stored locally on your device, not on our servers.",
    category: "Privacy & Data"
  },
  {
    question: "Is my personal information collected?",
    answer: "We don't require accounts and don't collect personal information unless you contact us via our contact form. In that case, we only use your information to respond to your inquiry. See our Privacy Policy for details.",
    category: "Privacy & Data"
  },
]

const categories = Array.from(new Set(faqs.map(faq => faq.category)))

export default function HelpPage() {
  const [openItems, setOpenItems] = useState<Set<string>>(new Set())
  const [selectedCategory, setSelectedCategory] = useState<string>("All")
  const [searchQuery, setSearchQuery] = useState("")

  const toggleItem = (question: string) => {
    setOpenItems(prev => {
      const newSet = new Set(prev)
      if (newSet.has(question)) {
        newSet.delete(question)
      } else {
        newSet.add(question)
      }
      return newSet
    })
  }

  const filteredFaqs = faqs.filter(faq => {
    const matchesCategory = selectedCategory === "All" || faq.category === selectedCategory
    const matchesSearch = searchQuery === "" ||
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <PageLayout showBreadcrumb={true}>
      <div className="min-h-screen bg-[#fdfbf7] dark:bg-black">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">

          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br from-cyan-100 to-blue-100 dark:from-cyan-900/30 dark:to-blue-900/30 rounded-2xl md:rounded-3xl border border-cyan-200/50 dark:border-cyan-500/30 mb-6 shadow-lg">
              <HelpCircle className="w-10 h-10 md:w-12 md:h-12 text-cyan-600 dark:text-cyan-400" />
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-amber-900 dark:text-amber-300 mb-4">
              Help Center
            </h1>
            <p className="text-base md:text-lg text-stone-600 dark:text-stone-400 max-w-2xl mx-auto leading-relaxed">
              Find answers to common questions about QuoteGenerator, image generation, favorites, and more.
            </p>
          </div>

          {/* Search */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
              <input
                type="text"
                placeholder="Search for answers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white dark:bg-stone-900/60 border border-amber-200 dark:border-amber-500/20 rounded-2xl focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 dark:text-stone-200 transition-all"
              />
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            <button
              onClick={() => setSelectedCategory("All")}
              className={`px-4 py-2 rounded-full font-serif text-sm font-medium transition-all ${
                selectedCategory === "All"
                  ? "bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-md"
                  : "bg-white dark:bg-stone-800 text-stone-600 dark:text-stone-400 border border-amber-200 dark:border-amber-500/20 hover:bg-amber-50 dark:hover:bg-stone-700"
              }`}
            >
              All Topics
            </button>
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full font-serif text-sm font-medium transition-all ${
                  selectedCategory === category
                    ? "bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-md"
                    : "bg-white dark:bg-stone-800 text-stone-600 dark:text-stone-400 border border-amber-200 dark:border-amber-500/20 hover:bg-amber-50 dark:hover:bg-stone-700"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Quick Links */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            <Link
              href="/#quote-finder"
              className="flex items-center gap-3 p-4 bg-white dark:bg-stone-900/60 rounded-xl border border-amber-100 dark:border-amber-500/20 hover:shadow-md transition-all"
            >
              <div className="p-2 bg-amber-100 dark:bg-amber-900/40 rounded-lg">
                <BookOpen className="w-5 h-5 text-amber-600 dark:text-amber-400" />
              </div>
              <span className="text-sm font-serif font-medium text-stone-700 dark:text-stone-300">Find Verses</span>
            </Link>
            <Link
              href="/themes"
              className="flex items-center gap-3 p-4 bg-white dark:bg-stone-900/60 rounded-xl border border-amber-100 dark:border-amber-500/20 hover:shadow-md transition-all"
            >
              <div className="p-2 bg-purple-100 dark:bg-purple-900/40 rounded-lg">
                <Palette className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              </div>
              <span className="text-sm font-serif font-medium text-stone-700 dark:text-stone-300">Explore Themes</span>
            </Link>
            <Link
              href="/favorites"
              className="flex items-center gap-3 p-4 bg-white dark:bg-stone-900/60 rounded-xl border border-amber-100 dark:border-amber-500/20 hover:shadow-md transition-all"
            >
              <div className="p-2 bg-rose-100 dark:bg-rose-900/40 rounded-lg">
                <Heart className="w-5 h-5 text-rose-600 dark:text-rose-400" />
              </div>
              <span className="text-sm font-serif font-medium text-stone-700 dark:text-stone-300">My Collection</span>
            </Link>
            <Link
              href="/contact"
              className="flex items-center gap-3 p-4 bg-white dark:bg-stone-900/60 rounded-xl border border-amber-100 dark:border-amber-500/20 hover:shadow-md transition-all"
            >
              <div className="p-2 bg-blue-100 dark:bg-blue-900/40 rounded-lg">
                <MessageSquare className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <span className="text-sm font-serif font-medium text-stone-700 dark:text-stone-300">Contact Us</span>
            </Link>
          </div>

          {/* FAQ Accordion */}
          <div className="space-y-4">
            <h2 className="text-2xl font-serif font-bold text-amber-900 dark:text-amber-300 mb-6">
              {selectedCategory === "All" ? "Frequently Asked Questions" : selectedCategory}
            </h2>

            {filteredFaqs.length === 0 ? (
              <div className="text-center py-12">
                <Search className="w-12 h-12 text-stone-300 dark:text-stone-600 mx-auto mb-4" />
                <p className="text-stone-500 dark:text-stone-500">
                  No results found for "{searchQuery}". Try different keywords or browse all topics.
                </p>
              </div>
            ) : (
              filteredFaqs.map((faq, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-stone-900/60 rounded-2xl border border-amber-100 dark:border-amber-500/20 overflow-hidden"
                >
                  <button
                    onClick={() => toggleItem(faq.question)}
                    className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-amber-50 dark:hover:bg-amber-950/10 transition-colors"
                  >
                    <div className="flex items-start gap-4 flex-1">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-amber-100 dark:bg-amber-900/40 flex items-center justify-center text-xs font-bold text-amber-700 dark:text-amber-300">
                        {openItems.has(faq.question) ? "−" : "+"}
                      </span>
                      <div className="flex-1">
                        <span className="text-sm font-serif font-semibold text-stone-700 dark:text-stone-300">
                          {faq.question}
                        </span>
                        <span className="block text-xs text-stone-400 dark:text-stone-600 mt-1">
                          {faq.category}
                        </span>
                      </div>
                    </div>
                  </button>

                  {openItems.has(faq.question) && (
                    <div className="px-6 pb-5 pl-16">
                      <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>

          {/* Still Need Help */}
          <div className="mt-16 text-center">
            <div className="max-w-2xl mx-auto p-8 bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-amber-950/20 dark:to-amber-900/10 rounded-3xl border border-amber-200 dark:border-amber-500/20">
              <HelpCircle className="w-12 h-12 text-amber-600 dark:text-amber-400 mx-auto mb-4" />
              <h3 className="text-2xl font-serif font-bold text-amber-900 dark:text-amber-300 mb-3">
                Still Need Help?
              </h3>
              <p className="text-stone-600 dark:text-stone-400 text-sm mb-6">
                Can't find what you're looking for? We're here to assist you.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-serif font-semibold rounded-xl shadow-md hover:shadow-lg transition-all"
                >
                  <MessageSquare className="w-5 h-5" />
                  <span>Contact Us</span>
                </Link>
                <Link
                  href="/bug-report"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white dark:bg-stone-800 border border-amber-200 dark:border-amber-500/20 text-amber-800 dark:text-amber-400 font-serif font-semibold rounded-xl hover:bg-amber-50 dark:hover:bg-stone-700 transition-all"
                >
                  <Bug className="w-5 h-5" />
                  <span>Report a Bug</span>
                </Link>
              </div>
            </div>
          </div>

        </div>
      </div>
    </PageLayout>
  )
}
