import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import axios from "axios";

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

  // Open WhatsApp
  window.open(`https://wa.me/${storeNumber}?text=${encodedMessage}`, "_blank");
}

// utils/formatNumber.js
export const formatNumber = (num: Number) => {
  if (num === null || num === undefined) return "0.00";

  return num.toLocaleString("en-IN");
};

export const handlePayment = async (user, setLoading) => {
  try {
    // 1. Create Razorpay order with user email and selected plan
    const {
      data: { subscription },
    } = await axios.get(
      `${import.meta.env.VITE_DEV_BACKEND_URL}/api/payment/buy-subscription`,
      {
        withCredentials: true, // if using cookies for auth
      }
    );

    // 2. Get Razorpay key
    const {
      data: { key },
    } = await axios.get(
      `${import.meta.env.VITE_DEV_BACKEND_URL}/api/payment/get-key`,
      {
        withCredentials: true, // if using cookies for auth
      }
    );

    // 3. Set up Razorpay options
    const options = {
      key,
      amount: 300000,
      currency: "INR",
      name: "Shop Monk",
      description: "Premium Package",
      image: "/full_logo.png",
      subscription_id: subscription,
      callback_url: `${
        import.meta.env.VITE_DEV_BACKEND_URL
      }/api/payment/verification`,
      prefill: {
        name: user.name || "Customer",
        email: user.email,
      },
      notes: {
        address: "Shop Monk Office",
      },
      theme: {
        color: "#3399cc",
      },
      handler: async function (response) {
        // 4. Verify payment
        await axios
          .post(
            `${import.meta.env.VITE_DEV_BACKEND_URL}/api/payment/verification`,
            {
              razorpay_subscription_id: response.razorpay_subscription_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              email: user.email,
            },
            {
              withCredentials: true, // if using cookies for auth
            }
          )
          .then((res) => {
            if (res.data.success) {
              // Redirect to payment success
              window.location.href = `${
                import.meta.env.VITE_CLIENT_URL
              }/payment-success?referenceid=${res.data.referenceId}`;
            }
          });
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
    setLoading(false)
  } catch (error) {
    console.error("Payment Error:", error);
    alert("Something went wrong during the payment process.");
  }
};

export default handlePayment;

///{
//   minimumFractionDigits: 2,
//   maximumFractionDigits: 2,
// }
