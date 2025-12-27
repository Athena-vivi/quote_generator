import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const imageUrl = searchParams.get('url')

    if (!imageUrl) {
      return NextResponse.json(
        { error: 'Image URL is required' },
        { status: 400 }
      )
    }

    // Validate URL format for security
    let validUrl: URL
    try {
      validUrl = new URL(imageUrl)
    } catch {
      return NextResponse.json(
        { error: 'Invalid URL format' },
        { status: 400 }
      )
    }

    // Only allow https protocol for security
    if (validUrl.protocol !== 'https:') {
      return NextResponse.json(
        { error: 'Only HTTPS URLs are allowed' },
        { status: 400 }
      )
    }

    // Fetch the image from the original server
    const response = await fetch(imageUrl, {
      // Don't include credentials in cross-origin requests
      mode: 'cors',
    })

    if (!response.ok) {
      console.error('Proxy image fetch failed:', response.status, response.statusText)
      return NextResponse.json(
        { error: `Failed to fetch image: ${response.status}` },
        { status: response.status }
      )
    }

    // Get important headers from the original response
    const contentType = response.headers.get('content-type')
    const etag = response.headers.get('etag')

    // Log the content type for debugging
    console.log(`[Proxy Image] Content-Type: ${contentType}, URL: ${imageUrl}`)

    // Get the image blob
    const blob = await response.blob()

    // Create headers with proper CORS, caching, and original metadata
    const headers = new Headers()

    // Set Content-Type from original response (supports WebP, PNG, JPEG, etc.)
    if (contentType) {
      headers.set('Content-Type', contentType)
    } else {
      headers.set('Content-Type', 'image/png')
    }

    // Set Content-Length from blob (more accurate than original header)
    headers.set('Content-Length', blob.size.toString())

    // Forward ETag if available for better caching
    if (etag) {
      headers.set('ETag', etag)
    }

    // Allow cross-origin requests
    headers.set('Access-Control-Allow-Origin', '*')
    headers.set('Access-Control-Allow-Methods', 'GET')
    headers.set('Access-Control-Allow-Headers', 'Content-Type')

    // Set aggressive caching for static images
    // Fal.ai images are static, so we can cache them for a long time
    headers.set('Cache-Control', 'public, max-age=3600, s-maxage=86400, stale-while-revalidate=86400, immutable')

    // Add Vary header for proper caching
    headers.set('Vary', 'Accept, Accept-Encoding')

    // Optional: Add Content-Disposition for better download experience
    const extension = contentType?.includes('webp') ? 'webp' :
                     contentType?.includes('png') ? 'png' :
                     contentType?.includes('jpeg') ? 'jpg' : 'png'
    headers.set('Content-Disposition', `inline; filename="divine-art.${extension}"`)

    // Return the image blob with proper headers
    return new NextResponse(blob, {
      status: 200,
      headers,
    })
  } catch (error) {
    console.error('Proxy image error:', error)
    return NextResponse.json(
      {
        error: `Internal server error: ${error instanceof Error ? error.message : 'Unknown error'}`
      },
      { status: 500 }
    )
  }
}
