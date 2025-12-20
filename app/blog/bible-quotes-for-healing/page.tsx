import Link from 'next/link';
import BibleQuoteCard from '../../../components/BibleQuoteCard';
import FAQSection from '../../../components/FAQSection';

export const metadata = {
  title: "Bible Quotes for Healing",
  description: "Find hope and comfort in these Bible verses about healing. God’s word offers encouragement and strength for those seeking physical, emotional, or spiritual healing."
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
      <h1 className="block text-4xl font-bold text-amber-700 mb-2">Bible Quotes for Healing</h1>
      <span className="block text-lg text-gray-700 mb-8">
        Find hope and comfort in these Bible verses about healing. God’s word offers encouragement and strength for those seeking physical, emotional, or spiritual healing.
      </span>
      <div className="space-y-6 mb-12">
        <BibleQuoteCard reference="Jeremiah 17:14" content="Heal me, Lord, and I will be healed; save me and I will be saved, for you are the one I praise." />
        <BibleQuoteCard reference="Psalm 147:3" content="He heals the brokenhearted and binds up their wounds." />
        <BibleQuoteCard reference="Isaiah 53:5" content="But he was pierced for our transgressions, he was crushed for our iniquities; the punishment that brought us peace was on him, and by his wounds we are healed." />
        <BibleQuoteCard reference="James 5:15" content="And the prayer offered in faith will make the sick person well; the Lord will raise them up. If they have sinned, they will be forgiven." />
      </div>
      <div className="bg-white/80 rounded-xl shadow p-6 mb-10">
        <FAQSection faqs={[
          { q: "How can I find healing through the Bible?", a: "By reading and meditating on Bible verses about healing, you can find comfort, hope, and encouragement from God’s word." },
          { q: "Who are these healing verses for?", a: "Anyone seeking physical, emotional, or spiritual healing and comfort." },
          { q: "Can I generate healing-themed images to share?", a: "Yes, simply click the button below to create and share beautiful images inspired by Bible verses about healing." }
        ]} />
      </div>
    </div>
  );
} 