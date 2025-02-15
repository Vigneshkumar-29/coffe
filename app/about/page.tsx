"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Heart, Coffee, Users } from "lucide-react"
import Image from "next/image"
import PageHeader from "@/components/page-header"

export default function AboutPage() {
  return (
    <div className="container px-4 py-12 md:py-24">
      <PageHeader
        title="About Us"
        description="The story behind our magical café"
      />

      <div className="mt-12 grid gap-12 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Image
            src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=2047&auto=format&fit=crop"
            alt="Café interior"
            width={600}
            height={400}
            className="rounded-lg shadow-lg"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="space-y-6"
        >
          <h2 className="text-3xl font-bold">Our Story</h2>
          <p className="text-gray-600 dark:text-gray-300">
            Founded in 2020, Kawaii Café started with a simple dream: to create a space where 
            cuteness and deliciousness come together. Our passion for creating memorable experiences 
            drives everything we do.
          </p>
          <p className="text-gray-600 dark:text-gray-300">
            Every item on our menu is crafted with love and attention to detail, ensuring not just 
            great taste but also an Instagram-worthy presentation that brings joy to our customers.
          </p>
        </motion.div>
      </div>

      <div className="mt-24 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card className="p-6 text-center">
            <Heart className="h-12 w-12 mx-auto mb-4 text-pink-500" />
            <h3 className="text-xl font-bold mb-2">Made with Love</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Every creation is made with passion and care
            </p>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Card className="p-6 text-center">
            <Coffee className="h-12 w-12 mx-auto mb-4 text-pink-500" />
            <h3 className="text-xl font-bold mb-2">Quality First</h3>
            <p className="text-gray-600 dark:text-gray-300">
              We use only the finest ingredients
            </p>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="sm:col-span-2 lg:col-span-1"
        >
          <Card className="p-6 text-center">
            <Users className="h-12 w-12 mx-auto mb-4 text-pink-500" />
            <h3 className="text-xl font-bold mb-2">Community</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Building connections through shared experiences
            </p>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}