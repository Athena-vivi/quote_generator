"use client"
import React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
export default function CTASection() {
  const router = useRouter();
  return (
    <div className="my-8 text-center flex flex-col md:flex-row gap-4 justify-center">
      <button
        className="bg-amber-600 text-white px-8 py-4 rounded-lg text-lg shadow-lg hover:bg-amber-700 transition"
        onClick={() => router.push('/subscribe')}
      >
        Subscribe to Daily Quotes
      </button>
      <a
        href="/generate"
        className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg shadow-lg hover:bg-blue-700 transition inline-block text-center"
      >
        Generate Your Own Image
      </a>
    </div>
  );
} 