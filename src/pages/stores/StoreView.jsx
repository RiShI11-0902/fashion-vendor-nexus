import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useStoreManager } from "../../stores/useStoreManager";
import { useCartStore } from "../../stores/useCartStore";
import MainLayout from "../../components/layout/MainLayout";
import { Button } from "../../components/ui/button";
import { Package } from "lucide-react";
import ProductCard from "../../components/products/ProductCard";
import CustomerFeedback from "../../components/feedback/CustomerFeedback";
import StoreFAQ from "../../components/faq/StoreFAQ";
import StoreStories from "../../components/stores/StoreStories";

const StoreView = () => {
  const { storeSlug } = useParams();
  const { getStoreBySlug, getStoreProducts } = useStoreManager();
  const [store, setStore] = useState(null);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (storeSlug) {
      const foundStore = getStoreBySlug(storeSlug);

      if (foundStore) {
        setStore(foundStore);
        const storeProducts = getStoreProducts(foundStore.id);
        setProducts(storeProducts);
        setFilteredProducts(storeProducts);
      } else {
        setError("Store not found");
      }

      setLoading(false);
    }
  }, [storeSlug, getStoreBySlug, getStoreProducts]);

  // Filter products by category
  useEffect(() => {
    if (selectedCategory === "All") {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter(product => product.category === selectedCategory));
    }
  }, [selectedCategory, products]);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  // Get unique categories from products
  const categories = [...new Set(products.map(product => product.category).filter(Boolean))];

  if (loading) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      </MainLayout>
    );
  }

  if (error || !store) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-12 text-center">
          <Package className="h-12 w-12 mx-auto text-gray-400 mb-4" />
          <h2 className="text-2xl font-display font-semibold mb-2">Store Not Found</h2>
          <p className="text-gray-600 mb-6">
            The store you're looking for doesn't exist or might have been removed.
          </p>
          <Button asChild>
            <Link to="/stores">Explore Other Stores</Link>
          </Button>
        </div>
      </MainLayout>
    );
  }

  // Check if feedback is enabled for this store
  const feedbackEnabled = store.settings?.enableFeedback !== false;

  return (
    <MainLayout>
      <div className="min-h-screen bg-gray-50">
        <div className="bg-white py-12 shadow-md">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-3xl font-display font-bold">{store.name}</h1>
                <p className="text-gray-600">{store.description || "No description provided"}</p>
              </div>
              {store.imageUrl && (
                <img
                  src={store.imageUrl}
                  alt={store.name}
                  className="h-24 w-24 rounded-full object-cover"
                />
              )}
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12">
          {/* Store Stories Section */}
          {categories.length > 0 && (
            <div className="mb-8">
              <StoreStories
                categories={categories}
                selectedCategory={selectedCategory}
                onCategorySelect={handleCategorySelect}
                products={products}
              />
            </div>
          )}

          {/* Products Section */}
          <div className="mb-4">
            <h2 className="text-2xl font-display font-bold">
              {selectedCategory === "All" ? "All Products" : selectedCategory}
            </h2>
            <p className="text-gray-600">
              {filteredProducts.length} {filteredProducts.length === 1 ? "product" : "products"} available
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.length > 0 ? (
              filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} storeSlug={storeSlug} />
              ))
            ) : (
              <div className="text-center py-8 col-span-full">
                <Package className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-semibold mb-2">
                  {selectedCategory === "All" ? "No Products Available" : `No ${selectedCategory} Products`}
                </h3>
                <p className="text-gray-600">
                  {selectedCategory === "All" 
                    ? "This store doesn't have any products yet. Check back later!" 
                    : `No products found in the ${selectedCategory} category.`
                  }
                </p>
              </div>
            )}
          </div>

          {/* Customer Feedback Section */}
          <div className="mt-16">
            <CustomerFeedback 
              storeId={store.id}
              storeName={store.name}
              isEnabled={feedbackEnabled}
            />
          </div>

          {/* FAQ Section */}
          <div className="mt-12">
            <StoreFAQ 
              customFAQs={store.customFAQs || []}
              storePolicy={store.policies || {}}
            />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default StoreView;
