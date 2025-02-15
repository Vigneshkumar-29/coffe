import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
}

interface CartStore {
  items: CartItem[]
  addItem: (item: Omit<CartItem, 'quantity'>) => void
  removeItem: (item: Pick<CartItem, 'id'>) => void
  clearCart: () => void
  getItemQuantity: (id: string) => number
  total: number
}

export const useCart = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      total: 0,
      addItem: (item) => {
        set((state) => {
          const existingItem = state.items.find((i) => i.id === item.id)
          const updatedItems = existingItem
            ? state.items.map((i) =>
                i.id === item.id
                  ? { ...i, quantity: i.quantity + 1 }
                  : i
              )
            : [...state.items, { ...item, quantity: 1 }]
          
          const total = updatedItems.reduce(
            (sum, item) => sum + item.price * item.quantity,
            0
          )
          
          return { items: updatedItems, total }
        })
      },
      removeItem: (item) => {
        set((state) => {
          const existingItem = state.items.find((i) => i.id === item.id)
          if (!existingItem) return state
          
          const updatedItems = existingItem.quantity > 1
            ? state.items.map((i) =>
                i.id === item.id
                  ? { ...i, quantity: i.quantity - 1 }
                  : i
              )
            : state.items.filter((i) => i.id !== item.id)
          
          const total = updatedItems.reduce(
            (sum, item) => sum + item.price * item.quantity,
            0
          )
          
          return { items: updatedItems, total }
        })
      },
      clearCart: () => set({ items: [], total: 0 }),
      getItemQuantity: (id) => {
        const item = get().items.find((i) => i.id === id)
        return item?.quantity || 0
      },
    }),
    {
      name: 'cart-storage',
    }
  )
)