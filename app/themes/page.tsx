import Link from "next/link"
import { Feather, Heart, Shield, Sun, Zap, Flower, Star, BookOpen } from "lucide-react"
import { PageLayout } from "@/components/page-layout"

const themes = [
  {
    slug: "verses-for-peace",
    title: "Verses for Peace",
    description: "Find comfort and serenity in God's word during difficult times",
    icon: Feather,
    color: "from-amber-500 to-yellow-500",
    verseCount: 8
  },
  {
    slug: "verses-for-strength",
    title: "Verses for Strength",
    description: "Draw courage and power from scripture when you feel weak",
    icon: Shield,
    color: "from-amber-600 to-yellow-600",
    verseCount: 10
  },
  {
    slug: "verses-for-encouragement",
    title: "Verses for Encouragement",
    description: "Uplifting words to inspire and motivate your daily walk",
    icon: Sun,
    color: "from-yellow-500 to-amber-500",
    verseCount: 12
  },
  {
    slug: "verses-for-healing",
    title: "Verses for Healing",
    description: "Scriptures for comfort and restoration in times of sickness",
    icon: Heart,
    color: "from-amber-400 to-amber-600",
    verseCount: 9
  },
  {
    slug: "verses-for-wisdom",
    title: "Verses for Wisdom",
    description: "Biblical guidance for making wise decisions in life",
    icon: Star,
    color: "from-amber-500 to-yellow-600",
    verseCount: 11
  },
  {
    slug: "verses-for-anxiety",
    title: "Verses for Anxiety",
    description: "Calm your worried mind with these reassuring scriptures",
    icon: Flower,
    color: "from-amber-600 to-yellow-700",
    verseCount: 7
  }
]

export const metadata = {
  title: "Explore Bible Themes - Scripture Collections by Topic",
  description: "Browse Bible verses organized by themes like peace, strength, encouragement, healing, wisdom, and more. Find the perfect scripture for any situation.",
  keywords: ["bible themes", "bible verses by topic", "scripture categories", "bible verse collections"]
}

export default function ThemesPage() {
  return (
    <PageLayout showBreadcrumb={true}>
      <div className="min-h-screen bg-background py-16 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-amber-100 to-yellow-100 dark:from-amber-500/20 dark:to-amber-600/20 rounded-3xl border border-amber-200/50 dark:border-amber-500/30 mb-6 shadow-lg">
              <BookOpen className="w-10 h-10 text-amber-600 dark:text-amber-400" />
            </div>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 dark:text-stone-100 mb-6">
              Explore <span className="text-amber-600 dark:text-amber-400">Bible Themes</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-stone-400 leading-relaxed max-w-3xl mx-auto font-light">
              Find scripture collections organized by life topics. Whether you're seeking peace, strength, encouragement,
              or wisdom, discover verses that speak to your heart.
            </p>
          </div>

          {/* Themes Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {themes.map((theme) => {
              const IconComponent = theme.icon
              return (
                <Link
                  key={theme.slug}
                  href={`/themes/${theme.slug}`}
                  className="group"
                >
                  <div className="relative h-full">
                    {/* Hover Glow */}
                    <div className="absolute inset-0 bg-gradient-to-r from-white/40 via-stone-50/40 to-white/40 dark:from-amber-500/5 dark:via-amber-600/5 dark:to-amber-500/5 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-700 transform scale-95 group-hover:scale-100"></div>

                    {/* Card */}
                    <div className="relative h-full bg-white/60 dark:bg-zinc-900/40 dark:backdrop-blur-md backdrop-blur-xl border border-white/40 dark:border-white/10 rounded-3xl p-6 shadow-[0_15px_40px_-15px_rgba(212,175,55,0.1)] dark:shadow-[0_0_30px_rgba(212,175,55,0.08)] hover:shadow-[0_20px_50px_-15px_rgba(212,175,55,0.15)] dark:hover:shadow-[0_0_40px_rgba(212,175,55,0.12)] transform hover:-translate-y-2 transition-all duration-500 ring-1 ring-amber-200/20 dark:ring-amber-500/10">
                      {/* Icon */}
                      <div className="relative p-3 bg-gradient-to-br from-amber-100/50 to-yellow-100/50 dark:from-amber-500/20 dark:to-amber-600/20 rounded-2xl border border-amber-200/30 dark:border-amber-500/30 shadow-md group-hover:shadow-lg transition-shadow duration-300 w-fit mb-4">
                        <div className={`absolute inset-0 bg-gradient-to-r ${theme.color} opacity-10 dark:opacity-20 rounded-2xl blur-md`}></div>
                        <IconComponent className="relative w-6 h-6 text-amber-700 dark:text-amber-400 drop-shadow-[0_0_8px_rgba(212,175,55,0.3)]" />
                      </div>

                      {/* Content */}
                      <h3 className="text-xl font-serif font-bold text-gray-800 dark:text-stone-200 group-hover:text-amber-800 dark:group-hover:text-amber-300 transition-colors duration-300 mb-2">
                        {theme.title}
                      </h3>
                      <p className="text-sm text-gray-600/90 dark:text-stone-400 leading-snug font-light mb-4">
                        {theme.description}
                      </p>

                      {/* Verse Count Badge */}
                      <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-stone-500">
                        <div className="w-1.5 h-1.5 bg-amber-500 rounded-full"></div>
                        <span>{theme.verseCount} verses</span>
                      </div>

                      {/* Hover Indicator */}
                      <div className="absolute top-6 right-6 w-2 h-2 bg-gradient-to-r from-amber-400 to-yellow-500 dark:from-amber-500 dark:to-amber-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>

          {/* More Coming Soon */}
          <div className="mt-16 text-center">
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-amber-50/50 dark:bg-amber-950/30 border border-amber-200/50 dark:border-amber-500/20 rounded-full">
              <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-gray-600 dark:text-stone-400">More themes coming soon...</span>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}
