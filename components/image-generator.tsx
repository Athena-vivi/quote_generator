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

// 抽象出绘制函数
function drawQuoteImage({
  ctx,
  backgroundImg,
  quote,
  fontConfigs,
  selectedFont,
  width = 1024,
  height = 1024,
}: {
  ctx: CanvasRenderingContext2D,
  backgroundImg: HTMLImageElement | null,
  quote: { content: string; reference: string },
  fontConfigs: any,
  selectedFont: string,
  width?: number,
  height?: number,
}) {
  // 背景
  ctx.clearRect(0, 0, width, height)
  if (backgroundImg) {
    ctx.drawImage(backgroundImg, 0, 0, width, height)
  } else {
    ctx.fillStyle = "#222"
    ctx.fillRect(0, 0, width, height)
  }
  // 渐变
  const gradient = ctx.createLinearGradient(0, 0, 0, height)
  gradient.addColorStop(0, "rgba(0,0,0,0.3)")
  gradient.addColorStop(0.5, "rgba(0,0,0,0.1)")
  gradient.addColorStop(1, "rgba(0,0,0,0.4)")
  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, width, height)

  // 字体参数
  const fontSize =
    quote.content.length < 60
      ? 110
      : quote.content.length < 100
        ? 95
        : quote.content.length < 150
          ? 80
          : quote.content.length < 200
            ? 70
            : 60
  const currentFont = fontConfigs[selectedFont as keyof typeof fontConfigs]
  const serifFonts = currentFont.serif.join(", ")
  ctx.fillStyle = "white"
  ctx.textAlign = "center"
  ctx.textBaseline = "middle"
  ctx.font = `${fontSize}px ${serifFonts}`
  ctx.shadowColor = "rgba(0,0,0,0.9)"
  ctx.shadowBlur = 12
  ctx.shadowOffsetX = 3
  ctx.shadowOffsetY = 3

  // 分行
  const words = quote.content.split(" ")
  const lines: string[] = []
  let currentLine = ""
  const maxWidth = 750
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

  // 智能行高和边界
  const lineHeight = fontSize * 1.2
  const totalTextHeight = lines.length * lineHeight
  const refFontSize = Math.max(45, fontSize * 0.65)
  const refHeight = refFontSize * 1.2
  const spacing = Math.max(80, fontSize * 0.8) // 增加间距，至少80像素，或字体大小的80%
  const totalHeight = totalTextHeight + refHeight + spacing
  const maxStartY = 150
  const minEndY = height - 150
  const availableHeight = minEndY - maxStartY
  let startY
  if (totalHeight <= availableHeight) {
    startY = height / 2 - totalHeight / 2
  } else {
    startY = maxStartY
  }
  lines.forEach((line, index) => {
    let displayLine = line
    if (index === 0) displayLine = `"${line}`
    if (index === lines.length - 1) displayLine = lines.length === 1 ? `"${line}"` : `${line}"`
    ctx.fillText(displayLine, width / 2, startY + index * lineHeight)
  })
  // 引用
  ctx.font = `${refFontSize}px ${serifFonts}`
  // 右下角定位
  ctx.textAlign = "right"
  ctx.textBaseline = "bottom"
  const refPaddingRight = 48 // 右侧内边距
  const refPaddingBottom = 48 // 底部内边距
  ctx.fillText(`— ${quote.reference}`, width - refPaddingRight, height - refPaddingBottom)
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
      width: 1024,
      height: 1024,
    })
  }, [previewBgImg, quote, fontConfigs, selectedFont])

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

      // 字体大小优化 - 确保社交媒体分享时清晰可读
      const fontSize =
        quote.content.length < 60
          ? 110 // 增加25px，确保短经文清晰
          : quote.content.length < 100
            ? 95 // 增加25px，中等经文更清晰
            : quote.content.length < 150
              ? 80 // 增加24px，长经文保持可读
              : quote.content.length < 200
                ? 70 // 增加22px，很长经文也要清晰
                : 60 // 增加18px，超长经文最小也要60px

      // 使用选择的字体配置
      const currentFont = fontConfigs[selectedFont as keyof typeof fontConfigs]
      const serifFonts = currentFont.serif.join(", ")

      console.log("🎨 下载使用字体:", selectedFont, serifFonts)
      ctx.font = `${fontSize}px ${serifFonts}`
      ctx.shadowColor = "rgba(0,0,0,0.9)"
      ctx.shadowBlur = 12
      ctx.shadowOffsetX = 3
      ctx.shadowOffsetY = 3

      console.log("🎨 使用超大字体:", ctx.font)

      // 优化的文字换行 - 更好的留白和间距
      const words = quote.content.split(" ")
      const lines: string[] = []
      let currentLine = ""
      const maxWidth = 750 // 减少最大宽度，增加留白

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

      // 智能的行高和位置计算 - 确保文字在图片范围内
      const lineHeight = fontSize * 1.2 // 稍微减少行高
      const totalTextHeight = lines.length * lineHeight
      const refFontSize = Math.max(45, fontSize * 0.65)
      const refHeight = refFontSize * 1.2
      const spacing = Math.max(80, fontSize * 0.8) // 增加间距，至少80像素，或字体大小的80%
      const totalHeight = totalTextHeight + refHeight + spacing // 总高度包括引用和间距
      
      // 确保文字在图片范围内
      const maxStartY = 150 // 距离顶部最小距离
      const minEndY = 874 // 距离底部最小距离 (1024 - 150)
      const availableHeight = minEndY - maxStartY
      
      let startY
      if (totalHeight <= availableHeight) {
        // 如果总高度在可用范围内，居中显示
        startY = 512 - totalHeight / 2
      } else {
        // 如果超出范围，从顶部开始，但确保引用不超出底部
        startY = maxStartY
      }
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

      // 经文引用 - 优化位置和间距
      ctx.font = `${refFontSize}px ${serifFonts}`
      // 右下角定位
      ctx.textAlign = "right"
      ctx.textBaseline = "bottom"
      const refPaddingRight = 48 // 右侧内边距
      const refPaddingBottom = 48 // 底部内边距
      ctx.fillText(`— ${quote.reference}`, 1024 - refPaddingRight, 1024 - refPaddingBottom)

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

      // 复制功能也使用相同的优化字体大小
      const fontSize = 
        quote.content.length < 60
          ? 110
          : quote.content.length < 100
            ? 95
            : quote.content.length < 150
              ? 80
              : quote.content.length < 200
                ? 70
                : 60

      const currentFont = fontConfigs[selectedFont as keyof typeof fontConfigs]
      console.log("🎨 复制使用字体:", selectedFont, currentFont.serif.join(", "))
      ctx.font = `${fontSize}px ${currentFont.serif.join(", ")}`
      ctx.shadowColor = "rgba(0,0,0,0.9)"
      ctx.shadowBlur = 12

      // 优化的文字换行 - 与下载功能保持一致
      const words = quote.content.split(" ")
      const lines: string[] = []
      let currentLine = ""
      const maxWidth = 750 // 减少最大宽度，增加留白

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

      // 智能的行高和位置计算 - 确保文字在图片范围内
      const lineHeight = fontSize * 1.2 // 稍微减少行高
      const totalTextHeight = lines.length * lineHeight
      const refFontSize = Math.max(45, fontSize * 0.65)
      const refHeight = refFontSize * 1.2
      const spacing = Math.max(80, fontSize * 0.8) // 增加间距，至少80像素，或字体大小的80%
      const totalHeight = totalTextHeight + refHeight + spacing // 总高度包括引用和间距
      
      // 确保文字在图片范围内
      const maxStartY = 150 // 距离顶部最小距离
      const minEndY = 874 // 距离底部最小距离 (1024 - 150)
      const availableHeight = minEndY - maxStartY
      
      let startY
      if (totalHeight <= availableHeight) {
        // 如果总高度在可用范围内，居中显示
        startY = 512 - totalHeight / 2
      } else {
        // 如果超出范围，从顶部开始，但确保引用不超出底部
        startY = maxStartY
      }
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

      // 复制功能的引用字体也优化
      const currentFontForCopy = fontConfigs[selectedFont as keyof typeof fontConfigs]
      const serifFontsForCopy = currentFontForCopy.serif.join(", ")
      ctx.font = `${Math.max(45, fontSize * 0.65)}px ${serifFontsForCopy}`
      ctx.textAlign = "right"
      ctx.textBaseline = "bottom"
      const refPaddingRight = 48 // 右侧内边距
      const refPaddingBottom = 48 // 底部内边距
      ctx.fillText(`— ${quote.reference}`, 1024 - refPaddingRight, 1024 - refPaddingBottom)

      // 复制到剪贴板
      const finalBlob = await new Promise<Blob | null>((resolve) => canvas.toBlob((b) => resolve(b), "image/png", 1.0))
      if (!finalBlob) throw new Error("Could not create image blob")

      try {
        // 检查剪贴板权限和页面焦点
        if (document.hasFocus() && navigator.clipboard && navigator.clipboard.write) {
      const item = new ClipboardItem({ "image/png": finalBlob })
      await navigator.clipboard.write([item])
          setCopied(true)
          setTimeout(() => setCopied(false), 2000)
          console.log("✅ 成功复制到剪贴板")
        } else {
          throw new Error("页面未获得焦点或剪贴板不可用")
        }
      } catch (clipboardError) {
        console.warn("剪贴板权限问题，使用下载方式:", clipboardError)
        // 备用方法：创建下载链接
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
        console.log("✅ 图片已下载到本地")
      }
    } catch (error) {
      console.warn("复制失败:", error)
      // 提供更友好的错误信息
      if (error instanceof Error && error.message.includes("focus")) {
        setError("Please click on the page first, then try copying again. The image has been downloaded as backup.")
      } else {
        setError("Copy failed. The image has been downloaded instead. Check your downloads folder.")
      }
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
                    <div className="flex flex-col items-center">
                      <canvas
                        ref={previewCanvasRef}
                        width={1024}
                        height={1024}
                        style={{ borderRadius: 12, background: "#222", width: "100%", maxWidth: "400px", height: "auto" }}
                      />
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
