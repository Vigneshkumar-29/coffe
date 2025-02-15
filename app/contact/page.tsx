"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { toast } from "sonner"
import { motion } from "framer-motion"
import { MapPin, Phone, Mail, Send } from "lucide-react"
import PageHeader from "@/components/page-header"
import ContactInfo from "@/components/contact-info"

interface FormData {
  name: string
  email: string
  message: string
  subscribe: boolean
}

const initialFormData: FormData = {
  name: "",
  email: "",
  message: "",
  subscribe: false
}

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState<FormData>(initialFormData)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      toast.success("Message sent successfully! We'll get back to you soon.", {
        description: "Thank you for contacting Kawaii Café!"
      })
      
      // Reset form
      setFormData(initialFormData)
    } catch (error) {
      toast.error("Failed to send message. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | boolean,
    field: keyof FormData
  ) => {
    const value = field === 'subscribe' ? e : e.target.value
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  return (
    <div className="container px-4 py-12 md:py-24">
      <PageHeader
        title="Contact Us"
        description="We'd love to hear from you! Send us a message and we'll respond as soon as possible."
      />

      <div className="grid gap-12 md:grid-cols-2 mt-12">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">Name</label>
                <Input
                  id="name"
                  required
                  placeholder="Your name"
                  value={formData.name}
                  onChange={(e) => handleChange(e, 'name')}
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">Email</label>
                <Input
                  id="email"
                  type="email"
                  required
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={(e) => handleChange(e, 'email')}
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium">Message</label>
                <Textarea
                  id="message"
                  required
                  placeholder="How can we help you?"
                  className="min-h-[150px]"
                  value={formData.message}
                  onChange={(e) => handleChange(e, 'message')}
                />
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="subscribe"
                  checked={formData.subscribe}
                  onCheckedChange={(checked) => handleChange(checked, 'subscribe')}
                />
                <label
                  htmlFor="subscribe"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Subscribe to our newsletter
                </label>
              </div>
              <Button 
                type="submit" 
                className="w-full bg-pink-500 hover:bg-pink-600"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  "Sending..."
                ) : (
                  <>
                    Send Message
                    <Send className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </form>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="space-y-8">
            <ContactInfo
              icon={MapPin}
              title="Visit Us"
              content="123 Kawaii Street, Anime District, Tokyo, Japan"
            />
            <ContactInfo
              icon={Phone}
              title="Call Us"
              content="+81 123-456-789"
            />
            <ContactInfo
              icon={Mail}
              title="Email Us"
              content="hello@kawaiicafe.com"
            />
          </div>

          <Card className="mt-8 p-6 bg-gradient-to-br from-pink-100 to-purple-100 dark:from-pink-950/50 dark:to-purple-950/50">
            <h3 className="text-lg font-semibold mb-2 dark:text-gray-100">Opening Hours</h3>
            <div className="space-y-2 text-gray-600 dark:text-gray-300">
              <p>Monday - Friday: 9:00 AM - 9:00 PM</p>
              <p>Saturday - Sunday: 10:00 AM - 10:00 PM</p>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}