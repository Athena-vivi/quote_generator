import React from "react"
import Link from "next/link"

export default function BlogPage() {
  return (
    <main className="max-w-4xl mx-auto py-16 px-4">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-4xl md:text-5xl font-bold text-amber-700">Blog</h1>
        <Link href="/" className="px-4 py-2 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-medium shadow transition-colors text-base">
          Back to Home
        </Link>
      </div>
      <p className="text-lg text-gray-600 mb-10">Sharing devotionals, Bible verse insights, faith reflections, and more. Stay tuned for regular updates.</p>
      <section>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Latest Articles</h2>
        <div className="space-y-6">
          {/* Article list will be rendered here in the future */}
          <div className="p-6 bg-white rounded-xl shadow border border-amber-100">
            <h3 className="text-xl font-bold text-amber-700 mb-2">Sample Article Title</h3>
            <p className="text-gray-600 mb-2">This is a sample article summary. In the future, this will be dynamically fetched and rendered...</p>
            <span className="text-sm text-gray-400">2024-05-01</span>
          </div>
        </div>
      </section>
    </main>
  )
} 