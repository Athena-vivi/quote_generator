import React from "react"
import Link from "next/link"

// 未来可替换为动态数据
const articles = [
  {
    id: 1,
    title: "How to Meditate on Bible Verses",
    summary: "Discover practical steps and spiritual benefits of meditating on Scripture daily.",
    date: "2024-05-01",
    author: "John Doe",
    href: "#"
  },
  {
    id: 2,
    title: "Faith in Difficult Times: Biblical Encouragement",
    summary: "Explore Bible verses and reflections to strengthen your faith during challenges.",
    date: "2024-04-20",
    author: "Jane Smith",
    href: "#"
  },
]

const tags = ["Faith", "Devotional", "Prayer", "Hope", "Encouragement"]
const popularArticles = [
  { id: 101, title: "Why Read the Bible Daily?", href: "#" },
  { id: 102, title: "Top 10 Encouraging Verses", href: "#" },
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
                  href={`/blog/tag/${tag.toLowerCase()}`}
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