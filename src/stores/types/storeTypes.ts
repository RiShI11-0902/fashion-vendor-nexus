
export type Store = {
  id: string;
  ownerId: string;
  name: string;
  slug: string;
  description: string;
  imageUrl: string;
  logo?: string;
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

export type Product = {
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
  sizes: string[];
  discount: number;
  
};

export type Discount = {
  id: string;
  storeId: string;
  productId: string;
  type: 'percentage' | 'fixed';
  value: number;
  startDate: string;
  endDate: string;
};

export interface StoreState {
  stores: Store[];
  products: Product[];
  discounts: Discount[];
}
