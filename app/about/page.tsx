import { Metadata } from "next"
import { Heart, Sparkles, Users, Award, Mail, MessageSquare, BookOpen, Palette } from "lucide-react"
import { PageLayout } from "@/components/page-layout"
import Link from "next/link"

export const metadata: Metadata = {
  title: "About Us - QuoteGenerator",
  description: "Learn about QuoteGenerator's mission to help people share faith through beautiful Bible quote art powered by ESV Bible API and AI technology.",
  keywords: ["about quotegenerator", "bible quote generator", "esv bible api", "ai art generator"],
}

export default function AboutPage() {
  return (
    <PageLayout showBreadcrumb={true}>
      <div className="min-h-screen bg-[#fdfbf7] dark:bg-black">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">

          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br from-amber-100 to-yellow-100 dark:from-amber-900/30 dark:to-amber-800/30 rounded-2xl md:rounded-3xl border border-amber-200/50 dark:border-amber-500/30 mb-6 shadow-lg">
              <Heart className="w-10 h-10 md:w-12 md:h-12 text-amber-600 dark:text-amber-400" />
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-amber-900 dark:text-amber-300 mb-4">
              About <span className="text-amber-600 dark:text-amber-400">QuoteGenerator</span>
            </h1>
            <p className="text-base md:text-lg text-stone-600 dark:text-stone-400 max-w-2xl mx-auto leading-relaxed">
              Empowering believers to share God's Word through beautiful, AI-generated art that inspires faith and encourages others in their spiritual journey.
            </p>
          </div>

          {/* Mission */}
          <div className="bg-white dark:bg-stone-900/60 rounded-3xl p-8 md:p-12 border border-amber-100 dark:border-amber-500/20 shadow-sm mb-12">
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-amber-900 dark:text-amber-300 mb-6 flex items-center gap-3">
              <Heart className="w-6 h-6 text-rose-500" />
              Our Mission
            </h2>
            <p className="text-stone-600 dark:text-stone-400 leading-relaxed">
              At QuoteGenerator, we believe that God's Word has the power to transform lives. Our mission is to make it easier for believers to share the beauty and wisdom of Scripture through visually stunning, shareable content. By combining the timeless truth of the Bible with cutting-edge AI technology, we're helping people spread hope, encouragement, and faith across social media platforms worldwide.
            </p>
          </div>

          {/* What We Use */}
          <div className="bg-white dark:bg-stone-900/60 rounded-3xl p-8 md:p-12 border border-amber-100 dark:border-amber-500/20 shadow-sm mb-12">
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-amber-900 dark:text-amber-300 mb-8">What We Use</h2>

            <div className="grid md:grid-cols-2 gap-8">
              {/* ESV Bible API */}
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-2xl p-6 border border-blue-100 dark:border-blue-500/10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-blue-100 dark:bg-blue-900/40 rounded-xl">
                    <BookOpen className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="text-xl font-serif font-bold text-blue-900 dark:text-blue-300">ESV Bible API</h3>
                </div>
                <p className="text-stone-600 dark:text-stone-400 text-sm leading-relaxed">
                  We use the English Standard Version (ESV) Bible API to provide accurate, reliable scripture text. The ESV is known for its faithfulness to the original text, making it ideal for study and memorization.
                </p>
                <ul className="mt-4 space-y-2 text-sm text-stone-500 dark:text-stone-500">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">•</span>
                    <span>Official ESV API integration</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">•</span>
                    <span>30+ theme collections with curated verses</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">•</span>
                    <span>Accurate quotation with proper references</span>
                  </li>
                </ul>
              </div>

              {/* AI Image Generation */}
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl p-6 border border-purple-100 dark:border-purple-500/10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-purple-100 dark:bg-purple-900/40 rounded-xl">
                    <Palette className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <h3 className="text-xl font-serif font-bold text-purple-900 dark:text-purple-300">AI Image Generation</h3>
                </div>
                <p className="text-stone-600 dark:text-stone-400 text-sm leading-relaxed">
                  Our advanced AI technology creates unique, beautiful backgrounds that perfectly complement each Bible quote. Every image is generated in real-time with stunning artistic quality.
                </p>
                <ul className="mt-4 space-y-2 text-sm text-stone-500 dark:text-stone-500">
                  <li className="flex items-start gap-2">
                    <span className="text-purple-500 mt-1">•</span>
                    <span>Real-time AI-powered backgrounds</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-500 mt-1">•</span>
                    <span>Customizable fonts and themes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-500 mt-1">•</span>
                    <span>High-resolution image downloads</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* User Content Policy */}
          <div className="bg-amber-50 dark:bg-amber-950/20 rounded-3xl p-8 md:p-12 border border-amber-200 dark:border-amber-500/20 shadow-sm mb-12">
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-amber-900 dark:text-amber-300 mb-6 flex items-center gap-3">
              <Users className="w-6 h-6" />
              Your Content, Your Rights
            </h2>
            <div className="space-y-4 text-stone-600 dark:text-stone-400">
              <p className="leading-relaxed">
                <strong className="text-amber-900 dark:text-amber-300">You own what you create.</strong> When you generate artwork using QuoteGenerator, you retain full ownership of the generated images. You are free to:
              </p>
              <ul className="space-y-2 ml-4">
                <li className="flex items-start gap-2">
                  <span className="text-amber-600 dark:text-amber-400 mt-1">✓</span>
                  <span>Share on social media (Instagram, Facebook, WhatsApp, etc.)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-600 dark:text-amber-400 mt-1">✓</span>
                  <span>Use for personal projects, presentations, or ministries</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-600 dark:text-amber-400 mt-1">✓</span>
                  <span>Modify and customize as needed</span>
                </li>
              </ul>
              <p className="text-sm leading-relaxed mt-4">
                <strong>Note:</strong> The scripture text itself is from the ESV Bible, which is copyrighted material used by permission. All generated images include attribution to our platform.
              </p>
            </div>
          </div>

          {/* Values */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <div className="bg-white dark:bg-stone-900/60 rounded-2xl p-6 border border-amber-100 dark:border-amber-500/20 shadow-sm">
              <Award className="w-8 h-8 text-amber-600 dark:text-amber-400 mb-4" />
              <h3 className="text-xl font-serif font-bold text-stone-800 dark:text-stone-200 mb-2">Biblical Accuracy</h3>
              <p className="text-stone-600 dark:text-stone-400 text-sm">
                We present God's Word with complete accuracy and respect, using trusted translations and maintaining Scripture integrity.
              </p>
            </div>
            <div className="bg-white dark:bg-stone-900/60 rounded-2xl p-6 border border-amber-100 dark:border-amber-500/20 shadow-sm">
              <Sparkles className="w-8 h-8 text-purple-600 dark:text-purple-400 mb-4" />
              <h3 className="text-xl font-serif font-bold text-stone-800 dark:text-stone-200 mb-2">Innovation</h3>
              <p className="text-stone-600 dark:text-stone-400 text-sm">
                We continuously improve our AI technology to provide the best possible experience while staying true to our mission.
              </p>
            </div>
          </div>

          {/* Contact CTA */}
          <div className="text-center">
            <div className="inline-flex flex-col sm:flex-row gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-serif font-semibold rounded-xl shadow-md hover:shadow-lg transition-all"
              >
                <Mail className="w-5 h-5" />
                <span>Contact Us</span>
              </Link>
              <Link
                href="/help"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white dark:bg-stone-800 border border-amber-200 dark:border-amber-500/20 text-amber-800 dark:text-amber-400 font-serif font-semibold rounded-xl hover:bg-amber-50 dark:hover:bg-stone-700 transition-all"
              >
                <MessageSquare className="w-5 h-5" />
                <span>Help Center</span>
              </Link>
            </div>
          </div>

        </div>
      </div>
    </PageLayout>
  )
}
