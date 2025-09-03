import { toast } from "sonner";
import { Store, StoreState } from "../types/storeTypes";
import axios from "axios";

export interface StoreActions {
  createStore: (store: Omit<Store, "id" | "createdAt">) => Store;
  updateStore: (storeId: string, updates: Partial<Store>) => void;
  deleteStore: (storeId: string) => void;
  getStoreBySlug: (slug: string) => Store | undefined;
  getUserStores: (userId: string) => Store[];
  updateStoreSettings: (storeId: string, settings: any) => void;
  updateStorePolicies: (storeId: string, policies: any) => void;
}

export const createStoreActions = (set: any, get: any): StoreActions => ({
  createStore: async (store) => {
    // const newStore = {
    //   id: Date.now().toString(),
    //   createdAt: new Date().toISOString(),
    //   ...store,
    // };
    const res = await axios.post("http://localhost:5000/api/store", store);
    console.log(res);

    const newStore = res.data.newStore;
    set((state: StoreState) => ({ stores: [...state.stores, newStore] }));
    toast.success(`Store "${store.name}" created successfully`);
    return newStore;
  },

  updateStore: (storeId, updates) => {
    set((state: StoreState) => ({
      stores: state.stores.map((store) =>
        store.id === storeId ? { ...store, ...updates } : store
      ),
    }));
    toast.success("Store updated successfully");
  },

  deleteStore: (storeId) => {
    set((state: StoreState) => ({
      stores: state.stores.filter((store) => store.id !== storeId),
      products: state.products.filter((product) => product.storeId !== storeId),
      discounts: state.discounts.filter((discount) => {
        const product = state.products.find((p) => p.id === discount.productId);
        return product?.storeId !== storeId;
      }),
    }));
    toast.success("Store deleted successfully");
  },

  getStoreBySlug: (slug) => {
    return get().stores.find((store: Store) => store?.slug === slug);
  },

  getUserStores: async (userId) => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/store/${userId}`,
        {
          withCredentials: true, // if using cookies for auth
        }
      );

      console.log(res);
      
      const stores = res.data.stores;

      console.log(stores);
      

      // update Zustand state
      set((state: StoreState) => ({ ...state, stores }));

      return stores;
    } catch (err) {
      console.error("Failed to fetch user stores", err);
      return [];
    }
  },

  updateStoreSettings: (storeId, settings) => {
    set((state: StoreState) => ({
      stores: state.stores.map((store) =>
        store.id === storeId
          ? { ...store, settings: { ...store.settings, ...settings } }
          : store
      ),
    }));
    toast.success("Store settings updated successfully");
  },

  updateStorePolicies: (storeId, policies) => {
    set((state: StoreState) => ({
      stores: state.stores.map((store) =>
        store.id === storeId
          ? { ...store, policies: { ...store.policies, ...policies } }
          : store
      ),
    }));
    toast.success("Store policies updated successfully");
  },
});
