"use client"

import { useState, useRef, useEffect } from "react"
import {
  Loader2,
  Download,
  Share2,
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

// Import draw engine, social share hook, and UI components
import { drawQuoteImage } from "./draw-engine"
import { useSocialShare } from "./use-social-share"
import { UIControls } from "./ui-controls"
import { CanvasPreview } from "./canvas-preview"

interface Quote {
  reference: string
  content: string
}

interface ImageGeneratorProps {
  quote: Quote
  onClose: () => void
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
  const [isInputCollapsed, setIsInputCollapsed] = useState(false)
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState<number | null>(null)
  const [hasInput, setHasInput] = useState(false)

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

  // Track input for ready indicator
  useEffect(() => {
    setHasInput(prompt.trim().length > 0)
  }, [prompt])

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

  // Native share function using Web Share API
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

      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)

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

  // Social share hook (must be after downloadImage is defined)
  const {
    showShareMenu,
    showInstagramOpenButton,
    toastMessage,
    setShowShareMenu,
    handleShareToWhatsApp,
    handleShareToFacebook,
    handleShareToX,
    handleShareToInstagram,
    forceOpenInstagram,
  } = useSocialShare({
    quote,
    downloadImage,
    generatedImageUrl,
  })

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
            <UIControls
              quote={quote}
              prompt={prompt}
              setPrompt={setPrompt}
              isGenerating={isGenerating}
              generateImage={generateImage}
              generatedImageUrl={generatedImageUrl}
              isInputCollapsed={isInputCollapsed}
              setIsInputCollapsed={setIsInputCollapsed}
              selectedSuggestionIndex={selectedSuggestionIndex}
              setSelectedSuggestionIndex={setSelectedSuggestionIndex}
              hasInput={hasInput}
              isFavorited={isFavorited}
              toggleFavorite={toggleFavorite}
              theme={theme}
              setTheme={setTheme}
              textColor={textColor}
              setTextColor={setTextColor}
              selectedFont={selectedFont}
              setSelectedFont={setSelectedFont}
            />

            {/* RIGHT: Image Preview Area */}
            <CanvasPreview
              generatedImageUrl={generatedImageUrl}
              isGenerating={isGenerating}
              isComposing={isComposing}
              isSharing={isSharing}
              fontsLoaded={fontsLoaded}
              copied={copied}
              hasInput={hasInput}
              previewCanvasRef={previewCanvasRef}
              downloadImage={downloadImage}
              copyToClipboard={copyToClipboard}
              shareImage={shareImage}
            />
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
