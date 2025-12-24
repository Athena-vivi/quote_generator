"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter, usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Menu, X, BookOpen, Layers, FolderKanban, Info } from "lucide-react"
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

  const navigationItems = [
    { href: "/#quote-finder", label: "Find Wisdom", icon: BookOpen },
    { href: "/themes", label: "Explore Themes", icon: Layers },
    { href: "/collections", label: "Collections", icon: FolderKanban },
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
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/60 dark:bg-white/[0.02] dark:backdrop-blur-max backdrop-blur-md border-b border-amber-200/30 dark:border-amber-500/10 shadow-sm dark:shadow-[0_0_15px_rgba(212,175,55,0.06)]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo - Elegant Minimal */}
          <Link
            href="/"
            className="group flex items-center gap-2 hover:scale-105 transition-all duration-300"
            onClick={handleNavClick}
          >
            {/* Logo Icon */}
            <div className="relative h-8 w-8">
              <Image
                src="/logo.webp"
                alt="QuoteGenerator Logo"
                fill
                className="object-contain rounded-full border border-amber-500/20 shadow-[0_0_8px_rgba(212,175,55,0.15)] group-hover:-translate-y-0.5 transition-transform duration-300"
                sizes="32px"
                priority
              />
            </div>

            {/* Brand Text */}
            <span
              className="font-serif font-semibold tracking-wider text-amber-900 dark:text-amber-500"
              style={{ letterSpacing: '0.08em' }}
            >
              QuoteGenerator
            </span>
          </Link>

          {/* Desktop Navigation - Sacred Serif Typography */}
          <div className="hidden lg:flex items-center space-x-12">
            {navigationItems.map((item) => {
              const handlers = {
                "Find Wisdom": handleFindQuotesClick,
                "Explore Themes": handleNavClick,
                "Collections": handleNavClick
              };

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={handlers[item.label as keyof typeof handlers] || handleNavClick}
                  className="group relative px-2 py-2"
                >
                  {/* Navigation Text - Serif with wide letter spacing */}
                  <span
                    className="text-sm font-serif font-medium text-stone-600 dark:text-stone-400 hover:text-amber-700 dark:hover:text-amber-500 transition-colors duration-300"
                    style={{ letterSpacing: '0.1em' }}
                  >
                    {item.label}
                  </span>

                  {/* Slide-in Underline Animation */}
                  <span className="absolute bottom-0 left-0 w-0 h-px bg-gradient-to-r from-amber-500 to-amber-600 dark:from-amber-400 dark:to-amber-500 group-hover:w-full transition-all duration-300 ease-out"></span>
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
            className="lg:hidden bg-white/10 dark:bg-zinc-800/50 hover:bg-white/20 dark:hover:bg-zinc-700/50 backdrop-blur-sm border border-white/20 dark:border-amber-500/20 rounded-full p-3 min-h-[44px] min-w-[44px]"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
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
                  "Find Wisdom": handleFindQuotesClick,
                  "Explore Themes": handleNavClick,
                  "Collections": handleNavClick
                };

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={handlers[item.label as keyof typeof handlers] || handleNavClick}
                    className={`group flex items-center gap-4 px-6 min-h-[48px] rounded-2xl text-base font-serif font-medium transition-all duration-300 ${
                      isActive(item.href)
                        ? "bg-gradient-to-r from-amber-500/20 to-yellow-600/20 text-amber-800 dark:text-amber-300 shadow-lg shadow-amber-500/20 border border-amber-400/30 dark:border-amber-500/30"
                        : "text-gray-700/80 dark:text-stone-300 hover:text-amber-800 dark:hover:text-amber-300 hover:bg-white/10 dark:hover:bg-zinc-800/50 hover:backdrop-blur-sm"
                    }`}
                    aria-current={isActive(item.href) ? "page" : undefined}
                  >
                    <div className="relative p-2 rounded-full bg-white/50 dark:bg-zinc-800/50 group-hover:bg-white/70 dark:group-hover:bg-zinc-700/50 transition-colors">
                      <item.icon className="w-5 h-5" aria-hidden="true" />
                    </div>
                    <span className="tracking-wide">{item.label}</span>
                    {isActive(item.href) && (
                      <div className="ml-auto w-2 h-2 bg-amber-500 dark:bg-amber-400 rounded-full shadow-lg shadow-amber-500/50" aria-hidden="true"></div>
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
