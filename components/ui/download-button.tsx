"use client"

import { useState } from 'react'
import { Download, Share2, CheckCircle } from 'lucide-react'
import { downloadImage, generateQuoteImage } from '@/lib/download-image'
import { Button } from './button'
import { toast } from 'sonner'

interface DownloadButtonProps {
  imageUrl: string
  quoteText: string
  reference: string
  className?: string
}

export function DownloadButton({
  imageUrl,
  quoteText,
  reference,
  className = ''
}: DownloadButtonProps) {
  const [isDownloading, setIsDownloading] = useState(false)
  const [downloaded, setDownloaded] = useState(false)

  const handleDownload = async () => {
    if (isDownloading) return

    setIsDownloading(true)
    try {
      // Generate a custom image with the quote
      const dataUrl = await generateQuoteImage(
        imageUrl,
        quoteText,
        reference,
        {
          width: 1080,
          height: 1080,
          fontSize: 48,
          fontColor: '#FFFFFF'
        }
      )

      // Download the image
      await downloadImage(
        dataUrl,
        `${reference.replace(/[^a-zA-Z0-9]/g, '-')}-bible-quote`,
        'jpg'
      )

      setDownloaded(true)
      toast.success('Image downloaded successfully!')

      // Reset icon after 3 seconds
      setTimeout(() => setDownloaded(false), 3000)
    } catch (error) {
      console.error('Download failed:', error)
      toast.error('Failed to download image')
    } finally {
      setIsDownloading(false)
    }
  }

  const handleShare = async () => {
    if (navigator.share && navigator.canShare) {
      try {
        // Generate image for sharing
        const dataUrl = await generateQuoteImage(
          imageUrl,
          quoteText,
          reference
        )

        // Convert data URL to blob
        const response = await fetch(dataUrl)
        const blob = await response.blob()
        const file = new File([blob], 'bible-quote.jpg', { type: 'image/jpeg' })

        // Use Web Share API
        await navigator.share({
          title: 'Bible Quote',
          text: `${quoteText} - ${reference}`,
          files: [file]
        })
      } catch (error) {
        console.error('Share failed:', error)
        toast.error('Failed to share image')
      }
    } else {
      // Fallback - copy to clipboard
      const shareText = `${quoteText} - ${reference}`
      await navigator.clipboard.writeText(shareText)
      toast.success('Quote copied to clipboard!')
    }
  }

  return (
    <div className={`flex gap-2 ${className}`}>
      <Button
        onClick={handleDownload}
        disabled={isDownloading}
        className="flex items-center gap-2"
        variant="outline"
      >
        {downloaded ? (
          <CheckCircle className="w-4 h-4 text-green-600" />
        ) : (
          <Download className="w-4 h-4" />
        )}
        {isDownloading ? 'Downloading...' : downloaded ? 'Downloaded!' : 'Download'}
      </Button>

      {typeof navigator !== 'undefined' && navigator.share && (
        <Button
          onClick={handleShare}
          variant="outline"
          className="flex items-center gap-2"
        >
          <Share2 className="w-4 h-4" />
          Share
        </Button>
      )}
    </div>
  )
}