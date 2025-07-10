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
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            Transform Bible Quotes into
            <span className="bg-gradient-to-r from-amber-600 to-blue-600 bg-clip-text text-transparent">
              {" "}
              Beautiful Art
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-3xl mx-auto leading-relaxed">
            Discover inspiring Bible quotes, match them to your mood, and create stunning shareable images with
            AI-powered backgrounds for social media
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button
              size="lg"
              className="bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white px-8 py-4 text-lg shadow-lg"
              onClick={scrollToExample}
              aria-label="Find your perfect Bible quote"
            >
              Find Your Perfect Quote
              <ArrowDown className="ml-2 w-5 h-5" aria-hidden="true" />
            </Button>
          </div>

          {/* Feature highlights with spiritual colors */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <article className="flex flex-col items-center p-6 bg-white/70 backdrop-blur-sm rounded-2xl border border-amber-200/30 shadow-lg">
              <Heart className="w-12 h-12 text-red-600 mb-4" aria-hidden="true" />
              <h2 className="text-xl font-semibold text-gray-800 mb-2">Mood Matching</h2>
              <p className="text-gray-600 text-center">
                Find Bible quotes that speak to your current emotions and spiritual needs
              </p>
            </article>
            <article className="flex flex-col items-center p-6 bg-white/70 backdrop-blur-sm rounded-2xl border border-blue-200/30 shadow-lg">
              <Sparkles className="w-12 h-12 text-amber-600 mb-4" aria-hidden="true" />
              <h2 className="text-xl font-semibold text-gray-800 mb-2">AI Art Generation</h2>
              <p className="text-gray-600 text-center">
                Create unique, beautiful backgrounds for your favorite Bible quotes using artificial intelligence
              </p>
            </article>
            <article className="flex flex-col items-center p-6 bg-white/70 backdrop-blur-sm rounded-2xl border border-green-200/30 shadow-lg">
              <Share2 className="w-12 h-12 text-blue-600 mb-4" aria-hidden="true" />
              <h2 className="text-xl font-semibold text-gray-800 mb-2">Easy Sharing</h2>
              <p className="text-gray-600 text-center">
                Download high-resolution images and share your faith-based creations on social media instantly
              </p>
            </article>
          </section>
        </div>
      </div>
    </section>
  )
}
