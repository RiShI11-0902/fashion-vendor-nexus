
import { toast } from 'sonner';
import { Store, StoreState } from '../types/storeTypes';

export interface StoreActions {
  createStore: (store: Omit<Store, 'id' | 'createdAt'>) => void;
  updateStore: (storeId: string, updates: Partial<Store>) => void;
  deleteStore: (storeId: string) => void;
  getStoreBySlug: (slug: string) => Store | undefined;
  getUserStores: (userId: string) => Store[];
  updateStoreSettings: (storeId: string, settings: any) => void;
  updateStorePolicies: (storeId: string, policies: any) => void;
}

export const createStoreActions = (set: any, get: any): StoreActions => ({
  createStore: (store) => {
    const newStore = {
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      ...store,
    };
    set((state: StoreState) => ({ stores: [...state.stores, newStore] }));
    toast.success(`Store "${store.name}" created successfully`);
  },

  updateStore: (storeId, updates) => {
    set((state: StoreState) => ({
      stores: state.stores.map((store) =>
        store.id === storeId ? { ...store, ...updates } : store
      ),
    }));
    toast.success('Store updated successfully');
  },

  deleteStore: (storeId) => {
    set((state: StoreState) => ({
      stores: state.stores.filter((store) => store.id !== storeId),
      products: state.products.filter((product) => product.storeId !== storeId),
      discounts: state.discounts.filter((discount) => {
        const product = state.products.find(p => p.id === discount.productId);
        return product?.storeId !== storeId;
      }),
    }));
    toast.success('Store deleted successfully');
  },

  getStoreBySlug: (slug) => {
    return get().stores.find((store: Store) => store.slug === slug);
  },

  getUserStores: (userId) => {
    return get().stores.filter((store: Store) => store.ownerId === userId);
  },

  updateStoreSettings: (storeId, settings) => {
    set((state: StoreState) => ({
      stores: state.stores.map(store => 
        store.id === storeId 
          ? { ...store, settings: { ...store.settings, ...settings } }
          : store
      )
    }));
    toast.success("Store settings updated successfully");
  },

  updateStorePolicies: (storeId, policies) => {
    set((state: StoreState) => ({
      stores: state.stores.map(store => 
        store.id === storeId 
          ? { ...store, policies: { ...store.policies, ...policies } }
          : store
      )
    }));
    toast.success("Store policies updated successfully");
  },
});
