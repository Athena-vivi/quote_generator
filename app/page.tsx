"use client"

import { QuoteFinder } from "@/components/quote-finder"
import { PageLayout } from "@/components/page-layout"
import { HashScrollToQuoteFinder } from "@/components/hash-scroll-to-quote-finder"
import { BookOpen, Feather, Loader2, Palette } from "lucide-react"
import { useState, useEffect, useCallback } from "react"
import dynamic from "next/dynamic"
import { useImageGenerator } from "@/contexts/image-generator-context"

// Dynamically import large components with loading states
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

// 保底静态经文 - John 3:16
const FALLBACK_QUOTE: Quote = {
  reference: "John 3:16",
  content: "For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life."
}

function HomeContent() {
  const [dailyQuote, setDailyQuote] = useState<Quote | null>(null)
  const [loading, setLoading] = useState(true)
  const [hasMounted, setHasMounted] = useState(false)
  const { openImageGenerator } = useImageGenerator()

  // 水合修复：确保客户端渲染后才显示动态内容
  useEffect(() => {
    setHasMounted(true)
  }, [])

  // 使用 useCallback 确保 useEffect 依赖稳定
  const loadDailyQuote = useCallback(async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/verses/daily", {
        cache: 'no-store',
      })

      if (!response.ok) throw new Error(`HTTP ${response.status}`)

      const data = await response.json()
      if (data.success && data.quote) {
        setDailyQuote(data.quote)
      } else {
        throw new Error("Invalid response format")
      }
    } catch (error) {
      console.error("Failed to load daily quote:", error)
      // 使用保底经文
      setDailyQuote(FALLBACK_QUOTE)
    } finally {
      setLoading(false)
    }
  }, [])

  // 组件挂载且已水合后加载数据
  useEffect(() => {
    if (hasMounted) {
      loadDailyQuote()
    }
  }, [hasMounted, loadDailyQuote])

  // 水合期间不渲染任何内容
  if (!hasMounted) {
    return null
  }

  return (
    <>
      <HashScrollToQuoteFinder />

      {/* Hero & Daily Quote Section - Deep dark mode with sacred scroll aesthetic */}
      <section className="relative pt-24 md:pt-36 pb-12 px-6 overflow-hidden bg-stone-50/50 dark:bg-black">
        {/* Centered Back Glow - Ultra-subtle amber light from behind */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-radial from-amber-400/8 via-amber-500/3 to-transparent dark:from-amber-400/6 dark:via-amber-500/2 dark:to-transparent pointer-events-none"></div>

        <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center">

          {/* Eyebrow Header - No background */}
          <div className="hidden md:flex items-center gap-2 mb-8">
            <div className="h-px w-8 bg-stone-800 dark:bg-amber-500/30"></div>
            <span className="text-xs tracking-[0.3em] uppercase font-bold text-stone-800 dark:text-amber-400">
              AI-Powered Scripture Art
            </span>
            <div className="h-px w-8 bg-stone-800 dark:bg-amber-500/30"></div>
          </div>

          {/* Title - No background, transparent */}
          <h1 className="hidden md:flex text-center mb-14 flex-col items-center justify-center gap-1 md:gap-4 md:flex-row md:items-baseline">
            <span className="text-4xl md:text-5xl font-serif font-bold text-amber-700 dark:text-amber-200">Transform</span>
            <span className="text-4xl md:text-5xl font-serif font-bold text-amber-700 dark:text-amber-200">Bible Quotes</span>
            <span className="text-xl md:text-2xl font-serif italic text-stone-700 dark:text-zinc-500">into</span>
            <span className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-700 dark:from-amber-300 dark:via-amber-200 dark:to-amber-300 bg-clip-text text-transparent" style={{ filter: 'drop-shadow(0 1px 2px rgba(212, 175, 55, 0.3))' }}>
              Divine Art
            </span>
          </h1>

          {/* The Immutable Shell - 统一外壳，永远不变 */}
          <div className="relative w-full max-w-4xl bg-white/90 dark:bg-black/40 dark:backdrop-blur-3xl backdrop-blur-xl rounded-[2.5rem] p-10 md:p-16 transition-all duration-700 shadow-[0_20px_60px_rgba(0,0,0,0.08)] dark:shadow-[0_0_80px_rgba(212,175,55,0.15)] hover:shadow-[0_30px_80px_rgba(0,0,0,0.12)] dark:hover:shadow-[0_0_100px_rgba(212,175,55,0.22)] border border-amber-100/20 dark:border-amber-500/15 hover:border-amber-200/40 dark:hover:border-amber-500/25">
            {/* Gradient border overlay */}
            <div className="absolute inset-0 rounded-[2.5rem] p-[1px] bg-gradient-to-br from-amber-500/15 via-transparent to-amber-500/8 dark:from-amber-400/10 dark:via-transparent dark:to-amber-600/6 pointer-events-none"></div>

            {/* Inner Content - 单容器占位方案 */}
            <div className="relative min-h-[380px] flex flex-col">

              {/* 装饰性引号 - 始终存在 */}
              <div className="absolute -top-4 left-8 text-7xl md:text-8xl font-serif text-amber-200/20 dark:text-amber-500/10 leading-none select-none pointer-events-none">"</div>
              <div className="absolute -bottom-8 right-8 text-7xl md:text-8xl font-serif text-amber-200/20 dark:text-amber-500/10 leading-none select-none pointer-events-none">"</div>

              {/* 1. 顶部 Badge 区域 - min-h-[60px] 固定高度 */}
              <div className="min-h-[60px] flex items-center justify-center mb-10">
                {loading ? (
                  <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-stone-100/50 dark:bg-amber-500/5 border border-stone-200/40 dark:border-amber-500/10 relative overflow-hidden">
                    <div className="w-16 h-3 bg-stone-200/50 dark:bg-amber-400/20 rounded-full"></div>
                    <div className="w-24 h-3 bg-stone-200/50 dark:bg-amber-400/20 rounded-full"></div>
                    <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-transparent via-white/60 dark:via-amber-400/20 to-transparent pointer-events-none"></div>
                  </div>
                ) : (
                  <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-amber-100/70 dark:bg-white/[0.02] dark:backdrop-blur-max border border-amber-200/50 dark:border-amber-500/12">
                    <div className="relative">
                      <div className="absolute inset-0 bg-amber-300/20 dark:bg-amber-500/8 rounded-full p-1 blur-sm"></div>
                      <Feather className="relative w-3.5 h-3.5 text-amber-700 dark:text-amber-400 rotate-[15deg] animate-[float_3s_ease-in-out_infinite]" aria-hidden="true" />
                    </div>
                    <span className="text-xs font-bold uppercase tracking-[0.25em] text-amber-950 dark:text-amber-300">
                      Daily Inspiration
                    </span>
                  </div>
                )}
              </div>

              {/* 2. 经文正文区域 - min-h-[180px] 固定高度 */}
              <div className="min-h-[180px] flex items-center justify-center mb-10 px-6 py-4">
                {loading ? (
                  <div className="w-full space-y-5 max-w-2xl mx-auto">
                    <div className="h-9 w-full bg-stone-100/60 dark:bg-white/5 rounded-lg overflow-hidden relative">
                      <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-transparent via-white/60 dark:via-amber-400/25 to-transparent pointer-events-none"></div>
                    </div>
                    <div className="h-9 w-5/6 mx-auto bg-stone-100/60 dark:bg-white/5 rounded-lg overflow-hidden relative">
                      <div className="absolute inset-0 animate-shimmer animation-delay-300 bg-gradient-to-r from-transparent via-white/60 dark:via-amber-400/25 to-transparent pointer-events-none"></div>
                    </div>
                    <div className="h-9 w-4/6 mx-auto bg-stone-100/60 dark:bg-white/5 rounded-lg overflow-hidden relative">
                      <div className="absolute inset-0 animate-shimmer animation-delay-600 bg-gradient-to-r from-transparent via-white/60 dark:via-amber-400/25 to-transparent pointer-events-none"></div>
                    </div>
                  </div>
                ) : dailyQuote ? (
                  <blockquote
                    className="text-2xl md:text-3xl lg:text-4xl font-serif font-light italic text-stone-800 dark:text-zinc-200 leading-relaxed max-w-2xl mx-auto"
                    style={{
                      textShadow: '0 1px 3px rgba(0, 0, 0, 0.08)',
                      letterSpacing: '0.15px'
                    }}
                  >
                    "{dailyQuote.content}"
                  </blockquote>
                ) : (
                  <div className="w-full space-y-5 max-w-2xl mx-auto">
                    <div className="h-9 w-full bg-stone-100/60 dark:bg-white/5 rounded-lg overflow-hidden relative">
                      <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-transparent via-white/60 dark:via-amber-400/25 to-transparent pointer-events-none"></div>
                    </div>
                    <div className="h-9 w-5/6 mx-auto bg-stone-100/60 dark:bg-white/5 rounded-lg overflow-hidden relative">
                      <div className="absolute inset-0 animate-shimmer animation-delay-300 bg-gradient-to-r from-transparent via-white/60 dark:via-amber-400/25 to-transparent pointer-events-none"></div>
                    </div>
                    <div className="h-9 w-4/6 mx-auto bg-stone-100/60 dark:bg-white/5 rounded-lg overflow-hidden relative">
                      <div className="absolute inset-0 animate-shimmer animation-delay-600 bg-gradient-to-r from-transparent via-white/60 dark:via-amber-400/25 to-transparent pointer-events-none"></div>
                    </div>
                  </div>
                )}
              </div>

              {/* 3. 出处区域 - min-h-[40px] 固定高度 */}
              <div className="min-h-[40px] flex items-center justify-center mb-12">
                {loading ? (
                  <div className="h-8 w-36 bg-amber-100/30 dark:bg-amber-500/10 rounded-full overflow-hidden relative">
                    <div className="absolute inset-0 animate-shimmer animation-delay-200 bg-gradient-to-r from-transparent via-white/60 dark:via-amber-400/25 to-transparent pointer-events-none"></div>
                  </div>
                ) : dailyQuote ? (
                  <cite className="text-xl md:text-2xl font-serif text-amber-800 dark:text-amber-400 font-medium italic px-6 py-2" style={{ letterSpacing: '0.4px' }}>
                    — {dailyQuote.reference}
                  </cite>
                ) : (
                  <div className="h-8 w-36 bg-amber-100/30 dark:bg-amber-500/10 rounded-full overflow-hidden relative">
                    <div className="absolute inset-0 animate-shimmer animation-delay-200 bg-gradient-to-r from-transparent via-white/60 dark:via-amber-400/25 to-transparent pointer-events-none"></div>
                  </div>
                )}
              </div>

              {/* 4. 按钮区域 - min-h-[60px] 固定高度 */}
              <div className="min-h-[60px] flex items-center justify-center">
                {loading ? (
                  <div className="flex flex-col md:flex-row gap-4 justify-center items-center w-full md:w-auto">
                    <div className="relative min-h-[52px] px-8 md:px-10 py-4 rounded-xl bg-stone-200/40 dark:bg-amber-500/10 overflow-hidden w-full md:w-auto md:min-w-[200px]">
                      <div className="flex items-center justify-center gap-2.5 relative z-10">
                        <div className="w-5 h-5 bg-stone-300/50 rounded"></div>
                        <div className="h-4 w-32 bg-stone-300/50 rounded"></div>
                      </div>
                      <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-transparent via-white/50 dark:via-amber-400/20 to-transparent pointer-events-none"></div>
                    </div>
                    <div className="relative min-h-[52px] px-8 md:px-10 py-4 rounded-xl bg-stone-100/40 dark:bg-white/5 border border-stone-200/50 overflow-hidden w-full md:w-auto md:min-w-[200px]">
                      <div className="flex items-center justify-center gap-2.5 relative z-10">
                        <div className="w-5 h-5 bg-stone-200/50 rounded"></div>
                        <div className="h-4 w-28 bg-stone-200/50 rounded"></div>
                      </div>
                      <div className="absolute inset-0 animate-shimmer animation-delay-400 bg-gradient-to-r from-transparent via-white/50 dark:via-amber-400/20 to-transparent pointer-events-none"></div>
                    </div>
                  </div>
                ) : dailyQuote ? (
                  <div className="flex flex-col md:flex-row gap-4 justify-center items-center w-full md:w-auto">
                    <button
                      onClick={() => openImageGenerator(dailyQuote)}
                      aria-label="Create divine image from daily quote"
                      className="group/btn relative min-h-[52px] px-8 md:px-10 py-4 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 dark:from-amber-500 dark:to-amber-600 dark:hover:from-amber-400 dark:hover:to-amber-500 text-white font-serif font-bold rounded-xl shadow-lg shadow-amber-600/20 dark:shadow-amber-500/25 transition-all duration-300 active:scale-95 flex items-center justify-center gap-2.5 overflow-hidden w-full md:w-auto md:min-w-[200px] whitespace-nowrap"
                    >
                      <span className="relative z-10 flex items-center gap-2.5">
                        <Palette className="w-5 h-5 flex-shrink-0" aria-hidden="true" />
                        <span className="whitespace-nowrap">Create Divine Image</span>
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-700 ease-in-out"></div>
                    </button>
                    <button
                      onClick={() => document.getElementById("quote-finder")?.scrollIntoView({ behavior: "smooth" })}
                      aria-label="Explore more Bible verses"
                      className="min-h-[52px] px-8 md:px-10 py-4 bg-transparent dark:bg-white/[0.02] border-2 border-amber-300 dark:border-amber-500/30 text-amber-700 dark:text-amber-400 font-serif font-semibold rounded-xl hover:bg-amber-50/80 dark:hover:bg-amber-500/10 transition-all duration-300 flex items-center justify-center gap-2.5 shadow-sm hover:shadow-md w-full md:w-auto md:min-w-[200px] whitespace-nowrap"
                    >
                      <BookOpen className="w-5 h-5 flex-shrink-0" aria-hidden="true" />
                      <span className="whitespace-nowrap">Explore Verses</span>
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col md:flex-row gap-4 justify-center items-center w-full md:w-auto">
                    <div className="relative min-h-[52px] px-8 md:px-10 py-4 rounded-xl bg-stone-200/40 dark:bg-amber-500/10 overflow-hidden w-full md:w-auto md:min-w-[200px]">
                      <div className="flex items-center justify-center gap-2.5 relative z-10">
                        <div className="w-5 h-5 bg-stone-300/50 rounded"></div>
                        <div className="h-4 w-32 bg-stone-300/50 rounded"></div>
                      </div>
                      <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-transparent via-white/50 dark:via-amber-400/20 to-transparent pointer-events-none"></div>
                    </div>
                    <div className="relative min-h-[52px] px-8 md:px-10 py-4 rounded-xl bg-stone-100/40 dark:bg-white/5 border border-stone-200/50 overflow-hidden w-full md:w-auto md:min-w-[200px]">
                      <div className="flex items-center justify-center gap-2.5 relative z-10">
                        <div className="w-5 h-5 bg-stone-200/50 rounded"></div>
                        <div className="h-4 w-28 bg-stone-200/50 rounded"></div>
                      </div>
                      <div className="absolute inset-0 animate-shimmer animation-delay-400 bg-gradient-to-r from-transparent via-white/50 dark:via-amber-400/20 to-transparent pointer-events-none"></div>
                    </div>
                  </div>
                )}
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* 搜索区域 - Clean background */}
      <section className="py-12 px-6 border-y border-stone-100 dark:border-white/5 relative overflow-hidden bg-white dark:bg-background">
        <div className="relative max-w-6xl mx-auto">
          <QuoteFinder />
        </div>
      </section>

      {/* 展示区域 - Clean background */}
      <section className="py-10 px-6 relative overflow-hidden bg-stone-50/30 dark:bg-background">
        <div className="relative max-w-6xl mx-auto">
          <ExampleShowcase />
        </div>
      </section>

      {/* 功能区域 - Clean background */}
      <section className="py-10 px-6 border-t border-stone-100 dark:border-white/5 relative overflow-hidden bg-white dark:bg-background">
        <div className="relative max-w-6xl mx-auto">
          <FeaturesSection />
        </div>
      </section>
    </>
  )
}

export default function HomePage() {
  return (
    <PageLayout showBreadcrumb={false}>
      <HomeContent />
    </PageLayout>
  )
}
