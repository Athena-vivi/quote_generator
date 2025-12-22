"use client"

import { FeaturesSection } from "@/components/features-section"
import { QuoteFinder } from "@/components/quote-finder"
import { ExampleShowcase } from "@/components/example-showcase"
import { PageLayout } from "@/components/page-layout"
import { HashScrollToQuoteFinder } from "@/components/hash-scroll-to-quote-finder"
import { Sparkles, BookOpen, Calendar, Loader2, Palette, RefreshCw } from "lucide-react"
import { useState, useEffect } from "react"
import { ImageGenerator } from "@/components/image-generator"

interface Quote {
  reference: string
  content: string
}

export default function HomePage() {
  const [dailyQuote, setDailyQuote] = useState<Quote | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedQuoteForImage, setSelectedQuoteForImage] = useState<Quote | null>(null)

  // Auto-load daily quote on component mount
  useEffect(() => {
    loadDailyQuote()
  }, [])

  const loadDailyQuote = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/verses/daily")
      const data = await response.json()

      if (data.success) {
        setDailyQuote(data.quote)
      }
    } catch (error) {
      console.error("Failed to load daily quote:", error)
    } finally {
      setLoading(false)
    }
  }

  
  return (
    <PageLayout showBreadcrumb={false}>
      <HashScrollToQuoteFinder />

      {/* Hero Section - Premium Redesign */}
      <section className="relative min-h-screen flex items-center justify-center px-6 sm:px-8 overflow-hidden pt-16">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-amber-50/15 via-white/30 to-blue-50/25"></div>

        <div className="relative z-10 flex flex-col items-center gap-y-6">
          {/* Eyebrow Heading */}
          <span className="text-xs tracking-[0.3em] opacity-50 uppercase text-amber-600/70 font-sans">
            AI-Powered Divine Art
          </span>

          {/* Main Title - Single Line */}
          <h1 className="text-center text-2xl md:text-4xl leading-tight font-serif">
            <span className="font-bold" style={{ color: '#D4AF37' }}>
              Bible Quotes
            </span>
            <span className="italic font-light text-gray-400 mx-6 text-sm md:text-base">
              into
            </span>
            <span className="font-bold" style={{ color: '#D4AF37' }}>
              Divine Art
            </span>
          </h1>

          {/* Daily Quote Card - Expanded */}
          <div className="relative group max-w-4xl w-full mt-8">
            {/* Enhanced Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-amber-400/15 via-yellow-500/15 to-amber-600/15 rounded-3xl blur-3xl opacity-0 group-hover:opacity-100 transition-all duration-1000"></div>

            {/* Premium Card */}
            <div className="relative bg-white/90 backdrop-blur-2xl border border-amber-200/30 shadow-2xl rounded-3xl px-12 py-10 transform hover:scale-[1.02] transition-all duration-700">
              {/* Subtle Decorative Elements */}
              <div className="absolute top-6 left-6 w-6 h-6 border border-amber-300/20 rounded-full"></div>
              <div className="absolute top-6 right-6 w-6 h-6 border border-amber-300/20 rounded-full"></div>
              <div className="absolute bottom-6 left-6 w-6 h-6 border border-amber-300/20 rounded-full"></div>
              <div className="absolute bottom-6 right-6 w-6 h-6 border border-amber-300/20 rounded-full"></div>

              {loading ? (
                <div className="text-center py-16">
                  <Loader2 className="w-12 h-12 mx-auto text-amber-600 animate-spin mb-6" />
                  <p className="text-lg text-gray-600 font-light animate-pulse font-serif">
                    Receiving divine inspiration...
                  </p>
                </div>
              ) : dailyQuote ? (
                <div className="text-center space-y-10">
                  {/* Elegant Header - Reduced Size */}
                  <div className="flex items-center justify-center gap-3">
                    <Calendar className="w-6 h-6 text-amber-600" />
                    <h2 className="text-xl md:text-2xl font-serif bg-gradient-to-br from-amber-700 to-amber-800 bg-clip-text text-transparent">
                      Daily Divine
                    </h2>
                  </div>

                  {/* Scripture Quote */}
                  <div className="relative">
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-6xl text-amber-200/50 font-serif italic">"</div>
                    <blockquote className="text-2xl md:text-3xl lg:text-4xl font-serif text-gray-800 leading-relaxed font-light px-8 py-4">
                      {dailyQuote.content}
                    </blockquote>
                    <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-6xl text-amber-200/50 font-serif italic">"</div>
                  </div>

                  {/* Scripture Reference */}
                  <cite className="text-lg md:text-xl font-serif font-semibold" style={{ color: '#D4AF37' }}>
                    {dailyQuote.reference}
                  </cite>

                  {/* Action Buttons - Spaced Out */}
                  <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-8">
                    <button
                      onClick={() => setSelectedQuoteForImage(dailyQuote)}
                      className="px-10 py-4 bg-gradient-to-r from-amber-600 via-yellow-600 to-amber-700 text-white font-semibold rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 font-serif"
                    >
                      <Palette className="w-5 h-5 inline mr-3" />
                      Create Divine Image
                    </button>

                    <button
                      onClick={() => {
                        document.getElementById("quote-finder")?.scrollIntoView({ behavior: "smooth" })
                      }}
                      className="px-10 py-4 bg-white/70 backdrop-blur-sm border-2 border-amber-200/60 text-amber-700 font-semibold rounded-2xl shadow-lg hover:bg-white/85 hover:border-amber-300/80 transform hover:scale-105 transition-all duration-300 font-serif"
                    >
                      <BookOpen className="w-5 h-5 inline mr-3" />
                      Explore Verses
                    </button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-16">
                  <div className="mb-8" style={{ color: '#D4AF37', opacity: 0.5 }}>
                    <span className="text-6xl font-serif italic">❝</span>
                  </div>
                  <p className="text-xl text-gray-600 mb-8 font-light font-serif">Unable to receive today's divine message</p>
                  <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                    <button
                      onClick={loadDailyQuote}
                      className="px-10 py-4 bg-gradient-to-r from-amber-600 to-amber-700 text-white font-semibold rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 font-serif"
                    >
                      <RefreshCw className="w-5 h-5 inline mr-3" />
                      Try Again
                    </button>

                    <button
                      onClick={() => {
                        document.getElementById("quote-finder")?.scrollIntoView({ behavior: "smooth" })
                      }}
                      className="px-10 py-4 bg-white/70 backdrop-blur-sm border-2 border-amber-200/60 text-amber-700 font-semibold rounded-2xl shadow-lg hover:bg-white/85 hover:border-amber-300/80 transform hover:scale-105 transition-all duration-300 font-serif"
                    >
                      <BookOpen className="w-5 h-5 inline mr-3" />
                      Explore Verses
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {selectedQuoteForImage && (
        <ImageGenerator quote={selectedQuoteForImage} onClose={() => setSelectedQuoteForImage(null)} />
      )}

      {/* Search Section */}
      <section className="relative py-24 px-6 sm:px-8 bg-gradient-to-br from-blue-50/30 via-white/50 to-purple-50/30">
        <QuoteFinder />
      </section>

      {/* Showcase Section */}
      <section className="relative py-24 px-6 sm:px-8 bg-gradient-to-br from-amber-50/40 via-white/60 to-yellow-50/40">
        <ExampleShowcase />
      </section>

      {/* Features Section */}
      <section className="relative py-24 px-6 sm:px-8 bg-gradient-to-b from-white/70 to-amber-50/50">
        <FeaturesSection />
      </section>
    </PageLayout>
  )
}
