"use client"

import { QuoteFinder } from "@/components/quote-finder"
import { PageLayout } from "@/components/page-layout"
import { HashScrollToQuoteFinder } from "@/components/hash-scroll-to-quote-finder"
import { BookOpen, Feather, Loader2, Palette } from "lucide-react"
import { useState, useEffect } from "react"
import dynamic from "next/dynamic"

// Dynamically import large components with loading states
const ImageGenerator = dynamic(
  () => import("@/components/image-generator"),
  {
    loading: () => (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <Loader2 className="w-8 h-8 text-amber-500 animate-spin" />
      </div>
    ),
    ssr: false,
  }
)

const ExampleShowcase = dynamic(
  () => import("@/components/example-showcase"),
  {
    loading: () => (
      <div className="py-20 flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-amber-500 animate-spin" />
      </div>
    ),
    ssr: true,
  }
)

const FeaturesSection = dynamic(
  () => import("@/components/features-section"),
  {
    loading: () => (
      <div className="py-20 flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-amber-500 animate-spin" />
      </div>
    ),
    ssr: true,
  }
)

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

      {/* Hero & Daily Quote Section - Warm parchment with divine radial glow */}
      <section className="relative pt-36 pb-12 px-6 overflow-hidden bg-background">
        {/* Divine Light Glow - Center radial gradient from warm white to soft amber (light) / Golden amber glow (dark) */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[800px] bg-gradient-radial from-white via-amber-50/40 to-amber-50/10 dark:from-amber-500/15 dark:via-amber-600/5 dark:to-transparent pointer-events-none"></div>

        <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center">

          {/* 眉毛标题 */}
          <div className="flex items-center gap-2 mb-8">
            <div className="h-px w-8 bg-stone-800 dark:bg-amber-500/40"></div>
            <span className="text-xs tracking-[0.3em] uppercase font-bold" style={{ color: '#2D1B02' }}>
              <span className="dark:hidden">AI-Powered Scripture Art</span>
              <span className="hidden dark:inline text-amber-400">AI-Powered Scripture Art</span>
            </span>
            <div className="h-px w-8 bg-stone-800 dark:bg-amber-500/40"></div>
          </div>

          {/* Enhanced title with gradient and divine light effect */}
          <h1 className="text-center mb-14 flex flex-col items-center justify-center gap-1 md:gap-4 md:flex-row md:items-baseline relative">
            {/* Title Glow Effect */}
            <div className="absolute inset-0 bg-gradient-radial from-amber-500/10 via-amber-600/5 to-transparent opacity-0 dark:opacity-100 blur-3xl -z-10"></div>
            <span className="text-4xl md:text-5xl font-serif font-bold text-amber-700 dark:text-amber-300">Transform</span>
            <span className="text-4xl md:text-5xl font-serif font-bold text-amber-700 dark:text-amber-300">Bible Quotes</span>
            <span className="text-xl md:text-2xl font-serif italic text-stone-700 dark:text-stone-500">into</span>
            <span className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-700 dark:from-amber-300 dark:via-amber-200 dark:to-amber-300 bg-clip-text text-transparent drop-shadow-sm" style={{ filter: 'drop-shadow(0 1px 2px rgba(212, 175, 55, 0.3))' }}>
              Divine Art
            </span>
          </h1>

          {/* Daily Quote Card - Obsidian Art Style */}
          <div className="w-full max-w-4xl relative">
            {/* Divine golden aura - enhanced for obsidian effect */}
            <div className="absolute -inset-4 bg-gradient-radial from-amber-400/15 via-amber-500/8 to-transparent dark:from-amber-400/12 dark:via-amber-500/4 dark:to-transparent rounded-[3rem] blur-3xl -z-10 animate-pulse-slow"></div>

            {/* Card with gradient border effect */}
            <div className="relative bg-white/85 dark:bg-white/[0.02] dark:backdrop-blur-max backdrop-blur-xl rounded-[2.5rem] p-10 md:p-16 transition-all duration-700 shadow-[0_20px_60px_rgba(212,175,55,0.1)] dark:shadow-[0_0_80px_rgba(212,175,55,0.15)] hover:shadow-[0_30px_80px_rgba(212,175,55,0.15)] dark:hover:shadow-[0_0_100px_rgba(212,175,55,0.25)]">
              {/* Gradient border overlay - fades into darkness */}
              <div className="absolute inset-0 rounded-[2.5rem] p-[1px] bg-gradient-to-br from-amber-500/20 via-transparent to-amber-500/10 dark:from-amber-400/15 dark:via-transparent dark:to-amber-600/8 pointer-events-none"></div>

              {loading ? (
                <div className="py-16 text-center">
                  <div className="relative inline-block">
                    <Loader2 className="w-12 h-12 mx-auto text-amber-600 dark:text-amber-300 animate-spin" />
                    <div className="absolute inset-0 bg-amber-400/15 dark:bg-amber-500/20 rounded-full blur-2xl"></div>
                  </div>
                  <p className="text-sm font-serif italic text-stone-600 dark:text-zinc-300 mt-6">Receiving divine words...</p>
                </div>
              ) : dailyQuote ? (
                <div className="text-center relative">
                  {/* Decorative quote marks - subtle glow */}
                  <div className="absolute -top-4 left-8 text-7xl md:text-8xl font-serif text-amber-300/15 dark:text-amber-500/8 leading-none select-none">"</div>
                  <div className="absolute -bottom-8 right-8 text-7xl md:text-8xl font-serif text-amber-300/15 dark:text-amber-500/8 leading-none select-none">"</div>

                  {/* Daily Inspiration Badge */}
                  <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-amber-100/70 dark:bg-white/[0.02] dark:backdrop-blur-max border border-amber-200/50 dark:border-amber-500/12 mb-10">
                    <div className="relative">
                      <div className="absolute inset-0 bg-amber-300/20 dark:bg-amber-500/8 rounded-full p-1 blur-sm"></div>
                      <Feather className="relative w-3.5 h-3.5 text-amber-700 dark:text-amber-400 rotate-[15deg] animate-[float_3s_ease-in-out_infinite]" aria-hidden="true" />
                    </div>
                    <span className="text-xs font-bold uppercase tracking-[0.25em] text-amber-950 dark:text-amber-300">
                      Daily Inspiration
                    </span>
                  </div>

                  {/* Sacred Scripture Text - Softer colors with loose spacing */}
                  <blockquote
                    className="text-2xl md:text-3xl lg:text-4xl font-serif text-stone-800 dark:text-zinc-200 leading-loose font-light mb-10 px-6 py-4"
                    style={{
                      textShadow: '0 2px 10px rgba(212, 175, 55, 0.08), 0 0 30px rgba(212, 175, 55, 0.03)',
                      letterSpacing: '0.2px'
                    }}
                  >
                    "{dailyQuote.content}"
                  </blockquote>

                  {/* Reference - Amber gold with softer glow */}
                  <cite className="relative inline-block text-xl md:text-2xl font-serif text-amber-800 dark:text-amber-400 font-medium italic mb-12 px-6 py-2" style={{ letterSpacing: '0.6px' }}>
                    — {dailyQuote.reference}
                  </cite>

                  {/* Action Buttons */}
                  <div className="flex flex-row gap-4 justify-center items-center">
                    <button
                      onClick={() => setSelectedQuoteForImage(dailyQuote)}
                      aria-label="Create divine image from daily quote"
                      className="group/btn relative min-h-[48px] px-9 py-4 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 dark:from-amber-500 dark:to-amber-600 dark:hover:from-amber-400 dark:hover:to-amber-500 text-white font-serif font-bold rounded-2xl shadow-lg shadow-amber-600/20 dark:shadow-amber-500/25 transition-all duration-300 active:scale-95 flex items-center gap-2.5 overflow-hidden"
                    >
                      <span className="relative z-10 flex items-center gap-2.5">
                        <Palette className="w-5 h-5" aria-hidden="true" />
                        Create Divine Image
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-700 ease-in-out"></div>
                    </button>
                    <button
                      onClick={() => document.getElementById("quote-finder")?.scrollIntoView({ behavior: "smooth" })}
                      aria-label="Explore more Bible verses"
                      className="min-h-[48px] px-9 py-4 bg-white/60 dark:bg-white/[0.02] dark:backdrop-blur-max border border-amber-200/50 dark:border-amber-500/12 text-amber-800 dark:text-amber-400 font-serif font-semibold rounded-2xl hover:bg-amber-50 dark:hover:bg-white/[0.03] transition-all duration-300 flex items-center gap-2.5 shadow-sm hover:shadow-md"
                    >
                      <BookOpen className="w-5 h-5" aria-hidden="true" />
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

      {/* 搜索区域 - Subtle radial glow */}
      <section className="py-12 px-6 border-y border-amber-50 dark:border-white/5 relative overflow-hidden bg-background">
        <div className="absolute inset-0 bg-gradient-radial from-amber-50/30 via-amber-50/10 to-transparent dark:from-amber-500/8 dark:via-transparent dark:to-transparent pointer-events-none"></div>
        <div className="relative max-w-6xl mx-auto">
          <QuoteFinder />
        </div>
      </section>

      {/* 展示区域 - Subtle radial glow */}
      <section className="py-10 px-6 relative overflow-hidden bg-background">
        <div className="absolute inset-0 bg-gradient-radial from-amber-50/20 via-white/50 to-white dark:from-amber-500/6 dark:via-transparent dark:to-transparent pointer-events-none"></div>
        <div className="relative max-w-6xl mx-auto">
          <ExampleShowcase />
        </div>
      </section>

      {/* 功能区域 - Subtle radial glow */}
      <section className="py-10 px-6 border-t border-amber-50 dark:border-white/5 relative overflow-hidden bg-background">
        <div className="absolute inset-0 bg-gradient-radial from-amber-50/15 via-white/40 to-white dark:from-amber-500/5 dark:via-transparent dark:to-transparent pointer-events-none"></div>
        <div className="relative max-w-6xl mx-auto">
          <FeaturesSection />
        </div>
      </section>
    </PageLayout>
  )
}