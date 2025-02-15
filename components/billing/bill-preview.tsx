"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Coffee, Mail, Printer, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { format } from "date-fns"
import { toast } from "sonner"
import { downloadPDF } from "@/lib/pdf-generator"
import { sendBillEmail } from "@/lib/email"
import { printBill } from "@/lib/print"
import { type Bill } from "@/types/billing"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"

interface BillPreviewProps {
  bill: Bill
}

export default function BillPreview({ bill }: BillPreviewProps) {
  const [emailAddress, setEmailAddress] = useState("")
  const [isSending, setIsSending] = useState(false)

  const handleDownloadPDF = async () => {
    try {
      await downloadPDF(bill)
      toast.success("Bill downloaded successfully!")
    } catch (error) {
      toast.error("Failed to download bill")
    }
  }

  const handleEmailBill = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSending(true)
    try {
      const result = await sendBillEmail(bill, emailAddress)
      if (result.success) {
        toast.success(result.message)
        setEmailAddress("")
      } else {
        toast.error(result.message)
      }
    } catch (error) {
      toast.error("Failed to send bill")
    } finally {
      setIsSending(false)
    }
  }

  const handlePrintBill = () => {
    try {
      printBill(bill)
    } catch (error) {
      toast.error("Failed to print bill")
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-2xl mx-auto"
    >
      <Card className="p-8 print:shadow-none">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Coffee className="h-8 w-8 text-pink-500" />
            <div>
              <h1 className="text-2xl font-bold">Kawaii Café</h1>
              <p className="text-sm text-muted-foreground">Cute & Delicious</p>
            </div>
          </div>
          <div className="text-right">
            <p className="font-semibold">Invoice #{bill.invoiceNumber}</p>
            <p className="text-sm text-muted-foreground">
              {format(new Date(bill.date), "PPP")}
            </p>
          </div>
        </div>

        <div className="grid gap-8 mb-8">
          <div>
            <h2 className="font-semibold mb-2">Bill To:</h2>
            <p>{bill.customerName}</p>
            <p>{bill.customerEmail}</p>
          </div>
        </div>

        <div className="border rounded-lg overflow-hidden mb-8">
          <table className="w-full">
            <thead className="bg-muted">
              <tr>
                <th className="px-4 py-2 text-left">Item</th>
                <th className="px-4 py-2 text-center">Qty</th>
                <th className="px-4 py-2 text-right">Price</th>
                <th className="px-4 py-2 text-right">Total</th>
              </tr>
            </thead>
            <tbody>
              {bill.items.map((item, index) => (
                <tr key={index} className="border-t">
                  <td className="px-4 py-2">{item.name}</td>
                  <td className="px-4 py-2 text-center">{item.quantity}</td>
                  <td className="px-4 py-2 text-right">${item.price.toFixed(2)}</td>
                  <td className="px-4 py-2 text-right">
                    ${(item.quantity * item.price).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="space-y-2 text-right mb-8">
          <div className="flex justify-between">
            <span>Subtotal:</span>
            <span>${bill.subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Tax ({(bill.taxRate * 100).toFixed(2)}%):</span>
            <span>${bill.taxAmount.toFixed(2)}</span>
          </div>
          <Separator className="my-2" />
          <div className="flex justify-between font-bold text-lg">
            <span>Total:</span>
            <span>${bill.total.toFixed(2)}</span>
          </div>
        </div>

        <div className="space-y-4 mb-8">
          <div>
            <h3 className="font-semibold mb-1">Payment Method</h3>
            <p className="text-sm text-muted-foreground">{bill.paymentMethod}</p>
          </div>
          <div>
            <h3 className="font-semibold mb-1">Terms & Conditions</h3>
            <p className="text-sm text-muted-foreground">
              Payment is due within 30 days. Please include invoice number on your check.
            </p>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="text-center text-sm text-muted-foreground mb-8">
          <p>Kawaii Café</p>
          <p>123 Kawaii Street, Tokyo, Japan</p>
          <p>Tel: +81 123-456-789 | Email: hello@kawaiicafe.com</p>
        </div>

        <div className="flex gap-4 print:hidden">
          <Button
            onClick={handleDownloadPDF}
            className="flex-1 bg-pink-500 hover:bg-pink-600"
          >
            <Download className="mr-2 h-4 w-4" />
            Download PDF
          </Button>
          
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="flex-1">
                <Mail className="mr-2 h-4 w-4" />
                Email Bill
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Send Bill via Email</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleEmailBill} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter email address"
                    value={emailAddress}
                    onChange={(e) => setEmailAddress(e.target.value)}
                    required
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-pink-500 hover:bg-pink-600"
                  disabled={isSending}
                >
                  {isSending ? "Sending..." : "Send Bill"}
                </Button>
              </form>
            </DialogContent>
          </Dialog>

          <Button
            onClick={handlePrintBill}
            variant="outline"
            className="flex-1"
          >
            <Printer className="mr-2 h-4 w-4" />
            Print Bill
          </Button>
        </div>
      </Card>
    </motion.div>
  )
}