"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Phone, Star, MessageCircle } from "lucide-react"

interface DriverInfoProps {
  order: any
}

export default function DriverInfo({ order }: DriverInfoProps) {
  const handleCall = () => {
    window.location.href = `tel:${order.driver.phone}`
  }

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4 dark:text-gray-100">Driver Information</h3>
      
      <div className="flex items-center space-x-4">
        <Avatar className="h-16 w-16">
          <AvatarImage src={order.driver.avatar} alt={order.driver.name} />
          <AvatarFallback>{order.driver.name.charAt(0)}</AvatarFallback>
        </Avatar>
        
        <div className="flex-1">
          <h4 className="font-semibold dark:text-gray-100">{order.driver.name}</h4>
          <div className="flex items-center space-x-1 text-sm text-yellow-500">
            <Star className="h-4 w-4 fill-current" />
            <span>{order.driver.rating}</span>
            <span className="text-gray-400">({order.driver.totalDeliveries} deliveries)</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-6">
        <Button
          variant="outline"
          className="w-full"
          onClick={handleCall}
        >
          <Phone className="h-4 w-4 mr-2" />
          Call Driver
        </Button>
        <Button
          variant="outline"
          className="w-full"
        >
          <MessageCircle className="h-4 w-4 mr-2" />
          Send Message
        </Button>
      </div>
    </Card>
  )
}