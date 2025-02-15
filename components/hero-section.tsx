"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Heart, SparkleIcon } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useState } from "react"

export default function HeroSection() {
  const [likes, setLikes] = useState(128)
  const [hasLiked, setHasLiked] = useState(false)

  const handleLike = () => {
    if (!hasLiked) {
      setLikes(prev => prev + 1)
      setHasLiked(true)
    }
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="grid gap-12 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]"
    >
      <div className="flex flex-col justify-center space-y-8">
        <div className="space-y-4">
          <motion.h1 
            className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-500"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            Welcome to Our Kawaii Café
          </motion.h1>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex items-center gap-4"
          >
            <p className="max-w-[600px] text-gray-600 md:text-xl dark:text-gray-300">
              Discover our delightful selection of pastries and drinks
            </p>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={handleLike}
              className={`transition-all ${hasLiked ? 'text-pink-500' : 'text-gray-400'}`}
            >
              <Heart className={`h-6 w-6 ${hasLiked ? 'fill-current' : ''}`} />
              <span className="ml-2">{likes}</span>
            </Button>
          </motion.div>
        </div>
        <motion.div 
          className="flex flex-col gap-4 sm:flex-row"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Button asChild size="lg" className="bg-pink-500 hover:bg-pink-600 group">
            <Link href="/menu" className="flex items-center gap-2">
              Order Now
              <SparkleIcon className="h-4 w-4 transition-transform group-hover:rotate-12" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/menu">View Menu</Link>
          </Button>
        </motion.div>
      </div>
      <motion.div 
        className="relative"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 }}
      >
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/thumb-1920-1339434-sV9Citg35c5wA6SDTQ92kjQBidBk1A.png"
          alt="Kawaii mascot enjoying pastry"
          width={600}
          height={600}
          className="rounded-full object-cover object-center shadow-lg hover:scale-105 transition-transform duration-300"
        />
        <motion.div 
          className="absolute -bottom-4 -left-4 bg-white rounded-full p-4 shadow-lg"
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <SparkleIcon className="h-8 w-8 text-yellow-400" />
        </motion.div>
      </motion.div>
    </motion.div>
  )
}