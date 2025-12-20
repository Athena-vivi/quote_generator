import Link from 'next/link';
import BibleQuoteCard from '../../../components/BibleQuoteCard';
import FAQSection from '../../../components/FAQSection';
import { ArticleStructuredData, FAQStructuredData, BreadcrumbStructuredData } from '../../../components/seo/structured-data';

export const metadata = {
  title: "Bible Quotes About Love",
  description: "Discover heartwarming Bible verses about love—perfect for encouragement, sharing, and deepening your understanding of God's love. These scriptures inspire us to love one another as God loves us."
};

export default function Page() {
  // 结构化数据
  const breadcrumbs = [
    { name: "Home", url: "https://quotegenerator.com" },
    { name: "Blog", url: "https://quotegenerator.com/blog" },
    { name: "Bible Quotes About Love", url: "https://quotegenerator.com/blog/bible-quotes-about-love" }
  ];

  const faqs = [
    { q: "What does the Bible teach about love?", a: "The Bible teaches that love is patient, kind, and selfless. We are called to love one another as God loves us." },
    { q: "How can I apply these love verses in my life?", a: "By practicing kindness, forgiveness, and compassion, you can reflect God's love in your daily actions." },
    { q: "Can I generate love-themed images to share?", a: "Yes, simply click the button below to create and share beautiful images inspired by Bible verses about love." }
  ];

  return (
    <>
      {/* 结构化数据 */}
      <ArticleStructuredData
        title="Bible Quotes About Love"
        description="Discover heartwarming Bible verses about love—perfect for encouragement, sharing, and deepening your understanding of God's love."
        url="https://quotegenerator.com/blog/bible-quotes-about-love"
      />
      <BreadcrumbStructuredData items={breadcrumbs} />
      <FAQStructuredData faqs={faqs.map(faq => ({ question: faq.q, answer: faq.a }))} />

      <div className="max-w-6xl mx-auto py-12 px-4 md:px-8">
      <Link
        href="/blog"
        className="inline-block mb-8 px-4 py-2 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-medium shadow transition-colors text-base flex items-center gap-2"
      >
        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
        Back to Blog
      </Link>
      <h1 className="block text-4xl font-bold text-amber-700 mb-2">Bible Quotes About Love</h1>
      <span className="block text-lg text-gray-700 mb-8">
        Discover heartwarming Bible verses about love—perfect for encouragement, sharing, and deepening your understanding of God’s love. These scriptures inspire us to love one another as God loves us.
      </span>
      <div className="space-y-6 mb-12">
        <BibleQuoteCard reference="1 Corinthians 13:4" content="Love is patient, love is kind. It does not envy, it does not boast, it is not proud." />
        <BibleQuoteCard reference="John 15:12" content="My command is this: Love each other as I have loved you." />
        <BibleQuoteCard reference="1 John 4:7" content="Dear friends, let us love one another, for love comes from God. Everyone who loves has been born of God and knows God." />
        <BibleQuoteCard reference="Romans 12:10" content="Be devoted to one another in love. Honor one another above yourselves." />
      </div>
      <div className="bg-white/80 rounded-xl shadow p-6 mb-10">
        <FAQSection faqs={faqs} />
      </div>
    </div>
    </>
  );
} 