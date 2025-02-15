"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { SparkleIcon } from "lucide-react"

const dailySpecials = [
  { name: "Rainbow Cloud Latte", price: "$5.99", description: "A magical drink that changes color with temperature" },
  { name: "Unicorn Dream Cake", price: "$6.99", description: "Fluffy vanilla cake with rainbow cream" },
  { name: "Star Dust Cookie", price: "$4.99", description: "Sparkly sugar cookie with magical sprinkles" }
]

export default function DailySpecial() {
  const [activeSpecial, setActiveSpecial] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSpecial((prev) => (prev + 1) % dailySpecials.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <motion.div 
      className="mt-24"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <h2 className="text-3xl font-bold text-center mb-12 dark:text-gray-100">Today's Special</h2>
      <Dialog>
        <DialogTrigger asChild>
          <Card className="max-w-md mx-auto cursor-pointer hover:shadow-lg transition-shadow dark:bg-gray-800/50 dark:hover:bg-gray-800/80">
            <CardContent className="flex flex-col items-center space-y-4 p-6">
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <SparkleIcon className="h-12 w-12 text-pink-500" />
              </motion.div>
              <Badge variant="secondary" className="animate-pulse dark:text-gray-100">Special Offer</Badge>
              <h3 className="text-xl font-bold dark:text-gray-100">{dailySpecials[activeSpecial].name}</h3>
              <p className="text-2xl font-bold text-pink-500">{dailySpecials[activeSpecial].price}</p>
            </CardContent>
          </Card>
        </DialogTrigger>
        <DialogContent className="dark:bg-gray-800">
          <DialogHeader>
            <DialogTitle className="dark:text-gray-100">Today's Special Details</DialogTitle>
          </DialogHeader>
          <div className="p-4">
            <h3 className="text-xl font-bold mb-2 dark:text-gray-100">{dailySpecials[activeSpecial].name}</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">{dailySpecials[activeSpecial].description}</p>
            <p className="text-2xl font-bold text-pink-500 mb-4">{dailySpecials[activeSpecial].price}</p>
            <Button className="w-full bg-pink-500 hover:bg-pink-600">Order Now</Button>
          </div>
        </DialogContent>
      </Dialog>
    </motion.div>
  )
}