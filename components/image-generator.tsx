"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Loader2,
  Palette,
  Download,
  Share2,
  Heart,
  HeartOff,
  AlertCircle,
  Copy,
  Check,
  Facebook,
  Twitter,
  Instagram,
} from "lucide-react"
import QRCode from 'qrcode'

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
}: DrawQuoteImageParams) {
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
  let startYOffset: number;
  if (aspectRatio < 0.7) { // 9:16竖图
    fontSize = Math.max(width, height) * 0.052;
    startYOffset = 0.16; // 居中略偏上
  } else if (aspectRatio < 1.1) { // 1:1
    fontSize = Math.max(width, height) * 0.06;
    startYOffset = 0.20;
  } else { // 16:9横图
    fontSize = Math.max(width, height) * 0.058;
    startYOffset = 0.22;
  }

  let serifFonts = fontConfigs[selectedFont as keyof typeof fontConfigs].serif.join(", ");
  let currentFont = fontConfigs[selectedFont as keyof typeof fontConfigs];
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
  ctx.fillStyle = theme === 'dark' ? "#fff" : "#222";
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
  ctx.fillStyle = theme === 'dark' ? '#7ecbff' : '#2563eb';
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
  const [showShareMenu, setShowShareMenu] = useState(false)
  const [fontsLoaded, setFontsLoaded] = useState(false)
  const [selectedFont, setSelectedFont] = useState("classic")
  const canvasRef = useRef<HTMLDivElement>(null)
  const previewCanvasRef = useRef<HTMLCanvasElement>(null)
  const [previewBgImg, setPreviewBgImg] = useState<HTMLImageElement | null>(null)
  // 在组件顶部state中添加分辨率
  const [resolution, setResolution] = useState<{label: string, width: number, height: number}>(
    { label: '1:1 (1024x1024)', width: 1024, height: 1024 }
  )
  const resolutions = [
    { label: '1:1 (1024x1024)', width: 1024, height: 1024 },
    { label: '9:16 (1080x1920)', width: 1080, height: 1920 },
    { label: '16:9 (1200x675)', width: 1200, height: 675 },
  ]
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const promptSuggestions = [
    "A beautiful white dove flying in a golden sky",
    "Peaceful ocean waves at sunset with divine light",
    "A serene forest path with heavenly sunbeams",
    "Starry night sky over Jerusalem with soft moonlight",
    "Gentle waterfall in the Garden of Eden",
    "Soft clouds parting to reveal divine light",
    "A field of white lilies with golden hour lighting",
    "Ancient olive trees in holy land with warm light",
    "Mountain peak with cross silhouette at sunrise",
    "Calm lake reflecting heavenly clouds",
    "Desert landscape with divine light rays",
    "Peaceful shepherd scene with rolling hills",
  ]

  // Font configurations optimized for religious content
  const fontConfigs = {
    classic: {
      serif: ['"EB Garamond"', '"Crimson Text"', '"Merriweather"', '"Lora"', '"Georgia"', '"Times New Roman"', 'serif'],
      sans: ['"Open Sans"', '"Roboto"', '"Segoe UI"', '"Helvetica"', 'sans-serif'],
      name: "Classic"
    },
    handwriting: {
      serif: ['"Caveat"', 'cursive', 'serif'],
      sans: ['"Open Sans"', '"Segoe UI"', 'sans-serif'],
      name: "Handwriting"
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
    })
  }, [previewBgImg, quote, fontConfigs, selectedFont, resolution, theme])

  const getTextSize = (text: string) => {
    const length = text.length
    if (length < 50) return "text-2xl"
    if (length < 100) return "text-xl"
    if (length < 150) return "text-lg"
    return "text-base"
  }

  const getReferenceSize = (text: string) => {
    const length = text.length
    if (length < 50) return "text-lg"
    if (length < 100) return "text-base"
    return "text-sm"
  }

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

  const shareToFacebook = async () => {
    const shareText = `${quote.content} - ${quote.reference}`
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}&quote=${encodeURIComponent(shareText)}`
    window.open(facebookUrl, "_blank", "width=600,height=400")
    setShowShareMenu(false)
  }

  const shareToTwitter = async () => {
    const shareText = `${quote.content} - ${quote.reference} #BibleVerse #Faith #Inspiration`
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(window.location.href)}`
    window.open(twitterUrl, "_blank", "width=600,height=400")
    setShowShareMenu(false)
  }

  const shareToInstagram = () => {
    alert(
      "To share on Instagram:\n1. Download the image using the Download button\n2. Open Instagram app\n3. Create a new post\n4. Select the downloaded image\n5. Add your caption with the quote text",
    )
    setShowShareMenu(false)
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

  // 预览区canvas容器宽度动态计算
  const maxCanvasWidth = 480; // px，对应16:9的1200px
  const maxResolutionWidth = 1200; // 16:9的宽度
  const scale = resolution.width / maxResolutionWidth;
  const canvasDisplayWidth = maxCanvasWidth * scale;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div className="flex-1 flex justify-center items-center">
              <h2
                className="text-4xl font-extrabold text-center"
                style={{
                  fontFamily: "'EB Garamond', 'Playfair Display', 'Georgia', serif",
                  color: '#2d3143',
                  textShadow: '0 2px 8px #e6eaf3',
                  letterSpacing: '0.14em',
                  lineHeight: 1.1
                }}
              >
                Create Beautiful Image
              </h2>
            </div>
            <Button
              variant="ghost"
              onClick={onClose}
              className="ml-2 w-11 h-11 rounded-full flex items-center justify-center text-2xl font-extrabold
                bg-gradient-to-br from-[#3a4668]/90 to-[#6b7a99]/90 shadow-lg border-0
                text-white hover:scale-110 hover:shadow-2xl transition-all duration-150
                ring-2 ring-[#bfc8e6]/60 hover:ring-[#6b7a99]/80"
              aria-label="Close"
              style={{
                boxShadow: '0 2px 12px #bfc8e6, 0 4px 24px rgba(58,70,104,0.18)'
              }}
            >
              <span style={{
                textShadow: '0 2px 8px #bfc8e6, 0 1px 0 #fff',
                fontWeight: 900
              }}>×</span>
            </Button>
          </div>

          {error && (
            <Alert className="mb-6 border-red-200 bg-red-50">
              <AlertCircle className="h-4 w-4 text-red-600" />
              <AlertDescription className="text-red-800">{error}</AlertDescription>
            </Alert>
          )}

          {!fontsLoaded && (
            <Alert className="mb-6 border-blue-200 bg-blue-50">
              <Loader2 className="h-4 w-4 text-blue-600 animate-spin" />
              <AlertDescription className="text-blue-800">Loading beautiful fonts for download...</AlertDescription>
            </Alert>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left side - Controls */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Palette className="w-5 h-5" />
                    Describe Your Background
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Textarea
                    placeholder="Describe the background scene you want (e.g., 'A peaceful mountain sunrise with golden clouds')"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    rows={3}
                  />

                  <div className="space-y-2">
                    <p className="text-sm text-gray-600">Quick suggestions:</p>
                    <div className="flex flex-wrap gap-2">
                      {promptSuggestions.map((suggestion, index) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                          onClick={() => setPrompt(suggestion)}
                        >
                          {suggestion}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <Button
                    onClick={generateImage}
                    disabled={isGenerating || !prompt.trim()}
                    className="w-full"
                    size="lg"
                  >
                    {isGenerating ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Generating 1024x1024...
                      </>
                    ) : (
                      <>
                        <Palette className="w-4 h-4 mr-2" />
                        Generate Background
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>

              {/* Quote Display */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span style={{
                      fontFamily: `'${fontConfigs[selectedFont as keyof typeof fontConfigs].serif[0].replace(/"/g, '')}', 'Georgia', 'Times New Roman', serif`,
                      fontWeight: "600",
                      letterSpacing: "0.3px"
                    }}>
                      Your Quote
                    </span>
                    <Button variant="ghost" size="sm" onClick={toggleFavorite}>
                      {isFavorited ? (
                        <Heart className="w-4 h-4 text-red-500 fill-current" />
                      ) : (
                        <HeartOff className="w-4 h-4" />
                      )}
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <blockquote 
                    className="text-lg text-gray-800 italic mb-2"
                    style={{
                      fontFamily: `'${fontConfigs[selectedFont as keyof typeof fontConfigs].serif[0].replace(/"/g, '')}', 'Georgia', 'Times New Roman', serif`,
                      lineHeight: "1.5",
                      letterSpacing: "0.2px"
                    }}
                  >
                    {quote.content}
                  </blockquote>
                  <cite 
                    className="text-blue-600 font-semibold"
                    style={{
                      fontFamily: `${fontConfigs[selectedFont as keyof typeof fontConfigs].serif[0].replace(/"/g, '')}, serif`,
                      letterSpacing: "0.5px"
                    }}
                  >
                    — {quote.reference}
                  </cite>
                </CardContent>
              </Card>
            </div>

            {/* Right side - Preview */}
            <div className="space-y-6">
              {generatedImageUrl && (
                <Card>
                  <CardHeader>
                    <CardTitle>Preview - {fontConfigs[selectedFont as keyof typeof fontConfigs].name} Font</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {/* 分辨率选择器放在预览区顶部 */}
                    <div className="mb-6 flex gap-2 items-center justify-center">
                      <span className="text-sm text-gray-700">Resolution:</span>
                      {resolutions.map((r) => (
                        <Button
                          key={r.label}
                          size="sm"
                          variant={resolution.label === r.label ? "default" : "outline"}
                          onClick={() => setResolution(r)}
                          className="text-xs px-2"
                        >
                          {r.label}
                        </Button>
                      ))}
                      <Button
                        variant={theme === 'light' ? 'outline' : 'default'}
                        size="sm"
                        onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
                        className="ml-2"
                      >
                        {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
                      </Button>
                    </div>
                    <div className="flex flex-col items-center w-full">
                      <div
                        style={{
                          width: `${canvasDisplayWidth}px`,
                          aspectRatio: `${resolution.width} / ${resolution.height}`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          background: '#f8fafc',
                          borderRadius: 16,
                          boxShadow: '0 4px 24px 0 rgba(0,0,0,0.08)',
                          padding: 12,
                          position: 'relative',
                        }}
                      >
                        <canvas
                          ref={previewCanvasRef}
                          width={resolution.width}
                          height={resolution.height}
                          style={
                            resolution.label === '9:16 (1080x1920)'
                              ? { width: '100%', height: 'auto', display: 'block', borderRadius: 12, background: '#222', margin: '0 auto' }
                              : { width: '100%', height: '100%', display: 'block', borderRadius: 12, background: '#222' }
                          }
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-2 mt-4">
                      <Button onClick={downloadImage} disabled={isComposing || !fontsLoaded} className="flex-1">
                        {isComposing ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Processing...
                          </>
                        ) : !fontsLoaded ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Loading Fonts...
                          </>
                        ) : (
                          <>
                            <Download className="w-4 h-4 mr-2" />
                            Download
                          </>
                        )}
                      </Button>
                      <Button
                        onClick={copyToClipboard}
                        disabled={isComposing || !fontsLoaded}
                        variant="outline"
                        className="flex-1 bg-transparent"
                      >
                        {copied ? (
                          <>
                            <Check className="w-4 h-4 mr-2" />
                            Done!
                          </>
                        ) : (
                          <>
                            <Copy className="w-4 h-4 mr-2" />
                            Copy
                          </>
                        )}
                      </Button>
                      <div className="relative">
                        <Button
                          onClick={() => setShowShareMenu(!showShareMenu)}
                          disabled={isComposing || !fontsLoaded}
                          variant="outline"
                          className="w-full bg-transparent"
                        >
                          <Share2 className="w-4 h-4 mr-2" />
                          Share
                        </Button>

                        {showShareMenu && (
                          <div className="absolute bottom-full mb-2 right-0 bg-white border border-gray-200 rounded-lg shadow-lg p-2 min-w-[160px] z-10">
                            <Button
                              onClick={shareToFacebook}
                              variant="ghost"
                              size="sm"
                              className="w-full justify-start text-blue-600 hover:bg-blue-50"
                            >
                              <Facebook className="w-4 h-4 mr-2" />
                              Facebook
                            </Button>
                            <Button
                              onClick={shareToTwitter}
                              variant="ghost"
                              size="sm"
                              className="w-full justify-start text-sky-500 hover:bg-sky-50"
                            >
                              <Twitter className="w-4 h-4 mr-2" />
                              Twitter
                            </Button>
                            <Button
                              onClick={shareToInstagram}
                              variant="ghost"
                              size="sm"
                              className="w-full justify-start text-pink-500 hover:bg-pink-50"
                            >
                              <Instagram className="w-4 h-4 mr-2" />
                              Instagram
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Copy Tip */}
                    <div className="mt-3 text-xs text-gray-500 text-center">
                      💡 Tip: Click on the page first for clipboard access, or use Download for direct save
                    </div>

                    {/* Font Selector */}
                    <div className="mt-6 pt-4 border-t border-gray-200">
                      <label className="text-sm font-medium text-gray-700 mb-3 block">Choose Font Style</label>
                      <div className="grid grid-cols-2 gap-2">
                        <Button
                          variant={selectedFont === "classic" ? "default" : "outline"}
                          size="sm"
                          onClick={() => setSelectedFont("classic")}
                          className="text-xs"
                        >
                          Classic
                        </Button>
                        <Button
                          variant={selectedFont === "handwriting" ? "default" : "outline"}
                          size="sm"
                          onClick={() => setSelectedFont("handwriting")}
                          className="text-xs"
                        >
                          Handwriting
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {!generatedImageUrl && (
                <Card className="border-dashed border-2 border-gray-300">
                  <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                    <Palette className="w-12 h-12 text-gray-400 mb-4" />
                    <p className="text-gray-500 text-lg">Your generated image will appear here</p>
                    <p className="text-gray-400 text-sm">Describe your background and click generate</p>
                    <p className="text-gray-400 text-xs mt-2">FLUX-1 Schnell - Perfect 1024x1024</p>
                    {fontsLoaded && <p className="text-green-600 text-xs mt-1">✅ Fonts loaded and ready!</p>}
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}