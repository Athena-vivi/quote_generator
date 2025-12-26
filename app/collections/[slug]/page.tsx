import { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Palette, Sun, Heart, Sparkles } from "lucide-react"
import { PageLayout } from "@/components/page-layout"
import { VerseCard } from "@/components/verse-card"

// Collection data
interface Collection {
  slug: string
  title: string
  subtitle: string
  description: string
  icon: string
  imageColor: string
  gradient: string
  longDescription: string
}

const collections: Record<string, Collection> = {
  "top-10-morning-prayers": {
    slug: "top-10-morning-prayers",
    title: "Top 10 Morning Prayers",
    subtitle: "Start Your Day with God",
    description: "Begin each morning with these powerful prayers to center your heart, seek God's guidance, and find peace for the day ahead.",
    icon: "Sun",
    imageColor: "from-amber-400 via-yellow-400 to-orange-400",
    gradient: "from-amber-400 to-amber-500",
    longDescription: "These morning prayers will help you start each day with purpose, gratitude, and divine connection. Whether you need strength, wisdom, or simply to acknowledge God's presence, these prayers will guide your heart."
  },
  "verses-for-hard-times": {
    slug: "verses-for-hard-times",
    title: "Verses for Hard Times",
    subtitle: "Strength in Difficult Seasons",
    description: "When life feels overwhelming, find comfort and hope in these scriptures. God's Word brings light to your darkest moments.",
    icon: "Heart",
    imageColor: "from-slate-500 via-gray-500 to-zinc-600",
    gradient: "from-slate-500 to-slate-600",
    longDescription: "In seasons of pain and uncertainty, these verses offer hope and remind you of God's unfailing love. Let these scriptures be your anchor when waves of life feel overwhelming."
  },
  "gratitude-journaling": {
    slug: "gratitude-journaling",
    title: "Gratitude Journaling",
    subtitle: "Thankful Hearts Collection",
    description: "Cultivate a heart of gratitude with these verses. Perfect for daily reflection and journaling God's blessings in your life.",
    icon: "Sparkles",
    imageColor: "from-emerald-400 via-green-400 to-teal-400",
    gradient: "from-emerald-400 to-teal-500",
    longDescription: "Gratitude transforms our perspective and opens our eyes to God's countless blessings. Use these verses for your daily journaling practice and cultivate a thankful heart."
  },
}

// Verses for each collection
const versesByCollection: Record<string, Array<{ reference: string; content: string }>> = {
  "top-10-morning-prayers": [
    { reference: "Psalm 143:8", content: "Let me hear in the morning of your steadfast love, for in you I trust. Make me know the way I should go, for to you I lift up my soul." },
    { reference: "Psalm 5:3", content: "O LORD, in the morning you hear my voice; in the morning I prepare a sacrifice for you and watch." },
    { reference: "Lamentations 3:22-23", content: "The steadfast love of the LORD never ceases; his mercies are new every morning; great is your faithfulness." },
    { reference: "Psalm 90:14", content: "Satisfy us in the morning with your steadfast love, that we may rejoice and be glad all our days." },
    { reference: "Isaiah 26:9", content: "My soul yearns for you in the night; my spirit within me earnestly seeks you. For when your judgments are in the earth, the inhabitants of the world learn righteousness." },
    { reference: "Psalm 119:147", content: "I rise before dawn and cry for help; I hope in your words." },
    { reference: "Exodus 33:14", content: "And he said, 'My presence will go with you, and I will give you rest.'" },
    { reference: "Psalm 57:7-8", content: "My heart is steadfast, O God, my heart is steadfast! I will sing and make melody! Awake, my glory! Awake, O harp and lyre! I will awake the dawn!" },
    { reference: "Psalm 118:24", content: "This is the day that the LORD has made; let us rejoice and be glad in it." },
    { reference: "Mark 1:35", content: "And rising very early in the morning, while it was still dark, he departed and went out to a desolate place, and there he prayed." },
  ],
  "verses-for-hard-times": [
    { reference: "Psalm 34:18", content: "The LORD is near to the brokenhearted and saves the crushed in spirit." },
    { reference: "Isaiah 41:10", content: "Fear not, for I am with you; be not dismayed, for I am your God; I will strengthen you, I will help you, I will uphold you with my righteous right hand." },
    { reference: "Psalm 23:4", content: "Even though I walk through the valley of the shadow of death, I will fear no evil, for you are with me; your rod and your staff, they comfort me." },
    { reference: "Matthew 11:28", content: "Come to me, all who labor and are heavy laden, and I will give you rest." },
    { reference: "2 Corinthians 1:3-4", content: "Blessed be the God and Father of our Lord Jesus Christ, the Father of mercies and God of all comfort, who comforts us in all our affliction." },
    { reference: "Romans 8:28", content: "And we know that for those who love God all things work together for good, for those who are called according to his purpose." },
    { reference: "Psalm 46:1", content: "God is our refuge and strength, a very present help in trouble." },
    { reference: "Deuteronomy 31:8", content: "It is the LORD who goes before you. He will be with you; he will not leave you or forsake you. Do not fear or be dismayed." },
    { reference: "1 Peter 5:10", content: "And after you have suffered a little while, the God of all grace, who has called you to his eternal glory in Christ, will himself restore, confirm, strengthen, and establish you." },
    { reference: "Jeremiah 29:11", content: "For I know the plans I have for you, declares the LORD, plans for welfare and not for evil, to give you a future and a hope." },
  ],
  "gratitude-journaling": [
    { reference: "Psalm 107:1", content: "Oh give thanks to the LORD, for he is good, for his steadfast love endures forever!" },
    { reference: "1 Thessalonians 5:18", content: "Give thanks in all circumstances; for this is the will of God in Christ Jesus for you." },
    { reference: "Psalm 100:4", content: "Enter his gates with thanksgiving, and his courts with praise! Give thanks to him; bless his name!" },
    { reference: "Colossians 3:17", content: "And whatever you do, in word or deed, do everything in the name of the Lord Jesus, giving thanks to God the Father through him." },
    { reference: "Psalm 136:1", content: "Give thanks to the LORD, for he is good, for his steadfast love endures forever." },
    { reference: "Ephesians 5:20", content: "Giving thanks always and for everything to God the Father in the name of our Lord Jesus Christ." },
    { reference: "Philippians 4:6", content: "Do not be anxious about anything, but in everything by prayer and supplication with thanksgiving let your requests be made known to God." },
    { reference: "Psalm 118:1", content: "Oh give thanks to the LORD, for he is good; for his steadfast love endures forever!" },
    { reference: "James 1:17", content: "Every good gift and every perfect gift is from above, coming down from the Father of lights, with whom there is no variation or shadow due to change." },
    { reference: "Psalm 69:30", content: "I will praise the name of God with a song; I will magnify him with thanksgiving." },
  ],
}

interface PageProps {
  params: Promise<{ slug: string }>
}

// Generate metadata for SEO
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
    keywords: [collection.title.toLowerCase(), "bible verses", "scripture collection", "christian quotes", "daily devotion"],
    openGraph: {
      title: collection.title,
      description: collection.description,
      url: `https://quotegenerator.org/collections/${slug}`,
      siteName: "QuoteGenerator",
      type: "article",
    },
  }
}

export default async function CollectionPage({ params }: PageProps) {
  const { slug } = await params
  const collection = collections[slug]
  const verses = versesByCollection[slug]

  if (!collection || !verses) {
    notFound()
  }

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
                {verses.length} Scriptures
              </h2>
              <div className="text-sm text-stone-500 dark:text-stone-400">
                Click any verse to create divine art
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {verses.map((verse, index) => (
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
