import React from "react";
import type { Metadata } from "next";

interface VerseData {
  text: string;
  reference: string;
  translation?: string;
}

async function fetchVerse(reference: string): Promise<VerseData | null> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ""}/api/verses/search`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: reference, type: "direct" }),
      cache: "no-store",
    });
    const data = await res.json();
    if (data.success && data.quote) {
      return {
        text: data.quote,
        reference,
        translation: "ESV", // 默认ESV，可后续动态
      };
    }
    return null;
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const reference = decodeURIComponent(params.id);
  const verse = await fetchVerse(reference);
  if (verse) {
    return {
      title: `${verse.text.slice(0, 48)}${verse.text.length > 48 ? '...' : ''} | quotegenerator`,
      description: `${verse.reference} (${verse.translation || 'ESV'}) - ${verse.text}`,
      openGraph: {
        title: `${verse.text.slice(0, 48)}${verse.text.length > 48 ? '...' : ''} | quotegenerator`,
        description: `${verse.reference} (${verse.translation || 'ESV'}) - ${verse.text}`,
      },
      twitter: {
        title: `${verse.text.slice(0, 48)}${verse.text.length > 48 ? '...' : ''} | quotegenerator`,
        description: `${verse.reference} (${verse.translation || 'ESV'}) - ${verse.text}`,
      },
    };
  }
  return {
    title: "Bible Verse | quotegenerator",
    description: "Bible verse card, beautifully typeset for sharing and meditation.",
  };
}

export default async function Page({ params }: { params: { id: string } }) {
  // id 可能为 John%203:16 需解码
  const reference = decodeURIComponent(params.id);
  const verse = await fetchVerse(reference);

  return (
    <main
      className="min-h-screen flex flex-col items-center justify-center bg-white px-4 py-12"
      style={{ fontFamily: 'EB Garamond, Playfair Display, serif' }}
    >
      <div className="w-16 h-0.5 bg-gray-200 mb-8" />
      <section className="max-w-xl w-full text-center">
        {!verse && (
          <div className="text-gray-500 text-lg">Verse not found or failed to load.</div>
        )}
        {verse && (
          <>
            <h1
              className="text-3xl md:text-5xl font-semibold mb-8 tracking-wide text-gray-900 select-text leading-snug"
              style={{ letterSpacing: '0.04em', textShadow: '0 2px 8px rgba(0,0,0,0.04)' }}
            >
              {verse.text}
            </h1>
            <div className="mt-6 text-base md:text-lg text-gray-500 font-light tracking-wider">
              {verse.reference} <span className="ml-2 text-xs">({verse.translation})</span>
            </div>
          </>
        )}
      </section>
      <div className="w-16 h-0.5 bg-gray-200 mt-8" />
    </main>
  );
} 