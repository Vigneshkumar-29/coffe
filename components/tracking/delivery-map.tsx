"use client"

import { useEffect, useRef, useState } from "react"
import mapboxgl from "mapbox-gl"
import "mapbox-gl/dist/mapbox-gl.css"
import { useTheme } from "next-themes"
import { useDeliveryStore } from "@/hooks/use-delivery-store"

// Initialize Mapbox
mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || "pk.your_token_here"

interface DeliveryMapProps {
  selectedOrder: any
  onOrderSelect: (order: any) => void
}

export default function DeliveryMap({ selectedOrder, onOrderSelect }: DeliveryMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<mapboxgl.Map | null>(null)
  const markersRef = useRef<{ [key: string]: mapboxgl.Marker }>({})
  const { theme } = useTheme()
  const { orders, drivers } = useDeliveryStore()

  useEffect(() => {
    if (!mapContainer.current || map.current) return

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: theme === "dark" 
        ? "mapbox://styles/mapbox/dark-v11"
        : "mapbox://styles/mapbox/light-v11",
      center: [-74.5, 40], // Default center
      zoom: 12
    })

    // Add navigation controls
    map.current.addControl(new mapboxgl.NavigationControl())

    return () => {
      Object.values(markersRef.current).forEach(marker => marker.remove())
      map.current?.remove()
    }
  }, [theme])

  // Update markers when orders or drivers change
  useEffect(() => {
    if (!map.current) return

    // Clear existing markers
    Object.values(markersRef.current).forEach(marker => marker.remove())
    markersRef.current = {}

    // Add order markers
    orders.forEach(order => {
      const el = document.createElement("div")
      el.className = "w-8 h-8 rounded-full bg-pink-500 border-2 border-white flex items-center justify-center text-white font-bold cursor-pointer hover:scale-110 transition-transform"
      el.textContent = "O"

      const marker = new mapboxgl.Marker(el)
        .setLngLat([order.longitude, order.latitude])
        .addTo(map.current!)

      marker.getElement().addEventListener("click", () => {
        onOrderSelect(order)
      })

      markersRef.current[`order-${order.id}`] = marker
    })

    // Add driver markers
    drivers.forEach(driver => {
      const el = document.createElement("div")
      el.className = "w-8 h-8 rounded-full bg-blue-500 border-2 border-white flex items-center justify-center text-white font-bold cursor-pointer hover:scale-110 transition-transform"
      el.textContent = "D"

      const marker = new mapboxgl.Marker(el)
        .setLngLat([driver.longitude, driver.latitude])
        .addTo(map.current!)

      markersRef.current[`driver-${driver.id}`] = marker
    })

    // Fit bounds to include all markers
    const bounds = new mapboxgl.LngLatBounds()
    orders.forEach(order => bounds.extend([order.longitude, order.latitude]))
    drivers.forEach(driver => bounds.extend([driver.longitude, driver.latitude]))

    map.current.fitBounds(bounds, {
      padding: 50,
      maxZoom: 15
    })
  }, [orders, drivers, onOrderSelect])

  // Update map style when theme changes
  useEffect(() => {
    if (!map.current) return
    
    map.current.setStyle(
      theme === "dark"
        ? "mapbox://styles/mapbox/dark-v11"
        : "mapbox://styles/mapbox/light-v11"
    )
  }, [theme])

  return (
    <div ref={mapContainer} className="w-full h-full" />
  )
}