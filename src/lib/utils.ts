import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// utils/whatsapp.ts
export function sendOrderToWhatsApp(orderData: any, storeNumber: string) {
  // Build order message
  const itemsText = orderData.items
    .map(
      (item: any, idx: number) =>
        `${idx + 1}. ${item.name} (x${item.quantity}) - ₹${
          item.price * item.quantity
        }`
    )
    .join("\n");

  const message = `
📦 *New Order Received*  
----------------------  
🧾 Order Number: #${orderData.orderNumber}  
👤 Name: ${orderData.customerName}  
📧 Email: ${orderData.customerEmail}  
📞 Phone: ${orderData.customerMobileNumber}  
🏠 Address: ${orderData.customerAddress}  

🛒 *Items:*  
${itemsText}  

💰 *Total Amount:* ₹${orderData.totalAmount}  

_Status: ${orderData.status}_
`;

  // Encode message for URL
  const encodedMessage = encodeURIComponent(message);

  console.log(encodedMessage, storeNumber);
  

  // Open WhatsApp
  window.open(`https://wa.me/${storeNumber}?text=${encodedMessage}`, "_blank");
}

// utils/formatNumber.js
export const formatNumber = (num: Number) => {
  if (num === null || num === undefined) return "0.00";

  return num.toLocaleString("en-IN");
};

///{
  //   minimumFractionDigits: 2,
  //   maximumFractionDigits: 2,
  // }

