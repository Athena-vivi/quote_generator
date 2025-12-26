"use client"

import { useState } from "react"
import { Metadata } from "next"
import { MessageSquare, Send, CheckCircle, Star, Smile, Meh, Frown, Lightbulb, Heart } from "lucide-react"
import { PageLayout } from "@/components/page-layout"

type FeedbackType = "general" | "bug" | "feature" | "content"

type FeedbackRating = "love" | "like" | "neutral" | "dislike"

export default function FeedbackPage() {
  const [feedbackType, setFeedbackType] = useState<FeedbackType>("general")
  const [rating, setRating] = useState<FeedbackRating | null>(null)
  const [formData, setFormData] = useState({
    email: "",
    message: ""
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

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
      setFormData({ email: "", message: "" })
      setRating(null)
      setFeedbackType("general")
    }, 3000)
  }

  const feedbackTypes: { value: FeedbackType; label: string; icon: any; description: string }[] = [
    { value: "general", label: "General Feedback", icon: MessageSquare, description: "Share your thoughts about QuoteGenerator" },
    { value: "feature", label: "Feature Request", icon: Lightbulb, description: "Suggest new features or improvements" },
    { value: "content", label: "Content Request", icon: Heart, description: "Request new themes or Bible verse collections" },
    { value: "bug", label: "Bug Report", icon: MessageSquare, description: "Report technical issues or problems" },
  ]

  const ratings: { value: FeedbackRating; icon: any; label: string; color: string }[] = [
    { value: "love", icon: Smile, label: "Love it!", color: "text-rose-500" },
    { value: "like", icon: Smile, label: "Like it", color: "text-green-500" },
    { value: "neutral", icon: Meh, label: "Neutral", color: "text-amber-500" },
    { value: "dislike", icon: Frown, label: "Dislike", color: "text-stone-500" },
  ]

  return (
    <PageLayout showBreadcrumb={true}>
      <div className="min-h-screen bg-[#fdfbf7] dark:bg-black">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">

          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-2xl md:rounded-3xl border border-purple-200/50 dark:border-purple-500/30 mb-6 shadow-lg">
              <MessageSquare className="w-10 h-10 md:w-12 md:h-12 text-purple-600 dark:text-purple-400" />
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-amber-900 dark:text-amber-300 mb-4">
              Send Feedback
            </h1>
            <p className="text-base md:text-lg text-stone-600 dark:text-stone-400 max-w-2xl mx-auto leading-relaxed">
              Your input helps us improve QuoteGenerator. Share your thoughts, suggestions, or ideas—we'd love to hear from you.
            </p>
          </div>

          {/* Feedback Type Selection */}
          <div className="bg-white dark:bg-stone-900/60 rounded-3xl p-8 md:p-12 border border-amber-100 dark:border-amber-500/20 shadow-sm mb-8">
            <h2 className="text-xl font-serif font-bold text-amber-900 dark:text-amber-300 mb-6">
              What type of feedback do you have?
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {feedbackTypes.map((type) => {
                const Icon = type.icon
                const isSelected = feedbackType === type.value
                return (
                  <button
                    key={type.value}
                    onClick={() => setFeedbackType(type.value)}
                    className={`p-4 rounded-xl border-2 text-left transition-all ${
                      isSelected
                        ? "border-amber-500 bg-amber-50 dark:bg-amber-950/20"
                        : "border-amber-100 dark:border-amber-500/20 hover:border-amber-300 dark:hover:border-amber-500/40"
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className={`p-2 rounded-lg ${isSelected ? "bg-amber-500" : "bg-stone-100 dark:bg-stone-800"}`}>
                        <Icon className={`w-5 h-5 ${isSelected ? "text-white" : "text-stone-500 dark:text-stone-400"}`} />
                      </div>
                      <span className={`font-serif font-semibold ${isSelected ? "text-amber-900 dark:text-amber-300" : "text-stone-700 dark:text-stone-300"}`}>
                        {type.label}
                      </span>
                    </div>
                    <p className="text-sm text-stone-500 dark:text-stone-500">
                      {type.description}
                    </p>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Overall Rating */}
          <div className="bg-white dark:bg-stone-900/60 rounded-3xl p-8 md:p-12 border border-amber-100 dark:border-amber-500/20 shadow-sm mb-8">
            <h2 className="text-xl font-serif font-bold text-amber-900 dark:text-amber-300 mb-6">
              How would you rate your experience?
            </h2>
            <div className="flex justify-center gap-4">
              {ratings.map((r) => {
                const Icon = r.icon
                const isSelected = rating === r.value
                return (
                  <button
                    key={r.value}
                    onClick={() => setRating(r.value)}
                    className={`flex flex-col items-center gap-2 p-4 rounded-xl transition-all ${
                      isSelected
                        ? "bg-amber-100 dark:bg-amber-950/30 scale-110"
                        : "hover:bg-stone-50 dark:hover:bg-stone-800"
                    }`}
                  >
                    <Icon className={`w-8 h-8 ${isSelected ? r.color : "text-stone-300 dark:text-stone-600"}`} />
                    <span className={`text-xs font-medium ${isSelected ? r.color : "text-stone-400 dark:text-stone-600"}`}>
                      {r.label}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Feedback Form */}
          <div className="bg-white dark:bg-stone-900/60 rounded-3xl p-8 md:p-12 border border-amber-100 dark:border-amber-500/20 shadow-sm">
            {isSubmitted ? (
              <div className="text-center py-12">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 rounded-full mb-6">
                  <CheckCircle className="w-10 h-10 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-2xl font-serif font-semibold text-stone-800 dark:text-stone-200 mb-2">
                  Thank You!
                </h3>
                <p className="text-stone-600 dark:text-stone-400">
                  Your feedback has been submitted. We appreciate you helping us improve QuoteGenerator.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-sm font-serif font-medium text-stone-700 dark:text-stone-300 mb-2">
                    Your Feedback <span className="text-amber-600">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                    required
                    rows={8}
                    className="w-full px-4 py-3 bg-stone-50 dark:bg-stone-800/50 border border-amber-200 dark:border-amber-500/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 dark:text-stone-200 resize-none transition-all"
                    placeholder={feedbackType === "feature"
                      ? "Describe the feature you'd like to see..."
                      : feedbackType === "bug"
                      ? "Describe the issue you encountered..."
                      : feedbackType === "content"
                      ? "What themes or verses would you like to see added?"
                      : "Share your thoughts, suggestions, or experiences..."
                    }
                  />
                  <p className="text-xs text-stone-500 dark:text-stone-500 mt-2">
                    Please be as specific as possible to help us understand your feedback.
                  </p>
                </div>

                {/* Email (Optional) */}
                <div>
                  <label htmlFor="email" className="block text-sm font-serif font-medium text-stone-700 dark:text-stone-300 mb-2">
                    Email Address <span className="text-stone-400">(Optional)</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full px-4 py-3 bg-stone-50 dark:bg-stone-800/50 border border-amber-200 dark:border-amber-500/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 dark:text-stone-200 transition-all"
                    placeholder="your.email@example.com"
                  />
                  <p className="text-xs text-stone-500 dark:text-stone-500 mt-2">
                    Only provide your email if you'd like us to follow up with you.
                  </p>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting || !formData.message.trim()}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-serif font-semibold rounded-xl shadow-md hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Submitting...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>Submit Feedback</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Other Ways to Contribute */}
          <div className="mt-8 p-6 bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-amber-950/20 dark:to-amber-900/10 rounded-2xl border border-amber-200 dark:border-amber-500/20">
            <h3 className="text-lg font-serif font-semibold text-amber-900 dark:text-amber-300 mb-3">
              Other Ways to Help
            </h3>
            <ul className="space-y-2 text-sm text-stone-600 dark:text-stone-400">
              <li className="flex items-start gap-2">
                <Star className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
                <span>Share QuoteGenerator with friends, family, or your church community</span>
              </li>
              <li className="flex items-start gap-2">
                <Star className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
                <span>Follow us on social media and share your created images</span>
              </li>
              <li className="flex items-start gap-2">
                <Star className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
                <span>Report bugs or issues you encounter so we can fix them</span>
              </li>
            </ul>
          </div>

          {/* Contact for Support */}
          <div className="mt-8 text-center">
            <p className="text-stone-600 dark:text-stone-400 text-sm">
              Need immediate help? <a href="/help" className="text-purple-600 dark:text-purple-400 hover:underline">Visit our Help Center</a> or <a href="/contact" className="text-purple-600 dark:text-purple-400 hover:underline">contact us</a>.
            </p>
          </div>

        </div>
      </div>
    </PageLayout>
  )
}
