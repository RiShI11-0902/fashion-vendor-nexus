
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

interface StoreState {
  stores: Store[];
  products: Product[];
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
}

export const useStoreManager = create<StoreState>((set, get) => ({
  stores: [],
  products: [],
  loading: true,
  initialized: false,

  initializeData: () => {
    if (get().initialized) return;
    
    const storedStores = localStorage.getItem("stores");
    const storedProducts = localStorage.getItem("products");
    
    console.log("Initializing store data from localStorage");
    console.log("Stored stores:", storedStores);
    
    set({
      stores: storedStores ? JSON.parse(storedStores) : [],
      products: storedProducts ? JSON.parse(storedProducts) : [],
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
    set({ products: updatedProducts });
    localStorage.setItem("products", JSON.stringify(updatedProducts));
    toast.success("Product deleted successfully");
  },

  getStoreProducts: (storeId) => {
    return get().products.filter(product => product.storeId === storeId);
  },
}));

// Initialize store data when the module loads
if (typeof window !== 'undefined') {
  useStoreManager.getState().initializeData();
}
