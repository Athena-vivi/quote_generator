"use client"

import { useState, useEffect } from "react"
import { Calendar, Loader2, Palette, RefreshCw } from "lucide-react"
import { ImageGenerator } from "./image-generator"

interface Quote {
  reference: string
  content: string
}

export function DailyQuoteSection() {
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
    <>
      <section id="daily-quote-section" className="py-32 px-6 sm:px-8 relative">
        {/* Sacred Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-amber-50/20 via-white/40 to-blue-50/20"></div>
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-amber-200/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-blue-200/10 rounded-full blur-3xl"></div>

        <div className="relative z-10 max-w-5xl mx-auto">
          {/* Header with Divine Typography */}
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-8 group">
              <div className="relative p-4 bg-gradient-to-br from-amber-100/50 to-yellow-100/50 rounded-2xl backdrop-blur-sm border border-amber-200/30 shadow-lg">
                <Calendar className="w-12 h-12 text-amber-600" />
                <div className="absolute inset-0 bg-gradient-to-br from-amber-400/20 to-yellow-500/20 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
              <h2 className="ml-6 text-5xl md:text-6xl font-bold bg-gradient-to-br from-amber-700 via-orange-600 to-amber-800 bg-clip-text text-transparent leading-tight">
                Daily Divine
              </h2>
            </div>
            <p className="text-xl md:text-2xl text-gray-600/80 font-light leading-relaxed">
              Begin your spiritual journey with sacred wisdom
            </p>
          </div>

          {/* Floating Quote Card */}
          <div className="relative group">
            {/* Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-amber-400/20 via-yellow-500/20 to-amber-600/20 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

            {/* Main Card */}
            <div className="relative bg-white/80 backdrop-blur-xl border border-white/40 shadow-2xl rounded-3xl p-12 md:p-16 transform hover:scale-[1.02] transition-all duration-500">
              {/* Decorative Elements */}
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
                  {/* Quote Text with Serif Typography */}
                  <div className="relative">
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-6xl text-amber-200/50 font-serif">"</div>
                    <blockquote className="text-3xl md:text-4xl lg:text-5xl font-serif text-gray-800 leading-relaxed font-light px-8 py-4">
                      {dailyQuote.content}
                    </blockquote>
                    <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-6xl text-amber-200/50 font-serif">"</div>
                  </div>

                  {/* Reference with Golden Accent */}
                  <div className="relative inline-block">
                    <div className="absolute inset-0 bg-gradient-to-r from-amber-400/20 to-yellow-500/20 rounded-full blur-md"></div>
                    <cite className="relative text-2xl md:text-3xl font-semibold bg-gradient-to-r from-amber-700 to-yellow-700 bg-clip-text text-transparent px-6 py-2">
                      {dailyQuote.reference}
                    </cite>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-8">
                    <button
                      onClick={() => setSelectedQuoteForImage(dailyQuote)}
                      className="group relative px-10 py-5 bg-gradient-to-r from-amber-600 via-yellow-600 to-amber-700 text-white font-semibold rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 text-lg"
                    >
                      <span className="relative z-10 flex items-center gap-3">
                        <Palette className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300" />
                        Create Divine Image
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-yellow-600 rounded-2xl blur-md opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
                    </button>

                    <button
                      onClick={getNewQuote}
                      disabled={loading}
                      className="group px-10 py-5 bg-white/60 backdrop-blur-sm border-2 border-amber-200/50 text-amber-700 font-semibold rounded-2xl shadow-lg hover:bg-white/80 hover:border-amber-300/70 transform hover:scale-105 transition-all duration-300 text-lg"
                    >
                      {loading ? (
                        <span className="flex items-center gap-3">
                          <Loader2 className="w-6 h-6 animate-spin" />
                          Receiving...
                        </span>
                      ) : (
                        <span className="flex items-center gap-3">
                          <RefreshCw className="w-6 h-6 group-hover:rotate-180 transition-transform duration-500" />
                          Divine Wisdom
                        </span>
                      )}
                    </button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-16">
                  <div className="mb-8 text-amber-600 text-6xl opacity-50">❝</div>
                  <p className="text-xl text-gray-600 mb-8 font-light">Unable to receive today's divine message</p>
                  <button
                    onClick={loadDailyQuote}
                    className="px-10 py-5 bg-gradient-to-r from-amber-600 to-amber-700 text-white font-semibold rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 text-lg"
                  >
                    <RefreshCw className="w-6 h-6 mr-3" />
                    Try Again
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {selectedQuoteForImage && (
        <ImageGenerator quote={selectedQuoteForImage} onClose={() => setSelectedQuoteForImage(null)} />
      )}
    </>
  )
}
