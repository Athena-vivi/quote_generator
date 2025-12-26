"use client"

import { useState, useRef, useEffect } from "react"
import {
  Loader2,
  Palette,
  Download,
  Share2,
  Heart,
  AlertCircle,
  Copy,
  Check,
  X,
} from "lucide-react"

// Social media icons for share menu
import { MessageCircle } from "lucide-react"
import { Facebook } from "lucide-react"
import { Youtube } from "lucide-react" // Using for X/Twitter
import { Instagram } from "lucide-react"

interface Quote {
  reference: string
  content: string
}

interface ImageGeneratorProps {
  quote: Quote
  onClose: () => void
}

// 抽象出绘制函数
interface DrawQuoteImageParams {
  ctx: CanvasRenderingContext2D;
  backgroundImg: HTMLImageElement | ImageBitmap | null;
  quote: { content: string; reference: string };
  fontConfigs: any;
  selectedFont: string;
  width?: number;
  height?: number;
  theme?: string;
  textColor?: string;
  refColor?: string;
}

async function drawQuoteImage({
  ctx,
  backgroundImg,
  quote,
  fontConfigs,
  selectedFont,
  width = 1024,
  height = 1024,
  theme = 'light',
  textColor = '#fff',
  refColor = '#ffd700',
}: DrawQuoteImageParams & { textColor?: string, refColor?: string }) {
  await document.fonts.ready

  const cleanContent = quote.content.trim().replace(/\s+/g, ' ')
  const cleanReference = quote.reference.trim()

  ctx.clearRect(0, 0, width, height)

  // Draw background
  if (backgroundImg) {
    ctx.drawImage(backgroundImg, 0, 0, width, height)
  } else {
    ctx.fillStyle = theme === 'dark' ? "#1a1a1a" : "#f5f5f0"
    ctx.fillRect(0, 0, width, height)
  }

  // Apply overlay gradient for depth
  const gradient = ctx.createLinearGradient(0, 0, 0, height)
  if (theme === 'dark') {
    gradient.addColorStop(0, "rgba(0,0,0,0.5)")
    gradient.addColorStop(0.5, "rgba(0,0,0,0.25)")
    gradient.addColorStop(1, "rgba(0,0,0,0.6)")
  } else {
    gradient.addColorStop(0, "rgba(0,0,0,0.15)")
    gradient.addColorStop(0.5, "rgba(0,0,0,0.08)")
    gradient.addColorStop(1, "rgba(0,0,0,0.2)")
  }
  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, width, height)

  // Safe area margins
  const sideSafe = width * 0.14
  const topSafe = height * 0.14
  const bottomSafe = height * 0.18
  const textAreaWidth = width - sideSafe * 2
  const textAreaHeight = height - topSafe - bottomSafe

  const fontFamily = selectedFont === "handwriting"
    ? '"Great Vibes", cursive'
    : '"Crimson Text", serif'

  // Font size calculation
  let fontSize = Math.max(width, height) * 0.052
  let lines: string[] = []
  let lineHeight: number
  let refFontSize: number
  let refHeight: number
  let spacing: number
  let totalTextHeight: number
  let totalHeight: number

  // Text wrapping loop
  while (true) {
    ctx.font = `italic ${fontSize}px ${fontFamily}`
    lines = []
    let currentLine = ""
    const words = cleanContent.split(" ")

    for (const word of words) {
      if (!word) continue
      const testLine = currentLine ? `${currentLine} ${word}` : word
      const metrics = ctx.measureText(testLine)

      if (metrics.width > textAreaWidth && currentLine) {
        lines.push(currentLine)
        currentLine = word
      } else {
        currentLine = testLine
      }
    }
    if (currentLine) lines.push(currentLine)

    lineHeight = fontSize * 1.5
    totalTextHeight = lines.length * lineHeight
    refFontSize = fontSize * 0.64
    refHeight = refFontSize * 1.5
    spacing = fontSize * 1.33
    totalHeight = totalTextHeight + spacing + refHeight

    if (totalHeight <= textAreaHeight || fontSize < 18) break
    fontSize *= 0.95
  }

  // Calculate center position
  const centerY = height / 2
  const textBlockHeight = totalHeight
  const textStartY = centerY - textBlockHeight / 2

  ctx.save()

  // Draw main quote text
  ctx.font = `italic 400 ${fontSize}px ${fontFamily}`
  ctx.fillStyle = textColor
  ctx.textAlign = "center"
  ctx.textBaseline = "middle"

  ctx.shadowColor = "rgba(0,0,0,0.8)"
  ctx.shadowBlur = 12
  ctx.shadowOffsetX = 2
  ctx.shadowOffsetY = 2

  lines.forEach((line, index) => {
    let displayLine = line.trim()

    if (lines.length === 1) {
      displayLine = `"${displayLine}"`
    } else {
      if (index === 0) displayLine = `"${displayLine}`
      else if (index === lines.length - 1) displayLine = `${displayLine}"`
    }

    const y = textStartY + (index * lineHeight) + (lineHeight / 2) - (totalHeight / 2) + (totalTextHeight / 2)
    ctx.fillText(displayLine, width / 2, y)
  })

  // Draw reference
  ctx.font = `italic 700 ${refFontSize.toFixed(1)}px ${fontFamily}`
  ctx.textAlign = "right"
  ctx.textBaseline = "bottom"

  const refX = width - sideSafe
  const refY = height - bottomSafe

  ctx.shadowColor = theme === 'dark' ? "rgba(0,0,0,0.7)" : "rgba(0,0,0,0.6)"
  ctx.shadowBlur = 6
  ctx.shadowOffsetX = 1.5
  ctx.shadowOffsetY = 1.5

  ctx.fillStyle = refColor
  ctx.globalAlpha = 1.0
  ctx.fillText(`— ${cleanReference}`, refX, refY)
  ctx.globalAlpha = 1.0

  // Draw watermark at bottom right
  ctx.save()
  ctx.font = `italic 400 ${Math.max(16, width * 0.018)}px "Crimson Text", serif`
  ctx.fillStyle = theme === 'dark' ? "rgba(255, 255, 255, 0.25)" : "rgba(0, 0, 0, 0.15)"
  ctx.textAlign = "right"
  ctx.textBaseline = "bottom"
  ctx.globalAlpha = 1.0
  ctx.fillText("quotegenerator.org", width - (width * 0.045), height - (height * 0.025))
  ctx.restore()

  ctx.restore()
}

