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
  const [showShareMenu, setShowShareMenu] = useState(false)
  const [fontsLoaded, setFontsLoaded] = useState(false)
  const canvasRef = useRef<HTMLDivElement>(null)

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

  // Load fonts for canvas rendering
  useEffect(() => {
    const loadFonts = async () => {
      try {
        // Load Google Fonts for canvas use
        const playfairFont = new FontFace(
          "Playfair Display",
          "url(https://fonts.gstatic.com/s/playfairdisplay/v30/nuFvD-vYSZviVYUb_rj3ij__anPXJzDwcbmjWBN2PKdFvXDXbtXK-F2qO0isEw.woff2)",
        )

        const interFont = new FontFace(
          "Inter",
          "url(https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiJ-Ek-_EeA.woff2)",
        )

        await playfairFont.load()
        await interFont.load()

        document.fonts.add(playfairFont)
        document.fonts.add(interFont)

        console.log("✅ 字体加载成功")
        setFontsLoaded(true)
      } catch (error) {
        console.warn("⚠️ 字体加载失败，使用系统字体:", error)
        setFontsLoaded(true) // Still proceed with system fonts
      }
    }

    loadFonts()
  }, [])

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

  const downloadImage = async () => {
    if (!generatedImageUrl || !fontsLoaded) return

    setIsComposing(true)
    setError(null)

    try {
      console.log("📥 开始下载处理...")

      // 直接使用API返回的1024x1024图片
      const response = await fetch(generatedImageUrl, { mode: "cors" })
      const blob = await response.blob()
      const bitmap = await createImageBitmap(blob)

      console.log("🖼️ 图片实际尺寸:", bitmap.width, "x", bitmap.height)

      // 创建1024x1024画布
      const canvas = document.createElement("canvas")
      canvas.width = 1024
      canvas.height = 1024
      const ctx = canvas.getContext("2d")!

      // 绘制背景图片 - 强制填充整个1024x1024区域
      ctx.drawImage(bitmap, 0, 0, 1024, 1024)

      // 添加渐变遮罩
      const gradient = ctx.createLinearGradient(0, 0, 0, 1024)
      gradient.addColorStop(0, "rgba(0,0,0,0.3)")
      gradient.addColorStop(0.5, "rgba(0,0,0,0.1)")
      gradient.addColorStop(1, "rgba(0,0,0,0.4)")
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, 1024, 1024)

      // 添加文字 - 使用加载的字体，字体大小翻倍
      ctx.fillStyle = "white"
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"

      // 引用文字 - 字体大小减小1/3，更合理的尺寸
      const fontSize =
        quote.content.length < 60
          ? 85 // 从128减到85 (约2/3)
          : quote.content.length < 100
            ? 70 // 从104减到70
            : quote.content.length < 150
              ? 56 // 从84减到56
              : quote.content.length < 200
                ? 48 // 从72减到48
                : 42 // 从64减到42

      // 尝试使用加载的字体，如果失败则使用系统字体
      const serifFonts = ['"Playfair Display"', "Georgia", '"Times New Roman"', "serif"].join(", ")

      ctx.font = `${fontSize}px ${serifFonts}`
      ctx.shadowColor = "rgba(0,0,0,0.9)"
      ctx.shadowBlur = 12
      ctx.shadowOffsetX = 3
      ctx.shadowOffsetY = 3

      console.log("🎨 使用超大字体:", ctx.font)

      // 文字换行
      const words = quote.content.split(" ")
      const lines: string[] = []
      let currentLine = ""
      const maxWidth = 900

      for (const word of words) {
        const testLine = currentLine + (currentLine ? " " : "") + word
        const metrics = ctx.measureText(testLine)
        if (metrics.width > maxWidth && currentLine) {
          lines.push(currentLine)
          currentLine = word
        } else {
          currentLine = testLine
        }
      }
      if (currentLine) lines.push(currentLine)

      // 绘制引用文字 - 修复引号问题
      const lineHeight = fontSize * 1.2
      const startY = 512 - (lines.length * lineHeight) / 2
      lines.forEach((line, index) => {
        // 只在第一行开头加引号，最后一行结尾加引号
        let displayLine = line
        if (index === 0) {
          displayLine = `"${line}`
        }
        if (index === lines.length - 1) {
          displayLine = lines.length === 1 ? `"${line}"` : `${line}"`
        }
        ctx.fillText(displayLine, 512, startY + index * lineHeight)
      })

      // 经文引用 - 字体也减小1/3
      const refFontSize = Math.max(32, fontSize * 0.6)
      const sansFonts = ["Inter", "Helvetica", "Arial", "sans-serif"].join(", ")

      ctx.font = `${refFontSize}px ${sansFonts}`
      ctx.fillText(`— ${quote.reference}`, 512, startY + lines.length * lineHeight + 60)

      // 下载
      const link = document.createElement("a")
      link.download = `bible-quote-${quote.reference.replace(/\s+/g, "-").toLowerCase()}.png`
      link.href = canvas.toDataURL("image/png", 1.0)
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      console.log("✅ 下载完成: 1024x1024 PNG with HUGE fonts")
    } catch (error) {
      console.error("❌ 下载失败:", error)
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
      // 使用相同的逻辑创建图片
      const response = await fetch(generatedImageUrl, { mode: "cors" })
      const blob = await response.blob()
      const bitmap = await createImageBitmap(blob)

      const canvas = document.createElement("canvas")
      canvas.width = 1024
      canvas.height = 1024
      const ctx = canvas.getContext("2d")!

      // 绘制背景
      ctx.drawImage(bitmap, 0, 0, 1024, 1024)

      // 添加渐变
      const gradient = ctx.createLinearGradient(0, 0, 0, 1024)
      gradient.addColorStop(0, "rgba(0,0,0,0.3)")
      gradient.addColorStop(0.5, "rgba(0,0,0,0.1)")
      gradient.addColorStop(1, "rgba(0,0,0,0.4)")
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, 1024, 1024)

      // 添加文字 - 使用超大字体
      ctx.fillStyle = "white"
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"

      const fontSize = quote.content.length < 80 ? 75 : quote.content.length < 120 ? 61 : 51

      ctx.font = `${fontSize}px "Playfair Display", Georgia, serif`
      ctx.shadowColor = "rgba(0,0,0,0.9)"
      ctx.shadowBlur = 12

      // 简化的文字换行
      const words = quote.content.split(" ")
      const lines: string[] = []
      let currentLine = ""
      const maxWidth = 900

      for (const word of words) {
        const testLine = currentLine + (currentLine ? " " : "") + word
        const metrics = ctx.measureText(testLine)
        if (metrics.width > maxWidth && currentLine) {
          lines.push(currentLine)
          currentLine = word
        } else {
          currentLine = testLine
        }
      }
      if (currentLine) lines.push(currentLine)

      // 绘制文字 - 修复引号
      const lineHeight = fontSize * 1.2
      const startY = 512 - (lines.length * lineHeight) / 2
      lines.forEach((line, index) => {
        let displayLine = line
        if (index === 0) {
          displayLine = `"${line}`
        }
        if (index === lines.length - 1) {
          displayLine = lines.length === 1 ? `"${line}"` : `${line}"`
        }
        ctx.fillText(displayLine, 512, startY + index * lineHeight)
      })

      ctx.font = `${Math.max(24, fontSize * 0.6)}px Inter, Helvetica, sans-serif`
      ctx.fillText(`— ${quote.reference}`, 512, startY + lines.length * lineHeight + 60)

      // 复制到剪贴板
      const finalBlob = await new Promise<Blob | null>((resolve) => canvas.toBlob((b) => resolve(b), "image/png", 1.0))
      if (!finalBlob) throw new Error("Could not create image blob")

      const item = new ClipboardItem({ "image/png": finalBlob })
      await navigator.clipboard.write([item])

      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.warn("复制失败:", error)
      setError("Could not copy to clipboard. Please try the Download button instead.")
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

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Create Beautiful Image</h2>
            <Button variant="ghost" onClick={onClose}>
              ✕
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
                    <span>Your Quote</span>
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
                  <blockquote className="text-lg text-gray-800 italic mb-2">{quote.content}</blockquote>
                  <cite className="text-blue-600 font-semibold">— {quote.reference}</cite>
                </CardContent>
              </Card>
            </div>

            {/* Right side - Preview */}
            <div className="space-y-6">
              {generatedImageUrl && (
                <Card>
                  <CardHeader>
                    <CardTitle>Preview (HUGE Fonts Ready!)</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div
                      ref={canvasRef}
                      className="relative w-full aspect-square rounded-lg overflow-hidden mx-auto bg-gray-900"
                      style={{ maxWidth: "512px" }}
                    >
                      {/* 背景图片 - 强制填充整个容器 */}
                      <img
                        src={generatedImageUrl || "/placeholder.svg"}
                        alt="Generated background"
                        className="absolute inset-0 w-full h-full"
                        style={{
                          objectFit: "cover",
                          objectPosition: "center",
                          zIndex: 1,
                        }}
                        onLoad={() => console.log("✅ 图片加载完成")}
                        onError={() => console.error("❌ 图片加载失败")}
                      />

                      {/* 渐变遮罩 */}
                      <div
                        className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-black/40"
                        style={{ zIndex: 2 }}
                      />

                      {/* 文字层 */}
                      <div
                        className="absolute inset-0 flex flex-col justify-center items-center p-8 text-center"
                        style={{ zIndex: 3 }}
                      >
                        <blockquote
                          className={`text-white font-serif leading-relaxed mb-4 drop-shadow-2xl ${getTextSize(quote.content)}`}
                          style={{
                            textShadow: "2px 2px 4px rgba(0,0,0,0.9), 0 0 8px rgba(0,0,0,0.5)",
                            fontFamily: "'Playfair Display', 'Georgia', serif",
                            fontWeight: "400",
                            letterSpacing: "0.3px",
                            lineHeight: "1.3",
                            maxWidth: "90%",
                          }}
                        >
                          {quote.content}
                        </blockquote>
                        <cite
                          className={`text-white/95 font-semibold drop-shadow-lg ${getReferenceSize(quote.content)}`}
                          style={{
                            textShadow: "1px 1px 3px rgba(0,0,0,0.9)",
                            fontFamily: "'Inter', 'Helvetica', sans-serif",
                            letterSpacing: "0.8px",
                          }}
                        >
                          — {quote.reference}
                        </cite>
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
                            Copied!
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
                    {fontsLoaded && <p className="text-green-600 text-xs mt-1">✅ HUGE fonts loaded and ready!</p>}
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
