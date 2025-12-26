// Theme mappings with ESV Bible references
// Each theme maps to a list of scripture references for batch API queries

export interface Theme {
  slug: string
  name: string
  description: string
  icon: string
  gradient: string
  // ESV Bible references (e.g., "John 3:16", "Psalm 23:1-6")
  references: string[]
  // SEO metadata
  keywords: string[]
  title: string
}

export const themes: Record<string, Theme> = {
  // ============================================
  // 一、核心情绪（Emotional Support）—— 流量基石
  // ============================================
  "verses-for-peace": {
    slug: "verses-for-peace",
    name: "Peace",
    title: "Best Bible Verses for Peace - Find Serenity in Scripture",
    description: "Find serenity in God's promises. These scriptures bring perfect peace that surpasses all understanding.",
    icon: "Wind",
    gradient: "from-blue-400 to-cyan-300",
    keywords: ["peace bible verses", "scriptures for peace", "calm verses", "serenity scriptures", "god's peace"],
    references: [
      "Philippians 4:7", "John 14:27", "Isaiah 26:3", "Psalm 29:11", "Colossians 3:15",
      "2 Thessalonians 3:16", "Psalm 119:165", "Numbers 6:24-26", "Romans 15:13", "Psalm 4:8",
      "Isaiah 9:6", "Psalm 85:8", "Romans 14:19", "1 Peter 5:7", "Psalm 122:7-8",
      "John 16:33", "Psalm 37:7", "Proverbs 3:17", "Isaiah 32:17", "Psalm 72:7",
    ],
  },
  "verses-for-strength": {
    slug: "verses-for-strength",
    name: "Strength",
    title: "Best Bible Verses for Strength - Draw Mighty Power from God",
    description: "Draw mighty strength from scripture. These empowering verses remind you of God's power and your ability to overcome any challenge.",
    icon: "Shield",
    gradient: "from-amber-500 to-orange-400",
    keywords: ["strength bible verses", "powerful scriptures", "courage verses", "god's strength", "empowering bible quotes"],
    references: [
      "Philippians 4:13", "Isaiah 41:10", "Ephesians 6:10", "2 Timothy 1:7", "Deuteronomy 31:6",
      "Psalm 46:1", "Joshua 1:9", "Isaiah 40:31", "2 Corinthians 12:9", "Psalm 18:32",
      "Exodus 15:2", "1 Chronicles 16:11", "Psalm 28:7-8", "Habakkuk 3:19", "Nehemiah 8:10",
      "1 Corinthians 16:13", "Psalm 27:1", "2 Samuel 22:33", "Ephesians 3:16", "Colossians 1:11",
    ],
  },
  "verses-for-anxiety": {
    slug: "verses-for-anxiety",
    name: "Anxiety",
    title: "Best Bible Verses for Anxiety - Find Calm in Worrying Times",
    description: "Let go of worry with these reassuring scriptures. God's word brings peace to anxious hearts and troubled minds.",
    icon: "CloudRain",
    gradient: "from-slate-400 to-gray-300",
    keywords: ["anxiety bible verses", "worry scriptures", "verses for anxiety", "peaceful verses", "calming bible quotes"],
    references: [
      "Matthew 6:34", "1 Peter 5:7", "Psalm 23:4", "Matthew 11:28", "Philippians 4:6",
      "Psalm 55:22", "Luke 12:22", "Matthew 6:25-27", "Psalm 94:19", "Isaiah 41:10",
      "Psalm 56:3", "John 14:1", "Psalm 34:4", "Proverbs 12:25", "Psalm 46:10",
      "2 Corinthians 1:3-4", "Psalm 121:1-2", "Deuteronomy 31:8", "Psalm 27:1", "Joshua 1:9",
    ],
  },
  "verses-for-hope": {
    slug: "verses-for-hope",
    name: "Hope",
    title: "Best Bible Verses for Hope - Find Hope in God's Promises",
    description: "Discover uplifting scriptures that inspire hope and faith. God's promises bring light to dark times and strength for tomorrow.",
    icon: "Sunrise",
    gradient: "from-orange-400 to-yellow-300",
    keywords: ["hope bible verses", "scriptures of hope", "bible verses for hope", "hopeful scriptures", "god's hope"],
    references: [
      "Romans 15:13", "Jeremiah 29:11", "Hebrews 6:19", "Psalm 42:5", "Isaiah 40:31",
      "Romans 8:24-25", "Psalm 71:14", "1 Peter 1:3", "Psalm 130:5", "Lamentations 3:22-23",
      "Psalm 31:24", "Isaiah 43:19", "Romans 8:18", "Psalm 39:7", "Hebrews 10:23",
      "Psalm 146:5", "Titus 2:13", "1 Corinthians 15:58", "Psalm 33:18", "Psalm 33:20-22",
    ],
  },
  "verses-for-fear": {
    slug: "verses-for-fear",
    name: "Fear",
    title: "Best Bible Verses for Fear - Overcome Fear with Scripture",
    description: "Conquer fear and worry with God's word. These powerful verses remind you of God's protection and love in every situation.",
    icon: "ShieldAlert",
    gradient: "from-red-400 to-rose-300",
    keywords: ["fear bible verses", "overcoming fear scriptures", "verses for fear", "do not fear bible", "courage verses"],
    references: [
      "2 Timothy 1:7", "Isaiah 41:10", "Psalm 23:4", "Deuteronomy 31:6", "Psalm 27:1",
      "Joshua 1:9", "Psalm 56:3", "1 John 4:18", "Psalm 34:4", "Isaiah 43:1-2",
      "Matthew 10:31", "Luke 12:7", "Psalm 118:6", "Hebrews 13:6", "Psalm 46:1",
      "Exodus 14:13", "2 Chronicles 20:17", "Psalm 56:11", "Isaiah 54:17", "Psalm 91:4-5",
    ],
  },
  "verses-for-joy": {
    slug: "verses-for-joy",
    name: "Joy",
    title: "Best Bible Verses for Joy - Rejoice in God's Blessings",
    description: "Experience true joy through these uplifting scriptures. Celebrate God's goodness and find happiness in His presence.",
    icon: "Smile",
    gradient: "from-yellow-400 to-amber-300",
    keywords: ["joy bible verses", "scriptures of joy", "bible verses for joy", "rejoicing verses", "happiness scriptures"],
    references: [
      "Psalm 16:11", "Nehemiah 8:10", "Philippians 4:4", "Psalm 118:24", "John 15:11",
      "Psalm 30:5", "Romans 15:13", "Psalm 32:11", "Isaiah 12:3", "Habakkuk 3:17-18",
      "Psalm 5:11", "1 Thessalonians 5:16", "Psalm 100:1-2", "John 16:24", "Psalm 47:1",
      "Zephaniah 3:17", "Psalm 126:5-6", "Proverbs 17:22", "Psalm 51:12", "Galatians 5:22",
    ],
  },
  "verses-for-comfort": {
    slug: "verses-for-comfort",
    name: "Comfort",
    title: "Best Bible Verses for Comfort - Find Peace in Hard Times",
    description: "Find solace in these comforting scriptures. God's word brings healing to broken hearts and peace in times of sorrow.",
    icon: "HeartHandshake",
    gradient: "from-pink-400 to-rose-300",
    keywords: ["comfort bible verses", "scriptures for comfort", "bible verses for comfort", "consolation verses", "healing scriptures"],
    references: [
      "Matthew 11:28", "Psalm 23:4", "2 Corinthians 1:3-4", "Psalm 34:18", "Isaiah 51:12",
      "Psalm 119:50", "Psalm 23:1-3", "Psalm 71:21", "Lamentations 3:22-23", "Isaiah 40:1",
      "Psalm 94:19", "John 14:1", "Psalm 46:1", "2 Thessalonians 2:16-17", "1 Peter 5:7",
      "Psalm 27:13-14", "Psalm 9:9", "Isaiah 41:10", "Psalm 55:22", "Hebrews 4:15-16",
    ],
  },
  "verses-for-loneliness": {
    slug: "verses-for-loneliness",
    name: "Loneliness",
    title: "Best Bible Verses for Loneliness - God is Always With You",
    description: "You are never alone. These verses remind you of God's constant presence and love, even in your loneliest moments.",
    icon: "UserX",
    gradient: "from-indigo-400 to-violet-300",
    keywords: ["loneliness bible verses", "verses for loneliness", "scriptures for lonely", "god's presence verses", "never alone scriptures"],
    references: [
      "Psalm 23:4", "Matthew 28:20", "Psalm 139:7-10", "Deuteronomy 31:6", "Hebrews 13:5",
      "Isaiah 41:10", "Psalm 68:6", "John 14:18", "Psalm 27:10", "2 Timothy 4:16-17",
      "Psalm 25:16", "Psalm 34:18", "1 Peter 5:7", "Psalm 73:23-26", "Isaiah 43:2",
      "Psalm 46:1", "Joshua 1:9", "Psalm 9:9", "Zephaniah 3:17", "Romans 8:38-39",
    ],
  },

  // ============================================
  // 二、生活场景与关系（Life & Relationships）
  // ============================================
  "verses-about-love": {
    slug: "verses-about-love",
    name: "Love",
    title: "Best Bible Verses About Love - God's Love for You",
    description: "Explore the depth of God's love through these beautiful scriptures about love, compassion, and affection. Perfect for weddings and anniversaries.",
    icon: "Heart",
    gradient: "from-rose-500 to-pink-400",
    keywords: ["bible verses about love", "god's love scriptures", "love verses", "christian love quotes", "biblical love"],
    references: [
      "John 3:16", "1 Corinthians 13:4-7", "1 John 4:8", "Romans 8:38-39", "Ephesians 3:17-19",
      "John 13:34", "1 John 4:19", "Romans 5:8", "1 John 4:16", "1 Corinthians 16:14",
      "Colossians 3:14", "1 Peter 4:8", "1 John 3:1", "Ephesians 5:2", "Galatians 2:20",
      "Song of Solomon 8:6-7", "Proverbs 10:12", "1 Corinthians 13:13", "1 John 4:7", "Romans 13:8",
    ],
  },
  "verses-for-marriage": {
    slug: "verses-for-marriage",
    name: "Marriage",
    title: "Best Bible Verses for Marriage - Wedding Scripture Quotes",
    description: "Beautiful scriptures for weddings and married couples. These verses celebrate the sacred union of husband and wife in God's design.",
    icon: "Users",
    gradient: "from-fuchsia-400 to-pink-300",
    keywords: ["marriage bible verses", "wedding scriptures", "bible verses for marriage", "wedding bible quotes", "biblical marriage"],
    references: [
      "Ephesians 5:25-33", "1 Corinthians 13:4-8", "Genesis 2:24", "Ecclesiastes 4:12", "Colossians 3:18-19",
      "1 Peter 3:7", "Proverbs 18:22", "Proverbs 31:10-12", "Song of Solomon 2:16", "Song of Solomon 8:6-7",
      "Hebrews 13:4", "1 Corinthians 7:3-5", "Ephesians 4:32", "Philippians 2:2-4", "Genesis 1:27-28",
      "Proverbs 5:18-19", "Ecclesiastes 9:9", "1 Peter 4:8", "1 Corinthians 13:13", "Mark 10:6-9",
    ],
  },
  "verses-for-family": {
    slug: "verses-for-family",
    name: "Family",
    title: "Best Bible Verses for Family - Household Scripture Quotes",
    description: "Scriptures that honor the gift of family. These verses celebrate parents, children, and the bonds that unite households in faith.",
    icon: "Home",
    gradient: "from-orange-400 to-amber-300",
    keywords: ["family bible verses", "bible verses for family", "household scriptures", "biblical family", "family quotes"],
    references: [
      "Joshua 24:15", "Psalm 127:3-5", "Colossians 3:20", "Ephesians 6:1-4", "Exodus 20:12",
      "Proverbs 22:6", "Psalm 128:1-4", "Deuteronomy 6:6-7", "1 Timothy 5:8", "Proverbs 31:27-28",
      "Psalm 133:1", "Ephesians 5:31", "Genesis 18:19", "Joshua 1:8", "Matthew 19:19",
      "Proverbs 17:6", "Psalm 103:17-18", "1 Corinthians 13:4-7", "Galatians 5:22-23", "1 John 4:7",
    ],
  },
  "verses-about-friendship": {
    slug: "verses-about-friendship",
    name: "Friendship",
    title: "Best Bible Verses About Friendship - Biblical Friends Quotes",
    description: "Celebrate the gift of true friendship with these scriptures. Discover what God's word says about loyal, loving friends.",
    icon: "UserPlus",
    gradient: "from-teal-400 to-cyan-300",
    keywords: ["friendship bible verses", "bible verses about friendship", "biblical friendship", "friends scriptures", "true friend quotes"],
    references: [
      "Proverbs 17:17", "Proverbs 27:9", "Ecclesiastes 4:9-10", "Proverbs 27:17", "John 15:13",
      "Proverbs 18:24", "1 Samuel 18:1-3", "Proverbs 22:24-25", "1 Thessalonians 5:11", "Hebrews 10:24-25",
      "Proverbs 13:20", "Job 2:11-13", "Proverbs 12:26", "Ecclesiastes 7:9", "James 4:4",
      "1 Corinthians 15:33", "Philippians 2:3-4", "Romans 12:10", "Colossians 3:13", "Galatians 6:2",
    ],
  },
  "verses-about-forgiveness": {
    slug: "verses-about-forgiveness",
    name: "Forgiveness",
    title: "Best Bible Verses About Forgiveness - Learn to Forgive",
    description: "Discover the power of forgiveness through these scriptures. God's word teaches us how to forgive others and receive God's mercy.",
    icon: "RefreshCw",
    gradient: "from-green-400 to-emerald-300",
    keywords: ["forgiveness bible verses", "bible verses about forgiveness", "forgiving scriptures", "mercy verses", "let go of anger"],
    references: [
      "Ephesians 4:32", "Colossians 3:13", "Matthew 6:14-15", "Matthew 18:21-22", "Mark 11:25",
      "Luke 6:37", "Luke 17:3-4", "1 John 1:9", "Psalm 103:12", "Isaiah 43:25",
      "Micah 7:18-19", "Psalm 32:5", "1 John 2:1-2", "2 Corinthians 5:18-19", "Daniel 9:9",
      "Matthew 5:7", "James 5:16", "Proverbs 17:9", "1 Peter 4:8", "Romans 12:17-21",
    ],
  },
  "verses-for-children": {
    slug: "verses-for-children",
    name: "Children",
    title: "Best Bible Verses for Children - Kids Scripture Quotes",
    description: "Sweet scriptures perfect for children and families. These verses teach kids about God's love in simple, memorable ways.",
    icon: "Baby",
    gradient: "from-sky-400 to-blue-300",
    keywords: ["bible verses for children", "kids bible verses", "scriptures for kids", "children's bible quotes", "youth scriptures"],
    references: [
      "Psalm 127:3", "Matthew 19:14", "Proverbs 22:6", "Ephesians 6:1-3", "Colossians 3:20",
      "Exodus 20:12", "Psalm 139:13-16", "Isaiah 54:13", "Luke 2:52", "3 John 1:4",
      "Psalm 8:2", "Matthew 18:2-6", "Psalm 119:9-11", "Deuteronomy 6:5-7", "Joshua 1:9",
      "Proverbs 1:8-9", "Psalm 145:4", "2 Timothy 3:14-15", "Psalm 71:5-6", "Psalm 17:8",
    ],
  },
  "verses-for-work": {
    slug: "verses-for-work",
    name: "Work",
    title: "Best Bible Verses for Work - Career & Success Scripture",
    description: "Biblical wisdom for your career and workplace. These verses inspire excellence, integrity, and purpose in your daily work.",
    icon: "Briefcase",
    gradient: "from-slate-500 to-gray-400",
    keywords: ["bible verses for work", "workplace scriptures", "career bible verses", "job scriptures", "work ethic quotes"],
    references: [
      "Colossians 3:23", "Proverbs 16:3", "Proverbs 22:29", "1 Corinthians 15:58", "Ephesians 6:5-8",
      "Proverbs 12:11", "Proverbs 13:11", "Proverbs 6:6-8", "Genesis 2:15", "Exodus 20:9",
      "Proverbs 31:17", "Nehemiah 4:6", "1 Thessalonians 4:11-12", "2 Thessalonians 3:10", "Titus 2:7-8",
      "Proverbs 10:4", "Luke 10:7", "1 Timothy 5:18", "Proverbs 14:23", "Ecclesiastes 9:10",
    ],
  },

  // ============================================
  // 三、属灵成长（Spiritual Growth）
  // ============================================
  "verses-for-wisdom": {
    slug: "verses-for-wisdom",
    name: "Wisdom",
    title: "Best Bible Verses for Wisdom - Divine Understanding",
    description: "Guidance for life's decisions. These scriptures offer divine wisdom and understanding for navigating life's challenges.",
    icon: "BookOpen",
    gradient: "from-violet-400 to-purple-300",
    keywords: ["wisdom bible verses", "understanding scriptures", "guidance verses", "biblical wisdom", "godly wisdom"],
    references: [
      "Proverbs 3:5-6", "James 1:5", "Proverbs 9:10", "Colossians 2:3", "Ephesians 5:15-16",
      "Proverbs 16:16", "Proverbs 4:7", "Ecclesiastes 7:12", "Proverbs 1:7", "Proverbs 2:6",
      "Job 12:13", "Daniel 2:21", "Proverbs 8:11", "Proverbs 15:33", "Psalm 111:10",
      "Proverbs 19:20", "Proverbs 24:3-4", "Proverbs 13:10", "Proverbs 14:8", "1 Kings 4:29",
    ],
  },
  "verses-about-faith": {
    slug: "verses-about-faith",
    name: "Faith",
    title: "Best Bible Verses About Faith - Strengthen Your Belief",
    description: "Inspiring scriptures to deepen your faith. These verses encourage trust in God's promises and power in every circumstance.",
    icon: "Sparkles",
    gradient: "from-cyan-400 to-blue-300",
    keywords: ["faith bible verses", "bible verses about faith", "faith scriptures", "trust in god verses", "believing scriptures"],
    references: [
      "Hebrews 11:1", "Hebrews 11:6", "Romans 10:17", "Matthew 17:20", "Mark 11:22-24",
      "2 Corinthians 5:7", "Galatians 2:20", "Romans 5:1", "Ephesians 2:8-9", "James 2:17-18",
      "1 John 5:4", "Romans 4:20-21", "Matthew 21:22", "John 20:29", "Acts 16:31",
      "Psalm 46:1-3", "Psalm 9:10", "Proverbs 3:5-6", "Isaiah 26:4", "Habakkuk 2:4",
    ],
  },
  "verses-about-patience": {
    slug: "verses-about-patience",
    name: "Patience",
    title: "Best Bible Verses About Patience - Wait on the Lord",
    description: "Learn patience through these scriptures. God's word teaches endurance and trust during times of waiting.",
    icon: "Hourglass",
    gradient: "from-amber-400 to-yellow-300",
    keywords: ["patience bible verses", "bible verses about patience", "endurance scriptures", "waiting verses", "perseverance quotes"],
    references: [
      "Galatians 6:9", "James 5:7-8", "Romans 12:12", "Ephesians 4:2", "Colossians 3:12",
      "Proverbs 14:29", "Psalm 27:14", "Isaiah 40:31", "Lamentations 3:25-26", "Psalm 37:7",
      "Hebrews 10:36", "2 Peter 3:9", "Romans 8:25", "Hebrews 6:12", "James 1:3-4",
      "Psalm 130:5", "Micah 7:7", "Hosea 12:6", "Psalm 40:1", "Ecclesiastes 7:8",
    ],
  },
  "verses-for-gratitude": {
    slug: "verses-for-gratitude",
    name: "Gratitude",
    title: "Best Bible Verses for Gratitude - Thankful Heart Scriptures",
    description: "Cultivate a thankful heart with these verses. Learn the power of gratitude and praise in every season of life.",
    icon: "Wand2",
    gradient: "from-rose-400 to-pink-300",
    keywords: ["gratitude bible verses", "thankfulness scriptures", "verses for gratitude", "thanksgiving verses", "grateful heart"],
    references: [
      "1 Thessalonians 5:18", "Psalm 107:1", "Philippians 4:6", "Psalm 100:4", "Colossians 3:17",
      "Psalm 136:1", "Ephesians 5:20", "Psalm 118:1", "James 1:17", "Psalm 69:30",
      "1 Chronicles 16:34", "Psalm 106:1", "2 Corinthians 9:15", "Psalm 92:1-2", "Hebrews 13:15",
      "Psalm 28:7", "Psalm 103:1-5", "Psalm 95:2-3", "Psalm 30:4", "Colossians 2:6-7",
    ],
  },
  "verses-for-guidance": {
    slug: "verses-for-guidance",
    name: "Guidance",
    title: "Best Bible Verses for Guidance - Find God's Direction",
    description: "Seeking direction? These verses offer divine guidance for life's decisions. Trust God to lead your path.",
    icon: "Compass",
    gradient: "from-blue-500 to-indigo-400",
    keywords: ["guidance bible verses", "verses for guidance", "direction scriptures", "god's guidance", "decision making verses"],
    references: [
      "Proverbs 3:5-6", "Psalm 25:9", "Psalm 32:8", "Psalm 119:105", "Isaiah 30:21",
      "Proverbs 16:9", "James 1:5", "Psalm 73:24", "Isaiah 48:17", "Psalm 23:3",
      "Proverbs 11:14", "Psalm 143:10", "Isaiah 58:11", "John 16:13", "Psalm 119:133",
      "Proverbs 4:11", "Psalm 27:11", "Psalm 25:4-5", "Joshua 1:8", "Matthew 6:33",
    ],
  },
  "verses-about-grace": {
    slug: "verses-about-grace",
    name: "Grace",
    title: "Best Bible Verses About Grace - God's Unmerited Favor",
    description: "Experience God's amazing grace through these scriptures. Discover His unmerited favor and love for sinners.",
    icon: "Droplet",
    gradient: "from-purple-400 to-fuchsia-300",
    keywords: ["grace bible verses", "bible verses about grace", "god's grace scriptures", "amazing grace verses", "unmerited favor"],
    references: [
      "Ephesians 2:8-9", "2 Corinthians 12:9", "Romans 6:14", "Titus 2:11-12", "Romans 5:20-21",
      "John 1:16-17", "2 Timothy 2:1", "Hebrews 4:16", "1 Peter 4:10", "James 4:6",
      "Romans 3:24", "1 Corinthians 15:10", "Romans 5:2", "Galatians 1:15", "Acts 15:11",
      "Ephesians 1:6-7", "1 John 3:1", "Romans 11:6", "2 Corinthians 9:8", "1 Timothy 1:14",
    ],
  },
  "verses-about-mercy": {
    slug: "verses-about-mercy",
    name: "Mercy",
    title: "Best Bible Verses About Mercy - Compassion of God",
    description: "Discover God's limitless mercy. These verses reveal His compassion, forgiveness, and lovingkindness toward us.",
    icon: "HeartPulse",
    gradient: "from-red-400 to-pink-300",
    keywords: ["mercy bible verses", "bible verses about mercy", "god's mercy scriptures", "compassion verses", "lovingkindness"],
    references: [
      "Lamentations 3:22-23", "Ephesians 2:4-5", "Psalm 136:1-26", "Psalm 103:8", "Titus 3:5",
      "Micah 7:18", "Hebrews 4:16", "Psalm 86:5", "Psalm 145:8-9", "1 Peter 1:3",
      "Matthew 5:7", "James 2:13", "Proverbs 28:13", "Daniel 9:9", "Psalm 25:6-7",
      "2 Samuel 24:14", "Luke 1:77-78", "Psalm 123:3", "Romans 9:15-16", "Psalm 130:7",
    ],
  },
  "verses-about-trust": {
    slug: "verses-about-trust",
    name: "Trust",
    title: "Best Bible Verses About Trust - Lean on God",
    description: "Learn to trust God completely. These scriptures encourage you to place your faith in His unfailing character.",
    icon: "ShieldCheck",
    gradient: "from-emerald-400 to-green-300",
    keywords: ["trust bible verses", "bible verses about trust", "trusting god scriptures", "faith in god verses", "reliance on god"],
    references: [
      "Proverbs 3:5-6", "Psalm 37:5", "Psalm 56:3", "Isaiah 26:4", "Psalm 118:8-9",
      "Psalm 9:10", "Psalm 37:7", "Psalm 62:8", "Proverbs 16:3", "Psalm 28:7",
      "Psalm 40:4", "Psalm 31:14-15", "Psalm 112:7", "Psalm 146:3-5", "Job 13:15",
      "Psalm 20:7", "Psalm 44:3", "Psalm 91:2", "Psalm 119:42", "2 Chronicles 20:20",
    ],
  },

  // ============================================
  // 四、特定时刻与祝福（Occasions & Blessings）
  // ============================================
  "verses-for-birthday": {
    slug: "verses-for-birthday",
    name: "Birthday",
    title: "Best Bible Verses for Birthday - Blessings & Celebrations",
    description: "Celebrate life with these birthday scriptures. Perfect verses for birthday cards, blessings, and celebrations.",
    icon: "Cake",
    gradient: "from-pink-400 to-fuchsia-300",
    keywords: ["birthday bible verses", "bible verses for birthday", "birthday scriptures", "birthday blessings", "celebration verses"],
    references: [
      "Psalm 118:24", "Psalm 139:13-16", "Jeremiah 29:11", "Numbers 6:24-26", "Psalm 90:14",
      "Psalm 20:4", "Psalm 65:11", "Psalm 71:6", "Psalm 16:11", "Ecclesiastes 11:7",
      "Psalm 37:4", "Psalm 1:1-3", "Psalm 92:12-14", "Proverbs 9:11", "3 John 1:2",
      "Psalm 103:5", "Psalm 91:11", "Psalm 121:7-8", "Psalm 139:17-18", "Proverbs 3:1-2",
    ],
  },
  "verses-for-morning": {
    slug: "verses-for-morning",
    name: "Morning",
    title: "Best Bible Verses for Morning - Daily Devotion & Prayer",
    description: "Start each day with God's word. These morning scriptures inspire prayer, gratitude, and purpose for the day ahead.",
    icon: "Sun",
    gradient: "from-amber-400 to-orange-300",
    keywords: ["morning bible verses", "bible verses for morning", "daily devotion scriptures", "morning prayer verses", "early morning verses"],
    references: [
      "Psalm 143:8", "Psalm 5:3", "Lamentations 3:22-23", "Psalm 90:14", "Isaiah 26:9",
      "Psalm 119:147", "Exodus 33:14", "Psalm 57:7-8", "Psalm 118:24", "Mark 1:35",
      "Psalm 59:16", "Psalm 92:1-2", "Psalm 63:1", "Psalm 5:1-3", "Proverbs 8:17",
      "Isaiah 33:2", "Psalm 3:5", "Psalm 19:14", "Psalm 25:5", "Psalm 130:5-6",
    ],
  },
  "verses-for-sleep": {
    slug: "verses-for-sleep",
    name: "Sleep",
    title: "Best Bible Verses for Sleep - Peaceful Night Rest",
    description: "Find peaceful rest with these bedtime scriptures. God's word brings comfort and calm for a restful night's sleep.",
    icon: "Moon",
    gradient: "from-indigo-500 to-blue-400",
    keywords: ["sleep bible verses", "bible verses for sleep", "bedtime scriptures", "night verses", "peaceful rest verses"],
    references: [
      "Psalm 4:8", "Psalm 3:5", "Psalm 127:2", "Proverbs 3:24", "Psalm 91:1-2",
      "Psalm 23:1-3", "Matthew 11:28", "Psalm 116:7", "Psalm 121:4", "Isaiah 26:3-4",
      "Psalm 119:148", "Psalm 63:6-7", "Psalm 42:8", "Psalm 16:7", "Psalm 17:8",
      "Job 11:18-19", "Leviticus 26:6", "Proverbs 4:20-22", "Psalm 29:11", "Psalm 46:10",
    ],
  },
  "verses-for-healing": {
    slug: "verses-for-healing",
    name: "Healing",
    title: "Best Bible Verses for Healing - God's Restoration Power",
    description: "Find solace in these healing verses. Perfect for times of sickness, grief, or when you need God's comforting presence.",
    icon: "Sparkles",
    gradient: "from-emerald-400 to-teal-300",
    keywords: ["healing bible verses", "comfort scriptures", "recovery verses", "god's healing", "restoration scriptures"],
    references: [
      "Psalm 147:3", "Isaiah 53:5", "Jeremiah 17:14", "Psalm 103:2-3", "Revelation 21:4",
      "Psalm 30:2", "Isaiah 41:10", "Exodus 23:25", "Psalm 107:19-20", "Jeremiah 33:6",
      "3 John 1:2", "Proverbs 4:20-22", "Psalm 41:3", "Isaiah 57:18-19", "Psalm 6:2",
      "Matthew 8:17", "1 Peter 2:24", "James 5:14-15", "Mark 5:34", "Luke 8:48",
    ],
  },
  "verses-for-graduation": {
    slug: "verses-for-graduation",
    name: "Graduation",
    title: "Best Bible Verses for Graduation - Achievement & Future",
    description: "Celebrate graduation with inspiring scriptures. These verses honor achievement and bless future endeavors.",
    icon: "GraduationCap",
    gradient: "from-blue-400 to-indigo-300",
    keywords: ["graduation bible verses", "bible verses for graduation", "graduation scriptures", "achievement verses", "future blessings"],
    references: [
      "Jeremiah 29:11", "Philippians 1:6", "Proverbs 16:3", "Psalm 90:17", "Joshua 1:9",
      "Proverbs 3:5-6", "Philippians 4:13", "Psalm 32:8", "Numbers 6:24-26", "Psalm 20:4",
      "Psalm 37:5", "Isaiah 40:31", "2 Timothy 1:7", "Psalm 119:105", "1 Corinthians 16:13-14",
      "Colossians 3:23", "Proverbs 22:29", "Ephesians 2:10", "Psalm 138:8", "Philippians 4:6-7",
    ],
  },
  "verses-for-new-year": {
    slug: "verses-for-new-year",
    name: "New Year",
    title: "Best Bible Verses for New Year - Fresh Start & Blessings",
    description: "Welcome the new year with these scriptures. Verses celebrating new beginnings, fresh starts, and God's faithfulness.",
    icon: "Calendar",
    gradient: "from-purple-400 to-indigo-300",
    keywords: ["new year bible verses", "bible verses for new year", "new year scriptures", "new beginning verses", "fresh start quotes"],
    references: [
      "Isaiah 43:18-19", "Lamentations 3:22-23", "2 Corinthians 5:17", "Philippians 3:13-14", "Ephesians 4:22-24",
      "Psalm 65:11", "Numbers 6:24-26", "Jeremiah 29:11", "Psalm 90:17", "Proverbs 16:9",
      "Psalm 118:24", "Isaiah 40:31", "Joshua 1:9", "Psalm 100:1-5", "Revelation 21:5",
      "Ezekiel 36:26", "Philippians 4:6-7", "Psalm 37:5", "Psalm 33:11", "Proverbs 3:5-6",
    ],
  },
  "verses-for-grief": {
    slug: "verses-for-grief",
    name: "Grief",
    title: "Best Bible Verses for Grief - Comfort in Loss",
    description: "Find hope in times of loss. These comforting scriptures bring peace and hope during seasons of grief and mourning.",
    icon: "HeartOff",
    gradient: "from-gray-400 to-slate-300",
    keywords: ["grief bible verses", "bible verses for grief", "mourning scriptures", "loss verses", "bereavement quotes"],
    references: [
      "Psalm 34:18", "Matthew 5:4", "Revelation 21:4", "Psalm 23:4", "Isaiah 41:10",
      "Psalm 147:3", "2 Corinthians 1:3-4", "Psalm 73:26", "Psalm 46:1", "John 11:25-26",
      "Romans 8:38-39", "Psalm 116:15", "1 Thessalonians 4:13-14", "Psalm 30:5", "Isaiah 57:18",
      "Lamentations 3:31-33", "Psalm 27:13", "Psalm 56:8", "Job 1:21", "2 Samuel 1:23",
    ],
  },
}

// Export all theme slugs for generateStaticParams
export const themeSlugs = Object.keys(themes)

// Export themes array for the themes list page
export const themesList = Object.values(themes)
