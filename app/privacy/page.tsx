import { Metadata } from "next"
import { Shield, Eye, Database, Cookie, Users, Trash2, Lock } from "lucide-react"
import { PageLayout } from "@/components/page-layout"

export const metadata: Metadata = {
  title: "Privacy Policy - QuoteGenerator",
  description: "Learn how QuoteGenerator protects your privacy. No account required, local storage only, ESV Bible API usage, and AI image generation details.",
  keywords: ["privacy policy", "data protection", "esv bible api privacy", "ai art generator privacy"],
}

export default function PrivacyPage() {
  const lastUpdated = "December 2024"

  return (
    <PageLayout showBreadcrumb={true}>
      <div className="min-h-screen bg-[#fdfbf7] dark:bg-black">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">

          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br from-emerald-100 to-teal-100 dark:from-emerald-900/30 dark:to-teal-900/30 rounded-2xl md:rounded-3xl border border-emerald-200/50 dark:border-emerald-500/30 mb-6 shadow-lg">
              <Shield className="w-10 h-10 md:w-12 md:h-12 text-emerald-600 dark:text-emerald-400" />
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-amber-900 dark:text-amber-300 mb-4">
              Privacy Policy
            </h1>
            <p className="text-base md:text-lg text-stone-600 dark:text-stone-400 max-w-2xl mx-auto leading-relaxed">
              Your privacy is sacred to us. Here's how we protect your personal information and spiritual journey.
            </p>
            <p className="text-sm text-stone-500 dark:text-stone-500 mt-4">
              Last updated: {lastUpdated}
            </p>
          </div>

          {/* Overview */}
          <div className="bg-white dark:bg-stone-900/60 rounded-3xl p-8 md:p-12 border border-amber-100 dark:border-amber-500/20 shadow-sm mb-8">
            <h2 className="text-2xl font-serif font-bold text-amber-900 dark:text-amber-300 mb-6 flex items-center gap-3">
              <Eye className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
              Our Privacy Commitment
            </h2>
            <div className="prose prose-stone dark:prose-invert max-w-none">
              <p className="text-stone-600 dark:text-stone-400 leading-relaxed mb-4">
                At QuoteGenerator, we believe that <strong>privacy is a fundamental right</strong>. We've designed our platform
                with privacy-first principles from the ground up. Unlike many platforms, we don't require accounts,
                don't track your behavior, and don't sell your data to third parties.
              </p>
              <div className="grid sm:grid-cols-2 gap-4 mt-6">
                <div className="flex items-start gap-3 p-4 bg-emerald-50 dark:bg-emerald-950/20 rounded-xl">
                  <div className="p-2 bg-emerald-100 dark:bg-emerald-900/40 rounded-lg">
                    <Lock className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-stone-800 dark:text-stone-200 text-sm">No Account Required</h4>
                    <p className="text-xs text-stone-500 dark:text-stone-500">Use all features without signing up</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 bg-emerald-50 dark:bg-emerald-950/20 rounded-xl">
                  <div className="p-2 bg-emerald-100 dark:bg-emerald-900/40 rounded-lg">
                    <Database className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-stone-800 dark:text-stone-200 text-sm">Local Storage Only</h4>
                    <p className="text-xs text-stone-500 dark:text-stone-500">Your data stays on your device</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 bg-emerald-50 dark:bg-emerald-950/20 rounded-xl">
                  <div className="p-2 bg-emerald-100 dark:bg-emerald-900/40 rounded-lg">
                    <Shield className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-stone-800 dark:text-stone-200 text-sm">No Third-Party Tracking</h4>
                    <p className="text-xs text-stone-500 dark:text-stone-500">We don't sell your data</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 bg-emerald-50 dark:bg-emerald-950/20 rounded-xl">
                  <div className="p-2 bg-emerald-100 dark:bg-emerald-900/40 rounded-lg">
                    <Trash2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-stone-800 dark:text-stone-200 text-sm">Data Control</h4>
                    <p className="text-xs text-stone-500 dark:text-stone-500">Clear your data anytime</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Data Collection */}
          <div className="bg-white dark:bg-stone-900/60 rounded-3xl p-8 md:p-12 border border-amber-100 dark:border-amber-500/20 shadow-sm mb-8">
            <h2 className="text-2xl font-serif font-bold text-amber-900 dark:text-amber-300 mb-6 flex items-center gap-3">
              <Database className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              Information We Collect
            </h2>

            <div className="space-y-6">
              {/* Local Storage */}
              <div>
                <h3 className="text-lg font-serif font-semibold text-stone-800 dark:text-stone-200 mb-3">
                  Favorite Quotes (Local Storage)
                </h3>
                <p className="text-stone-600 dark:text-stone-400 text-sm leading-relaxed mb-3">
                  When you save verses to your collection, we store them in your browser's local storage.
                  This means:
                </p>
                <ul className="space-y-2 text-sm text-stone-600 dark:text-stone-400 ml-4">
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-600 dark:text-emerald-400 mt-1">✓</span>
                    <span>Data never leaves your device</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-600 dark:text-emerald-400 mt-1">✓</span>
                    <span>We don't have access to your saved verses</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-600 dark:text-emerald-400 mt-1">✓</span>
                    <span>Clearing browser data removes your favorites</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-600 dark:text-emerald-400 mt-1">✓</span>
                    <span>Each device/browser has separate storage</span>
                  </li>
                </ul>
              </div>

              {/* Contact Form */}
              <div className="pt-6 border-t border-amber-100 dark:border-amber-500/10">
                <h3 className="text-lg font-serif font-semibold text-stone-800 dark:text-stone-200 mb-3">
                  Contact Information (When You Reach Out)
                </h3>
                <p className="text-stone-600 dark:text-stone-400 text-sm leading-relaxed mb-3">
                  If you contact us via our contact form, we only receive what you choose to share:
                </p>
                <ul className="space-y-2 text-sm text-stone-600 dark:text-stone-400 ml-4">
                  <li className="flex items-start gap-2">
                    <span className="text-amber-600 dark:text-amber-400 mt-1">•</span>
                    <span>Name (if provided)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-600 dark:text-amber-400 mt-1">•</span>
                    <span>Email address (required for response)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-600 dark:text-amber-400 mt-1">•</span>
                    <span>Message content</span>
                  </li>
                </ul>
                <p className="text-xs text-stone-500 dark:text-stone-500 mt-3">
                  We use this information solely to respond to your inquiry. We don't add you to mailing lists or share your information.
                </p>
              </div>

              {/* Automatic Data */}
              <div className="pt-6 border-t border-amber-100 dark:border-amber-500/10">
                <h3 className="text-lg font-serif font-semibold text-stone-800 dark:text-stone-200 mb-3">
                  Automatic Data Collection
                </h3>
                <p className="text-stone-600 dark:text-stone-400 text-sm leading-relaxed">
                  Like all websites, our server may automatically collect basic technical information for security and analytics:
                  IP address, browser type, device type, and pages visited. This data is anonymized and used only to improve our service.
                </p>
              </div>
            </div>
          </div>

          {/* ESV Bible API */}
          <div className="bg-blue-50 dark:bg-blue-950/20 rounded-3xl p-8 md:p-12 border border-blue-200 dark:border-blue-500/20 shadow-sm mb-8">
            <h2 className="text-2xl font-serif font-bold text-blue-900 dark:text-blue-300 mb-6 flex items-center gap-3">
              <Users className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              ESV Bible API Usage
            </h2>
            <p className="text-stone-600 dark:text-stone-400 text-sm leading-relaxed mb-4">
              QuoteGenerator uses the <strong>ESV Bible API</strong> to fetch scripture text. This is how it works:
            </p>
            <div className="space-y-3 text-sm text-stone-600 dark:text-stone-400">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-blue-200 dark:bg-blue-900/40 rounded-full flex items-center justify-center text-xs font-bold text-blue-700 dark:text-blue-300">1</div>
                <p>When you select a verse or theme, our server makes a request to the ESV API</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-blue-200 dark:bg-blue-900/40 rounded-full flex items-center justify-center text-xs font-bold text-blue-700 dark:text-blue-300">2</div>
                <p>The ESV API returns the scripture text in JSON format</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-blue-200 dark:bg-blue-900/40 rounded-full flex items-center justify-center text-xs font-bold text-blue-700 dark:text-blue-300">3</div>
                <p>We display this text on our pages and use it in generated images</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-blue-200 dark:bg-blue-900/40 rounded-full flex items-center justify-center text-xs font-bold text-blue-700 dark:text-blue-300">4</div>
                <p>We include proper attribution to the ESV Bible on all generated content</p>
              </div>
            </div>
            <div className="mt-4 p-4 bg-white/50 dark:bg-black/20 rounded-xl">
              <p className="text-xs text-stone-600 dark:text-stone-400">
                <strong>Important:</strong> The ESV Bible text is copyrighted material. We use it by permission of Crossway Bibles.
                All generated images include the watermark "quotegenerator.org" and scripture references for proper attribution.
              </p>
            </div>
          </div>

          {/* AI Image Generation */}
          <div className="bg-purple-50 dark:bg-purple-950/20 rounded-3xl p-8 md:p-12 border border-purple-200 dark:border-purple-500/20 shadow-sm mb-8">
            <h2 className="text-2xl font-serif font-bold text-purple-900 dark:text-purple-300 mb-6 flex items-center gap-3">
              <Cookie className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              AI Image Generation
            </h2>
            <p className="text-stone-600 dark:text-stone-400 text-sm leading-relaxed mb-4">
              When you create an image with our AI-powered generator:
            </p>
            <ul className="space-y-2 text-sm text-stone-600 dark:text-stone-400 ml-4">
              <li className="flex items-start gap-2">
                <span className="text-purple-600 dark:text-purple-400 mt-1">•</span>
                <span>Image generation happens on our servers using AI services</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-600 dark:text-purple-400 mt-1">•</span>
                <span>We send your selected verse and theme preferences to generate the artwork</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-600 dark:text-purple-400 mt-1">•</span>
                <span>Generated images are downloaded to your device - we don't store them</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-600 dark:text-purple-400 mt-1">•</span>
                <span>We include a watermark on all images for brand attribution</span>
              </li>
            </ul>
          </div>

          {/* Cookies */}
          <div className="bg-white dark:bg-stone-900/60 rounded-3xl p-8 md:p-12 border border-amber-100 dark:border-amber-500/20 shadow-sm mb-8">
            <h2 className="text-2xl font-serif font-bold text-amber-900 dark:text-amber-300 mb-6 flex items-center gap-3">
              <Cookie className="w-6 h-6 text-amber-600 dark:text-amber-400" />
              Cookies & Local Storage
            </h2>
            <p className="text-stone-600 dark:text-stone-400 text-sm leading-relaxed mb-4">
              We use local storage (not cookies) to save your favorite verses:
            </p>
            <ul className="space-y-2 text-sm text-stone-600 dark:text-stone-400 ml-4">
              <li className="flex items-start gap-2">
                <span className="text-amber-600 dark:text-amber-400 mt-1">•</span>
                <span><strong>Local Storage:</strong> Stores your favorite quotes locally on your device</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-600 dark:text-amber-400 mt-1">•</span>
                <span><strong>Theme Preference:</strong> Remembers your light/dark mode choice</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-600 dark:text-amber-400 mt-1">•</span>
                <span><strong>No Tracking Cookies:</strong> We don't use third-party tracking cookies</span>
              </li>
            </ul>
            <p className="text-xs text-stone-500 dark:text-stone-500 mt-4">
              You can clear local storage anytime through your browser settings. This will remove your saved favorites.
            </p>
          </div>

          {/* Your Rights */}
          <div className="bg-white dark:bg-stone-900/60 rounded-3xl p-8 md:p-12 border border-amber-100 dark:border-amber-500/20 shadow-sm mb-8">
            <h2 className="text-2xl font-serif font-bold text-amber-900 dark:text-amber-300 mb-6 flex items-center gap-3">
              <Users className="w-6 h-6 text-rose-600 dark:text-rose-400" />
              Your Privacy Rights
            </h2>
            <p className="text-stone-600 dark:text-stone-400 text-sm leading-relaxed mb-4">
              You have complete control over your data:
            </p>
            <ul className="space-y-2 text-sm text-stone-600 dark:text-stone-400 ml-4">
              <li className="flex items-start gap-2">
                <span className="text-rose-600 dark:text-rose-400 mt-1">✓</span>
                <span><strong>Access:</strong> View your saved favorites anytime on the Favorites page</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-600 dark:text-rose-400 mt-1">✓</span>
                <span><strong>Delete:</strong> Remove individual favorites or clear all from your collection</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-600 dark:text-rose-400 mt-1">✓</span>
                <span><strong>Export:</strong> Download your generated images - they're yours to keep</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-600 dark:text-rose-400 mt-1">✓</span>
                <span><strong>Data Portability:</strong> Your images are downloaded locally - no platform lock-in</span>
              </li>
            </ul>
          </div>

          {/* Children's Privacy */}
          <div className="bg-amber-50 dark:bg-amber-950/20 rounded-3xl p-8 md:p-12 border border-amber-200 dark:border-amber-500/20 shadow-sm mb-8">
            <h2 className="text-2xl font-serif font-bold text-amber-900 dark:text-amber-300 mb-6">
              Children's Privacy
            </h2>
            <p className="text-stone-600 dark:text-stone-400 text-sm leading-relaxed">
              QuoteGenerator is suitable for all ages, including children. We do not knowingly collect personal information from children under 13.
              Since we don't require accounts and don't store personal data, children can safely use our platform under parental guidance.
            </p>
          </div>

          {/* Contact */}
          <div className="text-center">
            <p className="text-stone-600 dark:text-stone-400 text-sm">
              Questions about this privacy policy? <a href="/contact" className="text-amber-600 dark:text-amber-400 hover:underline">Contact us</a>.
            </p>
          </div>

        </div>
      </div>
    </PageLayout>
  )
}
