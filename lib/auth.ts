// 用户认证相关类型定义
export interface User {
  id: string
  email: string
  name: string
  avatar?: string
  plan: "free" | "pro" | "premium"
  subscription?: Subscription
  preferences: UserPreferences
  createdAt: Date
  lastLoginAt: Date
}

export interface Subscription {
  id: string
  userId: string
  plan: "pro" | "premium"
  status: "active" | "canceled" | "past_due" | "trialing"
  currentPeriodStart: Date
  currentPeriodEnd: Date
  cancelAtPeriodEnd: boolean
  stripeSubscriptionId?: string
  priceId: string
}

export interface UserPreferences {
  theme: "light" | "dark" | "auto"
  defaultImageSize: "1024x1024" | "1080x1080" | "1200x630"
  autoSaveToFavorites: boolean
  emailNotifications: boolean
  weeklyDigest: boolean
  preferredTranslation: "ESV" | "NIV" | "NASB" | "NLT"
}

// 认证状态管理
export interface AuthState {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
}

// API响应类型
export interface AuthResponse {
  success: boolean
  user?: User
  token?: string
  error?: string
}
