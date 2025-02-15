"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Crown, AlertCircle } from "lucide-react"
import { useBillingStore } from "@/hooks/use-billing-store"

export default function CurrentPlan() {
  const { currentPlan } = useBillingStore()

  return (
    <Card className="p-6">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <div className="rounded-full bg-pink-100 p-3 dark:bg-pink-900">
            <Crown className="h-6 w-6 text-pink-500" />
          </div>
          <div>
            <h3 className="text-lg font-semibold dark:text-gray-100">
              {currentPlan.name}
            </h3>
            <p className="text-sm text-muted-foreground">
              Your subscription renews on {new Date(currentPlan.renewalDate).toLocaleDateString()}
            </p>
          </div>
        </div>
        <Button variant="outline" className="shrink-0">
          Manage Plan
        </Button>
      </div>

      {currentPlan.status === "overdue" && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="mt-4 flex items-center gap-2 text-sm text-red-500 bg-red-50 dark:bg-red-950/50 p-3 rounded-lg"
        >
          <AlertCircle className="h-4 w-4" />
          <span>Your payment is overdue. Please update your payment method.</span>
        </motion.div>
      )}
    </Card>
  )
}