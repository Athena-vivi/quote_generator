import Link from "next/link"
import { BookOpen, Newspaper, FileText, Hash, FolderKanban } from "lucide-react"
import { PageLayout } from "@/components/page-layout"

const collections = [
  {
    slug: "short-bible-quotes",
    title: "Short Bible Quotes",
    description: "Concise, powerful scriptures perfect for memorization and quick inspiration",
    icon: FileText,
    color: "from-amber-500 to-yellow-600",
    type: "blog"
  },
  {
    slug: "inspirational-bible-verses",
    title: "Inspirational Bible Verses",
    description: "Uplifting scriptures to motivate and encourage your daily spiritual walk",
    icon: BookOpen,
    color: "from-amber-600 to-yellow-500",
    type: "blog"
  },
  {
    slug: "bible-quotes-about-love",
    title: "Bible Quotes About Love",
    description: "Discover God's perspective on love through these beautiful scriptures",
    icon: Heart,
    color: "from-amber-400 to-amber-600",
    type: "blog"
  },
  {
    slug: "bible-quotes-about-peace",
    title: "Bible Quotes About Peace",
    description: "Find comfort and tranquility in verses about God's perfect peace",
    icon: Newspaper,
    color: "from-yellow-500 to-amber-600",
    type: "blog"
  },
  {
    slug: "bible-quotes-for-anxiety",
    title: "Bible Quotes for Anxiety",
    description: "Calming scriptures to help overcome worry and find rest in God",
    icon: Sparkles,
    color: "from-amber-500 to-yellow-500",
    type: "blog"
  },
  {
    slug: "bible-quotes-for-encouragement",
    title: "Bible Quotes for Encouragement",
    description: "Words of hope and strength from Scripture for difficult times",
    icon: Sun,
    color: "from-amber-600 to-yellow-700",
    type: "blog"
  },
  {
    slug: "bible-quotes-for-healing",
    title: "Bible Quotes for Healing",
    description: "Comforting verses for those seeking physical and spiritual restoration",
    icon: Heart,
    color: "from-amber-500 to-amber-700",
    type: "blog"
  },
  {
    slug: "bible-quotes-about-strength",
    title: "Bible Quotes About Strength",
    description: "Scriptures that empower and remind us of God's mighty power",
    icon: Shield,
    color: "from-amber-600 to-yellow-600",
    type: "blog"
  }
]

export const metadata = {
  title: "Collections - Curated Bible Verse Resources",
  description: "Explore our curated collections of Bible verses, quotes, and inspirational resources. Find the perfect scripture for any occasion or topic.",
  keywords: ["bible verse collections", "curated bible quotes", "bible quote resources", "scripture compilations"]
}

// Import icons for the collections
import { Heart, Sparkles, Sun, Shield } from "lucide-react"

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  FileText,
  BookOpen,
  Heart,
  Newspaper,
  Sparkles,
  Sun,
  Shield
}

