import { FeaturesSection } from "@/components/features-section"
import { QuoteFinder } from "@/components/quote-finder"
import { DailyQuoteSection } from "@/components/daily-quote-section"
import { ExampleShowcase } from "@/components/example-showcase"
import { PageLayout } from "@/components/page-layout"
import { HashScrollToQuoteFinder } from "@/components/hash-scroll-to-quote-finder"
import { Sparkles, BookOpen } from "lucide-react"

export default function HomePage() {
  return (
    <PageLayout showBreadcrumb={false}>
      <HashScrollToQuoteFinder />

      {/* Enhanced Hero Section */}
      <section className="relative min-h-screen flex flex-col justify-center items-center px-6 sm:px-8 overflow-hidden">
        {/* Sacred Background with Divine Light Effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-amber-50/40 via-white/60 to-blue-50/30"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-100/20 via-transparent to-transparent"></div>

        {/* Floating Divine Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-amber-300/10 to-yellow-400/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-gradient-to-tr from-blue-300/10 to-purple-400/10 rounded-full blur-3xl animate-pulse animation-delay-2000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-amber-200/5 to-yellow-300/5 rounded-full blur-3xl"></div>
        </div>

        {/* Divine Light Rays */}
        <div className="absolute inset-0 pointer-events-none opacity-30">
          <div className="absolute top-0 left-1/4 w-1 h-full bg-gradient-to-b from-amber-400 to-transparent blur-sm"></div>
          <div className="absolute top-0 right-1/4 w-1 h-full bg-gradient-to-b from-yellow-400 to-transparent blur-sm animation-delay-1000"></div>
          <div className="absolute top-0 left-1/2 w-1 h-full bg-gradient-to-b from-amber-300 to-transparent blur-sm animation-delay-2000"></div>
        </div>

        <div className="relative z-10 text-center max-w-5xl mx-auto mt-20">
          {/* Main Heading with Divine Typography */}
          <h1 className="mb-8 leading-tight">
            <span className="block text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6 font-quote bg-gradient-to-r from-amber-700 via-yellow-600 to-amber-700 bg-clip-text text-transparent animate-shimmer">
              Transform
            </span>
            <span className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 bg-gradient-to-br from-amber-600 via-orange-600 to-amber-700 bg-clip-text text-transparent">
              Bible Quotes
            </span>
            <span className="block text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-700/80 mb-6">
              into
            </span>
            <span className="relative block text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold">
              <span className="absolute inset-0 bg-gradient-to-r from-amber-400 to-yellow-600 blur-lg opacity-60 animate-pulse"></span>
              <span className="relative bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-700 bg-clip-text text-transparent">
                Divine Art
              </span>
            </span>
          </h1>

          {/* Subtitle with Spiritual Message */}
          <p className="text-xl sm:text-2xl text-gray-600/90 max-w-3xl mx-auto leading-relaxed font-light mb-12">
            Experience the sacred beauty of Scripture through AI-generated masterpieces that touch the soul and inspire the heart
          </p>

          {/* Call to Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <button className="group relative px-8 py-4 bg-gradient-to-r from-amber-600 to-yellow-600 text-white font-semibold rounded-full shadow-xl hover:shadow-2xl hover:from-amber-700 hover:to-yellow-700 transform hover:scale-105 transition-all duration-300 text-lg">
              <span className="relative z-10 flex items-center gap-3">
                <Sparkles className="w-5 h-5 animate-pulse" />
                Create Divine Art
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-yellow-500 rounded-full blur-md opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
            </button>

            <button className="group px-8 py-4 bg-white/60 backdrop-blur-sm border border-amber-200/50 text-amber-700 font-semibold rounded-full shadow-lg hover:bg-white/80 hover:border-amber-300/70 transform hover:scale-105 transition-all duration-300 text-lg">
              <span className="flex items-center gap-3">
                <BookOpen className="w-5 h-5" />
                Explore Verses
              </span>
            </button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-amber-400/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-amber-400/80 rounded-full mt-2"></div>
          </div>
        </div>
      </section>

      {/* Daily Quote Section */}
      <section className="relative py-24 px-6 sm:px-8 bg-gradient-to-b from-white/50 to-amber-50/30">
        <DailyQuoteSection />
      </section>

      {/* Search Section */}
      <section className="relative py-24 px-6 sm:px-8 bg-gradient-to-br from-blue-50/30 via-white/50 to-purple-50/30">
        <QuoteFinder />
      </section>

      {/* Showcase Section */}
      <section className="relative py-24 px-6 sm:px-8 bg-gradient-to-br from-amber-50/40 via-white/60 to-yellow-50/40">
        <ExampleShowcase />
      </section>

      {/* Features Section */}
      <section className="relative py-24 px-6 sm:px-8 bg-gradient-to-b from-white/70 to-amber-50/50">
        <FeaturesSection />
      </section>
    </PageLayout>
  )
}
