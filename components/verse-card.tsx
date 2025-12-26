"use client"

import { useState, useEffect } from "react"
import { Heart, Palette } from "lucide-react"
import { useImageGenerator } from "@/contexts/image-generator-context"

interface VerseCardProps {
  reference: string
  content: string
}

export function VerseCard({ reference, content }: VerseCardProps) {
  const [isFavorited, setIsFavorited] = useState(false)
  const { openImageGenerator } = useImageGenerator()

  // Check if this verse is favorited on mount
  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favoriteQuotes") || "[]")
    const quoteKey = `${reference}|${content}`
    setIsFavorited(favorites.includes(quoteKey))
  }, [reference, content])

  const toggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem("favoriteQuotes") || "[]")
    const quoteKey = `${reference}|${content}`
    if (isFavorited) {
      const updatedFavorites = favorites.filter((fav: string) => fav !== quoteKey)
      localStorage.setItem("favoriteQuotes", JSON.stringify(updatedFavorites))
      setIsFavorited(false)
    } else {
      favorites.push(quoteKey)
      localStorage.setItem("favoriteQuotes", JSON.stringify(favorites))
      setIsFavorited(true)
    }
  }

  const handleCreateImage = () => {
    openImageGenerator({ reference, content })
  }

  return (
    <div className="bg-white dark:bg-stone-900/60 rounded-2xl p-6 border border-amber-100 dark:border-amber-500/20 shadow-sm hover:shadow-lg hover:shadow-amber-500/10 dark:hover:shadow-amber-500/5 transition-all duration-300">
      <blockquote className="text-base md:text-lg font-serif font-light italic text-stone-800 dark:text-zinc-200 leading-relaxed mb-4">
        "{content}"
      </blockquote>
      <div className="flex items-center justify-between">
        <cite className="text-sm md:text-base font-serif text-amber-800 dark:text-amber-400 italic not-underline">
          — {reference}
        </cite>
        <div className="flex items-center gap-2">
          <button
            onClick={toggleFavorite}
            className="p-2 rounded-full hover:bg-amber-100/40 dark:hover:bg-amber-500/10 transition-colors"
            aria-label={isFavorited ? "Remove from favorites" : "Add to favorites"}
          >
            <Heart className={`w-5 h-5 ${isFavorited ? "text-red-500 fill-current" : "text-amber-600 dark:text-amber-400"}`} />
          </button>
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
    </div>
  )
}
