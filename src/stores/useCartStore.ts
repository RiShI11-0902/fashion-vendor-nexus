
import { create } from "zustand";
import { toast } from "sonner";

interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  image?: string;
  storeId: string;
  storeName: string;
  storeSlug: string;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  addToCart: (product: any, store: any) => void;
  removeFromCart: (productId: string, storeSlug: string) => void;
  updateQuantity: (productId: string, storeSlug: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],

  addToCart: (product, store) => {
    // Check inventory before adding
    if (!product.inventory || product.inventory <= 0) {
      toast.error("Product is out of stock");
      return;
    }

    const existingItem = get().items.find(item => 
      item.productId === product.id && item.storeSlug === store.slug
    );
    
    if (existingItem) {
      // Check if adding one more would exceed inventory
      if (existingItem.quantity >= product.inventory) {
        toast.error(`Only ${product.inventory} items available in stock`);
        return;
      }
      
      set(state => ({
        items: state.items.map(item =>
          item.productId === product.id && item.storeSlug === store.slug
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
        image: product.image,
        storeId: product.storeId,
        storeName: store.name,
        storeSlug: store.slug,
        quantity: 1
      };
      
      set(state => ({
        items: [...state.items, newItem]
      }));
      toast.success(`${product.name} added to cart`);
    }
    
    localStorage.setItem("cart", JSON.stringify(get().items));
  },

  removeFromCart: (productId, storeSlug) => {
    set(state => ({
      items: state.items.filter(item => 
        !(item.productId === productId && item.storeSlug === storeSlug)
      )
    }));
    localStorage.setItem("cart", JSON.stringify(get().items));
    toast.success("Item removed from cart");
  },

  updateQuantity: (productId, storeSlug, quantity) => {
    if (quantity <= 0) {
      get().removeFromCart(productId, storeSlug);
      return;
    }
    
    set(state => ({
      items: state.items.map(item =>
        item.productId === productId && item.storeSlug === storeSlug
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
