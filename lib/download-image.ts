/**
 * Download an image from URL
 * @param url - Image URL
 * @param filename - Download filename
 * @param format - File format (jpg, png, webp)
 */
export async function downloadImage(
  url: string,
  filename: string,
  format: 'jpg' | 'png' | 'webp' = 'jpg'
): Promise<void> {
  try {
    // Fetch the image
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error('Failed to fetch image')
    }

    // Get image blob
    const blob = await response.blob()

    // Create object URL
    const blobUrl = window.URL.createObjectURL(blob)

    // Create download link
    const link = document.createElement('a')
    link.href = blobUrl
    link.download = `${filename}.${format}`

    // Trigger download
    document.body.appendChild(link)
    link.click()

    // Cleanup
    document.body.removeChild(link)
    window.URL.revokeObjectURL(blobUrl)
  } catch (error) {
    console.error('Error downloading image:', error)
    throw new Error('Failed to download image')
  }
}

/**
 * Convert canvas to image and download
 * @param canvas - HTML canvas element
 * @param filename - Download filename
 * @param quality - Image quality (0-1)
 */
export async function downloadCanvasAsImage(
  canvas: HTMLCanvasElement,
  filename: string,
  quality: number = 0.9
): Promise<void> {
  try {
    // Convert canvas to blob
    const blob = await new Promise<Blob>((resolve) => {
      canvas.toBlob((blob) => {
        resolve(blob!)
      }, 'image/jpeg', quality)
    })

    // Create object URL
    const blobUrl = window.URL.createObjectURL(blob)

    // Create download link
    const link = document.createElement('a')
    link.href = blobUrl
    link.download = `${filename}.jpg`

    // Trigger download
    document.body.appendChild(link)
    link.click()

    // Cleanup
    document.body.removeChild(link)
    window.URL.revokeObjectURL(blobUrl)
  } catch (error) {
    console.error('Error downloading canvas image:', error)
    throw new Error('Failed to download image')
  }
}

/**
 * Generate a shareable quote image with text overlay
 * @param imageUrl - Background image URL
 * @param quoteText - Quote text
 * @param reference - Bible reference
 * @param options - Style options
 */
export async function generateQuoteImage(
  imageUrl: string,
  quoteText: string,
  reference: string,
  options: {
    width?: number
    height?: number
    fontSize?: number
    fontColor?: string
    backgroundColor?: string
  } = {}
): Promise<string> {
  const {
    width = 1080,
    height = 1080,
    fontSize = 48,
    fontColor = '#FFFFFF',
    backgroundColor = '#000000'
  } = options

  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')!

    canvas.width = width
    canvas.height = height

    const img = new Image()
    img.crossOrigin = 'anonymous'

    img.onload = () => {
      // Draw background image
      ctx.drawImage(img, 0, 0, width, height)

      // Add dark overlay for text readability
      ctx.fillStyle = 'rgba(0, 0, 0, 0.4)'
      ctx.fillRect(0, 0, width, height)

      // Set text properties
      ctx.fillStyle = fontColor
      ctx.font = `bold ${fontSize}px 'Crimson Text', serif`
      ctx.textAlign = 'center'
      ctx.shadowColor = 'rgba(0, 0, 0, 0.8)'
      ctx.shadowBlur = 4
      ctx.shadowOffsetX = 2
      ctx.shadowOffsetY = 2

      // Wrap text
      const maxWidth = width * 0.8
      const lineHeight = fontSize * 1.4
      const words = quoteText.split(' ')
      let line = ''
      let lines: string[] = []

      for (let n = 0; n < words.length; n++) {
        const testLine = line + words[n] + ' '
        const metrics = ctx.measureText(testLine)
        const testWidth = metrics.width

        if (testWidth > maxWidth && n > 0) {
          lines.push(line)
          line = words[n] + ' '
        } else {
          line = testLine
        }
      }
      lines.push(line)

      // Calculate text position
      const lineHeightTotal = lines.length * lineHeight
      const startY = (height - lineHeightTotal) / 2 + lineHeight

      // Draw quote text
      lines.forEach((line, index) => {
        const y = startY + (index * lineHeight)
        ctx.fillText(line, width / 2, y)
      })

      // Draw reference
      ctx.font = `italic ${fontSize * 0.6}px 'Crimson Text', serif`
      ctx.fillStyle = fontColor
      ctx.fillText(reference, width / 2, startY + lineHeightTotal + 50)

      // Convert to data URL
      const dataUrl = canvas.toDataURL('image/jpeg', 0.9)
      resolve(dataUrl)
    }

    img.onerror = () => reject(new Error('Failed to load image'))
    img.src = imageUrl
  })
}