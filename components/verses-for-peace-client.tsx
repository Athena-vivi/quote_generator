"use client"

import { useState } from "react"
import { Palette, Copy, Check, Heart } from "lucide-react"
import { ImageGenerator } from "@/components/image-generator"

export interface Quote {
  reference: string
  content: string
}

interface VersesForPeaceClientProps {
  peaceVerses: Quote[]
}

export function VersesForPeaceClient({ peaceVerses }: VersesForPeaceClientProps) {
  const [selectedQuoteForImage, setSelectedQuoteForImage] = useState<Quote | null>(null)
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)
  const [favoriteStates, setFavoriteStates] = useState<Record<number, boolean>>({})

  const copyToClipboard = (quote: Quote, index: number) => {
    const text = `"${quote.content}" — ${quote.reference}`
    navigator.clipboard.writeText(text)
    setCopiedIndex(index)
    setTimeout(() => setCopiedIndex(null), 2000)
  }

  const toggleFavorite = (quote: Quote, index: number) => {
    setFavoriteStates(prev => ({
      ...prev,
      [index]: !prev[index]
    }))
  }

  return (
    <>
      <div className="min-h-screen bg-background">
        {/* Verses List */}
        <section className="py-16 px-6">
          <div className="max-w-4xl mx-auto">
            <div className="space-y-6">
              {peaceVerses.map((quote, index) => (
                <div
                  key={index}
                  className="group relative bg-white/95 dark:bg-zinc-900/50 dark:backdrop-blur-2xl backdrop-blur-md border border-amber-100 dark:border-amber-500/20 shadow-[0_20px_50px_rgba(212,175,55,0.1)] dark:shadow-[0_0_60px_rgba(212,175,55,0.12)] rounded-[2rem] p-6 md:p-8 transition-all hover:shadow-amber-200/20 dark:hover:shadow-[0_0_80px_rgba(212,175,55,0.18)]"
                >
                  <div className="relative">
                    {/* Verse Number Badge */}
                    <div className="absolute -top-4 -left-4 w-10 h-10 bg-gradient-to-br from-amber-500 to-amber-600 dark:from-amber-400 dark:to-amber-500 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg">
                      {index + 1}
                    </div>

                    {/* Quote Content */}
                    <blockquote className="text-xl md:text-2xl font-serif text-stone-800 dark:text-stone-200 leading-relaxed italic font-light mb-6 px-4 pt-2">
                      "{quote.content}"
                    </blockquote>

                    <div className="h-px bg-gradient-to-r from-transparent via-amber-200/30 dark:via-amber-500/20 to-transparent mb-4"></div>

                    {/* Reference */}
                    <cite className="block text-base font-semibold text-right mb-6 pr-2 text-amber-900 dark:text-amber-400">
                      — {quote.reference}
                    </cite>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-3">
                      {/* Quick Copy */}
                      <button
                        onClick={() => copyToClipboard(quote, index)}
                        aria-label={copiedIndex === index ? "Copied to clipboard" : "Copy quote to clipboard"}
                        className="group/copy flex-1 min-h-[44px] px-5 py-3 bg-white dark:bg-zinc-800 border-2 border-amber-300 dark:border-amber-600/50 hover:border-amber-500 dark:hover:border-amber-500 text-amber-800 dark:text-amber-400 font-serif font-semibold rounded-xl shadow-sm hover:shadow-md transition-all active:scale-95 flex items-center justify-center gap-2 text-sm"
                      >
                        {copiedIndex === index ? (
                          <>
                            <Check className="w-4 h-4 text-green-600" aria-hidden="true" />
                            <span>Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-4 h-4" aria-hidden="true" />
                            <span>Quick Copy</span>
                          </>
                        )}
                      </button>

                      {/* Create Image */}
                      <button
                        onClick={() => setSelectedQuoteForImage(quote)}
                        aria-label="Create image from this quote"
                        className="group/btn flex-1 min-h-[44px] px-5 py-3 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 dark:from-amber-500 dark:to-amber-600 dark:hover:from-amber-600 dark:hover:to-amber-700 text-white font-serif font-bold rounded-xl shadow-lg shadow-amber-600/20 dark:shadow-amber-500/20 transition-all active:scale-95 flex items-center justify-center gap-2 text-sm"
                      >
                        <Palette className="w-4 h-4" aria-hidden="true" />
                        <span>Create Image</span>
                      </button>

                      {/* Favorite */}
                      <button
                        onClick={() => toggleFavorite(quote, index)}
                        aria-label={favoriteStates[index] ? "Remove from favorites" : "Add to favorites"}
                        aria-pressed={favoriteStates[index] || false}
                        className="group/fav min-h-[44px] min-w-[44px] p-3 rounded-xl bg-stone-100/50 dark:bg-zinc-800/50 text-stone-400 dark:text-stone-500 hover:text-red-500 dark:hover:text-red-400 transition-all duration-300 flex items-center justify-center"
                      >
                        {favoriteStates[index] ? (
                          <Heart className="w-4 h-4 fill-current text-red-500" aria-hidden="true" />
                        ) : (
                          <Heart className="w-4 h-4 group-hover/fav:scale-110 transition-transform" aria-hidden="true" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* Image Generator Modal */}
      {selectedQuoteForImage && (
        <ImageGenerator quote={selectedQuoteForImage} onClose={() => setSelectedQuoteForImage(null)} />
      )}
    </>
  )
}
