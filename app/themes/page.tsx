import Link from "next/link"
import { Metadata } from "next"
import {
  Feather, Heart, Shield, Sun, Flower, Star,
  BookOpen, Sparkles, Moon, Trees, Wind, Droplets
} from "lucide-react"
import { PageLayout } from "@/components/page-layout"

export const metadata: Metadata = {
  title: "Bible Themes - Scripture Quotes Collections by Topic | QuoteGenerator",
  description: "Explore Bible quotes by themes: Peace, Strength, Encouragement, Healing, Wisdom, and more. Find curated scripture collections for every life situation.",
  keywords: ["bible themes", "bible quotes by topic", "scripture collections", "bible verse collections", "daily bible verses"],
}

const themes = [
  {
    slug: "verses-for-peace",
    name: "Peace",
    description: "Find serenity in God's promises",
    icon: Feather,
    verseCount: 24,
    gradient: "from-blue-400 to-cyan-300"
  },
  {
    slug: "verses-for-strength",
    name: "Strength",
    description: "Draw power from scripture",
    icon: Shield,
    verseCount: 32,
    gradient: "from-amber-500 to-orange-400"
  },
  {
    slug: "verses-for-encouragement",
    name: "Encouragement",
    description: "Uplifting words for daily inspiration",
    icon: Sun,
    verseCount: 28,
    gradient: "from-yellow-400 to-amber-300"
  },
  {
    slug: "verses-for-healing",
    name: "Healing",
    description: "Comfort for body and soul",
    icon: Heart,
    verseCount: 20,
    gradient: "from-rose-400 to-pink-300"
  },
  {
    slug: "verses-for-wisdom",
    name: "Wisdom",
    description: "Guidance for life's decisions",
    icon: Star,
    verseCount: 26,
    gradient: "from-violet-400 to-purple-300"
  },
  {
    slug: "verses-for-anxiety",
    name: "Anxiety",
    description: "Calm your worried mind",
    icon: Flower,
    verseCount: 18,
    gradient: "from-green-400 to-emerald-300"
  },
  {
    slug: "verses-for-faith",
    name: "Faith",
    description: "Strengthen your belief",
    icon: Sparkles,
    verseCount: 30,
    gradient: "from-indigo-400 to-blue-300"
  },
  {
    slug: "verses-for-hope",
    name: "Hope",
    description: "Tomorrow's promises today",
    icon: Moon,
    verseCount: 22,
    gradient: "from-slate-400 to-gray-300"
  },
  {
    slug: "verses-for-gratitude",
    name: "Gratitude",
    description: "Thankful hearts rejoice",
    icon: Sun,
    verseCount: 16,
    gradient: "from-orange-400 to-amber-300"
  },
  {
    slug: "verses-for-protection",
    name: "Protection",
    description: "God's shield around you",
    icon: Shield,
    verseCount: 14,
    gradient: "from-teal-400 to-cyan-300"
  },
]

export default function ThemesPage() {
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
              Bible Quote <span className="text-amber-600 dark:text-amber-400">Themes</span>
            </h1>
            <p className="text-base md:text-lg text-stone-600 dark:text-stone-400 max-w-2xl mx-auto leading-relaxed">
              Explore scripture collections organized by life topics. Find the perfect verse for any moment.
            </p>
          </div>

          {/* Themes Grid - Responsive: 2 cols mobile, 4 cols tablet, 5 cols desktop */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4 lg:gap-5">
            {themes.map((theme) => {
              const IconComponent = theme.icon
              return (
                <Link
                  key={theme.slug}
                  href={`/themes/${theme.slug}`}
                  className="group"
                >
                  <div className="relative">
                    {/* Card */}
                    <div className="bg-white dark:bg-stone-900/60 rounded-2xl md:rounded-3xl p-4 md:p-6 border border-amber-100 dark:border-amber-500/20 shadow-sm hover:shadow-xl hover:shadow-amber-500/10 dark:hover:shadow-amber-500/5 transition-all duration-300 hover:-translate-y-1">

                      {/* Icon Circle */}
                      <div className={`flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-xl bg-gradient-to-br ${theme.gradient} mb-3 md:mb-4 shadow-md`}>
                        <IconComponent className="w-6 h-6 md:w-7 md:h-7 text-white" strokeWidth={2} />
                      </div>

                      {/* Theme Name */}
                      <h3 className="text-base md:text-lg font-serif font-bold text-stone-800 dark:text-stone-200 mb-1 group-hover:text-amber-700 dark:group-hover:text-amber-400 transition-colors">
                        {theme.name}
                      </h3>

                      {/* Description */}
                      <p className="text-xs md:text-sm text-stone-500 dark:text-stone-500 leading-snug line-clamp-2">
                        {theme.description}
                      </p>

                      {/* Verse Count */}
                      <div className="mt-3 md:mt-4 flex items-center gap-1.5 text-xs text-stone-400 dark:text-stone-600">
                        <div className="w-1.5 h-1.5 rounded-full bg-amber-500"></div>
                        <span>{theme.verseCount} verses</span>
                      </div>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>

          {/* Coming Soon */}
          <div className="mt-12 md:mt-16 text-center">
            <div className="inline-flex items-center gap-2 md:gap-3 px-4 md:px-6 py-2 md:py-3 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-500/20 rounded-full">
              <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-amber-500 rounded-full animate-pulse"></div>
              <span className="text-xs md:text-sm text-stone-600 dark:text-stone-400">More themes coming soon</span>
            </div>
          </div>

        </div>
      </div>
    </PageLayout>
  )
}
