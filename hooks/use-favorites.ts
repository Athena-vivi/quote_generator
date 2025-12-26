"use client"

import { useState, useEffect } from "react"

export interface FavoriteQuote {
  reference: string
  content: string
  id: string // unique identifier: "reference|content"
}

const FAVORITES_KEY = "favoriteQuotes"

export function useFavorites() {
  const [favorites, setFavorites] = useState<Set<string>>(new Set())
  const [isLoaded, setIsLoaded] = useState(false)

  // Load favorites from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(FAVORITES_KEY)
      if (stored) {
        const favoritesArray = JSON.parse(stored)
        setFavorites(new Set(favoritesArray))
      }
    } catch (error) {
      console.error("Failed to load favorites:", error)
    } finally {
      setIsLoaded(true)
    }
  }, [])

  // Save favorites to localStorage whenever they change
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem(FAVORITES_KEY, JSON.stringify(Array.from(favorites)))
      } catch (error) {
        console.error("Failed to save favorites:", error)
      }
    }
  }, [favorites, isLoaded])

  const toggleFavorite = (quote: FavoriteQuote) => {
    const id = quote.id || `${quote.reference}|${quote.content}`
    setFavorites((prev) => {
      const newFavorites = new Set(prev)
      if (newFavorites.has(id)) {
        newFavorites.delete(id)
      } else {
        newFavorites.add(id)
      }
      return newFavorites
    })
    return id
  }

  const isFavorited = (quote: FavoriteQuote) => {
    const id = quote.id || `${quote.reference}|${quote.content}`
    return favorites.has(id)
  }

  const removeFavorite = (id: string) => {
    setFavorites((prev) => {
      const newFavorites = new Set(prev)
      newFavorites.delete(id)
      return newFavorites
    })
  }

  const clearFavorites = () => {
    setFavorites(new Set())
  }

  return {
    favorites,
    favoritesCount: favorites.size,
    toggleFavorite,
    isFavorited,
    removeFavorite,
    clearFavorites,
    isLoaded,
  }
}
