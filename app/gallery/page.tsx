"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import PageHeader from "@/components/page-header"

const galleryItems = [
  {
    src: "https://images.unsplash.com/photo-1555507036-ab1f4038808a",
    title: "Rainbow Latte Art",
    description: "Our signature colorful latte creation"
  },
  {
    src: "https://images.unsplash.com/photo-1516747822672-5667bfc4b7e4",
    title: "Kawaii Cupcakes",
    description: "Adorable animal-themed cupcakes"
  },
  {
    src: "https://images.unsplash.com/photo-1578985545062-69928b1d9587",
    title: "Magical Parfait",
    description: "Layered dessert with fresh fruits"
  },
  {
    src: "https://images.unsplash.com/photo-1534766555764-ce878a5e3a2b",
    title: "Character Cookies",
    description: "Hand-decorated character cookies"
  },
  {
    src: "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e",
    title: "Bubble Tea Collection",
    description: "Assorted bubble tea flavors"
  },
  {
    src: "https://images.unsplash.com/photo-1571115177098-24ec42ed204d",
    title: "Special Cake",
    description: "Celebration cakes with unique designs"
  }
]

export default function GalleryPage() {
  const [selectedImage, setSelectedImage] = useState<typeof galleryItems[0] | null>(null)

  return (
    <div className="container px-4 py-12 md:py-24">
      <PageHeader
        title="Our Gallery"
        description="Take a peek at our magical creations"
      />

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {galleryItems.map((item, index) => (
          <motion.div
            key={item.src}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            onClick={() => setSelectedImage(item)}
            className="cursor-pointer group"
          >
            <div className="relative aspect-square overflow-hidden rounded-lg">
              <Image
                src={item.src}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex items-center justify-center">
                <h3 className="text-white text-xl font-bold">{item.title}</h3>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>{selectedImage?.title}</DialogTitle>
            <DialogDescription>{selectedImage?.description}</DialogDescription>
          </DialogHeader>
          {selectedImage && (
            <div className="relative aspect-video mt-4">
              <Image
                src={selectedImage.src}
                alt={selectedImage.title}
                fill
                className="object-cover rounded-lg"
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}