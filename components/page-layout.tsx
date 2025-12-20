"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import { Navigation } from "./navigation"
import { Breadcrumb } from "./breadcrumb"
import { Footer } from "./footer"
import { BackToTop } from "./back-to-top"
import { FavoritesManager } from "./favorites-manager"
import { X, Heart } from "lucide-react"

interface PageLayoutProps {
  children: React.ReactNode
  showBreadcrumb?: boolean
}

export function PageLayout({ children, showBreadcrumb = true }: PageLayoutProps) {
  const [showFavorites, setShowFavorites] = useState(false)
  const pathname = usePathname()

  // 自动滚动到顶部当路由改变时
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    })
  }, [pathname])

  // Listen for the custom event to open favorites
  useEffect(() => {
    const handleOpenFavorites = () => {
      setShowFavorites(true)
    }

    window.addEventListener("openFavorites", handleOpenFavorites)
    return () => window.removeEventListener("openFavorites", handleOpenFavorites)
  }, [])

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation */}
      <Navigation />

      {/* Breadcrumb */}
      {showBreadcrumb && <Breadcrumb />}

      {/* Main Content */}
      <main className="flex-grow">{children}</main>

      {/* Footer */}
      <Footer />

      {/* Back to Top Button */}
      <BackToTop />

      {/* Favorites Modal */}
      {showFavorites && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
          role="dialog"
          aria-labelledby="favorites-title"
          aria-modal="true"
        >
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[80vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 id="favorites-title" className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                  <Heart className="w-6 h-6 text-red-500" aria-hidden="true" />
                  My Favorite Bible Quotes
                </h2>
                <button
                  onClick={() => setShowFavorites(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  aria-label="Close favorites"
                >
                  <X className="w-5 h-5" aria-hidden="true" />
                </button>
              </div>
              <FavoritesManager />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
