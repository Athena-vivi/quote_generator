"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Sparkles, Menu, X, Home, Info, Mail, Shield, FileText, Heart, HelpCircle } from "lucide-react"

export function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  const navigationItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/about", label: "About", icon: Info },
    { href: "/help", label: "Help", icon: HelpCircle },
    { href: "/contact", label: "Contact", icon: Mail },
    { href: "/privacy", label: "Privacy", icon: Shield },
    { href: "/terms", label: "Terms", icon: FileText },
  ]

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/"
    }
    return pathname.startsWith(href)
  }

  // 处理导航点击，确保移动菜单关闭并滚动到顶部
  const handleNavClick = () => {
    setIsMobileMenuOpen(false)
    // 添加一个小延迟确保路由变化后再滚动
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      })
    }, 100)
  }

  return (
    <nav className="bg-white/90 backdrop-blur-sm border-b border-amber-200/30 sticky top-0 z-50 shadow-sm">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
            onClick={handleNavClick}
          >
            <Sparkles className="w-8 h-8 text-amber-600" />
            <span className="text-xl font-bold text-amber-700">QuoteGenerator</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={handleNavClick}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
                  isActive(item.href)
                    ? "bg-amber-100 text-amber-800"
                    : "text-gray-600 hover:text-amber-700 hover:bg-amber-50"
                }`}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </Link>
            ))}

            {/* Favorites Button */}
            <Button
              variant="outline"
              size="sm"
              className="ml-4 bg-white/70 border-amber-300 text-amber-700 hover:bg-amber-50"
              onClick={() => {
                const event = new CustomEvent("openFavorites")
                window.dispatchEvent(event)
              }}
            >
              <Heart className="w-4 h-4 mr-2" />
              Favorites
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-amber-200/30">
            <div className="space-y-2">
              {navigationItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    isActive(item.href)
                      ? "bg-amber-100 text-amber-800"
                      : "text-gray-600 hover:text-amber-700 hover:bg-amber-50"
                  }`}
                  onClick={handleNavClick}
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </Link>
              ))}

              {/* Mobile Favorites Button */}
              <Button
                variant="outline"
                className="w-full justify-start bg-white/70 border-amber-300 text-amber-700 hover:bg-amber-50 mt-4"
                onClick={() => {
                  const event = new CustomEvent("openFavorites")
                  window.dispatchEvent(event)
                  setIsMobileMenuOpen(false)
                }}
              >
                <Heart className="w-4 h-4 mr-2" />
                My Favorites
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
