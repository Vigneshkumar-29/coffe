"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PlusCircle, CreditCard, Trash2 } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useBillingStore } from "@/hooks/use-billing-store"
import { toast } from "sonner"

export default function PaymentMethods() {
  const { paymentMethods, addPaymentMethod, removePaymentMethod } = useBillingStore()
  const [isAddingCard, setIsAddingCard] = useState(false)

  const handleAddCard = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsAddingCard(true)

    try {
      // Implement secure card addition logic
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      addPaymentMethod({
        id: Date.now().toString(),
        type: "credit_card",
        last4: "4242",
        expMonth: 12,
        expYear: 2025,
        brand: "visa"
      })

      toast.success("Payment method added successfully")
      setIsAddingCard(false)
    } catch (error) {
      toast.error("Failed to add payment method")
      setIsAddingCard(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold dark:text-gray-100">
          Payment Methods
        </h3>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-pink-500 hover:bg-pink-600">
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Payment Method
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Payment Method</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleAddCard} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="cardNumber">Card Number</Label>
                <Input
                  id="cardNumber"
                  placeholder="4242 4242 4242 4242"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="expiry">Expiry Date</Label>
                  <Input
                    id="expiry"
                    placeholder="MM/YY"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cvc">CVC</Label>
                  <Input
                    id="cvc"
                    placeholder="123"
                    required
                  />
                </div>
              </div>
              <Button
                type="submit"
                className="w-full bg-pink-500 hover:bg-pink-600"
                disabled={isAddingCard}
              >
                {isAddingCard ? "Adding..." : "Add Card"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        {paymentMethods.map((method) => (
          <motion.div
            key={method.id}
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <CreditCard className="h-6 w-6 text-pink-500" />
                  <div>
                    <p className="font-medium dark:text-gray-100">
                      {method.brand.toUpperCase()} •••• {method.last4}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Expires {method.expMonth}/{method.expYear}
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removePaymentMethod(method.id)}
                  className="text-red-500 hover:text-red-600 hover:bg-red-50"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}