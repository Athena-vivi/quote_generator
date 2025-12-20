"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { X, Check, Crown, Zap } from "lucide-react"
import { useSubscription } from "@/hooks/use-subscription"
import { useAuth } from "@/hooks/use-auth"

interface PricingModalProps {
  isOpen: boolean
  onClose: () => void
  onLoginRequired: () => void
}

export function PricingModal({ isOpen, onClose, onLoginRequired }: PricingModalProps) {
  const { plans, createSubscription, isLoading, currentPlan } = useSubscription()
  const { isAuthenticated } = useAuth()
  const [processingPlan, setProcessingPlan] = useState<string | null>(null)

  if (!isOpen) return null

  const handleSubscribe = async (priceId: string, planId: string) => {
    if (!isAuthenticated) {
      onLoginRequired()
      return
    }

    if (planId === "free") {
      // 免费计划不需要支付
      onClose()
      return
    }

    setProcessingPlan(planId)

    try {
      const result = await createSubscription(priceId)

      if (result.url) {
        // 重定向到Stripe支付页面
        window.location.href = result.url
      } else if (result.error) {
        console.error("Subscription error:", result.error)
        // TODO: 显示错误提示
      }
    } catch (error) {
      console.error("Subscription error:", error)
    } finally {
      setProcessingPlan(null)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Choose Your Plan</h2>
              <p className="text-gray-600 mt-2">Unlock the full power of QuoteGenerator</p>
            </div>
            <Button variant="ghost" onClick={onClose}>
              <X className="w-5 h-5" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {plans.map((plan) => (
              <Card
                key={plan.id}
                className={`relative ${plan.popular ? "border-amber-500 shadow-lg scale-105" : "border-gray-200"} ${
                  currentPlan === plan.id ? "bg-amber-50" : ""
                }`}
              >
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-amber-500 text-white">
                    Most Popular
                  </Badge>
                )}

                <CardHeader className="text-center">
                  <div className="flex justify-center mb-4">
                    {plan.id === "free" && <Zap className="w-8 h-8 text-gray-500" />}
                    {plan.id === "pro" && <Crown className="w-8 h-8 text-amber-500" />}
                    {plan.id === "premium" && <Crown className="w-8 h-8 text-purple-500" />}
                  </div>
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <div className="mt-4">
                    <span className="text-4xl font-bold">${plan.price}</span>
                    <span className="text-gray-500">/{plan.interval}</span>
                  </div>
                </CardHeader>

                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center">
                        <Check className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    onClick={() => handleSubscribe(plan.stripePriceId, plan.id)}
                    disabled={isLoading || processingPlan === plan.id || currentPlan === plan.id}
                    className={`w-full ${
                      plan.popular
                        ? "bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800"
                        : ""
                    }`}
                    variant={plan.popular ? "default" : "outline"}
                  >
                    {currentPlan === plan.id
                      ? "Current Plan"
                      : processingPlan === plan.id
                        ? "Processing..."
                        : plan.id === "free"
                          ? "Get Started"
                          : `Subscribe to ${plan.name}`}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-8 text-center text-sm text-gray-500">
            <p>All plans include a 7-day free trial. Cancel anytime.</p>
            <p className="mt-2">
              Questions?{" "}
              <a href="mailto:support@quotegenerator.com" className="text-amber-600 hover:text-amber-700">
                Contact our support team
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
