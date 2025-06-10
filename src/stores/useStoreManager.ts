
import { create } from "zustand";
import { toast } from "sonner";

interface Store {
  id: string;
  name: string;
  slug: string;
  description?: string;
  imageUrl?: string;
  ownerId: string;
  categories?: string[];
  createdAt: string;
}

interface Product {
  id: string;
  name: string;
  description?: string;
  price: number;
  imageUrl?: string;
  category?: string;
  storeId: string;
  inventory: number;
  createdAt: string;
}

interface Discount {
  id: string;
  productId: string;
  type: 'percentage' | 'fixed';
  value: number;
  startDate: string;
  endDate: string;
  isActive: boolean;
  createdAt: string;
}

interface StoreState {
  stores: Store[];
  products: Product[];
  discounts: Discount[];
  loading: boolean;
  initialized: boolean;
  initializeData: () => void;
  createStore: (storeData: Partial<Store>) => Store | null;
  updateStore: (storeId: string, storeData: Partial<Store>) => void;
  deleteStore: (storeId: string) => void;
  getStoreBySlug: (slug: string) => Store | undefined;
  getUserStores: (userId: string) => Store[];
  addProduct: (productData: Partial<Product>) => Product;
  updateProduct: (productId: string, productData: Partial<Product>) => void;
  deleteProduct: (productId: string) => void;
  getStoreProducts: (storeId: string) => Product[];
  updateProductInventory: (productId: string, quantitySold: number) => void;
  getLowStockProducts: (storeId: string, threshold?: number) => Product[];
  createDiscount: (discountData: Partial<Discount>) => Discount;
  updateDiscount: (discountId: string, discountData: Partial<Discount>) => void;
  deleteDiscount: (discountId: string) => void;
  getProductDiscount: (productId: string) => Discount | undefined;
  getActiveDiscounts: (storeId: string) => Discount[];
  getDiscountedPrice: (productId: string, originalPrice: number) => { price: number; discount?: Discount };
}

