import { create } from 'zustand'

interface Driver {
  id: string
  name: string
  avatar: string
  phone: string
  rating: number
  totalDeliveries: number
  latitude: number
  longitude: number
}

interface Order {
  id: string
  status: string
  orderTime: string
  estimatedDelivery: string
  items: Array<{
    id: string
    name: string
    quantity: number
    price: number
  }>
  driver: Driver
  latitude: number
  longitude: number
}

interface DeliveryStore {
  orders: Order[]
  drivers: Driver[]
  setOrders: (orders: Order[]) => void
  setDrivers: (drivers: Driver[]) => void
  updateOrderStatus: (orderId: string, status: string) => void
  updateDriverLocation: (driverId: string, latitude: number, longitude: number) => void
}

// Sample data
const sampleDrivers: Driver[] = [
  {
    id: "d1",
    name: "John Doe",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
    phone: "+1234567890",
    rating: 4.8,
    totalDeliveries: 542,
    latitude: 40.7128,
    longitude: -74.0060
  }
]

const sampleOrders: Order[] = [
  {
    id: "o1",
    status: "Preparing",
    orderTime: new Date().toISOString(),
    estimatedDelivery: new Date(Date.now() + 30 * 60000).toISOString(),
    items: [
      { id: "i1", name: "Rainbow Cloud Latte", quantity: 2, price: 5.99 },
      { id: "i2", name: "Kawaii Cupcake Set", quantity: 1, price: 12.99 }
    ],
    driver: sampleDrivers[0],
    latitude: 40.7580,
    longitude: -73.9855
  }
]

export const useDeliveryStore = create<DeliveryStore>((set) => ({
  orders: sampleOrders,
  drivers: sampleDrivers,
  setOrders: (orders) => set({ orders }),
  setDrivers: (drivers) => set({ drivers }),
  updateOrderStatus: (orderId, status) =>
    set((state) => ({
      orders: state.orders.map((order) =>
        order.id === orderId ? { ...order, status } : order
      ),
    })),
  updateDriverLocation: (driverId, latitude, longitude) =>
    set((state) => ({
      drivers: state.drivers.map((driver) =>
        driver.id === driverId ? { ...driver, latitude, longitude } : driver
      ),
    })),
}))