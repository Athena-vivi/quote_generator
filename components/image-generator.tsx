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
  // CRITICAL: Wait for fonts to be ready before drawing
  await document.fonts.ready

  // Clean the quote content - remove extra spaces and normalize
  const cleanContent = quote.content.trim().replace(/\s+/g, ' ')
  const cleanReference = quote.reference.trim()

  // Clear canvas
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

  // Safe area margins - increased for better framing
  const sideSafe = width * 0.14
  const topSafe = height * 0.14
  const bottomSafe = height * 0.18
  const textAreaWidth = width - sideSafe * 2
  const textAreaHeight = height - topSafe - bottomSafe

  // Use single font family - Crimson Text only for consistency with hero card
  const fontFamily = selectedFont === "handwriting"
    ? '"Great Vibes", cursive'
    : '"Crimson Text", serif'

  // Initial font size calculation
  let fontSize = Math.max(width, height) * 0.052
  let lines: string[] = []
  let lineHeight: number
  let refFontSize: number
  let refHeight: number
  let spacing: number
  let totalTextHeight: number
  let totalHeight: number

  // Text wrapping and size adjustment loop
  while (true) {
    ctx.font = `italic ${fontSize}px ${fontFamily}`

    // Word wrapping - clean splitting
    lines = []
    let currentLine = ""
    const words = cleanContent.split(" ")

    for (const word of words) {
      if (!word) continue // Skip empty words
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

    // Line height set to 1.5 for better readability with word wrap
    lineHeight = fontSize * 1.5
    totalTextHeight = lines.length * lineHeight

    // Reference is 64% of main text size (reduced by 20%)
    refFontSize = fontSize * 0.64
    refHeight = refFontSize * 1.5

    // Spacing between text and reference - reduced to move reference up by 1/3
    spacing = fontSize * 1.33
    totalHeight = totalTextHeight + spacing + refHeight

    // Check if fits or minimum size reached
    if (totalHeight <= textAreaHeight || fontSize < 18) break
    fontSize *= 0.95
  }

  // Calculate absolute center position - perfect vertical centering
  const centerY = height / 2
  const textBlockHeight = totalHeight
  const textStartY = centerY - textBlockHeight / 2

  // Save context state
  ctx.save()

  // Draw main quote text - ITALIC for sacred feel, Crimson Text
  ctx.font = `italic 400 ${fontSize}px ${fontFamily}`
  ctx.fillStyle = textColor
  ctx.textAlign = "center"
  ctx.textBaseline = "middle"

  // Elegant text shadow for readability
  ctx.shadowColor = "rgba(0,0,0,0.8)"
  ctx.shadowBlur = 12
  ctx.shadowOffsetX = 2
  ctx.shadowOffsetY = 2

  // Draw each line with proper word wrap spacing (lineHeight 1.5)
  lines.forEach((line, index) => {
    let displayLine = line.trim() // Trim each line

    // Add quotation marks elegantly
    if (lines.length === 1) {
      displayLine = `"${displayLine}"`
    } else {
      if (index === 0) displayLine = `"${displayLine}`
      else if (index === lines.length - 1) displayLine = `${displayLine}"`
    }

    // Calculate Y position for perfect vertical alignment
    const y = textStartY + (index * lineHeight) + (lineHeight / 2) - (totalHeight / 2) + (totalTextHeight / 2)
    ctx.fillText(displayLine, width / 2, y)
  })

  // Draw reference - italic style, 80% of main text, positioned closer to text
  ctx.font = `italic 700 ${refFontSize.toFixed(1)}px ${fontFamily}`
  ctx.textAlign = "right"
  ctx.textBaseline = "bottom"

  // Reference position - bottom-right with proper padding
  const refX = width - sideSafe
  const refY = height - bottomSafe

  // Stronger shadow for reference visibility
  ctx.shadowColor = theme === 'dark' ? "rgba(0,0,0,0.7)" : "rgba(0,0,0,0.6)"
  ctx.shadowBlur = 6
  ctx.shadowOffsetX = 1.5
  ctx.shadowOffsetY = 1.5

  // Reference color - full opacity amber gold for maximum readability
  ctx.fillStyle = refColor
  ctx.globalAlpha = 1.0
  ctx.fillText(`— ${cleanReference}`, refX, refY)
  ctx.globalAlpha = 1.0

  // Restore context state
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

  // Force 1:1 resolution only
  const [resolution] = useState({ label: '1:1 (1024x1024)', width: 1024, height: 1024 })

  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [textColor, setTextColor] = useState<string>("#fff");
  const [refColor, setRefColor] = useState<string>("#ffd700");
  const [isSharing, setIsSharing] = useState(false)
  const [showShareMenu, setShowShareMenu] = useState(false)
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  // Simplified artistic suggestions
  const promptSuggestions = [
    "Divine light streaming",
    "Peaceful mountain sunrise",
    "Serene ocean waves",
    "Ancient olive trees",
    "Starry night Jerusalem",
    "Gentle waterfall",
  ]

  // Font configurations - updated with proper calligraphy font
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

  // Load fonts including Crimson Text for sacred serif aesthetic
  useEffect(() => {
    const loadFonts = async () => {
      try {
        // Load Crimson Text for sacred serif + Great Vibes for elegant script
        const fontsLink = document.createElement('link')
        fontsLink.href = 'https://fonts.googleapis.com/css2?family=Crimson+Text:wght@400;600;700&family=Great+Vibes&family=Dancing+Script:wght@400;700&display=swap'
        fontsLink.rel = 'stylesheet'
        document.head.appendChild(fontsLink)

        // Explicitly wait for Crimson Text to load and verify
        if (document.fonts) {
          await document.fonts.load('400 32px "Crimson Text"')
          await document.fonts.load('400 32px "Great Vibes"')

          // Verify fonts are actually loaded before proceeding
          const crimsonLoaded = document.fonts.check('400 32px "Crimson Text"')
          const vibLoaded = document.fonts.check('400 32px "Great Vibes"')

          if (!crimsonLoaded || !vibLoaded) {
            console.warn("⚠️ Font verification failed, retrying...")
            await new Promise(resolve => setTimeout(resolve, 200))
          }

          await document.fonts.ready
          console.log("✅ Crimson Text and script fonts loaded successfully")
        }
        setFontsLoaded(true)
      } catch (error) {
        console.warn("⚠️ Font loading failed, using system fonts:", error)
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
      // Force load Crimson Text font before generating image with verification
      if (document.fonts) {
        console.log("🔤 Force loading Crimson Text font...")
        await document.fonts.load('400 32px "Crimson Text"')
        await document.fonts.load('400 32px "Great Vibes"')

        // Verify fonts are loaded
        const crimsonLoaded = document.fonts.check('400 32px "Crimson Text"')
        const vibLoaded = document.fonts.check('400 32px "Great Vibes"')

        if (!crimsonLoaded || !vibLoaded) {
          console.warn("⚠️ Font verification failed, waiting...")
          await new Promise(resolve => setTimeout(resolve, 300))
        }

        console.log("✅ Crimson Text fonts loaded successfully")
      }

      console.log("🚀 开始生成图片...")

      const response = await fetch("/api/generate-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      })

      const data = await response.json()
      console.log("📨 API响应:", data)

      if (data.success) {
        setGeneratedImageUrl(data.imageUrl)
        console.log("✅ 图片生成成功:", data.imageUrl)
      } else {
        setError(data.error || "Failed to generate image")
        console.error("❌ 生成失败:", data.error)
      }
    } catch (error) {
      console.error("❌ 网络错误:", error)
      setError("Network error. Please check your connection and try again.")
    } finally {
      setIsGenerating(false)
    }
  }

  const EXPORT_SCALE = 2;

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
          throw new Error("页面未获得焦点或剪贴板不可用")
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

  // App link protocols for social media
  const appLinks = {
    whatsapp: (text: string) => `https://wa.me/?text=${encodeURIComponent(text)}`,
    facebook: (url: string) => `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    x: (text: string) => `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`,
    instagram: () => `instagram://library`, // Opens Instagram to library
  }

  // Auto-copy quote content to clipboard
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

  // Show toast message with auto-dismiss
  const showToast = (message: string) => {
    setToastMessage(message)
    setTimeout(() => setToastMessage(null), 3000)
  }

  // Share handlers for each platform
  const handleShareToWhatsApp = async () => {
    const quoteText = `"${quote.content}" — ${quote.reference}`
    await copyQuoteText()
    window.location.href = appLinks.whatsapp(quoteText)
    setShowShareMenu(false)
  }

  const handleShareToFacebook = async () => {
    const quoteText = `"${quote.content}" — ${quote.reference}`
    await copyQuoteText()
    window.location.href = appLinks.facebook(window.location.href)
    setShowShareMenu(false)
  }

  const handleShareToX = async () => {
    const quoteText = `"${quote.content}" — ${quote.reference}`
    await copyQuoteText()
    window.location.href = appLinks.x(quoteText)
    setShowShareMenu(false)
  }

  const handleShareToInstagram = async () => {
    // For Instagram: download first, then redirect
    showToast("Art saved! Opening Instagram...")
    await downloadImage()
    await copyQuoteText()
    setTimeout(() => {
      window.location.href = appLinks.instagram()
      setShowShareMenu(false)
    }, 500)
  }

  // Main share function - uses native share API or shows menu
  const shareImage = async () => {
    if (!previewCanvasRef.current || !fontsLoaded) return

    setIsSharing(true)
    setError(null)

    try {
      // Convert canvas to blob
      const blob = await new Promise<Blob | null>((resolve) => {
        previewCanvasRef.current!.toBlob((blob) => resolve(blob), 'image/png', 1.0)
      })

      if (!blob) {
        throw new Error('Failed to generate image')
      }

      // Create File object from Blob
      const file = new File([blob], `divine-quote-${quote.reference.replace(/\s+/g, '-').toLowerCase()}.png`, {
        type: 'image/png',
      })

      // Check if browser supports sharing files
      const shareData = {
        files: [file],
        title: 'Divine Scripture Art',
        text: `"${quote.content}" — ${quote.reference}`,
      }

      if (navigator.canShare && navigator.canShare(shareData)) {
        // Use Web Share API for direct image sharing
        await navigator.share(shareData)
      } else {
        // Fallback: show share menu for app-specific sharing
        setShowShareMenu(true)
      }
    } catch (err) {
      // User cancelled sharing or error occurred
      if (err instanceof Error && err.name !== 'AbortError') {
        console.error('Share failed:', err)
        // Show share menu instead of error
        setShowShareMenu(true)
      }
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
    <div className="fixed inset-0 bg-black/70 dark:bg-black/90 backdrop-blur-md flex items-center justify-center p-4 z-50">
      <div className="scrollbar-hide bg-[#fdfbf7]/95 dark:bg-black/60 dark:backdrop-blur-max backdrop-blur-2xl rounded-[2rem] max-w-7xl w-full h-[90vh] max-h-[800px] shadow-2xl dark:shadow-[0_0_100px_rgba(212,175,55,0.15)] border border-amber-200/40 dark:border-amber-500/10 ring-1 dark:ring-amber-500/20 flex flex-col">
        <div className="p-6 md:p-8 relative flex-shrink-0">
          {/* Floating Close Button - Amber Gold with Glow */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 z-50 group"
            aria-label="Close"
          >
            <div className="relative w-12 h-12 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 dark:from-amber-500 dark:to-amber-700 flex items-center justify-center shadow-lg shadow-amber-500/30 dark:shadow-amber-500/40 transition-all duration-300 group-hover:scale-110 group-hover:shadow-amber-500/50 dark:group-hover:shadow-amber-500/60">
              <div className="absolute inset-0 rounded-full bg-amber-400/20 dark:bg-amber-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <X className="relative w-6 h-6 text-white" strokeWidth={2.5} />
            </div>
          </button>

          {/* Centered Title */}
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-amber-900 dark:text-amber-300" style={{ letterSpacing: '0.12em' }}>
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
              <p className="text-blue-800 dark:text-blue-300 font-serif text-sm">Loading beautiful fonts for download...</p>
            </div>
          )}

          {/* Mobile-First Stacked Layout: Image first, controls below - Desktop: Side-by-side */}
          <div className="flex flex-col md:flex-row gap-4 lg:gap-6 min-h-0 flex-1 overflow-hidden">

            {/* RIGHT SIDE FIRST (Mobile) - Image Preview takes priority */}
            <div className="order-1 md:order-2 w-full md:w-[60%] flex flex-col h-full min-h-0 md:min-h-0 relative">
              {generatedImageUrl ? (
                <>
                  {/* Canvas Area - Mobile: Center with minimal padding, Desktop: As before */}
                  <div className="flex-1 relative w-full min-h-0 overflow-hidden flex items-start justify-center pt-2 md:pt-4 px-4 md:px-16 pb-0">
                    {/* Ultra-subtle Radial Amber Glow */}
                    <div className="absolute top-4 md:top-8 left-1/2 -translate-x-1/2 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-gradient-radial from-amber-400/6 via-amber-500/3 to-transparent pointer-events-none"></div>

                    {/* Canvas Container with Toolbar */}
                    <div className="group relative max-w-full aspect-square flex flex-col w-full">
                      {/* Canvas Frame Area */}
                      <div className="relative flex-1">
                        {/* Elegant Frame - Enhanced with shadow-2xl and ring-1 */}
                        <div className="absolute inset-0 bg-gradient-to-br from-amber-100/60 to-amber-50/40 dark:from-stone-800/70 dark:to-amber-950/50 rounded-2xl shadow-2xl shadow-black/20 dark:shadow-[0_0_60px_rgba(212,175,55,0.25)] border-[3px] border-amber-200/40 dark:border-amber-600/25 pointer-events-none"></div>
                        <div className="absolute inset-0 rounded-2xl ring-1 ring-white/30 dark:ring-amber-400/15 pointer-events-none"></div>
                        <div className="absolute inset-0 rounded-2xl p-[1px] bg-gradient-to-br from-amber-400/20 via-transparent to-amber-500/10 dark:from-amber-500/15 dark:via-transparent dark:to-amber-600/8 pointer-events-none"></div>

                        {/* Canvas - CRITICAL: max-w-full max-h-full for proper scaling */}
                        <canvas
                          ref={previewCanvasRef}
                          width={1024}
                          height={1024}
                          className="max-w-full max-h-full w-auto h-auto object-contain shadow-2xl dark:shadow-[0_0_30px_rgba(212,175,55,0.1)] rounded-lg relative z-10"
                        />
                      </div>
                    </div>
                  </div>
                </>
              ) : isGenerating ? (
                /* Elegant Loading Skeleton */
                <div className="flex-1 flex flex-col items-center justify-center bg-gradient-to-br from-amber-50/80 via-white/60 to-amber-100/70 dark:from-stone-900/60 dark:via-black/40 dark:to-amber-950/50 rounded-3xl p-4 md:p-8 border-2 border-amber-200/50 dark:border-amber-500/15 shadow-inner dark:shadow-[0_0_60px_rgba(212,175,55,0.15)] min-h-[300px] md:min-h-[450px] relative overflow-hidden">
                  {/* Subtle Animated Background Pattern */}
                  <div className="absolute inset-0 opacity-30">
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-amber-300/20 via-transparent to-amber-400/20 animate-pulse"></div>
                    <div className="absolute top-1/4 left-1/4 w-48 h-48 md:w-64 md:h-64 bg-amber-400/10 rounded-full blur-3xl animate-blob"></div>
                    <div className="absolute bottom-1/4 right-1/4 w-48 h-48 md:w-64 md:h-64 bg-amber-500/10 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
                  </div>

                  <div className="relative z-10 text-center">
                    {/* Elegant Loading Icon */}
                    <div className="relative inline-block mb-6 md:mb-8">
                      {/* Outer glow ring */}
                      <div className="absolute inset-0 rounded-full bg-amber-400/20 blur-xl animate-ping" style={{ animationDuration: '3s' }}></div>
                      {/* Middle rotating ring */}
                      <div className="absolute inset-0 rounded-full border-2 border-amber-400/30 border-t-amber-500/80 animate-spin" style={{ animationDuration: '2s' }}></div>
                      {/* Inner pulsing core */}
                      <div className="relative w-16 h-16 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-amber-100 to-amber-200 dark:from-amber-900/50 dark:to-amber-800/50 flex items-center justify-center shadow-lg shadow-amber-500/30">
                        <Palette className="w-8 h-8 md:w-12 md:h-12 text-amber-600 dark:text-amber-400 animate-pulse" />
                      </div>
                    </div>

                    {/* Elegant Typography */}
                    <h3 className="text-xl md:text-2xl lg:text-3xl font-serif font-semibold text-amber-900 dark:text-amber-200 mb-2 md:mb-3" style={{ letterSpacing: '0.15em' }}>
                      Crafting Your Divine Masterpiece
                    </h3>

                    <p className="text-sm md:text-base font-serif text-amber-700/70 dark:text-amber-400/60 italic mb-4 md:mb-6 max-w-md mx-auto px-4">
                      "Every stroke of light is a prayer, every color a blessing"
                    </p>

                    {/* Progress Indicator */}
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></div>
                      <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse animation-delay-200"></div>
                      <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse animation-delay-400"></div>
                    </div>
                  </div>
                </div>
              ) : (
                /* Empty State - Compact */
                <div className="flex-1 flex flex-col items-center justify-center bg-gradient-to-br from-stone-100/60 to-amber-50/40 dark:from-stone-900/40 dark:to-amber-950/20 rounded-3xl p-4 md:p-8 border-4 border-amber-200/50 dark:border-amber-500/15 shadow-inner dark:shadow-[0_0_40px_rgba(212,175,55,0.1)] min-h-[300px] md:min-h-[450px]">
                  <div className="text-center px-4">
                    <div className="relative inline-block mb-4 md:mb-6">
                      <div className="absolute inset-0 bg-amber-400/15 dark:bg-amber-500/20 rounded-full blur-3xl animate-pulse"></div>
                      <Palette className="relative w-16 h-16 md:w-20 md:h-20 text-amber-400/60 dark:text-amber-500/50" />
                    </div>
                    <p className="text-xl md:text-2xl lg:text-3xl font-serif font-semibold text-stone-700 dark:text-zinc-300 mb-2 md:mb-3">Your Canvas Awaits</p>
                    <p className="text-sm md:text-base font-serif text-stone-500 dark:text-zinc-500 mb-3 md:mb-4 max-w-md">Describe your sacred vision below and let divine art emerge</p>
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-amber-100/50 dark:bg-amber-950/30 rounded-full border border-amber-200/40 dark:border-amber-500/15">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
                      <span className="text-xs md:text-sm font-serif text-amber-700/70 dark:text-amber-400/70">Ready to create • 1:1 Square Format</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* LEFT SIDE (Mobile: Below Image, Desktop: Left) - Controls */}
            <div className="order-2 md:order-1 w-full md:w-[40%] space-y-3 flex-shrink-0 flex flex-col overflow-y-auto pr-0 md:pr-1 max-h-[40vh] md:max-h-full">
              {/* Compact Input Area - Mobile optimized padding */}
              <div className="bg-gradient-to-br from-stone-50/70 to-amber-50/30 dark:from-stone-900/30 dark:to-amber-950/15 backdrop-blur-xl rounded-2xl md:rounded-3xl p-3 md:p-4 border border-amber-100/40 dark:border-amber-500/10 shadow-md dark:shadow-[0_0_25px_rgba(212,175,55,0.06)]">
                <div className="flex items-center gap-2 mb-2 md:mb-3">
                  <Palette className="w-4 h-4 md:w-5 md:h-5 text-amber-600 dark:text-amber-400" />
                  <h3 className="text-base md:text-lg font-serif font-semibold text-gray-800 dark:text-zinc-200">Background Scene</h3>
                </div>

                <textarea
                  placeholder="Describe the background scene..."
                  value={prompt}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setPrompt(e.target.value)}
                  rows={2}
                  className="w-full px-3 py-2.5 text-base bg-stone-50/50 dark:bg-stone-900/30 border border-amber-200/30 dark:border-amber-500/15 rounded-xl focus:outline-none focus:border-amber-400/50 dark:focus:border-amber-400/30 text-gray-800 dark:text-zinc-200 placeholder-gray-500/60 dark:placeholder:text-zinc-500 transition-all duration-300 font-serif resize-none mb-2"
                />

                {/* Quick Suggestions - MOBILE OPTIMIZED: Larger touch targets (44px min) */}
                <div className="space-y-1.5 md:space-y-2 mb-3">
                  <p className="text-xs font-serif uppercase tracking-wider text-amber-600/60 dark:text-amber-400/50">Suggestions:</p>
                  <div className="flex flex-wrap gap-1.5">
                    {promptSuggestions.map((suggestion, index) => (
                      <button
                        key={index}
                        onClick={() => setPrompt(suggestion)}
                        className="px-3 py-2 min-h-[44px] text-sm md:text-xs md:py-1 md:px-2 font-serif bg-stone-900/50 dark:bg-stone-900/60 text-amber-200/80 dark:text-amber-300/70 rounded-full hover:scale-105 hover:bg-amber-100/50 dark:hover:bg-amber-950/60 hover:text-amber-900 dark:hover:text-amber-200 transition-all duration-300 active:scale-95"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Generate Button - MOBILE: Larger touch target */}
                <button
                  onClick={generateImage}
                  disabled={isGenerating || !prompt.trim()}
                  className="w-full min-h-[48px] md:min-h-[42px] px-4 py-3 md:py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 dark:from-amber-400 dark:to-amber-500 dark:hover:from-amber-300 dark:hover:to-amber-400 text-white font-serif font-semibold rounded-xl shadow-md hover:shadow-lg transition-all duration-300 active:scale-95 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed text-sm md:text-sm"
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

              {/* Quote Preview - Compact */}
              <div className="bg-gradient-to-br from-stone-50/70 to-amber-50/30 dark:from-stone-900/30 dark:to-amber-950/15 backdrop-blur-xl rounded-2xl md:rounded-3xl p-3 md:p-4 border border-amber-100/40 dark:border-amber-500/10 shadow-sm dark:shadow-[0_0_15px_rgba(212,175,55,0.04)]">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-xs font-serif uppercase tracking-widest text-amber-700/60 dark:text-amber-400/50">Your Quote</h4>
                  <button
                    onClick={toggleFavorite}
                    className="p-2 min-h-[44px] min-w-[44px] rounded-full hover:bg-amber-100/40 dark:hover:bg-amber-500/10 transition-colors active:scale-95"
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

              {/* Style Controls - Only show when image exists */}
              {generatedImageUrl && (
                <div className="mt-auto bg-gradient-to-br from-stone-50/70 to-amber-50/30 dark:from-stone-900/30 dark:to-amber-950/15 backdrop-blur-xl rounded-2xl md:rounded-3xl p-3 md:p-4 border border-amber-100/40 dark:border-amber-500/10 shadow-md dark:shadow-[0_0_25px_rgba(212,175,55,0.06)]">
                  <h4 className="text-sm font-serif font-semibold text-gray-800 dark:text-zinc-200 mb-2 md:mb-3">Style Options</h4>

                  {/* Compact 2-Column Grid Layout */}
                  <div className="grid grid-cols-2 gap-2 md:gap-3">
                    {/* Text Color - MOBILE: Larger touch targets */}
                    <div>
                      <p className="text-xs font-serif uppercase tracking-wider text-amber-600/60 dark:text-amber-400/50 mb-2">Color</p>
                      <div className="flex gap-2 md:gap-2">
                        {["#ffd700", "#fff"].map((color) => (
                          <button
                            key={color}
                            onClick={() => setTextColor(color)}
                            className="relative w-10 h-10 md:w-8 md:h-8 min-h-[44px] md:min-h-0 min-w-[44px] md:min-w-0 rounded-full border-2 transition-all duration-300 hover:scale-110 active:scale-95 flex-shrink-0"
                            style={{
                              background: color,
                              borderColor: textColor === color ? '#d97706' : 'rgba(251, 191, 36, 0.25)',
                              boxShadow: textColor === color ? '0 0 10px rgba(217, 119, 6, 0.4)' : 'none',
                            }}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Theme Toggle - MOBILE: Larger touch target */}
                    <div>
                      <p className="text-xs font-serif uppercase tracking-wider text-amber-600/60 dark:text-amber-400/50 mb-2">Theme</p>
                      <button
                        onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
                        className="w-full h-10 md:h-9 min-h-[44px] md:min-h-0 rounded-lg bg-gradient-to-r from-stone-200 to-stone-300 dark:from-stone-700 dark:to-stone-600 text-stone-700 dark:text-stone-200 hover:from-stone-300 hover:to-stone-400 dark:hover:from-stone-600 dark:hover:to-stone-500 transition-all duration-300 border border-stone-300/40 dark:border-stone-500/20 font-serif text-sm flex items-center justify-center gap-2 active:scale-95"
                      >
                        <span>{theme === 'light' ? '☀️' : '🌙'}</span>
                        <span>{theme === 'light' ? 'Light' : 'Dark'}</span>
                      </button>
                    </div>

                    {/* Font Selection - Spans full width */}
                    <div className="col-span-2">
                      <p className="text-xs font-serif uppercase tracking-wider text-amber-600/60 dark:text-amber-400/50 mb-2">Font</p>
                      <div className="flex gap-2">
                        <button
                          onClick={() => setSelectedFont("classic")}
                          className={`flex-1 px-4 py-2.5 md:py-2 md:px-3 min-h-[44px] md:min-h-0 text-sm font-serif rounded-lg transition-all duration-300 active:scale-95 ${
                            selectedFont === "classic"
                              ? "bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-sm"
                              : "bg-white/50 dark:bg-white/[0.02] text-amber-700 dark:text-amber-300 hover:bg-amber-50 dark:hover:bg-amber-950/25 border border-amber-200/30 dark:border-amber-500/10"
                          }`}
                        >
                          Serif
                        </button>
                        <button
                          onClick={() => setSelectedFont("handwriting")}
                          className={`flex-1 px-4 py-2.5 md:py-2 md:px-3 min-h-[44px] md:min-h-0 text-sm font-serif rounded-lg transition-all duration-300 active:scale-95 ${
                            selectedFont === "handwriting"
                              ? "bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-sm"
                              : "bg-white/50 dark:bg-white/[0.02] text-amber-700 dark:text-amber-300 hover:bg-amber-50 dark:hover:bg-amber-950/25 border border-amber-200/30 dark:border-amber-500/10"
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

            {/* MOBILE: Fixed Bottom Toolbar - Only visible on mobile when image exists */}
            {generatedImageUrl && (
              <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 dark:bg-black/90 backdrop-blur-xl border-t border-amber-200/50 dark:border-amber-500/20 px-4 py-3 safe-area-inset-bottom">
                <div className="flex items-center justify-between gap-2">
                  {/* Download - MOBILE OPTIMIZED */}
                  <button
                    onClick={downloadImage}
                    disabled={isComposing || !fontsLoaded}
                    className="group/download flex-1 min-h-[52px] px-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 dark:from-amber-400 dark:to-amber-500 text-white font-serif font-semibold rounded-2xl transition-all duration-300 active:scale-95 flex flex-col items-center justify-center gap-1 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-amber-500/30"
                    aria-label="Download image"
                  >
                    {isComposing ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span className="text-xs">Processing...</span>
                      </>
                    ) : (
                      <>
                        <Download className="w-6 h-6" />
                        <span className="text-xs font-semibold">Download</span>
                      </>
                    )}
                  </button>

                  {/* Copy - MOBILE OPTIMIZED */}
                  <button
                    onClick={copyToClipboard}
                    disabled={isComposing || !fontsLoaded}
                    className="flex-1 min-h-[52px] px-4 bg-white/70 dark:bg-white/15 hover:bg-white/90 dark:hover:bg-white/25 text-amber-900 dark:text-amber-100 font-serif font-semibold rounded-2xl transition-all duration-300 active:scale-95 flex flex-col items-center justify-center gap-1 disabled:opacity-50 disabled:cursor-not-allowed border border-amber-200/50 dark:border-amber-500/20"
                    aria-label="Copy to clipboard"
                  >
                    {copied ? (
                      <>
                        <Check className="w-5 h-5 text-green-600" />
                        <span className="text-xs">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-5 h-5" />
                        <span className="text-xs">Copy</span>
                      </>
                    )}
                  </button>

                  {/* Share - MOBILE: Emphasized with gradient for native share */}
                  <button
                    onClick={shareImage}
                    disabled={isSharing || isComposing || !fontsLoaded}
                    className="flex-1 min-h-[52px] px-4 bg-gradient-to-br from-amber-400 to-yellow-500 hover:from-amber-500 hover:to-yellow-600 dark:from-amber-300 dark:to-amber-400 text-white font-serif font-bold rounded-2xl transition-all duration-300 active:scale-95 flex flex-col items-center justify-center gap-1 disabled:opacity-50 disabled:cursor-not-allowed shadow-xl shadow-amber-500/40"
                    aria-label="Share image"
                  >
                    {isSharing ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span className="text-xs font-semibold">Sharing...</span>
                      </>
                    ) : (
                      <>
                        <Share2 className="w-6 h-6" />
                        <span className="text-xs font-bold">Share</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}

            {/* DESKTOP: Toolbar inside preview area - Only visible on desktop */}
            {generatedImageUrl && (
              <div className="hidden md:block absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-white/80 via-white/50 to-transparent dark:from-black/80 dark:via-black/40 to-transparent">
                <div className="flex items-center justify-between gap-3 backdrop-blur-sm rounded-2xl p-3 bg-white/60 dark:bg-black/40 border border-amber-200/40 dark:border-amber-500/15">
                  {/* Download */}
                  <button
                    onClick={downloadImage}
                    disabled={isComposing || !fontsLoaded}
                    className="group/download min-h-[44px] px-5 bg-white/70 dark:bg-white/15 hover:bg-white/90 dark:hover:bg-white/25 text-amber-900 dark:text-amber-100 font-serif font-semibold rounded-xl transition-all duration-300 active:scale-95 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed text-sm flex-1 relative overflow-hidden border border-white/10 dark:border-white/5 hover:border-amber-500/50 dark:hover:border-amber-400/40"
                    aria-label="Download image"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-amber-400/0 via-amber-400/10 to-amber-400/0 opacity-0 group-hover/download:opacity-100 group-hover/download:animate-pulse transition-opacity duration-500"></div>
                    {isComposing ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin relative z-10" />
                        <span className="relative z-10">Processing...</span>
                      </>
                    ) : (
                      <>
                        <Download className="w-4 h-4 relative z-10" />
                        <span className="relative z-10">Download</span>
                      </>
                    )}
                  </button>

                  {/* Copy */}
                  <button
                    onClick={copyToClipboard}
                    disabled={isComposing || !fontsLoaded}
                    className="min-h-[44px] px-5 bg-white/70 dark:bg-white/15 hover:bg-white/90 dark:hover:bg-white/25 text-amber-900 dark:text-amber-100 font-serif font-semibold rounded-xl transition-all duration-300 active:scale-95 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed text-sm flex-1 border border-white/10 dark:border-white/5 hover:border-amber-500/50 dark:hover:border-amber-400/40"
                    aria-label="Copy to clipboard"
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>

                  {/* Share - Desktop */}
                  <button
                    onClick={shareImage}
                    disabled={isSharing || isComposing || !fontsLoaded}
                    className="flex-1 min-h-[44px] px-5 bg-white/70 dark:bg-white/15 hover:bg-white/90 dark:hover:bg-white/25 text-amber-900 dark:text-amber-100 font-serif font-semibold rounded-xl transition-all duration-300 active:scale-95 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed text-sm border border-white/10 dark:border-white/5 hover:border-amber-500/50 dark:hover:border-amber-400/40"
                    aria-label="Share image"
                  >
                    {isSharing ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Sharing...</span>
                      </>
                    ) : (
                      <>
                        <Share2 className="w-4 h-4" />
                        <span>Share</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Share Menu - Slide-up panel for mobile */}
        {showShareMenu && (
          <>
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-black/40 backdrop-blur-sm z-40 animate-in fade-in duration-200"
              onClick={() => setShowShareMenu(false)}
            />

            {/* Slide-up Menu */}
            <div className="absolute bottom-0 left-0 right-0 z-50 animate-in slide-in-from-bottom-4 duration-300 ease-out">
              <div className="bg-white/95 dark:bg-black/95 backdrop-blur-xl border-t border-amber-200/50 dark:border-amber-500/20 rounded-t-3xl p-6 safe-area-inset-bottom">
                {/* Handle bar */}
                <div className="flex justify-center mb-6">
                  <div className="w-12 h-1.5 bg-amber-300/50 dark:bg-amber-600/50 rounded-full" />
                </div>

                {/* Title */}
                <h3 className="text-xl font-serif font-semibold text-amber-900 dark:text-amber-300 text-center mb-6">
                  Share to App
                </h3>

                {/* App icons grid */}
                <div className="grid grid-cols-4 gap-4 mb-6">
                  {/* WhatsApp */}
                  <button
                    onClick={handleShareToWhatsApp}
                    className="flex flex-col items-center gap-2 p-3 rounded-2xl hover:bg-amber-100/50 dark:hover:bg-amber-950/30 transition-all duration-300 active:scale-95 group"
                  >
                    <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center shadow-lg shadow-green-500/30 group-hover:shadow-green-500/50 transition-all duration-300">
                      <MessageCircle className="w-7 h-7 md:w-8 md:h-8 text-white" strokeWidth={2.5} />
                    </div>
                    <span className="text-xs font-serif text-stone-700 dark:text-stone-300">WhatsApp</span>
                  </button>

                  {/* Facebook */}
                  <button
                    onClick={handleShareToFacebook}
                    className="flex flex-col items-center gap-2 p-3 rounded-2xl hover:bg-amber-100/50 dark:hover:bg-amber-950/30 transition-all duration-300 active:scale-95 group"
                  >
                    <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center shadow-lg shadow-blue-500/30 group-hover:shadow-blue-500/50 transition-all duration-300">
                      <Facebook className="w-7 h-7 md:w-8 md:h-8 text-white" strokeWidth={2.5} />
                    </div>
                    <span className="text-xs font-serif text-stone-700 dark:text-stone-300">Facebook</span>
                  </button>

                  {/* X / Twitter */}
                  <button
                    onClick={handleShareToX}
                    className="flex flex-col items-center gap-2 p-3 rounded-2xl hover:bg-amber-100/50 dark:hover:bg-amber-950/30 transition-all duration-300 active:scale-95 group"
                  >
                    <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-stone-700 to-black dark:from-stone-600 dark:to-stone-900 flex items-center justify-center shadow-lg shadow-stone-500/30 group-hover:shadow-stone-500/50 transition-all duration-300">
                      <Youtube className="w-6 h-6 md:w-7 md:h-7 text-white" strokeWidth={2.5} />
                    </div>
                    <span className="text-xs font-serif text-stone-700 dark:text-stone-300">X</span>
                  </button>

                  {/* Instagram */}
                  <button
                    onClick={handleShareToInstagram}
                    className="flex flex-col items-center gap-2 p-3 rounded-2xl hover:bg-amber-100/50 dark:hover:bg-amber-950/30 transition-all duration-300 active:scale-95 group"
                  >
                    <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 flex items-center justify-center shadow-lg shadow-pink-500/30 group-hover:shadow-pink-500/50 transition-all duration-300">
                      <Instagram className="w-7 h-7 md:w-8 md:h-8 text-white" strokeWidth={2.5} />
                    </div>
                    <span className="text-xs font-serif text-stone-700 dark:text-stone-300">Instagram</span>
                  </button>
                </div>

                {/* Note about auto-copy */}
                <p className="text-center text-xs font-serif text-stone-500 dark:text-stone-400 italic">
                  Quote text copied to clipboard • Image saved for Instagram
                </p>

                {/* Cancel button */}
                <button
                  onClick={() => setShowShareMenu(false)}
                  className="w-full mt-4 py-3 px-4 bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 font-serif rounded-xl hover:bg-stone-200 dark:hover:bg-stone-700 transition-all duration-300 active:scale-98"
                >
                  Cancel
                </button>
              </div>
            </div>
          </>
        )}

        {/* Toast Notification */}
        {toastMessage && (
          <div className="absolute top-24 left-1/2 -translate-x-1/2 z-50 animate-in slide-in-from-top-2 duration-300">
            <div className="bg-amber-500 text-white px-6 py-3 rounded-2xl shadow-lg shadow-amber-500/30 flex items-center gap-2">
              <Check className="w-5 h-5" />
              <span className="font-serif text-sm font-semibold">{toastMessage}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// Add default export for Next.js dynamic imports
export default ImageGenerator
