
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useStoreManager } from "../../stores/useStoreManager";
import MainLayout from "../../components/layout/MainLayout";
import { Button } from "../../components/ui/button";
import { ShoppingBag, ArrowLeft, Package, Search, Instagram, Heart, MessageCircle, ExternalLink } from "lucide-react";
import { Input } from "../../components/ui/input";
import { Badge } from "../../components/ui/badge";
import ProductCard from "../../components/products/ProductCard";
import { toast } from "sonner";

const StoreView = () => {
  const { storeSlug } = useParams();
  const { getStoreBySlug, getStoreProducts, stores } = useStoreManager();
  const [store, setStore] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  
  // Mock Instagram posts for display
  const mockInstagramPosts = [
    { id: 1, image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=300&h=300&fit=crop", likes: 1234, comments: 56 },
    { id: 2, image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=300&h=300&fit=crop", likes: 892, comments: 23 },
    { id: 3, image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=300&h=300&fit=crop", likes: 2156, comments: 78 },
    { id: 4, image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=300&h=300&fit=crop", likes: 765, comments: 34 },
    { id: 5, image: "https://images.unsplash.com/photo-1506629905627-99d2994b29c5?w=300&h=300&fit=crop", likes: 1543, comments: 67 },
    { id: 6, image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=300&h=300&fit=crop", likes: 998, comments: 45 }
  ];
  
  useEffect(() => {
    if (storeSlug) {
      console.log("Looking for store with slug:", storeSlug);
      console.log("Available stores:", stores);
      
      const foundStore = getStoreBySlug(storeSlug);
      
      if (foundStore) {
        console.log("Store found:", foundStore);
        setStore(foundStore);
        const storeProducts = getStoreProducts(foundStore.id);
        setProducts(storeProducts);
        toast.success(`Welcome to ${foundStore.name}`);
      } else {
        console.error(`Store with slug "${storeSlug}" not found`);
        setError("Store not found");
      }
      
      setLoading(false);
    }
  }, [storeSlug, getStoreBySlug, getStoreProducts, stores]);
  
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
          <ShoppingBag className="h-12 w-12 mx-auto text-gray-400 mb-4" />
          <h2 className="text-2xl font-display font-semibold mb-2">Store Not Found</h2>
          <p className="text-gray-600 mb-6">
            The store you're looking for ({storeSlug}) doesn't exist or might have been removed.
          </p>
          <Button asChild>
            <Link to="/stores">Browse All Stores</Link>
          </Button>
        </div>
      </MainLayout>
    );
  }
  
  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (product.description && product.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (product.category && product.category.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const theme = store.theme || {};
  const instagramFeed = store.instagramFeed || {};
  const isDarkMode = theme.mode === 'dark';
  const layout = theme.layout || 'grid';
  
  // Apply theme classes
  const themeClasses = isDarkMode ? 'dark bg-gray-900 text-white' : 'bg-white text-gray-900';
  const containerClasses = theme.compactMode ? 'py-8' : 'py-12';
  
  return (
    <div className={themeClasses}>
      <MainLayout>
        <div className="relative">
          {theme.showBanner !== false && (
            <div className="h-64 md:h-80 bg-gray-100 relative">
              {store.imageUrl ? (
                <img 
                  src={store.imageUrl} 
                  alt={store.name} 
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex items-center justify-center h-full text-gray-400">
                  <ShoppingBag className="h-16 w-16" />
                </div>
              )}
              <div className="absolute inset-0 bg-black bg-opacity-30"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 text-white">
                <h1 className="text-3xl md:text-4xl font-display font-bold mb-2">
                  {store.name}
                </h1>
                <div className="flex flex-wrap gap-2 mt-3">
                  {store.categories && store.categories.map((category, index) => (
                    <Badge key={index} variant="outline" className="bg-white/20 text-white border-white/40">
                      {category}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
        
        <div className={`container mx-auto px-4 ${containerClasses}`}>
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/3 lg:w-1/4">
              <div className="sticky top-24">
                <Button asChild variant="ghost" className="mb-6">
                  <Link to="/stores" className="flex items-center">
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back to Stores
                  </Link>
                </Button>
                
                <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'} rounded-lg p-6 mb-6`}>
                  <h3 className="font-display font-semibold mb-4">About the Store</h3>
                  <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mb-4`}>
                    {store.description || "No description available"}
                  </p>
                </div>
                
                <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'} rounded-lg p-6`}>
                  <h3 className="font-display font-semibold mb-4">Categories</h3>
                  {store.categories && store.categories.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {store.categories.map((category, index) => (
                        <Badge 
                          key={index} 
                          variant="secondary"
                          className="cursor-pointer"
                          onClick={() => setSearchTerm(category)}
                        >
                          {category}
                        </Badge>
                      ))}
                    </div>
                  ) : (
                    <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>No categories available</p>
                  )}
                </div>
              </div>
            </div>
            
            <div className="md:w-2/3 lg:w-3/4">
              <div className="mb-8">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <Input
                    placeholder="Search products..."
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              
              {filteredProducts.length === 0 ? (
                <div className={`text-center py-12 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'} rounded-lg`}>
                  <Package className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <h2 className="text-xl font-display font-semibold mb-2">
                    {searchTerm ? "No products found" : "No products available"}
                  </h2>
                  <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mb-6`}>
                    {searchTerm 
                      ? `No results for "${searchTerm}"`
                      : "This store hasn't added any products yet"
                    }
                  </p>
                  {searchTerm && (
                    <Button variant="outline" onClick={() => setSearchTerm("")}>
                      Clear Search
                    </Button>
                  )}
                </div>
              ) : (
                <div className={
                  layout === 'list' 
                    ? 'space-y-6' 
                    : layout === 'masonry' 
                      ? 'columns-1 md:columns-2 lg:columns-3 gap-6' 
                      : 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
                }>
                  {filteredProducts.map(product => (
                    <ProductCard 
                      key={product.id} 
                      product={product} 
                      storeSlug={store.slug}
                      layout={layout}
                    />
                  ))}
                </div>
              )}

              {/* Instagram Feed */}
              {instagramFeed.enabled && instagramFeed.username && (
                <div className="mt-16">
                  <h2 className="text-2xl font-display font-bold text-center mb-8">
                    {instagramFeed.feedTitle || 'Follow us on Instagram'}
                  </h2>
                  <div className={`grid grid-cols-${Math.min(3, instagramFeed.postsCount || 6)} gap-4`}>
                    {mockInstagramPosts.slice(0, instagramFeed.postsCount || 6).map((post) => (
                      <div key={post.id} className="relative group cursor-pointer">
                        <img 
                          src={post.image} 
                          alt="Instagram post"
                          className="w-full aspect-square object-cover rounded-lg"
                        />
                        {instagramFeed.showMetrics !== false && (
                          <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center text-white text-sm">
                            <div className="flex items-center space-x-4">
                              <span className="flex items-center">
                                <Heart className="h-4 w-4 mr-1" />
                                {post.likes}
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
                  </div>
                  <div className="text-center mt-6">
                    <Button variant="outline" className="inline-flex items-center">
                      <Instagram className="h-4 w-4 mr-2" />
                      @{instagramFeed.username}
                      <ExternalLink className="h-3 w-3 ml-1" />
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </MainLayout>
    </div>
  );
};

export default StoreView;
