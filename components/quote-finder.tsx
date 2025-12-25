"use client"

import { useState } from "react"
import { Search, Heart, Loader2, BookOpen, Palette, Copy, Check, Sparkles, Sun, Moon, Cloud, Zap, Flower, Star } from "lucide-react"
import { ImageGenerator } from "./image-generator"
import Fuse from 'fuse.js';

interface Quote {
  reference: string
  content: string
}

// 热门金句本地库（可扩展）
const hotVerses = [
  { reference: 'John 3:16', content: 'For God so loved the world, that he gave his only Son, that whoever believes in him should not perish but have eternal life.' },
  { reference: 'Psalm 23:1', content: 'The Lord is my shepherd; I shall not want.' },
  { reference: 'Romans 8:28', content: 'And we know that for those who love God all things work together for good, for those who are called according to his purpose.' },
  { reference: 'Philippians 4:13', content: 'I can do all things through him who strengthens me.' },
  { reference: 'Matthew 5:9', content: 'Blessed are the peacemakers, for they shall be called sons of God.' },
  // ...可继续扩展
];
const fuse = new Fuse(hotVerses, {
  keys: ['content', 'reference'],
  threshold: 0.3,
});

export function QuoteFinder() {
  const [searchQuery, setSearchQuery] = useState("")
  const [moodQuery, setMoodQuery] = useState("")
  const [customMood, setCustomMood] = useState("")
  const [quotes, setQuotes] = useState<Quote[]>([])
  const [singleQuote, setSingleQuote] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("search")
  const [selectedQuoteForImage, setSelectedQuoteForImage] = useState<Quote | null>(null)
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)
  const [favoriteStates, setFavoriteStates] = useState<{ [key: number]: boolean }>({})
  const [suggestions, setSuggestions] = useState<typeof hotVerses>([]);

  const moodSuggestions = [
    { mood: "peaceful", icon: Sun, gradient: "from-amber-400 to-amber-600" },
    { mood: "anxious", icon: Cloud, gradient: "from-amber-300 to-amber-500" },
    { mood: "joyful", icon: Sparkles, gradient: "from-amber-400 to-yellow-500" },
    { mood: "hopeful", icon: Star, gradient: "from-amber-500 to-yellow-600" },
    { mood: "grateful", icon: Flower, gradient: "from-yellow-400 to-amber-600" },
    { mood: "lonely", icon: Moon, gradient: "from-amber-300 to-yellow-500" },
    { mood: "fearful", icon: Zap, gradient: "from-amber-500 to-amber-700" },
    { mood: "blessed", icon: Heart, gradient: "from-yellow-500 to-amber-600" },
  ]

  // Check if quote is favorited
  const checkIfFavorited = (quote: Quote, index: number) => {
    const favorites = JSON.parse(localStorage.getItem("favoriteQuotes") || "[]")
    const quoteKey = `${quote.reference}|${quote.content}`
    const isFavorited = favorites.includes(quoteKey)
    setFavoriteStates((prev) => ({ ...prev, [index]: isFavorited }))
    return isFavorited
  }

  // 输入时实时模糊推荐
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    if (e.target.value.trim()) {
      const results = fuse.search(e.target.value.trim()).map(r => r.item);
      setSuggestions(results.slice(0, 5));
    } else {
      setSuggestions([]);
    }
  };
  // 选择推荐项
  const handleSuggestionClick = (verse: { reference: string; content: string }) => {
    setSearchQuery(verse.reference);
    setSuggestions([]);
    handleDirectSearchByReference(verse.reference);
  };
  // 支持直接用 reference 搜索
  const handleDirectSearchByReference = async (ref: string) => {
    setLoading(true);
    setSingleQuote(null);
    setQuotes([]);
    try {
      const response = await fetch("/api/verses/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: ref, type: "direct" }),
      });
      const data = await response.json();
      if (data.success && data.quote) {
        setSingleQuote(data.quote);
        const newQuotes = [{ reference: ref, content: data.quote }];
        setQuotes(newQuotes);
        newQuotes.forEach((quote, index) => checkIfFavorited(quote, index));
      } else {
        setQuotes([]);
        setSingleQuote(null);
      }
    } catch (error) {
      setQuotes([]);
      setSingleQuote(null);
    } finally {
      setLoading(false);
    }
  };

  const handleDirectSearch = async () => {
    if (!searchQuery.trim()) return

    setLoading(true)
    setSingleQuote(null)
    setQuotes([])

    try {
      const response = await fetch("/api/verses/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: searchQuery, type: "direct" }),
      })
      const data = await response.json()

      if (data.success) {
        if (data.quote) {
          // Single verse result
          setSingleQuote(data.quote)
          const newQuotes = [{ reference: searchQuery, content: data.quote }]
          setQuotes(newQuotes)
          // Check favorites for new quotes
          newQuotes.forEach((quote, index) => checkIfFavorited(quote, index))
        } else if (data.quotes) {
          // Multiple keyword search results
          setQuotes(data.quotes)
          // Check favorites for new quotes
          data.quotes.forEach((quote: Quote, index: number) => checkIfFavorited(quote, index))
        }
      } else {
        setQuotes([])
        setSingleQuote(null)
      }
    } catch (error) {
      console.error("Search failed:", error)
      setQuotes([])
      setSingleQuote(null)
    } finally {
      setLoading(false)
    }
  }

  const handleMoodSearch = async (mood: string) => {
    setMoodQuery(mood)
    setLoading(true)
    setSingleQuote(null)

    try {
      const response = await fetch("/api/verses/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: mood, type: "mood" }),
      })
      const data = await response.json()

      if (data.success) {
        setQuotes(data.quotes)
        // Check favorites for new quotes
        data.quotes.forEach((quote: Quote, index: number) => checkIfFavorited(quote, index))
      } else {
        setQuotes([])
      }
    } catch (error) {
      console.error("Mood search failed:", error)
      setQuotes([])
    } finally {
      setLoading(false)
    }
  }

  const handleCustomMoodSearch = async () => {
    if (!customMood.trim()) return
    await handleMoodSearch(customMood)
  }

  const copyToClipboard = async (quote: Quote, index: number) => {
    const textToCopy = `${quote.content} - ${quote.reference}`
    try {
      await navigator.clipboard.writeText(textToCopy)
      setCopiedIndex(index)
      setTimeout(() => setCopiedIndex(null), 2000)
    } catch (error) {
      console.error("Failed to copy:", error)
    }
  }

  const toggleFavorite = (quote: Quote, index: number) => {
    const favorites = JSON.parse(localStorage.getItem("favoriteQuotes") || "[]")
    const quoteKey = `${quote.reference}|${quote.content}`
    const isFavorited = favoriteStates[index]

    if (isFavorited) {
      const updatedFavorites = favorites.filter((fav: string) => fav !== quoteKey)
      localStorage.setItem("favoriteQuotes", JSON.stringify(updatedFavorites))
      setFavoriteStates((prev) => ({ ...prev, [index]: false }))
    } else {
      favorites.push(quoteKey)
      localStorage.setItem("favoriteQuotes", JSON.stringify(favorites))
      setFavoriteStates((prev) => ({ ...prev, [index]: true }))
    }
  }

  return (
    <div id="quote-finder" className="max-w-7xl mx-auto scroll-mt-[140px] px-6 sm:px-8 mt-16">
      {/* Header - Serif Typography */}
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-amber-900/80 dark:text-amber-400 mb-6">
          Scripture Compass
        </h2>
        <p className="text-xl md:text-2xl text-gray-600/90 dark:text-stone-400 font-light leading-relaxed max-w-4xl mx-auto">
          Discover divine wisdom through direct scripture search or emotional guidance
        </p>
      </div>

      {/* Custom Glassmorphism Tabs - Proper ARIA Tabs */}
      <div className="mb-10">
        <div className="relative bg-white/60 dark:bg-zinc-900/60 backdrop-blur-xl border border-white/40 dark:border-amber-900/30 rounded-2xl p-2 shadow-xl ring-1 ring-amber-200/20 dark:ring-amber-500/10">
          <div className="grid grid-cols-2 gap-2" role="tablist" aria-label="Search options">
            <button
              id="tab-search"
              onClick={() => setActiveTab("search")}
              aria-selected={activeTab === "search"}
              aria-controls="panel-search"
              role="tab"
              tabIndex={activeTab === "search" ? 0 : -1}
              className={`relative px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 flex items-center justify-center gap-3 ${
                activeTab === "search"
                  ? "bg-amber-100/50 text-amber-800 dark:bg-amber-500/20 dark:text-amber-300 shadow-lg"
                  : "text-gray-700/80 dark:text-stone-300 hover:text-amber-800 dark:hover:text-amber-300 hover:bg-white/20 dark:hover:bg-zinc-800/50"
              }`}
            >
              <Search className="w-5 h-5" aria-hidden="true" />
              Direct Search
              {activeTab === "search" && (
                <div className="absolute inset-0 bg-amber-100/30 dark:bg-amber-500/10 rounded-xl blur-lg" aria-hidden="true"></div>
              )}
            </button>
            <button
              id="tab-mood"
              onClick={() => setActiveTab("mood")}
              aria-selected={activeTab === "mood"}
              aria-controls="panel-mood"
              role="tab"
              tabIndex={activeTab === "mood" ? 0 : -1}
              className={`relative px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 flex items-center justify-center gap-3 ${
                activeTab === "mood"
                  ? "bg-amber-100/50 text-amber-800 dark:bg-amber-500/20 dark:text-amber-300 shadow-lg"
                  : "text-gray-700/80 dark:text-stone-300 hover:text-amber-800 dark:hover:text-amber-300 hover:bg-white/20 dark:hover:bg-zinc-800/50"
              }`}
            >
              <Heart className="w-5 h-5" aria-hidden="true" />
              Mood Match
              {activeTab === "mood" && (
                <div className="absolute inset-0 bg-amber-100/30 dark:bg-amber-500/10 rounded-xl blur-lg" aria-hidden="true"></div>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Search Tab Content - Obsidian Art Style */}
      {activeTab === "search" && (
        <div id="panel-search" role="tabpanel" aria-labelledby="tab-search" tabIndex={0} className="mb-12">
          <div className="relative bg-white/85 dark:bg-white/[0.02] dark:backdrop-blur-max backdrop-blur-xl rounded-3xl p-6 md:p-10 shadow-xl dark:shadow-[0_0_40px_rgba(212,175,55,0.1)]">
            {/* Gradient border overlay */}
            <div className="absolute inset-0 rounded-3xl p-[1px] bg-gradient-to-br from-amber-500/15 via-transparent to-amber-500/8 dark:from-amber-400/10 dark:via-transparent dark:to-amber-600/6 pointer-events-none"></div>

            {/* Header */}
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 bg-gradient-to-br from-amber-100/50 to-yellow-100/50 dark:from-amber-500/15 dark:to-amber-600/15 rounded-2xl border border-amber-200/30 dark:border-amber-500/12">
                <BookOpen className="w-8 h-8 text-amber-600 dark:text-amber-400 drop-shadow-[0_0_6px_rgba(212,175,55,0.3)]" />
              </div>
              <h3 className="text-2xl font-serif font-semibold text-gray-800 dark:text-zinc-200">Search Scripture</h3>
            </div>

            {/* Search Input - Bottom border glow style */}
            <div className="relative mb-8">
              <div className="flex gap-4">
                <div className="relative flex-1 glow-border-focus">
                  <input
                    type="text"
                    placeholder="Enter verse reference (John 3:16) or keywords (love, peace, hope)"
                    value={searchQuery}
                    onChange={(e) => handleInputChange(e)}
                    onKeyPress={(e) => e.key === "Enter" && handleDirectSearch()}
                    className="w-full px-6 py-4 text-lg bg-transparent dark:bg-transparent border-0 border-b-2 border-amber-300/30 dark:border-amber-500/20 rounded-none focus:outline-none focus:border-amber-500/60 dark:focus:border-amber-400/40 text-gray-800 dark:text-zinc-200 transition-all duration-300 placeholder-gray-500/70 dark:placeholder:text-zinc-500"
                  />
                  {/* Suggestions Dropdown */}
                  {suggestions.length > 0 && (
                    <div className="absolute z-20 w-full mt-2 bg-white/95 dark:bg-white/[0.02] dark:backdrop-blur-max backdrop-blur-xl border border-amber-200/30 dark:border-amber-500/10 rounded-xl shadow-lg dark:shadow-[0_0_30px_rgba(212,175,55,0.08)] overflow-hidden">
                      {suggestions.map((verse, idx) => (
                        <div
                          key={idx}
                          className="px-6 py-4 cursor-pointer hover:bg-amber-50/60 dark:hover:bg-amber-950/15 transition-colors border-b border-amber-100/20 dark:border-amber-500/8 last:border-b-0"
                          onClick={() => handleSuggestionClick(verse)}
                          role="option"
                          tabIndex={0}
                        >
                          <span className="font-serif font-semibold text-amber-900 dark:text-amber-300">{verse.reference}</span>
                          <span className="text-gray-700 dark:text-zinc-300 ml-2">{verse.content}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <button
                  onClick={handleDirectSearch}
                  disabled={loading || !searchQuery.trim()}
                  aria-label="Search Scripture"
                  className="group relative px-8 py-4 bg-gradient-to-r from-amber-600 to-yellow-600 dark:from-amber-500 dark:to-amber-600 text-white font-serif font-semibold rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <Loader2 className="w-6 h-6 animate-spin" aria-hidden="true" />
                  ) : (
                    <Search className="w-6 h-6" aria-hidden="true" />
                  )}
                  <span className="sr-only">Search</span>
                </button>
              </div>
            </div>

            {/* Help Text - Minimal style with bottom accents */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="relative pb-3 border-b border-amber-200/40 dark:border-amber-500/15">
                <p className="text-sm font-serif font-medium text-gray-700 dark:text-zinc-300 mb-1">Verse References:</p>
                <p className="text-xs text-gray-600 dark:text-zinc-500">"John 3:16", "Psalm 23", "Romans 8:28"</p>
              </div>
              <div className="relative pb-3 border-b border-amber-200/40 dark:border-amber-500/15">
                <p className="text-sm font-serif font-medium text-gray-700 dark:text-zinc-300 mb-1">Keywords:</p>
                <p className="text-xs text-gray-600 dark:text-zinc-500">"love", "peace", "strength", "forgiveness"</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mood Tab Content - Obsidian Art Style */}
      {activeTab === "mood" && (
        <div id="panel-mood" role="tabpanel" aria-labelledby="tab-mood" tabIndex={0} className="mb-12">
          <div className="relative bg-white/85 dark:bg-white/[0.02] dark:backdrop-blur-max backdrop-blur-xl rounded-3xl p-6 md:p-10 shadow-xl dark:shadow-[0_0_40px_rgba(212,175,55,0.1)]">
            {/* Gradient border overlay */}
            <div className="absolute inset-0 rounded-3xl p-[1px] bg-gradient-to-br from-amber-500/15 via-transparent to-amber-500/8 dark:from-amber-400/10 dark:via-transparent dark:to-amber-600/6 pointer-events-none"></div>

            {/* Header */}
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 bg-gradient-to-br from-amber-100/50 to-yellow-100/50 dark:from-amber-500/15 dark:to-amber-600/15 rounded-2xl border border-amber-200/30 dark:border-amber-500/12">
                <Heart className="w-8 h-8 text-amber-600 dark:text-amber-400 drop-shadow-[0_0_6px_rgba(212,175,55,0.3)]" />
              </div>
              <h3 className="text-2xl font-serif font-semibold text-gray-800 dark:text-zinc-200">How are you feeling today?</h3>
            </div>

            {/* Mood Input - Bottom border style */}
            <div className="relative mb-8">
              <div className="flex gap-4">
                <div className="relative flex-1 glow-border-focus">
                  <input
                    type="text"
                    placeholder="Enter your mood (e.g., overwhelmed, excited, discouraged)"
                    value={customMood}
                    onChange={(e) => setCustomMood(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleCustomMoodSearch()}
                    className="w-full px-6 py-4 text-lg bg-transparent dark:bg-transparent border-0 border-b-2 border-amber-300/30 dark:border-amber-500/20 rounded-none focus:outline-none focus:border-amber-500/60 dark:focus:border-amber-400/40 text-gray-800 dark:text-zinc-200 transition-all duration-300 placeholder-gray-500/70 dark:placeholder:text-zinc-500"
                  />
                </div>
                <button
                  onClick={handleCustomMoodSearch}
                  disabled={loading || !customMood.trim()}
                  aria-label="Search by Mood"
                  className="group relative px-8 py-4 bg-gradient-to-r from-amber-600 to-yellow-600 dark:from-amber-500 dark:to-amber-600 text-white font-serif font-semibold rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <Loader2 className="w-6 h-6 animate-spin" aria-hidden="true" />
                  ) : (
                    <Search className="w-6 h-6" aria-hidden="true" />
                  )}
                  <span className="sr-only">Search by Mood</span>
                </button>
              </div>
            </div>

            {/* Mood Grid - Compact Pill Buttons */}
            <div>
              <p className="text-base font-serif text-gray-700/90 dark:text-zinc-400 mb-4">Or choose from these emotions:</p>
              <div className="flex md:flex-wrap gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
                {moodSuggestions.map((moodObj) => {
                  const IconComponent = moodObj.icon;
                  const isActive = moodQuery === moodObj.mood;

                  return (
                    <button
                      key={moodObj.mood}
                      onClick={() => handleMoodSearch(moodObj.mood)}
                      aria-label={`Search for ${moodObj.mood} verses`}
                      aria-pressed={isActive}
                      className={`group relative px-3 py-2 rounded-full border transition-all duration-300 flex items-center gap-2 flex-shrink-0 ${
                        isActive
                          ? "border-amber-400 bg-gradient-to-r from-amber-400 to-amber-500 dark:from-amber-500 dark:to-amber-600 shadow-sm"
                          : "border-cyan-200/50 dark:border-cyan-400/20 hover:border-cyan-300/60 dark:hover:border-cyan-300/40 bg-cyan-50/30 dark:bg-cyan-900/20"
                      }`}
                    >
                      <IconComponent className={`w-3.5 h-3.5 ${isActive ? "text-white" : "text-gray-700 dark:text-zinc-400"}`} aria-hidden="true" />
                      <span className={`text-sm font-medium font-serif capitalize ${isActive ? "text-white" : "text-gray-700 dark:text-zinc-400"}`}>
                        {moodObj.mood}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="flex items-center justify-center py-16">
          <div className="relative">
            <Loader2 className="w-12 h-12 animate-spin text-amber-600 dark:text-amber-400" />
            <div className="absolute inset-0 bg-amber-400/15 dark:bg-amber-500/20 rounded-full blur-2xl"></div>
          </div>
          <span className="ml-4 text-xl font-serif text-gray-700 dark:text-zinc-400">
            {activeTab === "mood"
              ? `Finding divine wisdom for "${moodQuery || customMood}"...`
              : "Searching sacred texts..."
            }
          </span>
        </div>
      )}

      {/* Results - Obsidian Art Style */}
      {quotes.length > 0 && (
        <div className="mt-16 space-y-8">
          <h3 className="text-2xl md:text-3xl font-serif font-semibold text-amber-800/70 dark:text-amber-300/80 text-center">
            {activeTab === "mood"
              ? `Divine Wisdom for "${moodQuery || customMood}"`
              : singleQuote
                ? "Sacred Text Found"
                : `Search Results for "${searchQuery}"`}
          </h3>
          <div className="space-y-6">
            {quotes.map((quote, index) => (
              <div
                key={index}
                className="group relative bg-white/90 dark:bg-zinc-900/40 dark:backdrop-blur-max backdrop-blur-xl rounded-3xl p-8 md:p-12 transition-transform duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1 border border-amber-100/30 dark:border-amber-500/10 hover:border-amber-200/50 dark:hover:border-amber-500/40"
              >
                {/* Static gradient border - no hover changes */}
                <div className="absolute inset-0 rounded-3xl p-[1px] bg-gradient-to-br from-amber-500/6 via-transparent to-amber-500/3 dark:from-amber-400/5 dark:via-transparent dark:to-amber-600/3 pointer-events-none"></div>

                {/* Decorative Quote Marks - Static, no hover */}
                <div className="absolute -top-2 left-6 text-6xl md:text-7xl font-serif text-amber-200/10 dark:text-amber-500/5 leading-none select-none">"</div>
                <div className="absolute -bottom-6 right-6 text-6xl md:text-7xl font-serif text-amber-200/10 dark:text-amber-500/5 leading-none select-none">"</div>

                <div className="relative">
                  {/* Quote Text - Clean serif typography */}
                  <blockquote
                    className="text-2xl md:text-3xl lg:text-4xl font-serif font-light italic text-stone-800 dark:text-zinc-200 leading-relaxed mb-8 px-4 py-3"
                    style={{
                      letterSpacing: '0.12px'
                    }}
                  >
                    "{quote.content}"
                  </blockquote>

                  {/* Subtle divider */}
                  <div className="h-px bg-gradient-to-r from-transparent via-amber-300/15 dark:via-amber-500/10 to-transparent mb-7"></div>

                  {/* Reference - Right aligned */}
                  <div className="relative flex justify-end mb-8">
                    <cite
                      className="relative block text-base md:text-lg font-serif text-right text-amber-800 dark:text-amber-400 font-medium italic"
                      style={{ letterSpacing: '0.3px' }}
                    >
                      — {quote.reference}
                    </cite>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-4">
                    {/* Quick Copy - Clean */}
                    <button
                      onClick={() => copyToClipboard(quote, index)}
                      aria-label={copiedIndex === index ? "Copied to clipboard" : "Copy quote to clipboard"}
                      className="flex-1 min-h-[48px] px-6 py-3.5 bg-white/50 dark:bg-white/[0.02] dark:backdrop-blur-max border border-amber-200/50 dark:border-amber-500/15 hover:border-amber-300/70 dark:hover:border-amber-500/30 text-amber-900 dark:text-amber-300 font-serif font-semibold rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 active:scale-95 flex items-center justify-center gap-2"
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

                    {/* Create Image - Clean gradient */}
                    <button
                      onClick={() => setSelectedQuoteForImage(quote)}
                      aria-label="Create image from this quote"
                      className="flex-1 min-h-[48px] px-6 py-3.5 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 dark:from-amber-500 dark:to-amber-600 dark:hover:from-amber-400 dark:hover:to-amber-500 text-white font-serif font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 active:scale-95 flex items-center justify-center gap-2"
                    >
                      <Palette className="w-4 h-4" aria-hidden="true" />
                      <span>Create Image</span>
                    </button>

                    {/* Favorite - Clean */}
                    <button
                      onClick={() => toggleFavorite(quote, index)}
                      aria-label={favoriteStates[index] ? "Remove from favorites" : "Add to favorites"}
                      aria-pressed={favoriteStates[index] || false}
                      className="min-h-[48px] min-w-[48px] p-3 rounded-2xl bg-stone-100/30 dark:bg-white/[0.02] dark:backdrop-blur-max border border-stone-200/30 dark:border-amber-500/10 text-stone-500 dark:text-zinc-500 hover:text-red-500 dark:hover:text-red-400 hover:border-red-300/40 dark:hover:border-red-500/20 transition-all duration-300 flex items-center justify-center"
                    >
                      {favoriteStates[index] ? (
                        <Heart className="w-5 h-5 fill-current text-red-500" aria-hidden="true" />
                      ) : (
                        <Heart className="w-5 h-5" aria-hidden="true" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {selectedQuoteForImage && (
        <ImageGenerator quote={selectedQuoteForImage} onClose={() => setSelectedQuoteForImage(null)} />
      )}
    </div>
  )
}
