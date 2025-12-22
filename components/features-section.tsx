import { Search, Palette, Share2, Calendar, Heart, Sparkles, Shield } from "lucide-react"

export function FeaturesSection() {
  const features = [
    {
      icon: Calendar,
      title: "Daily Divine Wisdom",
      description: "Receive sacred verses selected each day to uplift your spirit and guide your journey",
      gradient: "from-amber-400 to-yellow-500",
      bgGradient: "from-amber-100/20 to-yellow-100/20",
    },
    {
      icon: Search,
      title: "Sacred Scripture Search",
      description: "Find any biblical passage instantly with our intelligent search that understands your needs",
      gradient: "from-blue-400 to-indigo-500",
      bgGradient: "from-blue-100/20 to-indigo-100/20",
    },
    {
      icon: Heart,
      title: "Spiritual Emotional Match",
      description: "Discover verses that resonate with your heart's current state and spiritual journey",
      gradient: "from-red-400 to-pink-500",
      bgGradient: "from-red-100/20 to-pink-100/20",
    },
    {
      icon: Palette,
      title: "Divine Art Creation",
      description: "Transform sacred words into breathtaking visual masterpieces with AI-powered creativity",
      gradient: "from-purple-400 to-violet-500",
      bgGradient: "from-purple-100/20 to-violet-100/20",
    },
    {
      icon: Shield,
      title: "Premium Quality Export",
      description: "Download your creations in stunning 4K resolution perfect for any sacred space",
      gradient: "from-green-400 to-teal-500",
      bgGradient: "from-green-100/20 to-teal-100/20",
    },
    {
      icon: Share2,
      title: "Faith Community Sharing",
      description: "Share divine inspiration with loved ones across all social platforms with one click",
      gradient: "from-orange-400 to-red-500",
      bgGradient: "from-orange-100/20 to-red-100/20",
    },
  ]

  return (
    <section className="relative py-32 px-6 sm:px-8 overflow-hidden">
      {/* Sacred Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-50/40 via-white/60 to-yellow-50/40"></div>
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-gradient-to-br from-amber-300/10 to-yellow-400/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/3 left-1/4 w-80 h-80 bg-gradient-to-tr from-yellow-300/10 to-amber-400/10 rounded-full blur-3xl"></div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-24">
          <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-br from-amber-700 via-orange-600 to-yellow-700 bg-clip-text text-transparent mb-8">
            Divine Instruments
          </h2>
          <p className="text-xl md:text-2xl text-gray-600/90 font-light leading-relaxed max-w-4xl mx-auto">
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
                {/* Hover Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-amber-400/20 via-yellow-500/20 to-amber-600/20 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-700 transform scale-95 group-hover:scale-100"></div>

                {/* Card */}
                <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-500">
                  {/* Background Gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.bgGradient} rounded-3xl opacity-50`}></div>

                  {/* Content */}
                  <div className="relative z-10">
                    {/* Icon */}
                    <div className="relative mb-6 inline-block">
                      <div className={`absolute inset-0 bg-gradient-to-r ${feature.gradient} rounded-2xl blur-lg opacity-60 group-hover:opacity-80 transition-opacity duration-300`}></div>
                      <div className="relative p-4 bg-white/80 backdrop-blur-sm rounded-2xl border border-white/40 shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                        <IconComponent className={`w-8 h-8 bg-gradient-to-r ${feature.gradient} bg-clip-text text-transparent`} />
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-gray-800 mb-4 group-hover:text-gray-900 transition-colors duration-300">
                      {feature.title}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-600/90 leading-relaxed font-light group-hover:text-gray-700/90 transition-colors duration-300">
                      {feature.description}
                    </p>

                    {/* Hover Indicator */}
                    <div className="absolute top-6 right-6 w-2 h-2 bg-gradient-to-r from-amber-400 to-yellow-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                </div>

                {/* Floating Accent */}
                {index % 3 === 0 && (
                  <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-amber-200/30 to-yellow-300/30 rounded-full blur-xl pointer-events-none opacity-60"></div>
                )}
                {index % 3 === 1 && (
                  <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-br from-blue-200/30 to-indigo-300/30 rounded-full blur-xl pointer-events-none opacity-60"></div>
                )}
                {index % 3 === 2 && (
                  <div className="absolute -top-4 -left-4 w-24 h-24 bg-gradient-to-br from-purple-200/30 to-violet-300/30 rounded-full blur-xl pointer-events-none opacity-60"></div>
                )}
              </div>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-24">
          <div className="relative inline-block">
            <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-yellow-500 rounded-2xl blur-lg opacity-60"></div>
            <button className="relative px-8 py-4 bg-gradient-to-r from-amber-600 to-yellow-600 text-white font-semibold rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
              <span className="flex items-center gap-3">
                <Sparkles className="w-5 h-5" />
                Begin Your Spiritual Journey
              </span>
            </button>
          </div>
          <p className="mt-6 text-gray-600/80 font-light">
            Join thousands of souls creating divine art daily
          </p>
        </div>
      </div>
    </section>
  )
}
