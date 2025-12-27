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

  // ========== ARTISTIC SIGNATURE WATERMARK ==========
  ctx.save()

  // Positioning (left corner)
  const signatureX = 50
  const signatureY = height - 50
  const iconSize = 32
  const iconCenterX = signatureX + iconSize / 2
  const iconCenterY = signatureY - iconSize / 2

  // Apply ambient glow to entire watermark
  ctx.shadowColor = "rgba(212, 175, 55, 0.4)"
  ctx.shadowBlur = 6

  // 1. Draw minimal line-art circle
  ctx.beginPath()
  ctx.arc(iconCenterX, iconCenterY, iconSize / 2, 0, Math.PI * 2)
  ctx.strokeStyle = "#F4E4BC"  // Light amber gold
  ctx.lineWidth = 1
  ctx.stroke()

  // 2. Draw minimalist dove silhouette (line art, 1px)
  ctx.strokeStyle = "#F4E4BC"
  ctx.lineWidth = 1
  ctx.globalAlpha = 0.8

  ctx.beginPath()
  // Minimalist dove path (simplified elegant curves)
  ctx.moveTo(iconCenterX - 6, iconCenterY + 4)  // Tail start
  ctx.quadraticCurveTo(iconCenterX - 3, iconCenterY, iconCenterX, iconCenterY - 2)  // Body curve
  ctx.quadraticCurveTo(iconCenterX + 3, iconCenterY - 4, iconCenterX + 6, iconCenterY - 6)  // Head
  ctx.lineTo(iconCenterX + 8, iconCenterY - 5)  // Beak tip
  ctx.lineTo(iconCenterX + 6, iconCenterY - 4)  // Beak back
  ctx.quadraticCurveTo(iconCenterX + 2, iconCenterY - 1, iconCenterX - 2, iconCenterY + 2)  // Wing
  ctx.quadraticCurveTo(iconCenterX - 6, iconCenterY + 4, iconCenterX - 6, iconCenterY + 6)  // Tail
  ctx.stroke()

  // Small cross in center (minimal)
  ctx.globalAlpha = 0.6
  const crossSize = 5
  ctx.beginPath()
  ctx.moveTo(iconCenterX, iconCenterY - crossSize)
  ctx.lineTo(iconCenterX, iconCenterY + crossSize)
  ctx.moveTo(iconCenterX - crossSize, iconCenterY)
  ctx.lineTo(iconCenterX + crossSize, iconCenterY)
  ctx.stroke()

  // 3. Draw signature text (two-line layout)
  ctx.globalAlpha = 1.0
  ctx.textAlign = "left"
  ctx.textBaseline = "middle"

  const textStartX = iconCenterX + iconSize / 2 + 12
  const textBaselineY = iconCenterY

  // First line: DIVINE ART
  ctx.font = `600 15px "Crimson Text", serif`
  ctx.letterSpacing = "0.3em"
  ctx.fillStyle = "#D4AF37"  // Amber gold
  ctx.fillText("DIVINE ART", textStartX, textBaselineY - 6)

  // Second line: QuoteGenerator.org
  ctx.font = `400 11px "Crimson Text", serif`
  ctx.letterSpacing = "0.05em"
  ctx.globalAlpha = 0.5
  ctx.fillText("QuoteGenerator.org", textStartX, textBaselineY + 7)

  ctx.restore()

  ctx.restore()
}
