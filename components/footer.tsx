import { ScrollToTopLink } from "./footer-scroll-link"

export function Footer() {
  const currentYear = new Date().getFullYear()

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
                <ScrollToTopLink href="/about">About Us</ScrollToTopLink>
              </li>
              <li className="min-h-[44px] flex items-center">
                <ScrollToTopLink href="/contact">Contact</ScrollToTopLink>
              </li>
              <li className="min-h-[44px] flex items-center">
                <ScrollToTopLink href="/privacy">Privacy Policy</ScrollToTopLink>
              </li>
              <li className="min-h-[44px] flex items-center">
                <ScrollToTopLink href="/terms">Terms of Service</ScrollToTopLink>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-3">Support</h4>
            <ul className="space-y-3 text-muted-foreground text-xs">
              <li className="min-h-[44px] flex items-center">
                <ScrollToTopLink href="/help">Help Center</ScrollToTopLink>
              </li>
              <li className="min-h-[44px] flex items-center">
                <ScrollToTopLink href="/contact?type=feedback">Send Feedback</ScrollToTopLink>
              </li>
              <li className="min-h-[44px] flex items-center">
                <ScrollToTopLink href="/contact?type=bug">Report a Bug</ScrollToTopLink>
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
              <HeartIcon aria-hidden="true" />
              <span>for God's glory</span>
            </div>
          </div>
          <div className="text-center mt-4">
            <p className="text-muted-foreground text-xs">© {currentYear} QuoteGenerator. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

// Server component Heart icon (SVG)
function HeartIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
  )
}
