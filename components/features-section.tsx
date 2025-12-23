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
      {/* Sacred Background - Reduced Saturation */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-50/15 via-white/40 to-amber-50/15"></div>
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-gradient-to-br from-amber-100/8 to-amber-50/8 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/3 left-1/4 w-80 h-80 bg-gradient-to-tr from-amber-50/8 to-amber-100/8 rounded-full blur-3xl"></div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header - Serif Typography */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-amber-900/80 mb-4">
            Grace & Features
          </h2>
          <p className="text-lg md:text-xl text-gray-600/90 font-light leading-relaxed max-w-4xl mx-auto">
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
                {/* Hover Glow Effect - Reduced Saturation */}
                <div className="absolute inset-0 bg-gradient-to-r from-amber-100/15 via-amber-50/15 to-amber-100/15 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-700 transform scale-95 group-hover:scale-100"></div>

                {/* Card - Enhanced Quality */}
                <div className="relative bg-white/60 backdrop-blur-xl border border-white/40 rounded-3xl p-5 shadow-[0_15px_40px_-15px_rgba(212,175,55,0.1)] hover:shadow-[0_20px_50px_-15px_rgba(212,175,55,0.15)] transform hover:-translate-y-2 transition-all duration-500 ring-1 ring-amber-200/20">
                  {/* Content */}
                  <div className="relative z-10">
                    {/* Icon & Title - Same Row */}
                    <div className="flex items-center gap-3 mb-3">
                      <div className="relative p-2.5 bg-white/80 backdrop-blur-sm rounded-xl border border-amber-100/40 shadow-md group-hover:shadow-lg transition-shadow duration-300">
                        <IconComponent className="w-5 h-5 text-amber-700 drop-shadow-[0_0_8px_rgba(212,175,55,0.3)]" />
                      </div>
                      <h3 className="text-lg font-serif font-bold text-gray-800 group-hover:text-gray-900 transition-colors duration-300">
                        {feature.title}
                      </h3>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-gray-600/90 leading-snug font-light group-hover:text-gray-700/90 transition-colors duration-300">
                      {feature.description}
                    </p>

                    {/* Hover Indicator - Amber */}
                    <div className="absolute top-5 right-5 w-2 h-2 bg-gradient-to-r from-amber-400 to-yellow-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                </div>

                {/* Floating Accent - Reduced Saturation */}
                {index % 3 === 0 && (
                  <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-amber-100/20 to-amber-50/20 rounded-full blur-xl pointer-events-none opacity-60"></div>
                )}
                {index % 3 === 1 && (
                  <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-br from-amber-50/20 to-amber-100/20 rounded-full blur-xl pointer-events-none opacity-60"></div>
                )}
                {index % 3 === 2 && (
                  <div className="absolute -top-4 -left-4 w-24 h-24 bg-gradient-to-br from-amber-50/20 to-amber-100/20 rounded-full blur-xl pointer-events-none opacity-60"></div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
