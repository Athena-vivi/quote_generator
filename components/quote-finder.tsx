"use client"

import { useState } from "react"
import { Search, Heart, Loader2, BookOpen, Palette, Copy, Check, HeartOff, Sparkles, Sun, Moon, Cloud, Zap, Flower, Star } from "lucide-react"
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

      {/* Custom Glassmorphism Tabs */}
      <div className="mb-10">
        <div className="relative bg-white/60 dark:bg-zinc-900/60 backdrop-blur-xl border border-white/40 dark:border-amber-900/30 rounded-2xl p-2 shadow-xl ring-1 ring-amber-200/20 dark:ring-amber-500/10">
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => setActiveTab("search")}
              className={`relative px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 flex items-center justify-center gap-3 ${
                activeTab === "search"
                  ? "bg-amber-100/50 text-amber-800 dark:bg-amber-500/20 dark:text-amber-300 shadow-lg"
                  : "text-gray-700/80 dark:text-stone-300 hover:text-amber-800 dark:hover:text-amber-300 hover:bg-white/20 dark:hover:bg-zinc-800/50"
              }`}
            >
              <Search className="w-5 h-5" />
              Direct Search
              {activeTab === "search" && (
                <div className="absolute inset-0 bg-amber-100/30 dark:bg-amber-500/10 rounded-xl blur-lg"></div>
              )}
            </button>
            <button
              onClick={() => setActiveTab("mood")}
              className={`relative px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 flex items-center justify-center gap-3 ${
                activeTab === "mood"
                  ? "bg-amber-100/50 text-amber-800 dark:bg-amber-500/20 dark:text-amber-300 shadow-lg"
                  : "text-gray-700/80 dark:text-stone-300 hover:text-amber-800 dark:hover:text-amber-300 hover:bg-white/20 dark:hover:bg-zinc-800/50"
              }`}
            >
              <Heart className="w-5 h-5" />
              Mood Match
              {activeTab === "mood" && (
                <div className="absolute inset-0 bg-amber-100/30 dark:bg-amber-500/10 rounded-xl blur-lg"></div>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Search Tab Content */}
      {activeTab === "search" && (
        <div className="mb-12">
          <div className="relative bg-white/60 dark:bg-zinc-900/40 dark:backdrop-blur-md backdrop-blur-xl border border-white/40 dark:border-white/10 rounded-3xl p-6 md:p-10 shadow-2xl ring-1 ring-amber-200/20 dark:ring-amber-500/10">
            {/* Header */}
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 bg-gradient-to-br from-amber-100/50 to-yellow-100/50 dark:from-amber-500/20 dark:to-amber-600/20 rounded-2xl border border-amber-200/30 dark:border-amber-500/30">
                <BookOpen className="w-8 h-8 text-amber-600 dark:text-amber-400 drop-shadow-[0_0_8px_rgba(212,175,55,0.4)]" />
              </div>
              <h3 className="text-2xl font-serif font-semibold text-gray-800 dark:text-stone-200">Search Scripture</h3>
            </div>

            {/* Search Input */}
            <div className="relative mb-8">
              <div className="flex gap-4">
                <div className="relative flex-1">
                  <input
                    type="text"
                    placeholder="Enter verse reference (John 3:16) or keywords (love, peace, hope)"
                    value={searchQuery}
                    onChange={(e) => handleInputChange(e)}
                    onKeyPress={(e) => e.key === "Enter" && handleDirectSearch()}
                    className="w-full px-6 py-4 text-lg bg-white/60 backdrop-blur-sm border border-white/30 rounded-2xl focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-300/60 transition-all duration-300 placeholder-gray-500/70"
                  />
                  {/* Suggestions Dropdown */}
                  {suggestions.length > 0 && (
                    <div className="absolute z-20 w-full mt-2 bg-white/90 backdrop-blur-xl border border-white/30 rounded-xl shadow-xl overflow-hidden">
                      {suggestions.map((verse, idx) => (
                        <div
                          key={idx}
                          className="px-6 py-4 cursor-pointer hover:bg-amber-50/80 transition-colors border-b border-white/20 last:border-b-0"
                          onClick={() => handleSuggestionClick(verse)}
                        >
                          <span className="font-semibold text-amber-700">{verse.reference}</span>
                          <span className="text-gray-600 ml-2">{verse.content}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <button
                  onClick={handleDirectSearch}
                  disabled={loading || !searchQuery.trim()}
                  className="group relative px-8 py-4 bg-gradient-to-r from-amber-600 to-yellow-600 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <Loader2 className="w-6 h-6 animate-spin" />
                  ) : (
                    <Search className="w-6 h-6" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-2xl blur-md opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
                </button>
              </div>
            </div>

            {/* Help Text - Transparent with subtle amber glow */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white/20 dark:bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-amber-100/30 dark:border-white/10">
                <p className="text-sm font-medium text-gray-700 dark:text-stone-300 mb-2">Verse References:</p>
                <p className="text-xs text-gray-600 dark:text-stone-400">"John 3:16", "Psalm 23", "Romans 8:28"</p>
              </div>
              <div className="bg-white/20 dark:bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-amber-100/30 dark:border-white/10">
                <p className="text-sm font-medium text-gray-700 dark:text-stone-300 mb-2">Keywords:</p>
                <p className="text-xs text-gray-600 dark:text-stone-400">"love", "peace", "strength", "forgiveness"</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mood Tab Content */}
      {activeTab === "mood" && (
        <div className="mb-12">
          <div className="relative bg-white/50 dark:bg-zinc-900/40 dark:backdrop-blur-md backdrop-blur-xl border border-white/40 dark:border-white/10 rounded-3xl p-6 md:p-10 shadow-2xl ring-1 ring-amber-200/20 dark:ring-amber-500/10">
            {/* Header - Simplified without icon */}
            <div className="mb-8">
              <h3 className="text-2xl font-serif font-semibold text-gray-800 dark:text-stone-200">Find by Emotion</h3>
            </div>

            {/* Custom Mood Input */}
            <div className="mb-10">
              <p className="text-lg text-gray-700/90 mb-4">How are you feeling today?</p>
              <div className="flex gap-4">
                <input
                  type="text"
                  placeholder="Enter your mood (e.g., overwhelmed, excited, discouraged)"
                  value={customMood}
                  onChange={(e) => setCustomMood(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleCustomMoodSearch()}
                  className="flex-1 px-6 py-4 text-lg bg-white/60 backdrop-blur-sm border border-white/30 rounded-2xl focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-300/60 transition-all duration-300 placeholder-gray-500/70"
                />
                <button
                  onClick={handleCustomMoodSearch}
                  disabled={loading || !customMood.trim()}
                  className="group relative px-8 py-4 bg-gradient-to-r from-amber-600 to-yellow-600 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <Loader2 className="w-6 h-6 animate-spin" />
                  ) : (
                    <Search className="w-6 h-6" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-2xl blur-md opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
                </button>
              </div>
            </div>

            {/* Mood Grid - Compact Pill Buttons */}
            <div>
              <p className="text-base text-gray-700/90 dark:text-stone-300 mb-4">Or choose from these emotions:</p>
              <div className="flex md:flex-wrap gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
                {moodSuggestions.map((moodObj) => {
                  const IconComponent = moodObj.icon;
                  const isActive = moodQuery === moodObj.mood;

                  return (
                    <button
                      key={moodObj.mood}
                      onClick={() => handleMoodSearch(moodObj.mood)}
                      className={`group relative px-3 py-2 rounded-full border transition-all duration-300 flex items-center gap-2 flex-shrink-0 ${
                        isActive
                          ? "border-amber-400 bg-gradient-to-r from-amber-400 to-amber-500 dark:from-amber-500 dark:to-amber-600 shadow-md"
                          : "border-amber-100/50 dark:border-amber-900/40 hover:border-amber-300 dark:hover:border-amber-500/50 hover:bg-amber-50 dark:hover:bg-amber-950/30"
                      }`}
                    >
                      <IconComponent className={`w-3.5 h-3.5 ${isActive ? "text-white" : "text-gray-700 dark:text-stone-300"}`} />
                      <span className={`text-sm font-medium capitalize ${isActive ? "text-white" : "text-gray-700 dark:text-stone-300"}`}>
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
            <Loader2 className="w-12 h-12 animate-spin text-amber-600" />
            <div className="absolute inset-0 bg-amber-400/20 rounded-full blur-2xl"></div>
          </div>
          <span className="ml-4 text-xl text-gray-700">
            {activeTab === "mood"
              ? `Finding divine wisdom for "${moodQuery || customMood}"...`
              : "Searching sacred texts..."
            }
          </span>
        </div>
      )}

      {/* Results */}
      {quotes.length > 0 && (
        <div className="mt-12 space-y-8">
          <h3 className="text-4xl md:text-5xl font-serif font-bold text-amber-700 dark:text-amber-400">
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
                className="group relative bg-white/60 dark:bg-zinc-900/40 dark:backdrop-blur-md backdrop-blur-xl border border-white/40 dark:border-white/10 rounded-3xl p-6 md:p-10 shadow-2xl hover:shadow-3xl dark:hover:shadow-[0_0_40px_rgba(212,175,55,0.15)] transform hover:scale-[1.02] transition-all duration-500 ring-1 ring-amber-200/20 dark:ring-amber-500/10"
              >
                {/* Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-amber-400/10 to-yellow-500/10 dark:from-amber-500/5 dark:to-amber-600/5 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

                <div className="relative z-10">
                  <blockquote className="text-2xl md:text-3xl font-serif text-gray-800 dark:text-stone-200 mb-6 leading-relaxed font-light">
                    "{quote.content}"
                  </blockquote>
                  <cite className="text-xl md:text-2xl font-bold bg-gradient-to-r from-amber-700 to-yellow-700 dark:from-amber-400 dark:to-amber-500 bg-clip-text text-transparent block mb-8">
                    — {quote.reference}
                  </cite>

                  <div className="flex flex-wrap gap-4">
                    <button
                      onClick={() => setSelectedQuoteForImage(quote)}
                      className="group/btn relative px-8 py-3 bg-gradient-to-r from-amber-600 to-yellow-600 dark:from-amber-500 dark:to-amber-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                    >
                      <span className="relative z-10 flex items-center gap-2">
                        <Palette className="w-5 h-5 group-hover/btn:rotate-12 transition-transform duration-300" />
                        Create Image
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-yellow-500 dark:from-amber-400 dark:to-amber-500 rounded-xl blur-md opacity-0 group-hover/btn:opacity-50 transition-opacity duration-300"></div>
                    </button>

                    <button
                      onClick={() => copyToClipboard(quote, index)}
                      className="px-8 py-3 bg-white/60 dark:bg-zinc-800/60 backdrop-blur-sm border-2 border-white/40 dark:border-amber-900/40 text-amber-700 dark:text-amber-400 font-semibold rounded-xl shadow-lg hover:bg-white/80 dark:hover:bg-zinc-700/60 hover:border-white/60 dark:hover:border-amber-500/30 transform hover:scale-105 transition-all duration-300"
                    >
                      {copiedIndex === index ? (
                        <span className="flex items-center gap-2 text-green-600">
                          <Check className="w-5 h-5" />
                          Copied!
                        </span>
                      ) : (
                        <span className="flex items-center gap-2">
                          <Copy className="w-5 h-5" />
                          Copy Text
                        </span>
                      )}
                    </button>

                    <button
                      onClick={() => toggleFavorite(quote, index)}
                      className="px-8 py-3 bg-white/60 backdrop-blur-sm border-2 border-white/40 text-red-600 font-semibold rounded-xl shadow-lg hover:bg-red-50 hover:border-red-200 transform hover:scale-105 transition-all duration-300"
                    >
                      {favoriteStates[index] ? (
                        <span className="flex items-center gap-2">
                          <Heart className="w-5 h-5 fill-current" />
                          Favorited
                        </span>
                      ) : (
                        <span className="flex items-center gap-2">
                          <HeartOff className="w-5 h-5" />
                          Add to Favorites
                        </span>
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
