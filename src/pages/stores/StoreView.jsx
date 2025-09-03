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
import { ArrowLeft, Instagram, Search } from "lucide-react";
import { Input } from "../../components/ui/input";

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
      <div className="min-h-screen bg-gray-50">
        <StoreHeader store={store} />

        <div className="max-w-6xl mx-auto px-4 py-8">
          {/* Navigation */}
          <div className="mb-8">
            <Button asChild variant="ghost" className="mb-6 text-gray-600 hover:text-gray-900">
              <Link to="/stores" className="flex items-center">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Stores
              </Link>
            </Button>

            {/* Search and Filter Bar */}
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                {/* <Input
                  placeholder="Search products..."
                  className="pl-12 py-3 rounded-full border-2 border-gray-100 focus:border-pink-300 transition-colors"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                /> */}
              </div>

              {/* Products Section */}
              <ProductsSection
                filteredProducts={filteredProducts}
                selectedCategory={selectedCategory}
                storeSlug={storeSlug}
              />

              {/* <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 md:gap-4">
                {mockInstagramPosts.slice(0, instagramFeed.postsCount || 6).map((post) => (
                  <div key={post.id} className="aspect-square relative group cursor-pointer overflow-hidden rounded-lg">
                    <img
                      src={post.image}
                      alt="Instagram post"
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    {instagramFeed.showMetrics !== false && (
                      <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center text-white text-sm">
                        <div className="flex items-center space-x-4">
                          <span className="flex items-center">
                            <Heart className="h-4 w-4 mr-1" />
                            {post.likes.toLocaleString()}
                          </span>
                          <span className="flex items-center">
                            <MessageCircle className="h-4 w-4 mr-1" />
                            {post.comments}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div> */}

              <div className="text-center mt-8">
                <Button variant="outline" className="inline-flex items-center rounded-full px-8 border-2 hover:bg-gray-50">
                  <Instagram className="h-5 w-5 mr-2" />
                  {/* @{instagramFeed.username} */}
                  {/* <ExternalLink className="h-4 w-4 ml-2" /> */}
                </Button>
              </div>
            </div>
          </div>
          {/* <MainLayout>
      </MainLayout> */}
        </div>
      </div>

  );
};

export default StoreView;
