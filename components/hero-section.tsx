"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowDown, Sparkles, Heart, Share2, X } from "lucide-react"
import { FavoritesManager } from "./favorites-manager"

export function HeroSection() {
  const [showFavorites, setShowFavorites] = useState(false)

  const scrollToQuoteFinder = () => {
    document.getElementById("quote-finder")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <>
      <section className="relative min-h-screen flex flex-col px-4 py-8">
        {/* Logo and Favorites button in top */}
        <div className="absolute top-8 left-8 right-8 z-20 flex justify-between items-center">
          <div className="flex items-center">
            <Sparkles className="w-16 h-16 text-amber-600 mr-4" />
            <span className="text-amber-700 font-bold text-4xl">QuoteGenerator</span>
          </div>

          <Button
            onClick={() => setShowFavorites(true)}
            variant="outline"
            className="bg-white/80 backdrop-blur-sm border-amber-300 text-amber-700 hover:bg-amber-50"
          >
            <Heart className="w-5 h-5 mr-2" />
            My Favorites
          </Button>
        </div>

        {/* Main content centered with more top spacing */}
        <div className="flex-1 flex items-center justify-center pt-32">
          {/* Background decoration with spiritual colors */}
          <div className="absolute inset-0 overflow-hidden">
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
              AI-powered backgrounds
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Button
                size="lg"
                className="bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white px-8 py-4 text-lg shadow-lg"
                onClick={scrollToQuoteFinder}
              >
                Find Your Perfect Quote
                <ArrowDown className="ml-2 w-5 h-5" />
              </Button>
            </div>

            {/* Feature highlights with spiritual colors */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
              <div className="flex flex-col items-center p-6 bg-white/70 backdrop-blur-sm rounded-2xl border border-amber-200/30 shadow-lg">
                <Heart className="w-12 h-12 text-red-600 mb-4" />
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Mood Matching</h3>
                <p className="text-gray-600 text-center">
                  Find quotes that speak to your current emotions and spiritual needs
                </p>
              </div>
              <div className="flex flex-col items-center p-6 bg-white/70 backdrop-blur-sm rounded-2xl border border-blue-200/30 shadow-lg">
                <Sparkles className="w-12 h-12 text-amber-600 mb-4" />
                <h3 className="text-xl font-semibold text-gray-800 mb-2">AI Art Generation</h3>
                <p className="text-gray-600 text-center">
                  Create unique, beautiful backgrounds for your favorite quotes
                </p>
              </div>
              <div className="flex flex-col items-center p-6 bg-white/70 backdrop-blur-sm rounded-2xl border border-green-200/30 shadow-lg">
                <Share2 className="w-12 h-12 text-blue-600 mb-4" />
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Easy Sharing</h3>
                <p className="text-gray-600 text-center">Download and share your creations on social media instantly</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Favorites Modal */}
      {showFavorites && (
        <div className="fixed inset-0 bg-black/60 dark:bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white/95 dark:bg-white/[0.02] dark:backdrop-blur-max backdrop-blur-xl rounded-3xl max-w-4xl w-full max-h-[80vh] overflow-y-auto border border-amber-200/30 dark:border-amber-500/10 shadow-2xl dark:shadow-[0_0_60px_rgba(212,175,55,0.12)]">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-zinc-200 flex items-center gap-2">
                  <Heart className="w-6 h-6 text-red-500" />
                  My Favorite Quotes
                </h2>
                <Button variant="ghost" onClick={() => setShowFavorites(false)} className="text-gray-700 dark:text-zinc-400 hover:bg-amber-50 dark:hover:bg-white/[0.03]">
                  <X className="w-5 h-5" />
                </Button>
              </div>
              <FavoritesManager />
            </div>
          </div>
        </div>
      )}
    </>
  )
}
