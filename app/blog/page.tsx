import React from "react"
import Link from "next/link"

// 未来可替换为动态数据
const articles = [
  {
    id: 1,
    title: "Bible Quotes About Love",
    summary: "Discover heartwarming Bible verses about love—perfect for encouragement, sharing, and deepening your understanding of God’s love.",
    date: "2024-05-01",
    author: "John Doe",
    href: "/blog/bible-quotes-about-love"
  },
  {
    id: 2,
    title: "Bible Quotes About Peace",
    summary: "Find comfort and calm with these Bible verses about peace. Let God’s word bring serenity and hope to your heart, even in times of trouble.",
    date: "2024-04-20",
    author: "Jane Smith",
    href: "/blog/bible-quotes-about-peace"
  },
  {
    id: 3,
    title: "Bible Quotes About Strength and Resilience",
    summary: "Discover powerful Bible verses about strength and resilience. These scriptures offer encouragement and hope for anyone facing challenges or seeking God’s strength.",
    date: "2024-04-10",
    author: "Alex Lee",
    href: "/blog/bible-quotes-about-strength"
  },
  {
    id: 4,
    title: "Bible Quotes for Anxiety",
    summary: "Find comfort and relief from anxiety with these Bible verses. God’s word offers peace, hope, and encouragement for anxious hearts.",
    date: "2024-03-28",
    author: "Emily Chen",
    href: "/blog/bible-quotes-for-anxiety"
  },
  {
    id: 5,
    title: "Bible Quotes for Encouragement",
    summary: "Uplifting Bible verses for encouragement and hope. These scriptures inspire you to stay strong and trust in God’s promises, no matter the circumstances.",
    date: "2024-03-15",
    author: "Michael Brown",
    href: "/blog/bible-quotes-for-encouragement"
  },
  {
    id: 6,
    title: "Bible Quotes for Healing",
    summary: "Find hope and comfort in these Bible verses about healing. God’s word offers encouragement and strength for those seeking physical, emotional, or spiritual healing.",
    date: "2024-03-01",
    author: "Sarah Kim",
    href: "/blog/bible-quotes-for-healing"
  },
  {
    id: 7,
    title: "Inspirational Bible Verses",
    summary: "Uplifting and inspirational Bible verses to encourage you every day. Let these scriptures fill your heart with hope, faith, and motivation.",
    date: "2024-02-20",
    author: "David Park",
    href: "/blog/inspirational-bible-verses"
  },
  {
    id: 8,
    title: "Short Bible Quotes",
    summary: "A collection of the most concise and powerful short Bible quotes for daily encouragement, inspiration, and sharing. Perfect for quick reminders of God’s love and promises.",
    date: "2024-02-10",
    author: "Grace Lin",
    href: "/blog/short-bible-quotes"
  },
]

// Tag to article mapping
const tagLinks: Record<string, string> = {
  "Faith": "/blog/bible-quotes-about-strength",
  "Devotional": "/blog/bible-quotes-about-love",
  "Prayer": "/blog/bible-quotes-for-healing",
  "Hope": "/blog/bible-quotes-for-encouragement",
  "Encouragement": "/blog/bible-quotes-for-encouragement",
}

const tags = ["Faith", "Devotional", "Prayer", "Hope", "Encouragement"]
const popularArticles = [
  { id: 101, title: "Bible Quotes About Love", href: "/blog/bible-quotes-about-love" },
  { id: 102, title: "Bible Quotes About Peace", href: "/blog/bible-quotes-about-peace" },
  { id: 103, title: "Bible Quotes About Strength and Resilience", href: "/blog/bible-quotes-about-strength" },
  { id: 104, title: "Bible Quotes for Anxiety", href: "/blog/bible-quotes-for-anxiety" },
  { id: 105, title: "Bible Quotes for Encouragement", href: "/blog/bible-quotes-for-encouragement" },
  { id: 106, title: "Bible Quotes for Healing", href: "/blog/bible-quotes-for-healing" },
  { id: 107, title: "Inspirational Bible Verses", href: "/blog/inspirational-bible-verses" },
  { id: 108, title: "Short Bible Quotes", href: "/blog/short-bible-quotes" },
]

