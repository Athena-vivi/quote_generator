"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Share2, Facebook, Instagram, Twitter, Copy, Check } from "lucide-react"

export default function SocialSharePage() {
  const [shareUrl, setShareUrl] = useState("")
  const [copied, setCopied] = useState(false)

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error("Failed to copy:", error)
    }
  }

  const shareToFacebook = (url: string, text: string) => {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(text)}`
    window.open(facebookUrl, "_blank", "width=600,height=400")
  }

  const shareToTwitter = (text: string, url: string) => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`
    window.open(twitterUrl, "_blank", "width=600,height=400")
  }

  const shareToInstagram = () => {
    // Instagram doesn't support direct URL sharing, so we'll provide instructions
    alert(
      "To share on Instagram:\n1. Save the image to your device\n2. Open Instagram\n3. Create a new post\n4. Select the saved image",
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-20 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Share Your Creation</h1>
          <p className="text-xl text-gray-600">Spread inspiration by sharing your beautiful Bible verse images</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Share2 className="w-5 h-5" />
              Social Media Sharing
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Share URL (optional)</label>
              <div className="flex gap-2">
                <Input
                  placeholder="Enter URL to share with your image"
                  value={shareUrl}
                  onChange={(e) => setShareUrl(e.target.value)}
                />
                <Button variant="outline" onClick={() => copyToClipboard(shareUrl)} disabled={!shareUrl}>
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button
                onClick={() =>
                  shareToFacebook(shareUrl || window.location.href, "Check out this beautiful Bible verse!")
                }
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                <Facebook className="w-4 h-4 mr-2" />
                Facebook
              </Button>

              <Button
                onClick={() =>
                  shareToTwitter("Check out this beautiful Bible verse! 🙏", shareUrl || window.location.href)
                }
                className="bg-sky-500 hover:bg-sky-600 text-white"
              >
                <Twitter className="w-4 h-4 mr-2" />
                Twitter
              </Button>

              <Button
                onClick={shareToInstagram}
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
              >
                <Instagram className="w-4 h-4 mr-2" />
                Instagram
              </Button>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold text-blue-900 mb-2">Sharing Tips:</h3>
              <ul className="text-blue-800 text-sm space-y-1">
                <li>• Use relevant hashtags like #BibleVerse #Faith #Inspiration</li>
                <li>• Tag friends who might be encouraged by the verse</li>
                <li>• Share your personal reflection on the verse</li>
                <li>• Consider sharing during meaningful times (Sunday, holidays)</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
