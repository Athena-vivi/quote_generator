import { PageLayout } from "@/components/page-layout"
import { FavoritesManager } from "@/components/favorites-manager"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "My Favorite Quotes - QuoteGenerator",
  description: "View and manage your favorite Bible quotes. Create beautiful AI-generated art from your saved scriptures.",
}

export default function FavoritesPage() {
  return (
    <PageLayout>
      <div className="max-w-4xl mx-auto py-8 px-4">
        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-amber-900 dark:text-amber-300 mb-3" style={{ letterSpacing: '0.12em' }}>
            My Favorite Quotes
          </h1>
          <p className="text-lg text-stone-600 dark:text-stone-400 font-serif">
            Your personal collection of cherished Scriptures
          </p>
        </div>

        {/* Favorites Manager */}
        <FavoritesManager />
      </div>
    </PageLayout>
  )
}
