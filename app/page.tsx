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

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6 sm:px-8 overflow-hidden pt-32">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-amber-50/30 via-white/50 to-blue-50/40"></div>

        <div className="relative z-10 flex flex-col items-center">
          {/* Eyebrow Heading */}
          <span className="text-xs tracking-[0.2em] opacity-60 uppercase mb-4 text-amber-700/80">
            AI-Powered Divine Art
          </span>

          {/* Main Title */}
          <h1 className="text-center text-4xl md:text-6xl font-bold mb-20 leading-tight">
            <span className="bg-gradient-to-r from-amber-700 via-yellow-600 to-amber-700 bg-clip-text text-transparent">
              Bible Quotes
            </span>
            <span className="text-gray-600/70 font-light mx-3">into</span>
            <span className="bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-700 bg-clip-text text-transparent">
              Divine Art
            </span>
          </h1>

          {/* Daily Quote Card */}
          <div className="relative group max-w-2xl w-full">
            {/* Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-amber-400/20 via-yellow-500/20 to-amber-600/20 rounded-3xl blur-3xl opacity-0 group-hover:opacity-100 transition-all duration-1000"></div>

            {/* Card */}
            <div className="relative bg-white/85 backdrop-blur-2xl border border-white/40 shadow-3xl rounded-3xl p-12 md:p-16 transform hover:scale-[1.02] transition-all duration-700">
              {/* Decorative Elements */}
              <div className="absolute top-4 left-4 w-8 h-8 border-2 border-amber-400/30 rounded-full"></div>
              <div className="absolute top-4 right-4 w-8 h-8 border-2 border-amber-400/30 rounded-full"></div>
              <div className="absolute bottom-4 left-4 w-8 h-8 border-2 border-amber-400/30 rounded-full"></div>
              <div className="absolute bottom-4 right-4 w-8 h-8 border-2 border-amber-400/30 rounded-full"></div>

              {loading ? (
                <div className="text-center py-12">
                  <Loader2 className="w-16 h-16 mx-auto text-amber-600 animate-spin mb-6" />
                  <p className="text-xl text-gray-600 font-light animate-pulse">
                    Receiving divine inspiration...
                  </p>
                </div>
              ) : dailyQuote ? (
                <div className="text-center space-y-8">
                  {/* Header */}
                  <div className="flex items-center justify-center gap-3 mb-6">
                    <Calendar className="w-8 h-8 text-amber-600" />
                    <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-br from-amber-700 via-orange-600 to-amber-800 bg-clip-text text-transparent">
                      Daily Divine
                    </h2>
                  </div>

                  {/* Quote */}
                  <div className="relative">
                    <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-5xl text-amber-200/60 font-serif">"</div>
                    <blockquote className="text-xl md:text-2xl lg:text-3xl font-serif text-gray-800 leading-relaxed font-light px-4 py-2">
                      {dailyQuote.content}
                    </blockquote>
                    <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-5xl text-amber-200/60 font-serif">"</div>
                  </div>

                  {/* Reference */}
                  <cite className="text-lg md:text-xl font-semibold bg-gradient-to-r from-amber-700 to-yellow-700 bg-clip-text text-transparent">
                    {dailyQuote.reference}
                  </cite>

                  {/* Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
                    <button
                      onClick={() => setSelectedQuoteForImage(dailyQuote)}
                      className="px-8 py-4 bg-gradient-to-r from-amber-600 via-yellow-600 to-amber-700 text-white font-semibold rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
                    >
                      <Palette className="w-5 h-5 inline mr-3" />
                      Create Divine Image
                    </button>

                    <button
                      onClick={() => {
                        document.getElementById("quote-finder")?.scrollIntoView({ behavior: "smooth" })
                      }}
                      className="px-8 py-4 bg-white/70 backdrop-blur-sm border-2 border-amber-200/60 text-amber-700 font-semibold rounded-2xl shadow-lg hover:bg-white/85 hover:border-amber-300/80 transform hover:scale-105 transition-all duration-300"
                    >
                      <BookOpen className="w-5 h-5 inline mr-3" />
                      Explore Verses
                    </button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="mb-6 text-amber-600 text-5xl opacity-50">❝</div>
                  <p className="text-xl text-gray-600 mb-6 font-light">Unable to receive today's divine message</p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <button
                      onClick={loadDailyQuote}
                      className="px-8 py-4 bg-gradient-to-r from-amber-600 to-amber-700 text-white font-semibold rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
                    >
                      <RefreshCw className="w-5 h-5 inline mr-3" />
                      Try Again
                    </button>

                    <button
                      onClick={() => {
                        document.getElementById("quote-finder")?.scrollIntoView({ behavior: "smooth" })
                      }}
                      className="px-8 py-4 bg-white/70 backdrop-blur-sm border-2 border-amber-200/60 text-amber-700 font-semibold rounded-2xl shadow-lg hover:bg-white/85 hover:border-amber-300/80 transform hover:scale-105 transition-all duration-300"
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
