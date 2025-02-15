import { type Bill } from "@/types/billing"

export function printBill(bill: Bill): void {
  const printWindow = window.open("", "_blank")
  if (!printWindow) return

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>Bill #${bill.invoiceNumber}</title>
        <style>
          @media print {
            @page {
              size: A4;
              margin: 20mm;
            }
            body {
              -webkit-print-color-adjust: exact;
              print-color-adjust: exact;
            }
            .no-print {
              display: none !important;
            }
          }
          * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
          }
          body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            background: #fff;
            padding: 20px;
          }
          .header {
            text-align: center;
            margin-bottom: 30px;
            padding-bottom: 20px;
            border-bottom: 2px solid #f0f0f0;
          }
          .header h1 {
            color: #ff4081;
            margin-bottom: 5px;
          }
          .bill-info {
            margin-bottom: 30px;
          }
          .bill-info p {
            margin-bottom: 10px;
          }
          .items-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 30px;
          }
          .items-table th,
          .items-table td {
            padding: 12px;
            border: 1px solid #ddd;
            text-align: left;
          }
          .items-table th {
            background-color: #f8f9fa;
            font-weight: bold;
          }
          .items-table tr:nth-child(even) {
            background-color: #f8f9fa;
          }
          .totals {
            margin-top: 30px;
            text-align: right;
          }
          .totals p {
            margin-bottom: 10px;
          }
          .footer {
            margin-top: 50px;
            padding-top: 20px;
            border-top: 2px solid #f0f0f0;
            text-align: center;
            color: #666;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>Kawaii Café</h1>
          <p>123 Kawaii Street, Tokyo, Japan</p>
          <p>Tel: +81 123-456-789 | Email: hello@kawaiicafe.com</p>
        </div>
        
        <div class="bill-info">
          <p><strong>Invoice #:</strong> ${bill.invoiceNumber}</p>
          <p><strong>Date:</strong> ${new Date(bill.date).toLocaleDateString()}</p>
          <p><strong>Customer:</strong> ${bill.customerName}</p>
          <p><strong>Email:</strong> ${bill.customerEmail}</p>
        </div>
        
        <table class="items-table">
          <thead>
            <tr>
              <th>Item</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            ${bill.items.map(item => `
              <tr>
                <td>${item.name}</td>
                <td>${item.quantity}</td>
                <td>$${item.price.toFixed(2)}</td>
                <td>$${(item.quantity * item.price).toFixed(2)}</td>
              </tr>
            `).join("")}
          </tbody>
        </table>
        
        <div class="totals">
          <p><strong>Subtotal:</strong> $${bill.subtotal.toFixed(2)}</p>
          <p><strong>Tax (${(bill.taxRate * 100).toFixed(2)}%):</strong> $${bill.taxAmount.toFixed(2)}</p>
          <p><strong>Total:</strong> $${bill.total.toFixed(2)}</p>
        </div>

        <div class="footer">
          <p>Thank you for your business!</p>
          <p>Please keep this bill for your records.</p>
        </div>
      </body>
    </html>
  `

  printWindow.document.write(html)
  printWindow.document.close()
  
  // Wait for resources to load before printing
  printWindow.onload = () => {
    printWindow.print()
  }
}