import { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Palette, Sun, Heart, Sparkles, LucideIcon } from "lucide-react"
import { PageLayout } from "@/components/page-layout"
import { VerseCard } from "@/components/verse-card"
import { collections, collectionSlugs } from "@/data/collections"
import { fetchThemeVerses } from "@/lib/esv-api"

interface PageProps {
  params: Promise<{ slug: string }>
}

// Generate static params for all collections at build time
export async function generateStaticParams() {
  return collectionSlugs.map((slug) => ({ slug }))
}

// Generate metadata for each collection page
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const collection = collections[slug]

  if (!collection) {
    return {
      title: "Collection Not Found | QuoteGenerator"
    }
  }

  return {
    title: `${collection.title} | QuoteGenerator`,
    description: collection.description,
    keywords: collection.keywords,
    openGraph: {
      title: collection.title,
      description: collection.description,
      url: `https://quotegenerator.org/collections/${slug}`,
      siteName: "QuoteGenerator",
      type: "article",
    },
  }
}

// Icon mapping from string to Lucide component
const iconMap: Record<string, LucideIcon> = {
  Sun,
  Heart,
  Sparkles,
}

export default async function CollectionPage({ params }: PageProps) {
  const { slug } = await params
  const collection = collections[slug]

  if (!collection) {
    notFound()
  }

  // Fetch verses from ESV API server-side at build time
  const verses = await fetchThemeVerses(collection.references)

  return (
    <PageLayout showBreadcrumb={true}>
      <div className="min-h-screen bg-[#fdfbf7] dark:bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">

          {/* Back Button */}
          <Link
            href="/collections"
            className="inline-flex items-center gap-2 text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300 transition-colors mb-8 font-serif"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Collections</span>
          </Link>

          {/* Header with Gradient Background */}
          <div className={`relative bg-gradient-to-br ${collection.imageColor} rounded-3xl p-8 md:p-12 mb-12 overflow-hidden`}>
            <div className="absolute inset-0 bg-black/20"></div>
            <div className="relative z-10">
              <div className="max-w-3xl">
                <div className="inline-flex items-center justify-center w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl mb-6">
                  <span className="text-3xl">✝️</span>
                </div>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-white mb-4 drop-shadow-lg">
                  {collection.title}
                </h1>
                <p className="text-xl text-white/90 font-medium mb-4 drop-shadow">
                  {collection.subtitle}
                </p>
                <p className="text-base md:text-lg text-white/80 leading-relaxed">
                  {collection.longDescription}
                </p>
              </div>
            </div>
          </div>

          {/* Verses Grid */}
          <div className="mb-16">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl md:text-3xl font-serif font-bold text-amber-900 dark:text-amber-300">
                {verses?.length || collection.references.length} Scriptures
              </h2>
              <div className="text-sm text-stone-500 dark:text-stone-400">
                Click any verse to create divine art
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {verses?.map((verse, index) => (
                <VerseCard
                  key={`${verse.reference}-${index}`}
                  reference={verse.reference}
                  content={verse.content}
                />
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center py-12">
            <div className="max-w-3xl mx-auto bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-950/30 dark:to-amber-900/20 rounded-3xl p-8 md:p-12 border border-amber-200 dark:border-amber-500/20">
              <h2 className="text-2xl md:text-3xl font-serif font-bold text-amber-900 dark:text-amber-300 mb-4">
                Create Your Divine Art
              </h2>
              <p className="text-stone-600 dark:text-stone-400 mb-6 leading-relaxed">
                Transform any verse above into beautiful AI-generated art. Click the "Create Divine Image" button to craft your unique scripture masterpiece.
              </p>
              <Link
                href="/"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-serif font-semibold rounded-xl shadow-md hover:shadow-lg transition-all"
              >
                <Palette className="w-5 h-5" />
                <span>Start Creating</span>
              </Link>
            </div>
          </div>

        </div>
      </div>
    </PageLayout>
  )
}
