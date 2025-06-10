import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { toast } from 'sonner';

// Define the types for Store and Product
type Store = {
  id: string;
  ownerId: string;
  name: string;
  slug: string;
  description: string;
  imageUrl: string;
  categories: string[];
  createdAt: string;
  settings?: {
    enableFeedback?: boolean;
  };
  policies?: {
    shipping?: string;
    returns?: string;
    refunds?: string;
  };
  customFAQs?: {
    id?: string;
    question: string;
    answer: string;
  }[];
};

type Product = {
  id: string;
  storeId: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
  inventory: number;
  createdAt: string;
};

type Discount = {
  id: string;
  storeId: string;
  productId: string;
  type: 'percentage' | 'fixed';
  value: number;
  startDate: string;
  endDate: string;
};

// Define the state structure
interface StoreState {
  stores: Store[];
  products: Product[];
  discounts: Discount[];
}

// Define the actions
interface StoreActions {
  createStore: (store: Omit<Store, 'id' | 'createdAt'>) => void;
  updateStore: (storeId: string, updates: Partial<Store>) => void;
  deleteStore: (storeId: string) => void;
  createProduct: (product: Omit<Product, 'id' | 'createdAt'>) => void;
  updateProduct: (productId: string, updates: Partial<Product>) => void;
  deleteProduct: (productId: string) => void;
  createDiscount: (discount: Omit<Discount, 'id'>) => void;
  updateDiscount: (discountId: string, updates: Partial<Discount>) => void;
  deleteDiscount: (discountId: string) => void;
  getStoreBySlug: (slug: string) => Store | undefined;
  getStoreProducts: (storeId: string) => Product[];
  getProductById: (productId: string) => Product | undefined;
  getDiscountedPrice: (productId: string, originalPrice: number) => { price: number; discount: Discount | undefined };
  getUserStores: (userId: string) => Store[];
  updateStoreSettings: (storeId: string, settings: any) => void;
  updateStorePolicies: (storeId: string, policies: any) => void;
}

const useStoreManager = create<StoreState & StoreActions>()(
  devtools(
    persist(
      (set, get) => ({
        stores: [],
        products: [],
        discounts: [],
        createStore: (store) => {
          const newStore = {
            id: Date.now().toString(),
            createdAt: new Date().toISOString(),
            ...store,
          };
          set((state) => ({ stores: [...state.stores, newStore] }));
          toast.success(`Store "${store.name}" created successfully`);
        },
        updateStore: (storeId, updates) => {
          set((state) => ({
            stores: state.stores.map((store) =>
              store.id === storeId ? { ...store, ...updates } : store
            ),
          }));
          toast.success('Store updated successfully');
        },
        deleteStore: (storeId) => {
          set((state) => ({
            stores: state.stores.filter((store) => store.id !== storeId),
            products: state.products.filter((product) => product.storeId !== storeId),
            discounts: state.discounts.filter((discount) => {
              const product = state.products.find(p => p.id === discount.productId);
              return product?.storeId !== storeId;
            }),
          }));
          toast.success('Store deleted successfully');
        },
        createProduct: (product) => {
          const newProduct = {
            id: Date.now().toString(),
            createdAt: new Date().toISOString(),
            ...product,
          };
          set((state) => ({ products: [...state.products, newProduct] }));
          toast.success(`Product "${product.name}" created successfully`);
        },
        updateProduct: (productId, updates) => {
          set((state) => ({
            products: state.products.map((product) =>
              product.id === productId ? { ...product, ...updates } : product
            ),
          }));
          toast.success('Product updated successfully');
        },
        deleteProduct: (productId) => {
          set((state) => ({
            products: state.products.filter((product) => product.id !== productId),
            discounts: state.discounts.filter((discount) => discount.productId !== productId),
          }));
          toast.success('Product deleted successfully');
        },
        createDiscount: (discount) => {
          const newDiscount = {
            id: Date.now().toString(),
            ...discount,
          };
          set((state) => ({ discounts: [...state.discounts, newDiscount] }));
          toast.success('Discount created successfully');
        },
        updateDiscount: (discountId, updates) => {
          set((state) => ({
            discounts: state.discounts.map((discount) =>
              discount.id === discountId ? { ...discount, ...updates } : discount
            ),
          }));
          toast.success('Discount updated successfully');
        },
        deleteDiscount: (discountId) => {
          set((state) => ({
            discounts: state.discounts.filter((discount) => discount.id !== discountId),
          }));
          toast.success('Discount deleted successfully');
        },
        getStoreBySlug: (slug) => {
          return get().stores.find((store) => store.slug === slug);
        },
        getStoreProducts: (storeId) => {
          return get().products.filter((product) => product.storeId === storeId);
        },
        getProductById: (productId) => {
          return get().products.find((product) => product.id === productId);
        },
        getDiscountedPrice: (productId, originalPrice) => {
          const now = new Date();
          const discount = get().discounts.find(
            (discount) =>
              discount.productId === productId &&
              new Date(discount.startDate) <= now &&
              new Date(discount.endDate) >= now
          );
        
          if (!discount) {
            return { price: originalPrice, discount: undefined };
          }
        
          let discountedPrice = originalPrice;
          if (discount.type === 'percentage') {
            discountedPrice = originalPrice * (1 - discount.value / 100);
          } else if (discount.type === 'fixed') {
            discountedPrice = originalPrice - discount.value;
          }
        
          return { price: Math.max(0, discountedPrice), discount };
        },
        getUserStores: (userId) => {
          return get().stores.filter((store) => store.ownerId === userId);
        },
        updateStoreSettings: (storeId, settings) => {
          set(stores => 
            stores.stores.map(store => 
              store.id === storeId 
                ? { ...store, settings: { ...store.settings, ...settings } }
                : store
            )
          );
          toast.success("Store settings updated successfully");
        },
        updateStorePolicies: (storeId, policies) => {
          set(stores => 
            stores.stores.map(store => 
              store.id === storeId 
                ? { ...store, policies: { ...store.policies, ...policies } }
                : store
            )
          );
          toast.success("Store policies updated successfully");
        },
      }),
      {
        name: 'store-manager',
      }
    )
  )
);

export { useStoreManager };
