import { useParams } from "react-router-dom";
import MainLayout from "../../components/layout/MainLayout";
import StoreHeader from "../../components/store/StoreHeader";
import StoreNotFound from "../../components/store/StoreNotFound";
import ProductsSection from "../../components/store/ProductsSection";
import CustomerFeedback from "../../components/feedback/CustomerFeedback";
import StoreFAQ from "../../components/faq/StoreFAQ";
import StoreStories from "../../components/stores/StoreStories";
import { useStoreData } from "../../hooks/useStoreData";

const StoreView = () => {
  const { storeSlug } = useParams();
  const {
    store,
    products,
    filteredProducts,
    selectedCategory,
    categories,
    loading,
    error,
    handleCategorySelect
  } = useStoreData(storeSlug);

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
    return <StoreNotFound />;
  }

  // Check if feedback is enabled for this store
  const feedbackEnabled = store.settings?.enableFeedback !== false;

  return (
    <MainLayout>
      <div className="min-h-screen bg-gray-50">
        <StoreHeader store={store} />

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
          <ProductsSection
            filteredProducts={filteredProducts}
            selectedCategory={selectedCategory}
            storeSlug={storeSlug}
          />

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
