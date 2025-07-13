"use client"
import { useEffect } from "react"

export function HashScrollToQuoteFinder() {
  useEffect(() => {
    if (window.location.hash === "#quote-finder") {
      const el = document.getElementById("quote-finder");
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 100);
      }
    }
  }, []);
  return null;
} 