
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useStoreManager } from "../../stores/useStoreManager";
import MainLayout from "../../components/layout/MainLayout";
import { Button } from "../../components/ui/button";
import { ShoppingBag, ArrowLeft, Package, Search, Instagram, Heart, MessageCircle, ExternalLink, Eye, Plus, Filter } from "lucide-react";
import { Input } from "../../components/ui/input";
import { Badge } from "../../components/ui/badge";
import { toast } from "sonner";

const StoreView = () => {
  const { storeSlug } = useParams();
  const { getStoreBySlug, getStoreProducts, stores } = useStoreManager();
  const [store, setStore] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [hoveredProduct, setHoveredProduct] = useState(null);

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

  const themeClasses = isDarkMode ? 'dark bg-gray-900 text-white' : 'bg-white text-gray-900';

  return (
    <div className={themeClasses}>
      {/* Store Header */}

      <div className="relative">
        <div className="h-48 md:h-96 relative overflow-hidden">
          {true ? (
            <img
              src={"https://www.worldfashionexchange.com/blog/wp-content/uploads/2025/05/Fashion-Brands-Banner-image.webp"}
              alt={store.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="flex items-center justify-center h-full bg-gradient-to-br from-pink-50 to-purple-50">
              <ShoppingBag className="h-16 w-16 text-gray-400" />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

          {/* Store Info Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <div className="max-w-6xl mx-auto">
              <h1 className="text-3xl md:text-4xl font-bold mb-2">{store.name}</h1>
              <p className="text-lg opacity-90 mb-3">
                {store.description || "Discover amazing fashion pieces"}
              </p>
              <div className="flex flex-wrap gap-2">
                {store.categories && store.categories.map((category, index) => (
                  <Badge key={index} variant="outline" className="bg-white/20 text-white border-white/40">
                    {category}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

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
              <Input
                placeholder="Search products..."
                className="pl-12 py-3 rounded-full border-2 border-gray-100 focus:border-pink-300 transition-colors"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="outline" size="sm" className="rounded-full">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="text-center py-20 bg-gray-50 rounded-2xl">
            <Package className="h-16 w-16 mx-auto text-gray-400 mb-6" />
            <h2 className="text-2xl font-bold mb-3">
              {searchTerm ? "No products found" : "No products available"}
            </h2>
            <p className="text-gray-600 mb-8 text-lg">
              {searchTerm
                ? `No results for "${searchTerm}"`
                : "This store hasn't added any products yet"
              }
            </p>
            {searchTerm && (
              <Button variant="outline" onClick={() => setSearchTerm("")} className="rounded-full px-8">
                Clear Search
              </Button>
            )}
          </div>
        ) : (
          <>
            {/* Products Grid - Instagram Style */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-4 mb-12">
              {filteredProducts.map(product => (
                <div
                  key={product.id}
                  className="aspect-square relative group cursor-pointer overflow-hidden bg-gray-100 rounded-lg shadow-sm hover:shadow-lg transition-all duration-300"
                  onMouseEnter={() => setHoveredProduct(product.id)}
                  onMouseLeave={() => setHoveredProduct(null)}
                >
                  {product.imageUrl ? (
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full bg-gradient-to-br from-gray-100 to-gray-200">
                      <Package className="h-12 w-12 text-gray-400" />
                    </div>
                  )}

                  {/* Hover Overlay */}
                  <div className={`absolute inset-0 bg-black bg-opacity-50 transition-opacity duration-300 ${hoveredProduct === product.id ? 'opacity-100' : 'opacity-0'
                    } flex items-center justify-center`}>
                    <div className="text-white text-center space-y-3">
                      <div className="flex items-center justify-center space-x-6">
                        <span className="flex items-center text-sm font-medium hover:scale-110 transition-transform cursor-pointer">
                          <Heart className="h-4 w-4 mr-1" />
                          Like
                        </span>
                        <span className="flex items-center text-sm font-medium hover:scale-110 transition-transform cursor-pointer">
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </span>
                      </div>
                      <h3 className="font-semibold text-lg px-2">{product.name}</h3>
                      <div className="text-xl font-bold">${product.price}</div>
                    </div>
                  </div>

                  {/* Quick Shop Button */}
                  <div className={`absolute top-3 right-3 transition-all duration-300 ${hoveredProduct === product.id ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
                    }`}>
                    <Button
                      asChild
                      size="sm"
                      className="rounded-full bg-white text-gray-900 hover:bg-gray-100 shadow-lg w-10 h-10 p-0"
                    >
                      <Link to={`/store/${store.slug}/product/${product.id}`}>
                        <Plus className="h-4 w-4" />
                      </Link>
                    </Button>
                  </div>

                  {/* Price Badge - Always Visible */}
                  <div className="absolute bottom-3 left-3">
                    <Badge className="bg-white/95 text-gray-900 font-semibold shadow-sm">
                      ${product.price}
                    </Badge>
                  </div>

                  {/* Category Badge */}
                  {product.category && (
                    <div className="absolute top-3 left-3">
                      <Badge variant="secondary" className="bg-black/70 text-white text-xs">
                        {product.category}
                      </Badge>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Product Names Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-4 mb-16">
              {filteredProducts.map(product => (
                <div key={`name-${product.id}`} className="text-center space-y-1">
                  <h3 className="font-medium text-sm truncate">{product.name}</h3>
                  {product.category && (
                    <p className="text-xs text-gray-500">{product.category}</p>
                  )}
                </div>
              ))}
            </div>
          </>
        )}

        {/* Instagram Feed Section */}
        {instagramFeed.enabled && instagramFeed.username && (
          <div className="mt-20 pt-16 border-t">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-3">
                {instagramFeed.feedTitle || 'Follow us on Instagram'}
              </h2>
              <p className="text-gray-600">Stay updated with our latest fashion inspiration</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 md:gap-4">
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
            </div>

            <div className="text-center mt-8">
              <Button variant="outline" className="inline-flex items-center rounded-full px-8 border-2 hover:bg-gray-50">
                <Instagram className="h-5 w-5 mr-2" />
                @{instagramFeed.username}
                <ExternalLink className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </div>
        )}
      </div>
      {/* <MainLayout>
      </MainLayout> */}
    </div>
  );
};

export default StoreView;
