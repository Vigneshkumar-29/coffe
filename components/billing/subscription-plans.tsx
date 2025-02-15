"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Check, Coffee, Cake, Star } from "lucide-react"
import { useBillingStore } from "@/hooks/use-billing-store"
import { toast } from "sonner"

const plans = [
  {
    id: "basic",
    name: "Basic",
    price: 9.99,
    icon: Coffee,
    features: [
      "10% discount on all orders",
      "Priority seating",
      "Monthly newsletter"
    ]
  },
  {
    id: "premium",
    name: "Premium",
    price: 19.99,
    icon: Cake,
    features: [
      "20% discount on all orders",
      "Priority seating",
      "Monthly newsletter",
      "Exclusive events access",
      "Free delivery"
    ]
  },
  {
    id: "vip",
    name: "VIP",
    icon: Star,
    price: 29.99,
    features: [
      "30% discount on all orders",
      "Priority seating",
      "Monthly newsletter",
      "Exclusive events access",
      "Free delivery",
      "Personal concierge",
      "Custom orders"
    ]
  }
]

export default function SubscriptionPlans() {
  const { currentPlan, updateSubscription } = useBillingStore()

  const handleSubscribe = async (planId: string) => {
    try {
      await updateSubscription(planId)
      toast.success("Subscription updated successfully")
    } catch (error) {
      toast.error("Failed to update subscription")
    }
  }

  return (
    <div className="grid gap-8 md:grid-cols-3">
      {plans.map((plan, index) => {
        const Icon = plan.icon
        const isCurrentPlan = currentPlan.id === plan.id
        
        return (
          <motion.div
            key={plan.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="p-6 h-full flex flex-col">
              <div className="mb-6">
                <div className="rounded-full bg-pink-100 p-3 w-fit dark:bg-pink-900">
                  <Icon className="h-6 w-6 text-pink-500" />
                </div>
                <h3 className="text-xl font-bold mt-4 dark:text-gray-100">
                  {plan.name}
                </h3>
                <div className="mt-2">
                  <span className="text-3xl font-bold text-pink-500">
                    ${plan.price}
                  </span>
                  <span className="text-muted-foreground">/month</span>
                </div>
              </div>

              <ul className="space-y-3 mb-6 flex-grow">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-500" />
                    <span className="text-sm text-muted-foreground">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <Button
                onClick={() => handleSubscribe(plan.id)}
                className={isCurrentPlan ? "bg-pink-100 text-pink-500" : "bg-pink-500 hover:bg-pink-600"}
                disabled={isCurrentPlan}
              >
                {isCurrentPlan ? "Current Plan" : "Subscribe"}
              </Button>
            </Card>
          </motion.div>
        )
      })}
    </div>
  )
}