"use client"

import { motion } from "framer-motion"
import PageHeader from "@/components/page-header"

export default function BillingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="container px-4 py-12">
      <PageHeader
        title="Billing & Subscriptions"
        description="Manage your subscription, payment methods, and billing history"
      />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mt-8"
      >
        {children}
      </motion.div>
    </div>
  )
}