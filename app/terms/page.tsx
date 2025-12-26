import { Metadata } from "next"
import { FileText, Heart, Shield, AlertCircle, BookOpen, Download } from "lucide-react"
import { PageLayout } from "@/components/page-layout"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Terms of Service - QuoteGenerator",
  description: "QuoteGenerator's terms of service. Learn about your rights to generated content, ESV Bible usage, and AI image generation policies.",
  keywords: ["terms of service", "user rights", "esv bible terms", "ai generated content rights"],
}

export default function TermsPage() {
  const lastUpdated = "December 2024"

  return (
    <PageLayout showBreadcrumb={true}>
      <div className="min-h-screen bg-[#fdfbf7] dark:bg-black">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">

          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br from-amber-100 to-yellow-100 dark:from-amber-900/30 dark:to-amber-800/30 rounded-2xl md:rounded-3xl border border-amber-200/50 dark:border-amber-500/30 mb-6 shadow-lg">
              <FileText className="w-10 h-10 md:w-12 md:h-12 text-amber-600 dark:text-amber-400" />
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-amber-900 dark:text-amber-300 mb-4">
              Terms of Service
            </h1>
            <p className="text-base md:text-lg text-stone-600 dark:text-stone-400 max-w-2xl mx-auto leading-relaxed">
              Please read these terms carefully before using QuoteGenerator.
            </p>
            <p className="text-sm text-stone-500 dark:text-stone-500 mt-4">
              Last updated: {lastUpdated}
            </p>
          </div>

          {/* Agreement Notice */}
          <div className="bg-amber-50 dark:bg-amber-950/20 rounded-3xl p-8 md:p-12 border border-amber-200 dark:border-amber-500/20 shadow-sm mb-8">
            <p className="text-stone-700 dark:text-stone-300 text-sm leading-relaxed">
              By accessing or using QuoteGenerator, you agree to be bound by these Terms of Service and all applicable laws and regulations.
              If you do not agree with any of these terms, you are prohibited from using this service.
            </p>
          </div>

          {/* Your Content Rights */}
          <div className="bg-white dark:bg-stone-900/60 rounded-3xl p-8 md:p-12 border border-amber-100 dark:border-amber-500/20 shadow-sm mb-8">
            <h2 className="text-2xl font-serif font-bold text-amber-900 dark:text-amber-300 mb-6 flex items-center gap-3">
              <Heart className="w-6 h-6 text-rose-600 dark:text-rose-400" />
              Your Content, Your Rights
            </h2>
            <p className="text-stone-600 dark:text-stone-400 text-sm leading-relaxed mb-6">
              <strong className="text-amber-900 dark:text-amber-300">You own what you create.</strong> When you use QuoteGenerator to generate artwork,
              you retain full ownership of the images you create.
            </p>

            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="p-4 bg-emerald-50 dark:bg-emerald-950/20 rounded-xl border border-emerald-100 dark:border-emerald-500/10">
                <h4 className="font-semibold text-stone-800 dark:text-stone-200 mb-3 flex items-center gap-2">
                  <span className="text-emerald-600 dark:text-emerald-400">✓</span>
                  You CAN:
                </h4>
                <ul className="space-y-2 text-sm text-stone-600 dark:text-stone-400">
                  <li>• Share on social media</li>
                  <li>• Use for personal projects</li>
                  <li>• Use in ministries</li>
                  <li>• Modify and customize</li>
                  <li>• Print and distribute</li>
                  <li>• Use commercially</li>
                </ul>
              </div>
              <div className="p-4 bg-rose-50 dark:bg-rose-950/20 rounded-xl border border-rose-100 dark:border-rose-500/10">
                <h4 className="font-semibold text-stone-800 dark:text-stone-200 mb-3 flex items-center gap-2">
                  <span className="text-rose-600 dark:text-rose-400">✕</span>
                  You CANNOT:
                </h4>
                <ul className="space-y-2 text-sm text-stone-600 dark:text-stone-400">
                  <li>• Remove ESV attribution</li>
                  <li>• Claim scripture as your own</li>
                  <li>• Sell the Bible text itself</li>
                  <li>• Misquote scripture</li>
                </ul>
              </div>
            </div>

            <div className="p-4 bg-amber-50 dark:bg-amber-950/20 rounded-xl">
              <p className="text-xs text-stone-600 dark:text-stone-400">
                <strong>Note:</strong> Generated images include a "quotegenerator.org" watermark. You may remove this watermark for personal use,
                but we appreciate attribution when sharing publicly.
              </p>
            </div>
          </div>

          {/* ESV Bible Terms */}
          <div className="bg-blue-50 dark:bg-blue-950/20 rounded-3xl p-8 md:p-12 border border-blue-200 dark:border-blue-500/20 shadow-sm mb-8">
            <h2 className="text-2xl font-serif font-bold text-blue-900 dark:text-blue-300 mb-6 flex items-center gap-3">
              <BookOpen className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              ESV Bible Usage Terms
            </h2>
            <p className="text-stone-600 dark:text-stone-400 text-sm leading-relaxed mb-4">
              Scripture text is provided by the <strong>English Standard Version (ESV) Bible</strong>, copyrighted by Crossway Bibles,
              a publishing ministry of Good News Publishers.
            </p>

            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-stone-800 dark:text-stone-200 mb-2">Permission Granted</h4>
                <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
                  QuoteGenerator uses the ESV Bible API by permission. The ESV text may be quoted up to and inclusive of one thousand (1,000) verses
                  without express written permission of the publisher, provided that the verses quoted do not amount to a complete book of the Bible
                  nor do the verses quoted account for 50 percent or more of the total text of the work in which they are quoted.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-stone-800 dark:text-stone-200 mb-2">Attribution Required</h4>
                <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
                  All generated images include proper scripture references. When sharing ESV scripture text publicly, you should include attribution
                  such as "ESV" or "English Standard Version."
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-stone-800 dark:text-stone-200 mb-2">Commercial Use</h4>
                <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
                  The ESV text may not be quoted in any publication made available to the public by a Creative Commons license.
                  For commercial use beyond personal sharing, please review the full ESV usage policy at <a href="https://www.esv.org/usage/" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">ESV.org/usage</a>.
                </p>
              </div>
            </div>

            <div className="mt-6 p-4 bg-white/50 dark:bg-black/20 rounded-xl">
              <p className="text-xs text-stone-600 dark:text-stone-400">
                <strong>Important:</strong> The ESV Bible text is copyrighted material. QuoteGenerator provides this text by permission but does not
                grant you additional rights beyond what ESV permits. For questions about ESV usage, please contact Crossway directly.
              </p>
            </div>
          </div>

          {/* AI Generated Content */}
          <div className="bg-purple-50 dark:bg-purple-950/20 rounded-3xl p-8 md:p-12 border border-purple-200 dark:border-purple-500/20 shadow-sm mb-8">
            <h2 className="text-2xl font-serif font-bold text-purple-900 dark:text-purple-300 mb-6 flex items-center gap-3">
              <Download className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              AI-Generated Content
            </h2>
            <p className="text-stone-600 dark:text-stone-400 text-sm leading-relaxed mb-4">
              QuoteGenerator uses artificial intelligence to generate background images for Bible quotes. Please understand:
            </p>
            <ul className="space-y-2 text-sm text-stone-600 dark:text-stone-400 ml-4">
              <li className="flex items-start gap-2">
                <span className="text-purple-600 dark:text-purple-400 mt-1">•</span>
                <span>AI-generated images are created based on your theme and verse selection</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-600 dark:text-purple-400 mt-1">•</span>
                <span>Each image is unique and generated in real-time</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-600 dark:text-purple-400 mt-1">•</span>
                <span>We do not store generated images on our servers after you download them</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-600 dark:text-purple-400 mt-1">•</span>
                <span>You are responsible for how you use the generated content</span>
              </li>
            </ul>
            <p className="text-xs text-stone-500 dark:text-stone-500 mt-4">
              While AI strives to create appropriate imagery, we cannot guarantee that every generated image will perfectly match your expectations
              or be suitable for all purposes. Please review generated content before sharing.
            </p>
          </div>

          {/* Acceptable Use */}
          <div className="bg-white dark:bg-stone-900/60 rounded-3xl p-8 md:p-12 border border-amber-100 dark:border-amber-500/20 shadow-sm mb-8">
            <h2 className="text-2xl font-serif font-bold text-amber-900 dark:text-amber-300 mb-6 flex items-center gap-3">
              <Shield className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
              Acceptable Use Policy
            </h2>
            <p className="text-stone-600 dark:text-stone-400 text-sm leading-relaxed mb-4">
              By using QuoteGenerator, you agree to use this service responsibly:
            </p>

            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-stone-800 dark:text-stone-200 mb-2">You Agree NOT To:</h4>
                <ul className="space-y-2 text-sm text-stone-600 dark:text-stone-400 ml-4">
                  <li className="flex items-start gap-2">
                    <span className="text-rose-600 dark:text-rose-400 mt-1">✕</span>
                    <span>Use the service for any illegal purpose</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-rose-600 dark:text-rose-400 mt-1">✕</span>
                    <span>Modify Bible text to change its meaning</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-rose-600 dark:text-rose-400 mt-1">✕</span>
                    <span>Generate content that is offensive, hateful, or inappropriate</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-rose-600 dark:text-rose-400 mt-1">✕</span>
                    <span>Attempt to circumvent ESV API usage limitations</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-rose-600 dark:text-rose-400 mt-1">✕</span>
                    <span>Reverse engineer or attempt to extract our AI models</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-rose-600 dark:text-rose-400 mt-1">✕</span>
                    <span>Spam or abuse the service with excessive requests</span>
                  </li>
                </ul>
              </div>

              <div className="pt-4 border-t border-amber-100 dark:border-amber-500/10">
                <h4 className="font-semibold text-stone-800 dark:text-stone-200 mb-2">We Reserve The Right To:</h4>
                <ul className="space-y-2 text-sm text-stone-600 dark:text-stone-400 ml-4">
                  <li className="flex items-start gap-2">
                    <span className="text-amber-600 dark:text-amber-400 mt-1">•</span>
                    <span>Suspend service for violations of these terms</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-600 dark:text-amber-400 mt-1">•</span>
                    <span>Modify or discontinue features at any time</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-600 dark:text-amber-400 mt-1">•</span>
                    <span>Update these terms of service (users will be notified)</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Disclaimers */}
          <div className="bg-amber-50 dark:bg-amber-950/20 rounded-3xl p-8 md:p-12 border border-amber-200 dark:border-amber-500/20 shadow-sm mb-8">
            <h2 className="text-2xl font-serif font-bold text-amber-900 dark:text-amber-300 mb-6 flex items-center gap-3">
              <AlertCircle className="w-6 h-6 text-amber-600 dark:text-amber-400" />
              Disclaimers & Warranties
            </h2>
            <div className="space-y-4 text-sm text-stone-600 dark:text-stone-400">
              <p>
                <strong>Scripture Accuracy:</strong> While we strive for accuracy using the official ESV API, we cannot guarantee
                that all scripture text is error-free. Please verify important verses against your own Bible.
              </p>
              <p>
                <strong>Service Availability:</strong> QuoteGenerator is provided "as is" without warranties of any kind.
                We do not guarantee uninterrupted access or that the service will meet your specific requirements.
              </p>
              <p>
                <strong>AI Content:</strong> AI-generated images may not always be perfect or appropriate for every context.
                You are responsible for reviewing content before sharing or using it publicly.
              </p>
              <p>
                <strong>Translations:</strong> Scripture translations other than ESV may have different usage policies.
                Please review the specific translation's permissions before using commercially.
              </p>
            </div>
          </div>

          {/* Limitation of Liability */}
          <div className="bg-white dark:bg-stone-900/60 rounded-3xl p-8 md:p-12 border border-amber-100 dark:border-amber-500/20 shadow-sm mb-8">
            <h2 className="text-2xl font-serif font-bold text-amber-900 dark:text-amber-300 mb-6">
              Limitation of Liability
            </h2>
            <p className="text-stone-600 dark:text-stone-400 text-sm leading-relaxed">
              To the fullest extent permitted by law, QuoteGenerator and its creators shall not be liable for any indirect, incidental,
              special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other
              intangible losses, resulting from your access to or use of or inability to access or use the service.
            </p>
          </div>

          {/* Governing Law */}
          <div className="bg-white dark:bg-stone-900/60 rounded-3xl p-8 md:p-12 border border-amber-100 dark:border-amber-500/20 shadow-sm mb-8">
            <h2 className="text-2xl font-serif font-bold text-amber-900 dark:text-amber-300 mb-6">
              Governing Law
            </h2>
            <p className="text-stone-600 dark:text-stone-400 text-sm leading-relaxed">
              These terms shall be governed by and construed in accordance with applicable laws. Any disputes arising under these terms
              shall be subject to the exclusive jurisdiction of the courts in the applicable jurisdiction.
            </p>
          </div>

          {/* Changes to Terms */}
          <div className="bg-white dark:bg-stone-900/60 rounded-3xl p-8 md:p-12 border border-amber-100 dark:border-amber-500/20 shadow-sm mb-8">
            <h2 className="text-2xl font-serif font-bold text-amber-900 dark:text-amber-300 mb-6">
              Changes to These Terms
            </h2>
            <p className="text-stone-600 dark:text-stone-400 text-sm leading-relaxed">
              We reserve the right to modify these terms at any time. We will notify users of significant changes by updating the
              "Last updated" date at the top of this page. Your continued use of the service after such changes constitutes your
              acceptance of the new terms.
            </p>
          </div>

          {/* Contact */}
          <div className="text-center">
            <p className="text-stone-600 dark:text-stone-400 text-sm mb-4">
              Questions about these terms? <Link href="/contact" className="text-amber-600 dark:text-amber-400 hover:underline">Contact us</Link>.
            </p>
            <div className="inline-flex flex-col sm:flex-row gap-4">
              <Link
                href="/privacy"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white dark:bg-stone-800 border border-amber-200 dark:border-amber-500/20 text-amber-800 dark:text-amber-400 font-serif font-semibold rounded-xl hover:bg-amber-50 dark:hover:bg-stone-700 transition-all"
              >
                <Shield className="w-5 h-5" />
                Privacy Policy
              </Link>
              <Link
                href="/help"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-serif font-semibold rounded-xl shadow-md hover:shadow-lg transition-all"
              >
                <BookOpen className="w-5 h-5" />
                Help Center
              </Link>
            </div>
          </div>

        </div>
      </div>
    </PageLayout>
  )
}
