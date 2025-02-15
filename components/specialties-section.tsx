"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Coffee, Cake, Star, Sparkles, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const specialties = [
  {
    icon: Coffee,
    title: "Magical Drinks",
    description: "Enchanted beverages that will brighten your day",
    items: ["Rainbow Cloud Latte", "Unicorn Frappuccino", "Lucky Star Tea"],
    gradient: "from-pink-100/80 to-purple-100/80 dark:from-pink-950/50 dark:to-purple-950/50",
    iconColor: "text-pink-500 dark:text-pink-400"
  },
  {
    icon: Cake,
    title: "Sweet Treats",
    description: "Delightful pastries and desserts made with love",
    items: ["Kawaii Cupcakes", "Cloud Cookies", "Magic Parfait"],
    gradient: "from-yellow-100/80 to-orange-100/80 dark:from-yellow-950/50 dark:to-orange-950/50",
    iconColor: "text-orange-500 dark:text-orange-400"
  },
  {
    icon: Star,
    title: "Special Items",
    description: "Unique treats that you won't find anywhere else",
    items: ["Character Bento", "Rainbow Sandwiches", "Themed Cakes"],
    gradient: "from-green-100/80 to-blue-100/80 dark:from-green-950/50 dark:to-blue-950/50",
    iconColor: "text-blue-500 dark:text-blue-400"
  }
]

export default function SpecialtiesSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <motion.div 
      className="mt-24"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <div className="text-center space-y-4 mb-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="flex items-center justify-center gap-2"
        >
          <Sparkles className="h-6 w-6 text-pink-500" />
          <h2 className="text-3xl font-bold dark:text-gray-100">Our Specialties</h2>
          <Sparkles className="h-6 w-6 text-pink-500" />
        </motion.div>
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Discover our unique selection of magical treats and beverages, crafted with love and creativity
        </p>
      </div>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {specialties.map((specialty, index) => {
          const Icon = specialty.icon
          return (
            <motion.div
              key={specialty.title}
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Card className={`h-full bg-gradient-to-br ${specialty.gradient} border-0 backdrop-blur-sm`}>
                <CardContent className="flex flex-col space-y-4 p-6">
                  <motion.div
                    animate={hoveredIndex === index ? {
                      scale: [1, 1.2, 1],
                      rotate: [0, 10, -10, 0]
                    } : {}}
                    transition={{ duration: 0.5 }}
                    className={`${specialty.iconColor}`}
                  >
                    <Icon className="h-12 w-12" />
                  </motion.div>
                  <div>
                    <h3 className="text-xl font-bold mb-2 dark:text-gray-100">{specialty.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">{specialty.description}</p>
                  </div>
                  <ul className="space-y-2 flex-grow">
                    {specialty.items.map((item) => (
                      <li key={item} className="flex items-center gap-2">
                        <Badge variant="secondary" className="dark:bg-gray-800 dark:text-gray-100">
                          {item}
                        </Badge>
                      </li>
                    ))}
                  </ul>
                  <Button asChild variant="secondary" className="w-full mt-4 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700 group">
                    <Link href="/menu" className="flex items-center justify-center gap-2">
                      View Menu
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
      </div>
    </motion.div>
  )
}