import { create } from "zustand";
import { toast } from "sonner";
import { useStoreManager } from "./useStoreManager";
import axios from "axios";

export interface OrderItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl?: string;
  storeId: string;
  storeName: string;
  size: string;
}

export interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  customerMobileNumber: string;
  alternateMobileNUmber?: string;
  customerAddress: string;
  items: OrderItem[];
  totalAmount: number;
  status: "PENDING" | "CONFIRMED" | "SHIPPED" | "DELIVERED" | "CANCELLED";
  createdAt: string;
  updatedAt: string;
  storeId: string;
}

interface OrdersState {
  orders: Order[];
  loading: boolean;
  initialized: boolean;
  initializeData: (storeId?: string) => Promise<void>;
  createOrder: (
    orderData: Omit<Order, "id" | "createdAt" | "updatedAt">
  ) => Promise<Order | null>;
  updateOrderStatus: (
    orderId: string,
    status: Order["status"]
  ) => Promise<void>;
  getStoreOrders: (storeId: string) => Promise<void>;
  getOrderById: (orderId: string) => Order | undefined;
  getOrderStats: (storeId?: string) => {
    totalOrders: number;
    totalRevenue: number;
    pendingOrders: number;
  };
}

const API_URL = import.meta.env.VITE_DEV_BACKEND_URL; // adjust if different
// "http://localhost:5000/api/order";

export const useOrdersStore = create<OrdersState>((set, get) => ({
  orders: [],
  loading: true,
  initialized: false,

  // Fetch all orders OR store-specific orders
  initializeData: async (storeId?: string) => {
    try {
      set({ loading: true });
      const token = localStorage.getItem("token");

      const { data } = await axios.post(
        `${API_URL}/api/order/get`,
        storeId ? { storeId } : {},
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`, // middleware reads this
          },
        }
      );

      set({
        orders: data.orders || [],
        loading: false,
        initialized: true,
      });
    } catch (err) {
      console.error("Error fetching orders:", err);
      set({ loading: false });
    }
  },

  // Create new order
  createOrder: async (orderData) => {
    try {
      const { data: newOrder } = await axios.post(
        `${API_URL}/api/order`,
        orderData
      );

      if (!newOrder || !newOrder.id) {
        toast.error("Failed to create order");
        return null;
      }

      // Update inventory for each product
      orderData.items.forEach((item) => {
        useStoreManager
          .getState()
          .updateProductInventory(item.productId, item.quantity);
      });

      set({ orders: [...get().orders, newOrder] });
      toast.success("Order placed successfully!");
      return newOrder;
    } catch (err) {
      console.error("Error creating order:", err);
      toast.error("Error creating order");
      return null;
    }
  },

  // Update order status
  updateOrderStatus: async (orderId, status) => {
    try {
          const token =  localStorage.getItem("token");
      const { data: updatedOrder } = await axios.put(
        `${API_URL}/api/order/${orderId}/status`,
        { status },
        {
          withCredentials: true,
          headers: {
          Authorization: `Bearer ${token}`, // middleware reads this
        },
        }
      );

      // Update only the matching order
      set((state) => ({
        orders: state.orders.map((order) =>
          order.id === orderId ? { ...order, ...updatedOrder } : order
        ),
      }));

      toast.success(`Order status updated to ${status}`);
    } catch (err) {
      console.error("Error updating order status:", err);
      toast.error("Failed to update order status");
    }
  },

  // Fetch store-specific orders
  getStoreOrders: async (storeId) => {
    try {
          const token =  localStorage.getItem("token");

      const { data } = await axios.post(
        `${API_URL}/api/order/get`,
        { storeId },
        {
          withCredentials: true,
          headers: {
          Authorization: `Bearer ${token}`, // middleware reads this
        },
        }
      );

      set({ orders: data || [] });

      return data;
    } catch (err) {
      console.error("Error fetching store orders:", err);
    }
  },

  getOrderById: (orderId) => {
    return get().orders.find((order) => order.id === orderId);
  },

  getOrderStats: (storeId) => {
    const orders = storeId
      ? get().orders.filter((order) => order.storeId === storeId)
      : get().orders;

    return {
      totalOrders: orders.length,
      totalRevenue: orders.reduce((sum, order) => sum + order.totalAmount, 0),
      pendingOrders: orders.filter((order) => order.status === "PENDING")
        .length,
    };
  },
}));

// Initialize data automatically when module loads
if (typeof window !== "undefined") {
  useOrdersStore.getState().initializeData();
}
