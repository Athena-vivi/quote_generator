"use client"

import { FeaturesSection } from "@/components/features-section"
import { QuoteFinder } from "@/components/quote-finder"
import { ExampleShowcase } from "@/components/example-showcase"
import { PageLayout } from "@/components/page-layout"
import { HashScrollToQuoteFinder } from "@/components/hash-scroll-to-quote-finder"
import { BookOpen, Calendar, Loader2, Palette, RefreshCw } from "lucide-react"
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

      {/* Hero & Daily Quote Section - 紧凑且色调统一 */}
      <section className="relative pt-20 pb-12 px-6 overflow-hidden bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-50/40 via-white to-white">
        <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center">
          
          {/* 眉毛标题 */}
          <div className="flex items-center gap-2 mb-6 opacity-60">
            <div className="h-px w-8 bg-amber-400"></div>
            <span className="text-[10px] tracking-[0.3em] uppercase font-medium text-amber-800">
              AI-Powered Scripture Art
            </span>
            <div className="h-px w-8 bg-amber-400"></div>
          </div>

          {/* 紧凑标题 */}
          <h1 className="text-center mb-12 flex flex-col md:flex-row items-center justify-center gap-2 md:gap-4">
            <span className="text-4xl md:text-5xl font-serif font-bold text-amber-700">Bible Quotes</span>
            <span className="text-xl md:text-2xl font-serif italic text-stone-400">into</span>
            <span className="text-4xl md:text-5xl font-serif font-bold text-amber-600">Divine Art</span>
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
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-100 mb-8">
                    <Calendar className="w-3.5 h-3.5 text-amber-600" />
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800">Today's Wisdom</span>
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

      {/* 搜索区域 - 移除杂色背景，缩短间距 */}
      <section className="py-16 px-6 bg-white border-y border-amber-50">
        <div className="max-w-6xl mx-auto">
          <QuoteFinder />
        </div>
      </section>

      {/* 展示区域 - 保持暖调 */}
      <section className="py-16 px-6 bg-amber-50/20">
        <div className="max-w-6xl mx-auto">
          <ExampleShowcase />
        </div>
      </section>

      {/* 功能区域 - 紧凑结尾 */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <FeaturesSection />
        </div>
      </section>
    </PageLayout>
  )
}