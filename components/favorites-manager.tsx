"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Heart, Trash2, Palette } from "lucide-react"
import { ImageGenerator } from "./image-generator"

interface Quote {
  reference: string
  content: string
}

export function FavoritesManager() {
  const [favorites, setFavorites] = useState<Quote[]>([])
  const [selectedQuote, setSelectedQuote] = useState<Quote | null>(null)

  useEffect(() => {
    loadFavorites()
  }, [])

  const loadFavorites = () => {
    const savedFavorites = JSON.parse(localStorage.getItem("favoriteQuotes") || "[]")
    const parsedFavorites = savedFavorites.map((fav: string) => {
      const [reference, content] = fav.split("|")
      return { reference, content }
    })
    setFavorites(parsedFavorites)
  }

  const removeFavorite = (quoteToRemove: Quote) => {
    const quoteKey = `${quoteToRemove.reference}|${quoteToRemove.content}`
    const savedFavorites = JSON.parse(localStorage.getItem("favoriteQuotes") || "[]")
    const updatedFavorites = savedFavorites.filter((fav: string) => fav !== quoteKey)
    localStorage.setItem("favoriteQuotes", JSON.stringify(updatedFavorites))
    loadFavorites()
  }

  const clearAllFavorites = () => {
    if (confirm("Are you sure you want to remove all favorite quotes?")) {
      localStorage.removeItem("favoriteQuotes")
      setFavorites([])
    }
  }

  if (favorites.length === 0) {
    return (
      <Card className="bg-white/90 dark:bg-white/[0.02] dark:backdrop-blur-max backdrop-blur-xl border border-amber-200/30 dark:border-amber-500/10 shadow-lg dark:shadow-[0_0_30px_rgba(212,175,55,0.08)]">
        <CardContent className="flex flex-col items-center justify-center py-12 text-center">
          <Heart className="w-12 h-12 text-amber-400/50 dark:text-amber-500/40 mb-4" />
          <h3 className="text-xl font-serif font-semibold text-gray-800 dark:text-zinc-300 mb-2">No Favorite Quotes Yet</h3>
          <p className="text-gray-600 dark:text-zinc-500">
            Start adding quotes to your favorites by clicking the heart icon when viewing quotes.
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <>
      <Card className="bg-white/90 dark:bg-white/[0.02] dark:backdrop-blur-max backdrop-blur-xl border border-amber-200/30 dark:border-amber-500/10 shadow-lg dark:shadow-[0_0_30px_rgba(212,175,55,0.08)]">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center gap-2 text-amber-900 dark:text-amber-300">
              <Heart className="w-5 h-5 text-red-500" />
              My Favorite Quotes ({favorites.length})
            </CardTitle>
            <Button variant="outline" size="sm" onClick={clearAllFavorites} className="border-amber-300/50 dark:border-amber-500/12 text-amber-800 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-white/[0.03]">
              <Trash2 className="w-4 h-4 mr-2" />
              Clear All
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {favorites.map((quote, index) => (
              <Card key={index} className="bg-white/80 dark:bg-white/[0.02] dark:backdrop-blur-max backdrop-blur-sm border border-amber-100 dark:border-amber-500/10 shadow-md dark:shadow-[0_0_20px_rgba(212,175,55,0.06)] hover:shadow-lg dark:hover:shadow-[0_0_30px_rgba(212,175,55,0.1)] transition-all duration-300">
                <CardContent className="p-5">
                  <blockquote className="text-xl font-serif font-light italic text-stone-800 dark:text-stone-200 leading-relaxed mb-3">{quote.content}</blockquote>
                  <cite className="block text-base font-serif text-amber-800 dark:text-amber-400 italic mb-4" style={{ letterSpacing: '0.3px' }}>
                    — {quote.reference}
                  </cite>
                  <div className="flex gap-2">
                    <Button size="sm" onClick={() => setSelectedQuote(quote)} className="bg-gradient-to-r from-amber-600 to-amber-700 dark:from-amber-500 dark:to-amber-600 text-white hover:from-amber-700 hover:to-amber-800 dark:hover:from-amber-400 dark:hover:to-amber-500">
                      <Palette className="w-4 h-4 mr-2" />
                      Create Image
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => removeFavorite(quote)} className="border-amber-300/50 dark:border-amber-500/12 text-amber-800 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-white/[0.03]">
                      <Trash2 className="w-4 h-4 mr-2" />
                      Remove
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {selectedQuote && <ImageGenerator quote={selectedQuote} onClose={() => setSelectedQuote(null)} />}
    </>
  )
}
