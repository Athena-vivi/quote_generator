"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Search, Heart, Loader2, BookOpen, Palette, Copy, Check, HeartOff } from "lucide-react"
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
    "lonely",
    "anxious",
    "grateful",
    "hopeful",
    "sad",
    "joyful",
    "worried",
    "peaceful",
    "angry",
    "confused",
    "blessed",
    "fearful",
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
    <div id="quote-finder" className="max-w-6xl mx-auto scroll-mt-[112px]">
      <div className="text-center mb-12">
      <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Explore Verses</h2>
        <p className="text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto">
         Search for specific Bible verses or discover passages that match your current mood
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-8 h-14 bg-white/70 backdrop-blur-sm border border-amber-200/30">
          <TabsTrigger
            value="search"
            className="flex items-center gap-2 text-lg data-[state=active]:bg-amber-100 data-[state=active]:text-amber-800"
          >
            <Search className="w-5 h-5" />
            Direct Search
          </TabsTrigger>
          <TabsTrigger
            value="mood"
            className="flex items-center gap-2 text-lg data-[state=active]:bg-amber-100 data-[state=active]:text-amber-800"
          >
            <Heart className="w-5 h-5" />
            Mood Match
          </TabsTrigger>
        </TabsList>

        <TabsContent value="search" className="space-y-6">
          <Card className="bg-white/80 backdrop-blur-sm border border-amber-200/30 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl text-gray-800">
                <BookOpen className="w-6 h-6 text-amber-600" />
                Search by Reference or Keywords
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input
                  placeholder="Enter verse reference (John 3:16) or keywords (love, peace, hope)"
                  value={searchQuery}
                  onChange={handleInputChange}
                  onKeyPress={(e) => e.key === "Enter" && handleDirectSearch()}
                  className="flex-1 text-lg h-12 border-amber-200 focus:border-amber-400 focus:ring-amber-400"
                />
                {/* 推荐列表 */}
                {suggestions.length > 0 && (
                  <div className="absolute z-10 bg-white border border-amber-200 rounded shadow w-full mt-1">
                    {suggestions.map((verse, idx) => (
                      <div
                        key={idx}
                        className="px-4 py-2 cursor-pointer hover:bg-amber-50 text-gray-800 text-base"
                        onClick={() => handleSuggestionClick(verse)}
                      >
                        <span className="font-semibold">{verse.reference}</span>: {verse.content}
                      </div>
                    ))}
                  </div>
                )}
                <Button
                  onClick={handleDirectSearch}
                  disabled={loading || !searchQuery.trim()}
                  size="lg"
                  className="bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white shadow-lg"
                >
                  {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Search className="w-5 h-5" />}
                </Button>
              </div>
              <div className="space-y-2">
                <p className="text-base text-gray-600">
                  <strong>Verse References:</strong> "John 3:16", "Psalm 23", "Romans 8:28"
                </p>
                <p className="text-base text-gray-600">
                  <strong>Keywords:</strong> "love", "peace", "strength", "forgiveness", "hope"
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="mood" className="space-y-6">
          <Card className="bg-white/80 backdrop-blur-sm border border-amber-200/30 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl text-gray-800">
                <Heart className="w-6 h-6 text-red-600" />
                Find Quotes by Mood
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <p className="text-lg text-gray-600">
                  How are you feeling today? Enter your own mood or choose from suggestions:
                </p>

                {/* Custom mood input */}
                <div className="flex gap-2">
                  <Input
                    placeholder="Enter your mood (e.g., overwhelmed, excited, discouraged)"
                    value={customMood}
                    onChange={(e) => setCustomMood(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleCustomMoodSearch()}
                    className="flex-1 text-lg h-12 border-amber-200 focus:border-amber-400 focus:ring-amber-400"
                  />
                  <Button
                    onClick={handleCustomMoodSearch}
                    disabled={loading || !customMood.trim()}
                    size="lg"
                    className="bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white shadow-lg"
                  >
                    {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Search className="w-5 h-5" />}
                  </Button>
                </div>
              </div>

              <div className="space-y-3">
                <p className="text-lg text-gray-600">Or click on a mood below:</p>
                <div className="flex flex-wrap gap-3">
                  {moodSuggestions.map((mood) => (
                    <Badge
                      key={mood}
                      variant={moodQuery === mood ? "default" : "secondary"}
                      className={`cursor-pointer transition-colors px-4 py-2 text-base ${
                        moodQuery === mood
                          ? "bg-amber-600 text-white hover:bg-amber-700"
                          : "bg-white/70 text-gray-700 hover:bg-amber-100 hover:text-amber-800 border border-amber-200"
                      }`}
                      onClick={() => handleMoodSearch(mood)}
                    >
                      {mood}
                    </Badge>
                  ))}
                </div>
              </div>

              {loading && (
                <div className="flex items-center justify-center py-6">
                  <Loader2 className="w-8 h-8 animate-spin mr-3 text-amber-600" />
                  <span className="text-lg text-gray-700">Finding quotes for "{moodQuery || customMood}"...</span>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Results */}
      {quotes.length > 0 && (
        <div className="mt-8 space-y-6">
          <h3 className="text-3xl font-semibold text-gray-800">
            {activeTab === "mood"
              ? `Quotes for "${moodQuery || customMood}"`
              : singleQuote
                ? "Quote Found"
                : `Search Results for "${searchQuery}"`}
          </h3>
          <div className="grid gap-6">
            {quotes.map((quote, index) => {
              return (
                <Card
                  key={index}
                  className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white/80 backdrop-blur-sm border border-amber-200/30"
                >
                  <CardContent className="p-8">
                    <blockquote className="text-xl md:text-2xl text-gray-800 mb-4 leading-relaxed" style={{whiteSpace: 'pre-line'}}>
                      {quote.content}
                    </blockquote>
                    <cite className="text-lg md:text-xl text-amber-700 font-semibold">— {quote.reference}</cite>
                    <div className="mt-6 flex gap-3 flex-wrap">
                      <Button
                        size="lg"
                        onClick={() => setSelectedQuoteForImage(quote)}
                        className="bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white shadow-lg"
                      >
                        <Palette className="w-5 h-5 mr-2" />
                        Create Image
                      </Button>
                      <Button
                        size="lg"
                        variant="outline"
                        onClick={() => copyToClipboard(quote, index)}
                        className="bg-white/70 hover:bg-white/90 border-amber-300 text-amber-700 hover:text-amber-800"
                      >
                        {copiedIndex === index ? (
                          <>
                            <Check className="w-5 h-5 mr-2 text-green-600" />
                            Copied!
                          </>
                        ) : (
                          <>
                            <Copy className="w-5 h-5 mr-2" />
                            Copy Text
                          </>
                        )}
                      </Button>
                      <Button
                        size="lg"
                        variant="ghost"
                        onClick={() => toggleFavorite(quote, index)}
                        className="text-red-500 hover:text-red-600 hover:bg-red-50"
                      >
                        {favoriteStates[index] ? (
                          <>
                            <Heart className="w-5 h-5 mr-2 fill-current" />
                            Favorited
                          </>
                        ) : (
                          <>
                            <HeartOff className="w-5 h-5 mr-2" />
                            Add to Favorites
                          </>
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      )}
      {selectedQuoteForImage && (
        <ImageGenerator quote={selectedQuoteForImage} onClose={() => setSelectedQuoteForImage(null)} />
      )}
    </div>
  )
}
