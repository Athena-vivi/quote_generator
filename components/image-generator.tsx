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
  Facebook,
  Linkedin,
} from "lucide-react"

// Twitter/X icon
const TwitterX = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
)

// Pinterest icon
const PinterestIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 0c-6.627 0-12 5.372-12 12 0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146 1.124.347 2.317.535 3.554.535 6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z"/>
  </svg>
)

// WhatsApp icon
const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
)

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

    // Reference is 28px for better visibility (as requested)
    refFontSize = 28
    refHeight = refFontSize * 1.5

    // Spacing between text and reference
    spacing = fontSize * 2.0
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

  // Draw reference - 28px bold, positioned at bottom-right corner
  ctx.font = `700 28px ${fontFamily}` // Bold 28px for reference
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
  const [showSocialShare, setShowSocialShare] = useState(false)

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

  // Social media share functions
  const shareToSocial = async (platform: string) => {
    if (!generatedImageUrl) return

    const shareUrl = typeof window !== 'undefined' ? window.location.href : ''
    const shareText = `"${quote.content}" — ${quote.reference}`
    const encodedUrl = encodeURIComponent(shareUrl)
    const encodedText = encodeURIComponent(shareText)

    let shareLink = ''

    switch (platform) {
      case 'twitter':
        shareLink = `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`
        break
      case 'facebook':
        shareLink = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`
        break
      case 'pinterest':
        shareLink = `https://pinterest.com/pin/create/button/?description=${encodedText}&url=${encodedUrl}`
        break
      case 'linkedin':
        shareLink = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`
        break
      case 'email':
        shareLink = `mailto:?subject=Divine Scripture Art&body=${encodedText}%0A%0A${encodedUrl}`
        break
      case 'whatsapp':
        shareLink = `https://wa.me/?text=${encodedText}%20${encodedUrl}`
        break
    }

    if (shareLink) {
      window.open(shareLink, '_blank', 'width=600,height=400')
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

  const socialPlatforms = [
    { id: 'facebook', icon: Facebook, label: 'Facebook' },
    { id: 'twitter', icon: TwitterX, label: 'X' },
    { id: 'pinterest', icon: PinterestIcon, label: 'Pinterest' },
    { id: 'linkedin', icon: Linkedin, label: 'LinkedIn' },
    { id: 'whatsapp', icon: WhatsAppIcon, label: 'WhatsApp' },
  ]

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

          {/* 4:6 Asymmetric Layout - 40% Controls / 60% Preview - Fixed container */}
          <div className="flex flex-row gap-4 lg:gap-6 min-h-0 flex-1 overflow-hidden">
            {/* Left Side - Controls (40%) - Scrollable when needed */}
            <div className="w-[40%] space-y-3 flex-shrink-0 flex flex-col overflow-y-auto pr-1">
              {/* Compact Input Area - Reduced padding */}
              <div className="bg-white/70 dark:bg-white/[0.02] dark:backdrop-blur-max backdrop-blur-xl rounded-3xl p-4 border border-amber-100/40 dark:border-amber-500/10 shadow-md dark:shadow-[0_0_25px_rgba(212,175,55,0.06)]">
                <div className="flex items-center gap-2 mb-3">
                  <Palette className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                  <h3 className="text-lg font-serif font-semibold text-gray-800 dark:text-zinc-200">Background Scene</h3>
                </div>

                <textarea
                  placeholder="Describe the background scene..."
                  value={prompt}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setPrompt(e.target.value)}
                  rows={2}
                  className="w-full px-3 py-2 text-base bg-stone-50/50 dark:bg-stone-900/30 border border-amber-200/30 dark:border-amber-500/15 rounded-xl focus:outline-none focus:border-amber-400/50 dark:focus:border-amber-400/30 text-gray-800 dark:text-zinc-200 placeholder-gray-500/60 dark:placeholder:text-zinc-500 transition-all duration-300 font-serif resize-none mb-2"
                />

                {/* Compressed Quick Suggestions */}
                <div className="space-y-2 mb-3">
                  <p className="text-xs font-serif uppercase tracking-wider text-amber-600/60 dark:text-amber-400/50">Suggestions:</p>
                  <div className="flex flex-wrap gap-1.5">
                    {promptSuggestions.map((suggestion, index) => (
                      <button
                        key={index}
                        onClick={() => setPrompt(suggestion)}
                        className="px-2 py-1 text-xs font-serif bg-stone-900/50 dark:bg-stone-900/60 text-amber-200/80 dark:text-amber-300/70 rounded-full hover:bg-stone-800/70 dark:hover:bg-stone-800/80 transition-all duration-300"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Compact Generate Button */}
                <button
                  onClick={generateImage}
                  disabled={isGenerating || !prompt.trim()}
                  className="w-full min-h-[42px] px-4 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 dark:from-amber-400 dark:to-amber-500 dark:hover:from-amber-300 dark:hover:to-amber-400 text-white font-serif font-semibold rounded-xl shadow-md hover:shadow-lg transition-all duration-300 active:scale-95 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Palette className="w-5 h-5" />
                      Generate
                    </>
                  )}
                </button>
              </div>

              {/* Quote Preview - Compact */}
              <div className="bg-gradient-to-br from-stone-50/70 to-amber-50/30 dark:from-stone-900/30 dark:to-amber-950/15 backdrop-blur-xl rounded-3xl p-4 border border-amber-100/40 dark:border-amber-500/10 shadow-sm dark:shadow-[0_0_15px_rgba(212,175,55,0.04)]">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-xs font-serif uppercase tracking-widest text-amber-700/60 dark:text-amber-400/50">Your Quote</h4>
                  <button
                    onClick={toggleFavorite}
                    className="p-1 rounded-full hover:bg-amber-100/40 dark:hover:bg-amber-500/10 transition-colors"
                    aria-label={isFavorited ? "Remove from favorites" : "Add to favorites"}
                  >
                    {isFavorited ? (
                      <Heart className="w-5 h-5 text-red-500 fill-current" />
                    ) : (
                      <Heart className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                    )}
                  </button>
                </div>

                <blockquote className="text-base font-serif font-light italic text-stone-800 dark:text-zinc-200 leading-relaxed mb-1">
                  "{quote.content}"
                </blockquote>

                <cite className="block text-sm font-serif text-amber-800 dark:text-amber-400 italic text-right">
                  — {quote.reference}
                </cite>
              </div>

              {/* Style Controls - Compact Grid Layout */}
              {generatedImageUrl && (
                <div className="mt-auto bg-white/70 dark:bg-white/[0.02] dark:backdrop-blur-max backdrop-blur-xl rounded-3xl p-4 border border-amber-100/40 dark:border-amber-500/10 shadow-md dark:shadow-[0_0_25px_rgba(212,175,55,0.06)]">
                  <h4 className="text-sm font-serif font-semibold text-gray-800 dark:text-zinc-200 mb-3">Style Options</h4>

                  {/* Compact 2-Column Grid Layout */}
                  <div className="grid grid-cols-2 gap-3">
                    {/* Text Color */}
                    <div>
                      <p className="text-xs font-serif uppercase tracking-wider text-amber-600/60 dark:text-amber-400/50 mb-2">Color</p>
                      <div className="flex gap-2">
                        {["#ffd700", "#fff"].map((color) => (
                          <button
                            key={color}
                            onClick={() => setTextColor(color)}
                            className="relative w-8 h-8 rounded-full border-2 transition-all duration-300 hover:scale-110 flex-shrink-0"
                            style={{
                              background: color,
                              borderColor: textColor === color ? '#d97706' : 'rgba(251, 191, 36, 0.25)',
                              boxShadow: textColor === color ? '0 0 10px rgba(217, 119, 6, 0.4)' : 'none',
                            }}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Theme Toggle */}
                    <div>
                      <p className="text-xs font-serif uppercase tracking-wider text-amber-600/60 dark:text-amber-400/50 mb-2">Theme</p>
                      <button
                        onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
                        className="w-full h-9 rounded-lg bg-gradient-to-r from-stone-200 to-stone-300 dark:from-stone-700 dark:to-stone-600 text-stone-700 dark:text-stone-200 hover:from-stone-300 hover:to-stone-400 dark:hover:from-stone-600 dark:hover:to-stone-500 transition-all duration-300 border border-stone-300/40 dark:border-stone-500/20 font-serif text-sm flex items-center justify-center gap-2"
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
                          className={`flex-1 px-3 py-2 text-sm font-serif rounded-lg transition-all duration-300 ${
                            selectedFont === "classic"
                              ? "bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-sm"
                              : "bg-white/50 dark:bg-white/[0.02] text-amber-700 dark:text-amber-300 hover:bg-amber-50 dark:hover:bg-amber-950/25 border border-amber-200/30 dark:border-amber-500/10"
                          }`}
                        >
                          Serif
                        </button>
                        <button
                          onClick={() => setSelectedFont("handwriting")}
                          className={`flex-1 px-3 py-2 text-sm font-serif rounded-lg transition-all duration-300 ${
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

            {/* Right Side - Preview (60%) - Fixed layout with proper overflow */}
            <div className="w-[60%] flex flex-col h-full min-h-0">
              {generatedImageUrl ? (
                <div className="flex-1 relative w-full h-full min-h-0 overflow-hidden flex items-center justify-center p-4">
                  {/* Ultra-subtle Radial Amber Glow */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-amber-400/6 via-amber-500/3 to-transparent pointer-events-none"></div>

                  {/* Canvas Container with Floating Toolbar - Group for hover */}
                  <div className="group relative">
                    {/* Elegant Frame - Refined */}
                    <div className="absolute inset-0 bg-gradient-to-br from-amber-100/60 to-amber-50/40 dark:from-stone-800/70 dark:to-amber-950/50 rounded-2xl shadow-[0_0_40px_rgba(212,175,55,0.2)] border-[3px] border-amber-200/40 dark:border-amber-600/25 pointer-events-none"></div>
                    <div className="absolute inset-0 rounded-2xl ring-2 ring-amber-400/20 dark:ring-amber-500/20 pointer-events-none"></div>
                    <div className="absolute inset-0 rounded-2xl p-[1px] bg-gradient-to-br from-amber-400/20 via-transparent to-amber-500/10 dark:from-amber-500/15 dark:via-transparent dark:to-amber-600/8 pointer-events-none"></div>

                    {/* Canvas - CRITICAL: max-w-full max-h-full for proper scaling */}
                    <canvas
                      ref={previewCanvasRef}
                      width={1024}
                      height={1024}
                      className="max-w-full max-h-full w-auto h-auto object-contain shadow-2xl rounded-lg relative z-10"
                    />

                    {/* Floating Glass Toolbar - Bottom of image with better contrast */}
                    <div className="absolute bottom-6 left-6 right-6 z-20">
                      <div className="bg-white/40 dark:bg-black/60 backdrop-blur-md rounded-2xl border border-amber-200/30 dark:border-amber-500/15 shadow-lg transition-opacity duration-300 opacity-40 group-hover:opacity-100">
                        {/* Toolbar Actions - Horizontal row */}
                        <div className="flex items-center justify-between gap-2 p-2.5">
                          {/* Download */}
                          <button
                            onClick={downloadImage}
                            disabled={isComposing || !fontsLoaded}
                            className="min-h-[38px] px-3 bg-white/70 dark:bg-white/20 hover:bg-white/90 dark:hover:bg-white/30 text-amber-900 dark:text-amber-100 font-serif font-medium rounded-xl transition-all duration-300 active:scale-95 flex items-center justify-center gap-1.5 disabled:opacity-50 disabled:cursor-not-allowed text-xs flex-1"
                            aria-label="Download image"
                          >
                            {isComposing ? (
                              <>
                                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                <span>Processing...</span>
                              </>
                            ) : (
                              <>
                                <Download className="w-3.5 h-3.5" />
                                <span>Download</span>
                              </>
                            )}
                          </button>

                          {/* Copy */}
                          <button
                            onClick={copyToClipboard}
                            disabled={isComposing || !fontsLoaded}
                            className="min-h-[38px] px-3 bg-white/70 dark:bg-white/20 hover:bg-white/90 dark:hover:bg-white/30 text-amber-900 dark:text-amber-100 font-serif font-medium rounded-xl transition-all duration-300 active:scale-95 flex items-center justify-center gap-1.5 disabled:opacity-50 disabled:cursor-not-allowed text-xs flex-1"
                            aria-label="Copy to clipboard"
                          >
                            {copied ? (
                              <>
                                <Check className="w-3.5 h-3.5" />
                                <span>Copied!</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3.5 h-3.5" />
                                <span>Copy</span>
                              </>
                            )}
                          </button>

                          {/* Share with Social Icons */}
                          <div className="relative flex-1">
                            <button
                              onClick={() => setShowSocialShare(!showSocialShare)}
                              disabled={isComposing || !fontsLoaded}
                              className="w-full min-h-[38px] px-3 bg-white/70 dark:bg-white/20 hover:bg-white/90 dark:hover:bg-white/30 text-amber-900 dark:text-amber-100 font-serif font-medium rounded-xl transition-all duration-300 active:scale-95 flex items-center justify-center gap-1.5 disabled:opacity-50 disabled:cursor-not-allowed text-xs"
                              aria-label="Share"
                            >
                              <Share2 className="w-3.5 h-3.5" />
                              <span>Share</span>
                            </button>

                            {/* Horizontal Row of Outline Social Icons */}
                            {showSocialShare && (
                              <div className="absolute bottom-full left-0 right-0 mb-2 px-2.5 py-2 bg-white/95 dark:bg-black/90 backdrop-blur-xl rounded-2xl border border-amber-300/40 dark:border-amber-500/15 shadow-xl z-30 animate-in slide-in-from-bottom-2 duration-300">
                                <div className="flex items-center justify-center gap-1.5">
                                  {socialPlatforms.map((platform) => {
                                    const IconComponent = platform.icon
                                    return (
                                      <button
                                        key={platform.id}
                                        onClick={() => shareToSocial(platform.id)}
                                        className="group/social p-1.5 rounded-lg transition-all duration-300 hover:scale-110 hover:bg-amber-100/30 dark:hover:bg-amber-500/10"
                                        aria-label={`Share to ${platform.label}`}
                                      >
                                        <IconComponent className="w-4 h-4 text-amber-600/70 dark:text-amber-400/70" strokeWidth={1.5} />
                                      </button>
                                    )
                                  })}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                /* Empty State - Compact */
                <div className="flex-1 flex flex-col items-center justify-center bg-gradient-to-br from-stone-100/60 to-amber-50/40 dark:from-stone-900/40 dark:to-amber-950/20 rounded-3xl p-8 border-4 border-amber-200/50 dark:border-amber-500/15 shadow-inner dark:shadow-[0_0_40px_rgba(212,175,55,0.1)] min-h-[450px]">
                  <div className="text-center">
                    <div className="relative inline-block mb-6">
                      <div className="absolute inset-0 bg-amber-400/15 dark:bg-amber-500/20 rounded-full blur-3xl animate-pulse"></div>
                      <Palette className="relative w-20 h-20 text-amber-400/60 dark:text-amber-500/50" />
                    </div>
                    <p className="text-2xl md:text-3xl font-serif font-semibold text-stone-700 dark:text-zinc-300 mb-3">Your Canvas Awaits</p>
                    <p className="text-base font-serif text-stone-500 dark:text-zinc-500 mb-4 max-w-md">Describe your sacred vision on the left and let divine art emerge</p>
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-amber-100/50 dark:bg-amber-950/30 rounded-full border border-amber-200/40 dark:border-amber-500/15">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
                      <span className="text-xs font-serif text-amber-700/70 dark:text-amber-400/70">Ready to create • 1:1 Square Format</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Custom scrollbar hide styles */}
        <style jsx>{`
          .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
        `}</style>
      </div>
    </div>
  )
}

// Add default export for Next.js dynamic imports
export default ImageGenerator
