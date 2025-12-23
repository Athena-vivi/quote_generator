"use client"

import { Sparkles, Download, Share2, Feather } from "lucide-react"
import Image from "next/image"

export function ExampleShowcase() {
  return (
    <section id="example-showcase" className="relative py-12 px-6 sm:px-8 overflow-hidden bg-background" aria-labelledby="showcase-heading">
      {/* Sacred Background - Unified with Subtle Amber Glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-50/20 via-white/40 to-amber-50/30 dark:bg-[radial-gradient(circle_at_center,_rgba(212,175,55,0.03)_0%,_transparent_80%)]"></div>
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-amber-200/10 to-yellow-300/10 dark:from-amber-500/4 dark:to-amber-600/4 rounded-full blur-3xl" aria-hidden="true"></div>
      <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-gradient-to-tr from-amber-200/10 to-yellow-200/10 dark:from-amber-600/4 dark:to-amber-500/4 rounded-full blur-3xl" aria-hidden="true"></div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header - Serif Typography */}
        <div className="text-center mb-10">
          <h2 id="showcase-heading" className="text-3xl md:text-4xl font-serif font-bold text-amber-900/80 dark:text-amber-400 mb-4">
            Altar of Artistry
          </h2>
          <p className="text-xl md:text-2xl text-gray-600/90 dark:text-stone-400 font-light leading-relaxed max-w-4xl mx-auto">
            Experience the sacred transformation of Scripture into breathtaking visual masterpieces
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Gallery-Style Digital Art Frame with Matting Effect */}
          <div className="relative group">
            {/* Elegant Frame Container */}
            <div className="relative bg-amber-50/20 dark:bg-zinc-900/30 dark:backdrop-blur-md backdrop-blur-2xl rounded-3xl p-6 shadow-[0_20px_60px_-15px_rgba(212,175,55,0.3)] dark:shadow-[0_0_80px_rgba(212,175,55,0.15)] border border-amber-200/30 dark:border-white/10">
              {/* Artwork Matting Frame */}
              <div className="relative p-1 bg-white dark:bg-zinc-900/50 border border-amber-200/50 dark:border-white/10 shadow-xl rounded-2xl">
                {/* Artwork Display */}
                <div className="relative aspect-square rounded-xl overflow-hidden shadow-[0_20px_50px_rgba(212,175,55,0.1)]">
                  <Image
                    src="/images/example-background.webp"
                    alt="Example of AI-generated Bible verse art featuring Jeremiah 29:11 with a peaceful landscape background"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 450px"
                    priority
                    quality={75}
                  />
                  <div className="absolute inset-0" role="presentation">
                    {/* Divine Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/10" aria-hidden="true"></div>

                    {/* Quote Content */}
                    <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-12">
                      <blockquote className="text-white text-2xl md:text-3xl font-serif leading-relaxed max-w-[85%] font-light"
                        style={{
                          textShadow: "2px 2px 8px rgba(0,0,0,0.8), 0 0 16px rgba(0,0,0,0.6)",
                          letterSpacing: "0.3px",
                        }}
                      >
                        For I know the plans I have for you, declares the Lord,
                        plans for welfare and not for evil, to give you a future and a hope.
                      </blockquote>

                      <cite className="text-white/95 text-lg font-semibold mt-6"
                        style={{
                          textShadow: "2px 2px 6px rgba(0,0,0,0.8)",
                          letterSpacing: "0.8px",
                        }}
                      >
                        — Jeremiah 29:11
                      </cite>

                      {/* AI Enhanced Badge - Elegant Corner Placement */}
                      <div className="absolute top-4 right-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-3 py-1.5 flex items-center gap-2">
                        <Sparkles className="w-3 h-3 text-amber-300" aria-hidden="true" />
                        <span className="text-white text-xs font-medium">AI Enhanced</span>
                      </div>

                      {/* AI Divine Seal - Bottom Right */}
                      <div className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-amber-500/20 backdrop-blur-sm border border-amber-400/30 flex items-center justify-center shadow-lg">
                        <Feather className="w-4 h-4 text-amber-300 rotate-[-15deg]" aria-hidden="true" />
                      </div>
                    </div>
                  </div>

                  {/* Floating Toolbar - Hover Only */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 via-black/40 to-transparent backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="flex items-center justify-center gap-6 py-4">
                      <button aria-label="Export example image" className="flex items-center gap-2 px-4 py-2 min-h-[44px] bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-lg transition-all text-white text-sm">
                        <Download className="w-4 h-4" aria-hidden="true" />
                        Export
                      </button>
                      <button aria-label="Share example image" className="flex items-center gap-2 px-4 py-2 min-h-[44px] bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-lg transition-all text-white text-sm">
                        <Share2 className="w-4 h-4" aria-hidden="true" />
                        Share
                      </button>
                    </div>
                  </div>
                </div>

                {/* Subtle Reflection Effect */}
                <div className="absolute -bottom-8 left-4 right-4 h-8 bg-gradient-to-b from-amber-100/10 to-transparent rounded-b-2xl blur-sm" aria-hidden="true"></div>
              </div>
            </div>
          </div>

          {/* Process Steps - Compressed */}
          <div className="space-y-6">
            {/* Process Introduction */}
            <div className="mb-4">
              <p className="text-lg md:text-xl text-gray-700/80 dark:text-stone-400 font-serif italic font-light mb-6 text-amber-800/60 dark:text-amber-400/70">
                Three divine steps to transform Scripture into art
              </p>
            </div>

            <div className="space-y-3">
              {/* Step 1 - Flattened */}
              <div className="group relative bg-white/60 dark:bg-zinc-900/40 dark:backdrop-blur-md backdrop-blur-xl border border-white/40 dark:border-white/10 rounded-xl p-4 border-b border-amber-100/50 dark:border-amber-900/20 hover:bg-white/70 dark:hover:bg-zinc-800/50 transition-all duration-300">
                <div className="flex items-center gap-4">
                  <span className="text-4xl font-serif font-bold text-amber-600/80 dark:text-amber-400" aria-hidden="true">1</span>
                  <div className="flex-1">
                    <h3 className="text-lg font-serif font-semibold text-gray-800 dark:text-stone-200 mb-1">Select Sacred Words</h3>
                    <p className="text-sm text-gray-600/80 dark:text-stone-400 leading-snug">
                      Choose from daily divine inspiration, search specific scripture, or discover passages that resonate with your spiritual journey.
                    </p>
                  </div>
                </div>
              </div>

              {/* Step 2 - Flattened */}
              <div className="group relative bg-white/60 dark:bg-zinc-900/40 dark:backdrop-blur-md backdrop-blur-xl border border-white/40 dark:border-white/10 rounded-xl p-4 border-b border-amber-100/50 dark:border-amber-900/20 hover:bg-white/70 dark:hover:bg-zinc-800/50 transition-all duration-300">
                <div className="flex items-center gap-4">
                  <span className="text-4xl font-serif font-bold text-amber-600/80 dark:text-amber-400" aria-hidden="true">2</span>
                  <div className="flex-1">
                    <h3 className="text-lg font-serif font-semibold text-gray-800 dark:text-stone-200 mb-1">Describe Divine Vision</h3>
                    <p className="text-sm text-gray-600/80 dark:text-stone-400 leading-snug">
                      Guide our AI to create heavenly backgrounds - from majestic mountains to celestial skies, from peaceful gardens to radiant light.
                    </p>
                  </div>
                </div>
              </div>

              {/* Step 3 - Flattened */}
              <div className="group relative bg-white/60 dark:bg-zinc-900/40 dark:backdrop-blur-md backdrop-blur-xl border border-white/40 dark:border-white/10 rounded-xl p-4 border-b border-amber-100/50 dark:border-amber-900/20 hover:bg-white/70 dark:hover:bg-zinc-800/50 transition-all duration-300">
                <div className="flex items-center gap-4">
                  <span className="text-4xl font-serif font-bold text-amber-600/80 dark:text-amber-400" aria-hidden="true">3</span>
                  <div className="flex-1">
                    <h3 className="text-lg font-serif font-semibold text-gray-800 dark:text-stone-200 mb-1">Share Divine Message</h3>
                    <p className="text-sm text-gray-600/80 dark:text-stone-400 leading-snug">
                      Receive your masterpiece in stunning 4K resolution and share God's word with the world through social media or personal reflection.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// Add default export for Next.js dynamic imports
export default ExampleShowcase
