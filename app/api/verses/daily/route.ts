import { NextResponse } from 'next/server'

// 保险库精选经文 - 按日期轮换
const DAILY_QUOTES = [
  {
    reference: "John 3:16",
    content: "For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life."
  },
  {
    reference: "Jeremiah 29:11",
    content: "For I know the plans I have for you, declares the Lord, plans to prosper you and not to harm you, plans to give you hope and a future."
  },
  {
    reference: "Philippians 4:13",
    content: "I can do all this through him who gives me strength."
  },
  {
    reference: "Psalm 23:1",
    content: "The Lord is my shepherd, I lack nothing."
  },
  {
    reference: "Romans 8:28",
    content: "And we know that in all things God works for the good of those who love him, who have been called according to his purpose."
  },
  {
    reference: "Isaiah 41:10",
    content: "So do not fear, for I am with you; do not be dismayed, for I am your God. I will strengthen you and help you."
  },
  {
    reference: "Proverbs 3:5-6",
    content: "Trust in the Lord with all your heart and lean not on your own understanding; in all your ways submit to him, and he will make your paths straight."
  }
]

export async function GET() {
  try {
    // 根据日期选择经文，确保每天相同
    const now = new Date()
    const dayOfYear = Math.floor((now.getTime() - new Date(now.getFullYear(), 0, 0).getTime()) / 86400000)
    const quoteIndex = dayOfYear % DAILY_QUOTES.length

    return NextResponse.json({
      success: true,
      quote: DAILY_QUOTES[quoteIndex]
    })
  } catch (error) {
    console.error('Error fetching daily quote:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch daily quote' },
      { status: 500 }
    )
  }
}
