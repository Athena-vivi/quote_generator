import { z } from 'zod'

const envSchema = z.object({
  // API Keys
  FAL_API_KEY: z.string().min(1, "FAL_API_KEY is required"),
  ESV_API_KEY: z.string().min(1, "ESV_API_KEY is required"),

  // Google Analytics
  NEXT_PUBLIC_GA_ID: z.string().optional(),

  // Verification
  GOOGLE_SITE_VERIFICATION: z.string().optional(),

  // Optional APIs
  OPENAI_API_KEY: z.string().optional(),
  STRIPE_SECRET_KEY: z.string().optional(),
  STRIPE_PUBLISHABLE_KEY: z.string().optional(),

  // Database
  DATABASE_URL: z.string().optional(),

  // Email
  RESEND_API_KEY: z.string().optional(),
  FROM_EMAIL: z.string().email().optional(),

  // Security
  JWT_SECRET: z.string().min(32, "JWT_SECRET must be at least 32 characters").optional(),
  NEXTAUTH_SECRET: z.string().min(32, "NEXTAUTH_SECRET must be at least 32 characters").optional(),

  // Environment
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
})

// Validate environment variables
function validateEnv() {
  try {
    return envSchema.parse(process.env)
  } catch (error) {
    console.error('❌ Invalid environment variables:', error)
    process.exit(1)
  }
}

export const env = validateEnv()

// Type-safe environment variables
export type Env = z.infer<typeof envSchema>