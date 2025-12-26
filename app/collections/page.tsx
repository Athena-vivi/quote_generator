import Link from "next/link"
import { Metadata } from "next"
import { BookOpen, Heart, Shield, Sun, Sparkles, Flower, Star, Moon, LucideIcon } from "lucide-react"
import { PageLayout } from "@/components/page-layout"

export const metadata: Metadata = {
  title: "Bible Collections - Curated Scripture Quote Galleries | QuoteGenerator",
  description: "Discover curated collections of Bible quotes and verses. Explore themed galleries featuring Peace, Strength, Love, Healing, and more divine scripture collections.",
  keywords: ["bible collections", "bible quotes", "scripture galleries", "curated verses", "bible verse themes"],
}

interface Collection {
  slug: string
  title: string
  subtitle: string
  description: string
  icon: LucideIcon
  imageColor: string
  verseCount: number
  featured: boolean
}

const collections: Collection[] = [
  {
    slug: "short-bible-quotes",
    title: "Short & Powerful",
    subtitle: "Concise Scriptures",
    description: "Brief yet impactful verses perfect for quick inspiration and memorization. These short Bible quotes carry profound meaning in just a few words.",
    icon: Sparkles,
    imageColor: "from-violet-400 via-purple-400 to-fuchsia-400",
    verseCount: 45,
    featured: true
  },
  {
    slug: "bible-quotes-about-love",
    title: "Divine Love",
    subtitle: "God's Unconditional Love",
    description: "Explore the depth of God's love through these beautiful scriptures about love, compassion, and affection. Perfect for weddings and anniversaries.",
    icon: Heart,
    imageColor: "from-rose-400 via-pink-400 to-red-400",
    verseCount: 38,
    featured: true
  },
  {
    slug: "bible-quotes-about-peace",
    title: "Peace & Serenity",
    subtitle: "Tranquil Scriptures",
    description: "Find inner calm with verses about God's perfect peace. These scriptures bring comfort during troubled times and anxious moments.",
    icon: Sparkles,
    imageColor: "from-cyan-400 via-blue-400 to-indigo-400",
    verseCount: 32,
    featured: false
  },
  {
    slug: "bible-quotes-about-strength",
    title: "Strength & Courage",
    subtitle: "Powerful Verses",
    description: "Draw mighty strength from scripture. These empowering verses remind you of God's power and your ability to overcome any challenge.",
    icon: Shield,
    imageColor: "from-amber-400 via-orange-400 to-red-400",
    verseCount: 42,
    featured: true
  },
  {
    slug: "bible-quotes-for-encouragement",
    title: "Daily Encouragement",
    subtitle: "Uplifting Words",
    description: "Start each day with inspiration. These encouraging verses will lift your spirit and motivate you on your faith journey.",
    icon: Sun,
    imageColor: "from-yellow-400 via-amber-400 to-orange-400",
    verseCount: 56,
    featured: false
  },
  {
    slug: "bible-quotes-for-healing",
    title: "Healing & Comfort",
    subtitle: "Restorative Scriptures",
    description: "Find solace in these healing verses. Perfect for times of sickness, grief, or when you need God's comforting presence.",
    icon: Heart,
    imageColor: "from-emerald-400 via-teal-400 to-cyan-400",
    verseCount: 28,
    featured: false
  },
  {
    slug: "inspirational-bible-verses",
    title: "Inspirational Gems",
    subtitle: "Faith-Uplifting Verses",
    description: "A handpicked collection of the most inspiring Bible verses. These scriptures will ignite your faith and renew your spirit.",
    icon: Star,
    imageColor: "from-indigo-400 via-violet-400 to-purple-400",
    verseCount: 64,
    featured: true
  },
  {
    slug: "bible-quotes-for-anxiety",
    title: "Calm & Assurance",
    subtitle: "Anxiety-Relieving Verses",
    description: "Let go of worry with these reassuring scriptures. God's word brings peace to anxious hearts and troubled minds.",
    icon: Flower,
    imageColor: "from-green-400 via-emerald-400 to-teal-400",
    verseCount: 24,
    featured: false
  },
  {
    slug: "bible-quotes-about-faith",
    title: "Faith & Belief",
    subtitle: "Foundation Scriptures",
    description: "Strengthen your faith with these powerful verses. Build a solid foundation on God's promises and biblical truth.",
    icon: Sparkles,
    imageColor: "from-blue-400 via-indigo-400 to-violet-400",
    verseCount: 35,
    featured: false
  },
  {
    slug: "bible-quotes-about-hope",
    title: "Hope & Tomorrow",
    subtitle: "Future Promises",
    description: "Embrace hope with these forward-looking verses. God's promises for your future will brighten your perspective today.",
    icon: Moon,
    imageColor: "from-slate-400 via-gray-400 to-zinc-400",
    verseCount: 30,
    featured: false
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

          {/* Featured Collections - Large Cards */}
          <div className="mb-12 md:mb-16">
            <h2 className="text-xl md:text-2xl font-serif font-bold text-stone-800 dark:text-stone-200 mb-6 md:mb-8 flex items-center gap-3">
              <div className="w-8 h-0.5 bg-amber-400 dark:bg-amber-500"></div>
              <span>Featured Galleries</span>
              <div className="w-8 h-0.5 bg-amber-400 dark:bg-amber-500"></div>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {collections.filter(c => c.featured).slice(0, 3).map((collection) => {
                const IconComponent = collection.icon
                return (
                  <Link
                    key={collection.slug}
                    href={`/blog/${collection.slug}`}
                    className="group"
                  >
                    <div className="relative h-full">
                      {/* Card */}
                      <div className="bg-white dark:bg-stone-900/60 rounded-3xl overflow-hidden border border-amber-100 dark:border-amber-500/20 shadow-sm hover:shadow-xl hover:shadow-amber-500/10 dark:hover:shadow-amber-500/5 transition-all duration-500 hover:-translate-y-2">

                        {/* Image Area - Gradient Background with Icon */}
                        <div className={`relative h-48 md:h-56 bg-gradient-to-br ${collection.imageColor} p-6 flex items-end`}>
                          {/* Icon Overlay */}
                          <div className="absolute top-4 right-4 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                            <IconComponent className="w-6 h-6 text-white" strokeWidth={2} />
                          </div>

                          {/* Title on Image */}
                          <div className="relative z-10">
                            <h3 className="text-2xl md:text-3xl font-serif font-bold text-white mb-1 drop-shadow-lg">
                              {collection.title}
                            </h3>
                            <p className="text-white/90 text-sm font-medium drop-shadow">
                              {collection.subtitle}
                            </p>
                          </div>
                        </div>

                        {/* Content */}
                        <div className="p-5 md:p-6">
                          <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed mb-4 line-clamp-3">
                            {collection.description}
                          </p>

                          {/* Footer */}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 text-xs text-stone-500 dark:text-stone-600">
                              <div className="w-1.5 h-1.5 rounded-full bg-amber-500"></div>
                              <span>{collection.verseCount} verses</span>
                            </div>
                            <span className="text-xs font-medium text-amber-600 dark:text-amber-400 group-hover:text-amber-700 dark:group-hover:text-amber-300 transition-colors">
                              Explore →
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>

          {/* All Collections - Compact Grid */}
          <div>
            <h2 className="text-xl md:text-2xl font-serif font-bold text-stone-800 dark:text-stone-200 mb-6 md:mb-8 flex items-center gap-3">
              <div className="w-8 h-0.5 bg-amber-400 dark:bg-amber-500"></div>
              <span>All Collections</span>
              <div className="w-8 h-0.5 bg-amber-400 dark:bg-amber-500"></div>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {collections.map((collection) => {
                const IconComponent = collection.icon
                return (
                  <Link
                    key={collection.slug}
                    href={`/blog/${collection.slug}`}
                    className="group"
                  >
                    <div className="bg-white dark:bg-stone-900/60 rounded-2xl overflow-hidden border border-amber-100 dark:border-amber-500/20 shadow-sm hover:shadow-lg hover:shadow-amber-500/10 dark:hover:shadow-amber-500/5 transition-all duration-300 hover:-translate-y-1">

                      {/* Small Image */}
                      <div className={`relative h-32 bg-gradient-to-br ${collection.imageColor} p-4 flex items-center justify-center`}>
                        <IconComponent className="w-8 h-8 text-white/90" strokeWidth={1.5} />
                      </div>

                      {/* Content */}
                      <div className="p-4">
                        <h3 className="text-base font-serif font-bold text-stone-800 dark:text-stone-200 mb-1 group-hover:text-amber-700 dark:group-hover:text-amber-400 transition-colors line-clamp-1">
                          {collection.title}
                        </h3>
                        <p className="text-xs text-stone-500 dark:text-stone-500 line-clamp-2 mb-3">
                          {collection.subtitle}
                        </p>

                        {/* Footer */}
                        <div className="flex items-center gap-1.5 text-xs text-stone-400 dark:text-stone-600">
                          <div className="w-1 h-1 rounded-full bg-amber-500"></div>
                          <span>{collection.verseCount} verses</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>

          {/* SEO Content */}
          <div className="mt-16 md:mt-20 max-w-4xl mx-auto">
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
