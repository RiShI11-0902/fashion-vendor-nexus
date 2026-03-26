import { useParams } from "react-router-dom";
import StoreNavbar from "../../components/layout/StoreNavbar";
import StoreHeader from "../../components/store/StoreHeader";
import StoreNotFound from "../../components/store/StoreNotFound";
import ProductsSection from "../../components/store/ProductsSection";
import CustomerFeedback from "../../components/feedback/CustomerFeedback";
import { useStoreData } from "../../hooks/useStoreData";
import { Facebook, Instagram, MapPinPlus } from "lucide-react";

const StoreView = () => {
  const { storeSlug } = useParams();
  const {
    store,
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
  } = useStoreData(storeSlug);

  if (loading && !store) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-primary" />
          <p className="text-muted-foreground text-sm">Loading store…</p>
        </div>
      </div>
    );
  }

  if (error || !store) {
    return <StoreNotFound />;
  }

  return (
    <div className="min-h-screen bg-background">
      <StoreNavbar store={store} />
      <StoreHeader store={store} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">

        {/* Products */}
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

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

        {/* Feedback */}
        <CustomerFeedback storeId={store.id} feedbacks={feedbacks} />

        {/* Social Links */}
        {(store.instaHandle || store.location || store.fbHandle) && (
          <div className="pb-6">
            <div className="h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent mb-8" />
            <div className="flex flex-wrap justify-center gap-3">
              {store.instaHandle && (
                <a
                  href={store.instaHandle}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium text-white bg-gradient-to-r from-pink-500 via-purple-500 to-yellow-400 hover:opacity-90 transition-opacity shadow-lg shadow-pink-500/20"
                >
                  <Instagram className="h-4 w-4" />
                  Follow on Instagram
                </a>
              )}
              {store.location && (
                <a
                  href={store.location}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium text-white bg-green-500 hover:bg-green-600 transition-colors shadow-lg shadow-green-500/20"
                >
                  <MapPinPlus className="h-4 w-4" />
                  Find us on Maps
                </a>
              )}
              {store.fbHandle && (
                <a
                  href={store.fbHandle}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/20"
                >
                  <Facebook className="h-4 w-4" />
                  Follow on Facebook
                </a>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StoreView;
