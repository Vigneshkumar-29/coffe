import { jsPDF } from "jspdf"
import { type Bill } from "@/types/billing"
import { format } from "date-fns"

export async function generatePDF(bill: Bill): Promise<Blob> {
  // Use A4 format and unit in mm
  const doc = new jsPDF({
    format: "a4",
    unit: "mm"
  })
  
  // Set margins
  const margin = 20
  let yPos = margin

  // Add company header
  doc.setFontSize(24)
  doc.setTextColor(33, 33, 33)
  doc.text("Kawaii Café", margin, yPos)
  
  // Add company info
  yPos += 10
  doc.setFontSize(10)
  doc.setTextColor(100, 100, 100)
  doc.text("123 Kawaii Street, Tokyo, Japan", margin, yPos)
  
  // Add bill details
  yPos += 20
  doc.setFontSize(12)
  doc.setTextColor(33, 33, 33)
  const details = [
    `Invoice #: ${bill.invoiceNumber}`,
    `Date: ${format(new Date(bill.date), "PPP")}`,
    `Customer: ${bill.customerName}`,
    `Email: ${bill.customerEmail}`
  ]
  
  details.forEach(detail => {
    doc.text(detail, margin, yPos)
    yPos += 7
  })
  
  // Add items table
  yPos += 10
  const tableHeaders = ["Item", "Qty", "Price", "Total"]
  const columnWidths = [80, 20, 30, 30]
  const startX = margin
  
  // Draw table header
  doc.setFillColor(245, 245, 245)
  doc.rect(startX, yPos - 5, doc.internal.pageSize.width - (margin * 2), 10, "F")
  doc.setFont("helvetica", "bold")
  
  let xPos = startX
  tableHeaders.forEach((header, index) => {
    doc.text(header, xPos, yPos)
    xPos += columnWidths[index]
  })
  
  // Draw table rows
  doc.setFont("helvetica", "normal")
  yPos += 10
  bill.items.forEach(item => {
    if (yPos > doc.internal.pageSize.height - margin) {
      doc.addPage()
      yPos = margin
    }
    
    xPos = startX
    doc.text(item.name, xPos, yPos)
    xPos += columnWidths[0]
    doc.text(item.quantity.toString(), xPos, yPos)
    xPos += columnWidths[1]
    doc.text(`$${item.price.toFixed(2)}`, xPos, yPos)
    xPos += columnWidths[2]
    doc.text(`$${(item.quantity * item.price).toFixed(2)}`, xPos, yPos)
    yPos += 7
  })
  
  // Add totals
  yPos += 10
  const totals = [
    `Subtotal: $${bill.subtotal.toFixed(2)}`,
    `Tax (${(bill.taxRate * 100).toFixed(2)}%): $${bill.taxAmount.toFixed(2)}`,
    `Total: $${bill.total.toFixed(2)}`
  ]
  
  doc.setFont("helvetica", "bold")
  totals.forEach(total => {
    doc.text(total, doc.internal.pageSize.width - margin - 50, yPos, { align: "right" })
    yPos += 7
  })
  
  return doc.output("blob")
}

export async function downloadPDF(bill: Bill): Promise<void> {
  try {
    const blob = await generatePDF(bill)
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = `kawaii-cafe-bill-${bill.invoiceNumber}.pdf`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  } catch (error) {
    console.error("PDF generation error:", error)
    throw new Error("Failed to generate PDF")
  }
}