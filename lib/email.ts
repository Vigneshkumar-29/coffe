import { type Bill } from "@/types/billing"

export function validateEmail(email: string): boolean {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  return emailRegex.test(email)
}

export function generateEmailTemplate(bill: Bill): string {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="text-align: center; padding: 20px;">
        <h1 style="color: #333;">Kawaii Café</h1>
        <p style="color: #666;">Your Bill Details</p>
      </div>
      
      <div style="padding: 20px;">
        <p><strong>Invoice #:</strong> ${bill.invoiceNumber}</p>
        <p><strong>Date:</strong> ${new Date(bill.date).toLocaleDateString()}</p>
        <p><strong>Amount:</strong> $${bill.total.toFixed(2)}</p>
      </div>
      
      <div style="padding: 20px;">
        <p>Thank you for your business!</p>
        <p>For any questions, please contact us at support@kawaiicafe.com</p>
      </div>
    </div>
  `
}

export async function sendBillEmail(bill: Bill, email: string): Promise<{ success: boolean; message: string }> {
  try {
    if (!validateEmail(email)) {
      return {
        success: false,
        message: "Please enter a valid email address"
      }
    }

    // In a real application, this would integrate with an email service
    // For demo purposes, we'll simulate a successful email send
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    return {
      success: true,
      message: `Bill ${bill.invoiceNumber} sent to ${email}`
    }
  } catch (error) {
    console.error("Email send error:", error)
    return {
      success: false,
      message: "Failed to send email. Please try again."
    }
  }
}