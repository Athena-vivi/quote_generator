/**
 * Canvas Drawing Engine for Bible Quote Images
 * Pure utility functions without React dependencies
 */

export interface DrawQuoteImageParams {
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

/**
 * Draws a Bible quote with background image onto a canvas context
 *
 * @param params - Drawing parameters including context, image, quote text, and styling options
 */
export async function drawQuoteImage({
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
}: DrawQuoteImageParams): Promise<void> {
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

  // Draw main quote text with enhanced shadow for legibility
  ctx.font = `italic 400 ${fontSize}px ${fontFamily}`
  ctx.fillStyle = textColor
  ctx.textAlign = "center"
  ctx.textBaseline = "middle"

  // Multi-layer shadow for better readability on bright backgrounds
  ctx.shadowColor = "rgba(0, 0, 0, 0.5)"
  ctx.shadowBlur = 8
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

  // Draw reference with enhanced shadow for depth
  ctx.font = `italic 700 ${refFontSize.toFixed(1)}px ${fontFamily}`
  ctx.textAlign = "right"
  ctx.textBaseline = "bottom"

  const refX = width - sideSafe
  const refY = height - bottomSafe

  // Enhanced shadow for reference
  ctx.shadowColor = "rgba(0, 0, 0, 0.4)"
  ctx.shadowBlur = 8
  ctx.shadowOffsetX = 2
  ctx.shadowOffsetY = 2

  ctx.fillStyle = refColor
  ctx.globalAlpha = 1.0
  ctx.fillText(`— ${cleanReference}`, refX, refY)
  ctx.globalAlpha = 1.0

  // ========== ENHANCED WATERMARK ==========
  ctx.save()

  const watermarkMargin = 20
  const watermarkFontSize = Math.max(16, width * 0.018)
  const watermarkX = width - watermarkMargin
  const watermarkY = height - watermarkMargin

  // Watermark with shadow for visibility on all backgrounds
  ctx.font = `italic 400 ${watermarkFontSize}px "Crimson Text", serif`
  ctx.textAlign = "right"
  ctx.textBaseline = "bottom"

  // Add shadow layer (opposite color to ensure visibility)
  if (theme === 'dark') {
    // Dark theme: white text with black shadow
    ctx.shadowColor = "rgba(0, 0, 0, 0.8)"
    ctx.shadowBlur = 6
    ctx.shadowOffsetX = 1
    ctx.shadowOffsetY = 1
    ctx.fillStyle = "rgba(255, 255, 255, 0.35)"
  } else {
    // Light theme: dark text with white shadow
    ctx.shadowColor = "rgba(255, 255, 255, 0.9)"
    ctx.shadowBlur = 6
    ctx.shadowOffsetX = 1
    ctx.shadowOffsetY = 1
    ctx.fillStyle = "rgba(0, 0, 0, 0.35)"
  }

  ctx.fillText("Divine Art by QuoteGenerator.org", watermarkX, watermarkY)
  ctx.restore()

  // ========== BRAND SEAL (Circular Dove Logo) ==========
  ctx.save()

  const sealSize = Math.max(40, width * 0.05)
  const sealX = width - sealSize / 2 - watermarkMargin
  const sealY = height - sealSize / 2 - watermarkMargin - watermarkFontSize - 10

  // Draw outer circle ring
  ctx.beginPath()
  ctx.arc(sealX, sealY, sealSize / 2, 0, Math.PI * 2)
  ctx.strokeStyle = theme === 'dark' ? "rgba(255, 255, 255, 0.25)" : "rgba(0, 0, 0, 0.25)"
  ctx.lineWidth = 1.5
  ctx.stroke()

  // Draw inner circle
  ctx.beginPath()
  ctx.arc(sealX, sealY, sealSize / 2.5, 0, Math.PI * 2)
  ctx.strokeStyle = theme === 'dark' ? "rgba(255, 255, 255, 0.15)" : "rgba(0, 0, 0, 0.15)"
  ctx.lineWidth = 1
  ctx.stroke()

  // Draw simplified dove silhouette
  ctx.fillStyle = theme === 'dark' ? "rgba(255, 255, 255, 0.3)" : "rgba(0, 0, 0, 0.3)"
  ctx.globalAlpha = 0.25

  // Dove body (simplified silhouette)
  ctx.beginPath()
  ctx.moveTo(sealX - sealSize * 0.15, sealY + sealSize * 0.1) // Tail
  ctx.quadraticCurveTo(sealX - sealSize * 0.05, sealY, sealX + sealSize * 0.05, sealY - sealSize * 0.05) // Body
  ctx.quadraticCurveTo(sealX + sealSize * 0.15, sealY - sealSize * 0.15, sealX + sealSize * 0.25, sealY - sealSize * 0.25) // Head
  ctx.lineTo(sealX + sealSize * 0.3, sealY - sealSize * 0.2) // Beak top
  ctx.lineTo(sealX + sealSize * 0.2, sealY - sealSize * 0.15) // Beak bottom
  ctx.quadraticCurveTo(sealX + sealSize * 0.1, sealY + sealSize * 0.05, sealX - sealSize * 0.05, sealY + sealSize * 0.15) // Wing
  ctx.quadraticCurveTo(sealX - sealSize * 0.15, sealY + sealSize * 0.2, sealX - sealSize * 0.15, sealY + sealSize * 1) // Tail feathers
  ctx.closePath()
  ctx.fill()

  // Draw small cross in center of seal
  ctx.globalAlpha = 0.35
  ctx.strokeStyle = theme === 'dark' ? "rgba(255, 255, 255, 0.4)" : "rgba(0, 0, 0, 0.4)"
  ctx.lineWidth = 1.5

  const crossSize = sealSize * 0.12
  ctx.beginPath()
  ctx.moveTo(sealX, sealY - crossSize)
  ctx.lineTo(sealX, sealY + crossSize)
  ctx.moveTo(sealX - crossSize, sealY)
  ctx.lineTo(sealX + crossSize, sealY)
  ctx.stroke()

  ctx.restore()

  ctx.restore()
}
