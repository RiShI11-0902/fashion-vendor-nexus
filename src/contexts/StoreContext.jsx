
import { createContext, useContext, useState, useEffect } from "react";
import { toast } from "sonner";
import { useAuth } from "./AuthContext";

const StoreContext = createContext();

export const useStore = () => useContext(StoreContext);

export const StoreProvider = ({ children }) => {
  const [stores, setStores] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuth();

  useEffect(() => {
    // Load stores and products from localStorage
    const loadData = () => {
      const storedStores = localStorage.getItem("stores");
      const storedProducts = localStorage.getItem("products");
      
      if (storedStores) {
        setStores(JSON.parse(storedStores));
      }
      
      if (storedProducts) {
        setProducts(JSON.parse(storedProducts));
      }
      
      setLoading(false);
    };
    
    loadData();
  }, []);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    if (!loading) {
      localStorage.setItem("stores", JSON.stringify(stores));
      localStorage.setItem("products", JSON.stringify(products));
    }
  }, [stores, products, loading]);

  const createStore = (storeData) => {
    if (!currentUser) {
      toast.error("You must be logged in to create a store");
      return null;
    }
    
    // Check if store slug already exists
    const slugExists = stores.some(store => store.slug === storeData.slug);
    if (slugExists) {
      toast.error("Store URL already exists. Please choose a different name.");
      return null;
    }
    
    const newStore = {
      id: Date.now().toString(),
      ...storeData,
      ownerId: currentUser.id,
      createdAt: new Date().toISOString(),
    };
    
    setStores(prevStores => [...prevStores, newStore]);
    toast.success("Store created successfully");
    return newStore;
  };

  const updateStore = (storeId, storeData) => {
    setStores(prevStores => 
      prevStores.map(store => 
        store.id === storeId ? { ...store, ...storeData } : store
      )
    );
    toast.success("Store updated successfully");
  };

  const deleteStore = (storeId) => {
    setStores(prevStores => prevStores.filter(store => store.id !== storeId));
    // Also delete all products associated with this store
    setProducts(prevProducts => prevProducts.filter(product => product.storeId !== storeId));
    toast.success("Store deleted successfully");
  };

  const getStoreBySlug = (slug) => {
    return stores.find(store => store.slug === slug);
  };

  const getUserStores = (userId) => {
    return stores.filter(store => store.ownerId === userId);
  };

  const addProduct = (productData) => {
    const newProduct = {
      id: Date.now().toString(),
      ...productData,
      createdAt: new Date().toISOString(),
    };
    
    setProducts(prevProducts => [...prevProducts, newProduct]);
    toast.success("Product added successfully");
    return newProduct;
  };

  const updateProduct = (productId, productData) => {
    setProducts(prevProducts => 
      prevProducts.map(product => 
        product.id === productId ? { ...product, ...productData } : product
      )
    );
    toast.success("Product updated successfully");
  };

  const deleteProduct = (productId) => {
    setProducts(prevProducts => prevProducts.filter(product => product.id !== productId));
    toast.success("Product deleted successfully");
  };

  const getStoreProducts = (storeId) => {
    return products.filter(product => product.storeId === storeId);
  };

  const value = {
    stores,
    products,
    loading,
    createStore,
    updateStore,
    deleteStore,
    getStoreBySlug,
    getUserStores,
    addProduct,
    updateProduct,
    deleteProduct,
    getStoreProducts
  };

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
};
