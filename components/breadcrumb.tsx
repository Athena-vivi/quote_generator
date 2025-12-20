"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronRight, Home } from "lucide-react"

export function Breadcrumb() {
  const pathname = usePathname()

  // Don't show breadcrumb on homepage
  if (pathname === "/") return null

  const pathSegments = pathname.split("/").filter(Boolean)

  const breadcrumbItems = [
    { href: "/", label: "Home", icon: Home },
    ...pathSegments.map((segment, index) => {
      const href = "/" + pathSegments.slice(0, index + 1).join("/")
      const label = segment.charAt(0).toUpperCase() + segment.slice(1)
      return { href, label }
    }),
  ]

  // 处理面包屑点击，滚动到顶部
  const handleBreadcrumbClick = () => {
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      })
    }, 100)
  }

  return (
    <nav className="bg-amber-50/50 py-3 px-4 border-b border-amber-200/30">
      <div className="max-w-6xl mx-auto">
        <ol className="flex items-center space-x-2 text-sm">
          {breadcrumbItems.map((item, index) => (
            <li key={item.href} className="flex items-center">
              {index > 0 && <ChevronRight className="w-4 h-4 text-gray-400 mx-2" />}

              {index === breadcrumbItems.length - 1 ? (
                // Current page - not clickable
                <span className="text-amber-700 font-medium flex items-center gap-1">
                  {index === 0 && item.icon && <item.icon className="w-4 h-4" />}
                  {item.label}
                </span>
              ) : (
                // Clickable breadcrumb
                <Link
                  href={item.href}
                  onClick={handleBreadcrumbClick}
                  className="text-gray-600 hover:text-amber-700 transition-colors flex items-center gap-1"
                >
                  {index === 0 && item.icon && <item.icon className="w-4 h-4" />}
                  {item.label}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </div>
    </nav>
  )
}
