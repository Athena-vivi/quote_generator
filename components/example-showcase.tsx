"use client"

import { Sparkles, Eye, Download, Copy, Share2, Settings, Palette, Image, Layers, Wand2 } from "lucide-react"

export function ExampleShowcase() {
  return (
    <section id="example-showcase" className="relative py-32 px-6 sm:px-8 overflow-hidden">
      {/* Sacred Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50/30 via-white/50 to-amber-50/40"></div>
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-purple-300/10 to-pink-400/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-gradient-to-tr from-amber-300/10 to-yellow-400/10 rounded-full blur-3xl"></div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-24">
          <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-br from-purple-700 via-pink-600 to-amber-700 bg-clip-text text-transparent mb-8">
            Divine Creation Studio
          </h2>
          <p className="text-xl md:text-2xl text-gray-600/90 font-light leading-relaxed max-w-4xl mx-auto">
            Experience the sacred transformation of Scripture into breathtaking visual masterpieces
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Editor Interface Mockup */}
          <div className="relative">
            <div className="relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl shadow-2xl overflow-hidden border border-gray-700">
              {/* Editor Header */}
              <div className="bg-gray-800/90 backdrop-blur-sm border-b border-gray-700 px-4 py-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex gap-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    </div>
                    <span className="text-gray-300 text-sm font-medium ml-2">Divine Art Creator</span>
                  </div>
                  <Settings className="w-4 h-4 text-gray-400" />
                </div>
              </div>

              {/* Editor Toolbar */}
              <div className="bg-gray-800/60 backdrop-blur-sm border-b border-gray-700/50 px-4 py-3">
                <div className="flex items-center gap-2">
                  <button className="p-2 bg-gray-700/50 hover:bg-gray-700 rounded-lg transition-colors">
                    <Layers className="w-4 h-4 text-gray-300" />
                  </button>
                  <div className="w-px h-6 bg-gray-600"></div>
                  <button className="p-2 bg-gray-700/50 hover:bg-gray-700 rounded-lg transition-colors">
                    <Palette className="w-4 h-4 text-gray-300" />
                  </button>
                  <button className="p-2 bg-gray-700/50 hover:bg-gray-700 rounded-lg transition-colors">
                    <Wand2 className="w-4 h-4 text-gray-300" />
                  </button>
                  <div className="w-px h-6 bg-gray-600"></div>
                  <span className="text-gray-400 text-sm">1024 × 1024</span>
                </div>
              </div>

              {/* Canvas Area */}
              <div className="relative aspect-square bg-gray-900/50 overflow-hidden">
                <div
                  className="absolute inset-4 rounded-xl overflow-hidden"
                  style={{
                    backgroundImage: `url('/images/example-background.png')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                >
                  {/* Divine Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20"></div>

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

                    {/* AI Badge */}
                    <div className="absolute top-6 right-6 bg-white/20 backdrop-blur-md border border-white/30 rounded-full px-3 py-1.5 flex items-center gap-2">
                      <Sparkles className="w-3 h-3 text-white" />
                      <span className="text-white text-xs font-medium">AI Enhanced</span>
                    </div>
                  </div>
                </div>

                {/* Editor Selection Overlay */}
                <div className="absolute inset-0 border-2 border-purple-400/50 rounded-xl pointer-events-none">
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-purple-400 rounded-full"></div>
                  <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-purple-400 rounded-full"></div>
                </div>
              </div>

              {/* Editor Footer */}
              <div className="bg-gray-800/60 backdrop-blur-sm border-t border-gray-700/50 px-4 py-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <button className="flex items-center gap-2 px-3 py-1.5 bg-gray-700/50 hover:bg-gray-700 rounded-lg transition-colors text-sm text-gray-300">
                      <Download className="w-3 h-3" />
                      Export
                    </button>
                    <button className="flex items-center gap-2 px-3 py-1.5 bg-gray-700/50 hover:bg-gray-700 rounded-lg transition-colors text-sm text-gray-300">
                      <Copy className="w-3 h-3" />
                      Duplicate
                    </button>
                    <button className="flex items-center gap-2 px-3 py-1.5 bg-gray-700/50 hover:bg-gray-700 rounded-lg transition-colors text-sm text-gray-300">
                      <Share2 className="w-3 h-3" />
                      Share
                    </button>
                  </div>
                  <span className="text-gray-500 text-xs">Ready to share</span>
                </div>
              </div>
            </div>

            {/* Floating Indicators */}
            <div className="absolute -top-4 -left-4 bg-white/90 backdrop-blur-sm border border-amber-200/50 rounded-xl p-3 shadow-xl">
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4 text-amber-600" />
                <span className="text-sm font-medium text-gray-800">4K Resolution</span>
              </div>
            </div>

            <div className="absolute -bottom-4 -right-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl p-3 shadow-xl">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                <span className="text-sm font-medium">AI Powered</span>
              </div>
            </div>
          </div>

          {/* Process Steps */}
          <div className="space-y-12">
            <div className="text-center mb-12">
              <h3 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Sacred Creation Process</h3>
              <p className="text-lg text-gray-600/80 font-light">
                Three divine steps to transform Scripture into art
              </p>
            </div>

            <div className="space-y-8">
              {/* Step 1 */}
              <div className="group relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8 shadow-xl hover:shadow-2xl transform hover:scale-[1.02] transition-all duration-500">
                <div className="absolute inset-0 bg-gradient-to-r from-amber-400/10 to-yellow-500/10 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                <div className="relative z-10 flex items-start gap-6">
                  <div className="relative p-4 bg-gradient-to-br from-amber-400 to-yellow-500 rounded-2xl shadow-lg">
                    <span className="text-2xl font-bold text-white">1</span>
                    <div className="absolute inset-0 bg-gradient-to-br from-amber-300 to-yellow-400 rounded-2xl blur-lg"></div>
                  </div>

                  <div className="flex-1">
                    <h4 className="text-xl font-semibold text-gray-800 mb-3">Select Sacred Words</h4>
                    <p className="text-gray-600/90 leading-relaxed">
                      Choose from daily divine inspiration, search specific scripture, or discover passages that resonate with your spiritual journey.
                    </p>
                  </div>
                </div>
              </div>

              {/* Step 2 */}
              <div className="group relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8 shadow-xl hover:shadow-2xl transform hover:scale-[1.02] transition-all duration-500">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400/10 to-purple-500/10 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                <div className="relative z-10 flex items-start gap-6">
                  <div className="relative p-4 bg-gradient-to-br from-blue-400 to-purple-500 rounded-2xl shadow-lg">
                    <span className="text-2xl font-bold text-white">2</span>
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-300 to-purple-400 rounded-2xl blur-lg"></div>
                  </div>

                  <div className="flex-1">
                    <h4 className="text-xl font-semibold text-gray-800 mb-3">Describe Divine Vision</h4>
                    <p className="text-gray-600/90 leading-relaxed">
                      Guide our AI to create heavenly backgrounds - from majestic mountains to celestial skies, from peaceful gardens to radiant light.
                    </p>
                  </div>
                </div>
              </div>

              {/* Step 3 */}
              <div className="group relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8 shadow-xl hover:shadow-2xl transform hover:scale-[1.02] transition-all duration-500">
                <div className="absolute inset-0 bg-gradient-to-r from-green-400/10 to-teal-500/10 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                <div className="relative z-10 flex items-start gap-6">
                  <div className="relative p-4 bg-gradient-to-br from-green-400 to-teal-500 rounded-2xl shadow-lg">
                    <span className="text-2xl font-bold text-white">3</span>
                    <div className="absolute inset-0 bg-gradient-to-br from-green-300 to-teal-400 rounded-2xl blur-lg"></div>
                  </div>

                  <div className="flex-1">
                    <h4 className="text-xl font-semibold text-gray-800 mb-3">Share Divine Message</h4>
                    <p className="text-gray-600/90 leading-relaxed">
                      Receive your masterpiece in stunning 4K resolution and share God's word with the world through social media or personal reflection.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <div className="text-center pt-8">
              <button
                onClick={() => {
                  document.getElementById("quote-finder")?.scrollIntoView({ behavior: "smooth" })
                }}
                className="group relative px-10 py-4 bg-gradient-to-r from-purple-600 via-pink-600 to-amber-600 text-white font-semibold rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 text-lg"
              >
                <span className="relative z-10 flex items-center gap-3">
                  <Sparkles className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300" />
                  Begin Your Creation
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl blur-md opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
