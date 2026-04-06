// Shared module-level caches — persist across SPA navigation, clear on page refresh

export const storeSlugCache = new Map(); // storeSlug -> { store, feedbacks }
export const productsCache = new Map();  // `${storeId}-${page}-${category}` -> { products, total }
export const productDetailCache = new Map(); // productId -> product

// Dashboard-level caches
export const dashboardCache = {
  userStores: null,    // cached getUserStores result
  overallStats: null,  // cached dashboard stats
  analyticsData: null, // cached analytics data per storeId
  _analyticsStore: new Map(), // storeId -> analytics data
};

/** Call after updating/deleting a product to force fresh data on next visit */
export const invalidateProductCache = (productId) => {
  productDetailCache.delete(productId);
  for (const key of productsCache.keys()) {
    productsCache.delete(key);
  }
  // Also invalidate dashboard caches since product counts may change
  dashboardCache.overallStats = null;
  dashboardCache._analyticsStore.clear();
};

/** Call after updating store details to force fresh data on next visit */
export const invalidateStoreCache = (storeSlug) => {
  storeSlugCache.delete(storeSlug);
  dashboardCache.userStores = null;
  dashboardCache._analyticsStore.clear();
};

/** Invalidate all dashboard caches (e.g. after creating/editing store or product) */
export const invalidateDashboardCache = () => {
  dashboardCache.userStores = null;
  dashboardCache.overallStats = null;
  dashboardCache._analyticsStore.clear();
};
