import Link from "next/link"
import { Metadata } from "next"
import { BookOpen, Sun, Heart, Sparkles, LucideIcon } from "lucide-react"
import { PageLayout } from "@/components/page-layout"
import Image from "next/image"

export const metadata: Metadata = {
  title: "Bible Collections - Curated Scripture Quote Galleries | QuoteGenerator",
  description: "Discover curated collections of Bible quotes and verses. Explore Top 10 Morning Prayers, Verses for Hard Times, Gratitude Journaling, and more divine scripture collections.",
  keywords: ["bible collections", "bible quotes", "scripture galleries", "curated verses", "bible verse themes", "morning prayers", "gratitude journaling"],
}

interface Collection {
  slug: string
  title: string
  subtitle: string
  description: string
  icon: LucideIcon
  imageColor: string
  coverImage: string
  verseCount: number
  featured: boolean
}

const collections: Collection[] = [
  {
    slug: "top-10-morning-prayers",
    title: "Top 10 Morning Prayers",
    subtitle: "Start Your Day with God",
    description: "Begin each morning with these powerful prayers to center your heart, seek God's guidance, and find peace for the day ahead.",
    icon: Sun,
    imageColor: "from-amber-400 via-yellow-400 to-orange-400",
    coverImage: "/images/collections/morning-prayer.webp",
    verseCount: 10,
    featured: true
  },
  {
    slug: "verses-for-hard-times",
    title: "Verses for Hard Times",
    subtitle: "Strength in Difficult Seasons",
    description: "When life feels overwhelming, find comfort and hope in these scriptures. God's Word brings light to your darkest moments.",
    icon: Heart,
    imageColor: "from-slate-500 via-gray-500 to-zinc-600",
    coverImage: "/images/collections/hard-times.webp",
    verseCount: 25,
    featured: true
  },
  {
    slug: "gratitude-journaling",
    title: "Gratitude Journaling",
    subtitle: "Thankful Hearts Collection",
    description: "Cultivate a heart of gratitude with these verses. Perfect for daily reflection and journaling God's blessings in your life.",
    icon: Sparkles,
    imageColor: "from-emerald-400 via-green-400 to-teal-400",
    coverImage: "/images/collections/gratitude.webp",
    verseCount: 18,
    featured: true
  },
]

export default function CollectionsPage() {
  return (
    <PageLayout showBreadcrumb={true}>
      <div className="min-h-screen bg-[#fdfbf7] dark:bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">

          {/* Header */}
          <div className="text-center mb-12 md:mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-amber-100 to-yellow-100 dark:from-amber-900/30 dark:to-amber-800/30 rounded-2xl md:rounded-3xl border border-amber-200/50 dark:border-amber-500/30 mb-6 shadow-lg">
              <BookOpen className="w-8 h-8 md:w-10 md:h-10 text-amber-600 dark:text-amber-400" />
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-amber-900 dark:text-amber-300 mb-4">
              Scripture <span className="text-amber-600 dark:text-amber-400">Collections</span>
            </h1>
            <p className="text-base md:text-lg text-stone-600 dark:text-stone-400 max-w-2xl mx-auto leading-relaxed">
              Curated galleries of divine wisdom. Explore themed Bible verse collections crafted for every moment of life.
            </p>
          </div>

          {/* Featured Collections - Large Cards with Cover Images */}
          <div className="mb-16">
            <h2 className="text-xl md:text-2xl font-serif font-bold text-stone-800 dark:text-stone-200 mb-8 md:mb-10 flex items-center justify-center gap-3">
              <div className="w-8 h-0.5 bg-amber-400 dark:bg-amber-500"></div>
              <span>Featured Collections</span>
              <div className="w-8 h-0.5 bg-amber-400 dark:bg-amber-500"></div>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {collections.map((collection) => {
                const IconComponent = collection.icon
                return (
                  <Link
                    key={collection.slug}
                    href={`/collections/${collection.slug}`}
                    className="group"
                  >
                    <div className="relative h-full bg-white dark:bg-stone-900/60 rounded-3xl overflow-hidden border border-amber-100 dark:border-amber-500/20 shadow-sm hover:shadow-xl hover:shadow-amber-500/10 dark:hover:shadow-amber-500/5 transition-all duration-500 hover:-translate-y-2">

                      {/* Cover Image Area */}
                      <div className="relative h-56 md:h-64 bg-gradient-to-br from-stone-200 to-stone-300 dark:from-stone-800 dark:to-stone-700 overflow-hidden">
                        {/* Placeholder gradient background */}
                        <div className={`absolute inset-0 bg-gradient-to-br ${collection.imageColor} opacity-80`}></div>

                        {/* Icon overlay on image */}
                        <div className="absolute top-4 right-4 w-14 h-14 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center shadow-lg">
                          <IconComponent className="w-7 h-7 text-white" strokeWidth={2} />
                        </div>

                        {/* Title overlay at bottom */}
                        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/60 to-transparent">
                          <h3 className="text-2xl md:text-3xl font-serif font-bold text-white mb-1 drop-shadow-lg">
                            {collection.title}
                          </h3>
                          <p className="text-white/90 text-sm md:text-base font-medium drop-shadow">
                            {collection.subtitle}
                          </p>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-5 md:p-6">
                        <p className="text-sm md:text-base text-stone-600 dark:text-stone-400 leading-relaxed mb-4 line-clamp-3">
                          {collection.description}
                        </p>

                        {/* Footer */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 text-xs md:text-sm text-stone-500 dark:text-stone-600">
                            <div className="w-1.5 h-1.5 rounded-full bg-amber-500"></div>
                            <span>{collection.verseCount} verses</span>
                          </div>
                          <span className="text-xs md:text-sm font-medium text-amber-600 dark:text-amber-400 group-hover:text-amber-700 dark:group-hover:text-amber-300 transition-colors">
                            Explore →
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>

          {/* Coming Soon */}
          <div className="text-center">
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-500/20 rounded-full">
              <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-stone-600 dark:text-stone-400">More collections coming soon</span>
            </div>
          </div>

          {/* SEO Content */}
          <div className="mt-16 max-w-4xl mx-auto">
            <div className="bg-white/80 dark:bg-stone-900/40 rounded-2xl md:rounded-3xl p-6 md:p-8 border border-amber-100 dark:border-amber-500/10">
              <h2 className="text-xl md:text-2xl font-serif font-bold text-stone-800 dark:text-stone-200 mb-4">
                Why Browse Our Collections?
              </h2>
              <div className="space-y-3 text-sm md:text-base text-stone-600 dark:text-stone-400 leading-relaxed">
                <p>
                  Our Bible quote collections are thoughtfully curated to help you find the perfect scripture for any occasion.
                  Each collection focuses on a specific theme, making it easy to discover verses that speak to your heart.
                </p>
                <p>
                  Whether you're seeking comfort, looking for encouragement, or searching for words of love and hope,
                  our galleries offer a beautifully organized way to explore God's word.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </PageLayout>
  )
}
