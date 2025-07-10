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
  if (!content) return content

  console.log("🔍 原始内容:", JSON.stringify(content))

  let cleaned = content

  // 第一步：移除开头的经文引用
  cleaned = cleaned.replace(/^[^a-zA-Z]*[0-9]+\s*[A-Za-z]+\s*[0-9:–-]+\s*/, "")

  // 第二步：找到最后一个句号的位置
  const lastPeriodIndex = cleaned.lastIndexOf(".")
  if (lastPeriodIndex !== -1) {
    // 截取到最后一个句号（包含句号）
    cleaned = cleaned.substring(0, lastPeriodIndex + 1)
  }

  // 第三步：移除开头和结尾的所有类型的引号
  cleaned = cleaned.trim()

  // 循环移除开头的引号（处理多个引号的情况）
  while (cleaned.length > 0 && (cleaned.startsWith('"') || cleaned.startsWith('"') || cleaned.startsWith("'"))) {
    cleaned = cleaned.substring(1).trim()
  }

  // 循环移除结尾的引号
  while (cleaned.length > 0 && (cleaned.endsWith('"') || cleaned.endsWith('"') || cleaned.endsWith("'"))) {
    cleaned = cleaned.substring(0, cleaned.length - 1).trim()
  }

  // 第四步：最终清理空白字符
  cleaned = cleaned.trim()

  console.log("🎯 清理结果:", JSON.stringify(cleaned))
  return cleaned
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
