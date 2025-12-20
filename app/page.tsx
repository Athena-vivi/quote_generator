import { FeaturesSection } from "@/components/features-section"
import { QuoteFinder } from "@/components/quote-finder"
import { DailyQuoteSection } from "@/components/daily-quote-section"
import { ExampleShowcase } from "@/components/example-showcase"
import { PageLayout } from "@/components/page-layout"
import { HashScrollToQuoteFinder } from "@/components/hash-scroll-to-quote-finder"

export default function HomePage() {
  return (
    <PageLayout showBreadcrumb={false}>
      <HashScrollToQuoteFinder />
      <div className="relative min-h-screen bg-gradient-to-br from-amber-50 via-cream-50 to-blue-50 overflow-hidden">
        {/* 背景装饰，移植自SEOOptimizedHero */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-amber-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
          <div className="absolute top-40 left-40 w-80 h-80 bg-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
        </div>
        {/* 主要内容 */}
        <div className="relative z-10">
          <h1 className="text-3xl md:text-5xl font-bold text-center text-gray-900 mt-8 mb-4">
            Transform Bible Quotes into <span className="bg-gradient-to-r from-amber-600 to-blue-600 bg-clip-text text-transparent">Beautiful Art</span>
          </h1>
          <DailyQuoteSection />
          <QuoteFinder />
          <ExampleShowcase />
          <FeaturesSection />
        </div>
      </div>
    </PageLayout>
  )
}
