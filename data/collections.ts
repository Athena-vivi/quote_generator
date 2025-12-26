// Collection mappings with ESV Bible references
// Each collection maps to a list of scripture references for batch API queries

export interface Collection {
  slug: string
  title: string
  subtitle: string
  description: string
  longDescription: string
  icon: string
  imageColor: string
  gradient: string
  // ESV Bible references
  references: string[]
  // SEO metadata
  keywords: string[]
}

export const collections: Record<string, Collection> = {
  "top-10-morning-prayers": {
    slug: "top-10-morning-prayers",
    title: "Top 10 Morning Prayers",
    subtitle: "Start Your Day with God",
    description: "Begin each morning with these powerful prayers to center your heart, seek God's guidance, and find peace for the day ahead.",
    longDescription: "These morning prayers will help you start each day with purpose, gratitude, and divine connection. Whether you need strength, wisdom, or simply to acknowledge God's presence, these prayers will guide your heart.",
    icon: "Sun",
    imageColor: "from-amber-400 via-yellow-400 to-orange-400",
    gradient: "from-amber-400 to-amber-500",
    keywords: ["morning prayers", "daily prayers", "morning devotion", "morning bible verses", "start your day with god"],
    references: [
      "Psalm 143:8",
      "Psalm 5:3",
      "Lamentations 3:22-23",
      "Psalm 90:14",
      "Isaiah 26:9",
      "Psalm 119:147",
      "Exodus 33:14",
      "Psalm 57:7-8",
      "Psalm 118:24",
      "Mark 1:35",
    ],
  },
  "verses-for-hard-times": {
    slug: "verses-for-hard-times",
    title: "Verses for Hard Times",
    subtitle: "Strength in Difficult Seasons",
    description: "When life feels overwhelming, find comfort and hope in these scriptures. God's Word brings light to your darkest moments.",
    longDescription: "In seasons of pain and uncertainty, these verses offer hope and remind you of God's unfailing love. Let these scriptures be your anchor when waves of life feel overwhelming.",
    icon: "Heart",
    imageColor: "from-slate-500 via-gray-500 to-zinc-600",
    gradient: "from-slate-500 to-slate-600",
    keywords: ["verses for hard times", "difficult seasons", "comfort scriptures", "hope in hard times", "strength in suffering"],
    references: [
      "Psalm 34:18",
      "Isaiah 41:10",
      "Psalm 23:4",
      "Matthew 11:28",
      "2 Corinthians 1:3-4",
      "Romans 8:28",
      "Psalm 46:1",
      "Deuteronomy 31:8",
      "Psalm 9:9",
      "1 Peter 5:10",
      "Jeremiah 29:11",
      "Psalm 27:1",
      "Isaiah 43:2",
      "Psalm 121:1-2",
      "2 Timothy 1:7",
      "Psalm 30:5",
      "Lamentations 3:22-23",
      "Romans 15:13",
      "Psalm 71:20-21",
      "Isaiah 40:31",
      "Hebrews 13:5",
      "Psalm 42:5",
      "Psalm 55:22",
      "2 Thessalonians 2:16-17",
      "James 1:2-4",
    ],
  },
  "gratitude-journaling": {
    slug: "gratitude-journaling",
    title: "Gratitude Journaling",
    subtitle: "Thankful Hearts Collection",
    description: "Cultivate a heart of gratitude with these verses. Perfect for daily reflection and journaling God's blessings in your life.",
    longDescription: "Gratitude transforms our perspective and opens our eyes to God's countless blessings. Use these verses for your daily journaling practice and cultivate a thankful heart.",
    icon: "Sparkles",
    imageColor: "from-emerald-400 via-green-400 to-teal-400",
    gradient: "from-emerald-400 to-teal-500",
    keywords: ["gratitude bible verses", "thankfulness scriptures", "gratitude journaling", "thankful heart", "praise verses"],
    references: [
      "Psalm 107:1",
      "1 Thessalonians 5:18",
      "Psalm 100:4",
      "Colossians 3:17",
      "Psalm 136:1",
      "Ephesians 5:20",
      "Philippians 4:6",
      "Psalm 118:1",
      "James 1:17",
      "Psalm 69:30",
      "1 Chronicles 16:34",
      "Psalm 106:1",
      "2 Corinthians 9:15",
      "Psalm 92:1-2",
      "Hebrews 13:15",
      "Psalm 28:7",
      "Psalm 103:1-5",
      "Psalm 95:2-3",
      "Psalm 30:4",
      "Colossians 2:6-7",
      "Psalm 145:1-2",
    ],
  },
}

// Export all collection slugs for generateStaticParams
export const collectionSlugs = Object.keys(collections)

// Export collections array for the collections list page
export const collectionsList = Object.values(collections)
