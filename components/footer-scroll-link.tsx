"use client"

export function ScrollToTopLink({ href, children }: { href: string; children: React.ReactNode }) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    window.location.href = href
    setTimeout(() => {
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" })
    }, 100)
  }

  return (
    <a
      href={href}
      className="hover:foreground transition-colors py-2 block"
      onClick={handleClick}
    >
      {children}
    </a>
  )
}
