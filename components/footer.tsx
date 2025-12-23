"use client"

import { Heart } from "lucide-react"
import Link from "next/link"

export function Footer() {
  // 处理链接点击，滚动到顶部
  const handleLinkClick = () => {
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      })
    }, 100)
  }

  return (
    <footer className="bg-background text-foreground pt-10 pb-6 px-4 border-t border-amber-900/10 dark:border-white/5">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
          <div className="col-span-2 md:col-span-1">
            <h3 className="text-sm font-semibold mb-2">QuoteGenerator</h3>
            <p className="text-muted-foreground text-xs leading-relaxed">
              Transform Bible quotes into beautiful, shareable art with the power of AI.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-3">Features</h4>
            <ul className="space-y-3 text-muted-foreground text-xs">
              <li className="min-h-[44px] flex items-center">Daily Quote Recommendations</li>
              <li className="min-h-[44px] flex items-center">Mood-Based Search</li>
              <li className="min-h-[44px] flex items-center">AI Image Generation</li>
              <li className="min-h-[44px] flex items-center">Social Media Sharing</li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-3">Company</h4>
            <ul className="space-y-3 text-muted-foreground text-xs">
              <li className="min-h-[44px] flex items-center">
                <Link href="/about" className="hover:foreground transition-colors py-2" onClick={handleLinkClick}>
                  About Us
                </Link>
              </li>
              <li className="min-h-[44px] flex items-center">
                <Link href="/contact" className="hover:foreground transition-colors py-2" onClick={handleLinkClick}>
                  Contact
                </Link>
              </li>
              <li className="min-h-[44px] flex items-center">
                <Link href="/privacy" className="hover:foreground transition-colors py-2" onClick={handleLinkClick}>
                  Privacy Policy
                </Link>
              </li>
              <li className="min-h-[44px] flex items-center">
                <Link href="/terms" className="hover:foreground transition-colors py-2" onClick={handleLinkClick}>
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-3">Support</h4>
            <ul className="space-y-3 text-muted-foreground text-xs">
              <li className="min-h-[44px] flex items-center">
                <Link href="/help" className="hover:foreground transition-colors py-2" onClick={handleLinkClick}>
                  Help Center
                </Link>
              </li>
              <li className="min-h-[44px] flex items-center">
                <Link
                  href="/contact?type=feedback"
                  className="hover:foreground transition-colors py-2"
                  onClick={handleLinkClick}
                >
                  Send Feedback
                </Link>
              </li>
              <li className="min-h-[44px] flex items-center">
                <Link href="/contact?type=bug" className="hover:foreground transition-colors py-2" onClick={handleLinkClick}>
                  Report a Bug
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-muted-foreground text-xs leading-relaxed">
              Scripture quotations are from The Holy Bible, English Standard Version® (ESV®), copyright © 2001 by
              Crossway, a publishing ministry of Good News Publishers. Used by permission. All rights reserved.
            </p>
            <div className="flex items-center gap-2 text-muted-foreground text-xs">
              <span>Made with</span>
              <Heart className="w-3.5 h-3.5 text-red-500" aria-hidden="true" />
              <span>for God's glory</span>
            </div>
          </div>
          <div className="text-center mt-4">
            <p className="text-muted-foreground text-xs">© {new Date().getFullYear()} QuoteGenerator. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
