import { NextResponse } from "next/server"

// Popular quotes for daily rotation
const popularQuotes = [
  "John 3:16",
  "Jeremiah 29:11",
  "Romans 8:28",
  "Philippians 4:13",
  "Psalm 23:1",
  "Isaiah 41:10",
  "Proverbs 3:5-6",
  "1 Corinthians 13:4-7",
  "Matthew 6:26",
  "Psalm 46:10",
  "Romans 12:2",
  "Ephesians 2:8-9",
  "Joshua 1:9",
  "Psalm 139:14",
  "Matthew 11:28-30",
  "2 Corinthians 5:17",
  "Galatians 2:20",
  "1 Peter 5:7",
  "Psalm 27:1",
  "Isaiah 40:31",
]

function removeESVReferences(content: string): string {
  if (!content) return content;

  // 移除开头的经文引用
  let cleaned = content.replace(/^[^a-zA-Z]*[0-9]+\s*[A-Za-z]+\s*[0-9:–-]+\s*/, "");

  // 去除首尾所有类型的引号和空格
  cleaned = cleaned.trim().replace(/^["'“”‘’]+/, "").replace(/["'“”‘’]+$/, "");

  // 再次去除多余空格
  cleaned = cleaned.trim();

  // 去除结尾的括号内容，如 (ESV)
  cleaned = cleaned.replace(/\s*\([^)]*\)\s*$/i, "").trim();

  // 再去除结尾所有类型的引号和空格，防止多余引号残留
  cleaned = cleaned.replace(/["'“”‘’]+$/, "").trim();

  return cleaned;
}

async function getESVQuote(passage: string) {
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
    }

    return content
  } catch (error) {
    console.error("ESV API error:", error)
    return null
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const timestamp = searchParams.get("t")

    let quoteIndex: number

    if (timestamp) {
      quoteIndex = Math.floor(Math.random() * popularQuotes.length)
    } else {
      const today = new Date()
      const dayOfYear = Math.floor(
        (today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24),
      )
      quoteIndex = dayOfYear % popularQuotes.length
    }

    const selectedReference = popularQuotes[quoteIndex]
    const quoteContent = await getESVQuote(selectedReference)

    if (quoteContent) {
      return NextResponse.json({
        success: true,
        quote: {
          reference: selectedReference,
          content: quoteContent,
        },
      })
    } else {
      return NextResponse.json({
        success: false,
        error: "Failed to load daily quote. Please check API configuration.",
      })
    }
  } catch (error) {
    console.error("Daily quote API error:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Internal server error",
      },
      { status: 500 },
    )
  }
}
