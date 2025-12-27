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

  // ========== LEFT CORNER WATERMARK & SEAL ==========
  ctx.save()

  // Watermark positioning (left corner)
  const watermarkX = 40
  const watermarkY = height - 40
  const sealSize = Math.max(40, width * 0.05)
  const sealCenterX = watermarkX + sealSize / 2
  const sealCenterY = watermarkY - sealSize / 2

  // 1. Draw subtle background patch to hide AI artifacts
  const patchWidth = 200
  const patchHeight = 80
  const patchGradient = ctx.createRadialGradient(
    watermarkX + patchWidth / 2,
    watermarkY - patchHeight / 2,
    0,
    watermarkX + patchWidth / 2,
    watermarkY - patchHeight / 2,
    patchWidth / 1.5
  )
  patchGradient.addColorStop(0, theme === 'dark' ? "rgba(0, 0, 0, 0.4)" : "rgba(0, 0, 0, 0.25)")
  patchGradient.addColorStop(1, "rgba(0, 0, 0, 0)")

  ctx.fillStyle = patchGradient
  ctx.fillRect(
    watermarkX - 10,
    watermarkY - patchHeight - 10,
    patchWidth + 20,
    patchHeight + 20
  )

  // 2. Draw Golden Dove Seal
  ctx.save()

  // Seal glow effect (subtle shadow)
  ctx.shadowColor = "rgba(212, 175, 55, 0.4)"  // Amber gold shadow
  ctx.shadowBlur = 5
  ctx.globalAlpha = 0.5

  // Outer circle ring
  ctx.beginPath()
  ctx.arc(sealCenterX, sealCenterY, sealSize / 2, 0, Math.PI * 2)
  ctx.strokeStyle = "#D4AF37"  // Amber gold
  ctx.lineWidth = 1.5
  ctx.stroke()

  // Inner circle
  ctx.beginPath()
  ctx.arc(sealCenterX, sealCenterY, sealSize / 2.5, 0, Math.PI * 2)
  ctx.strokeStyle = "#D4AF37"
  ctx.lineWidth = 1
  ctx.stroke()

  // Simplified dove silhouette (golden)
  ctx.fillStyle = "#D4AF37"
  ctx.globalAlpha = 0.5

  ctx.beginPath()
  ctx.moveTo(sealCenterX - sealSize * 0.15, sealCenterY + sealSize * 0.1) // Tail
  ctx.quadraticCurveTo(sealCenterX - sealSize * 0.05, sealCenterY, sealCenterX + sealSize * 0.05, sealCenterY - sealSize * 0.05) // Body
  ctx.quadraticCurveTo(sealCenterX + sealSize * 0.15, sealCenterY - sealSize * 0.15, sealCenterX + sealSize * 0.25, sealCenterY - sealSize * 0.25) // Head
  ctx.lineTo(sealCenterX + sealSize * 0.3, sealCenterY - sealSize * 0.2) // Beak top
  ctx.lineTo(sealCenterX + sealSize * 0.2, sealCenterY - sealSize * 0.15) // Beak bottom
  ctx.quadraticCurveTo(sealCenterX + sealSize * 0.1, sealCenterY + sealSize * 0.05, sealCenterX - sealSize * 0.05, sealCenterY + sealSize * 0.15) // Wing
  ctx.quadraticCurveTo(sealCenterX - sealSize * 0.15, sealCenterY + sealSize * 0.2, sealCenterX - sealSize * 0.15, sealCenterY + sealSize * 0.15) // Tail feathers
  ctx.closePath()
  ctx.fill()

  // Cross in center
  ctx.globalAlpha = 0.6
  ctx.strokeStyle = "#D4AF37"
  ctx.lineWidth = 1.5

  const crossSize = sealSize * 0.12
  ctx.beginPath()
  ctx.moveTo(sealCenterX, sealCenterY - crossSize)
  ctx.lineTo(sealCenterX, sealCenterY + crossSize)
  ctx.moveTo(sealCenterX - crossSize, sealCenterY)
  ctx.lineTo(sealCenterX + crossSize, sealCenterY)
  ctx.stroke()

  ctx.restore()

  // 3. Draw Brand Signature (two-line text)
  ctx.save()

  const textStartX = sealCenterX + sealSize / 2 + 10
  const textBaselineY = sealCenterY

  // Text shadow for legibility on all backgrounds
  ctx.shadowColor = "rgba(0, 0, 0, 0.5)"
  ctx.shadowBlur = 4
  ctx.shadowOffsetX = 1
  ctx.shadowOffsetY = 1

  // First line: DIVINE ART
  ctx.font = `600 14px "Crimson Text", serif`
  ctx.letterSpacing = "2px"
  ctx.fillStyle = "#D4AF37"
  ctx.globalAlpha = 1.0
  ctx.textAlign = "left"
  ctx.textBaseline = "middle"
  ctx.fillText("DIVINE ART", textStartX, textBaselineY - 8)

  // Second line: QuoteGenerator.org
  ctx.font = `400 11px "Crimson Text", serif`
  ctx.letterSpacing = "0.5px"
  ctx.globalAlpha = 0.7
  ctx.fillText("QuoteGenerator.org", textStartX, textBaselineY + 8)

  ctx.restore()

  ctx.restore()

  ctx.restore()
}
