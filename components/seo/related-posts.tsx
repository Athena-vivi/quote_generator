import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

interface RelatedPost {
  title: string
  url: string
  description?: string
}

interface RelatedPostsProps {
  title?: string
  posts: RelatedPost[]
  className?: string
}

export function RelatedPosts({
  title = "Related Bible Quotes",
  posts,
  className = ""
}: RelatedPostsProps) {
  return (
    <div className={`bg-amber-50 rounded-xl p-6 mt-12 ${className}`}>
      <h2 className="text-2xl font-bold text-amber-800 mb-4">{title}</h2>
      <div className="space-y-4">
        {posts.map((post, index) => (
          <Link
            key={index}
            href={post.url}
            className="group block p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 hover:translate-x-1"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-800 group-hover:text-amber-700 transition-colors">
                  {post.title}
                </h3>
                {post.description && (
                  <p className="text-gray-600 mt-1 text-sm line-clamp-2">
                    {post.description}
                  </p>
                )}
              </div>
              <ArrowRight
                className="w-5 h-5 text-amber-600 ml-3 flex-shrink-0 group-hover:translate-x-1 transition-transform"
              />
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

// 预定义的相关文章配置
export const loveRelatedPosts: RelatedPost[] = [
  {
    title: "Bible Quotes About Peace",
    url: "/blog/bible-quotes-about-peace",
    description: "Find comfort and calm with these Bible verses about peace"
  },
  {
    title: "Bible Quotes About Strength",
    url: "/blog/bible-quotes-about-strength",
    description: "Be strengthened by these powerful Bible verses about finding strength"
  },
  {
    title: "Short Bible Quotes",
    url: "/blog/short-bible-quotes",
    description: "Concise and powerful Bible verses perfect for memorization"
  }
]

export const peaceRelatedPosts: RelatedPost[] = [
  {
    title: "Bible Quotes About Love",
    url: "/blog/bible-quotes-about-love",
    description: "Discover heartwarming Bible verses about love"
  },
  {
    title: "Bible Quotes for Anxiety",
    url: "/blog/bible-quotes-for-anxiety",
    description: "Find peace and calm with these Bible verses for anxious moments"
  },
  {
    title: "Inspirational Bible Verses",
    url: "/blog/inspirational-bible-verses",
    description: "Uplifting scriptures to inspire and encourage you"
  }
]

export const strengthRelatedPosts: RelatedPost[] = [
  {
    title: "Bible Quotes for Encouragement",
    url: "/blog/bible-quotes-for-encouragement",
    description: "Motivational Bible verses to lift your spirits"
  },
  {
    title: "Bible Quotes for Healing",
    url: "/blog/bible-quotes-for-healing",
    description: "Comforting scriptures for those seeking healing"
  },
  {
    title: "Inspirational Bible Verses",
    url: "/blog/inspirational-bible-verses",
    description: "Powerful verses to inspire and strengthen your faith"
  }
]