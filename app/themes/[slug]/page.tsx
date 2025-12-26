import { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Palette } from "lucide-react"
import { PageLayout } from "@/components/page-layout"
import { VerseCard } from "@/components/verse-card"

// Theme data with icon mappings
interface Theme {
  slug: string
  name: string
  description: string
  icon: string
  gradient: string
}

const themes: Record<string, Theme> = {
  "verses-for-peace": {
    slug: "verses-for-peace",
    name: "Peace",
    description: "Find serenity in God's promises",
    icon: "Wind",
    gradient: "from-blue-400 to-cyan-300"
  },
  "verses-for-strength": {
    slug: "verses-for-strength",
    name: "Strength",
    description: "Draw power from scripture",
    icon: "Shield",
    gradient: "from-amber-500 to-orange-400"
  },
  "verses-for-love": {
    slug: "verses-for-love",
    name: "Love",
    description: "God's unconditional love for you",
    icon: "Heart",
    gradient: "from-rose-400 to-pink-300"
  },
  "verses-for-anxiety": {
    slug: "verses-for-anxiety",
    name: "Anxiety",
    description: "Calm your worried mind",
    icon: "CloudRain",
    gradient: "from-slate-400 to-gray-300"
  },
  "verses-for-healing": {
    slug: "verses-for-healing",
    name: "Healing",
    description: "Comfort for body and soul",
    icon: "Sparkles",
    gradient: "from-emerald-400 to-teal-300"
  },
  "verses-for-wisdom": {
    slug: "verses-for-wisdom",
    name: "Wisdom",
    description: "Guidance for life's decisions",
    icon: "BookOpen",
    gradient: "from-violet-400 to-purple-300"
  },
  "verses-for-success": {
    slug: "verses-for-success",
    name: "Success",
    description: "Blessings for prosperity",
    icon: "TrendingUp",
    gradient: "from-green-400 to-emerald-300"
  },
}

