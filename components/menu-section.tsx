"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Plus, Minus, Utensils } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useCart } from "@/hooks/use-cart"
import Image from "next/image"

const menuCategories = [
  {
    name: "Drinks",
    items: [
      { id: "d1", name: "Rainbow Cloud Latte", price: 5.99, image: "https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=3337&auto=format&fit=crop", description: "A magical drink that changes color with temperature" },
      { id: "d2", name: "Unicorn Frappuccino", price: 6.99, image: "https://images.unsplash.com/photo-1578314675249-a6910f80cc4e?q=80&w=3271&auto=format&fit=crop", description: "Sparkly vanilla frappe with rainbow whipped cream" },
      { id: "d3", name: "Lucky Star Tea", price: 4.99, image: "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=3269&auto=format&fit=crop", description: "Green tea with edible star glitter" },
    ]
  },
  {
    name: "Desserts",
    items: [
      { id: "s1", name: "Kawaii Cupcake Set", price: 12.99, image: "https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?q=80&w=3270&auto=format&fit=crop", description: "Assorted animal-themed cupcakes" },
      { id: "s2", name: "Cloud Cookie", price: 3.99, image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?q=80&w=3270&auto=format&fit=crop", description: "Soft, fluffy meringue cookies" },
      { id: "s3", name: "Magic Parfait", price: 8.99, image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?q=80&w=3270&auto=format&fit=crop", description: "Layered dessert with fresh fruits and cream" },
    ]
  },
  {
    name: "Savory",
    items: [
      { id: "m1", name: "Bento Box", price: 15.99, image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=3270&auto=format&fit=crop", description: "Cute character-shaped rice with sides" },
      { id: "m2", name: "Rainbow Sandwich", price: 9.99, image: "https://images.unsplash.com/photo-1539252554453-80ab65ce3586?q=80&w=3270&auto=format&fit=crop", description: "Colorful layers of fresh ingredients" },
      { id: "m3", name: "Kawaii Pizza", price: 13.99, image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=3281&auto=format&fit=crop", description: "Mini pizzas with cute toppings arrangement" },
    ]
  }
]

export default function MenuSection() {
  const { addItem, removeItem, getItemQuantity } = useCart()
  const [selectedCategory, setSelectedCategory] = useState("Drinks")

  return (
    <div className="space-y-6">
      <div className="flex gap-2 pb-4 overflow-x-auto scrollbar-hide">
        {menuCategories.map((category) => (
          <Button
            key={category.name}
            variant={selectedCategory === category.name ? "default" : "outline"}
            onClick={() => setSelectedCategory(category.name)}
            className="flex items-center gap-2"
          >
            <Utensils className="h-4 w-4" />
            {category.name}
          </Button>
        ))}
      </div>

      <ScrollArea className="h-[calc(100vh-300px)]">
        <div className="space-y-4">
          {menuCategories
            .find(cat => cat.name === selectedCategory)
            ?.items.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="p-4 hover:shadow-lg transition-shadow">
                  <div className="flex gap-4">
                    <div className="relative h-24 w-24 rounded-lg overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold dark:text-gray-100">{item.name}</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-300">{item.description}</p>
                        </div>
                        <Badge variant="secondary" className="dark:bg-gray-800">
                          ${item.price.toFixed(2)}
                        </Badge>
                      </div>
                      <div className="mt-4 flex items-center gap-2">
                        <Button
                          size="icon"
                          variant="outline"
                          onClick={() => removeItem(item)}
                          disabled={getItemQuantity(item.id) === 0}
                          className="h-8 w-8"
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="w-8 text-center dark:text-gray-100">
                          {getItemQuantity(item.id)}
                        </span>
                        <Button
                          size="icon"
                          variant="outline"
                          onClick={() => addItem(item)}
                          className="h-8 w-8"
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
        </div>
      </ScrollArea>
    </div>
  )
}