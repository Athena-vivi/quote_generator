"use client"
import React from "react";
export default function FAQSection({ faqs }: { faqs: { q: string; a: string }[] }) {
  return (
    <div className="my-8">
      <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
      <ul>
        {faqs.map((faq, idx) => (
          <li key={idx} className="mb-4">
            <strong className="block text-gray-800 mb-1">Q: {faq.q}</strong>
            <span className="block text-gray-600">A: {faq.a}</span>
          </li>
        ))}
      </ul>
    </div>
  );
} 