// Verse data for each theme
const versesByTheme: Record<string, Array<{ reference: string; content: string }>> = {
  "verses-for-peace": [
    { reference: "Philippians 4:7", content: "And the peace of God, which surpasses all understanding, will guard your hearts and your minds in Christ Jesus." },
    { reference: "John 14:27", content: "Peace I leave with you; my peace I give to you. Not as the world gives do I give to you. Let not your hearts be troubled, neither let them be afraid." },
    { reference: "Isaiah 26:3", content: "You keep him in perfect peace whose mind is stayed on you, because he trusts in you." },
    { reference: "Psalm 29:11", content: "The LORD gives strength to his people; the LORD blesses his people with peace." },
    { reference: "Colossians 3:15", content: "And let the peace of Christ rule in your hearts, to which indeed you were called in one body." },
    { reference: "2 Thessalonians 3:16", content: "Now may the Lord of peace himself give you peace at all times in every way." },
  ],
  "verses-for-strength": [
    { reference: "Philippians 4:13", content: "I can do all things through him who strengthens me." },
    { reference: "Isaiah 41:10", content: "Fear not, for I am with you; be not dismayed, for I am your God; I will strengthen you, I will help you, I will uphold you with my righteous right hand." },
    { reference: "Ephesians 6:10", content: "Finally, be strong in the Lord and in the strength of his might." },
    { reference: "2 Timothy 1:7", content: "For God gave us a spirit not of fear but of power and love and self-control." },
    { reference: "Deuteronomy 31:6", content: "Be strong and courageous. Do not fear or be in dread of them, for it is the LORD your God who goes with you." },
    { reference: "Psalm 46:1", content: "God is our refuge and strength, a very present help in trouble." },
  ],
  "verses-for-love": [
    { reference: "John 3:16", content: "For God so loved the world, that he gave his only Son, that whoever believes in him should not perish but have eternal life." },
    { reference: "1 Corinthians 13:4-7", content: "Love is patient and kind; love does not envy or boast; it is not arrogant or rude. It does not insist on its own way; it is not irritable or resentful." },
    { reference: "1 John 4:8", content: "Anyone who does not love does not know God, because God is love." },
    { reference: "Romans 8:38-39", content: "For I am sure that neither death nor life, nor angels nor rulers, nor things present nor things to come, nor powers, nor height nor depth... will be able to separate us from the love of God." },
    { reference: "Ephesians 3:17-19", content: "So that Christ may dwell in your hearts through faith—that you, being rooted and grounded in love, may have strength to comprehend... the breadth and length and height and depth of the love of Christ." },
  ],
  "verses-for-anxiety": [
    { reference: "Matthew 6:34", content: "Therefore do not be anxious about tomorrow, for tomorrow will be anxious for itself. Sufficient for the day is its own trouble." },
    { reference: "1 Peter 5:7", content: "Casting all your anxieties on him, because he cares for you." },
    { reference: "Psalm 23:4", content: "Even though I walk through the valley of the shadow of death, I will fear no evil, for you are with me; your rod and your staff, they comfort me." },
    { reference: "Matthew 11:28", content: "Come to me, all who labor and are heavy laden, and I will give you rest." },
    { reference: "Philippians 4:6", content: "Do not be anxious about anything, but in everything by prayer and supplication with thanksgiving let your requests be made known to God." },
  ],
  "verses-for-healing": [
    { reference: "Psalm 147:3", content: "He heals the brokenhearted and binds up their wounds." },
    { reference: "Isaiah 53:5", content: "But he was pierced for our transgressions; he was crushed for our iniquities; upon him was the chastisement that brought us peace, and with his wounds we are healed." },
    { reference: "Jeremiah 17:14", content: "Heal me, O LORD, and I shall be healed; save me, and I shall be saved, for you are my praise." },
    { reference: "Psalm 103:2-3", content: "Bless the LORD, O my soul, and forget not all his benefits, who forgives all your iniquity, who heals all your diseases." },
    { reference: "Revelation 21:4", content: "He will wipe away every tear from their eyes, and death shall be no more, neither shall there be mourning, nor crying, nor pain anymore." },
  ],
  "verses-for-wisdom": [
    { reference: "Proverbs 3:5-6", content: "Trust in the LORD with all your heart, and do not lean on your own understanding. In all your ways acknowledge him, and he will make straight your paths." },
    { reference: "James 1:5", content: "If any of you lacks wisdom, let him ask God, who gives generously to all without reproach, and it will be given him." },
    { reference: "Proverbs 9:10", content: "The fear of the LORD is the beginning of wisdom, and the knowledge of the Holy One is insight." },
    { reference: "Colossians 2:3", content: "In whom are hidden all the treasures of wisdom and knowledge." },
    { reference: "Ephesians 5:15-16", content: "Look carefully then how you walk, not as unwise but as wise, making the best use of the time, because the days are evil." },
  ],
  "verses-for-success": [
    { reference: "Joshua 1:8", content: "This Book of the Law shall not depart from your mouth, but you shall meditate on it day and night, so that you may be careful to do according to all that is written in it. For then you will make your way prosperous, and then you will have good success." },
    { reference: "3 John 1:2", content: "Beloved, I pray that all may go well with you and that you may be in good health, as it goes well with your soul." },
    { reference: "Psalm 1:1-3", content: "Blessed is the man who walks not in the counsel of the wicked... He is like a tree planted by streams of water that yields its fruit in its season." },
    { reference: "Proverbs 16:3", content: "Commit your work to the LORD, and your plans will be established." },
    { reference: "Deuteronomy 28:12", content: "The LORD will open to you his good treasury, the heavens, to give the rain of your land in its season and to bless all the work of your hands." },
  ],
}

interface PageProps {
  params: Promise<{ slug: string }>
}

// Generate metadata for SEO
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const theme = themes[slug]

  if (!theme) {
    return {
      title: "Theme Not Found | QuoteGenerator"
    }
  }

  return {
    title: `Divine Bible Verses for ${theme.name} | QuoteGenerator`,
    description: `Explore ${theme.name.toLowerCase()}: ${theme.description}. Beautiful scripture verses curated for ${theme.name.toLowerCase()}.`,
    keywords: [`${theme.name.toLowerCase()} bible verses`, `${theme.name.toLowerCase()} scriptures`, `bible quotes about ${theme.name.toLowerCase()}`, `christian ${theme.name.toLowerCase()}`],
    openGraph: {
      title: `Divine Bible Verses for ${theme.name}`,
      description: theme.description,
      url: `https://quotegenerator.org/themes/${slug}`,
      siteName: "QuoteGenerator",
      type: "website",
    },
  }
}

export default async function ThemePage({ params }: PageProps) {
  const { slug } = await params
  const theme = themes[slug]
  const verses = versesByTheme[slug]

  if (!theme || !verses) {
    notFound()
  }

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
              {verses.length} curated scriptures
            </p>
          </div>

          {/* Verses Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            {verses.map((verse, index) => (
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
