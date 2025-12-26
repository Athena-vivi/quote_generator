"use client"

import { useState } from "react"
import { Metadata } from "next"
import { Mail, MessageSquare, Send, CheckCircle, Clock, User, FileText, Bug } from "lucide-react"
import { PageLayout } from "@/components/page-layout"

// This is a client component, but we'll add metadata via a separate approach
export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

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
      setFormData({ name: "", email: "", subject: "", message: "" })
    }, 3000)
  }

  return (
    <PageLayout showBreadcrumb={true}>
      <div className="min-h-screen bg-[#fdfbf7] dark:bg-black">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">

          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br from-blue-100 to-cyan-100 dark:from-blue-900/30 dark:to-cyan-900/30 rounded-2xl md:rounded-3xl border border-blue-200/50 dark:border-blue-500/30 mb-6 shadow-lg">
              <Mail className="w-10 h-10 md:w-12 md:h-12 text-blue-600 dark:text-blue-400" />
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-amber-900 dark:text-amber-300 mb-4">
              Get in <span className="text-blue-600 dark:text-blue-400">Touch</span>
            </h1>
            <p className="text-base md:text-lg text-stone-600 dark:text-stone-400 max-w-2xl mx-auto leading-relaxed">
              We'd love to hear from you. Whether you have questions, feedback, or just want to share how QuoteGenerator has blessed your spiritual journey.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 mb-12">
            {/* Contact Options */}
            <div className="lg:col-span-1 space-y-6">
              {/* Email */}
              <div className="bg-white dark:bg-stone-900/60 rounded-2xl p-6 border border-amber-100 dark:border-amber-500/20 shadow-sm">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900/40 rounded-lg">
                    <Mail className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="font-serif font-semibold text-stone-800 dark:text-stone-200">Email Us</h3>
                </div>
                <a
                  href="mailto:Athena1592025@outlook.com"
                  className="text-sm text-blue-600 dark:text-blue-400 hover:underline break-all"
                >
                  Athena1592025@outlook.com
                </a>
                <p className="text-xs text-stone-500 dark:text-stone-500 mt-2">
                  We respond within 24-48 hours
                </p>
              </div>

              {/* Response Time */}
              <div className="bg-white dark:bg-stone-900/60 rounded-2xl p-6 border border-amber-100 dark:border-amber-500/20 shadow-sm">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-amber-100 dark:bg-amber-900/40 rounded-lg">
                    <Clock className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                  </div>
                  <h3 className="font-serif font-semibold text-stone-800 dark:text-stone-200">Response Time</h3>
                </div>
                <p className="text-sm text-stone-600 dark:text-stone-400">
                  Most inquiries are answered within 1-2 business days. Technical issues are prioritized.
                </p>
              </div>

              {/* Other Ways */}
              <div className="bg-white dark:bg-stone-900/60 rounded-2xl p-6 border border-amber-100 dark:border-amber-500/20 shadow-sm">
                <h3 className="font-serif font-semibold text-stone-800 dark:text-stone-200 mb-3">Other Ways to Reach Us</h3>
                <div className="space-y-2">
                  <a
                    href="/help"
                    className="flex items-center gap-2 text-sm text-stone-600 dark:text-stone-400 hover:text-amber-700 dark:hover:text-amber-300 transition-colors"
                  >
                    <FileText className="w-4 h-4" />
                    Help Center
                  </a>
                  <a
                    href="/feedback"
                    className="flex items-center gap-2 text-sm text-stone-600 dark:text-stone-400 hover:text-amber-700 dark:hover:text-amber-300 transition-colors"
                  >
                    <MessageSquare className="w-4 h-4" />
                    Send Feedback
                  </a>
                  <a
                    href="/bug-report"
                    className="flex items-center gap-2 text-sm text-stone-600 dark:text-stone-400 hover:text-amber-700 dark:hover:text-amber-300 transition-colors"
                  >
                    <Bug className="w-4 h-4" />
                    Report a Bug
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-white dark:bg-stone-900/60 rounded-3xl p-8 md:p-12 border border-amber-100 dark:border-amber-500/20 shadow-sm">
                <h2 className="text-2xl font-serif font-bold text-amber-900 dark:text-amber-300 mb-6">Send Us a Message</h2>

                {isSubmitted ? (
                  <div className="text-center py-12">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 rounded-full mb-6">
                      <CheckCircle className="w-10 h-10 text-green-600 dark:text-green-400" />
                    </div>
                    <h3 className="text-2xl font-serif font-semibold text-stone-800 dark:text-stone-200 mb-2">
                      Message Sent!
                    </h3>
                    <p className="text-stone-600 dark:text-stone-400">
                      Thank you for reaching out. We'll get back to you soon.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Name */}
                    <div>
                      <label htmlFor="name" className="block text-sm font-serif font-medium text-stone-700 dark:text-stone-300 mb-2">
                        Your Name <span className="text-amber-600">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-stone-50 dark:bg-stone-800/50 border border-amber-200 dark:border-amber-500/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 dark:text-stone-200 transition-all"
                        placeholder="John Doe"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label htmlFor="email" className="block text-sm font-serif font-medium text-stone-700 dark:text-stone-300 mb-2">
                        Email Address <span className="text-amber-600">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-stone-50 dark:bg-stone-800/50 border border-amber-200 dark:border-amber-500/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 dark:text-stone-200 transition-all"
                        placeholder="john@example.com"
                      />
                    </div>

                    {/* Subject */}
                    <div>
                      <label htmlFor="subject" className="block text-sm font-serif font-medium text-stone-700 dark:text-stone-300 mb-2">
                        Subject <span className="text-amber-600">*</span>
                      </label>
                      <select
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-stone-50 dark:bg-stone-800/50 border border-amber-200 dark:border-amber-500/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 dark:text-stone-200 transition-all"
                      >
                        <option value="">Select a topic</option>
                        <option value="general">General Inquiry</option>
                        <option value="feedback">Feedback & Suggestions</option>
                        <option value="technical">Technical Issue</option>
                        <option value="partnership">Partnership Inquiry</option>
                        <option value="esv">ESV Bible API Question</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    {/* Message */}
                    <div>
                      <label htmlFor="message" className="block text-sm font-serif font-medium text-stone-700 dark:text-stone-300 mb-2">
                        Message <span className="text-amber-600">*</span>
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={6}
                        className="w-full px-4 py-3 bg-stone-50 dark:bg-stone-800/50 border border-amber-200 dark:border-amber-500/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 dark:text-stone-200 resize-none transition-all"
                        placeholder="How can we help you?"
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-serif font-semibold rounded-xl shadow-md hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          <span>Sending...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5" />
                          <span>Send Message</span>
                        </>
                      )}
                    </button>
                  </form>
                )}

                {/* Note */}
                {!isSubmitted && (
                  <div className="mt-6 p-4 bg-amber-50 dark:bg-amber-950/20 rounded-xl border border-amber-200 dark:border-amber-500/20">
                    <p className="text-xs text-stone-600 dark:text-stone-400">
                      <strong>Note:</strong> For technical issues or bug reports, please include details about your device, browser, and steps to reproduce the issue.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* ESV API Notice */}
          <div className="bg-blue-50 dark:bg-blue-950/20 rounded-2xl p-6 border border-blue-100 dark:border-blue-500/20">
            <p className="text-sm text-stone-600 dark:text-stone-400">
              <strong className="text-blue-900 dark:text-blue-300">About ESV Bible API:</strong> Scripture text provided by the ESV Bible API is copyrighted by Crossway Bibles.
              QuoteGenerator uses this text by permission. For questions about Bible translations or scripture accuracy,
              please visit <a href="https://www.esv.org" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">ESV.org</a>.
            </p>
          </div>

        </div>
      </div>
    </PageLayout>
  )
}
