
import { create } from "zustand";
import { toast } from "sonner";

interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  imageUrl?: string;
  storeId: string;
  storeName: string;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  addToCart: (product: any, store: any) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],

  addToCart: (product, store) => {
    const existingItem = get().items.find(item => item.productId === product.id);
    
    if (existingItem) {
      set(state => ({
        items: state.items.map(item =>
          item.productId === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }));
      toast.success(`${product.name} quantity updated in cart`);
    } else {
      const newItem: CartItem = {
        id: Date.now().toString(),
        productId: product.id,
        name: product.name,
        price: product.price,
        imageUrl: product.imageUrl,
        storeId: product.storeId,
        storeName: store.name,
        quantity: 1
      };
      
      set(state => ({
        items: [...state.items, newItem]
      }));
      toast.success(`${product.name} added to cart`);
    }
    
    localStorage.setItem("cart", JSON.stringify(get().items));
  },

  removeFromCart: (productId) => {
    set(state => ({
      items: state.items.filter(item => item.productId !== productId)
    }));
    localStorage.setItem("cart", JSON.stringify(get().items));
    toast.success("Item removed from cart");
  },

  updateQuantity: (productId, quantity) => {
    if (quantity <= 0) {
      get().removeFromCart(productId);
      return;
    }
    
    set(state => ({
      items: state.items.map(item =>
        item.productId === productId
          ? { ...item, quantity }
          : item
      )
    }));
    localStorage.setItem("cart", JSON.stringify(get().items));
  },

  clearCart: () => {
    set({ items: [] });
    localStorage.removeItem("cart");
    toast.success("Cart cleared");
  },

  getTotalItems: () => {
    return get().items.reduce((total, item) => total + item.quantity, 0);
  },

  getTotalPrice: () => {
    return get().items.reduce((total, item) => total + (item.price * item.quantity), 0);
  },
}));

// Initialize cart from localStorage
const initializeCart = () => {
  const storedCart = localStorage.getItem("cart");
  if (storedCart) {
    useCartStore.setState({
      items: JSON.parse(storedCart)
    });
  }
};

initializeCart();