export default function CollectionsPage() {
  return (
    <PageLayout showBreadcrumb={true}>
      <div className="min-h-screen bg-background py-16 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-amber-100 to-yellow-100 dark:from-amber-500/20 dark:to-amber-600/20 rounded-3xl border border-amber-200/50 dark:border-amber-500/30 mb-6 shadow-lg">
              <FolderKanban className="w-10 h-10 text-amber-600 dark:text-amber-400" />
            </div>
            <h1 className="text-3xl md:text-5xl font-serif font-bold text-gray-900 dark:text-stone-100 mb-6">
              Scripture <span className="text-amber-600 dark:text-amber-400">Collections</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-stone-400 leading-relaxed max-w-3xl mx-auto font-light">
              Explore our curated collections of Bible verses organized by topic and theme.
              Find the perfect scripture for any occasion or life situation.
            </p>
          </div>

          {/* Quick Stats */}
          <div className="flex flex-wrap justify-center gap-8 mb-16">
            <div className="flex items-center gap-3 px-6 py-3 bg-white/60 dark:bg-zinc-900/40 dark:backdrop-blur-md backdrop-blur-xl border border-amber-100 dark:border-white/10 rounded-2xl">
              <div className="w-3 h-3 bg-amber-500 rounded-full"></div>
              <span className="text-sm font-medium text-gray-700 dark:text-stone-300">{collections.length} Collections</span>
            </div>
            <div className="flex items-center gap-3 px-6 py-3 bg-white/60 dark:bg-zinc-900/40 dark:backdrop-blur-md backdrop-blur-xl border border-amber-100 dark:border-white/10 rounded-2xl">
              <div className="w-3 h-3 bg-amber-500 rounded-full"></div>
              <span className="text-sm font-medium text-gray-700 dark:text-stone-300">100+ Verses</span>
            </div>
            <div className="flex items-center gap-3 px-6 py-3 bg-white/60 dark:bg-zinc-900/40 dark:backdrop-blur-md backdrop-blur-xl border border-amber-100 dark:border-white/10 rounded-2xl">
              <div className="w-3 h-3 bg-amber-500 rounded-full"></div>
              <span className="text-sm font-medium text-gray-700 dark:text-stone-300">SEO Optimized</span>
            </div>
          </div>

          {/* Collections Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {collections.map((collection) => {
              const IconComponent = iconMap[collection.icon] || FileText
              const href = `/blog/${collection.slug}`

              return (
                <Link
                  key={collection.slug}
                  href={href}
                  className="group"
                >
                  <div className="relative h-full">
                    {/* Hover Glow */}
                    <div className="absolute inset-0 bg-gradient-to-r from-white/40 via-stone-50/40 to-white/40 dark:from-amber-500/5 dark:via-amber-600/5 dark:to-amber-500/5 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-700 transform scale-95 group-hover:scale-100"></div>

                    {/* Card */}
                    <div className="relative h-full bg-white/60 dark:bg-zinc-900/40 dark:backdrop-blur-md backdrop-blur-xl border border-white/40 dark:border-white/10 rounded-3xl p-6 shadow-[0_15px_40px_-15px_rgba(212,175,55,0.1)] dark:shadow-[0_0_30px_rgba(212,175,55,0.08)] hover:shadow-[0_20px_50px_-15px_rgba(212,175,55,0.15)] dark:hover:shadow-[0_0_40px_rgba(212,175,55,0.12)] transform hover:-translate-y-2 transition-all duration-500 ring-1 ring-amber-200/20 dark:ring-amber-500/10">
                      {/* Icon */}
                      <div className="relative p-3 bg-gradient-to-br from-amber-100/50 to-yellow-100/50 dark:from-amber-500/20 dark:to-amber-600/20 rounded-2xl border border-amber-200/30 dark:border-amber-500/30 shadow-md group-hover:shadow-lg transition-shadow duration-300 w-fit mb-4">
                        <div className={`absolute inset-0 bg-gradient-to-r ${collection.color} opacity-10 dark:opacity-20 rounded-2xl blur-md`}></div>
                        <IconComponent className="relative w-6 h-6 text-amber-700 dark:text-amber-400 drop-shadow-[0_0_8px_rgba(212,175,55,0.3)]" />
                      </div>

                      {/* Content */}
                      <h3 className="text-xl font-serif font-bold text-gray-800 dark:text-stone-200 group-hover:text-amber-800 dark:group-hover:text-amber-300 transition-colors duration-300 mb-2">
                        {collection.title}
                      </h3>
                      <p className="text-sm text-gray-600/90 dark:text-stone-400 leading-snug font-light">
                        {collection.description}
                      </p>

                      {/* Type Badge */}
                      <div className="mt-4 flex items-center gap-2 text-xs text-gray-500 dark:text-stone-500">
                        <Hash className="w-3 h-3" />
                        <span>Article</span>
                      </div>

                      {/* Hover Indicator */}
                      <div className="absolute top-6 right-6 w-2 h-2 bg-gradient-to-r from-amber-400 to-yellow-500 dark:from-amber-500 dark:to-amber-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>

          {/* SEO Content Section */}
          <div className="mt-20 max-w-4xl mx-auto">
            <div className="bg-white/60 dark:bg-zinc-900/40 dark:backdrop-blur-md backdrop-blur-xl border border-amber-100 dark:border-white/10 rounded-3xl p-8 md:p-12">
              <h2 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 dark:text-stone-200 mb-6">
                Why Use Our Scripture Collections?
              </h2>
              <div className="space-y-4 text-gray-600 dark:text-stone-400 leading-relaxed">
                <p>
                  Our Bible verse collections are carefully curated to help you find exactly the scripture you need,
                  whether you're preparing a sermon, writing a devotional, or seeking personal encouragement.
                </p>
                <p>
                  Each collection focuses on a specific theme or topic, making it easy to discover relevant verses
                  that speak to your current situation. From finding peace in troubled times to drawing strength
                  from God's promises, our collections cover the most sought-after biblical themes.
                </p>
                <p>
                  Every verse includes options to quickly copy the text or create beautiful shareable images,
                  making it simple to spread God's word through social media, messaging apps, or personal reflection.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}