export function ImageGenerator({ quote, onClose }: ImageGeneratorProps) {
  const [prompt, setPrompt] = useState("")
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [isComposing, setIsComposing] = useState(false)
  const [isFavorited, setIsFavorited] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)
  const [fontsLoaded, setFontsLoaded] = useState(false)
  const [selectedFont, setSelectedFont] = useState("classic")
  const previewCanvasRef = useRef<HTMLCanvasElement>(null)
  const [previewBgImg, setPreviewBgImg] = useState<HTMLImageElement | null>(null)

  const [resolution] = useState({ label: '1:1 (1024x1024)', width: 1024, height: 1024 })

  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [textColor, setTextColor] = useState<string>("#fff");
  const [refColor, setRefColor] = useState<string>("#ffd700");
  const [isSharing, setIsSharing] = useState(false)
  const [showShareMenu, setShowShareMenu] = useState(false)
  const [toastMessage, setToastMessage] = useState<string | null>(null)
  const [isInputCollapsed, setIsInputCollapsed] = useState(false)
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState<number | null>(null)

  const promptSuggestions = [
    "Divine light streaming",
    "Peaceful mountain sunrise",
    "Serene ocean waves",
    "Ancient olive trees",
    "Starry night Jerusalem",
    "Gentle waterfall",
  ]

  const fontConfigs = {
    classic: {
      serif: ['"EB Garamond"', '"Crimson Text"', '"Merriweather"', '"Lora"', '"Georgia"', '"Times New Roman"', 'serif'],
      name: "Classic Serif"
    },
    handwriting: {
      serif: ['"Great Vibes"', '"Dancing Script"', '"Caveat"', 'cursive', 'serif'],
      name: "Elegant Script"
    }
  }

  // Load fonts
  useEffect(() => {
    const loadFonts = async () => {
      try {
        const fontsLink = document.createElement('link')
        fontsLink.href = 'https://fonts.googleapis.com/css2?family=Crimson+Text:wght@400;600;700&family=Great+Vibes&family=Dancing+Script:wght@400;700&display=swap'
        fontsLink.rel = 'stylesheet'
        document.head.appendChild(fontsLink)

        if (document.fonts) {
          await document.fonts.load('400 32px "Crimson Text"')
          await document.fonts.load('400 32px "Great Vibes"')
          await document.fonts.ready
        }
        setFontsLoaded(true)
      } catch (error) {
        console.warn("Font loading failed:", error)
        setFontsLoaded(true)
      }
    }
    loadFonts()
  }, [])

  // 预览背景图片加载
  useEffect(() => {
    if (!generatedImageUrl) return setPreviewBgImg(null)
    const img = new window.Image()
    img.crossOrigin = "anonymous"
    img.onload = () => setPreviewBgImg(img)
    img.onerror = () => setPreviewBgImg(null)
    img.src = generatedImageUrl
  }, [generatedImageUrl])

  // 预览canvas绘制
  useEffect(() => {
    if (!previewCanvasRef.current) return
    const ctx = previewCanvasRef.current.getContext("2d")
    if (!ctx) return
    drawQuoteImage({
      ctx,
      backgroundImg: previewBgImg,
      quote,
      fontConfigs,
      selectedFont,
      width: resolution.width,
      height: resolution.height,
      theme,
      textColor,
      refColor,
    })
  }, [previewBgImg, quote, fontConfigs, selectedFont, resolution, theme, textColor, refColor])

  const generateImage = async () => {
    if (!prompt.trim()) return

    setIsGenerating(true)
    setError(null)

    try {
      if (document.fonts) {
        await document.fonts.load('400 32px "Crimson Text"')
        await document.fonts.load('400 32px "Great Vibes"')
      }

      const response = await fetch("/api/generate-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      })

      const data = await response.json()

      if (data.success) {
        setGeneratedImageUrl(data.imageUrl)
        setIsInputCollapsed(true)
      } else {
        setError(data.error || "Failed to generate image")
      }
    } catch (error) {
      console.error("Network error:", error)
      setError("Network error. Please check your connection and try again.")
    } finally {
      setIsGenerating(false)
    }
  }

  const EXPORT_SCALE = 2

  const downloadImage = async () => {
    if (!generatedImageUrl || !fontsLoaded) return
    setIsComposing(true)
    setError(null)
    try {
      const response = await fetch(generatedImageUrl, { mode: "cors" })
      const blob = await response.blob()
      const bitmap = await createImageBitmap(blob)
      const canvas = document.createElement("canvas")
      canvas.width = resolution.width * EXPORT_SCALE
      canvas.height = resolution.height * EXPORT_SCALE
      const ctx = canvas.getContext("2d")!
      ctx.setTransform(EXPORT_SCALE, 0, 0, EXPORT_SCALE, 0, 0);
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
      const link = document.createElement("a")
      link.download = `bible-quote-${quote.reference.replace(/\s+/g, "-").toLowerCase()}.png`
      link.href = canvas.toDataURL("image/png", 1.0)
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } catch (error) {
      setError("Failed to download image. Please try again.")
    } finally {
      setIsComposing(false)
    }
  }

  const copyToClipboard = async () => {
    if (!generatedImageUrl || !fontsLoaded) return
    setIsComposing(true)
    setError(null)
    try {
      const response = await fetch(generatedImageUrl, { mode: "cors" })
      const blob = await response.blob()
      const bitmap = await createImageBitmap(blob)
      const canvas = document.createElement("canvas")
      canvas.width = resolution.width * EXPORT_SCALE
      canvas.height = resolution.height * EXPORT_SCALE
      const ctx = canvas.getContext("2d")!
      ctx.setTransform(EXPORT_SCALE, 0, 0, EXPORT_SCALE, 0, 0);
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
      const finalBlob = await new Promise<Blob | null>((resolve) => canvas.toBlob((b) => resolve(b), "image/png", 1.0))
      if (!finalBlob) throw new Error("Could not create image blob")
      try {
        if (document.hasFocus() && navigator.clipboard && navigator.clipboard.write) {
          const item = new ClipboardItem({ "image/png": finalBlob })
          await navigator.clipboard.write([item])
          setCopied(true)
          setTimeout(() => setCopied(false), 2000)
        } else {
          throw new Error("Page not focused or clipboard unavailable")
        }
      } catch (clipboardError) {
        const url = URL.createObjectURL(finalBlob)
        const link = document.createElement("a")
        link.href = url
        link.download = `bible-quote-${quote.reference.replace(/\s+/g, "-").toLowerCase()}-copy.png`
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        URL.revokeObjectURL(url)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      }
    } catch (error) {
      setError("Copy failed. The image has been downloaded instead.")
    } finally {
      setIsComposing(false)
    }
  }

  const nativeAppLinks = {
    whatsapp: (text: string) => `whatsapp://send?text=${encodeURIComponent(text)}`,
    facebook: () => `fb://sharer/`,
    x: (text: string) => `twitter://post?message=${encodeURIComponent(text)}`,
    instagram: () => `instagram://app`,
  }

  const webFallbackLinks = {
    whatsapp: (text: string) => `https://wa.me/?text=${encodeURIComponent(text)}`,
    facebook: (url: string) => `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    x: (text: string) => `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`,
    instagram: () => `https://www.instagram.com/`,
  }

  const [showInstagramOpenButton, setShowInstagramOpenButton] = useState(false)

  const copyQuoteText = async () => {
    const quoteText = `"${quote.content}" — ${quote.reference}`
    try {
      await navigator.clipboard.writeText(quoteText)
      return true
    } catch (error) {
      console.warn('Failed to copy quote text:', error)
      return false
    }
  }

  const showToast = (message: string) => {
    setToastMessage(message)
    setTimeout(() => setToastMessage(null), 3000)
  }

  const smartRedirect = (nativeUrl: string, webUrl: string) => {
    const appOpened = { value: false }

    setTimeout(() => {
      if (!appOpened.value) {
        window.location.href = webUrl
      }
    }, 2000)

    const handleVisibilityChange = () => {
      if (document.hidden) {
        appOpened.value = true
      }
    }
    document.addEventListener('visibilitychange', handleVisibilityChange)

    window.location.href = nativeUrl

    setTimeout(() => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }, 2500)
  }

  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)

  const handleShareToWhatsApp = async () => {
    const quoteText = `"${quote.content}" — ${quote.reference}`
    await copyQuoteText()
    setShowShareMenu(false)

    if (isMobile) {
      smartRedirect(
        nativeAppLinks.whatsapp(quoteText),
        webFallbackLinks.whatsapp(quoteText)
      )
    } else {
      window.open(webFallbackLinks.whatsapp(quoteText), '_blank', 'width=600,height=600')
    }
  }

  const handleShareToFacebook = async () => {
    const quoteText = `"${quote.content}" — ${quote.reference}`
    await copyQuoteText()
    setShowShareMenu(false)

    const shareUrl = window.location.href

    if (isMobile) {
      smartRedirect(
        nativeAppLinks.facebook(),
        webFallbackLinks.facebook(shareUrl)
      )
    } else {
      window.open(webFallbackLinks.facebook(shareUrl), '_blank', 'width=600,height=400')
    }
  }

  const handleShareToX = async () => {
    const quoteText = `"${quote.content}" — ${quote.reference}`
    await copyQuoteText()
    setShowShareMenu(false)

    if (isMobile) {
      smartRedirect(
        nativeAppLinks.x(quoteText),
        webFallbackLinks.x(quoteText)
      )
    } else {
      window.open(webFallbackLinks.x(quoteText), '_blank', 'width=600,height=400')
    }
  }

  const handleShareToInstagram = async () => {
    const quoteText = `"${quote.content}" — ${quote.reference}`
    await copyQuoteText()
    setShowShareMenu(false)

    if (isMobile) {
      showToast("Image saved to gallery. Please select it in Instagram.")
      downloadImage()

      setTimeout(() => {
        const nativeUrl = nativeAppLinks.instagram()
        const webUrl = webFallbackLinks.instagram()
        setShowInstagramOpenButton(true)
        window.location.href = nativeUrl

        setTimeout(() => {
          if (showInstagramOpenButton) {
            window.location.href = webUrl
          }
        }, 2500)
      }, 300)
    } else {
      showToast("Image downloaded. Upload it to Instagram manually.")
      downloadImage()
      // Desktop: Open Instagram in new tab after short delay
      setTimeout(() => {
        window.open(webFallbackLinks.instagram(), '_blank')
      }, 1000)
    }
  }

  const forceOpenInstagram = () => {
    setShowInstagramOpenButton(false)
    const isAndroid = /Android/i.test(navigator.userAgent)
    const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent)

    if (isAndroid) {
      const intentUrl = 'intent://instagram.com/#Intent;package=com.instagram.android;scheme=https;end'
      window.location.href = intentUrl
    } else if (isIOS) {
      window.location.href = 'instagram://camera'
      setTimeout(() => {
        window.location.href = 'instagram://app'
      }, 1500)
    } else {
      window.location.href = 'instagram://app'
    }
  }

  const shareImage = async () => {
    if (!previewCanvasRef.current || !fontsLoaded) return

    setIsSharing(true)
    setError(null)

    try {
      const blob = await new Promise<Blob | null>((resolve) => {
        previewCanvasRef.current!.toBlob((blob) => resolve(blob), 'image/png', 1.0)
      })

      if (!blob) throw new Error('Failed to generate image')

      const file = new File([blob], `divine-quote-${quote.reference.replace(/\s+/g, '-').toLowerCase()}.png`, {
        type: 'image/png',
      })

      const shareData = {
        files: [file],
        title: 'Divine Scripture Art',
        text: `"${quote.content}" — ${quote.reference}`,
      }

      // Only use native share on mobile devices that support it
      if (isMobile && navigator.canShare && navigator.canShare(shareData)) {
        try {
          await navigator.share(shareData)
        } catch (shareErr) {
          if (shareErr instanceof Error && shareErr.name !== 'AbortError') {
            setShowShareMenu(true)
          }
        }
      } else {
        // Desktop or unsupported: show share menu directly
        setShowShareMenu(true)
      }
    } catch (err) {
      setShowShareMenu(true)
    } finally {
      setIsSharing(false)
    }
  }

  const toggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem("favoriteQuotes") || "[]")
    const quoteKey = `${quote.reference}|${quote.content}`
    if (isFavorited) {
      const updatedFavorites = favorites.filter((fav: string) => fav !== quoteKey)
      localStorage.setItem("favoriteQuotes", JSON.stringify(updatedFavorites))
      setIsFavorited(false)
    } else {
      favorites.push(quoteKey)
      localStorage.setItem("favoriteQuotes", JSON.stringify(favorites))
      setIsFavorited(true)
    }
  }

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favoriteQuotes") || "[]")
    const quoteKey = `${quote.reference}|${quote.content}`
    setIsFavorited(favorites.includes(quoteKey))
  }, [quote])

  return (
    <div className="fixed inset-0 bg-black/70 dark:bg-black/90 backdrop-blur-md flex items-end md:items-center justify-center p-0 md:p-4 z-50">
      <div className="bg-[#fdfbf7]/95 dark:bg-black/60 dark:backdrop-blur-max backdrop-blur-2xl rounded-t-[2rem] md:rounded-[2rem] max-w-7xl w-full h-[95vh] md:h-[90vh] max-h-[95vh] md:max-h-[800px] shadow-2xl dark:shadow-[0_0_100px_rgba(212,175,55,0.15)] border border-amber-200/40 dark:border-amber-500/10 ring-1 dark:ring-amber-500/20 flex flex-col">

        {/* Mobile drag handle */}
        <div className="md:hidden flex justify-center pt-3 pb-1">
          <div className="w-12 h-1.5 bg-amber-300/50 dark:bg-amber-600/50 rounded-full" />
        </div>

        <div className="p-2 md:p-8 relative flex-shrink-0">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-1 right-3 md:top-6 md:right-6 z-50 group"
            aria-label="Close"
          >
            <div className="relative w-9 h-9 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 dark:from-amber-500 dark:to-amber-700 flex items-center justify-center shadow-lg shadow-amber-500/30 dark:shadow-amber-500/40 transition-all duration-300 group-hover:scale-110 group-hover:shadow-amber-500/50">
              <div className="absolute inset-0 rounded-full bg-amber-400/20 dark:bg-amber-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <X className="relative w-4 h-4 md:w-6 md:h-6 text-white" strokeWidth={2.5} />
            </div>
          </button>

          {/* Title */}
          <div className="text-center mb-2 md:mb-8">
            <h2 className="text-lg md:text-3xl lg:text-4xl font-serif font-bold text-amber-900 dark:text-amber-300" style={{ letterSpacing: '0.12em' }}>
              Craft Your Divine Art
            </h2>
          </div>

          {error && (
            <div className="mb-6 p-4 rounded-2xl bg-red-50/80 dark:bg-red-950/30 border border-red-200 dark:border-red-500/20 flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
              <p className="text-red-800 dark:text-red-300 font-serif text-sm">{error}</p>
            </div>
          )}

          {!fontsLoaded && (
            <div className="mb-6 p-4 rounded-2xl bg-blue-50/80 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-500/20 flex items-center gap-3">
              <Loader2 className="h-5 w-5 text-blue-600 dark:text-blue-400 animate-spin" />
              <p className="text-blue-800 dark:text-blue-300 font-serif text-sm">Loading beautiful fonts...</p>
            </div>
          )}
        </div>

        {/* Main Content Area */}
        <div className="flex-1 overflow-hidden px-2 md:px-8 pb-2 md:pb-8">
          <div className="flex flex-col md:flex-row gap-4 lg:gap-6 h-full overflow-hidden">

            {/* LEFT: Controls (Desktop) / BOTTOM (Mobile) */}
            <div className="order-2 md:order-1 w-full md:w-[40%] flex flex-col gap-2 md:gap-3 overflow-y-auto">

              {/* Input Area - Mobile overlay when editing, Desktop static */}
              <div className={`${isInputCollapsed && generatedImageUrl ? 'hidden' : ''} ${!isInputCollapsed && generatedImageUrl ? 'md:static fixed bottom-20 left-4 right-4 z-40 bg-[#fdfbf7]/95 dark:bg-black/80 max-h-[70vh] overflow-y-auto rounded-2xl' : ''} bg-gradient-to-br from-stone-50/70 to-amber-50/30 dark:from-stone-900/30 dark:to-amber-950/15 backdrop-blur-xl rounded-2xl md:rounded-3xl p-3 md:p-4 border border-amber-100/40 dark:border-amber-500/10 shadow-md dark:shadow-[0_0_25px_rgba(212,175,55,0.06)]`}>
                <div className="flex items-center justify-between mb-2 md:mb-3">
                  <div className="flex items-center gap-2">
                    <Palette className="w-4 h-4 md:w-5 md:h-5 text-amber-600 dark:text-amber-400" />
                    <h3 className="text-base md:text-lg font-serif font-semibold text-gray-800 dark:text-zinc-200">Background Scene</h3>
                  </div>
                  {generatedImageUrl && (
                    <button
                      onClick={() => setIsInputCollapsed(true)}
                      className="p-1.5 rounded-full hover:bg-amber-100/40 dark:hover:bg-amber-500/10 transition-colors"
                      aria-label="Collapse"
                    >
                      <X className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                    </button>
                  )}
                </div>

                <textarea
                  placeholder="Describe the background scene..."
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  rows={2}
                  className="w-full px-3 py-2.5 text-base bg-stone-50/50 dark:bg-stone-900/30 border border-amber-200/30 dark:border-amber-500/15 rounded-xl focus:outline-none focus:border-amber-400/50 dark:focus:border-amber-400/30 text-gray-800 dark:text-zinc-200 placeholder-gray-500/60 dark:placeholder:text-zinc-500 font-serif resize-none mb-2"
                />

                {!generatedImageUrl && (
                  <div className="space-y-1.5 md:space-y-2 mb-3">
                    <p className="text-xs font-serif uppercase tracking-wider text-amber-600/60 dark:text-amber-400/50">Suggestions:</p>
                    <div className="flex flex-wrap gap-1.5">
                      {promptSuggestions.map((suggestion, index) => (
                        <button
                          key={index}
                          onClick={() => {
                            setPrompt(suggestion)
                            setSelectedSuggestionIndex(index)
                          }}
                          className={`px-3 py-1 text-sm md:py-1 md:px-2 font-serif rounded-full transition-all relative ${
                            selectedSuggestionIndex === index
                              ? 'bg-amber-500 text-white border-2 border-amber-400 shadow-lg shadow-amber-500/50 scale-105'
                              : 'bg-transparent text-amber-700/80 dark:bg-stone-900/60 dark:text-amber-300/70 border-2 border-dashed border-amber-400/60 hover:border-amber-500 hover:scale-105'
                          }`}
                        >
                          {selectedSuggestionIndex === index && (
                            <span className="absolute inset-0 rounded-full animate-ping bg-amber-400/30"></span>
                          )}
                          <span className="relative">{suggestion}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <button
                  onClick={generateImage}
                  disabled={isGenerating || !prompt.trim()}
                  className="w-full min-h-[48px] md:min-h-[44px] px-4 py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 dark:from-amber-400 dark:to-amber-500 text-white font-serif font-semibold rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Generating...</span>
                    </>
                  ) : (
                    <>
                      <Palette className="w-5 h-5" />
                      <span>Generate</span>
                    </>
                  )}
                </button>
              </div>

              {/* Quote Preview - only show when no image */}
              {!generatedImageUrl && (
                <div className="bg-gradient-to-br from-stone-50/70 to-amber-50/30 dark:from-stone-900/30 dark:to-amber-950/15 backdrop-blur-xl rounded-2xl md:rounded-3xl p-3 md:p-4 border border-amber-100/40 dark:border-amber-500/10">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-xs font-serif uppercase tracking-widest text-amber-700/60 dark:text-amber-400/50">Your Quote</h4>
                    <button
                      onClick={toggleFavorite}
                      className="p-2 rounded-full hover:bg-amber-100/40 dark:hover:bg-amber-500/10"
                      aria-label={isFavorited ? "Remove from favorites" : "Add to favorites"}
                    >
                      {isFavorited ? (
                        <Heart className="w-5 h-5 text-red-500 fill-current" />
                      ) : (
                        <Heart className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                      )}
                    </button>
                  </div>
                  <blockquote className="text-sm md:text-base font-serif font-light italic text-stone-800 dark:text-zinc-200 leading-relaxed mb-1">
                    "{quote.content}"
                  </blockquote>
                  <cite className="block text-xs md:text-sm font-serif text-amber-800 dark:text-amber-400 italic text-right">
                    — {quote.reference}
                  </cite>
                </div>
              )}

              {/* Style Controls - show when image exists and input collapsed */}
              {generatedImageUrl && isInputCollapsed && (
                <button
                  onClick={() => setIsInputCollapsed(false)}
                  className="w-full min-h-[44px] bg-white/90 dark:bg-black/80 backdrop-blur-xl border border-amber-200/50 dark:border-amber-500/20 rounded-2xl px-4 py-3 flex items-center gap-2 shadow-md"
                >
                  <Palette className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                  <span className="text-sm font-serif text-amber-900 dark:text-amber-300">Edit Background</span>
                </button>
              )}

              {/* Style Options - Hide on mobile when input is expanded */}
              {generatedImageUrl && isInputCollapsed && (
                <div className="bg-gradient-to-br from-stone-50/70 to-amber-50/30 dark:from-stone-900/30 dark:to-amber-950/15 backdrop-blur-xl rounded-2xl md:rounded-3xl p-3 md:p-4 border border-amber-100/40 dark:border-amber-500/10">
                  <h4 className="text-sm font-serif font-semibold text-gray-800 dark:text-zinc-200 mb-3">Style Options</h4>

                  {/* Mobile: Horizontal layout, Desktop: Vertical layout */}
                  <div className="flex flex-row md:flex-col gap-2 md:gap-0 md:space-y-3">
                    {/* Text Color */}
                    <div className="flex flex-col items-center md:items-start flex-1 min-w-0">
                      <p className="text-[10px] md:text-xs font-serif uppercase tracking-wider text-amber-600/60 dark:text-amber-400/50 mb-1 md:mb-2 whitespace-nowrap">Color</p>
                      <div className="flex gap-1.5 md:gap-2 justify-center md:justify-start">
                        {["#ffd700", "#fff"].map((color) => (
                          <button
                            key={color}
                            onClick={() => setTextColor(color)}
                            className="relative w-6 h-6 md:w-8 md:h-8 rounded-full border-2 hover:scale-110 transition-all flex-shrink-0"
                            style={{
                              background: color,
                              borderColor: textColor === color ? '#d97706' : 'rgba(251, 191, 36, 0.25)',
                              boxShadow: textColor === color ? '0 0 10px rgba(217, 119, 6, 0.4)' : 'none',
                            }}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Theme */}
                    <div className="flex flex-col items-center flex-1 min-w-0">
                      <button
                        onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
                        className="h-8 md:h-9 px-2 md:px-0 rounded-lg bg-gradient-to-r from-stone-200 to-stone-300 dark:from-stone-700 dark:to-stone-600 text-stone-700 dark:text-stone-200 hover:from-stone-300 hover:to-stone-400 dark:hover:from-stone-600 dark:hover:to-stone-500 transition-all font-serif text-xs md:text-sm flex items-center justify-center gap-1 md:gap-2 w-full"
                      >
                        <span className="text-sm md:text-base">{theme === 'light' ? '☀️' : '🌙'}</span>
                        <span className="hidden md:inline">{theme === 'light' ? 'Light' : 'Dark'}</span>
                      </button>
                    </div>

                    {/* Font */}
                    <div className="flex flex-col items-center md:items-start flex-1 min-w-0">
                      <p className="text-[10px] md:text-xs font-serif uppercase tracking-wider text-amber-600/60 dark:text-amber-400/50 mb-1 md:mb-2 whitespace-nowrap">Font</p>
                      <div className="flex gap-1.5 md:gap-2 w-full">
                        <button
                          onClick={() => setSelectedFont("classic")}
                          className={`flex-1 px-2 md:px-3 py-1.5 md:py-2 text-xs md:text-sm font-serif rounded-lg transition-all ${
                            selectedFont === "classic"
                              ? "bg-gradient-to-r from-amber-500 to-amber-600 text-white"
                              : "bg-white/50 text-amber-700 hover:bg-amber-50 dark:bg-white/[0.02] dark:text-amber-300 dark:hover:bg-amber-950/25 border border-amber-200/30 dark:border-amber-500/10"
                          }`}
                        >
                          Serif
                        </button>
                        <button
                          onClick={() => setSelectedFont("handwriting")}
                          className={`flex-1 px-2 md:px-3 py-1.5 md:py-2 text-xs md:text-sm font-serif rounded-lg transition-all ${
                            selectedFont === "handwriting"
                              ? "bg-gradient-to-r from-amber-500 to-amber-600 text-white"
                              : "bg-white/50 text-amber-700 hover:bg-amber-50 dark:bg-white/[0.02] dark:text-amber-300 dark:hover:bg-amber-950/25 border border-amber-200/30 dark:border-amber-500/10"
                          }`}
                          style={{ fontFamily: 'Great Vibes, cursive' }}
                        >
                          Script
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* RIGHT: Image Preview Area */}
            <div className="order-1 md:order-2 w-full md:w-[60%] flex flex-col min-h-0">
              {generatedImageUrl ? (
                <div className="flex-1 flex flex-col items-center justify-center p-2 md:p-4 bg-gradient-to-br from-amber-50/80 via-white/60 to-amber-100/70 dark:from-stone-900/60 dark:via-black/40 dark:to-amber-950/50 rounded-3xl border-2 border-amber-200/50 dark:border-amber-500/15 shadow-inner dark:shadow-[0_0_60px_rgba(212,175,55,0.15)] relative">

                  {/* Canvas */}
                  <div className="relative w-full max-w-md md:max-w-lg aspect-square">
                    <div className="absolute inset-0 bg-gradient-to-br from-amber-100/60 to-amber-50/40 dark:from-stone-800/70 dark:to-amber-950/50 rounded-2xl shadow-2xl"></div>
                    <div className="absolute inset-0 rounded-2xl ring-1 ring-white/30 dark:ring-amber-400/15"></div>
                    <canvas
                      ref={previewCanvasRef}
                      width={1024}
                      height={1024}
                      className="relative w-full h-full object-contain rounded-2xl shadow-2xl dark:shadow-[0_0_30px_rgba(212,175,55,0.1)] z-10"
                    />
                  </div>

                  {/* Desktop Toolbar */}
                  <div className="hidden md:flex mt-4 items-center justify-center gap-3">
                    <button
                      onClick={downloadImage}
                      disabled={isComposing || !fontsLoaded}
                      className="min-h-[44px] px-5 bg-white/70 dark:bg-white/15 hover:bg-white/90 dark:hover:bg-white/25 text-amber-900 dark:text-amber-100 font-serif font-semibold rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50 flex-1 border border-white/10 dark:border-white/5"
                    >
                      {isComposing ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
                      <span>{isComposing ? "Processing..." : "Download"}</span>
                    </button>
                    <button
                      onClick={copyToClipboard}
                      disabled={isComposing || !fontsLoaded}
                      className="min-h-[44px] px-5 bg-white/70 dark:bg-white/15 hover:bg-white/90 dark:hover:bg-white/25 text-amber-900 dark:text-amber-100 font-serif font-semibold rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50 flex-1 border border-white/10 dark:border-white/5"
                    >
                      {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      <span>{copied ? "Copied!" : "Copy"}</span>
                    </button>
                    <button
                      onClick={shareImage}
                      disabled={isSharing || isComposing || !fontsLoaded}
                      className="min-h-[44px] px-5 bg-white/70 dark:bg-white/15 hover:bg-white/90 dark:hover:bg-white/25 text-amber-900 dark:text-amber-100 font-serif font-semibold rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50 flex-1 border border-white/10 dark:border-white/5"
                    >
                      {isSharing ? <Loader2 className="w-4 h-4 animate-spin" /> : <Share2 className="w-4 h-4" />}
                      <span>{isSharing ? "Sharing..." : "Share"}</span>
                    </button>
                  </div>
                </div>
              ) : isGenerating ? (
                /* Loading State */
                <div className="flex-1 flex flex-col items-center justify-center bg-gradient-to-br from-amber-50/80 via-white/60 to-amber-100/70 dark:from-stone-900/60 dark:via-black/40 dark:to-amber-950/50 rounded-3xl p-4 md:p-8 border-2 border-amber-200/50 dark:border-amber-500/15 shadow-inner dark:shadow-[0_0_60px_rgba(212,175,55,0.15)] min-h-[300px]">
                  <div className="relative inline-block mb-6">
                    <div className="absolute inset-0 rounded-full bg-amber-400/20 blur-xl animate-ping"></div>
                    <div className="absolute inset-0 rounded-full border-2 border-amber-400/30 border-t-amber-500/80 animate-spin"></div>
                    <div className="relative w-16 h-16 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-amber-100 to-amber-200 dark:from-amber-900/50 dark:to-amber-800/50 flex items-center justify-center shadow-lg">
                      <Palette className="w-8 h-8 md:w-12 md:h-12 text-amber-600 dark:text-amber-400 animate-pulse" />
                    </div>
                  </div>
                  <h3 className="text-xl md:text-2xl font-serif font-semibold text-amber-900 dark:text-amber-200 mb-2">Crafting Your Divine Masterpiece</h3>
                  <p className="text-sm md:text-base font-serif text-amber-700/70 dark:text-amber-400/60 italic mb-4">"Every stroke of light is a prayer"</p>
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></div>
                    <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse animation-delay-200"></div>
                    <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse animation-delay-400"></div>
                  </div>
                </div>
              ) : (
                /* Empty State */
                <div className="flex-1 flex flex-col items-center justify-center bg-gradient-to-br from-stone-100/60 to-amber-50/40 dark:from-stone-900/40 dark:to-amber-950/20 rounded-3xl p-2 md:p-8 border-2 border-amber-200/50 dark:border-amber-500/15 shadow-inner min-h-[200px] md:min-h-[300px]">
                  <div className="relative inline-block mb-4">
                    <div className="absolute inset-0 bg-amber-400/15 dark:bg-amber-500/20 rounded-full blur-3xl animate-pulse"></div>
                    <Palette className="relative w-12 h-12 md:w-20 md:h-20 text-amber-400/60 dark:text-amber-500/50" />
                  </div>
                  <p className="text-base md:text-2xl font-serif font-semibold text-stone-700 dark:text-zinc-300 mb-2">Your Canvas Awaits</p>
                  <p className="text-sm md:text-base font-serif text-stone-500 dark:text-zinc-500 mb-4">Describe your sacred vision below and let divine art emerge</p>
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-amber-100/50 dark:bg-amber-950/30 rounded-full border border-amber-200/40 dark:border-amber-500/15">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
                    <span className="text-xs md:text-sm font-serif text-amber-700/70 dark:text-amber-400/70">Ready to create</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Bottom Toolbar - Hide when editing on mobile */}
        {generatedImageUrl && isInputCollapsed && (
          <div className="md:hidden safe-area-inset-bottom border-t border-amber-200/40 dark:border-amber-500/10 px-3 py-2 bg-white dark:bg-black">
            <div className="flex items-center justify-between gap-2">
              <button
                onClick={downloadImage}
                disabled={isComposing || !fontsLoaded}
                className="flex-1 min-h-[44px] bg-gradient-to-r from-amber-500 to-amber-600 text-white font-serif font-semibold rounded-lg flex items-center justify-center gap-1.5 disabled:opacity-50"
              >
                {isComposing ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
                <span className="text-xs">{isComposing ? "Processing" : "Download"}</span>
              </button>
              <button
                onClick={copyToClipboard}
                disabled={isComposing || !fontsLoaded}
                className="flex-1 min-h-[44px] bg-gradient-to-r from-amber-400 to-amber-500 text-white font-serif font-semibold rounded-lg flex items-center justify-center gap-1.5 disabled:opacity-50"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span className="text-xs">{copied ? "Copied!" : "Copy"}</span>
              </button>
              <button
                onClick={shareImage}
                disabled={isSharing || isComposing || !fontsLoaded}
                className="flex-1 min-h-[44px] bg-gradient-to-br from-amber-400 to-yellow-500 text-white font-serif font-bold rounded-lg flex items-center justify-center gap-1.5 disabled:opacity-50"
              >
                {isSharing ? <Loader2 className="w-4 h-4 animate-spin" /> : <Share2 className="w-4 h-4" />}
                <span className="text-xs">{isSharing ? "Sharing" : "Share"}</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Share Menu - Mobile Bottom Sheet */}
      {showShareMenu && (
        <>
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm z-40" onClick={() => setShowShareMenu(false)} />
          {/* Mobile Version */}
          <div className="md:hidden absolute bottom-0 left-0 right-0 z-50 bg-white/95 dark:bg-black/95 backdrop-blur-xl border-t border-amber-200/50 dark:border-amber-500/20 rounded-t-3xl p-6 safe-area-inset-bottom">
            <div className="flex justify-center mb-6">
              <div className="w-12 h-1.5 bg-amber-300/50 dark:bg-amber-600/50 rounded-full" />
            </div>
            <h3 className="text-xl font-serif font-semibold text-amber-900 dark:text-amber-300 text-center mb-6">Share to Social Media</h3>
            <div className="grid grid-cols-4 gap-4 mb-6">
              <button onClick={handleShareToWhatsApp} className="flex flex-col items-center gap-2 p-3 rounded-2xl hover:bg-amber-100/50 transition-all">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center shadow-lg">
                  <MessageCircle className="w-7 h-7 text-white" strokeWidth={2.5} />
                </div>
                <span className="text-xs font-serif">WhatsApp</span>
              </button>
              <button onClick={handleShareToFacebook} className="flex flex-col items-center gap-2 p-3 rounded-2xl hover:bg-amber-100/50 transition-all">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center shadow-lg">
                  <Facebook className="w-7 h-7 text-white" strokeWidth={2.5} />
                </div>
                <span className="text-xs font-serif">Facebook</span>
              </button>
              <button onClick={handleShareToX} className="flex flex-col items-center gap-2 p-3 rounded-2xl hover:bg-amber-100/50 transition-all">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-stone-700 to-black flex items-center justify-center shadow-lg">
                  <Youtube className="w-6 h-6 text-white" strokeWidth={2.5} />
                </div>
                <span className="text-xs font-serif">X</span>
              </button>
              <button onClick={handleShareToInstagram} className="flex flex-col items-center gap-2 p-3 rounded-2xl hover:bg-amber-100/50 transition-all">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 flex items-center justify-center shadow-lg">
                  <Instagram className="w-7 h-7 text-white" strokeWidth={2.5} />
                </div>
                <span className="text-xs font-serif">Instagram</span>
              </button>
            </div>
            <p className="text-center text-xs font-serif text-stone-500 dark:text-stone-400 italic">
              Quote copied • Image saved for Instagram
            </p>
            <button onClick={() => setShowShareMenu(false)} className="w-full mt-4 py-3 bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 rounded-xl">
              Cancel
            </button>
          </div>

          {/* Desktop Version - Popup centered */}
          <div className="hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 bg-white/95 dark:bg-black/95 backdrop-blur-xl border border-amber-200/50 dark:border-amber-500/20 rounded-3xl p-8 shadow-2xl dark:shadow-[0_0_60px_rgba(212,175,55,0.2)] min-w-[480px]">
            <h3 className="text-2xl font-serif font-semibold text-amber-900 dark:text-amber-300 text-center mb-2">Share Divine Art</h3>
            <p className="text-sm font-serif text-stone-600 dark:text-stone-400 text-center mb-6">Choose a platform to share your masterpiece</p>

            <div className="grid grid-cols-4 gap-6 mb-6">
              <button onClick={handleShareToWhatsApp} className="group flex flex-col items-center gap-3 p-4 rounded-2xl hover:bg-amber-100/50 dark:hover:bg-amber-950/30 transition-all">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center shadow-lg group-hover:shadow-green-500/40 group-hover:scale-110 transition-all">
                  <MessageCircle className="w-8 h-8 text-white" strokeWidth={2.5} />
                </div>
                <span className="text-sm font-semibold text-stone-700 dark:text-stone-300">WhatsApp</span>
              </button>
              <button onClick={handleShareToFacebook} className="group flex flex-col items-center gap-3 p-4 rounded-2xl hover:bg-amber-100/50 dark:hover:bg-amber-950/30 transition-all">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center shadow-lg group-hover:shadow-blue-500/40 group-hover:scale-110 transition-all">
                  <Facebook className="w-8 h-8 text-white" strokeWidth={2.5} />
                </div>
                <span className="text-sm font-semibold text-stone-700 dark:text-stone-300">Facebook</span>
              </button>
              <button onClick={handleShareToX} className="group flex flex-col items-center gap-3 p-4 rounded-2xl hover:bg-amber-100/50 dark:hover:bg-amber-950/30 transition-all">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-stone-700 to-black flex items-center justify-center shadow-lg group-hover:shadow-stone-600/40 group-hover:scale-110 transition-all">
                  <Youtube className="w-7 h-7 text-white" strokeWidth={2.5} />
                </div>
                <span className="text-sm font-semibold text-stone-700 dark:text-stone-300">X</span>
              </button>
              <button onClick={handleShareToInstagram} className="group flex flex-col items-center gap-3 p-4 rounded-2xl hover:bg-amber-100/50 dark:hover:bg-amber-950/30 transition-all">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 flex items-center justify-center shadow-lg group-hover:shadow-pink-500/40 group-hover:scale-110 transition-all">
                  <Instagram className="w-8 h-8 text-white" strokeWidth={2.5} />
                </div>
                <span className="text-sm font-semibold text-stone-700 dark:text-stone-300">Instagram</span>
              </button>
            </div>

            <p className="text-center text-xs font-serif text-stone-500 dark:text-stone-400 italic mb-4">
              Quote has been copied to clipboard • Image will be saved for Instagram
            </p>

            <button onClick={() => setShowShareMenu(false)} className="w-full py-3 bg-gradient-to-r from-stone-100 to-stone-200 dark:from-stone-800 dark:to-stone-700 hover:from-stone-200 hover:to-stone-300 dark:hover:from-stone-700 dark:hover:to-stone-600 text-stone-700 dark:text-stone-300 rounded-xl font-semibold transition-all">
              Cancel
            </button>
          </div>
        </>
      )}

      {/* Toast Notification */}
      {toastMessage && (
        <div className="absolute top-20 left-1/2 -translate-x-1/2 z-50 bg-amber-500 text-white px-6 py-3 rounded-2xl shadow-lg flex items-center gap-2">
          <Check className="w-5 h-5" />
          <span className="font-serif text-sm">{toastMessage}</span>
        </div>
      )}

      {/* Instagram Fallback Button */}
      {showInstagramOpenButton && (
        <button
          onClick={forceOpenInstagram}
          className="absolute top-24 left-1/2 -translate-x-1/2 z-50 bg-gradient-to-r from-amber-500 to-amber-600 text-white px-6 py-3 rounded-2xl shadow-lg flex items-center gap-2"
        >
          <Instagram className="w-5 h-5" />
          <span>Open Instagram</span>
        </button>
      )}
    </div>
  )
}

export default ImageGenerator