export const useStoreManager = create<StoreState>((set, get) => ({
  stores: [],
  products: [],
  discounts: [],
  loading: true,
  initialized: false,

  initializeData: () => {
    if (get().initialized) return;
    
    const storedStores = localStorage.getItem("stores");
    const storedProducts = localStorage.getItem("products");
    const storedDiscounts = localStorage.getItem("discounts");
    
    console.log("Initializing store data from localStorage");
    console.log("Stored stores:", storedStores);
    
    set({
      stores: storedStores ? JSON.parse(storedStores) : [],
      products: storedProducts ? JSON.parse(storedProducts) : [],
      discounts: storedDiscounts ? JSON.parse(storedDiscounts) : [],
      loading: false,
      initialized: true
    });
  },

  createStore: (storeData) => {
    const currentUser = JSON.parse(localStorage.getItem("user") || "null");
    if (!currentUser) {
      toast.error("You must be logged in to create a store");
      return null;
    }

    const slugExists = get().stores.some(store => store.slug === storeData.slug);
    if (slugExists) {
      toast.error("Store URL already exists. Please choose a different name.");
      return null;
    }

    const newStore = {
      id: Date.now().toString(),
      ...storeData,
      ownerId: currentUser.id,
      createdAt: new Date().toISOString(),
    } as Store;

    const updatedStores = [...get().stores, newStore];
    set(state => ({
      stores: updatedStores
    }));
    localStorage.setItem("stores", JSON.stringify(updatedStores));
    console.log("Store created and saved to localStorage:", newStore);
    toast.success("Store created successfully");
    return newStore;
  },

  updateStore: (storeId, storeData) => {
    const updatedStores = get().stores.map(store =>
      store.id === storeId ? { ...store, ...storeData } : store
    );
    set({ stores: updatedStores });
    localStorage.setItem("stores", JSON.stringify(updatedStores));
    toast.success("Store updated successfully");
  },

  deleteStore: (storeId) => {
    const updatedStores = get().stores.filter(store => store.id !== storeId);
    const updatedProducts = get().products.filter(product => product.storeId !== storeId);
    
    set({
      stores: updatedStores,
      products: updatedProducts
    });
    localStorage.setItem("stores", JSON.stringify(updatedStores));
    localStorage.setItem("products", JSON.stringify(updatedProducts));
    toast.success("Store deleted successfully");
  },

  getStoreBySlug: (slug) => {
    if (!get().initialized) {
      get().initializeData();
    }
    const store = get().stores.find(store => store.slug === slug);
    console.log(`Looking for store with slug "${slug}":`, store);
    return store;
  },

  getUserStores: (userId) => {
    return get().stores.filter(store => store.ownerId === userId);
  },

  addProduct: (productData) => {
    const newProduct = {
      id: Date.now().toString(),
      inventory: 0, // Default inventory
      ...productData,
      createdAt: new Date().toISOString(),
    } as Product;

    const updatedProducts = [...get().products, newProduct];
    set({ products: updatedProducts });
    localStorage.setItem("products", JSON.stringify(updatedProducts));
    toast.success("Product added successfully");
    return newProduct;
  },

  updateProduct: (productId, productData) => {
    const updatedProducts = get().products.map(product =>
      product.id === productId ? { ...product, ...productData } : product
    );
    set({ products: updatedProducts });
    localStorage.setItem("products", JSON.stringify(updatedProducts));
    toast.success("Product updated successfully");
  },

  deleteProduct: (productId) => {
    const updatedProducts = get().products.filter(product => product.id !== productId);
    const updatedDiscounts = get().discounts.filter(discount => discount.productId !== productId);
    
    set({ 
      products: updatedProducts,
      discounts: updatedDiscounts 
    });
    localStorage.setItem("products", JSON.stringify(updatedProducts));
    localStorage.setItem("discounts", JSON.stringify(updatedDiscounts));
    toast.success("Product deleted successfully");
  },

  getStoreProducts: (storeId) => {
    return get().products.filter(product => product.storeId === storeId);
  },

  updateProductInventory: (productId, quantitySold) => {
    const updatedProducts = get().products.map(product => {
      if (product.id === productId) {
        const newInventory = Math.max(0, product.inventory - quantitySold);
        if (newInventory <= 5 && newInventory > 0) {
          toast.warning(`Low stock alert: ${product.name} has only ${newInventory} items left`);
        } else if (newInventory === 0) {
          toast.error(`${product.name} is now out of stock`);
        }
        return { ...product, inventory: newInventory };
      }
      return product;
    });
    
    set({ products: updatedProducts });
    localStorage.setItem("products", JSON.stringify(updatedProducts));
  },

  getLowStockProducts: (storeId, threshold = 5) => {
    return get().products.filter(product => 
      product.storeId === storeId && product.inventory <= threshold && product.inventory > 0
    );
  },

  createDiscount: (discountData) => {
    const newDiscount = {
      id: Date.now().toString(),
      ...discountData,
      createdAt: new Date().toISOString(),
    } as Discount;

    const updatedDiscounts = [...get().discounts, newDiscount];
    set({ discounts: updatedDiscounts });
    localStorage.setItem("discounts", JSON.stringify(updatedDiscounts));
    toast.success("Discount created successfully");
    return newDiscount;
  },

  updateDiscount: (discountId, discountData) => {
    const updatedDiscounts = get().discounts.map(discount =>
      discount.id === discountId ? { ...discount, ...discountData } : discount
    );
    set({ discounts: updatedDiscounts });
    localStorage.setItem("discounts", JSON.stringify(updatedDiscounts));
    toast.success("Discount updated successfully");
  },

  deleteDiscount: (discountId) => {
    const updatedDiscounts = get().discounts.filter(discount => discount.id !== discountId);
    set({ discounts: updatedDiscounts });
    localStorage.setItem("discounts", JSON.stringify(updatedDiscounts));
    toast.success("Discount deleted successfully");
  },

  getProductDiscount: (productId) => {
    const now = new Date().toISOString();
    return get().discounts.find(discount => 
      discount.productId === productId && 
      discount.isActive && 
      discount.startDate <= now && 
      discount.endDate >= now
    );
  },

  getActiveDiscounts: (storeId) => {
    const now = new Date().toISOString();
    const storeProducts = get().products.filter(p => p.storeId === storeId).map(p => p.id);
    
    return get().discounts.filter(discount => 
      storeProducts.includes(discount.productId) &&
      discount.isActive && 
      discount.startDate <= now && 
      discount.endDate >= now
    );
  },

  getDiscountedPrice: (productId, originalPrice) => {
    const discount = get().getProductDiscount(productId);
    
    if (!discount) {
      return { price: originalPrice };
    }

    let discountedPrice = originalPrice;
    if (discount.type === 'percentage') {
      discountedPrice = originalPrice * (1 - discount.value / 100);
    } else {
      discountedPrice = Math.max(0, originalPrice - discount.value);
    }

    return { 
      price: Math.round(discountedPrice * 100) / 100,
      discount 
    };
  },
}));

// Initialize store data when the module loads
if (typeof window !== 'undefined') {
  useStoreManager.getState().initializeData();
}
