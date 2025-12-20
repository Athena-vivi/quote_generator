"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
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
      <section id="daily-quote-section" className="py-24 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <Calendar className="w-10 h-10 text-amber-600 mr-3" />
              <h2 className="text-4xl md:text-5xl font-bold text-gray-800">Quote of the Day</h2>
            </div>
            <p className="text-xl text-gray-600">Start your day with inspiration from God's Word</p>
          </div>

          <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-2xl border border-amber-200/20">
            <CardContent className="p-8 md:p-12">
              {loading ? (
                <div className="text-center py-12">
                  <Loader2 className="w-12 h-12 mx-auto mb-4 animate-spin text-amber-600" />
                  <p className="text-lg text-gray-600">Loading today's quote...</p>
                </div>
              ) : dailyQuote ? (
                <div className="text-center space-y-8">
                  <blockquote className="text-2xl md:text-3xl lg:text-4xl font-medium text-gray-800 italic leading-relaxed">
                    {dailyQuote.content}
                  </blockquote>
                  <cite className="text-xl md:text-2xl font-semibold text-amber-700 block">
                    — {dailyQuote.reference}
                  </cite>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6">
                    <Button
                      onClick={() => setSelectedQuoteForImage(dailyQuote)}
                      size="lg"
                      className="bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white px-8 py-4 text-lg shadow-lg"
                    >
                      <Palette className="w-5 h-5 mr-2" />
                      Create Beautiful Image
                    </Button>

                    <Button
                      onClick={getNewQuote}
                      disabled={loading}
                      variant="outline"
                      size="lg"
                      className="px-8 py-4 text-lg bg-white/70 hover:bg-white/90 border-amber-300 text-amber-700 hover:text-amber-800"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                          Loading...
                        </>
                      ) : (
                        <>
                          <RefreshCw className="w-5 h-5 mr-2" />
                          Get Another Quote
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-lg text-gray-600 mb-4">Unable to load today's quote</p>
                  <Button
                    onClick={loadDailyQuote}
                    size="lg"
                    className="bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white px-8 py-4 text-lg shadow-lg"
                  >
                    <RefreshCw className="w-5 h-5 mr-2" />
                    Try Again
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </section>

      {selectedQuoteForImage && (
        <ImageGenerator quote={selectedQuoteForImage} onClose={() => setSelectedQuoteForImage(null)} />
      )}
    </>
  )
}
