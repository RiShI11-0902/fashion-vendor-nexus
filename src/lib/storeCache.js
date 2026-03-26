// Shared module-level caches — persist across SPA navigation, clear on page refresh

export const storeSlugCache = new Map(); // storeSlug -> { store, feedbacks }
export const productsCache = new Map();  // `${storeId}-${page}-${category}` -> { products, total }
export const productDetailCache = new Map(); // productId -> product

/** Call after updating/deleting a product to force fresh data on next visit */
export const invalidateProductCache = (productId) => {
  productDetailCache.delete(productId);

  // Also clear all paginated product list entries that might contain this product
  for (const key of productsCache.keys()) {
    productsCache.delete(key);
  }
};

/** Call after updating store details to force fresh data on next visit */
export const invalidateStoreCache = (storeSlug) => {
  storeSlugCache.delete(storeSlug);
};
