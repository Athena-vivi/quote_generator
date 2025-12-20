import Link from 'next/link';
import BibleQuoteCard from '../../../components/BibleQuoteCard';
import FAQSection from '../../../components/FAQSection';

export const metadata = {
  title: "Bible Quotes for Anxiety",
  description: "Bible verses for relieving anxiety and stress, bringing inner peace."
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
      <h1 className="block text-4xl font-bold text-amber-700 mb-2">Bible Quotes for Anxiety</h1>
      <span className="block text-lg text-gray-700 mb-8">
        Bible verses for relieving anxiety and stress, bringing inner peace.
      </span>
      <div className="space-y-6 mb-12">
        <BibleQuoteCard reference="Philippians 4:6" content="Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God." />
        <BibleQuoteCard reference="1 Peter 5:7" content="Cast all your anxiety on him because he cares for you." />
        <BibleQuoteCard reference="Matthew 6:34" content="Therefore do not worry about tomorrow, for tomorrow will worry about itself. Each day has enough trouble of its own." />
        <BibleQuoteCard reference="Psalm 94:19" content="When anxiety was great within me, your consolation brought me joy." />
      </div>
      <div className="bg-white/80 rounded-xl shadow p-6 mb-10">
        <FAQSection faqs={[
          { q: "How can Bible verses help with anxiety?", a: "Reading and reflecting on Bible verses about anxiety can bring peace and reassurance during stressful times." },
          { q: "Who are these anxiety verses for?", a: "Anyone experiencing anxiety, stress, or worry and seeking comfort from God’s word." },
          { q: "Can I generate anxiety-relief images to share?", a: "Yes, simply click the button below to create and share beautiful images inspired by Bible verses for anxiety relief." }
        ]} />
      </div>
    </div>
  );
} 