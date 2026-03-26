import { useState, useEffect } from "react";
import { useStoreManager } from "../stores/useStoreManager";
import { storeSlugCache as storeCache, productsCache } from "../lib/storeCache";

export const useStoreData = (storeSlug) => {
  const { getStoreBySlug, getStoreProducts, getStoreFeedback } =
    useStoreManager();

  const [store, setStore] = useState(() => storeCache.get(storeSlug)?.store || null);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(!storeCache.has(storeSlug));
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [feedbacks, setFeedbacks] = useState(() => storeCache.get(storeSlug)?.feedbacks || []);

  const fetchStoreProducts = async (storeId, currentPage, category) => {
    const cacheKey = `${storeId}-${currentPage}-${category || "All"}`;
    if (productsCache.has(cacheKey)) {
      const cached = productsCache.get(cacheKey);
      setProducts(cached.products);
      setFilteredProducts(cached.products);
      setTotal(cached.total);
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const { products: storeProducts, total } = await getStoreProducts(
        storeId,
        currentPage,
        category === "All" ? null : category
      );
      productsCache.set(cacheKey, { products: storeProducts, total });
      setProducts(storeProducts);
      setFilteredProducts(storeProducts);
      setTotal(total);
    } catch (err) {
      setError("Failed to fetch products");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const initStore = async () => {
    // Already cached — use it immediately, no server call
    if (storeCache.has(storeSlug)) {
      const { store: cachedStore, feedbacks: cachedFeedbacks } = storeCache.get(storeSlug);
      setStore(cachedStore);
      setFeedbacks(cachedFeedbacks);
      await fetchStoreProducts(cachedStore.id, page, selectedCategory);
      return;
    }

    setLoading(true);
    try {
      const foundStore = await getStoreBySlug(storeSlug);
      if (!foundStore) {
        setError("Store not found");
        setLoading(false);
        return;
      }

      let fetchedFeedbacks = [];
      try {
        fetchedFeedbacks = await getStoreFeedback(foundStore.id);
      } catch (err) {
        console.error("Failed to fetch feedback", err);
      }

      // Save to module-level cache
      storeCache.set(storeSlug, { store: foundStore, feedbacks: fetchedFeedbacks });

      setStore(foundStore);
      setFeedbacks(fetchedFeedbacks);
      await fetchStoreProducts(foundStore.id, page, selectedCategory);
    } catch (err) {
      setError("Failed to fetch store");
      setLoading(false);
      console.error(err);
    }
  };

  useEffect(() => {
    if (storeSlug) {
      initStore();
    }
  }, [storeSlug]);

  // Refetch products when page or category changes (uses cache when available)
  useEffect(() => {
    if (store) {
      fetchStoreProducts(store.id, page, selectedCategory);
    }
  }, [store, page, selectedCategory]);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setPage(1);
  };

  const categories = [
    ...new Set(store?.categories?.map((category) => category).filter(Boolean)),
  ];

  return {
    store,
    products,
    filteredProducts,
    selectedCategory,
    categories,
    feedbacks,
    loading,
    error,
    page,
    setPage,
    total,
    handleCategorySelect,
  };
};
