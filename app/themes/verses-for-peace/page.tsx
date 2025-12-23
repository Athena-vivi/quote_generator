"use client"

import { useState } from "react"
import Link from "next/link"
import { Palette, Copy, Check, Heart, ArrowLeft, Feather } from "lucide-react"
import { PageLayout } from "@/components/page-layout"
import { ImageGenerator } from "@/components/image-generator"

interface Quote {
  reference: string
  content: string
}

const peaceVerses: Quote[] = [
  {
    reference: "John 14:27",
    content: "Peace I leave with you; my peace I give you. I do not give to you as the world gives. Do not let your hearts be troubled and do not be afraid."
  },
  {
    reference: "Philippians 4:7",
    content: "And the peace of God, which transcends all understanding, will guard your hearts and your minds in Christ Jesus."
  },
  {
    reference: "Isaiah 26:3",
    content: "You will keep in perfect peace those whose minds are steadfast, because they trust in you."
  },
  {
    reference: "Psalm 29:11",
    content: "The Lord gives strength to his people; the Lord blesses his people with peace."
  },
  {
    reference: "Colossians 3:15",
    content: "Let the peace of Christ rule in your hearts, since as members of one body you were called to peace. And be thankful."
  },
  {
    reference: "2 Thessalonians 3:16",
    content: "Now may the Lord of peace himself give you peace at all times and in every way. The Lord be with all of you."
  },
  {
    reference: "Psalm 119:165",
    content: "Great peace have those who love your law, and nothing can make them stumble."
  },
  {
    reference: "Romans 15:13",
    content: "May the God of hope fill you with all joy and peace as you trust in him, so that you may overflow with hope by the power of the Holy Spirit."
  }
]

export const metadata = {
  title: "Bible Verses for Peace - Find Comfort & Serenity in Scripture",
  description: "Discover Bible verses about peace to calm your mind and heart. Find comfort, serenity, and hope in God's word during difficult times.",
  keywords: ["bible verses for peace", "scriptures about peace", "peace bible quotes", "finding peace in God", "calming bible verses"]
}

export default function VersesForPeacePage() {
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
    <PageLayout showBreadcrumb={true}>
      <div className="min-h-screen bg-background">
        {/* Hero Header */}
        <section className="relative pt-32 pb-16 px-6 bg-gradient-to-b from-amber-50/50 to-background dark:from-amber-950/20 dark:to-background">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-gradient-radial from-amber-500/5 via-amber-600/2 to-transparent opacity-0 dark:opacity-100 pointer-events-none"></div>

          <div className="relative z-10 max-w-4xl mx-auto">
            {/* Back Button */}
            <Link
              href="/themes"
              className="inline-flex items-center gap-2 text-amber-700 dark:text-amber-400 hover:text-amber-800 dark:hover:text-amber-300 font-medium mb-8 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Themes</span>
            </Link>

            {/* Topic Icon */}
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-amber-100 to-yellow-100 dark:from-amber-500/20 dark:to-amber-600/20 rounded-2xl border border-amber-200/50 dark:border-amber-500/30 mb-6 shadow-lg">
              <Feather className="w-8 h-8 text-amber-600 dark:text-amber-400" />
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-gray-900 dark:text-stone-100 mb-6 leading-tight">
              Bible Verses for <span className="text-amber-600 dark:text-amber-400">Peace</span>
            </h1>

            {/* Description */}
            <p className="text-xl text-gray-600 dark:text-stone-400 leading-relaxed max-w-3xl font-light">
              Find comfort and serenity in God's word. These scriptures about peace will calm your mind and heart,
              bringing hope and tranquility even in the midst of life's storms.
            </p>

            {/* Quick Stats */}
            <div className="flex flex-wrap gap-6 mt-8 pt-8 border-t border-amber-200/50 dark:border-amber-500/20">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                <span className="text-sm text-gray-600 dark:text-stone-400">{peaceVerses.length} Verses</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                <span className="text-sm text-gray-600 dark:text-stone-400">Old & New Testament</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                <span className="text-sm text-gray-600 dark:text-stone-400">Image Generation Ready</span>
              </div>
            </div>
          </div>
        </section>

        {/* Verses List */}
        <section className="py-16 px-6">
          <div className="max-w-4xl mx-auto">
            <div className="space-y-6">
              {peaceVerses.map((quote, index) => (
                <div
                  key={index}
                  className="group relative bg-white/80 dark:bg-zinc-900/50 dark:backdrop-blur-2xl backdrop-blur-md border border-amber-100 dark:border-amber-500/20 shadow-[0_20px_50px_rgba(212,175,55,0.1)] dark:shadow-[0_0_60px_rgba(212,175,55,0.12)] rounded-[2rem] p-6 md:p-8 transition-all hover:shadow-amber-200/20 dark:hover:shadow-[0_0_80px_rgba(212,175,55,0.18)]"
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
                    <cite className="block text-base font-semibold text-amber-600 dark:text-amber-400 text-right mb-6 pr-2">
                      — {quote.reference}
                    </cite>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-3">
                      {/* Quick Copy */}
                      <button
                        onClick={() => copyToClipboard(quote, index)}
                        className="group/copy flex-1 px-5 py-3 bg-white dark:bg-zinc-800 border-2 border-amber-300 dark:border-amber-600/50 hover:border-amber-500 dark:hover:border-amber-500 text-amber-800 dark:text-amber-400 font-serif font-semibold rounded-xl shadow-sm hover:shadow-md transition-all active:scale-95 flex items-center justify-center gap-2 text-sm"
                      >
                        {copiedIndex === index ? (
                          <>
                            <Check className="w-4 h-4 text-green-600" />
                            <span>Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-4 h-4" />
                            <span>Quick Copy</span>
                          </>
                        )}
                      </button>

                      {/* Create Image */}
                      <button
                        onClick={() => setSelectedQuoteForImage(quote)}
                        className="group/btn flex-1 px-5 py-3 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 dark:from-amber-500 dark:to-amber-600 dark:hover:from-amber-600 dark:hover:to-amber-700 text-white font-serif font-bold rounded-xl shadow-lg shadow-amber-600/20 dark:shadow-amber-500/20 transition-all active:scale-95 flex items-center justify-center gap-2 text-sm"
                      >
                        <Palette className="w-4 h-4" />
                        <span>Create Image</span>
                      </button>

                      {/* Favorite */}
                      <button
                        onClick={() => toggleFavorite(quote, index)}
                        className="group/fav p-3 rounded-xl bg-stone-100/50 dark:bg-zinc-800/50 text-stone-400 dark:text-stone-500 hover:text-red-500 dark:hover:text-red-400 transition-all duration-300"
                        title="Add to favorites"
                      >
                        {favoriteStates[index] ? (
                          <Heart className="w-4 h-4 fill-current text-red-500" />
                        ) : (
                          <Heart className="w-4 h-4 group-hover/fav:scale-110 transition-transform" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Image Generator Modal */}
        {selectedQuoteForImage && (
          <ImageGenerator quote={selectedQuoteForImage} onClose={() => setSelectedQuoteForImage(null)} />
        )}
      </div>
    </PageLayout>
  )
}
