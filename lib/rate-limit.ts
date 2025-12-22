// In-memory rate limiter for API requests
// In production, consider using Redis for distributed rate limiting

interface RateLimitStore {
  [key: string]: {
    count: number
    resetTime: number
  }
}

const store: RateLimitStore = {}

export interface RateLimitOptions {
  windowMs: number // Time window in milliseconds
  maxRequests: number // Max requests per window
  skipSuccessfulRequests?: boolean
  message?: string
}

export function createRateLimit(options: RateLimitOptions) {
  const {
    windowMs,
    maxRequests,
    skipSuccessfulRequests = false,
    message = `Too many requests. Please try again later.`
  } = options

  return {
    check: (identifier: string): { success: boolean; remaining?: number; resetTime?: number } => {
      const now = Date.now()
      const key = identifier

      // Clean up expired entries
      if (store[key] && store[key].resetTime < now) {
        delete store[key]
      }

      // Initialize or update rate limit
      if (!store[key]) {
        store[key] = {
          count: 1,
          resetTime: now + windowMs
        }
        return { success: true, remaining: maxRequests - 1, resetTime: store[key].resetTime }
      }

      // Check limit
      if (store[key].count >= maxRequests) {
        return {
          success: false,
          resetTime: store[key].resetTime
        }
      }

      // Increment count
      store[key].count++
      return {
        success: true,
        remaining: maxRequests - store[key].count,
        resetTime: store[key].resetTime
      }
    },

    reset: (identifier: string) => {
      delete store[identifier]
    }
  }
}

// Predefined rate limiters
export const generateImageLimit = createRateLimit({
  windowMs: 60 * 1000, // 1 minute
  maxRequests: 5, // 5 requests per minute
  message: "Too many image generation requests. Please wait a minute before trying again."
})

export const searchLimit = createRateLimit({
  windowMs: 60 * 1000, // 1 minute
  maxRequests: 30, // 30 requests per minute
  message: "Too many search requests. Please slow down."
})

export const dailyQuoteLimit = createRateLimit({
  windowMs: 60 * 1000, // 1 minute
  maxRequests: 10, // 10 requests per minute
  message: "Too many requests for daily quotes. Please wait a moment."
})

// Helper to get client identifier
export function getClientIdentifier(request: Request): string {
  // Try to get IP address from various headers
  const forwarded = request.headers.get('x-forwarded-for')
  const realIp = request.headers.get('x-real-ip')
  const ip = forwarded?.split(',')[0] || realIp || 'unknown'

  // Add user agent for more unique identification
  const userAgent = request.headers.get('user-agent') || 'unknown'

  // Create a hash (simple version - in production use crypto)
  return `${ip}-${userAgent}`.replace(/[^a-zA-Z0-9-]/g, '').slice(0, 50)
}