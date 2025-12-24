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

// 类型声明修复
// @ts-ignore
declare module 'qrcode';

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
  // 背景和渐变根据 theme 切换
  ctx.clearRect(0, 0, width, height)
  if (backgroundImg) {
    ctx.drawImage(backgroundImg, 0, 0, width, height)
  } else {
    if (theme === 'dark') {
      ctx.fillStyle = "#232b3a";
    } else {
      ctx.fillStyle = "#fff";
    }
    ctx.fillRect(0, 0, width, height)
  }
  // 渐变
  const gradient = ctx.createLinearGradient(0, 0, 0, height)
  if (theme === 'dark') {
    gradient.addColorStop(0, "rgba(0,0,0,0.45)")
    gradient.addColorStop(0.5, "rgba(0,0,0,0.18)")
    gradient.addColorStop(1, "rgba(0,0,0,0.55)")
  } else {
    gradient.addColorStop(0, "rgba(0,0,0,0.13)")
    gradient.addColorStop(0.5, "rgba(0,0,0,0.06)")
    gradient.addColorStop(1, "rgba(0,0,0,0.18)")
  }
  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, width, height)

  // 安全区参数
  const sideSafe = width * 0.10; // 左右安全距离
  const topSafe = height * 0.13; // 上安全距离
  const bottomSafe = height * 0.10; // 下安全距离
  const textAreaWidth = width - sideSafe * 2;
  const textAreaHeight = height - topSafe - bottomSafe;

  // 内容区只用安全区的80%，上下再留白
  const contentAreaHeight = textAreaHeight * 0.8;
  const contentAreaTop = topSafe + (textAreaHeight - contentAreaHeight) / 2;

  // 动态调整字号和正文起始位置
  const aspectRatio = width / height;
  let fontSize: number;
  if (aspectRatio < 0.7) { // 9:16竖图
    fontSize = Math.max(width, height) * 0.052;
  } else if (aspectRatio < 1.1) { // 1:1
    fontSize = Math.max(width, height) * 0.06;
  } else { // 16:9横图
    fontSize = Math.max(width, height) * 0.058;
  }

  let serifFonts = fontConfigs[selectedFont as keyof typeof fontConfigs].serif.join(", ");
  let lines: string[] = [];
  let lineHeight = fontSize * 1.22; // 行高增大，提升呼吸感
  let refFontSize = fontSize * 0.65;
  let refHeight = refFontSize * 1.2;
  let spacing = fontSize * 1.25; // 正文与引用间距更大
  let totalTextHeight = 0;
  let totalHeight = 0;

  // 先用理想字号排版，若溢出再缩小
  while (true) {
    ctx.font = `${fontSize}px ${serifFonts}`;
    // 分行
    lines = [];
    let currentLine = "";
    for (const word of quote.content.split(" ")) {
      const testLine = currentLine + (currentLine ? " " : "") + word;
      const metrics = ctx.measureText(testLine);
      if (metrics.width > textAreaWidth && currentLine) {
        lines.push(currentLine);
        currentLine = word;
      } else {
        currentLine = testLine;
      }
    }
    if (currentLine) lines.push(currentLine);
    // 行高固定更大，提升高级感
    lineHeight = fontSize * 1.22;
    totalTextHeight = lines.length * lineHeight;
    refFontSize = fontSize * 0.65;
    refHeight = refFontSize * 1.2;
    spacing = fontSize * 1.25;
    totalHeight = totalTextHeight + spacing + refHeight;
    if (totalHeight <= contentAreaHeight || fontSize < 18) break;
    fontSize *= 0.97; // 逐步缩小字号
  }

  // 正文排版
  ctx.font = `${fontSize}px ${serifFonts}`;
  ctx.fillStyle = textColor;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.shadowColor = "rgba(0,0,0,0.9)";
  ctx.shadowBlur = 12;
  ctx.shadowOffsetX = 3;
  ctx.shadowOffsetY = 3;

  // 内容区整体上下均匀分布，视觉重心居中略偏上
  const targetCenterY = contentAreaTop + contentAreaHeight * 0.44; // 0.44略偏上
  const startY = targetCenterY - totalHeight / 2 + lineHeight / 2;
  lines.forEach((line, index) => {
    let displayLine = line;
    if (index === 0) displayLine = `"${line}`;
    if (index === lines.length - 1) displayLine = lines.length === 1 ? `"${line}"` : `${line}"`;
    ctx.fillText(displayLine, width / 2, startY + index * lineHeight);
  });

  // 引用排版
  ctx.font = `${refFontSize}px ${serifFonts}`;
  ctx.textAlign = "right";
  ctx.textBaseline = "bottom";
  ctx.shadowColor = theme === 'dark' ? "rgba(0,0,0,0.7)" : "rgba(0,0,0,0.9)";
  ctx.shadowBlur = 8;
  ctx.shadowOffsetX = 2;
  ctx.shadowOffsetY = 2;
  ctx.fillStyle = refColor;
  ctx.fillText(`— ${quote.reference}`, width - sideSafe, height - bottomSafe);
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
  const [textColor, setTextColor] = useState<string>("#fff"); // 正文默认白色
  const [refColor, setRefColor] = useState<string>("#ffd700"); // 引用默认金色

  // Simplified artistic suggestions - 6 best ones
  const promptSuggestions = [
    "Divine light streaming through clouds",
    "Peaceful mountain sunrise with golden rays",
    "Serene ocean waves at sacred sunset",
    "Ancient olive trees in holy land",
    "Starry night over Jerusalem",
    "Gentle waterfall in Eden garden",
  ]

  // Font configurations optimized for religious content
  const fontConfigs = {
    classic: {
      serif: ['"EB Garamond"', '"Crimson Text"', '"Merriweather"', '"Lora"', '"Georgia"', '"Times New Roman"', 'serif'],
      name: "Classic Serif"
    },
    handwriting: {
      serif: ['"Caveat"', 'cursive', 'serif'],
      name: "Elegant Script"
    }
  }

  // Load fonts for canvas rendering
  useEffect(() => {
    const loadFonts = async () => {
      try {
        // 检查字体 API 是否可用
        if (document.fonts && typeof document.fonts.ready !== 'undefined') {
          // 等待字体加载
          await document.fonts.ready
          console.log("✅ 字体加载完成，包括 Google Fonts")
        } else {
          console.log("✅ 使用系统字体")
        }
        setFontsLoaded(true)
      } catch (error) {
        console.warn("⚠️ 字体加载失败，使用系统字体:", error)
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

  // 预览canvas绘制 useEffect 里 width/height 改为 resolution
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

  // 高清导出倍数
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
      ctx.setTransform(EXPORT_SCALE, 0, 0, EXPORT_SCALE, 0, 0); // 放大所有绘制
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
      ctx.setTransform(EXPORT_SCALE, 0, 0, EXPORT_SCALE, 0, 0); // 放大所有绘制
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
      setError("Copy failed. The image has been downloaded instead. Check your downloads folder.")
    } finally {
      setIsComposing(false)
    }
  }

  // Native share function using Web Share API
  const shareImage = async () => {
    if (!generatedImageUrl || !fontsLoaded) return

    setIsComposing(true)
    setError(null)

    try {
      // Create image blob
      const response = await fetch(generatedImageUrl, { mode: "cors" })
      const blob = await response.blob()
      const bitmap = await createImageBitmap(blob)

      // Create high-quality canvas
      const canvas = document.createElement("canvas")
      canvas.width = resolution.width
      canvas.height = resolution.height
      const ctx = canvas.getContext("2d")!

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

      // Convert to blob for sharing
      const finalBlob = await new Promise<Blob | null>((resolve) =>
        canvas.toBlob((b) => resolve(b), "image/png", 1.0)
      )

      if (!finalBlob) throw new Error("Could not create image")

      // Create File object for sharing
      const file = new File(
        [finalBlob],
        `bible-quote-${quote.reference.replace(/\s+/g, "-").toLowerCase()}.png`,
        { type: "image/png" }
      )

      // Check if Web Share API is supported
      if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          title: 'Divine Scripture Art',
          text: `"${quote.content}" — ${quote.reference}`,
          files: [file]
        })
      } else {
        // Fallback: download and show message
        const url = URL.createObjectURL(finalBlob)
        const link = document.createElement("a")
        link.href = url
        link.download = file.name
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        URL.revokeObjectURL(url)

        setError("Sharing not supported on this device. Image has been downloaded instead.")
      }
    } catch (err: any) {
      if (err.name === 'AbortError') {
        // User cancelled sharing - don't show error
        console.log('Share cancelled by user')
      } else {
        console.error('Share error:', err)
        setError("Failed to share. Please try downloading instead.")
      }
    } finally {
      setIsComposing(false)
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
    <div className="fixed inset-0 bg-black/60 dark:bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="custom-scrollbar bg-white/90 dark:bg-white/[0.02] dark:backdrop-blur-max backdrop-blur-2xl rounded-[2rem] max-w-6xl w-full max-h-[90vh] overflow-y-auto shadow-2xl dark:shadow-[0_0_60px_rgba(212,175,55,0.12)] border border-amber-100 dark:border-amber-500/10">
        <div className="p-6 md:p-8">
          <div className="flex justify-between items-center mb-8">
            <div className="flex-1 flex justify-center items-center">
              <h2 className="text-2xl md:text-3xl font-serif font-semibold text-amber-900 dark:text-amber-300 text-center" style={{ letterSpacing: '0.08em' }}>
                Craft Your Divine Art
              </h2>
            </div>
            <button
              onClick={onClose}
              className="ml-4 w-10 h-10 rounded-full flex items-center justify-center text-amber-600 dark:text-amber-400 hover:bg-amber-100/50 dark:hover:bg-amber-500/10 transition-all duration-300 hover:scale-110"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
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

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left side - Controls */}
            <div className="space-y-6">
              {/* Input Area - Sacred Style */}
              <div className="bg-white/60 dark:bg-white/[0.02] dark:backdrop-blur-max backdrop-blur-xl rounded-3xl p-6 md:p-8 border border-amber-100/50 dark:border-amber-500/12 shadow-lg dark:shadow-[0_0_30px_rgba(212,175,55,0.08)]">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2.5 bg-gradient-to-br from-amber-100/50 to-yellow-100/50 dark:from-amber-500/15 dark:to-amber-600/15 rounded-2xl border border-amber-200/30 dark:border-amber-500/12">
                    <Palette className="w-5 h-5 text-amber-600 dark:text-amber-400 drop-shadow-[0_0_6px_rgba(212,175,55,0.3)]" />
                  </div>
                  <h3 className="text-lg md:text-xl font-serif font-semibold text-gray-800 dark:text-zinc-200">Describe Your Background</h3>
                </div>

                <div className="space-y-5">
                  <div className="relative">
                    <textarea
                      placeholder="Describe the background scene you want (e.g., 'A peaceful mountain sunrise with golden clouds')"
                      value={prompt}
                      onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setPrompt(e.target.value)}
                      rows={4}
                      className="w-full px-5 py-4 text-base bg-stone-50/50 dark:bg-stone-900/30 border-2 border-amber-200/40 dark:border-amber-500/20 rounded-2xl focus:outline-none focus:border-amber-400/60 dark:focus:border-amber-400/40 text-gray-800 dark:text-zinc-200 placeholder-gray-500/70 dark:placeholder:text-zinc-500 transition-all duration-300 font-serif resize-none"
                    />
                  </div>

                  <div className="space-y-3">
                    <p className="text-xs font-serif uppercase tracking-wider text-amber-700/70 dark:text-amber-400/70">Quick suggestions:</p>
                    <div className="flex flex-wrap gap-2">
                      {promptSuggestions.map((suggestion, index) => (
                        <button
                          key={index}
                          onClick={() => setPrompt(suggestion)}
                          className="px-4 py-2 text-sm font-serif bg-amber-50/50 dark:bg-amber-950/30 border border-amber-200/40 dark:border-amber-500/15 text-amber-800 dark:text-amber-300 rounded-full hover:bg-amber-100/70 dark:hover:bg-amber-950/50 hover:border-amber-300/60 dark:hover:border-amber-400/30 transition-all duration-300"
                        >
                          {suggestion}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={generateImage}
                    disabled={isGenerating || !prompt.trim()}
                    className="group/btn relative w-full min-h-[52px] px-8 py-4 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 dark:from-amber-500 dark:to-amber-600 dark:hover:from-amber-400 dark:hover:to-amber-500 text-white font-serif font-bold rounded-2xl shadow-lg shadow-amber-600/20 dark:shadow-amber-500/25 transition-all duration-300 active:scale-95 flex items-center justify-center gap-2.5 overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span className="relative z-10 flex items-center gap-2.5">
                      {isGenerating ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Generating Divine Art...
                        </>
                      ) : (
                        <>
                          <Palette className="w-5 h-5" />
                          Create Divine Image
                        </>
                      )}
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-700 ease-in-out"></div>
                  </button>
                </div>
              </div>

              {/* Quote Display - Elegant Note Style */}
              <div className="relative bg-gradient-to-br from-stone-50/80 to-amber-50/40 dark:from-stone-900/40 dark:to-amber-950/20 backdrop-blur-xl rounded-3xl p-6 md:p-8 border border-amber-100/50 dark:border-amber-500/12 shadow-md dark:shadow-[0_0_20px_rgba(212,175,55,0.06)]">
                {/* Decorative corner elements */}
                <div className="absolute top-3 left-3 w-8 h-8 border-t-2 border-l-2 border-amber-300/40 dark:border-amber-500/20 rounded-tl-lg"></div>
                <div className="absolute top-3 right-3 w-8 h-8 border-t-2 border-r-2 border-amber-300/40 dark:border-amber-500/20 rounded-tr-lg"></div>
                <div className="absolute bottom-3 left-3 w-8 h-8 border-b-2 border-l-2 border-amber-300/40 dark:border-amber-500/20 rounded-bl-lg"></div>
                <div className="absolute bottom-3 right-3 w-8 h-8 border-b-2 border-r-2 border-amber-300/40 dark:border-amber-500/20 rounded-br-lg"></div>

                <div className="flex items-center justify-between mb-5">
                  <h4 className="text-sm font-serif uppercase tracking-widest text-amber-700/70 dark:text-amber-400/70">Your Sacred Quote</h4>
                  <button
                    onClick={toggleFavorite}
                    className="p-2 rounded-full hover:bg-amber-100/50 dark:hover:bg-amber-500/10 transition-colors"
                    aria-label={isFavorited ? "Remove from favorites" : "Add to favorites"}
                  >
                    {isFavorited ? (
                      <Heart className="w-5 h-5 text-red-500 fill-current" />
                    ) : (
                      <Heart className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                    )}
                  </button>
                </div>

                <blockquote
                  className="text-xl md:text-2xl font-serif font-light italic text-stone-800 dark:text-zinc-200 leading-relaxed mb-5 px-4"
                  style={{
                    letterSpacing: '0.15px'
                  }}
                >
                  "{quote.content}"
                </blockquote>

                <cite
                  className="block text-base md:text-lg font-serif text-amber-800 dark:text-amber-400 font-medium italic text-right"
                  style={{ letterSpacing: '0.4px' }}
                >
                  — {quote.reference}
                </cite>
              </div>
            </div>

            {/* Right side - Preview - Artistic Canvas Frame */}
            <div className="space-y-6">
              {generatedImageUrl && (
                <div className="bg-white/60 dark:bg-white/[0.02] dark:backdrop-blur-max backdrop-blur-xl rounded-3xl p-6 md:p-8 border border-amber-100/50 dark:border-amber-500/12 shadow-lg dark:shadow-[0_0_30px_rgba(212,175,55,0.08)]">
                  {/* Controls Header */}
                  <div className="flex items-center justify-between mb-8">
                    <h3 className="text-lg md:text-xl font-serif font-semibold text-gray-800 dark:text-zinc-200">
                      Your Divine Canvas
                    </h3>
                    <span className="text-xs font-serif uppercase tracking-wider text-amber-700/70 dark:text-amber-400/70">
                      {fontConfigs[selectedFont as keyof typeof fontConfigs].name}
                    </span>
                  </div>

                  {/* Elegant Style Controls - Redesigned with breathing room */}
                  <div className="mb-8 space-y-5">
                    {/* Color Swatches - Elegant circles */}
                    <div className="flex flex-wrap items-center justify-center gap-6 py-4 px-5 bg-stone-50/50 dark:bg-stone-900/30 rounded-2xl">
                      {/* Text Color */}
                      <div className="flex flex-col items-center gap-2">
                        <span className="text-xs font-serif uppercase tracking-wider text-amber-700/70 dark:text-amber-400/70">Text</span>
                        <div className="flex gap-2">
                          {["#ffd700", "#fff"].map((color) => (
                            <button
                              key={color}
                              onClick={() => setTextColor(color)}
                              className="relative w-9 h-9 rounded-full border-3 transition-all duration-300 hover:scale-110 flex items-center justify-center"
                              style={{
                                background: color,
                                borderColor: textColor === color ? '#d97706' : 'rgba(251, 191, 36, 0.25)',
                                boxShadow: textColor === color ? '0 0 16px rgba(217, 119, 6, 0.6)' : 'none',
                              }}
                              aria-label={`Text color ${color}`}
                            >
                              {textColor === color && (
                                <div className="w-2 h-2 bg-white rounded-full" style={{ filter: 'drop-shadow(0 0 4px rgba(0,0,0,0.5))' }}></div>
                              )}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Divider */}
                      <div className="hidden sm:block w-px h-10 bg-amber-300/30 dark:bg-amber-500/20"></div>

                      {/* Reference Color */}
                      <div className="flex flex-col items-center gap-2">
                        <span className="text-xs font-serif uppercase tracking-wider text-amber-700/70 dark:text-amber-400/70">Reference</span>
                        <div className="flex gap-2">
                          {["#ffd700", "#fff"].map((color) => (
                            <button
                              key={color}
                              onClick={() => setRefColor(color)}
                              className="relative w-9 h-9 rounded-full border-3 transition-all duration-300 hover:scale-110 flex items-center justify-center"
                              style={{
                                background: color,
                                borderColor: refColor === color ? '#d97706' : 'rgba(251, 191, 36, 0.25)',
                                boxShadow: refColor === color ? '0 0 16px rgba(217, 119, 6, 0.6)' : 'none',
                              }}
                              aria-label={`Reference color ${color}`}
                            >
                              {refColor === color && (
                                <div className="w-2 h-2 bg-white rounded-full" style={{ filter: 'drop-shadow(0 0 4px rgba(0,0,0,0.5))' }}></div>
                              )}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Divider */}
                      <div className="hidden sm:block w-px h-10 bg-amber-300/30 dark:bg-amber-500/20"></div>

                      {/* Theme Toggle */}
                      <div className="flex flex-col items-center gap-2">
                        <span className="text-xs font-serif uppercase tracking-wider text-amber-700/70 dark:text-amber-400/70">Theme</span>
                        <button
                          onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
                          className="w-12 h-9 rounded-xl bg-gradient-to-r from-stone-200 to-stone-300 dark:from-stone-700 dark:to-stone-600 text-stone-800 dark:text-stone-200 hover:from-stone-300 hover:to-stone-400 dark:hover:from-stone-600 dark:hover:to-stone-500 transition-all duration-300 border-2 border-stone-300/50 dark:border-stone-500/30 font-serif text-sm flex items-center justify-center"
                        >
                          {theme === 'light' ? '☀️' : '🌙'}
                        </button>
                      </div>

                      {/* Divider */}
                      <div className="hidden sm:block w-px h-10 bg-amber-300/30 dark:bg-amber-500/20"></div>

                      {/* Font Selector */}
                      <div className="flex flex-col items-center gap-2">
                        <span className="text-xs font-serif uppercase tracking-wider text-amber-700/70 dark:text-amber-400/70">Font</span>
                        <div className="flex gap-2">
                          <button
                            onClick={() => setSelectedFont("classic")}
                            className={`px-4 py-2 text-sm font-serif rounded-xl transition-all duration-300 ${
                              selectedFont === "classic"
                                ? "bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-md"
                                : "bg-white/60 dark:bg-white/[0.02] text-amber-800 dark:text-amber-300 hover:bg-amber-50 dark:hover:bg-amber-950/30 border border-amber-200/40 dark:border-amber-500/15"
                            }`}
                          >
                            Serif
                          </button>
                          <button
                            onClick={() => setSelectedFont("handwriting")}
                            className={`px-4 py-2 text-sm font-serif rounded-xl transition-all duration-300 ${
                              selectedFont === "handwriting"
                                ? "bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-md"
                                : "bg-white/60 dark:bg-white/[0.02] text-amber-800 dark:text-amber-300 hover:bg-amber-50 dark:hover:bg-amber-950/30 border border-amber-200/40 dark:border-amber-500/15"
                            }`}
                          >
                            Script
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Artistic Canvas Frame - Fixed 1:1 */}
                  <div className="flex flex-col items-center w-full mb-8">
                    <div className="relative mx-auto" style={{ width: '320px', height: '320px' }}>
                      {/* Outer Frame */}
                      <div className="absolute inset-0 bg-gradient-to-br from-stone-100/80 to-amber-50/60 dark:from-stone-800/60 dark:to-amber-950/40 rounded-3xl shadow-2xl dark:shadow-[0_0_40px_rgba(212,175,55,0.15)] border-4 border-amber-200/60 dark:border-amber-500/20"></div>
                      {/* Canvas container */}
                      <div className="relative z-10 m-[6px] rounded-2xl overflow-hidden bg-gradient-radial from-amber-100/30 via-transparent to-transparent dark:from-amber-500/10 dark:via-transparent dark:to-transparent">
                        <canvas
                          ref={previewCanvasRef}
                          width={1024}
                          height={1024}
                          className="w-full h-full object-contain"
                        />
                      </div>
                    </div>
                    {/* 1:1 Badge */}
                    <div className="mt-3 flex items-center justify-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-amber-400/60"></div>
                      <span className="text-xs font-serif text-amber-700/70 dark:text-amber-400/70">Square Format</span>
                      <div className="w-2 h-2 rounded-full bg-amber-400/60"></div>
                    </div>
                  </div>

                  {/* Action Buttons - Sacred Style */}
                  <div className="grid grid-cols-3 gap-3 mb-4">
                    <button
                      onClick={downloadImage}
                      disabled={isComposing || !fontsLoaded}
                      className="min-h-[52px] px-4 py-4 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 dark:from-amber-500 dark:to-amber-600 dark:hover:from-amber-400 dark:hover:to-amber-500 text-white font-serif font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 active:scale-95 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isComposing ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          <span className="text-sm">Processing...</span>
                        </>
                      ) : !fontsLoaded ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          <span className="text-sm">Loading...</span>
                        </>
                      ) : (
                        <>
                          <Download className="w-5 h-5" />
                          <span className="text-sm font-serif">Download</span>
                        </>
                      )}
                    </button>
                    <button
                      onClick={copyToClipboard}
                      disabled={isComposing || !fontsLoaded}
                      className="min-h-[52px] px-4 py-4 bg-white/60 dark:bg-white/[0.02] dark:backdrop-blur-max border border-amber-200/50 dark:border-amber-500/12 text-amber-800 dark:text-amber-400 font-serif font-semibold rounded-2xl hover:bg-amber-50 dark:hover:bg-white/[0.03] transition-all duration-300 active:scale-95 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow-md"
                    >
                      {copied ? (
                        <>
                          <Check className="w-5 h-5 text-green-600" />
                          <span className="text-sm font-serif">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-5 h-5" />
                          <span className="text-sm font-serif">Copy</span>
                        </>
                      )}
                    </button>
                    <button
                      onClick={shareImage}
                      disabled={isComposing || !fontsLoaded}
                      className="min-h-[52px] px-4 py-4 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 dark:from-amber-500 dark:to-amber-600 dark:hover:from-amber-400 dark:hover:to-amber-500 text-white font-serif font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 active:scale-95 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isComposing ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          <span className="text-sm">Sharing...</span>
                        </>
                      ) : (
                        <>
                          <Share2 className="w-5 h-5" />
                          <span className="text-sm font-serif">Share</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Tip - Elegant Style */}
                  <div className="text-center p-4 bg-amber-50/50 dark:bg-amber-950/20 rounded-2xl border border-amber-200/30 dark:border-amber-500/10">
                    <p className="text-xs font-serif text-amber-800/70 dark:text-amber-300/70 leading-relaxed">
                      ✨ Share button uses native sharing to send the image file directly to your favorite apps
                    </p>
                  </div>
                </div>
              )}

              {!generatedImageUrl && (
                <div className="bg-stone-100/80 dark:bg-stone-900/40 backdrop-blur-xl rounded-3xl p-10 md:p-14 border-4 border-amber-200/60 dark:border-amber-500/20 shadow-inner dark:shadow-[0_0_30px_rgba(212,175,55,0.08)]">
                  <div className="flex flex-col items-center justify-center text-center">
                    <div className="relative mb-8">
                      <div className="absolute inset-0 bg-amber-400/15 dark:bg-amber-500/20 rounded-full blur-3xl"></div>
                      <Palette className="relative w-20 h-20 text-amber-400/60 dark:text-amber-500/50" />
                    </div>
                    <p className="text-2xl md:text-3xl font-serif text-stone-700 dark:text-zinc-300 mb-4">Your Canvas Awaits</p>
                    <p className="text-lg font-serif text-stone-500 dark:text-zinc-500 mb-3">Describe your sacred vision and let divine art emerge</p>
                    <p className="text-sm font-serif text-amber-600/70 dark:text-amber-400/60 mt-6">FLUX-1 Schnell • Perfect 1:1 Square Format</p>
                    {fontsLoaded && (
                      <p className="text-sm font-serif text-green-600/80 dark:text-green-400/70 mt-3 flex items-center gap-2">
                        <span className="inline-block w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                        Fonts loaded and ready
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Custom scrollbar styles */}
        <style jsx>{`
          .custom-scrollbar::-webkit-scrollbar {
            width: 4px;
          }
          .custom-scrollbar::-webkit-scrollbar-track {
            background: transparent;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background: rgba(251, 191, 36, 0.25);
            border-radius: 2px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background: rgba(251, 191, 36, 0.4);
          }
          .custom-scrollbar {
            scrollbar-width: thin;
            scrollbar-color: rgba(251, 191, 36, 0.25) transparent;
          }
        `}</style>
      </div>
    </div>
  )
}

// Add default export for Next.js dynamic imports
export default ImageGenerator