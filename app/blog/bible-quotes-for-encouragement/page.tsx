import Link from 'next/link';
import BibleQuoteCard from '../../../components/BibleQuoteCard';
import FAQSection from '../../../components/FAQSection';

export const metadata = {
  title: "Bible Quotes for Encouragement",
  description: "Encouraging and motivational Bible verses to help you regain confidence."
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
      <h1 className="block text-4xl font-bold text-amber-700 mb-2">Bible Quotes for Encouragement</h1>
      <span className="block text-lg text-gray-700 mb-8">
        Encouraging and motivational Bible verses to help you regain confidence.
      </span>
      <div className="space-y-6 mb-12">
        <BibleQuoteCard reference="Joshua 1:9" content="Be strong and courageous. Do not be afraid; do not be discouraged, for the Lord your God will be with you wherever you go." />
        <BibleQuoteCard reference="Isaiah 41:10" content="So do not fear, for I am with you; do not be dismayed, for I am your God. I will strengthen you and help you; I will uphold you with my righteous right hand." />
        <BibleQuoteCard reference="Psalm 31:24" content="Be strong and take heart, all you who hope in the Lord." />
        <BibleQuoteCard reference="Romans 15:13" content="May the God of hope fill you with all joy and peace as you trust in him, so that you may overflow with hope by the power of the Holy Spirit." />
      </div>
      <div className="bg-white/80 rounded-xl shadow p-6 mb-10">
        <FAQSection faqs={[
          { q: "How can I find encouragement in the Bible?", a: "By reading and meditating on Bible verses for encouragement, you can find hope and strength in God’s word." },
          { q: "Who are these encouragement verses for?", a: "Anyone in need of encouragement, hope, or support during difficult times." },
          { q: "Can I generate encouragement-themed images to share?", a: "Yes, simply click the button below to create and share beautiful images inspired by Bible verses for encouragement." }
        ]} />
      </div>
    </div>
  );
} 