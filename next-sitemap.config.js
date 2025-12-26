/** @type {import('next-sitemap').IConfig} */

// 30 个主题的 slug（从 data/themes.ts 同步）
const themeSlugs = [
  // 一、核心情绪（Emotional Support）—— 8 个
  'verses-for-peace',
  'verses-for-strength',
  'verses-for-anxiety',
  'verses-for-hope',
  'verses-for-fear',
  'verses-for-joy',
  'verses-for-comfort',
  'verses-for-loneliness',
  // 二、生活场景与关系（Life & Relationships）—— 7 个
  'verses-about-love',
  'verses-for-marriage',
  'verses-for-family',
  'verses-about-friendship',
  'verses-about-forgiveness',
  'verses-for-children',
  'verses-for-work',
  // 三、属灵成长（Spiritual Growth）—— 8 个
  'verses-for-wisdom',
  'verses-about-faith',
  'verses-about-patience',
  'verses-for-gratitude',
  'verses-for-guidance',
  'verses-about-grace',
  'verses-about-mercy',
  'verses-about-trust',
  // 四、特定时刻与祝福（Occasions & Blessings）—— 7 个
  'verses-for-healing',
  'verses-for-birthday',
  'verses-for-morning',
  'verses-for-sleep',
  'verses-for-graduation',
  'verses-for-new-year',
  'verses-for-grief',
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
