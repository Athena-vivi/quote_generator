import Link from 'next/link';
import BibleQuoteCard from '../../../components/BibleQuoteCard';
import FAQSection from '../../../components/FAQSection';

export const metadata = {
  title: "Inspirational Bible Verses",
  description: "Uplifting and inspirational Bible verses to encourage you every day. Let these scriptures fill your heart with hope, faith, and motivation."
};

export default function Page() {
  return (
    <div className="max-w-6xl mx-auto py-12 px-4 md:px-8">
      <Link
        href="/blog"
        className="inline-block mb-8 px-4 py-2 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-medium shadow transition-colors text-base flex items-center gap-2"
      >
        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
        Back to Blog
      </Link>
      <h1 className="block text-4xl font-bold text-amber-700 mb-2">Inspirational Bible Verses</h1>
      <span className="block text-lg text-gray-700 mb-8">
        Uplifting and inspirational Bible verses to encourage you every day. Let these scriptures fill your heart with hope, faith, and motivation.
      </span>
      <div className="space-y-6 mb-12">
        <BibleQuoteCard reference="Jeremiah 29:11" content="For I know the plans I have for you, declares the Lord, plans for welfare and not for evil, to give you a future and a hope." />
        <BibleQuoteCard reference="Romans 8:28" content="And we know that in all things God works for the good of those who love him, who have been called according to his purpose." />
        <BibleQuoteCard reference="Psalm 37:4" content="Take delight in the Lord, and he will give you the desires of your heart." />
        <BibleQuoteCard reference="Philippians 1:6" content="Being confident of this, that he who began a good work in you will carry it on to completion until the day of Christ Jesus." />
      </div>
      <div className="bg-white/80 rounded-xl shadow p-6 mb-10">
        <FAQSection faqs={[
          { q: "How can I find inspiration in the Bible?", a: "By reading and reflecting on inspirational Bible verses, you can find hope, motivation, and encouragement for any situation." },
          { q: "Who are these inspirational verses for?", a: "Anyone seeking daily encouragement, motivation, or spiritual growth from God’s word." },
          { q: "Can I generate inspirational images to share?", a: "Yes, simply click the button below to create and share beautiful images inspired by inspirational Bible verses." }
        ]} />
      </div>
    </div>
  );
} 