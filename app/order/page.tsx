"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useCart } from "@/hooks/use-cart"
import OrderCart from "@/components/order-cart"
import MenuSection from "@/components/menu-section"
import PageHeader from "@/components/page-header"

export default function OrderPage() {
  const { items } = useCart()

  return (
    <div className="container px-4 py-12">
      <PageHeader
        title="Your Order"
        description="Review your selections and complete your order"
      />
      
      <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_400px]">
        {items.length === 0 ? (
          <div className="lg:col-span-2 text-center py-12">
            <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-8">
              Add some magical items to your cart to get started!
            </p>
            <Button asChild className="bg-pink-500 hover:bg-pink-600">
              <Link href="/menu">View Menu</Link>
            </Button>
          </div>
        ) : (
          <>
            <MenuSection />
            <OrderCart />
          </>
        )}
      </div>
    </div>
  )
}