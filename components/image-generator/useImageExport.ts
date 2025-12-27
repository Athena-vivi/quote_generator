import { useState, useCallback } from "react"

interface Quote {
  reference: string
  content: string
}

interface FontConfigs {
  classic: { serif: string[]; name: string }
  handwriting: { serif: string[]; name: string }
}

interface Resolution {
  width: number
  height: number
}

interface UseImageExportParams {
  quote: Quote
  fontConfigs: FontConfigs
  selectedFont: string
  resolution: Resolution
  theme: 'light' | 'dark'
  textColor: string
  refColor: string
  drawQuoteImage: (params: any) => Promise<void>
}

// Internal function to fetch image URL and render to canvas
async function fetchImageUrlToCanvas(
  imageUrl: string,
  params: UseImageExportParams & { exportScale?: number }
): Promise<HTMLCanvasElement> {
  const {
    quote,
    fontConfigs,
    selectedFont,
    resolution,
    theme,
    textColor,
    refColor,
    drawQuoteImage,
    exportScale = 1,
  } = params

  const response = await fetch(imageUrl, { mode: "cors" })
  const blob = await response.blob()
  const bitmap = await createImageBitmap(blob)

  const canvas = document.createElement("canvas")
  canvas.width = resolution.width * exportScale
  canvas.height = resolution.height * exportScale
  const ctx = canvas.getContext("2d")!

  ctx.setTransform(exportScale, 0, 0, exportScale, 0, 0)

  await drawQuoteImage({
    ctx,
    backgroundImg: bitmap,
    quote,
    fontConfigs,
    selectedFont,
    width: resolution.width,
    height: resolution.height,
    theme,
    textColor,
    refColor,
  })

  return canvas
}

export function useImageExport({
  quote,
  fontConfigs,
  selectedFont,
  resolution,
  theme,
  textColor,
  refColor,
  drawQuoteImage,
}: UseImageExportParams) {
  const [isComposing, setIsComposing] = useState(false)
  const EXPORT_SCALE = 2

  // Download image as file
  const download = useCallback(async (imageUrl: string) => {
    setIsComposing(true)

    try {
      const canvas = await fetchImageUrlToCanvas({
        quote,
        fontConfigs,
        selectedFont,
        resolution,
        theme,
        textColor,
        refColor,
        drawQuoteImage,
        exportScale: EXPORT_SCALE,
      })

      const link = document.createElement("a")
      link.download = `bible-quote-${quote.reference.replace(/\s+/g, "-").toLowerCase()}.png`
      link.href = canvas.toDataURL("image/png", 1.0)
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } finally {
      setIsComposing(false)
    }
  }, [quote, fontConfigs, selectedFont, resolution, theme, textColor, refColor, drawQuoteImage])

  // Copy image to clipboard
  const copy = useCallback(async (imageUrl: string) => {
    setIsComposing(true)

    try {
      const canvas = await fetchImageUrlToCanvas({
        quote,
        fontConfigs,
        selectedFont,
        resolution,
        theme,
        textColor,
        refColor,
        drawQuoteImage,
        exportScale: EXPORT_SCALE,
      })

      const finalBlob = await new Promise<Blob | null>((resolve) =>
        canvas.toBlob((b) => resolve(b), "image/png", 1.0)
      )

      if (!finalBlob) throw new Error("Could not create image blob")

      try {
        if (document.hasFocus() && navigator.clipboard && navigator.clipboard.write) {
          const item = new ClipboardItem({ "image/png": finalBlob })
          await navigator.clipboard.write([item])
        } else {
          throw new Error("Page not focused or clipboard unavailable")
        }
      } catch (clipboardError) {
        // Fallback: download the file
        const url = URL.createObjectURL(finalBlob)
        const link = document.createElement("a")
        link.href = url
        link.download = `bible-quote-${quote.reference.replace(/\s+/g, "-").toLowerCase()}-copy.png`
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        URL.revokeObjectURL(url)
      }
    } finally {
      setIsComposing(false)
    }
  }, [quote, fontConfigs, selectedFont, resolution, theme, textColor, refColor, drawQuoteImage])

  // Share image using Web Share API
  const share = useCallback(async (canvasRef: React.RefObject<HTMLCanvasElement>) => {
    if (!canvasRef.current) return

    setIsComposing(true)

    try {
      const blob = await new Promise<Blob | null>((resolve) =>
        canvasRef.current!.toBlob((blob) => resolve(blob), 'image/png', 1.0)
      )

      if (!blob) throw new Error('Failed to generate image')

      const file = new File(
        [blob],
        `divine-quote-${quote.reference.replace(/\s+/g, '-').toLowerCase()}.png`,
        { type: 'image/png' }
      )

      const shareData = {
        files: [file],
        title: 'Divine Scripture Art',
        text: `"${quote.content}" — ${quote.reference}`,
      }

      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)

      if (isMobile && navigator.canShare && navigator.canShare(shareData)) {
        await navigator.share(shareData)
      } else {
        // Return false to indicate share menu should be shown
        return false
      }

      return true
    } catch (err) {
      if (err instanceof Error && err.name !== 'AbortError') {
        // Return false to show share menu
        return false
      }
      throw err
    } finally {
      setIsComposing(false)
    }
  }, [quote])

  return {
    download,
    copy,
    share,
    isComposing,
  }
}
