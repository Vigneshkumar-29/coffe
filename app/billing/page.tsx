"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import PaymentMethods from "@/components/billing/payment-methods"
import SubscriptionPlans from "@/components/billing/subscription-plans"
import TransactionHistory from "@/components/billing/transaction-history"
import CurrentPlan from "@/components/billing/current-plan"
import OrderBills from "@/components/billing/order-bills"

export default function BillingPage() {
  const [activeTab, setActiveTab] = useState("subscription")

  return (
    <>
      <CurrentPlan />

      <Tabs
        defaultValue={activeTab}
        onValueChange={setActiveTab}
        className="mt-8"
      >
        <TabsList className="grid w-full grid-cols-4 max-w-[800px] mx-auto">
          <TabsTrigger value="subscription">Subscription</TabsTrigger>
          <TabsTrigger value="payment">Payment Methods</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
          <TabsTrigger value="bills">Order Bills</TabsTrigger>
        </TabsList>

        <div className="mt-8">
          <TabsContent value="subscription">
            <SubscriptionPlans />
          </TabsContent>

          <TabsContent value="payment">
            <PaymentMethods />
          </TabsContent>

          <TabsContent value="history">
            <TransactionHistory />
          </TabsContent>

          <TabsContent value="bills">
            <OrderBills />
          </TabsContent>
        </div>
      </Tabs>
    </>
  )
}