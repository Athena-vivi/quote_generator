import Link from "next/link"
import { Feather, ArrowLeft } from "lucide-react"
import { PageLayout } from "@/components/page-layout"
import { VersesForPeaceClient, type Quote } from "@/components/verses-for-peace-client"

const peaceVerses: Quote[] = [
  {
    reference: "John 14:27",
    content: "Peace I leave with you; my peace I give you. I do not give to you as the world gives. Do not let your hearts be troubled and do not be afraid."
  },
  {
    reference: "Philippians 4:7",
    content: "And the peace of God, which transcends all understanding, will guard your hearts and your minds in Christ Jesus."
  },
  {
    reference: "Isaiah 26:3",
    content: "You will keep in perfect peace those whose minds are steadfast, because they trust in you."
  },
  {
    reference: "Psalm 29:11",
    content: "The Lord gives strength to his people; the Lord blesses his people with peace."
  },
  {
    reference: "Colossians 3:15",
    content: "Let the peace of Christ rule in your hearts, since as members of one body you were called to peace. And be thankful."
  },
  {
    reference: "2 Thessalonians 3:16",
    content: "Now may the Lord of peace himself give you peace at all times and in every way. The Lord be with all of you."
  },
  {
    reference: "Psalm 119:165",
    content: "Great peace have those who love your law, and nothing can make them stumble."
  },
  {
    reference: "Romans 15:13",
    content: "May the God of hope fill you with all joy and peace as you trust in him, so that you may overflow with hope by the power of the Holy Spirit."
  }
]

export const metadata = {
  title: "Bible Verses for Peace - Find Comfort & Serenity in Scripture",
  description: "Discover Bible verses about peace to calm your mind and heart. Find comfort, serenity, and hope in God's word during difficult times.",
  keywords: ["bible verses for peace", "scriptures about peace", "peace bible quotes", "finding peace in God", "calming bible verses"]
}

export default function VersesForPeacePage() {
  return (
    <PageLayout showBreadcrumb={true}>
      <div className="min-h-screen bg-background">
        {/* Hero Header */}
        <section className="relative pt-32 pb-16 px-6 bg-gradient-to-b from-amber-50/50 to-background dark:from-amber-950/20 dark:to-background">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-gradient-radial from-amber-500/5 via-amber-600/2 to-transparent opacity-0 dark:opacity-100 pointer-events-none"></div>

          <div className="relative z-10 max-w-4xl mx-auto">
            {/* Back Button */}
            <Link
              href="/themes"
              className="inline-flex items-center gap-2 text-amber-700 dark:text-amber-400 hover:text-amber-800 dark:hover:text-amber-300 font-medium mb-8 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Themes</span>
            </Link>

            {/* Topic Icon */}
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-amber-100 to-yellow-100 dark:from-amber-500/20 dark:to-amber-600/20 rounded-2xl border border-amber-200/50 dark:border-amber-500/30 mb-6 shadow-lg">
              <Feather className="w-8 h-8 text-amber-600 dark:text-amber-400" />
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-gray-900 dark:text-stone-100 mb-6 leading-tight">
              Bible Verses for <span className="text-amber-600 dark:text-amber-400">Peace</span>
            </h1>

            {/* Description */}
            <p className="text-xl text-gray-600 dark:text-stone-400 leading-relaxed max-w-3xl font-light">
              Find comfort and serenity in God's word. These scriptures about peace will calm your mind and heart,
              bringing hope and tranquility even in the midst of life's storms.
            </p>

            {/* Quick Stats */}
            <div className="flex flex-wrap gap-6 mt-8 pt-8 border-t border-amber-200/50 dark:border-amber-500/20">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                <span className="text-sm text-gray-600 dark:text-stone-400">{peaceVerses.length} Verses</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                <span className="text-sm text-gray-600 dark:text-stone-400">Old & New Testament</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                <span className="text-sm text-gray-600 dark:text-stone-400">Image Generation Ready</span>
              </div>
            </div>
          </div>
        </section>

        {/* Client Component for Interactive Verses */}
        <VersesForPeaceClient peaceVerses={peaceVerses} />
      </div>
    </PageLayout>
  )
}
