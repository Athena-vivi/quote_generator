import { SEOOptimizedHero } from "@/components/seo-optimized-hero"
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
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-cream-50 to-blue-50">
        <SEOOptimizedHero />
        <DailyQuoteSection />
        <ExampleShowcase />
        <QuoteFinder />
        <FeaturesSection />
      </div>
    </PageLayout>
  )
}
