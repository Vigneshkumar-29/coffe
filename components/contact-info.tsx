import { motion } from "framer-motion"
import { LucideIcon } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

interface ContactInfoProps {
  icon: LucideIcon
  title: string
  content: string
}

export default function ContactInfo({ icon: Icon, title, content }: ContactInfoProps) {
  return (
    <Card>
      <CardContent className="flex items-start space-x-4 p-6">
        <div className="rounded-full bg-pink-100 p-3">
          <Icon className="h-6 w-6 text-pink-500" />
        </div>
        <div>
          <h3 className="font-semibold">{title}</h3>
          <p className="text-gray-600">{content}</p>
        </div>
      </CardContent>
    </Card>
  )
}