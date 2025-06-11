
import { toast } from 'sonner';
import { Product, StoreState } from '../types/storeTypes';

export interface ProductActions {
  createProduct: (product: Omit<Product, 'id' | 'createdAt'>) => void;
  updateProduct: (productId: string, updates: Partial<Product>) => void;
  deleteProduct: (productId: string) => void;
  updateProductInventory: (productId: string, quantityToSubtract: number) => void;
  getStoreProducts: (storeId: string) => Product[];
  getProductById: (productId: string) => Product | undefined;
}

export const createProductActions = (set: any, get: any): ProductActions => ({
  createProduct: (product) => {
    const newProduct = {
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      ...product,
    };
    set((state: StoreState) => ({ products: [...state.products, newProduct] }));
    toast.success(`Product "${product.name}" created successfully`);
  },

  updateProduct: (productId, updates) => {
    set((state: StoreState) => ({
      products: state.products.map((product) =>
        product.id === productId ? { ...product, ...updates } : product
      ),
    }));
    toast.success('Product updated successfully');
  },

  deleteProduct: (productId) => {
    set((state: StoreState) => ({
      products: state.products.filter((product) => product.id !== productId),
      discounts: state.discounts.filter((discount) => discount.productId !== productId),
    }));
    toast.success('Product deleted successfully');
  },

  updateProductInventory: (productId, quantityToSubtract) => {
    set((state: StoreState) => ({
      products: state.products.map((product) =>
        product.id === productId 
          ? { ...product, inventory: Math.max(0, product.inventory - quantityToSubtract) }
          : product
      ),
    }));
    console.log(`Updated inventory for product ${productId}, subtracted ${quantityToSubtract}`);
  },

  getStoreProducts: (storeId) => {
    return get().products.filter((product: Product) => product.storeId === storeId);
  },

  getProductById: (productId) => {
    return get().products.find((product: Product) => product.id === productId);
  },
});
