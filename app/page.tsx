"use client"

import { FeaturesSection } from "@/components/features-section"
import { QuoteFinder } from "@/components/quote-finder"
import { DailyQuoteSection } from "@/components/daily-quote-section"
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

  const getNewQuote = async () => {
    setLoading(true)
    try {
      // Force a new quote by adding a timestamp parameter
      const response = await fetch(`/api/verses/daily?t=${Date.now()}`)
      const data = await response.json()

      if (data.success) {
        setDailyQuote(data.quote)
      }
    } catch (error) {
      console.error("Failed to load new quote:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <PageLayout showBreadcrumb={false}>
      <HashScrollToQuoteFinder />

      {/* Integrated Hero + Daily Quote Section */}
      <section className="relative min-h-screen flex flex-col justify-center items-center px-6 sm:px-8 overflow-hidden">
        {/* Enhanced Sacred Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-amber-50/30 via-white/50 to-blue-50/40"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-100/40 via-transparent to-transparent"></div>

        {/* Floating Divine Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/6 right-1/6 w-96 h-96 bg-gradient-to-br from-amber-300/15 to-yellow-400/15 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/6 left-1/6 w-80 h-80 bg-gradient-to-tr from-blue-300/15 to-purple-400/15 rounded-full blur-3xl animate-pulse animation-delay-2000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/3 w-[800px] h-[600px] bg-gradient-to-r from-amber-200/10 to-yellow-300/10 rounded-full blur-3xl"></div>
        </div>

        {/* Divine Light Rays */}
        <div className="absolute inset-0 pointer-events-none opacity-25">
          <div className="absolute top-0 left-1/3 w-1 h-full bg-gradient-to-b from-amber-400 to-transparent blur-sm"></div>
          <div className="absolute top-0 right-1/3 w-1 h-full bg-gradient-to-b from-yellow-400 to-transparent blur-sm animation-delay-1000"></div>
          <div className="absolute top-0 left-1/2 w-1 h-full bg-gradient-to-b from-amber-300 to-transparent blur-sm animation-delay-2000"></div>
        </div>

        <div className="relative z-10 w-full max-w-6xl mx-auto">
          {/* Main Heading */}
          <div className="text-center mb-12">
            <h1 className="leading-tight mb-8">
              <span className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 font-quote bg-gradient-to-r from-amber-700 via-yellow-600 to-amber-700 bg-clip-text text-transparent animate-shimmer">
                Transform
              </span>
              <span className="block text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 bg-gradient-to-br from-amber-600 via-orange-600 to-amber-700 bg-clip-text text-transparent">
                Bible Quotes
              </span>
              <span className="block text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-700/80 mb-4">
                into
              </span>
              <span className="relative block text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold">
                <span className="absolute inset-0 bg-gradient-to-r from-amber-400 to-yellow-600 blur-lg opacity-60 animate-pulse"></span>
                <span className="relative bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-700 bg-clip-text text-transparent">
                  Divine Art
                </span>
              </span>
            </h1>
          </div>

          {/* Integrated Daily Quote Card */}
          <div className="relative group mb-12">
            {/* Divine Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-amber-400/20 via-yellow-500/20 to-amber-600/20 rounded-3xl blur-3xl opacity-0 group-hover:opacity-100 transition-all duration-1000 transform scale-95 group-hover:scale-100"></div>

            {/* Main Quote Card */}
            <div className="relative bg-white/85 backdrop-blur-2xl border border-white/40 shadow-3xl rounded-3xl p-12 md:p-16 transform hover:scale-[1.02] transition-all duration-700">
              {/* Divine Decorative Elements */}
              <div className="absolute top-4 left-4 w-8 h-8 border-2 border-amber-400/30 rounded-full"></div>
              <div className="absolute top-4 right-4 w-8 h-8 border-2 border-amber-400/30 rounded-full"></div>
              <div className="absolute bottom-4 left-4 w-8 h-8 border-2 border-amber-400/30 rounded-full"></div>
              <div className="absolute bottom-4 right-4 w-8 h-8 border-2 border-amber-400/30 rounded-full"></div>

              {loading ? (
                <div className="text-center py-16">
                  <div className="relative mb-8">
                    <Loader2 className="w-16 h-16 mx-auto text-amber-600 animate-spin" />
                    <div className="absolute inset-0 bg-amber-400/20 rounded-full blur-2xl"></div>
                  </div>
                  <p className="text-xl text-gray-600 font-light animate-pulse">
                    Receiving divine inspiration...
                  </p>
                </div>
              ) : dailyQuote ? (
                <div className="text-center space-y-10">
                  {/* Quote Header */}
                  <div className="flex items-center justify-center gap-4 mb-8">
                    <div className="relative p-3 bg-gradient-to-br from-amber-100/60 to-yellow-100/60 rounded-2xl backdrop-blur-sm border border-amber-200/40 shadow-lg">
                      <Calendar className="w-10 h-10 text-amber-600" />
                      <div className="absolute inset-0 bg-gradient-to-br from-amber-400/25 to-yellow-500/25 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-br from-amber-700 via-orange-600 to-amber-800 bg-clip-text text-transparent">
                      Daily Divine
                    </h2>
                  </div>

                  {/* Quote Text */}
                  <div className="relative">
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-6xl text-amber-200/60 font-serif">"</div>
                    <blockquote className="text-2xl md:text-3xl lg:text-4xl font-serif text-gray-800 leading-relaxed font-light px-6 py-3">
                      {dailyQuote.content}
                    </blockquote>
                    <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-6xl text-amber-200/60 font-serif">"</div>
                  </div>

                  {/* Reference */}
                  <div className="relative inline-block">
                    <div className="absolute inset-0 bg-gradient-to-r from-amber-400/25 to-yellow-500/25 rounded-full blur-lg"></div>
                    <cite className="relative text-xl md:text-2xl font-semibold bg-gradient-to-r from-amber-700 to-yellow-700 bg-clip-text text-transparent px-6 py-2">
                      {dailyQuote.reference}
                    </cite>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6">
                    <button
                      onClick={() => setSelectedQuoteForImage(dailyQuote)}
                      className="group relative px-8 py-4 bg-gradient-to-r from-amber-600 via-yellow-600 to-amber-700 text-white font-semibold rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
                    >
                      <span className="relative z-10 flex items-center gap-3">
                        <Palette className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
                        Create Divine Image
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-yellow-600 rounded-2xl blur-md opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
                    </button>

                    <button
                      onClick={() => {
                        document.getElementById("quote-finder")?.scrollIntoView({ behavior: "smooth" })
                      }}
                      className="group px-8 py-4 bg-white/70 backdrop-blur-sm border-2 border-amber-200/60 text-amber-700 font-semibold rounded-2xl shadow-lg hover:bg-white/85 hover:border-amber-300/80 transform hover:scale-105 transition-all duration-300"
                    >
                      <span className="flex items-center gap-3">
                        <BookOpen className="w-5 h-5" />
                        Explore Verses
                      </span>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-16">
                  <div className="mb-8 text-amber-600 text-6xl opacity-50">❝</div>
                  <p className="text-xl text-gray-600 mb-8 font-light">Unable to receive today's divine message</p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <button
                      onClick={loadDailyQuote}
                      className="px-8 py-4 bg-gradient-to-r from-amber-600 to-amber-700 text-white font-semibold rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
                    >
                      <RefreshCw className="w-5 h-5 mr-3" />
                      Try Again
                    </button>

                    <button
                      onClick={() => {
                        document.getElementById("quote-finder")?.scrollIntoView({ behavior: "smooth" })
                      }}
                      className="group px-8 py-4 bg-white/70 backdrop-blur-sm border-2 border-amber-200/60 text-amber-700 font-semibold rounded-2xl shadow-lg hover:bg-white/85 hover:border-amber-300/80 transform hover:scale-105 transition-all duration-300"
                    >
                      <span className="flex items-center gap-3">
                        <BookOpen className="w-5 h-5" />
                        Explore Verses
                      </span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-gray-600/80 font-light leading-relaxed text-center max-w-4xl mx-auto mb-12">
            Experience the sacred beauty of Scripture through AI-generated masterpieces
          </p>

          {/* Call to Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={() => {
                document.getElementById("quote-finder")?.scrollIntoView({ behavior: "smooth" })
              }}
              className="group relative px-8 py-4 bg-gradient-to-r from-amber-600 to-yellow-600 text-white font-semibold rounded-full shadow-xl hover:shadow-2xl hover:from-amber-700 hover:to-yellow-700 transform hover:scale-105 transition-all duration-300 text-lg"
            >
              <span className="relative z-10 flex items-center gap-3">
                <Sparkles className="w-5 h-5 animate-pulse" />
                Create Divine Art
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-yellow-500 rounded-full blur-md opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
            </button>

            <button
              onClick={() => {
                document.getElementById("quote-finder")?.scrollIntoView({ behavior: "smooth" })
              }}
              className="group px-8 py-4 bg-white/60 backdrop-blur-sm border border-amber-200/50 text-amber-700 font-semibold rounded-full shadow-lg hover:bg-white/80 hover:border-amber-300/70 transform hover:scale-105 transition-all duration-300 text-lg"
            >
              <span className="flex items-center gap-3">
                <BookOpen className="w-5 h-5" />
                Explore Verses
              </span>
            </button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-amber-400/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-amber-400/80 rounded-full mt-2"></div>
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
