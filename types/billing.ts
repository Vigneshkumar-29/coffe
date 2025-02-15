export interface BillItem {
  name: string
  quantity: number
  price: number
}

export interface Bill {
  invoiceNumber: string
  date: string
  customerName: string
  customerEmail: string
  items: BillItem[]
  subtotal: number
  taxRate: number
  taxAmount: number
  total: number
  paymentMethod: string
}