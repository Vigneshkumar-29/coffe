import { motion } from "framer-motion"

interface PageHeaderProps {
  title: string
  description: string
}

export default function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <motion.div 
      className="text-center space-y-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-500">
        {title}
      </h1>
      <p className="max-w-[600px] mx-auto text-gray-600 md:text-xl dark:text-gray-300">
        {description}
      </p>
    </motion.div>
  )
}