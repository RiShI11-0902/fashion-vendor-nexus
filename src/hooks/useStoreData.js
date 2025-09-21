import { useState, useEffect } from "react";
import { useStoreManager } from "../stores/useStoreManager";

export const useStoreData = (storeSlug) => {
  const { getStoreBySlug, getStoreProducts } = useStoreManager();
  const [store, setStore] = useState(null);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  const fetchStoreProducts = async (storeId, page, category) => {
    setLoading(true);
    try {
      const { products: storeProducts, total } = await getStoreProducts(
        storeId,
        page,
        category === "All" ? null : category
      );
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
    try {
      const foundStore = await getStoreBySlug(storeSlug);
      if (!foundStore) {
        setError("Store not found");
        setLoading(false);
        return;
      }

      setStore(foundStore);
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

  // Refetch products when page or category changes
  useEffect(() => {
    if (store) {
      fetchStoreProducts(store.id, page, selectedCategory);
    }
  }, [store, page, selectedCategory]);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setPage(1); // reset to first page when category changes
  };

  // Get unique categories from all products fetched
  const categories = [
    ...new Set(store?.categories?.map((category) => category).filter(Boolean)),
  ];

  return {
    store,
    products,
    filteredProducts,
    selectedCategory,
    categories,
    loading,
    error,
    page,
    setPage,
    total,
    handleCategorySelect,
  };
};
