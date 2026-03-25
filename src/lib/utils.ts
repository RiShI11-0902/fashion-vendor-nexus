import { clsx, type ClassValue } from "clsx";

declare global {
  interface Window {
    Razorpay: new (options: Record<string, unknown>) => { open: () => void };
  }
}
import { twMerge } from "tailwind-merge";
import axios from "axios";
import { toast } from "sonner";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const handleGoogleLogin = () => {
  // setLoading({ isLogin: true, state: true });
  window.location.href = `${import.meta.env.VITE_DEV_BACKEND_URL}/api/auth/google`;
};

// utils/whatsapp.ts
export function sendOrderToWhatsApp(orderData: any, storeNumber: string) {
  // Build order message
  const itemsText = orderData?.items
    .map(
      (item: any, idx: number) =>
        `${idx + 1}. ${item.name} (x${item.quantity}) - ₹${
          item.price * item.quantity
        }`,
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

export const handlePayment = async (user, onComplete, plan) => {
  try {
    // 1. Create Razorpay order with user email and selected plan
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please Login First");
      return;
    }
    if (user.plan) {
      toast.error("You already have one current subscription active");
      return;
    }
    const {
      data: { subscription },
    } = await axios.post(
      `${import.meta.env.VITE_DEV_BACKEND_URL}/api/payment/buy-subscription`,
      { plan: plan },
      {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`, // middleware reads this
        },
      },
    );

    // 2. Get Razorpay key
    const {
      data: { key },
    } = await axios.get(
      `${import.meta.env.VITE_DEV_BACKEND_URL}/api/payment/get-key`,
      {
        headers: {
          Authorization: `Bearer ${token}`, // middleware reads this
        }, // if using cookies for auth
      },
    );

    // 3. Set up Razorpay options
    const options = {
      key,
      amount:
        plan == "Starter"
          ? import.meta.env.VITE_STARTER_PLAN_AMOUNT
          : import.meta.env.VITE_PREMIUM_PLAN_AMOUNT,
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
        userId: user.id,
        planName: plan,
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
              headers: {
                Authorization: `Bearer ${token}`, // middleware reads this
              }, // if using cookies for auth
            },
          )
          .then((res) => {
            if (res.data.success) {
              // Redirect to payment success
              window.location.href = `${
                import.meta.env.VITE_CLIENT_URL
              }/payment-success?razorpay-payment-id=${
                res.data.razorpay_payment_id
              }`;
            }
          });
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  } catch (error) {
    toast.error(
      error?.response?.data?.message ||
        "Error occurred while creating subscription",
    );
    throw error;
  } finally {
    try {
      if (typeof onComplete === "function") onComplete();
    } catch (cbErr) {
      console.error("onComplete callback error:", cbErr);
    }
  }
};

export const handleOrder = async (user, setLoading, isOneTime) => {
  try {
    // 1. Create Razorpay order with user email
    const token = localStorage.getItem("token");
    setLoading(true);
    const {
      data: { order },
    } = await axios.get(
      `${import.meta.env.VITE_DEV_BACKEND_URL}/api/payment/buy-images`,
      {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    // 2. Get Razorpay key
    const {
      data: { key },
    } = await axios.get(
      `${import.meta.env.VITE_DEV_BACKEND_URL}/api/payment/get-key`,
      {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        }, // if using cookies for auth
      },
    );

    // 3. Set up Razorpay options
    const options = {
      key,
      amount: order.amount,
      currency: "INR",
      name: "Shop Monk",
      description: "Premium Package",
      image: "/full_logo.png",
      order_id: order.id,
      callback_url: `${
        import.meta.env.VITE_DEV_BACKEND_URL
      }/api/payment/verification`,
      prefill: {
        name: user.name || "Customer",
        email: user.email,
      },
      notes: {
        address: "Shop Monk Office",
        userId: user.id,
        planName: "AI_PACK",
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
              razorpay_order_id: response.razorpay_order_id,
              email: user.email,
            },
            {
              withCredentials: true,
              headers: {
                Authorization: `Bearer ${token}`,
              }, // if using cookies for auth
            },
          )
          .then((res) => {
            if (res.data.success) {
              // Redirect to payment success
              window.location.href = `${
                import.meta.env.VITE_CLIENT_URL
              }/payment-success?razorpay-payment-id=${
                res.data.razorpay_payment_id
              }`;
            }
          });
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
    setLoading(false);
  } catch (error) {
    toast.error(
      error?.response?.data?.message ||
        "Error occurred while creating the order",
    );
    setLoading(false);
  }
};
