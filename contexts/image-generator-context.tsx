"use client"

import { createContext, useContext, useState, ReactNode } from "react"

interface Quote {
  reference: string
  content: string
}

interface ImageGeneratorContextType {
  openImageGenerator: (quote: Quote) => void
  closeImageGenerator: () => void
  isImageGeneratorOpen: boolean
  selectedQuote: Quote | null
}

const ImageGeneratorContext = createContext<ImageGeneratorContextType | undefined>(undefined)

export function ImageGeneratorProvider({ children }: { children: ReactNode }) {
  const [selectedQuote, setSelectedQuote] = useState<Quote | null>(null)
  const [isImageGeneratorOpen, setIsImageGeneratorOpen] = useState(false)

  const openImageGenerator = (quote: Quote) => {
    setSelectedQuote(quote)
    setIsImageGeneratorOpen(true)
  }

  const closeImageGenerator = () => {
    setIsImageGeneratorOpen(false)
    setSelectedQuote(null)
  }

  return (
    <ImageGeneratorContext.Provider
      value={{
        openImageGenerator,
        closeImageGenerator,
        isImageGeneratorOpen,
        selectedQuote,
      }}
    >
      {children}
    </ImageGeneratorContext.Provider>
  )
}

export function useImageGenerator() {
  const context = useContext(ImageGeneratorContext)
  if (context === undefined) {
    throw new Error("useImageGenerator must be used within an ImageGeneratorProvider")
  }
  return context
}
