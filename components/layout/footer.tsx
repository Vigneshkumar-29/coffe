"use client"

import Link from "next/link"
import { Coffee, Facebook, Instagram, Twitter, MapPin, Phone, Mail, Clock, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { useState } from "react"

export default function Footer() {
  const [email, setEmail] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle newsletter subscription
    console.log("Newsletter subscription for:", email)
    setEmail("")
  }

  return (
    <footer className="border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container py-12 px-8">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Coffee className="h-8 w-8 text-pink-500" />
              <div>
                <h2 className="font-bold dark:text-gray-100">Kawaii Café</h2>
                <p className="text-xs text-muted-foreground">Cute & Delicious</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Making your day sweeter with every bite and sip. Join us for a magical experience of kawaii treats and beverages.
            </p>
            <div className="flex items-center space-x-1 text-sm text-muted-foreground">
              Made with <Heart className="h-4 w-4 text-pink-500 mx-1" /> in Tokyo
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold dark:text-gray-100">Quick Links</h3>
            <Separator className="w-12 bg-pink-500" />
            <nav className="space-y-3 text-sm">
              <Link href="/menu" className="block text-muted-foreground hover:text-pink-500 transition-colors">Our Menu</Link>
              <Link href="/about" className="block text-muted-foreground hover:text-pink-500 transition-colors">About Us</Link>
              <Link href="/gallery" className="block text-muted-foreground hover:text-pink-500 transition-colors">Photo Gallery</Link>
              <Link href="/contact" className="block text-muted-foreground hover:text-pink-500 transition-colors">Contact Us</Link>
              <Link href="/privacy" className="block text-muted-foreground hover:text-pink-500 transition-colors">Privacy Policy</Link>
            </nav>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold dark:text-gray-100">Contact Info</h3>
            <Separator className="w-12 bg-pink-500" />
            <div className="space-y-3 text-sm text-muted-foreground">
              <div className="flex items-center space-x-3">
                <MapPin className="h-4 w-4 text-pink-500 flex-shrink-0" />
                <span>123 Kawaii Street, Tokyo, Japan</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-pink-500 flex-shrink-0" />
                <span>+81 123-456-789</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-pink-500 flex-shrink-0" />
                <span>hello@kawaiicafe.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="h-4 w-4 text-pink-500 flex-shrink-0" />
                <div className="space-y-1">
                  <p>Mon-Fri: 9:00 AM - 9:00 PM</p>
                  <p>Sat-Sun: 10:00 AM - 10:00 PM</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold dark:text-gray-100">Newsletter</h3>
            <Separator className="w-12 bg-pink-500" />
            <p className="text-sm text-muted-foreground">
              Subscribe to our newsletter for updates and special offers!
            </p>
            <form onSubmit={handleSubmit} className="space-y-2">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 text-sm rounded-md border bg-background dark:bg-gray-800 dark:border-gray-700"
              />
              <Button type="submit" className="w-full bg-pink-500 hover:bg-pink-600">
                Subscribe
              </Button>
            </form>
            <div className="flex space-x-4 pt-4">
              <Link href="#" className="text-muted-foreground hover:text-pink-500 transition-colors">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-pink-500 transition-colors">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-pink-500 transition-colors">
                <Twitter className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Kawaii Café. All rights reserved.</p>
          <p className="mt-1">
            <Link href="/terms" className="hover:text-pink-500 transition-colors">Terms of Service</Link>
            {" • "}
            <Link href="/privacy" className="hover:text-pink-500 transition-colors">Privacy Policy</Link>
          </p>
        </div>
      </div>
    </footer>
  )
}