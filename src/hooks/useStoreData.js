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
  

  const foundStore = async () => {
    const foundStore = await getStoreBySlug(storeSlug);

    if (foundStore) {
      setStore(foundStore);
      const storeProducts = await getStoreProducts(foundStore.id);
      setProducts(storeProducts);
      setFilteredProducts(storeProducts);
    } else {
      setError("Store not found");
    }

    setLoading(false);
  };

  useEffect(() => {
    if (storeSlug) {
      foundStore()
    }
  }, [storeSlug, getStoreBySlug, getStoreProducts]);

  // Filter products by category
  useEffect(() => {
    if (selectedCategory === "All") {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(
        products?.filter((product) => product.category === selectedCategory)
      );
    }
  }, [selectedCategory, products]);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  // Get unique categories from products
  const categories = [
    ...new Set(products?.map((product) => product?.category).filter(Boolean)),
  ];

  return {
    store,
    products,
    filteredProducts,
    selectedCategory,
    categories,
    loading,
    error,
    handleCategorySelect,
  };
};
