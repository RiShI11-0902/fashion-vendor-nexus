import { Link, useParams } from "react-router-dom";
import MainLayout from "../../components/layout/MainLayout";
import StoreHeader from "../../components/store/StoreHeader";
import StoreNotFound from "../../components/store/StoreNotFound";
import ProductsSection from "../../components/store/ProductsSection";
import CustomerFeedback from "../../components/feedback/CustomerFeedback";
import StoreFAQ from "../../components/faq/StoreFAQ";
import StoreStories from "../../components/stores/StoreStories";
import { useStoreData } from "../../hooks/useStoreData";
import { Button } from "../../components/ui/button";
import { ArrowLeft, Facebook, Instagram, InstagramIcon, MapPinPlus, Search } from "lucide-react";
import { Input } from "../../components/ui/input";
import { useAuthStore } from "../../stores/useAuthStore";
import StoreNavbar from "../../components/layout/StoreNavbar";
import { useStoreManager } from "../../stores/storeManager";

const StoreView = () => {
  const { storeSlug } = useParams();
  const {
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
    handleCategorySelect
  } = useStoreData(storeSlug);


  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }


  if (error || !store) {
    return <StoreNotFound />;
  }

  // Check if feedback is enabled for this store
  const feedbackEnabled = store.settings?.enableFeedback !== false;

  return (
    <div className="min-h-screen bg-background">
      <StoreNavbar store={store} />
      <StoreHeader store={store} />

      <div className="max-w-7xl mx-auto px-4 py-8">

        {/* Products Section */}
        <div className="mb-8">
          <ProductsSection
            filteredProducts={filteredProducts}
            selectedCategory={selectedCategory}
            storeSlug={storeSlug}
            categories={categories}
            handleCategorySelect={handleCategorySelect}
            page={page}
            total={total}
            setPage={setPage}
            loading={loading}
          />
        </div>

        {/* Customer Feedback */}
        <div className="mb-8">
          <CustomerFeedback storeId={store.id} feedbacks={feedbacks} />
        </div>

        {/* Store FAQ */}
        {/* <div className="mb-8">
            <StoreFAQ storeId={store.id} />
          </div> */}

        {/* Social Media Section */}
        <div className="text-center flex flex-wrap justify-center gap-4">
          {store.instaHandle && (
            <a
              href={store.instaHandle}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-full px-6 py-2 font-medium text-white bg-gradient-to-r from-pink-500 via-purple-500 to-yellow-400 hover:from-pink-600 hover:via-purple-600 hover:to-yellow-500 transition-colors duration-200"
            >
              <InstagramIcon className="h-5 w-5 mr-2" />
              Follow us on Instagram
            </a>
          )}

          {store.location && (
            <a
              href={store.location}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-full px-6 py-2 font-medium text-white bg-green-500 hover:bg-green-600 transition-colors duration-200"
            >
              <MapPinPlus className="h-5 w-5 mr-2" />
              Find us on Maps
            </a>
          )}

          {store.fbHandle && (
            <a
              href={store.fbHandle}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-full px-6 py-2 font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200"
            >
              <Facebook className="h-5 w-5 mr-2" />
              Follow us on Facebook
            </a>
          )}
        </div>

      </div>
    </div>

  );
};

export default StoreView;
