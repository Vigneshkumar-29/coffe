"use client"

import { useEffect, useState } from "react"
import BillPreview from "@/components/billing/bill-preview"
import { useCart } from "@/hooks/use-cart"
import { type Bill } from "@/types/billing"

export default function BillPage() {
  const { items, total } = useCart()
  const [bill, setBill] = useState<Bill | null>(null)

  useEffect(() => {
    const taxRate = 0.1 // 10% tax
    const subtotal = total
    const taxAmount = subtotal * taxRate

    setBill({
      invoiceNumber: `INV-${Date.now().toString().slice(-6)}`,
      date: new Date().toISOString(),
      customerName: "Guest Customer",
      customerEmail: "guest@example.com",
      items: items.map(item => ({
        name: item.name,
        quantity: item.quantity,
        price: item.price
      })),
      subtotal,
      taxRate,
      taxAmount,
      total: subtotal + taxAmount,
      paymentMethod: "Credit Card"
    })
  }, [items, total])

  if (!bill) {
    return <div>Loading...</div>
  }

  return <BillPreview bill={bill} />
}