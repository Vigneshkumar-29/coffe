"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import DeliveryMap from "@/components/tracking/delivery-map"
import OrderStatus from "@/components/tracking/order-status"
import DriverInfo from "@/components/tracking/driver-info"
import OrderFilters from "@/components/tracking/order-filters"
import PageHeader from "@/components/page-header"
import { Card } from "@/components/ui/card"
import { useDeliveryStore } from "@/hooks/use-delivery-store"

export default function TrackingPage() {
  const [selectedOrder, setSelectedOrder] = useState(null)
  const { orders } = useDeliveryStore()

  return (
    <div className="container px-4 py-12">
      <PageHeader
        title="Order Tracking"
        description="Track your order in real-time"
      />

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_400px]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative min-h-[600px] rounded-lg overflow-hidden"
        >
          <Card className="absolute inset-0">
            <DeliveryMap
              selectedOrder={selectedOrder}
              onOrderSelect={setSelectedOrder}
            />
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="space-y-6"
        >
          <OrderFilters />
          
          {selectedOrder ? (
            <>
              <OrderStatus order={selectedOrder} />
              <DriverInfo order={selectedOrder} />
            </>
          ) : (
            <Card className="p-6">
              <p className="text-center text-gray-500 dark:text-gray-400">
                Select an order on the map to view details
              </p>
            </Card>
          )}
        </motion.div>
      </div>
    </div>
  )
}