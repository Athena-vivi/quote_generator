"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Heart, Palette, BookOpen, ArrowRight } from "lucide-react"
import { PageLayout } from "@/components/page-layout"
import { VerseCard } from "@/components/verse-card"

interface StoredQuote {
  reference: string
  content: string
}

const FAVORITES_KEY = "favoriteQuotes"

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<StoredQuote[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    try {
      const stored = localStorage.getItem(FAVORITES_KEY)
      if (stored) {
        const ids = JSON.parse(stored) as string[]
        // Parse the stored IDs to get reference and content
        const quotes: StoredQuote[] = ids
          .map((id) => {
            const [reference, ...contentParts] = id.split("|")
            return {
              reference,
              content: contentParts.join("|") || ""
            }
          })
          .filter((quote) => quote.content.length > 0)
        setFavorites(quotes)
      }
    } catch (error) {
      console.error("Failed to load favorites:", error)
    } finally {
      setIsLoaded(true)
    }
  }, [])

  const isEmpty = favorites.length === 0

  return (
    <PageLayout showBreadcrumb={true}>
      <div className="min-h-screen bg-[#fdfbf7] dark:bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">

          {/* Header */}
          <div className="text-center mb-12 md:mb-16">
            <div className="inline-flex items-center justify-center w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br from-rose-200 to-pink-200 dark:from-rose-900/30 dark:to-pink-900/30 rounded-2xl md:rounded-3xl mb-6 shadow-lg border border-rose-200/50 dark:border-rose-500/20">
              <Heart className="w-10 h-10 md:w-12 md:h-12 text-rose-600 dark:text-rose-400 fill-current" />
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-6xl font-serif font-bold text-rose-900 dark:text-rose-300 mb-4">
              My Sacred Collection
            </h1>
            <p className="text-base md:text-lg text-stone-600 dark:text-stone-400 max-w-2xl mx-auto leading-relaxed">
              {isLoaded && (
                <>
                  {isEmpty
                    ? "Your collection of divine wisdom starts here..."
                    : `${favorites.length} ${favorites.length === 1 ? 'verse' : 'verses'} saved to your collection`
                  }
                </>
              )}
            </p>
          </div>

          {/* Empty State */}
          {isLoaded && isEmpty && (
            <div className="text-center py-20">
              <div className="max-w-2xl mx-auto">
                {/* Empty Illustration */}
                <div className="relative inline-block mb-8">
                  <div className="w-32 h-32 mx-auto bg-gradient-to-br from-rose-100 to-pink-100 dark:from-rose-900/20 dark:to-pink-900/20 rounded-full flex items-center justify-center shadow-lg">
                    <Heart className="w-16 h-16 text-rose-300 dark:text-rose-700" />
                  </div>
                  <div className="absolute inset-0 bg-gradient-radial from-rose-400/10 to-transparent rounded-full animate-pulse"></div>
                </div>

                <h2 className="text-2xl md:text-3xl font-serif font-semibold text-stone-700 dark:text-stone-300 mb-4">
                  Begin Your Sacred Journey
                </h2>
                <p className="text-stone-600 dark:text-stone-400 mb-8 leading-relaxed">
                  Explore our curated themes and discover verses that speak to your heart. Save your favorites to build your personal collection of divine wisdom.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    href="/themes"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-serif font-semibold rounded-xl shadow-md hover:shadow-lg transition-all"
                  >
                    <BookOpen className="w-5 h-5" />
                    <span>Explore Themes</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link
                    href="/#quote-finder"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-white dark:bg-stone-800 border border-amber-200 dark:border-amber-500/20 text-amber-800 dark:text-amber-400 font-serif font-semibold rounded-xl hover:bg-amber-50 dark:hover:bg-stone-700 transition-all"
                  >
                    <Palette className="w-5 h-5" />
                    <span>Find Verses</span>
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* Favorites Grid */}
          {isLoaded && !isEmpty && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {favorites.map((quote, index) => (
                <div key={`${quote.reference}-${index}`} className="relative">
                  <VerseCard
                    reference={quote.reference}
                    content={quote.content}
                  />
                </div>
              ))}
            </div>
          )}

        </div>
      </div>
    </PageLayout>
  )
}
