"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { useCart } from "@/hooks/use-cart"
import PageHeader from "@/components/page-header"

const menuItems = {
  drinks: [
    { id: "d1", name: "Rainbow Cloud Latte", price: 5.99, description: "A magical drink that changes color with temperature" },
    { id: "d2", name: "Unicorn Frappuccino", price: 6.99, description: "Sparkly vanilla frappe with rainbow whipped cream" },
    { id: "d3", name: "Lucky Star Tea", price: 4.99, description: "Green tea with edible star glitter" },
  ],
  desserts: [
    { id: "s1", name: "Kawaii Cupcake Set", price: 12.99, description: "Assorted animal-themed cupcakes" },
    { id: "s2", name: "Cloud Cookie", price: 3.99, description: "Soft, fluffy meringue cookies" },
    { id: "s3", name: "Magic Parfait", price: 8.99, description: "Layered dessert with fresh fruits and cream" },
  ],
  savory: [
    { id: "m1", name: "Bento Box", price: 15.99, description: "Cute character-shaped rice with sides" },
    { id: "m2", name: "Rainbow Sandwich", price: 9.99, description: "Colorful layers of fresh ingredients" },
    { id: "m3", name: "Kawaii Pizza", price: 13.99, description: "Mini pizzas with cute toppings arrangement" },
  ]
}

export default function MenuPage() {
  const [activeTab, setActiveTab] = useState("drinks")
  const router = useRouter()
  const { addItem } = useCart()

  const handleOrder = (item: any) => {
    addItem({
      id: item.id,
      name: item.name,
      price: item.price
    })
    router.push('/order')
  }

  return (
    <div className="container px-4 py-12 md:py-24">
      <PageHeader
        title="Our Menu"
        description="Explore our magical selection of drinks and treats"
      />

      <Tabs defaultValue="drinks" className="mt-12" onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3 max-w-[400px] mx-auto">
          <TabsTrigger value="drinks">Drinks</TabsTrigger>
          <TabsTrigger value="desserts">Desserts</TabsTrigger>
          <TabsTrigger value="savory">Savory</TabsTrigger>
        </TabsList>
        {Object.entries(menuItems).map(([category, items]) => (
          <TabsContent key={category} value={category}>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Card className="p-6 h-full flex flex-col justify-between hover:shadow-lg transition-shadow">
                    <div>
                      <h3 className="text-xl font-bold mb-2">{item.name}</h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-4">{item.description}</p>
                    </div>
                    <div className="flex items-center justify-between mt-4">
                      <p className="text-2xl font-bold text-pink-500">${item.price}</p>
                      <Button 
                        onClick={() => handleOrder(item)}
                        className="bg-pink-500 hover:bg-pink-600"
                      >
                        Order Now
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}