import { type NextRequest, NextResponse } from "next/server"

// 顶部添加缓存Map
const esvQuoteCache = new Map<string, string>()
const esvKeywordCache = new Map<string, any[]>()

function removeESVReferences(content: string): string {
  if (!content) return content;

  // 移除开头的经文引用
  let cleaned = content.replace(/^[^a-zA-Z]*[0-9]+\s*[A-Za-z]+\s*[0-9:–-]+\s*/, "");

  // 去除首尾所有类型的引号和空格
  cleaned = cleaned.trim().replace(/^["'“”‘’]+/, "").replace(/["'“”‘’]+$/, "");

  // 再次去除多余空格
  cleaned = cleaned.trim();

  return cleaned;
}

async function getESVQuote(passage: string) {
  if (esvQuoteCache.has(passage)) {
    return esvQuoteCache.get(passage)!
  }
  try {
    const ESV_API_KEY = process.env.ESV_API_KEY
    if (!ESV_API_KEY) {
      console.error("❌ ESV_API_KEY not configured")
      return null
    }

    const response = await fetch(
      `https://api.esv.org/v3/passage/text/?q=${encodeURIComponent(passage)}&include-verse-numbers=false&include-footnotes=false&include-headings=false&include-passage-references=false`,
      {
        headers: {
          Authorization: `Token ${ESV_API_KEY}`,
        },
      },
    )

    const data = await response.json()
    let content = data.passages?.[0]?.trim() || null

    if (content) {
      content = removeESVReferences(content)
      esvQuoteCache.set(passage, content)
    }

    return content
  } catch (error) {
    console.error("ESV API error:", error)
    return null
  }
}

async function searchESVByKeyword(keyword: string) {
  if (esvKeywordCache.has(keyword)) {
    return esvKeywordCache.get(keyword)!
  }
  try {
    const ESV_API_KEY = process.env.ESV_API_KEY
    if (!ESV_API_KEY) {
      console.error("❌ ESV_API_KEY not configured")
      return []
    }

    const response = await fetch(
      `https://api.esv.org/v3/passage/search/?q=${encodeURIComponent(keyword)}&page-size=5`,
      {
        headers: {
          Authorization: `Token ${ESV_API_KEY}`,
        },
      },
    )

    const data = await response.json()
    const results = (
      data.results?.map((item: any) => {
        let content = item.content

        if (content) {
          content = removeESVReferences(content)
        }

        return {
          reference: item.reference,
          content: content,
        }
      }) || []
    )
    esvKeywordCache.set(keyword, results)
    return results
  } catch (error) {
    console.error("ESV search error:", error)
    return []
  }
}

function isVerseReference(query: string): boolean {
  const versePattern = /^(\d+\s+)?[A-Za-z]+\s+\d+([:-]\d+)?(-\d+)?$/
  return versePattern.test(query.trim())
}

async function analyzeMoodAndGetKeywords(mood: string) {
  try {
    const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY
    if (!OPENROUTER_API_KEY) {
      console.warn("⚠️ OPENROUTER_API_KEY not configured, using fallback keywords")
      // Return fallback keywords if API key is not configured
      const fallbackKeywords: { [key: string]: string[] } = {
        lonely: ["comfort", "presence", "love"],
        anxious: ["peace", "trust", "fear"],
        sad: ["comfort", "joy", "hope"],
        angry: ["peace", "forgiveness", "patience"],
        grateful: ["thanksgiving", "praise", "blessing"],
        hopeful: ["hope", "future", "promise"],
        worried: ["trust", "peace", "provision"],
        fearful: ["courage", "strength", "protection"],
        joyful: ["joy", "praise", "celebration"],
        peaceful: ["peace", "rest", "calm"],
        confused: ["wisdom", "guidance", "understanding"],
        blessed: ["blessing", "gratitude", "favor"],
      }
      return fallbackKeywords[mood.toLowerCase()] || ["love", "peace", "hope"]
    }

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENROUTER_API_KEY}`,
      },
      body: JSON.stringify({
        model: "meta-llama/llama-3.2-3b-instruct",
        messages: [
          {
            role: "user",
            content: `I'm feeling "${mood}". What are 3-5 biblical themes or keywords I should search for to find relevant Bible quotes? Please respond with only the keywords separated by commas, no explanations. For example: comfort, peace, strength, hope`,
          },
        ],
        max_tokens: 100,
      }),
    })

    const data = await response.json()
    const keywords = data.choices?.[0]?.message?.content?.trim() || ""

    const keywordList = keywords
      .split(",")
      .map((k: string) => k.trim())
      .filter((k: string) => k.length > 0)
    return keywordList.slice(0, 3)
  } catch (error) {
    console.error("OpenRouter API error:", error)
    const fallbackKeywords: { [key: string]: string[] } = {
      lonely: ["comfort", "presence", "love"],
      anxious: ["peace", "trust", "fear"],
      sad: ["comfort", "joy", "hope"],
      angry: ["peace", "forgiveness", "patience"],
      grateful: ["thanksgiving", "praise", "blessing"],
      hopeful: ["hope", "future", "promise"],
      worried: ["trust", "peace", "provision"],
      fearful: ["courage", "strength", "protection"],
      joyful: ["joy", "praise", "celebration"],
      peaceful: ["peace", "rest", "calm"],
      confused: ["wisdom", "guidance", "understanding"],
      blessed: ["blessing", "gratitude", "favor"],
    }

    return fallbackKeywords[mood.toLowerCase()] || ["love", "peace", "hope"]
  }
}

export async function POST(request: NextRequest) {
  try {
    const { query, type } = await request.json()

    if (type === "direct") {
      if (isVerseReference(query)) {
        const quote = await getESVQuote(query)
        if (quote) {
          return NextResponse.json({
            success: true,
            quote: quote,
          })
        } else {
          return NextResponse.json({
            success: false,
            error: "Quote not found. Please check API configuration.",
          })
        }
      } else {
        const quotes = await searchESVByKeyword(query)
        if (quotes.length > 0) {
          return NextResponse.json({
            success: true,
            quotes: quotes,
          })
        } else {
          return NextResponse.json({
            success: false,
            error: "No quotes found for this keyword. Please check API configuration.",
          })
        }
      }
    } else if (type === "mood") {
      const keywords = await analyzeMoodAndGetKeywords(query)
      const allQuotes: any[] = []

      for (const keyword of keywords) {
        const quotes = await searchESVByKeyword(keyword)
        allQuotes.push(...quotes)
      }

      const uniqueQuotes = allQuotes
        .filter((quote, index, self) => index === self.findIndex((v) => v.reference === quote.reference))
        .slice(0, 6)

      return NextResponse.json({
        success: true,
        quotes: uniqueQuotes,
      })
    }

    return NextResponse.json({
      success: false,
      error: "Invalid search type",
    })
  } catch (error) {
    console.error("API error:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Internal server error",
      },
      { status: 500 },
    )
  }
}
