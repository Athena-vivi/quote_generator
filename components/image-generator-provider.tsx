"use client"

import { useImageGenerator } from "@/contexts/image-generator-context"
import dynamic from "next/dynamic"
import { Loader2 } from "lucide-react"

// Dynamically import ImageGenerator to avoid SSR issues
const ImageGenerator = dynamic(
  () => import("@/components/image-generator"),
  {
    loading: () => (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <Loader2 className="w-8 h-8 text-amber-500 animate-spin" />
      </div>
    ),
    ssr: false,
  }
)

export function ImageGeneratorWrapper() {
  const { isImageGeneratorOpen, selectedQuote, closeImageGenerator } = useImageGenerator()

  if (!isImageGeneratorOpen || !selectedQuote) {
    return null
  }

  return <ImageGenerator quote={selectedQuote} onClose={closeImageGenerator} />
}
