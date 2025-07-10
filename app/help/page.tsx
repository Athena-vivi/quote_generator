"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Search,
  HelpCircle,
  Palette,
  Download,
  Heart,
  Settings,
  ChevronDown,
  ChevronRight,
  Mail,
  MessageCircle,
} from "lucide-react"
import { PageLayout } from "@/components/page-layout"
import Link from "next/link"

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)

  const faqCategories = [
    {
      title: "Getting Started",
      icon: HelpCircle,
      questions: [
        {
          question: "How do I create my first Bible quote image?",
          answer:
            "Simply go to our homepage, scroll down to the 'Quote of the Day' section, and click 'Create Beautiful Image'. You can also search for specific verses or browse by mood using our Quote Finder tool.",
        },
        {
          question: "Do I need to create an account?",
          answer:
            "No account is required for basic features! You can generate images, search quotes, and download them without signing up. However, creating an account lets you save favorites and access premium features.",
        },
        {
          question: "Is QuoteGenerator free to use?",
          answer:
            "Yes! We offer a generous free plan that includes daily quote generation, basic AI backgrounds, and standard resolution downloads. Premium plans unlock unlimited generation and advanced features.",
        },
      ],
    },
    {
      title: "Creating Images",
      icon: Palette,
      questions: [
        {
          question: "How do I generate a background for my quote?",
          answer:
            "After selecting a quote, click 'Create Image', then describe the background you want (e.g., 'peaceful mountain sunrise'). Our AI will generate a beautiful, unique background that complements your verse.",
        },
        {
          question: "Can I customize the text appearance?",
          answer:
            "Currently, our system automatically optimizes text size, font, and positioning for the best readability. We're working on adding more customization options in future updates.",
        },
        {
          question: "What image sizes are available?",
          answer:
            "All images are generated in high-quality 1024x1024 resolution, perfect for social media platforms like Instagram, Facebook, and Twitter.",
        },
      ],
    },
    {
      title: "Downloading & Sharing",
      icon: Download,
      questions: [
        {
          question: "How do I download my created images?",
          answer:
            "Click the 'Download' button below your generated image. The image will be saved to your device in PNG format with high resolution and beautiful fonts.",
        },
        {
          question: "Can I share directly to social media?",
          answer:
            "Yes! Use the 'Share' button to post directly to Facebook, Twitter, or get instructions for Instagram. You can also copy the image to your clipboard for easy pasting.",
        },
        {
          question: "Are there any watermarks on the images?",
          answer:
            "Free users get clean images without watermarks. All our images are provided for personal use and sharing your faith.",
        },
      ],
    },
    {
      title: "Bible Quotes & Search",
      icon: Search,
      questions: [
        {
          question: "Which Bible translation do you use?",
          answer:
            "We use the English Standard Version (ESV) for all our quotes, known for its accuracy and readability. We're planning to add more translations in the future.",
        },
        {
          question: "How does mood-based search work?",
          answer:
            "Simply enter how you're feeling (like 'anxious', 'grateful', or 'hopeful'), and our AI will find Bible verses that speak to your current emotional and spiritual needs.",
        },
        {
          question: "Can I search for specific Bible verses?",
          answer:
            "Enter any Bible reference (like 'John 3:16' or 'Psalm 23') in our search tool, and we'll find the exact verse for you.",
        },
      ],
    },
    {
      title: "Favorites & Account",
      icon: Heart,
      questions: [
        {
          question: "How do I save my favorite quotes?",
          answer:
            "Click the heart icon next to any quote to add it to your favorites. You can access all your saved quotes by clicking 'My Favorites' in the navigation.",
        },
        {
          question: "Where are my favorites stored?",
          answer:
            "For users without accounts, favorites are stored locally on your device. Creating an account syncs your favorites across all your devices.",
        },
        {
          question: "Can I organize my favorites?",
          answer:
            "Currently, favorites are stored in chronological order. We're working on adding categories and tags to help you organize your collection better.",
        },
      ],
    },
  ]

  const filteredFaqs = faqCategories
    .map((category) => ({
      ...category,
      questions: category.questions.filter(
        (q) =>
          searchQuery === "" ||
          q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
          q.answer.toLowerCase().includes(searchQuery.toLowerCase()),
      ),
    }))
    .filter((category) => category.questions.length > 0)

  return (
    <PageLayout>
      <div className="bg-gradient-to-br from-amber-50 via-cream-50 to-blue-50 py-20 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6">Help Center</h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Find answers to common questions and learn how to make the most of QuoteGenerator
            </p>
          </div>

          {/* Search */}
          <Card className="bg-white/80 backdrop-blur-sm border border-amber-200/30 shadow-lg mb-12">
            <CardContent className="p-6">
              <div className="relative">
                <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <Input
                  placeholder="Search for help topics..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 text-lg h-12 border-amber-200 focus:border-amber-400 focus:ring-amber-400"
                />
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Link href="/contact">
              <Card className="bg-white/80 backdrop-blur-sm border border-amber-200/30 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer">
                <CardContent className="p-6 text-center">
                  <Mail className="w-12 h-12 text-amber-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Contact Support</h3>
                  <p className="text-gray-600">Get personalized help from our support team</p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/contact?type=feedback">
              <Card className="bg-white/80 backdrop-blur-sm border border-amber-200/30 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer">
                <CardContent className="p-6 text-center">
                  <MessageCircle className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Send Feedback</h3>
                  <p className="text-gray-600">Share your ideas and suggestions with us</p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/contact?type=bug">
              <Card className="bg-white/80 backdrop-blur-sm border border-amber-200/30 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer">
                <CardContent className="p-6 text-center">
                  <Settings className="w-12 h-12 text-green-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Report a Bug</h3>
                  <p className="text-gray-600">Help us improve by reporting issues</p>
                </CardContent>
              </Card>
            </Link>
          </div>

          {/* FAQ Sections */}
          <div className="space-y-8">
            {filteredFaqs.map((category, categoryIndex) => (
              <Card key={categoryIndex} className="bg-white/80 backdrop-blur-sm border border-amber-200/30 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-2xl text-gray-800">
                    <category.icon className="w-6 h-6 text-amber-600" />
                    {category.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {category.questions.map((faq, faqIndex) => {
                      const globalIndex = categoryIndex * 100 + faqIndex
                      const isExpanded = expandedFaq === globalIndex

                      return (
                        <div key={faqIndex} className="border border-gray-200 rounded-lg">
                          <button
                            onClick={() => setExpandedFaq(isExpanded ? null : globalIndex)}
                            className="w-full p-4 text-left flex items-center justify-between hover:bg-amber-50 transition-colors rounded-lg"
                          >
                            <span className="font-medium text-gray-800">{faq.question}</span>
                            {isExpanded ? (
                              <ChevronDown className="w-5 h-5 text-gray-500" />
                            ) : (
                              <ChevronRight className="w-5 h-5 text-gray-500" />
                            )}
                          </button>
                          {isExpanded && (
                            <div className="px-4 pb-4">
                              <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Still Need Help */}
          <Card className="bg-white/80 backdrop-blur-sm border border-amber-200/30 shadow-lg mt-12">
            <CardContent className="p-8 text-center">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Still Need Help?</h2>
              <p className="text-gray-600 mb-6">
                Can't find what you're looking for? Our support team is here to help you with any questions or issues.
              </p>
              <Link href="/contact">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white shadow-lg"
                >
                  <Mail className="w-5 h-5 mr-2" />
                  Contact Support Team
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageLayout>
  )
}
