
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

    set(state => ({
      stores: [...state.stores, newStore]
    }));
    localStorage.setItem("stores", JSON.stringify([...get().stores]));
    toast.success("Store created successfully");
    return newStore;
  },

  updateStore: (storeId, storeData) => {
    set(state => ({
      stores: state.stores.map(store =>
        store.id === storeId ? { ...store, ...storeData } : store
      )
    }));
    localStorage.setItem("stores", JSON.stringify(get().stores));
    toast.success("Store updated successfully");
  },

  deleteStore: (storeId) => {
    set(state => ({
      stores: state.stores.filter(store => store.id !== storeId),
      products: state.products.filter(product => product.storeId !== storeId)
    }));
    localStorage.setItem("stores", JSON.stringify(get().stores));
    localStorage.setItem("products", JSON.stringify(get().products));
    toast.success("Store deleted successfully");
  },

  getStoreBySlug: (slug) => {
    return get().stores.find(store => store.slug === slug);
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

    set(state => ({
      products: [...state.products, newProduct]
    }));
    localStorage.setItem("products", JSON.stringify([...get().products]));
    toast.success("Product added successfully");
    return newProduct;
  },

  updateProduct: (productId, productData) => {
    set(state => ({
      products: state.products.map(product =>
        product.id === productId ? { ...product, ...productData } : product
      )
    }));
    localStorage.setItem("products", JSON.stringify(get().products));
    toast.success("Product updated successfully");
  },

  deleteProduct: (productId) => {
    set(state => ({
      products: state.products.filter(product => product.id !== productId)
    }));
    localStorage.setItem("products", JSON.stringify(get().products));
    toast.success("Product deleted successfully");
  },

  getStoreProducts: (storeId) => {
    return get().products.filter(product => product.storeId === storeId);
  },
}));

// Initialize store data from localStorage
const initializeStores = () => {
  const storedStores = localStorage.getItem("stores");
  const storedProducts = localStorage.getItem("products");
  
  useStoreManager.setState({
    stores: storedStores ? JSON.parse(storedStores) : [],
    products: storedProducts ? JSON.parse(storedProducts) : [],
    loading: false
  });
};

initializeStores();
