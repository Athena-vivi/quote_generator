import Link from 'next/link';
import BibleQuoteCard from '../../../components/BibleQuoteCard';
import FAQSection from '../../../components/FAQSection';

export const metadata = {
  title: "Bible Quotes About Strength and Resilience",
  description: "Discover powerful Bible verses about strength and resilience. These scriptures offer encouragement and hope for anyone facing challenges or seeking God’s strength."
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
      <h1 className="block text-4xl font-bold text-amber-700 mb-2">Bible Quotes About Strength and Resilience</h1>
      <span className="block text-lg text-gray-700 mb-8">
        Discover powerful Bible verses about strength and resilience. These scriptures offer encouragement and hope for anyone facing challenges or seeking God’s strength.
      </span>
      <div className="space-y-6 mb-12">
        <BibleQuoteCard reference="Philippians 4:13" content="I can do all things through him who gives me strength." />
        <BibleQuoteCard reference="Isaiah 40:31" content="But those who hope in the Lord will renew their strength. They will soar on wings like eagles; they will run and not grow weary, they will walk and not be faint." />
        <BibleQuoteCard reference="Psalm 46:1" content="God is our refuge and strength, an ever-present help in trouble." />
        <BibleQuoteCard reference="Nehemiah 8:10" content="Do not grieve, for the joy of the Lord is your strength." />
      </div>
      <div className="bg-white/80 rounded-xl shadow p-6 mb-10">
        <FAQSection faqs={[
          { q: "How can I find strength in difficult times?", a: "By trusting in God and meditating on Bible verses about strength, you can find hope and encouragement." },
          { q: "Who are these strength verses for?", a: "Anyone facing challenges, hardships, or seeking encouragement from God’s word." },
          { q: "Can I generate strength-themed images to share?", a: "Yes, simply click the button below to create and share beautiful images inspired by Bible verses about strength." }
        ]} />
      </div>
    </div>
  );
} 