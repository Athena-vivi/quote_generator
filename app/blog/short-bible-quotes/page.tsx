import Link from 'next/link';
import BibleQuoteCard from '../../../components/BibleQuoteCard';
import FAQSection from '../../../components/FAQSection';

export const metadata = {
  title: "Short Bible Quotes",
  description: "A collection of the most concise and powerful short Bible quotes for daily encouragement, inspiration, and sharing. Perfect for quick reminders of God’s love and promises."
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
      <h1 className="block text-4xl font-bold text-amber-700 mb-2">Short Bible Quotes</h1>
      <span className="block text-lg text-gray-700 mb-8">
        A collection of the most concise and powerful short Bible quotes for daily encouragement, inspiration, and sharing. Perfect for quick reminders of God’s love and promises.
      </span>
      <div className="space-y-6 mb-12">
        <BibleQuoteCard reference="John 3:16" content="For God so loved the world, that he gave his only Son, that whoever believes in him should not perish but have eternal life." />
        <BibleQuoteCard reference="Psalm 23:1" content="The Lord is my shepherd; I shall not want." />
        <BibleQuoteCard reference="1 Thessalonians 5:16" content="Rejoice always." />
        <BibleQuoteCard reference="Psalm 56:3" content="When I am afraid, I put my trust in you." />
      </div>
      <div className="bg-white/80 rounded-xl shadow p-6 mb-10">
        <FAQSection faqs={[
          { q: "Why choose short Bible quotes?", a: "Short Bible quotes are easy to remember and perfect for daily encouragement, sharing, and meditation." },
          { q: "Who are these short quotes suitable for?", a: "Anyone seeking quick inspiration, comfort, or reminders of God’s love." },
          { q: "Can I generate shareable images with short quotes?", a: "Yes, simply click the button below to create and share beautiful images inspired by short Bible quotes." }
        ]} />
      </div>
    </div>
  );
} 