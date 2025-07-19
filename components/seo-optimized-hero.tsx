"use client"
import { Button } from "@/components/ui/button"
import { ArrowDown, Sparkles, Heart, Share2 } from "lucide-react"

export function SEOOptimizedHero() {
  const scrollToExample = () => {
    document.getElementById("example-showcase")?.scrollIntoView({ behavior: "smooth" })
  }

  const openFavorites = () => {
    const event = new CustomEvent("openFavorites")
    window.dispatchEvent(event)
  }

  return (
    <section className="relative min-h-screen flex flex-col px-4 py-8">
      {/* Logo and Favorites button in top - 移除这部分，因为现在有统一导航栏 */}

      {/* Main content centered */}
      <div className="flex-1 flex items-center justify-center pt-16">
        {/* Background decoration with spiritual colors */}
        <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-amber-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
          <div className="absolute top-40 left-40 w-80 h-80 bg-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
        </div>

        <div className="relative z-10 text-center max-w-4xl mx-auto">
          {/* 已根据需求删除主标题、副标题和Find Your Perfect Quote按钮 */}
        </div>
      </div>
    </section>
  )
}
