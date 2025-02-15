"use client"

import HeroSection from "@/components/hero-section"
import DailySpecial from "@/components/daily-special"
import SpecialtiesSection from "@/components/specialties-section"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { motion } from "framer-motion"

export default function Home() {
  return (
    <div className="container px-4 py-12 md:py-24">
      <HeroSection />
      <DailySpecial />
      <SpecialtiesSection />

      <motion.div 
        className="mt-24 text-center"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl font-bold mb-6">Visit Us Today</h2>
        <p className="max-w-2xl mx-auto text-gray-600 dark:text-gray-300 mb-8">
          Experience the magic of Kawaii Café in person. We're open daily from 9 AM to 9 PM.
        </p>
        <Button asChild size="lg" className="bg-pink-500 hover:bg-pink-600 group">
          <Link href="/contact" className="flex items-center gap-2">
            Contact Us
            <motion.span
              animate={{ rotate: [0, 15, -15, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              👋
            </motion.span>
          </Link>
        </Button>
      </motion.div>
    </div>
  )
}