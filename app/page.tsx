"use client"

import { FeaturesSection } from "@/components/features-section"
import { QuoteFinder } from "@/components/quote-finder"
import { ExampleShowcase } from "@/components/example-showcase"
import { PageLayout } from "@/components/page-layout"
import { HashScrollToQuoteFinder } from "@/components/hash-scroll-to-quote-finder"
import { BookOpen, Feather, Loader2, Palette, RefreshCw } from "lucide-react"
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

      {/* Hero & Daily Quote Section - Unified Background with Sacred Amber Glow */}
      <section className="relative pt-36 pb-12 px-6 overflow-hidden bg-background">
        {/* Divine Light Glow - Behind Title */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-gradient-radial from-amber-500/6 via-amber-600/2 to-transparent opacity-0 dark:opacity-100 pointer-events-none transition-opacity duration-500"></div>

        <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center">

          {/* 眉毛标题 */}
          <div className="flex items-center gap-2 mb-8 opacity-60">
            <div className="h-px w-8 bg-amber-400 dark:bg-amber-500/40"></div>
            <span className="text-xs tracking-[0.3em] uppercase font-semibold text-amber-950 dark:text-amber-400">
              AI-Powered Scripture Art
            </span>
            <div className="h-px w-8 bg-400 dark:bg-amber-500/40"></div>
          </div>

          {/* Enhanced title with gradient and divine light effect */}
          <h1 className="text-center mb-14 flex flex-col items-center justify-center gap-1 md:gap-4 md:flex-row md:items-baseline relative">
            {/* Title Glow Effect */}
            <div className="absolute inset-0 bg-gradient-radial from-amber-500/10 via-amber-600/5 to-transparent opacity-0 dark:opacity-100 blur-3xl -z-10"></div>
            <span className="text-4xl md:text-5xl font-serif font-bold text-amber-700 dark:text-amber-300">Transform</span>
            <span className="text-4xl md:text-5xl font-serif font-bold text-amber-700 dark:text-amber-300">Bible Quotes</span>
            <span className="text-xl md:text-2xl font-serif italic text-stone-700 dark:text-stone-500">into</span>
            <span className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-700 dark:from-amber-400 dark:via-amber-300 dark:to-amber-400 bg-clip-text text-transparent drop-shadow-sm" style={{ filter: 'drop-shadow(0 1px 2px rgba(212, 175, 55, 0.3))' }}>
              Divine Art
            </span>
          </h1>

          {/* Daily Quote Card - Frosted Glass in Dark Mode */}
          <div className="w-full max-w-4xl relative">
            <div className="absolute -inset-2 bg-amber-100/30 dark:bg-amber-500/5 rounded-[2rem] blur-2xl -z-10"></div>

            <div className="bg-white/80 dark:bg-zinc-900/50 dark:backdrop-blur-2xl backdrop-blur-md border border-amber-100 dark:border-amber-500/20 shadow-[0_20px_50px_rgba(212,175,55,0.1)] dark:shadow-[0_0_60px_rgba(212,175,55,0.12)] rounded-[2rem] p-8 md:p-14 transition-all hover:shadow-amber-200/20 dark:hover:shadow-[0_0_80px_rgba(212,175,55,0.18)]">
              {loading ? (
                <div className="py-12 text-center">
                  <Loader2 className="w-8 h-8 mx-auto text-amber-500 animate-spin mb-4" />
                  <p className="text-sm font-serif italic text-stone-500 dark:text-stone-400">Receiving divine words...</p>
                </div>
              ) : dailyQuote ? (
                <div className="text-center">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-100/80 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-500/30 mb-8">
                    <div className="relative">
                      <div className="absolute inset-0 bg-amber-200/40 dark:bg-amber-500/10 rounded-full p-1"></div>
                      <Feather className="relative w-3.5 h-3.5 text-amber-700 dark:text-amber-400 rotate-[15deg] animate-[float_3s_ease-in-out_infinite]" aria-hidden="true" />
                    </div>
                    <span className="text-xs font-bold uppercase tracking-[0.25em] text-amber-950 dark:text-amber-300">
                      Daily Inspiration
                    </span>
                  </div>

                  <blockquote className="text-2xl md:text-3xl lg:text-4xl font-serif text-stone-800 dark:text-stone-200 leading-relaxed italic font-light mb-8 px-4">
                    "{dailyQuote.content}"
                  </blockquote>

                  <cite className="block text-lg font-serif text-amber-900 dark:text-amber-400 mb-10">
                    — {dailyQuote.reference}
                  </cite>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <button
                      onClick={() => setSelectedQuoteForImage(dailyQuote)}
                      aria-label="Create divine image from daily quote"
                      className="group/btn relative min-h-[44px] px-8 py-3.5 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 dark:from-amber-500 dark:to-amber-600 dark:hover:from-amber-600 dark:hover:to-amber-700 text-white font-serif font-bold rounded-xl shadow-lg shadow-amber-600/20 dark:shadow-amber-500/20 transition-all active:scale-95 flex items-center gap-2 overflow-hidden"
                    >
                      <span className="relative z-10 flex items-center gap-2">
                        <Palette className="w-4 h-4" aria-hidden="true" />
                        Create Divine Image
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-700 ease-in-out"></div>
                    </button>
                    <button
                      onClick={() => document.getElementById("quote-finder")?.scrollIntoView({ behavior: "smooth" })}
                      aria-label="Explore more Bible verses"
                      className="min-h-[44px] px-8 py-3.5 bg-transparent border border-amber-200 dark:border-amber-500/40 text-amber-800 dark:text-amber-400 font-serif font-medium rounded-xl hover:bg-amber-50 dark:hover:bg-amber-950/30 transition-all flex items-center gap-2"
                    >
                      <BookOpen className="w-4 h-4" aria-hidden="true" />
                      Explore Verses
                    </button>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </section>

      {/* 弹窗组件 */}
      {selectedQuoteForImage && (
        <ImageGenerator quote={selectedQuoteForImage} onClose={() => setSelectedQuoteForImage(null)} />
      )}

      {/* 搜索区域 - Unified Background with Subtle Amber Glow */}
      <section className="py-12 px-6 border-y border-amber-50 dark:border-white/5 relative overflow-hidden bg-background">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(212,175,55,0.03)_0%,_transparent_70%)] dark:bg-[radial-gradient(circle_at_center,_rgba(212,175,55,0.04)_0%,_transparent_80%)] pointer-events-none"></div>
        <div className="relative max-w-6xl mx-auto">
          <QuoteFinder />
        </div>
      </section>

      {/* 展示区域 - Unified Background with Subtle Amber Glow */}
      <section className="py-10 px-6 relative overflow-hidden bg-background">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(212,175,55,0.025)_0%,_transparent_70%)] dark:bg-[radial-gradient(circle_at_center,_rgba(212,175,55,0.035)_0%,_transparent_80%)] pointer-events-none"></div>
        <div className="relative max-w-6xl mx-auto">
          <ExampleShowcase />
        </div>
      </section>

      {/* 功能区域 - Unified Background with Subtle Amber Glow */}
      <section className="py-10 px-6 border-t border-amber-50 dark:border-white/5 relative overflow-hidden bg-background">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(212,175,55,0.02)_0%,_transparent_70%)] dark:bg-[radial-gradient(circle_at_center,_rgba(212,175,55,0.03)_0%,_transparent_80%)] pointer-events-none"></div>
        <div className="relative max-w-6xl mx-auto">
          <FeaturesSection />
        </div>
      </section>
    </PageLayout>
  )
}