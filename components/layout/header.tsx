"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Coffee, Menu, Moon, Sun, Phone, Clock, Receipt } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { usePathname } from "next/navigation"

const navItems = [
  { href: "/", label: "Home" },
  { href: "/menu", label: "Menu" },
  { href: "/about", label: "About" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Contact" },
  { href: "/billing", label: "Billing", icon: Receipt },
]

export default function Header() {
  const { theme, setTheme } = useTheme()
  const pathname = usePathname()

  return (
    <>
      <div className="bg-pink-50 dark:bg-pink-950/20">
        <div className="container flex items-center justify-between py-2 text-sm px-8">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Phone className="h-4 w-4 text-pink-500" />
              <span className="dark:text-gray-300">+81 123-456-789</span>
            </div>
            <div className="hidden md:flex items-center space-x-2">
              <Clock className="h-4 w-4 text-pink-500" />
              <span className="dark:text-gray-300">Open Daily: 9AM - 9PM</span>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          >
            <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
        </div>
      </div>
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-20 items-center justify-between px-8">
          <Link href="/" className="flex items-center space-x-3">
            <div className="relative">
              <Coffee className="h-8 w-8 text-pink-500" />
              <motion.div
                className="absolute -right-1 -top-1 h-3 w-3 rounded-full bg-pink-200 dark:bg-pink-400"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>
            <div>
              <h1 className="text-xl font-bold dark:text-gray-100">Kawaii Café</h1>
              <p className="text-xs text-muted-foreground">Cute & Delicious</p>
            </div>
          </Link>

          <div className="hidden md:flex md:flex-1 md:justify-center">
            <NavigationMenu>
              <NavigationMenuList className="space-x-2">
                {navItems.map((item) => (
                  <NavigationMenuItem key={item.href}>
                    <Link href={item.href} legacyBehavior passHref>
                      <NavigationMenuLink 
                        className={navigationMenuTriggerStyle()}
                        active={pathname === item.href}
                      >
                        <span className="flex items-center gap-2">
                          {item.icon && <item.icon className="h-4 w-4" />}
                          {item.label}
                        </span>
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <div className="flex items-center space-x-3 mb-8">
                <Coffee className="h-6 w-6 text-pink-500" />
                <span className="font-bold dark:text-gray-100">Kawaii Café</span>
              </div>
              <nav className="flex flex-col gap-4">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-2 px-2 py-1 text-lg transition-colors dark:text-gray-300 ${
                      pathname === item.href
                        ? "text-pink-500 dark:text-pink-500"
                        : "hover:text-pink-500 dark:hover:text-pink-500"
                    }`}
                  >
                    {item.icon && <item.icon className="h-4 w-4" />}
                    {item.label}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </header>
    </>
  )
}