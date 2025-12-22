import { type NextRequest, NextResponse } from "next/server"
import { generateImageLimit, getClientIdentifier } from "@/lib/rate-limit"

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const clientId = getClientIdentifier(request)
    const rateLimitResult = generateImageLimit.check(clientId)

    if (!rateLimitResult.success) {
      return NextResponse.json({
        success: false,
        error: "Rate limit exceeded. Please try again later.",
        resetTime: rateLimitResult.resetTime,
      }, {
        status: 429,
        headers: {
          'X-RateLimit-Limit': '5',
          'X-RateLimit-Remaining': '0',
          'X-RateLimit-Reset': String(rateLimitResult.resetTime),
          'Retry-After': String(Math.ceil((rateLimitResult.resetTime! - Date.now()) / 1000))
        }
      })
    }

    const { prompt } = await request.json()

    if (!prompt) {
      return NextResponse.json({
        success: false,
        error: "Prompt is required",
      })
    }

    // Check if API key is configured
    const FAL_API_KEY = process.env.FAL_API_KEY
    if (!FAL_API_KEY) {
      console.error("❌ FAL_API_KEY not configured")
      return NextResponse.json({
        success: false,
        error: "Image generation service not configured. Please contact support.",
      })
    }

    // Enhanced prompt with divine and inspirational elements
    const enhancedPrompt = `${prompt}, divine light, cinematic, photorealistic, masterpiece, 4k, high resolution`

    console.log("Generating 1024x1024 image with FLUX-1 Schnell:", enhancedPrompt)

    const response = await fetch("https://fal.run/fal-ai/flux-1/schnell", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Key ${FAL_API_KEY}`,
      },
      body: JSON.stringify({
        prompt: enhancedPrompt,
        negative_prompt:
          "text, watermark, ugly, blurry, deformed, distorted, poor quality, bad anatomy, extra limbs, missing limbs, low resolution",
        image_size: {
          width: 1024,
          height: 1024,
        },
        seed: null,
        num_images: 1,
        num_inference_steps: 4,
        guidance_scale: 3.5,
      }),
    })

    console.log("Fal.ai response status:", response.status)

    if (!response.ok) {
      const errorText = await response.text()
      console.error("Fal.ai API error:", errorText)
      return NextResponse.json({
        success: false,
        error: `API Error: ${response.status} - ${errorText}`,
      })
    }

    const data = await response.json()
    console.log("Generated image data:", data)

    if (data.images && data.images.length > 0) {
      return NextResponse.json({
        success: true,
        imageUrl: data.images[0].url,
        width: data.images[0].width || 1024,
        height: data.images[0].height || 1024,
        seed: data.seed,
        timings: data.timings,
        prompt: data.prompt,
      })
    } else {
      return NextResponse.json({
        success: false,
        error: "No images generated",
      })
    }
  } catch (error) {
    console.error("Fal.ai API error:", error)
    return NextResponse.json(
      {
        success: false,
        error: `Internal server error: ${error instanceof Error ? error.message : "Unknown error"}`,
      },
      { status: 500 },
    )
  }
}
