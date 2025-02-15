"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Clock, Package, Truck, Home } from "lucide-react"
import { formatDistanceToNow } from "date-fns"

const statusSteps = [
  { icon: Package, label: "Order Confirmed" },
  { icon: Clock, label: "Preparing" },
  { icon: Truck, label: "Out for Delivery" },
  { icon: Home, label: "Delivered" }
]

interface OrderStatusProps {
  order: any
}

export default function OrderStatus({ order }: OrderStatusProps) {
  const currentStep = statusSteps.findIndex(step => 
    step.label.toLowerCase() === order.status.toLowerCase()
  )
  
  const progress = ((currentStep + 1) / statusSteps.length) * 100

  return (
    <Card className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold dark:text-gray-100">Order Status</h3>
        <Badge variant={order.status === "Delivered" ? "default" : "secondary"}>
          {order.status}
        </Badge>
      </div>

      <div className="space-y-2">
        <Progress value={progress} className="h-2" />
        <div className="grid grid-cols-4 gap-2">
          {statusSteps.map((step, index) => {
            const Icon = step.icon
            const isActive = index <= currentStep
            return (
              <motion.div
                key={step.label}
                className="flex flex-col items-center text-center"
                animate={{ opacity: isActive ? 1 : 0.5 }}
              >
                <div className={`p-2 rounded-full ${
                  isActive ? "bg-pink-100 text-pink-500" : "bg-gray-100 text-gray-400"
                } dark:bg-gray-800`}>
                  <Icon className="h-4 w-4" />
                </div>
                <span className="text-xs mt-1 dark:text-gray-300">{step.label}</span>
              </motion.div>
            )
          })}
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600 dark:text-gray-400">Order Time</span>
          <span className="dark:text-gray-300">
            {formatDistanceToNow(new Date(order.orderTime), { addSuffix: true })}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600 dark:text-gray-400">Estimated Delivery</span>
          <span className="dark:text-gray-300">
            {formatDistanceToNow(new Date(order.estimatedDelivery), { addSuffix: true })}
          </span>
        </div>
      </div>
    </Card>
  )
}