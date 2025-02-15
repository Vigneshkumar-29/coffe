import { create } from "zustand"
import { persist } from "zustand/middleware"

interface PaymentMethod {
  id: string
  type: string
  last4: string
  expMonth: number
  expYear: number
  brand: string
}

interface Transaction {
  id: string
  date: string
  amount: number
  description: string
  status: string
  type: "debit" | "credit"
}

interface Plan {
  id: string
  name: string
  status: string
  renewalDate: string
}

interface BillingStore {
  currentPlan: Plan
  paymentMethods: PaymentMethod[]
  transactions: Transaction[]
  addPaymentMethod: (method: PaymentMethod) => void
  removePaymentMethod: (id: string) => void
  updateSubscription: (planId: string) => Promise<void>
}

export const useBillingStore = create<BillingStore>()(
  persist(
    (set) => ({
      currentPlan: {
        id: "basic",
        name: "Basic Plan",
        status: "active",
        renewalDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
      },
      paymentMethods: [],
      transactions: [
        {
          id: "t1",
          date: new Date().toISOString(),
          amount: 9.99,
          description: "Monthly Subscription - Basic Plan",
          status: "completed",
          type: "debit"
        }
      ],
      addPaymentMethod: (method) =>
        set((state) => ({
          paymentMethods: [...state.paymentMethods, method]
        })),
      removePaymentMethod: (id) =>
        set((state) => ({
          paymentMethods: state.paymentMethods.filter((m) => m.id !== id)
        })),
      updateSubscription: async (planId) => {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000))
        
        set((state) => ({
          currentPlan: {
            ...state.currentPlan,
            id: planId,
            name: `${planId.charAt(0).toUpperCase() + planId.slice(1)} Plan`,
            renewalDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
          }
        }))
      }
    }),
    {
      name: "billing-storage"
    }
  )
)