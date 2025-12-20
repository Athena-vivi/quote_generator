"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Home, Search, ArrowLeft, Sparkles } from "lucide-react"
import { PageLayout } from "@/components/page-layout"

export const metadata = {
  title: "Page Not Found - QuoteGenerator",
  description: "The page you're looking for doesn't exist. Return to QuoteGenerator to find inspiring Bible quotes.",
}

export default function NotFound() {
  return (
    <PageLayout showBreadcrumb={false}>
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-cream-50 to-blue-50 flex items-center justify-center px-4">
        <div className="max-w-2xl mx-auto text-center">
          {/* Animated Background Elements */}
          <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-amber-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
            <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
            <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
          </div>

          <Card className="bg-white/80 backdrop-blur-sm border border-amber-200/30 shadow-2xl relative z-10">
            <CardHeader className="text-center pb-4">
              <div className="flex justify-center mb-6">
                <Sparkles className="w-16 h-16 text-amber-600" />
              </div>
              <CardTitle className="text-6xl font-bold text-gray-800 mb-4">404</CardTitle>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">Page Not Found</h1>
              <p className="text-xl text-gray-600">
                Oops! The page you're looking for seems to have wandered off like a lost sheep.
              </p>
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="bg-amber-50 p-6 rounded-lg border border-amber-200">
                <h2 className="text-lg font-semibold text-amber-800 mb-3">Don't worry, we're here to help!</h2>
                <p className="text-amber-700 mb-4">
                  "The Lord your God is with you, the Mighty Warrior who saves. He will take great delight in you; in
                  his love he will no longer rebuke you, but will rejoice over you with singing." - Zephaniah 3:17
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Link href="/">
                  <Button
                    size="lg"
                    className="w-full bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white shadow-lg"
                  >
                    <Home className="w-5 h-5 mr-2" />
                    Go Home
                  </Button>
                </Link>

                <Link href="/#quote-finder">
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full border-amber-300 text-amber-700 hover:bg-amber-50 bg-transparent"
                  >
                    <Search className="w-5 h-5 mr-2" />
                    Find Quotes
                  </Button>
                </Link>
              </div>

              <div className="pt-4">
                <Button
                  variant="ghost"
                  onClick={() => window.history.back()}
                  className="text-gray-600 hover:text-amber-700"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Go Back
                </Button>
              </div>

              <div className="text-center pt-4 border-t border-gray-200">
                <p className="text-gray-500 text-sm">
                  Still having trouble?{" "}
                  <Link href="/contact" className="text-amber-600 hover:text-amber-700 underline">
                    Contact our support team
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageLayout>
  )
}
