import { toast } from "sonner";
import { Store, StoreState } from "../types/storeTypes";
import axios from "axios";

export interface StoreActions {
  createStore: (store: Omit<Store, "id" | "createdAt">) => Promise<Store>;
  updateStore: (storeId: string, updates: Partial<Store>) => void;
  deleteStore: (storeId: any) => void;
  getStoreBySlug: (slug: string) => Promise<Store[]> | undefined;
  getUserStores: (userId: string) => Promise<Store[]>;
  updateStoreSettings: (storeId: string, settings: any) => void;
  updateStorePolicies: (storeId: string, policies: any) => void;
}

const API_URL = import.meta.env.VITE_DEV_BACKEND_URL;

export const createStoreActions = (set: any, get: any): StoreActions => ({
  createStore: async (store) => {
    // Check if user already has a store
    try {
      const state = get();
      const existingStores = state.stores.filter(
        (s: Store) => s.ownerId === store.ownerId
      );

      if (existingStores.length > 0) {
        toast.error("You can only create one store");
        throw new Error("User already has a store");
      }
      const res = await axios.post(`${API_URL}/api/store`, store, {
        withCredentials: true,
      });
      const newStore = res.data.newStore;

      set((state: StoreState) => ({ stores: [...state.stores, newStore] }));
      toast.success(`Store "${store.name}" created successfully`);
      return newStore;
    } catch (error) {
      toast.error(`${error.data.message}` || 'Error Occurred');
    }
  },

  updateStore: async (storeId, updates) => {
    try {
      const res = await axios.put(
        `${API_URL}/api/store/${storeId}`,
        {
          updates,
        },
        {
          withCredentials: true,
        }
      );
      const store = res.data.updatedStore;

      set((state: StoreState) => ({
        stores: state.stores.map((store) =>
          store.id === storeId ? { ...store, ...updates } : store
        ),
      }));
      toast.success("Store updated successfully");
      return store;
    } catch (error) {}
  },

  deleteStore: async (storeId) => {
    try {
      await axios.delete(`${API_URL}/api/store/${storeId}`, {
        withCredentials: true,
      });
      set((state: StoreState) => ({
        stores: state.stores.filter((store) => store.id !== storeId),
        products: state.products.filter(
          (product) => product.storeId !== storeId
        ),
        discounts: state.discounts.filter((discount) => {
          const product = state.products.find(
            (p) => p.id === discount.productId
          );
          return product?.storeId !== storeId;
        }),
      }));
    } catch (error) {}

    toast.success("Store deleted successfully");
  },

  getStoreBySlug: async (slug) => {
    try {
      // const state = get();

      // // 1. If already loaded in state, return that
      // if (state.stores.length > 0) {
      //       return get().stores.find((store: Store) => store?.slug === slug);
      // }
      const res = await axios.get(`${API_URL}/api/store/${slug}`, {
        withCredentials: true, // if using cookies for auth
      });
      const stores = res.data.store;

      return stores;
    } catch (err) {
      console.error("Failed to fetch user stores", err);
      return [];
    }
  },

  getUserStores: async (userId, forceRefresh = false) => {
    try {
      const state = get();

      // 1. If already loaded in state, return that (single store only)
      // if (!forceRefresh && state.stores.length > 0) {
      //   const userStores = state.stores.filter(
      //     (store) => store?.ownerId === userId
      //   );
      //   return userStores.slice(0, 1); // Return only the first store
      // }

      const res = await axios.get(`${API_URL}/api/store/user/${userId}`, {
        withCredentials: true,
      });

      const stores = res.data.stores.slice(0, 1); // Limit to one store

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
