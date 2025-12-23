"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Calendar, Menu, X, BookOpen, Newspaper } from "lucide-react"
import { ThemeToggle } from "@/components/ui/theme-toggle"

export function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  const handleFindQuotesClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    if (pathname === "/") {
      const el = document.getElementById("quote-finder");
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    } else {
      router.push("/#quote-finder");
    }
  };

  const handleDailyQuoteClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    if (pathname === "/") {
      const el = document.getElementById("daily-quote-section");
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    } else {
      router.push("/#daily-quote-section");
    }
  };

  const navigationItems = [
    { href: "/#daily-quote-section", label: "Daily Quote", icon: Calendar },
    { href: "/#quote-finder", label: "Explore Verses", icon: BookOpen },
    { href: "/blog", label: "Blog", icon: Newspaper },
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
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-zinc-900/70 backdrop-blur-xl border-b border-amber-100 dark:border-amber-500/20 shadow-lg">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo - Divine Feather Icon */}
          <Link
            href="/"
            className="group flex items-center space-x-3 hover:scale-105 transition-all duration-300"
            onClick={handleNavClick}
          >
            {/* Divine Feather Icon with Amber Glow */}
            <div className="relative flex items-center justify-center">
              {/* Sacred Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-amber-400/15 via-yellow-500/10 to-amber-500/15 rounded-full blur-lg group-hover:from-amber-400/25 group-hover:via-yellow-500/15 group-hover:to-amber-500/25 transition-all duration-500"></div>
              {/* Feather Icon */}
              <div className="relative">
                <svg
                  className="w-9 h-9"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <linearGradient id="featherGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#D4AF37" />
                      <stop offset="50%" stopColor="#F4E4BC" />
                      <stop offset="100%" stopColor="#D4AF37" />
                    </linearGradient>
                    <filter id="glow">
                      <feGaussianBlur stdDeviation="1.5" result="coloredBlur"/>
                      <feMerge>
                        <feMergeNode in="coloredBlur"/>
                        <feMergeNode in="SourceGraphic"/>
                      </feMerge>
                    </filter>
                  </defs>
                  <path
                    d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z"
                    stroke="url(#featherGradient)"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    filter="url(#glow)"
                  />
                  <path
                    d="M16 8L2 22"
                    stroke="url(#featherGradient)"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                  <path
                    d="M17.5 15H9"
                    stroke="url(#featherGradient)"
                    strokeWidth="1.3"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </div>
            {/* Brand Text - Serif with Wide Tracking */}
            <span className="text-xl md:text-2xl font-serif font-semibold tracking-wide bg-gradient-to-r from-amber-700 via-yellow-600 to-amber-700 dark:from-amber-300 dark:via-amber-200 dark:to-amber-300 bg-clip-text text-transparent leading-none">
              QuoteGenerator
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-2">
            {navigationItems.map((item) => {
              const handlers = {
                "Explore Verses": handleFindQuotesClick,
                "Daily Quote": handleDailyQuoteClick,
                "Blog": handleNavClick
              };

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={handlers[item.label as keyof typeof handlers] || handleNavClick}
                  className={`group relative px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-3 ${
                    isActive(item.href)
                      ? "bg-gradient-to-r from-amber-500/20 to-yellow-600/20 text-amber-800 dark:text-amber-300 shadow-lg shadow-amber-500/20 dark:shadow-amber-500/10"
                      : "text-gray-700/80 dark:text-stone-300 hover:text-amber-800 dark:hover:text-amber-300 hover:bg-white/10 dark:hover:bg-zinc-800/50"
                  }`}
                >
                  <div className="relative">
                    <item.icon className="w-4 h-4" />
                    <div className="absolute inset-0 bg-gradient-to-r from-amber-400/30 to-yellow-600/30 rounded-full blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <span className="relative">{item.label}</span>
                  {isActive(item.href) && (
                    <div className="absolute inset-0 bg-gradient-to-r from-amber-400/10 to-yellow-600/10 rounded-full blur-md"></div>
                  )}
                </Link>
              );
            })}
          </div>

          {/* Right side controls */}
          <div className="hidden lg:flex items-center space-x-4">
            <div className="w-px h-8 bg-gradient-to-b from-transparent via-amber-300/30 dark:via-amber-500/20 to-transparent"></div>
            <ThemeToggle />
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden bg-white/10 dark:bg-zinc-800/50 hover:bg-white/20 dark:hover:bg-zinc-700/50 backdrop-blur-sm border border-white/20 dark:border-amber-500/20 rounded-full p-3"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6 text-amber-700 dark:text-amber-400" /> : <Menu className="w-6 h-6 text-amber-700 dark:text-amber-400" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="lg:hidden py-6 border-t border-amber-100/50 dark:border-amber-500/20 mt-4">
            <div className="space-y-3">
              {navigationItems.map((item) => {
                const handlers = {
                  "Explore Verses": handleFindQuotesClick,
                  "Daily Quote": handleDailyQuoteClick,
                  "Blog": handleNavClick
                };

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={handlers[item.label as keyof typeof handlers] || handleNavClick}
                    className={`group flex items-center gap-4 px-6 py-4 rounded-2xl text-base font-medium transition-all duration-300 ${
                      isActive(item.href)
                        ? "bg-gradient-to-r from-amber-500/20 to-yellow-600/20 text-amber-800 dark:text-amber-300 shadow-lg shadow-amber-500/20 border border-amber-400/30 dark:border-amber-500/30"
                        : "text-gray-700/80 dark:text-stone-300 hover:text-amber-800 dark:hover:text-amber-300 hover:bg-white/10 dark:hover:bg-zinc-800/50 hover:backdrop-blur-sm"
                    }`}
                  >
                    <div className="relative p-2 rounded-full bg-white/50 dark:bg-zinc-800/50 group-hover:bg-white/70 dark:group-hover:bg-zinc-700/50 transition-colors">
                      <item.icon className="w-5 h-5" />
                    </div>
                    <span>{item.label}</span>
                    {isActive(item.href) && (
                      <div className="ml-auto w-2 h-2 bg-amber-500 dark:bg-amber-400 rounded-full shadow-lg shadow-amber-500/50"></div>
                    )}
                  </Link>
                );
              })}
            </div>
            <div className="mt-6 pt-6 border-t border-amber-100/50 dark:border-amber-500/20 flex justify-center">
              <ThemeToggle />
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
