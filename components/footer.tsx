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
    <footer className="bg-gray-900 text-white pt-10 pb-6 px-4 border-t border-amber-900/10">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div>
            <h3 className="text-lg font-semibold mb-3">QuoteGenerator</h3>
            <p className="text-gray-400 leading-relaxed">
              Transform Bible quotes into beautiful, shareable art with the power of AI.
            </p>
          </div>

          <div>
            <h4 className="text-base font-semibold mb-3">Features</h4>
            <ul className="space-y-2 text-gray-400">
              <li>Daily Quote Recommendations</li>
              <li>Mood-Based Search</li>
              <li>AI Image Generation</li>
              <li>Social Media Sharing</li>
            </ul>
          </div>

          <div>
            <h4 className="text-base font-semibold mb-3">Company</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="/about" className="hover:text-white transition-colors" onClick={handleLinkClick}>
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors" onClick={handleLinkClick}>
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-white transition-colors" onClick={handleLinkClick}>
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white transition-colors" onClick={handleLinkClick}>
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-base font-semibold mb-3">Support</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="/help" className="hover:text-white transition-colors" onClick={handleLinkClick}>
                  Help Center
                </Link>
              </li>
              <li>
                <Link
                  href="/contact?type=feedback"
                  className="hover:text-white transition-colors"
                  onClick={handleLinkClick}
                >
                  Send Feedback
                </Link>
              </li>
              <li>
                <Link href="/contact?type=bug" className="hover:text-white transition-colors" onClick={handleLinkClick}>
                  Report a Bug
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-3">
            <p className="text-gray-400 text-sm">
              Scripture quotations are from The Holy Bible, English Standard Version® (ESV®), copyright © 2001 by
              Crossway, a publishing ministry of Good News Publishers. Used by permission. All rights reserved.
            </p>
            <div className="flex items-center gap-2 text-gray-400">
              <span>Made with</span>
              <Heart className="w-4 h-4 text-red-500" />
              <span>for God's glory</span>
            </div>
          </div>
          <div className="text-center mt-3">
            <p className="text-gray-500 text-sm">© {new Date().getFullYear()} QuoteGenerator. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