export default function BlogPage() {
  return (
    <main className="max-w-6xl mx-auto py-16 px-4">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-4xl md:text-5xl font-bold text-amber-700">Blog</h1>
        <Link href="/" className="px-4 py-2 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-medium shadow transition-colors text-base flex items-center gap-2">
          <span>Back to Home</span>
        </Link>
      </div>
      <p className="text-lg text-gray-600 mb-10">Sharing devotionals, Bible verse insights, faith reflections, and more. Stay tuned for regular updates.</p>
      <div className="flex flex-col md:flex-row gap-8">
        {/* 主内容区 */}
        <section className="flex-1">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Latest Articles</h2>
          <div className="h-1 w-16 bg-amber-200 rounded mb-6"></div>
          <div className="space-y-8">
            {articles.map(article => (
              <article key={article.id} className="p-6 bg-white rounded-xl shadow border border-amber-100 hover:shadow-xl hover:scale-[1.02] transition-all duration-200">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                  <h3 className="text-xl font-bold text-amber-700 mb-1 md:mb-0">{article.title}</h3>
                  <div className="flex items-center text-sm text-gray-400 space-x-4">
                    <span>By {article.author}</span>
                    <span>{article.date}</span>
                  </div>
                </div>
                <p className="text-gray-600 mb-4">{article.summary}</p>
                <Link href={article.href} className="inline-block px-4 py-2 rounded bg-gradient-to-r from-amber-400 to-orange-400 text-white font-semibold shadow hover:from-amber-500 hover:to-orange-500 transition">Read More</Link>
              </article>
            ))}
          </div>
          {/* 分页区块 */}
          <div className="mt-10 flex justify-center">
            <nav className="inline-flex rounded-md shadow-sm border border-amber-100 overflow-hidden" aria-label="Pagination">
              <button className="px-4 py-2 text-sm text-gray-500 bg-white hover:bg-amber-50 disabled:opacity-50" disabled>Previous</button>
              <button className="px-4 py-2 text-sm text-amber-700 bg-amber-50 font-bold">1</button>
              <button className="px-4 py-2 text-sm text-gray-500 bg-white hover:bg-amber-50">2</button>
              <button className="px-4 py-2 text-sm text-gray-500 bg-white hover:bg-amber-50">3</button>
              <button className="px-4 py-2 text-sm text-gray-500 bg-white hover:bg-amber-50">Next</button>
            </nav>
          </div>
        </section>
        {/* 侧边栏，移动端下移到底部 */}
        <aside className="w-full md:w-80 shrink-0 mt-8 md:mt-0">
          <div className="mb-8 p-6 bg-white rounded-xl shadow border border-amber-100">
            <h4 className="text-lg font-semibold text-amber-700 mb-4">Tags</h4>
            <div className="flex flex-wrap gap-2">
              {tags.map(tag => (
                <Link
                  key={tag}
                  href={tagLinks[tag] || "/blog"}
                  className="px-3 py-1 rounded-full bg-amber-50 text-amber-700 text-sm border border-amber-200 cursor-pointer hover:bg-amber-100 transition"
                >
                  {tag}
                </Link>
              ))}
            </div>
          </div>
          <div className="p-6 bg-white rounded-xl shadow border border-amber-100">
            <h4 className="text-lg font-semibold text-amber-700 mb-4">Popular Articles</h4>
            <ul className="space-y-2">
              {popularArticles.map(item => (
                <li key={item.id} className="flex items-center gap-2">
                  <span className="inline-block w-4 h-4 bg-gradient-to-r from-orange-400 to-amber-400 rounded-full mr-1"></span>
                  <Link href={item.href} className="text-amber-700 hover:underline text-base">{item.title}</Link>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </main>
  )
} 