import { Search, Palette, Share2, Feather, Shield } from "lucide-react"

export function FeaturesSection() {
  const features = [
    {
      icon: Feather,
      title: "Daily Divine Wisdom",
      description: "Receive sacred verses selected each day to uplift your spirit and guide your journey",
      gradient: "from-amber-500 to-yellow-600",
    },
    {
      icon: Search,
      title: "Sacred Scripture Search",
      description: "Find any biblical passage instantly with our intelligent search that understands your needs",
      gradient: "from-amber-600 to-yellow-600",
    },
    {
      icon: Feather,
      title: "Spiritual Emotional Match",
      description: "Discover verses that resonate with your heart's current state and spiritual journey",
      gradient: "from-amber-400 to-amber-600",
    },
    {
      icon: Palette,
      title: "Divine Art Creation",
      description: "Transform sacred words into breathtaking visual masterpieces with AI-powered creativity",
      gradient: "from-yellow-500 to-amber-600",
    },
    {
      icon: Shield,
      title: "Premium Quality Export",
      description: "Download your creations in stunning 4K resolution perfect for any sacred space",
      gradient: "from-amber-500 to-yellow-500",
    },
    {
      icon: Share2,
      title: "Faith Community Sharing",
      description: "Share divine inspiration with loved ones across all social platforms with one click",
      gradient: "from-amber-600 to-yellow-700",
    },
  ]

  return (
    <section className="relative py-10 px-6 sm:px-8 overflow-hidden">
      {/* Sacred Background - Clean White/Stone */}
      <div className="absolute inset-0 bg-gradient-to-br from-stone-50/40 via-white to-white dark:from-slate-950 dark:via-zinc-950 dark:to-zinc-950"></div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header - Serif Typography */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-amber-900/80 dark:text-amber-400 mb-4">
            Grace & Features
          </h2>
          <p className="text-lg md:text-xl text-gray-600/90 dark:text-stone-400 font-light leading-relaxed max-w-4xl mx-auto">
            Sacred tools and features designed to elevate your spiritual journey through visual scripture
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;

            return (
              <div
                key={index}
                className="group relative"
              >
                {/* Hover Glow Effect - Subtle White */}
                <div className="absolute inset-0 bg-gradient-to-r from-white/40 via-stone-50/40 to-white/40 dark:from-amber-500/5 dark:via-amber-600/5 dark:to-amber-500/5 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-700 transform scale-95 group-hover:scale-100"></div>

                {/* Card - Enhanced Quality */}
                <div className="relative bg-white/60 dark:bg-zinc-900/40 dark:backdrop-blur-md backdrop-blur-xl border border-white/40 dark:border-white/10 rounded-3xl p-5 shadow-[0_15px_40px_-15px_rgba(212,175,55,0.1)] dark:shadow-[0_0_30px_rgba(212,175,55,0.08)] hover:shadow-[0_20px_50px_-15px_rgba(212,175,55,0.15)] dark:hover:shadow-[0_0_40px_rgba(212,175,55,0.12)] transform hover:-translate-y-2 transition-all duration-500 ring-1 ring-amber-200/20 dark:ring-amber-500/10">
                  {/* Content */}
                  <div className="relative z-10">
                    {/* Icon & Title - Same Row */}
                    <div className="flex items-center gap-3 mb-3">
                      <div className="relative p-2.5 bg-white/80 dark:bg-zinc-900/50 backdrop-blur-sm rounded-xl border border-amber-100/40 dark:border-white/10 shadow-md group-hover:shadow-lg transition-shadow duration-300">
                        <div className="absolute inset-0 bg-amber-400/10 dark:bg-amber-500/10 rounded-xl blur-md"></div>
                        <IconComponent className="relative w-5 h-5 text-amber-700 dark:text-amber-400 drop-shadow-[0_0_8px_rgba(212,175,55,0.3)]" />
                      </div>
                      <h3 className="text-lg font-serif font-bold text-gray-800 dark:text-stone-200 group-hover:text-gray-900 dark:group-hover:text-stone-100 transition-colors duration-300">
                        {feature.title}
                      </h3>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-gray-600/90 dark:text-stone-400 leading-snug font-light group-hover:text-gray-700/90 dark:group-hover:text-stone-300 transition-colors duration-300">
                      {feature.description}
                    </p>

                    {/* Hover Indicator - Amber */}
                    <div className="absolute top-5 right-5 w-2 h-2 bg-gradient-to-r from-amber-400 to-yellow-500 dark:from-amber-500 dark:to-amber-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
