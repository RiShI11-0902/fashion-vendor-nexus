import axios from "axios";
import { toast } from "sonner";
import { Product, StoreState } from "../types/storeTypes";

export interface ProductActions {
  createProduct: (product: Omit<Product, "id" | "createdAt">) => Promise<void>;
  updateProduct: (productId: string, updates: Partial<Product>) => Promise<void>;
  deleteProduct: (productId: string) => Promise<void>;
  updateProductInventory: (productId: string, quantityToSubtract: number) => Promise<void>;
  getStoreProducts: (storeId: string) => Promise<void>;
  getProductById: (productId: string) => Promise<void>;
}

const API_URL = "http://localhost:5000/api/products"; // adjust if different

export const createProductActions = (set: any, get: any): ProductActions => ({
  createProduct: async (product) => {
    try {
      const res = await axios.post(API_URL, product);
      set((state: StoreState) => ({
        products: [...state.products, res.data],
      }));
      toast.success(`Product "${product.name}" created successfully`);
    } catch (error: any) {
      console.error("Error creating product:", error);
      toast.error(error.response?.data?.error || "Failed to create product");
    }
  },

  updateProduct: async (productId, updates) => {
    try {
      const res = await axios.put(`${API_URL}/${productId}`, updates);
      set((state: StoreState) => ({
        products: state.products.map((product) =>
          product.id === productId ? res.data : product
        ),
      }));
      toast.success("Product updated successfully");
    } catch (error: any) {
      console.error("Error updating product:", error);
      toast.error(error.response?.data?.error || "Failed to update product");
    }
  },

  deleteProduct: async (productId) => {
    try {
      await axios.delete(`${API_URL}/${productId}`);
      set((state: StoreState) => ({
        products: state.products.filter((product) => product.id !== productId),
        discounts: state.discounts.filter(
          (discount) => discount.productId !== productId
        ),
      }));
      toast.success("Product deleted successfully");
    } catch (error: any) {
      console.error("Error deleting product:", error);
      toast.error(error.response?.data?.error || "Failed to delete product");
    }
  },

  updateProductInventory: async (productId, quantityToSubtract) => {
    try {
      const product = get().products.find((p: Product) => p.id === productId);
      if (!product) return;

      const newInventory = Math.max(0, product.inventory - quantityToSubtract);

      const res = await axios.put(`${API_URL}/${productId}`, {
        inventory: newInventory,
      });

      set((state: StoreState) => ({
        products: state.products.map((p) =>
          p.id === productId ? res.data : p
        ),
      }));

      console.log(
        `Updated inventory for product ${productId}, subtracted ${quantityToSubtract}`
      );
    } catch (error: any) {
      console.error("Error updating inventory:", error);
      toast.error(error.response?.data?.error || "Failed to update inventory");
    }
  },

  getStoreProducts: async (storeId) => {
    try {
      const res = await axios.post(`${API_URL}/store`, { storeId });
      set((state: StoreState) => ({
        ...state,
        products: res.data.products,
      }));
      return res.data.products
    } catch (error: any) {
      console.error("Error fetching store products:", error);
      toast.error(error.response?.data?.error || "Failed to fetch products");
    }
  },

  getProductById: async (productId) => {
    try {
      const res = await axios.get(`${API_URL}/${productId}`);
      return res.data;
    } catch (error: any) {
      console.error("Error fetching product:", error);
      toast.error(error.response?.data?.error || "Failed to fetch product");
    }
  },
});

// import { toast } from 'sonner';
// import { Product, StoreState } from '../types/storeTypes';

// export interface ProductActions {
//   createProduct: (product: Omit<Product, 'id' | 'createdAt'>) => void;
//   updateProduct: (productId: string, updates: Partial<Product>) => void;
//   deleteProduct: (productId: string) => void;
//   updateProductInventory: (productId: string, quantityToSubtract: number) => void;
//   getStoreProducts: (storeId: string) => Product[];
//   getProductById: (productId: string) => Product | undefined;
// }

// export const createProductActions = (set: any, get: any): ProductActions => ({
//   createProduct: (product) => {
//     const newProduct = {
//       id: Date.now().toString(),
//       createdAt: new Date().toISOString(),
//       ...product,
//     };
//     set((state: StoreState) => ({ products: [...state.products, newProduct] }));
//     toast.success(`Product "${product.name}" created successfully`);
//   },

//   updateProduct: (productId, updates) => {
//     set((state: StoreState) => ({
//       products: state.products.map((product) =>
//         product.id === productId ? { ...product, ...updates } : product
//       ),
//     }));
//     toast.success('Product updated successfully');
//   },

//   deleteProduct: (productId) => {
//     set((state: StoreState) => ({
//       products: state.products.filter((product) => product.id !== productId),
//       discounts: state.discounts.filter((discount) => discount.productId !== productId),
//     }));
//     toast.success('Product deleted successfully');
//   },

//   updateProductInventory: (productId, quantityToSubtract) => {
//     set((state: StoreState) => ({
//       products: state.products.map((product) =>
//         product.id === productId 
//           ? { ...product, inventory: Math.max(0, product.inventory - quantityToSubtract) }
//           : product
//       ),
//     }));
//     console.log(`Updated inventory for product ${productId}, subtracted ${quantityToSubtract}`);
//   },

//   getStoreProducts: (storeId) => {
//     return get().products.filter((product: Product) => product.storeId === storeId);
//   },

//   getProductById: (productId) => {
//     return get().products.find((product: Product) => product.id === productId);
//   },
// });
