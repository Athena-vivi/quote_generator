"use client"

import { Sparkles, Download, Share2 } from "lucide-react"

export function ExampleShowcase() {
  return (
    <section id="example-showcase" className="relative py-12 px-6 sm:px-8 overflow-hidden">
      {/* Sacred Background - Amber Unified */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-50/20 via-white/40 to-amber-50/30"></div>
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-amber-200/10 to-yellow-300/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-gradient-to-tr from-amber-200/10 to-yellow-200/10 rounded-full blur-3xl"></div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header - Serif Typography */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-amber-700 mb-8">
            Divine Creation Studio
          </h2>
          <p className="text-xl md:text-2xl text-gray-600/90 font-light leading-relaxed max-w-4xl mx-auto">
            Experience the sacred transformation of Scripture into breathtaking visual masterpieces
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Gallery-Style Digital Art Frame */}
          <div className="relative group">
            {/* Elegant Frame Container */}
            <div className="relative bg-amber-50/20 backdrop-blur-2xl rounded-3xl p-6 shadow-[0_20px_60px_-15px_rgba(212,175,55,0.3)] border border-amber-200/30">
              {/* Artwork Display */}
              <div className="relative aspect-square rounded-2xl overflow-hidden ring-1 ring-amber-200/50 shadow-2xl">
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage: `url('/images/example-background.png')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                >
                  {/* Divine Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/10"></div>

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
                      <Sparkles className="w-3 h-3 text-amber-300" />
                      <span className="text-white text-xs font-medium">AI Enhanced</span>
                    </div>
                  </div>
                </div>

                {/* Floating Toolbar - Hover Only */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 via-black/40 to-transparent backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="flex items-center justify-center gap-6 py-4">
                    <button className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-lg transition-all text-white text-sm">
                      <Download className="w-4 h-4" />
                      Export
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-lg transition-all text-white text-sm">
                      <Share2 className="w-4 h-4" />
                      Share
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Process Steps */}
          <div className="space-y-12">
            <div className="text-center mb-12">
              <h3 className="text-3xl md:text-4xl font-serif font-bold text-amber-700 mb-4">Sacred Creation Process</h3>
              <p className="text-lg text-gray-600/80 font-light">
                Three divine steps to transform Scripture into art
              </p>
            </div>

            <div className="space-y-5">
              {/* Step 1 - Compressed & Enhanced */}
              <div className="group relative bg-white/60 backdrop-blur-xl border border-white/40 rounded-2xl p-5 shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-500 ring-1 ring-amber-200/20">
                <div className="absolute inset-0 bg-gradient-to-r from-amber-200/10 to-yellow-200/10 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                <div className="relative z-10 flex items-start gap-6">
                  <div className="relative p-4 bg-gradient-to-br from-amber-400 to-yellow-500 rounded-2xl shadow-lg border border-amber-300/30">
                    <span className="text-2xl font-bold text-white">1</span>
                    <div className="absolute inset-0 bg-gradient-to-br from-amber-300 to-yellow-400 rounded-2xl blur-lg"></div>
                  </div>

                  <div className="flex-1">
                    <h4 className="text-xl font-serif font-semibold text-gray-800 mb-3">Select Sacred Words</h4>
                    <p className="text-gray-600/90 leading-relaxed">
                      Choose from daily divine inspiration, search specific scripture, or discover passages that resonate with your spiritual journey.
                    </p>
                  </div>
                </div>
              </div>

              {/* Step 2 - Compressed & Enhanced */}
              <div className="group relative bg-white/60 backdrop-blur-xl border border-white/40 rounded-2xl p-5 shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-500 ring-1 ring-amber-200/20">
                <div className="absolute inset-0 bg-gradient-to-r from-amber-200/10 to-yellow-200/10 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                <div className="relative z-10 flex items-start gap-6">
                  <div className="relative p-4 bg-gradient-to-br from-amber-500 to-yellow-600 rounded-2xl shadow-lg border border-amber-300/30">
                    <span className="text-2xl font-bold text-white">2</span>
                    <div className="absolute inset-0 bg-gradient-to-br from-amber-400 to-yellow-500 rounded-2xl blur-lg"></div>
                  </div>

                  <div className="flex-1">
                    <h4 className="text-xl font-serif font-semibold text-gray-800 mb-3">Describe Divine Vision</h4>
                    <p className="text-gray-600/90 leading-relaxed">
                      Guide our AI to create heavenly backgrounds - from majestic mountains to celestial skies, from peaceful gardens to radiant light.
                    </p>
                  </div>
                </div>
              </div>

              {/* Step 3 - Compressed & Enhanced */}
              <div className="group relative bg-white/60 backdrop-blur-xl border border-white/40 rounded-2xl p-5 shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-500 ring-1 ring-amber-200/20">
                <div className="absolute inset-0 bg-gradient-to-r from-amber-200/10 to-yellow-200/10 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                <div className="relative z-10 flex items-start gap-6">
                  <div className="relative p-4 bg-gradient-to-br from-yellow-500 to-amber-600 rounded-2xl shadow-lg border border-amber-300/30">
                    <span className="text-2xl font-bold text-white">3</span>
                    <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-2xl blur-lg"></div>
                  </div>

                  <div className="flex-1">
                    <h4 className="text-xl font-serif font-semibold text-gray-800 mb-3">Share Divine Message</h4>
                    <p className="text-gray-600/90 leading-relaxed">
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
