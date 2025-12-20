"use client"

import { useState } from "react"
import { useAuth } from "./use-auth"

interface SubscriptionPlan {
  id: string
  name: string
  price: number
  interval: "month" | "year"
  features: string[]
  stripePriceId: string
  popular?: boolean
}

export const SUBSCRIPTION_PLANS: SubscriptionPlan[] = [
  {
    id: "free",
    name: "Free",
    price: 0,
    interval: "month",
    features: ["5 images per day", "Basic backgrounds", "Standard resolution", "Watermarked images"],
    stripePriceId: "",
  },
  {
    id: "pro",
    name: "Pro",
    price: 9.99,
    interval: "month",
    features: [
      "Unlimited images",
      "Premium backgrounds",
      "High resolution (1024x1024)",
      "No watermarks",
      "Priority support",
    ],
    stripePriceId: "price_pro_monthly",
    popular: true,
  },
  {
    id: "premium",
    name: "Premium",
    price: 19.99,
    interval: "month",
    features: [
      "Everything in Pro",
      "Custom fonts",
      "Batch generation",
      "API access",
      "White-label option",
      "Advanced analytics",
    ],
    stripePriceId: "price_premium_monthly",
  },
]

export function useSubscription() {
  const { user, isAuthenticated } = useAuth()
  const [isLoading, setIsLoading] = useState(false)

  // 检查用户权限
  const hasFeature = (feature: string): boolean => {
    if (!isAuthenticated || !user) return false

    const userPlan = user.plan
    const planFeatures = SUBSCRIPTION_PLANS.find((p) => p.id === userPlan)?.features || []

    return planFeatures.some((f) => f.toLowerCase().includes(feature.toLowerCase()))
  }

  // 检查使用限制
  const canGenerateImage = (): boolean => {
    if (!isAuthenticated || !user) return true // 游客可以使用基础功能

    if (user.plan === "free") {
      // TODO: 检查今日使用次数
      return true // 暂时返回true，后续实现限制逻辑
    }

    return true // Pro和Premium无限制
  }

  // 创建订阅
  const createSubscription = async (priceId: string): Promise<{ url?: string; error?: string }> => {
    if (!isAuthenticated) {
      return { error: "Please login first" }
    }

    setIsLoading(true)
    try {
      const response = await fetch("/api/subscription/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
        },
        body: JSON.stringify({ priceId }),
      })

      const data = await response.json()

      if (data.success && data.url) {
        return { url: data.url }
      }

      return { error: data.error || "Failed to create subscription" }
    } catch (error) {
      return { error: "Network error" }
    } finally {
      setIsLoading(false)
    }
  }

  // 取消订阅
  const cancelSubscription = async (): Promise<boolean> => {
    if (!isAuthenticated || !user?.subscription) return false

    setIsLoading(true)
    try {
      const response = await fetch("/api/subscription/cancel", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
        },
      })

      const data = await response.json()
      return data.success
    } catch (error) {
      console.error("Cancel subscription error:", error)
      return false
    } finally {
      setIsLoading(false)
    }
  }

  // 恢复订阅
  const resumeSubscription = async (): Promise<boolean> => {
    if (!isAuthenticated || !user?.subscription) return false

    setIsLoading(true)
    try {
      const response = await fetch("/api/subscription/resume", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
        },
      })

      const data = await response.json()
      return data.success
    } catch (error) {
      console.error("Resume subscription error:", error)
      return false
    } finally {
      setIsLoading(false)
    }
  }

  return {
    subscription: user?.subscription,
    currentPlan: user?.plan || "free",
    isLoading,
    hasFeature,
    canGenerateImage,
    createSubscription,
    cancelSubscription,
    resumeSubscription,
    plans: SUBSCRIPTION_PLANS,
  }
}
