import { Palette, X, Heart, Loader2 } from "lucide-react"

interface Quote {
  reference: string
  content: string
}

interface UIControlsProps {
  quote: Quote
  prompt: string
  setPrompt: (value: string) => void
  isGenerating: boolean
  generateImage: () => void
  generatedImageUrl: string | null
  isInputCollapsed: boolean
  setIsInputCollapsed: (value: boolean) => void
  selectedSuggestionIndex: number | null
  setSelectedSuggestionIndex: (index: number | null) => void
  hasInput: boolean
  isFavorited: boolean
  toggleFavorite: () => void
  theme: 'light' | 'dark'
  setTheme: (theme: 'light' | 'dark') => void
  textColor: string
  setTextColor: (color: string) => void
  selectedFont: string
  setSelectedFont: (font: string) => void
}

const promptSuggestions = [
  "Divine light streaming",
  "Peaceful mountain sunrise",
  "Serene ocean waves",
  "Ancient olive trees",
  "Starry night Jerusalem",
  "Gentle waterfall",
]

export function UIControls({
  quote,
  prompt,
  setPrompt,
  isGenerating,
  generateImage,
  generatedImageUrl,
  isInputCollapsed,
  setIsInputCollapsed,
  selectedSuggestionIndex,
  setSelectedSuggestionIndex,
  hasInput,
  isFavorited,
  toggleFavorite,
  theme,
  setTheme,
  textColor,
  setTextColor,
  selectedFont,
  setSelectedFont,
}: UIControlsProps) {
  return (
    <div className="order-2 md:order-1 w-full md:w-[40%] flex flex-col gap-2 md:gap-3 overflow-y-auto">
      {/* Input Area - Mobile overlay when editing, Desktop static */}
      <div className={`${isInputCollapsed && generatedImageUrl ? 'hidden' : ''} ${!isInputCollapsed && generatedImageUrl ? 'md:static fixed bottom-20 left-4 right-4 z-40 bg-[#fdfbf7]/95 dark:bg-black/80 max-h-[70vh] overflow-y-auto rounded-2xl' : ''} bg-gradient-to-br from-stone-50/70 to-amber-50/30 dark:from-stone-900/30 dark:to-amber-950/15 backdrop-blur-xl rounded-2xl md:rounded-3xl p-3 md:p-4 border border-amber-100/40 dark:border-amber-500/10 shadow-md dark:shadow-[0_0_25px_rgba(212,175,55,0.06)]`}>
        <div className="flex items-center justify-between mb-2 md:mb-3">
          <div className="flex items-center gap-2">
            <Palette className="w-4 h-4 md:w-5 md:h-5 text-amber-600 dark:text-amber-400" />
            <h3 className="text-base md:text-lg font-serif font-semibold text-gray-800 dark:text-zinc-200">Background Scene</h3>
          </div>
          {generatedImageUrl && (
            <button
              onClick={() => setIsInputCollapsed(true)}
              className="p-1.5 rounded-full hover:bg-amber-100/40 dark:hover:bg-amber-500/10 transition-colors"
              aria-label="Collapse"
            >
              <X className="w-4 h-4 text-amber-600 dark:text-amber-400" />
            </button>
          )}
        </div>

        <textarea
          placeholder="Describe the background scene..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          rows={2}
          className="w-full px-3 py-2.5 text-base bg-stone-50/50 dark:bg-stone-900/30 border border-amber-200/30 dark:border-amber-500/15 rounded-xl focus:outline-none focus:border-amber-400/50 dark:focus:border-amber-400/30 text-gray-800 dark:text-zinc-200 placeholder-gray-500/60 dark:placeholder:text-zinc-500 font-serif resize-none mb-2"
        />

        {!generatedImageUrl && (
          <div className="space-y-1.5 md:space-y-2 mb-3">
            <p className="text-xs font-serif uppercase tracking-wider text-amber-600/60 dark:text-amber-400/50">Suggestions:</p>
            <div className="flex flex-wrap gap-1.5">
              {promptSuggestions.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setPrompt(suggestion)
                    setSelectedSuggestionIndex(index)
                  }}
                  className={`px-3 py-1.5 text-sm md:py-1.5 md:px-3 font-serif rounded-full transition-all relative ${
                    selectedSuggestionIndex === index
                      ? 'bg-amber-500 text-white shadow-lg shadow-amber-500/50 scale-105'
                      : 'bg-amber-50/80 dark:bg-amber-950/30 text-amber-800 dark:text-amber-300 hover:bg-amber-100 dark:hover:bg-amber-950/50 hover:-translate-y-0.5 hover:shadow-md'
                  }`}
                >
                  <span className="relative">{suggestion}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        <button
          onClick={generateImage}
          disabled={isGenerating || !prompt.trim()}
          className="w-full min-h-[48px] md:min-h-[44px] px-4 py-3 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-500 hover:via-amber-600 hover:to-amber-700 text-white font-serif font-semibold rounded-xl shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {isGenerating ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Generating...</span>
            </>
          ) : (
            <>
              <Palette className="w-5 h-5" />
              <span>Generate</span>
            </>
          )}
        </button>
      </div>

      {/* Quote Preview - only show when no image */}
      {!generatedImageUrl && (
        <div className="bg-gradient-to-br from-stone-50/70 to-amber-50/30 dark:from-stone-900/30 dark:to-amber-950/15 backdrop-blur-xl rounded-2xl md:rounded-3xl p-3 md:p-4 border border-amber-100/40 dark:border-amber-500/10">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-xs font-serif uppercase tracking-widest text-amber-700/60 dark:text-amber-400/50">Your Quote</h4>
            <button
              onClick={toggleFavorite}
              className="p-2 rounded-full hover:bg-amber-100/40 dark:hover:bg-amber-500/10"
              aria-label={isFavorited ? "Remove from favorites" : "Add to favorites"}
            >
              {isFavorited ? (
                <Heart className="w-5 h-5 text-red-500 fill-current" />
              ) : (
                <Heart className="w-5 h-5 text-amber-600 dark:text-amber-400" />
              )}
            </button>
          </div>
          <blockquote className="text-sm md:text-base font-serif font-light italic text-stone-800 dark:text-zinc-200 leading-relaxed mb-1">
            "{quote.content}"
          </blockquote>
          <cite className="block text-xs md:text-sm font-serif text-amber-800 dark:text-amber-400 italic text-right">
            — {quote.reference}
          </cite>
        </div>
      )}

      {/* Style Controls - show when image exists and input collapsed */}
      {generatedImageUrl && isInputCollapsed && (
        <button
          onClick={() => setIsInputCollapsed(false)}
          className="w-full min-h-[44px] bg-white/90 dark:bg-black/80 backdrop-blur-xl border border-amber-200/50 dark:border-amber-500/20 rounded-2xl px-4 py-3 flex items-center gap-2 shadow-md"
        >
          <Palette className="w-4 h-4 text-amber-600 dark:text-amber-400" />
          <span className="text-sm font-serif text-amber-900 dark:text-amber-300">Edit Background</span>
        </button>
      )}

      {/* Style Options - Hide on mobile when input is expanded */}
      {generatedImageUrl && isInputCollapsed && (
        <div className="bg-gradient-to-br from-stone-50/70 to-amber-50/30 dark:from-stone-900/30 dark:to-amber-950/15 backdrop-blur-xl rounded-2xl md:rounded-3xl p-3 md:p-4 border border-amber-100/40 dark:border-amber-500/10">
          <h4 className="text-sm font-serif font-semibold text-gray-800 dark:text-zinc-200 mb-3">Style Options</h4>

          {/* Mobile: Horizontal layout, Desktop: Vertical layout */}
          <div className="flex flex-row md:flex-col gap-2 md:gap-0 md:space-y-3">
            {/* Text Color */}
            <div className="flex flex-col items-center md:items-start flex-1 min-w-0">
              <p className="text-[10px] md:text-xs font-serif uppercase tracking-wider text-amber-600/60 dark:text-amber-400/50 mb-1 md:mb-2 whitespace-nowrap">Color</p>
              <div className="flex gap-1.5 md:gap-2 justify-center md:justify-start">
                {["#ffd700", "#fff"].map((color) => (
                  <button
                    key={color}
                    onClick={() => setTextColor(color)}
                    className="relative w-6 h-6 md:w-8 md:h-8 rounded-full border-2 hover:scale-110 transition-all flex-shrink-0"
                    style={{
                      background: color,
                      borderColor: textColor === color ? '#d97706' : 'rgba(251, 191, 36, 0.25)',
                      boxShadow: textColor === color ? '0 0 10px rgba(217, 119, 6, 0.4)' : 'none',
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Theme */}
            <div className="flex flex-col items-center flex-1 min-w-0">
              <button
                onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
                className="h-8 md:h-9 px-2 md:px-0 rounded-lg bg-gradient-to-r from-stone-200 to-stone-300 dark:from-stone-700 dark:to-stone-600 text-stone-700 dark:text-stone-200 hover:from-stone-300 hover:to-stone-400 dark:hover:from-stone-600 dark:hover:to-stone-500 transition-all font-serif text-xs md:text-sm flex items-center justify-center gap-1 md:gap-2 w-full"
              >
                <span className="text-sm md:text-base">{theme === 'light' ? '☀️' : '🌙'}</span>
                <span className="hidden md:inline">{theme === 'light' ? 'Light' : 'Dark'}</span>
              </button>
            </div>

            {/* Font */}
            <div className="flex flex-col items-center md:items-start flex-1 min-w-0">
              <p className="text-[10px] md:text-xs font-serif uppercase tracking-wider text-amber-600/60 dark:text-amber-400/50 mb-1 md:mb-2 whitespace-nowrap">Font</p>
              <div className="flex gap-1.5 md:gap-2 w-full">
                <button
                  onClick={() => setSelectedFont("classic")}
                  className={`flex-1 px-2 md:px-3 py-1.5 md:py-2 text-xs md:text-sm font-serif rounded-lg transition-all ${
                    selectedFont === "classic"
                      ? "bg-gradient-to-r from-amber-500 to-amber-600 text-white"
                      : "bg-white/50 text-amber-700 hover:bg-amber-50 dark:bg-white/[0.02] dark:text-amber-300 dark:hover:bg-amber-950/25 border border-amber-200/30 dark:border-amber-500/10"
                  }`}
                >
                  Serif
                </button>
                <button
                  onClick={() => setSelectedFont("handwriting")}
                  className={`flex-1 px-2 md:px-3 py-1.5 md:py-2 text-xs md:text-sm font-serif rounded-lg transition-all ${
                    selectedFont === "handwriting"
                      ? "bg-gradient-to-r from-amber-500 to-amber-600 text-white"
                      : "bg-white/50 text-amber-700 hover:bg-amber-50 dark:bg-white/[0.02] dark:text-amber-300 dark:hover:bg-amber-950/25 border border-amber-200/30 dark:border-amber-500/10"
                  }`}
                  style={{ fontFamily: 'Great Vibes, cursive' }}
                >
                  Script
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
