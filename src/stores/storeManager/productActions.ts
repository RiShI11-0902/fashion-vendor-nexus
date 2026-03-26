import axios from "axios";
import { toast } from "sonner";
import { Product, StoreState } from "../types/storeTypes";
import { invalidateProductCache } from "../../lib/storeCache";

export interface ProductActions {
  createProduct: (product: Omit<Product, "id" | "createdAt">) => Promise<void>;
  updateProduct: (
    productId: string,
    updates: Partial<Product>
  ) => Promise<void>;
  deleteProduct: (productId: string) => Promise<void>;
  updateProductInventory: (
    productId: string,
    quantityToSubtract: number
  ) => Promise<void>;
  getStoreProducts: (
    storeId: string,
    page: number,
    selectedCategory: string
  ) => Promise<void>;
  getProductById: (productId: string) => Promise<void>;
  getlowStockProducts: (storeId: string) => {
    lowStockProducts: Product;
  };
}

const API_URL = import.meta.env.VITE_DEV_BACKEND_URL; // adjust if different
export const createProductActions = (set: any, get: any): ProductActions => ({
  createProduct: async (product) => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.post(`${API_URL}/api/products`, product, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      set((state: StoreState) => ({
        products: [...state.products, res.data],
      }));
      toast.success(`Product "${product.name}" created successfully`);
      return res.data; // return created product for QR generation
    } catch (error: any) {
      console.error("Error creating product:", error);
      toast.error(error.response?.data?.error || "Failed to create product");
    }
  },


  updateProduct: async (productId, updates) => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.put(
        `${API_URL}/api/products/${productId}`,
        updates,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`, // middleware reads this
          },
        }
      );
      set((state: StoreState) => ({
        products: state.products.map((product) =>
          product.id === productId ? res.data : product
        ),
      }));
      invalidateProductCache(productId);
      toast.success("Product updated successfully");
    } catch (error: any) {
      console.error("Error updating product:", error);
      toast.error(error.response?.data?.error || "Failed to update product");
    }
  },

  deleteProduct: async (productId) => {
    try {
          const token =  localStorage.getItem("token");

      await axios.delete(`${API_URL}/api/products/delete/${productId}`, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`, // middleware reads this
        },
      });
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

      const res = await axios.put(`${API_URL}/api/products/${productId}`, {
        inventory: newInventory,
      });

      set((state: StoreState) => ({
        products: state.products.map((p) =>
          p.id === productId ? res.data : p
        ),
      }));
    } catch (error: any) {
      console.error("Error updating inventory:", error);
      toast.error(error.response?.data?.error || "Failed to update inventory");
    }
  },

  getStoreProducts: async (storeId, page, selectedCategory) => {
    try {
          const token =  localStorage.getItem("token");

      const res = await axios.post(
        `${API_URL}/api/products/store`,
        { storeId, page, category: selectedCategory },
        {
          withCredentials: true,
          headers: {
          Authorization: `Bearer ${token}`, // middleware reads this
        },
        }
      );
      set((state: StoreState) => ({
        ...state,
        products: res.data.products,
      }));
      return res.data;
    } catch (error: any) {
      console.error("Error fetching store products:", error);
      toast.error(error.response?.data?.error || "Failed to fetch products");
    }
  },

  getProductById: async (productId) => {
    try {
      const res = await axios.get(`${API_URL}/api/products/${productId}`);
      return res.data;
    } catch (error: any) {
      console.error("Error fetching product:", error);
      toast.error(error.response?.data?.error || "Failed to fetch product");
    }
  },

  getlowStockProducts: (storeId) => {
    const products = storeId
      ? get().products.filter((product) => product.storeId === storeId)
      : get().product;
    const low = products?.filter((product) => {
      if (product.inventory < 3) {
        return product;
      }
    });
    return {
      lowStockProducts: products?.filter((product) => {
        if (product.inventory < 3) {
          return product;
        }
      }),
    };
  },
});
