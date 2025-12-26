"use client"

import { useState } from "react"
import { Heart, Palette } from "lucide-react"
import { useImageGenerator } from "@/contexts/image-generator-context"
import { useFavorites } from "@/hooks/use-favorites"

interface VerseCardProps {
  reference: string
  content: string
}

export function VerseCard({ reference, content }: VerseCardProps) {
  const [showToast, setShowToast] = useState(false)
  const { isFavorited, toggleFavorite: toggleQuoteFavorite } = useFavorites()
  const { openImageGenerator } = useImageGenerator()

  const quote = { reference, content, id: `${reference}|${content}` }
  const favorited = isFavorited(quote)

  const handleToggleFavorite = () => {
    toggleQuoteFavorite(quote)
    // Show toast on add (not on remove)
    if (!favorited) {
      setShowToast(true)
      setTimeout(() => setShowToast(false), 2500)
    }
  }

  const handleCreateImage = () => {
    openImageGenerator({ reference, content })
  }

  return (
    <>
      {/* Toast Notification */}
      {showToast && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 animate-slide-down">
          <div className="px-6 py-3 bg-gradient-to-r from-amber-500/95 to-amber-600/95 backdrop-blur-sm rounded-full shadow-lg shadow-amber-500/20 flex items-center gap-2">
            <Heart className="w-4 h-4 text-white fill-current" />
            <span className="text-white text-sm font-serif font-medium">Saved to your collection.</span>
          </div>
        </div>
      )}

      {/* Card */}
      <div className="bg-white dark:bg-stone-900/60 rounded-2xl p-6 border border-amber-100 dark:border-amber-500/20 shadow-sm hover:shadow-lg hover:shadow-amber-500/10 dark:hover:shadow-amber-500/5 transition-all duration-300 relative">

        {/* Favorite Button - Top Right Absolute Position */}
        <button
          onClick={handleToggleFavorite}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-amber-100/50 dark:hover:bg-amber-500/15 transition-all duration-200 group"
          aria-label={favorited ? "Remove from favorites" : "Add to favorites"}
        >
          <Heart
            className={`w-5 h-5 transition-all duration-200 ${
              favorited
                ? "text-amber-600 dark:text-amber-400 fill-current scale-110"
                : "text-amber-600/50 dark:text-amber-400/50 hover:text-amber-600 dark:hover:text-amber-400"
            }`}
          />
        </button>

        <blockquote className="text-base md:text-lg font-serif font-light italic text-stone-800 dark:text-zinc-200 leading-relaxed mb-4 pr-12">
          &ldquo;{content}&rdquo;
        </blockquote>

        <div className="flex items-center justify-between">
          <cite className="text-sm md:text-base font-serif text-amber-800 dark:text-amber-400 italic not-underline">
            &mdash; {reference}
          </cite>

          <button
            onClick={handleCreateImage}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white text-sm font-serif font-semibold rounded-lg shadow-md hover:shadow-lg transition-all"
          >
            <Palette className="w-4 h-4" />
            <span className="hidden sm:inline">Create Divine Image</span>
            <span className="sm:hidden">Create</span>
          </button>
        </div>
      </div>
    </>
  )
}
