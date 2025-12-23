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

      {/* Hero & Daily Quote Section - Enhanced spacing and visual impact */}
      <section className="relative pt-36 pb-12 px-6 overflow-hidden bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-50/40 via-white to-white">
        <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center">

          {/* 眉毛标题 */}
          <div className="flex items-center gap-2 mb-8 opacity-60">
            <div className="h-px w-8 bg-amber-400"></div>
            <span className="text-[10px] tracking-[0.3em] uppercase font-medium text-amber-800">
              AI-Powered Scripture Art
            </span>
            <div className="h-px w-8 bg-amber-400"></div>
          </div>

          {/* Enhanced title with gradient and metallic effect */}
          <h1 className="text-center mb-14 flex flex-col md:flex-row items-baseline justify-center gap-2 md:gap-4 md:whitespace-nowrap">
            <span className="text-4xl md:text-5xl font-serif font-bold text-amber-700">Transform</span>
            <span className="text-4xl md:text-5xl font-serif font-bold text-amber-700">Bible Quotes</span>
            <span className="text-xl md:text-2xl font-serif italic text-stone-400">into</span>
            <span className="text-4xl md:text-5xl font-serif font-bold bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-700 bg-clip-text text-transparent drop-shadow-sm" style={{ filter: 'drop-shadow(0 1px 2px rgba(212, 175, 55, 0.3))' }}>
              Divine Art
            </span>
          </h1>

          {/* Daily Quote Card - 统一阴影与宽度 */}
          <div className="w-full max-w-4xl relative">
            <div className="absolute -inset-2 bg-amber-100/30 rounded-[2rem] blur-2xl -z-10"></div>
            
            <div className="bg-white/80 backdrop-blur-md border border-amber-100 shadow-[0_20px_50px_rgba(212,175,55,0.1)] rounded-[2rem] p-8 md:p-14 transition-all hover:shadow-amber-200/20">
              {loading ? (
                <div className="py-12 text-center">
                  <Loader2 className="w-8 h-8 mx-auto text-amber-500 animate-spin mb-4" />
                  <p className="text-sm font-serif italic text-stone-500">Receiving divine words...</p>
                </div>
              ) : dailyQuote ? (
                <div className="text-center">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-50/50 border border-amber-100 mb-8">
                    <div className="relative">
                      <div className="absolute inset-0 bg-amber-100/30 rounded-full p-1"></div>
                      <Feather className="relative w-3.5 h-3.5 text-amber-600/70 rotate-[15deg] animate-[float_3s_ease-in-out_infinite]" />
                    </div>
                    <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-amber-800/80 font-sans">
                      Daily Inspiration
                    </span>
                  </div>

                  <blockquote className="text-2xl md:text-3xl lg:text-4xl font-serif text-stone-800 leading-relaxed italic font-light mb-8 px-4">
                    “{dailyQuote.content}”
                  </blockquote>

                  <cite className="block text-lg font-serif font-semibold text-amber-600 mb-10">
                    — {dailyQuote.reference}
                  </cite>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <button
                      onClick={() => setSelectedQuoteForImage(dailyQuote)}
                      className="px-8 py-3.5 bg-amber-600 hover:bg-amber-700 text-white font-serif font-bold rounded-xl shadow-lg shadow-amber-600/20 transition-all active:scale-95 flex items-center gap-2"
                    >
                      <Palette className="w-4 h-4" />
                      Create Divine Image
                    </button>
                    <button
                      onClick={() => document.getElementById("quote-finder")?.scrollIntoView({ behavior: "smooth" })}
                      className="px-8 py-3.5 bg-transparent border border-amber-200 text-amber-800 font-serif font-medium rounded-xl hover:bg-amber-50 transition-all flex items-center gap-2"
                    >
                      <BookOpen className="w-4 h-4" />
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

      {/* 搜索区域 - Optimized with radial gradient and center glow */}
      <section className="py-12 px-6 border-y border-amber-50 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-50/40 via-white to-white"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#f0f9ff_0%,_transparent_70%)] pointer-events-none"></div>
        <div className="relative max-w-6xl mx-auto">
          <QuoteFinder />
        </div>
      </section>

      {/* 展示区域 - Optimized with radial gradient and center glow */}
      <section className="py-12 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-amber-50/30 via-white to-white"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#f0fdf4_0%,_transparent_70%)] pointer-events-none"></div>
        <div className="relative max-w-6xl mx-auto">
          <ExampleShowcase />
        </div>
      </section>

      {/* 功能区域 - Optimized with radial gradient and center glow */}
      <section className="py-12 px-6 border-t border-amber-50 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-50/30 via-white to-white"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#fef3c7_0%,_transparent_70%)] pointer-events-none"></div>
        <div className="relative max-w-6xl mx-auto">
          <FeaturesSection />
        </div>
      </section>
    </PageLayout>
  )
}