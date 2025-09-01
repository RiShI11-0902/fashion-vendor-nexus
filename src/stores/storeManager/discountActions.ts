
import { toast } from 'sonner';
import { Discount, StoreState } from '../types/storeTypes';

export interface DiscountActions {
  createDiscount: (discount: Omit<Discount, 'id'>) => void;
  updateDiscount: (discountId: string, updates: Partial<Discount>) => void;
  deleteDiscount: (discountId: string) => void;
  getDiscountedPrice: (productId: string, originalPrice: number) => { price: number; discount: Discount | undefined };
}

export const createDiscountActions = (set: any, get: any): DiscountActions => ({
  createDiscount: (discount) => {
    const newDiscount = {
      id: Date.now().toString(),
      ...discount,
    };
    set((state: StoreState) => ({ discounts: [...state.discounts, newDiscount] }));
    toast.success('Discount created successfully');
  },

  updateDiscount: (discountId, updates) => {
    set((state: StoreState) => ({
      discounts: state.discounts.map((discount) =>
        discount.id === discountId ? { ...discount, ...updates } : discount
      ),
    }));
    toast.success('Discount updated successfully');
  },

  deleteDiscount: (discountId) => {
    set((state: StoreState) => ({
      discounts: state.discounts.filter((discount) => discount.id !== discountId),
    }));
    toast.success('Discount deleted successfully');
  },

  getDiscountedPrice: (productId, originalPrice) => {
    const now = new Date();
    const discount = get().discounts.find(
      (discount: Discount) =>
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
});
