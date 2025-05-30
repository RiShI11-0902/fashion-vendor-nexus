
import { create } from "zustand";
import { toast } from "sonner";

export interface OrderItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl?: string;
  storeId: string;
  storeName: string;
}

export interface Order {
  id: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  items: OrderItem[];
  totalAmount: number;
  status: "pending" | "confirmed" | "shipped" | "delivered" | "cancelled";
  createdAt: string;
  updatedAt: string;
}

interface OrdersState {
  orders: Order[];
  loading: boolean;
  initialized: boolean;
  initializeData: () => void;
  createOrder: (orderData: Omit<Order, "id" | "createdAt" | "updatedAt">) => Order;
  updateOrderStatus: (orderId: string, status: Order["status"]) => void;
  getStoreOrders: (storeId: string) => Order[];
  getOrderById: (orderId: string) => Order | undefined;
}

export const useOrdersStore = create<OrdersState>((set, get) => ({
  orders: [],
  loading: true,
  initialized: false,

  initializeData: () => {
    if (get().initialized) return;
    
    const storedOrders = localStorage.getItem("orders");
    console.log("Initializing orders data from localStorage");
    
    set({
      orders: storedOrders ? JSON.parse(storedOrders) : [],
      loading: false,
      initialized: true
    });
  },

  createOrder: (orderData) => {
    const newOrder: Order = {
      ...orderData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const updatedOrders = [...get().orders, newOrder];
    set({ orders: updatedOrders });
    localStorage.setItem("orders", JSON.stringify(updatedOrders));
    
    console.log("Order created:", newOrder);
    toast.success("Order placed successfully!");
    return newOrder;
  },

  updateOrderStatus: (orderId, status) => {
    const updatedOrders = get().orders.map(order =>
      order.id === orderId 
        ? { ...order, status, updatedAt: new Date().toISOString() }
        : order
    );
    
    set({ orders: updatedOrders });
    localStorage.setItem("orders", JSON.stringify(updatedOrders));
    toast.success(`Order status updated to ${status}`);
  },

  getStoreOrders: (storeId) => {
    return get().orders.filter(order => 
      order.items.some(item => item.storeId === storeId)
    );
  },

  getOrderById: (orderId) => {
    return get().orders.find(order => order.id === orderId);
  },
}));

// Initialize orders data when the module loads
if (typeof window !== 'undefined') {
  useOrdersStore.getState().initializeData();
}
