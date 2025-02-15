"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Receipt, Download, Printer, Mail } from "lucide-react"
import { format } from "date-fns"
import Link from "next/link"
import { useCart } from "@/hooks/use-cart"

export default function OrderBills() {
  const { items } = useCart()

  const recentOrders = [
    {
      id: "ord-001",
      date: new Date(),
      total: 24.99,
      items: 3,
      status: "Completed"
    },
    {
      id: "ord-002",
      date: new Date(Date.now() - 24 * 60 * 60 * 1000),
      total: 35.50,
      items: 4,
      status: "Completed"
    }
  ]

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold dark:text-gray-100">Recent Order Bills</h3>
        {items.length > 0 && (
          <Button asChild className="bg-pink-500 hover:bg-pink-600">
            <Link href="/order/bill">
              View Current Order Bill
            </Link>
          </Button>
        )}
      </div>

      <ScrollArea className="h-[400px] pr-4">
        <div className="space-y-4">
          {recentOrders.map((order) => (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="border rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Receipt className="h-4 w-4 text-pink-500" />
                  <span className="font-medium dark:text-gray-100">{order.id}</span>
                </div>
                <span className="text-sm text-muted-foreground">
                  {format(order.date, "PPP")}
                </span>
              </div>

              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm text-muted-foreground">
                    {order.items} items
                  </p>
                  <p className="font-medium text-pink-500">
                    ${order.total.toFixed(2)}
                  </p>
                </div>
                <span className="text-sm px-2 py-1 bg-green-100 text-green-700 rounded-full dark:bg-green-900 dark:text-green-100">
                  {order.status}
                </span>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  <Printer className="h-4 w-4 mr-2" />
                  Print
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  <Mail className="h-4 w-4 mr-2" />
                  Email
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </ScrollArea>
    </Card>
  )
}