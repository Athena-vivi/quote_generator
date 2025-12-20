"use client"
import React from "react";
export default function BibleQuoteCard({ reference, content }: { reference: string; content: string }) {
  return (
    <div className="my-6 p-6 bg-white/90 rounded-lg shadow border-l-4 border-amber-400">
      <blockquote className="text-xl text-gray-800 italic mb-2">{content}</blockquote>
      <cite className="block text-amber-700 font-semibold">{reference}</cite>
    </div>
  );
} 