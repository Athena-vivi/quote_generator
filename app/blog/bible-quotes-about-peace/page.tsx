import Link from 'next/link';
import BibleQuoteCard from '../../../components/BibleQuoteCard';
import FAQSection from '../../../components/FAQSection';

export const metadata = {
  title: "Bible Quotes About Peace",
  description: "Find comfort and calm with these Bible verses about peace. Let God’s word bring serenity and hope to your heart, even in times of trouble."
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
      <h1 className="block text-4xl font-bold text-amber-700 mb-2">Bible Quotes About Peace</h1>
      <span className="block text-lg text-gray-700 mb-8">
        Find comfort and calm with these Bible verses about peace. Let God’s word bring serenity and hope to your heart, even in times of trouble.
      </span>
      <div className="space-y-6 mb-12">
        <BibleQuoteCard reference="John 14:27" content="Peace I leave with you; my peace I give you. I do not give to you as the world gives. Do not let your hearts be troubled and do not be afraid." />
        <BibleQuoteCard reference="Philippians 4:7" content="And the peace of God, which transcends all understanding, will guard your hearts and your minds in Christ Jesus." />
        <BibleQuoteCard reference="Isaiah 26:3" content="You will keep in perfect peace those whose minds are steadfast, because they trust in you." />
        <BibleQuoteCard reference="Psalm 29:11" content="The Lord gives strength to his people; the Lord blesses his people with peace." />
      </div>
      <div className="bg-white/80 rounded-xl shadow p-6 mb-10">
        <FAQSection faqs={[
          { q: "How can I find peace through the Bible?", a: "Reading and meditating on Bible verses about peace can help calm your mind and bring comfort in difficult times." },
          { q: "Who are these peace verses for?", a: "Anyone seeking inner peace, comfort, or encouragement from God’s word." },
          { q: "Can I generate peace-themed images to share?", a: "Yes, simply click the button below to create and share beautiful images inspired by Bible verses about peace." }
        ]} />
      </div>
    </div>
  );
} 