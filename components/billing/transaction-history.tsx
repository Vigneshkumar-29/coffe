"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"
import { format } from "date-fns"
import { useBillingStore } from "@/hooks/use-billing-store"

export default function TransactionHistory() {
  const { transactions } = useBillingStore()

  return (
    <Card className="p-6">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold dark:text-gray-100">
            Transaction History
          </h3>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>

        <div className="space-y-4">
          {transactions.map((transaction, index) => (
            <motion.div
              key={transaction.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center justify-between py-4 border-b last:border-0"
            >
              <div>
                <p className="font-medium dark:text-gray-100">
                  {transaction.description}
                </p>
                <p className="text-sm text-muted-foreground">
                  {format(new Date(transaction.date), "PPP")}
                </p>
              </div>
              <div className="text-right">
                <p className={`font-medium ${
                  transaction.type === "credit" ? "text-green-500" : "text-red-500"
                }`}>
                  {transaction.type === "credit" ? "+" : "-"}${transaction.amount.toFixed(2)}
                </p>
                <p className="text-sm text-muted-foreground">
                  {transaction.status}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Card>
  )
}