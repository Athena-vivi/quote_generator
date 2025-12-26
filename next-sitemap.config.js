/** @type {import('next-sitemap').IConfig} */

// 直接定义主题和收藏的 slug（从 data/themes.ts 和 data/collections.ts 复制）
const themeSlugs = [
  'verses-for-peace',
  'verses-for-strength',
  'verses-for-love',
  'verses-for-anxiety',
  'verses-for-healing',
  'verses-for-wisdom',
  'verses-for-success',
]

const collectionSlugs = [
  'top-10-morning-prayers',
  'verses-for-hard-times',
  'gratitude-journaling',
]

module.exports = {
  siteUrl: 'https://quotegenerator.org',
  generateRobotsTxt: true,
  outDir: 'public',

  // 自动转换路径为大写（SEO 最佳实践）
  trailingSlash: false,

  // 排除不需要的路径
  exclude: ['/api/*', '/verse/[id]'],

  // 额外的路径
  additionalPaths: async () => {
    const paths = []

    // 添加所有主题页面
    themeSlugs.forEach(slug => {
      paths.push({
        loc: `/themes/${slug}`,
        priority: 0.9,
        changefreq: 'weekly',
        lastmod: new Date().toISOString(),
      })
    })

    // 添加所有收藏页面
    collectionSlugs.forEach(slug => {
      paths.push({
        loc: `/collections/${slug}`,
        priority: 0.9,
        changefreq: 'weekly',
        lastmod: new Date().toISOString(),
      })
    })

    return paths
  },

  // robots.txt 配置
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/verse/'],
      },
    ],
    additionalSitemaps: [
      'https://quotegenerator.org/sitemap.xml',
    ],
  },
}
