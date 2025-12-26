import { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Palette } from "lucide-react"
import { PageLayout } from "@/components/page-layout"
import { VerseCard } from "@/components/verse-card"
import { themes, themeSlugs } from "@/data/themes"
import { fetchThemeVerses } from "@/lib/esv-api"

interface PageProps {
  params: Promise<{ slug: string }>
}

// Generate static params for all themes at build time
export async function generateStaticParams() {
  return themeSlugs.map((slug) => ({ slug }))
}

// Generate metadata for each theme page
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const theme = themes[slug]

  if (!theme) {
    return {
      title: "Theme Not Found | QuoteGenerator"
    }
  }

  return {
    title: `${theme.title} | QuoteGenerator`,
    description: theme.description,
    keywords: theme.keywords,
    openGraph: {
      title: theme.title,
      description: theme.description,
      url: `https://quotegenerator.org/themes/${slug}`,
      siteName: "QuoteGenerator",
      type: "article",
    },
  }
}

// Fetch verses server-side at build time
async function getThemeVerses(slug: string) {
  const theme = themes[slug]

  if (!theme) {
    return null
  }

  // Fetch verses from ESV API
  const verses = await fetchThemeVerses(theme.references)

  return verses
}

export default async function ThemePage({ params }: PageProps) {
  const { slug } = await params
  const theme = themes[slug]

  if (!theme) {
    notFound()
  }

  // Fetch verses server-side
  const verses = await getThemeVerses(slug)

  return (
    <PageLayout showBreadcrumb={true}>
      <div className="min-h-screen bg-[#fdfbf7] dark:bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">

          {/* Back Button */}
          <Link
            href="/themes"
            className="inline-flex items-center gap-2 text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300 transition-colors mb-8 font-serif"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Themes</span>
          </Link>

          {/* Header */}
          <div className="text-center mb-12 md:mb-16">
            <div className={`inline-flex items-center justify-center w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br ${theme.gradient} rounded-2xl md:rounded-3xl mb-6 shadow-lg`}>
              <span className="text-4xl md:text-5xl">✝️</span>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-6xl font-serif font-bold text-amber-900 dark:text-amber-300 mb-4">
              Divine Bible Verses for <span className="text-amber-600 dark:text-amber-400">{theme.name}</span>
            </h1>
            <p className="text-base md:text-lg text-stone-600 dark:text-stone-400 max-w-2xl mx-auto leading-relaxed">
              {theme.description}
            </p>
            <p className="text-sm text-stone-500 dark:text-stone-500 mt-4">
              {verses?.length || theme.references.length} curated scriptures
            </p>
          </div>

          {/* Verses Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            {verses?.map((verse, index) => (
              <VerseCard
                key={`${verse.reference}-${index}`}
                reference={verse.reference}
                content={verse.content}
              />
            ))}
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
