"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import {
  Mail,
  MessageSquare,
  Phone,
  MapPin,
  Send,
  CheckCircle,
  Bug,
  Heart,
  HelpCircle,
  Shield,
  Scale,
  Users,
} from "lucide-react"
import { PageLayout } from "@/components/page-layout"

export default function ContactPage() {
  const searchParams = useSearchParams()
  const contactType = searchParams.get("type")

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    type: contactType || "general",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  // Set initial form data based on URL parameters
  useEffect(() => {
    if (contactType) {
      const subjects = {
        feedback: "Feature Request / Feedback",
        bug: "Bug Report",
        partnership: "Partnership Inquiry",
        privacy: "Privacy Policy Question",
        legal: "Legal / Terms Question",
        general: "General Inquiry",
      }

      const messages = {
        feedback: "I'd like to share some feedback about QuoteGenerator:\n\n",
        bug: "I encountered an issue while using QuoteGenerator:\n\nSteps to reproduce:\n1. \n2. \n3. \n\nExpected behavior:\n\nActual behavior:\n\nBrowser/Device info:\n",
        partnership: "I'm interested in partnering with QuoteGenerator:\n\n",
        privacy: "I have a question about QuoteGenerator's privacy policy:\n\n",
        legal: "I have a legal question regarding QuoteGenerator's terms of service:\n\n",
        general: "",
      }

      setFormData((prev) => ({
        ...prev,
        type: contactType,
        subject: subjects[contactType as keyof typeof subjects] || subjects.general,
        message: messages[contactType as keyof typeof messages] || messages.general,
      }))
    }
  }, [contactType])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsSubmitted(true)
    setIsSubmitting(false)

    // Reset form after successful submission
    setTimeout(() => {
      setFormData({ name: "", email: "", subject: "", message: "", type: "general" })
      setIsSubmitted(false)
    }, 5000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "feedback":
        return <Heart className="w-5 h-5 text-pink-500" />
      case "bug":
        return <Bug className="w-5 h-5 text-red-500" />
      case "partnership":
        return <Users className="w-5 h-5 text-blue-500" />
      case "privacy":
        return <Shield className="w-5 h-5 text-green-500" />
      case "legal":
        return <Scale className="w-5 h-5 text-purple-500" />
      default:
        return <HelpCircle className="w-5 h-5 text-gray-500" />
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "feedback":
        return "bg-pink-100 text-pink-800 border-pink-200"
      case "bug":
        return "bg-red-100 text-red-800 border-red-200"
      case "partnership":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "privacy":
        return "bg-green-100 text-green-800 border-green-200"
      case "legal":
        return "bg-purple-100 text-purple-800 border-purple-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "feedback":
        return "Feedback & Suggestions"
      case "bug":
        return "Bug Report"
      case "partnership":
        return "Partnership Inquiry"
      case "privacy":
        return "Privacy Question"
      case "legal":
        return "Legal Question"
      default:
        return "General Contact"
    }
  }

  return (
    <PageLayout>
      <div className="bg-gradient-to-br from-amber-50 via-cream-50 to-blue-50 py-20 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6">Contact Us</h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              We're here to help! Reach out to us with any questions, feedback, or support needs.
            </p>
            {contactType && (
              <div className="mt-6 flex justify-center">
                <Badge className={`px-4 py-2 text-sm font-medium ${getTypeColor(contactType)}`}>
                  {getTypeIcon(contactType)}
                  <span className="ml-2">{getTypeLabel(contactType)}</span>
                </Badge>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card className="bg-white/80 backdrop-blur-sm border border-amber-200/30 shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-800 flex items-center gap-3">
                  <MessageSquare className="w-6 h-6 text-amber-600" />
                  Send us a Message
                </CardTitle>
              </CardHeader>
              <CardContent>
                {isSubmitted ? (
                  <Alert className="border-green-200 bg-green-50">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <AlertDescription className="text-green-800">
                      <strong>Thank you for your message!</strong>
                      <br />
                      We've received your{" "}
                      {formData.type === "bug"
                        ? "bug report"
                        : formData.type === "feedback"
                          ? "feedback"
                          : formData.type === "privacy"
                            ? "privacy inquiry"
                            : formData.type === "legal"
                              ? "legal question"
                              : "inquiry"}{" "}
                      and will get back to you within{" "}
                      {formData.type === "bug"
                        ? "12-24 hours"
                        : formData.type === "legal" || formData.type === "privacy"
                          ? "48-72 hours"
                          : "24 hours"}
                      .
                      {formData.type === "bug" && (
                        <span className="block mt-2 text-sm">
                          Our development team will investigate the issue you reported.
                        </span>
                      )}
                      {formData.type === "privacy" && (
                        <span className="block mt-2 text-sm">
                          Our privacy team will review your question and provide a detailed response.
                        </span>
                      )}
                      {formData.type === "legal" && (
                        <span className="block mt-2 text-sm">
                          Our legal team will review your question and provide appropriate guidance.
                        </span>
                      )}
                    </AlertDescription>
                  </Alert>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Name *</label>
                        <Input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Your full name"
                          required
                          className="border-amber-200 focus:border-amber-400 focus:ring-amber-400"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                        <Input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="your@email.com"
                          required
                          className="border-amber-200 focus:border-amber-400 focus:ring-amber-400"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Contact Type</label>
                      <select
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-amber-200 rounded-md focus:border-amber-400 focus:ring-amber-400 bg-white"
                      >
                        <option value="general">General Inquiry</option>
                        <option value="feedback">Feedback & Suggestions</option>
                        <option value="bug">Bug Report</option>
                        <option value="privacy">Privacy Question</option>
                        <option value="legal">Legal Question</option>
                        <option value="partnership">Partnership Inquiry</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Subject *</label>
                      <Input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder="What's this about?"
                        required
                        className="border-amber-200 focus:border-amber-400 focus:ring-amber-400"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Message *</label>
                      <Textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder={
                          formData.type === "bug"
                            ? "Please describe the issue you encountered, including steps to reproduce it..."
                            : formData.type === "feedback"
                              ? "Share your feedback, suggestions, or feature requests..."
                              : formData.type === "privacy"
                                ? "What privacy-related question can we help you with?"
                                : formData.type === "legal"
                                  ? "What legal question do you have about our terms of service?"
                                  : "Tell us how we can help you..."
                        }
                        rows={8}
                        required
                        className="border-amber-200 focus:border-amber-400 focus:ring-amber-400"
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white shadow-lg"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4 mr-2" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>

            {/* Contact Information */}
            <div className="space-y-8">
              <Card className="bg-white/80 backdrop-blur-sm border border-amber-200/30 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-gray-800">Get in Touch</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-start gap-4">
                    <Mail className="w-6 h-6 text-amber-600 mt-1" />
                    <div>
                      <h3 className="font-semibold text-gray-800">Email Support</h3>
                      <p className="text-gray-600">Athena1592025@outlook.com</p>
                      <p className="text-sm text-gray-500">General support and inquiries</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <Shield className="w-6 h-6 text-green-600 mt-1" />
                    <div>
                      <h3 className="font-semibold text-gray-800">Privacy Questions</h3>
                      <p className="text-gray-600">Athena1592025@outlook.com</p>
                      <p className="text-sm text-gray-500">Data protection and privacy inquiries</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <Scale className="w-6 h-6 text-purple-600 mt-1" />
                    <div>
                      <h3 className="font-semibold text-gray-800">Legal Questions</h3>
                      <p className="text-gray-600">Athena1592025@outlook.com</p>
                      <p className="text-sm text-gray-500">Terms of service and legal matters</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <Users className="w-6 h-6 text-blue-600 mt-1" />
                    <div>
                      <h3 className="font-semibold text-gray-800">Partnerships</h3>
                      <p className="text-gray-600">Athena1592025@outlook.com</p>
                      <p className="text-sm text-gray-500">Business partnerships and collaborations</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <Phone className="w-6 h-6 text-amber-600 mt-1" />
                    <div>
                      <h3 className="font-semibold text-gray-800">Phone Support</h3>
                      <p className="text-gray-600">+1 (555) 123-4567</p>
                      <p className="text-sm text-gray-500">Monday - Friday, 9 AM - 5 PM EST</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <MapPin className="w-6 h-6 text-amber-600 mt-1" />
                    <div>
                      <h3 className="font-semibold text-gray-800">Office Address</h3>
                      <p className="text-gray-600">
                        123 Faith Street
                        <br />
                        Christian City, CC 12345
                        <br />
                        United States
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-sm border border-amber-200/30 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-gray-800">Response Times</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">General Inquiries</span>
                    <Badge variant="secondary">24-48 hours</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Bug Reports</span>
                    <Badge className="bg-red-100 text-red-800">12-24 hours</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Privacy Questions</span>
                    <Badge className="bg-green-100 text-green-800">48-72 hours</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Legal Questions</span>
                    <Badge className="bg-purple-100 text-purple-800">3-5 business days</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Partnership Inquiries</span>
                    <Badge className="bg-blue-100 text-blue-800">3-7 days</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}
