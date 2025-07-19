"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Eye, Download, Share2, Sparkles, Copy } from "lucide-react"

export function ExampleShowcase() {
  return (
    <section id="example-showcase" className="py-20 px-4 bg-gradient-to-br from-blue-50 via-purple-50 to-amber-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">See It In Action</h2>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Here's an example of what you can create with QuoteGenerator - beautiful Bible quotes transformed into
            stunning visual art
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Example Image Card */}
          <div className="relative">
            <Card className="bg-white/90 backdrop-blur-sm border border-amber-200/30 shadow-2xl overflow-hidden">
              <CardContent className="p-0">
                {/* Generated Image Example */}
                <div
                  className="relative w-full aspect-square bg-cover bg-center bg-no-repeat flex flex-col justify-center items-center text-center p-8"
                  style={{
                    backgroundImage: `url('/images/example-background.png')`,
                  }}
                >
                  {/* Overlay for better text readability */}
                  <div className="absolute inset-0 bg-black/30" />

                  {/* Quote Text */}
                  <div className="z-10 w-full h-full flex flex-col justify-center items-center text-center">
                    <blockquote
                      className="text-white text-2xl md:text-3xl font-serif leading-relaxed mx-auto drop-shadow-2xl max-w-[90%]"
                      style={{
                        textShadow: "3px 3px 6px rgba(0,0,0,0.9), 0 0 12px rgba(0,0,0,0.7)",
                        fontFamily: "'Palatino Linotype', 'Book Antiqua', 'Garamond', 'Georgia', 'Times New Roman', serif",
                        fontWeight: "400",
                        letterSpacing: "0.3px",
                        lineHeight: "1.3",
                        marginBottom: "2.5rem",
                      }}
                    >
                      For I know the plans I have for you, declares the Lord, plans for welfare and not for evil, to
                      give you a future and a hope.
                    </blockquote>
                  </div>
                  <cite
                    className="text-white/95 text-base md:text-lg font-semibold drop-shadow-lg"
                    style={{
                      textShadow: "2px 2px 4px rgba(0,0,0,0.9), 0 0 8px rgba(0,0,0,0.6)",
                      fontFamily: "'Optima', 'Segoe UI', 'Tahoma', 'Helvetica', 'Arial', sans-serif",
                      letterSpacing: "0.8px",
                      fontSize: "1rem",
                      position: "absolute",
                      right: "2rem",
                      bottom: "2rem",
                      display: "block",
                      opacity: 0.95,
                    }}
                  >
                    — Jeremiah 29:11
                  </cite>

                  {/* AI Generated Badge */}
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-white/20 backdrop-blur-sm text-white border-white/30">
                      <Sparkles className="w-3 h-3 mr-1" />
                      AI Generated
                    </Badge>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="p-4 bg-white/80 backdrop-blur-sm">
                  <div className="grid grid-cols-3 gap-2">
                    <Button size="sm" variant="outline" className="flex items-center gap-1 text-xs bg-transparent">
                      <Download className="w-3 h-3" />
                      Download
                    </Button>
                    <Button size="sm" variant="outline" className="flex items-center gap-1 text-xs bg-transparent">
                      <Copy className="w-3 h-3" />
                      Copy
                    </Button>
                    <Button size="sm" variant="outline" className="flex items-center gap-1 text-xs bg-transparent">
                      <Share2 className="w-3 h-3" />
                      Share
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Floating Stats */}
            <div className="absolute -top-4 -left-4 bg-white rounded-lg shadow-lg p-3 border border-amber-200">
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-medium text-gray-700">1024×1024</span>
              </div>
            </div>

            <div className="absolute -bottom-4 -right-4 bg-white rounded-lg shadow-lg p-3 border border-amber-200">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-600" />
                <span className="text-sm font-medium text-gray-700">AI Powered</span>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-8">
            <Card className="bg-white/80 backdrop-blur-sm border border-amber-200/30 shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-800">How It Works</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-amber-700 font-bold text-sm">1</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-2">Choose Your Quote</h3>
                    <p className="text-gray-600">
                      Select from daily recommendations, search by Bible reference, or find quotes that match your
                      current mood.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-blue-700 font-bold text-sm">2</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-2">Describe Your Vision</h3>
                    <p className="text-gray-600">
                      Tell our AI what kind of background you want - peaceful mountains, starry skies, or flowing
                      waters.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-green-700 font-bold text-sm">3</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-2">Download & Share</h3>
                    <p className="text-gray-600">
                      Get your high-resolution image instantly and share it on social media to inspire others.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="text-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white px-8 py-4 text-lg shadow-lg"
                onClick={() => {
                  document.getElementById("quote-finder")?.scrollIntoView({ behavior: "smooth" })
                }}
              >
                <Sparkles className="w-5 h-5 mr-2" />
                Create Your Own
              </Button>
            </div>
          </div>
        </div>

        {/* Features Highlight */}
        {/* 已根据需求删除AI Powered、High Quality、Instant Download、Easy Sharing四个图标和描述 */}
      </div>
    </section>
  )
}
