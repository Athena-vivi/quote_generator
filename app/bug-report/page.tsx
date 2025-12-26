"use client"

import { useState, useEffect } from "react"
import { Bug, Send, CheckCircle, AlertTriangle, Globe, Monitor, Loader2 } from "lucide-react"
import { PageLayout } from "@/components/page-layout"

type SeverityLevel = "low" | "medium" | "high" | "critical"

interface BrowserInfo {
  userAgent: string
  platform: string
  language: string
  cookieEnabled: boolean
  screenWidth: number
  screenHeight: number
  windowWidth: number
  windowHeight: number
}

export default function BugReportPage() {
  const [browserInfo, setBrowserInfo] = useState<BrowserInfo | null>(null)

  useEffect(() => {
    setBrowserInfo({
      userAgent: navigator.userAgent,
      platform: navigator.platform,
      language: navigator.language,
      cookieEnabled: navigator.cookieEnabled,
      screenWidth: window.screen.width,
      screenHeight: window.screen.height,
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight,
    })
  }, [])

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    steps: "",
    expected: "",
    actual: "",
    severity: "medium" as SeverityLevel,
    email: ""
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const severityLevels: { value: SeverityLevel; label: string; color: string; description: string }[] = [
    { value: "low", label: "Low", color: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300", description: "Minor issue, doesn't affect usage" },
    { value: "medium", label: "Medium", color: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300", description: "Noticeable issue but workable" },
    { value: "high", label: "High", color: "bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300", description: "Significantly impacts usage" },
    { value: "critical", label: "Critical", color: "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300", description: "Completely blocks functionality" },
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500))

    setIsSubmitting(false)
    setIsSubmitted(true)

    // Reset after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false)
      setFormData({
        title: "",
        description: "",
        steps: "",
        expected: "",
        actual: "",
        severity: "medium",
        email: ""
      })
    }, 3000)
  }

  return (
    <PageLayout showBreadcrumb={true}>
      <div className="min-h-screen bg-[#fdfbf7] dark:bg-black">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">

          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br from-red-100 to-orange-100 dark:from-red-900/30 dark:to-orange-900/30 rounded-2xl md:rounded-3xl border border-red-200/50 dark:border-red-500/30 mb-6 shadow-lg">
              <Bug className="w-10 h-10 md:w-12 md:h-12 text-red-600 dark:text-red-400" />
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-amber-900 dark:text-amber-300 mb-4">
              Report a Bug
            </h1>
            <p className="text-base md:text-lg text-stone-600 dark:text-stone-400 max-w-2xl mx-auto leading-relaxed">
              Found an issue? Help us improve QuoteGenerator by reporting bugs. Please provide as much detail as possible.
            </p>
          </div>

          {/* Quick Tips */}
          <div className="bg-amber-50 dark:bg-amber-950/20 rounded-3xl p-6 md:p-8 border border-amber-200 dark:border-amber-500/20 shadow-sm mb-8">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 p-2 bg-amber-100 dark:bg-amber-900/40 rounded-lg">
                <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400" />
              </div>
              <div>
                <h3 className="font-serif font-semibold text-amber-900 dark:text-amber-300 mb-2">Before Reporting</h3>
                <ul className="space-y-1 text-sm text-stone-600 dark:text-stone-400">
                  <li>• Try refreshing the page or restarting your browser</li>
                  <li>• Check if the issue persists in incognito/private mode</li>
                  <li>• Try a different browser to see if the issue is browser-specific</li>
                  <li>• Clear your browser cache and cookies</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Bug Report Form */}
            <div className="lg:col-span-2">
              <div className="bg-white dark:bg-stone-900/60 rounded-3xl p-8 md:p-12 border border-amber-100 dark:border-amber-500/20 shadow-sm">
                {isSubmitted ? (
                  <div className="text-center py-12">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 rounded-full mb-6">
                      <CheckCircle className="w-10 h-10 text-green-600 dark:text-green-400" />
                    </div>
                    <h3 className="text-2xl font-serif font-semibold text-stone-800 dark:text-stone-200 mb-2">
                      Bug Report Submitted
                    </h3>
                    <p className="text-stone-600 dark:text-stone-400">
                      Thank you for helping us improve QuoteGenerator. We'll investigate this issue.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Title */}
                    <div>
                      <label htmlFor="title" className="block text-sm font-serif font-medium text-stone-700 dark:text-stone-300 mb-2">
                        Bug Title <span className="text-amber-600">*</span>
                      </label>
                      <input
                        type="text"
                        id="title"
                        value={formData.title}
                        onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                        required
                        className="w-full px-4 py-3 bg-stone-50 dark:bg-stone-800/50 border border-amber-200 dark:border-amber-500/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 dark:text-stone-200 transition-all"
                        placeholder="Brief description of the issue (e.g., 'Image generation fails on home page')"
                      />
                    </div>

                    {/* Severity */}
                    <div>
                      <label className="block text-sm font-serif font-medium text-stone-700 dark:text-stone-300 mb-2">
                        Severity Level
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {severityLevels.map((level) => (
                          <button
                            key={level.value}
                            type="button"
                            onClick={() => setFormData(prev => ({ ...prev, severity: level.value }))}
                            className={`px-3 py-2 rounded-lg text-xs font-medium border-2 transition-all ${
                              formData.severity === level.value
                                ? level.color + " border-current"
                                : "border-stone-200 dark:border-stone-700 text-stone-500 dark:text-stone-500 hover:border-stone-300"
                            }`}
                          >
                            {level.label}
                          </button>
                        ))}
                      </div>
                      <p className="text-xs text-stone-500 dark:text-stone-500 mt-2">
                        {severityLevels.find(l => l.value === formData.severity)?.description}
                      </p>
                    </div>

                    {/* Description */}
                    <div>
                      <label htmlFor="description" className="block text-sm font-serif font-medium text-stone-700 dark:text-stone-300 mb-2">
                        What happened? <span className="text-amber-600">*</span>
                      </label>
                      <textarea
                        id="description"
                        value={formData.description}
                        onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                        required
                        rows={4}
                        className="w-full px-4 py-3 bg-stone-50 dark:bg-stone-800/50 border border-amber-200 dark:border-amber-500/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 dark:text-stone-200 resize-none transition-all"
                        placeholder="Describe what happened..."
                      />
                    </div>

                    {/* Steps to Reproduce */}
                    <div>
                      <label htmlFor="steps" className="block text-sm font-serif font-medium text-stone-700 dark:text-stone-300 mb-2">
                        Steps to Reproduce <span className="text-amber-600">*</span>
                      </label>
                      <textarea
                        id="steps"
                        value={formData.steps}
                        onChange={(e) => setFormData(prev => ({ ...prev, steps: e.target.value }))}
                        required
                        rows={4}
                        className="w-full px-4 py-3 bg-stone-50 dark:bg-stone-800/50 border border-amber-200 dark:border-amber-500/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 dark:text-stone-200 resize-none transition-all font-mono text-sm"
                        placeholder="1. Go to...&#10;2. Click on...&#10;3. Scroll to...&#10;4. See error..."
                      />
                    </div>

                    {/* Expected vs Actual */}
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="expected" className="block text-sm font-serif font-medium text-stone-700 dark:text-stone-300 mb-2">
                          Expected Behavior
                        </label>
                        <textarea
                          id="expected"
                          value={formData.expected}
                          onChange={(e) => setFormData(prev => ({ ...prev, expected: e.target.value }))}
                          rows={3}
                          className="w-full px-4 py-3 bg-stone-50 dark:bg-stone-800/50 border border-amber-200 dark:border-amber-500/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 dark:text-stone-200 resize-none transition-all text-sm"
                          placeholder="What should have happened?"
                        />
                      </div>
                      <div>
                        <label htmlFor="actual" className="block text-sm font-serif font-medium text-stone-700 dark:text-stone-300 mb-2">
                          Actual Behavior
                        </label>
                        <textarea
                          id="actual"
                          value={formData.actual}
                          onChange={(e) => setFormData(prev => ({ ...prev, actual: e.target.value }))}
                          rows={3}
                          className="w-full px-4 py-3 bg-stone-50 dark:bg-stone-800/50 border border-amber-200 dark:border-amber-500/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 dark:text-stone-200 resize-none transition-all text-sm"
                          placeholder="What actually happened?"
                        />
                      </div>
                    </div>

                    {/* Email (Optional) */}
                    <div>
                      <label htmlFor="email" className="block text-sm font-serif font-medium text-stone-700 dark:text-stone-300 mb-2">
                        Email Address <span className="text-stone-400">(Optional)</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        value={formData.email}
                        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                        className="w-full px-4 py-3 bg-stone-50 dark:bg-stone-800/50 border border-amber-200 dark:border-amber-500/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 dark:text-stone-200 transition-all"
                        placeholder="your.email@example.com"
                      />
                      <p className="text-xs text-stone-500 dark:text-stone-500 mt-2">
                        Only provide your email if you'd like us to follow up on this issue.
                      </p>
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3 bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white font-serif font-semibold rounded-xl shadow-md hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          <span>Submitting...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5" />
                          <span>Submit Bug Report</span>
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>

            {/* System Info Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              {/* Browser Info */}
              <div className="bg-white dark:bg-stone-900/60 rounded-2xl p-6 border border-amber-100 dark:border-amber-500/20 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <Globe className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  <h3 className="font-serif font-semibold text-stone-800 dark:text-stone-200">Browser Info</h3>
                </div>
                {browserInfo ? (
                  <>
                    <div className="space-y-3 text-xs">
                      <div className="flex justify-between">
                        <span className="text-stone-500 dark:text-stone-500">Platform</span>
                        <span className="text-stone-700 dark:text-stone-300 font-mono">{browserInfo.platform}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-stone-500 dark:text-stone-500">Language</span>
                        <span className="text-stone-700 dark:text-stone-300 font-mono">{browserInfo.language}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-stone-500 dark:text-stone-500">Cookies</span>
                        <span className={`font-mono ${browserInfo.cookieEnabled ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}>
                          {browserInfo.cookieEnabled ? "Enabled" : "Disabled"}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-stone-500 dark:text-stone-500">Window</span>
                        <span className="text-stone-700 dark:text-stone-300 font-mono">{browserInfo.windowWidth}×{browserInfo.windowHeight}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-stone-500 dark:text-stone-500">Screen</span>
                        <span className="text-stone-700 dark:text-stone-300 font-mono">{browserInfo.screenWidth}×{browserInfo.screenHeight}</span>
                      </div>
                    </div>
                    <p className="text-xs text-stone-400 dark:text-stone-600 mt-4 pt-4 border-t border-stone-100 dark:border-stone-700">
                      This information will be included with your report automatically.
                    </p>
                  </>
                ) : (
                  <p className="text-xs text-stone-400 dark:text-stone-600">
                    Loading browser information...
                  </p>
                )}
              </div>

              {/* Common Bugs */}
              <div className="bg-white dark:bg-stone-900/60 rounded-2xl p-6 border border-amber-100 dark:border-amber-500/20 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                  <h3 className="font-serif font-semibold text-stone-800 dark:text-stone-200">Common Issues</h3>
                </div>
                <ul className="space-y-3 text-sm text-stone-600 dark:text-stone-400">
                  <li>
                    <a href="/help" className="hover:text-amber-700 dark:hover:text-amber-300 transition-colors">
                      <strong>Image not generating?</strong>
                    </a>
                    <p className="text-xs mt-1">Check your internet connection and try refreshing.</p>
                  </li>
                  <li>
                    <a href="/help" className="hover:text-amber-700 dark:hover:text-amber-300 transition-colors">
                      <strong>Favorites disappeared?</strong>
                    </a>
                    <p className="text-xs mt-1">Favorites are stored locally. Clearing browser data removes them.</p>
                  </li>
                  <li>
                    <a href="/help" className="hover:text-amber-700 dark:hover:text-amber-300 transition-colors">
                      <strong>Page looks broken?</strong>
                    </a>
                    <p className="text-xs mt-1">Try clearing cache or using a different browser.</p>
                  </li>
                </ul>
              </div>

              {/* Still Need Help */}
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20 rounded-2xl p-6 border border-blue-200 dark:border-blue-500/20">
                <h3 className="font-serif font-semibold text-blue-900 dark:text-blue-300 mb-3">Need Immediate Help?</h3>
                <p className="text-sm text-stone-600 dark:text-stone-400 mb-4">
                  Check our Help Center for solutions to common problems.
                </p>
                <a
                  href="/help"
                  className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline"
                >
                  Visit Help Center →
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </PageLayout>
  )
}
