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
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-12 text-center">
          <Heart className="w-12 h-12 text-gray-400 mb-4" />
          <h3 className="text-xl font-semibold text-gray-700 mb-2">No Favorite Quotes Yet</h3>
          <p className="text-gray-500">
            Start adding quotes to your favorites by clicking the heart icon when viewing quotes.
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-red-500" />
              My Favorite Quotes ({favorites.length})
            </CardTitle>
            <Button variant="outline" size="sm" onClick={clearAllFavorites}>
              <Trash2 className="w-4 h-4 mr-2" />
              Clear All
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {favorites.map((quote, index) => (
              <Card key={index} className="border border-gray-200">
                <CardContent className="p-4">
                  <blockquote className="text-gray-800 mb-2 leading-relaxed">{quote.content}</blockquote>
                  <cite className="text-blue-600 font-semibold">— {quote.reference}</cite>
                  <div className="mt-3 flex gap-2">
                    <Button size="sm" onClick={() => setSelectedQuote(quote)}>
                      <Palette className="w-4 h-4 mr-2" />
                      Create Image
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => removeFavorite(quote)}>
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
