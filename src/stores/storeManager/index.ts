
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { StoreState } from '../types/storeTypes';
import { StoreActions, createStoreActions } from './storeActions';
import { ProductActions, createProductActions } from './productActions';
import { DiscountActions, createDiscountActions } from './discountActions';

type StoreManagerState = StoreState & StoreActions & ProductActions & DiscountActions;

export const useStoreManager = create<StoreManagerState>()(
  devtools(
    persist(
      (set, get) => ({
        // Initial state
        stores: [],
        products: [],
        discounts: [],
        
        // Combine all actions
        ...createStoreActions(set, get),
        ...createProductActions(set, get),
        ...createDiscountActions(set, get),
      }),
      {
        name: 'store-manager',
      }
    )
  )
);
