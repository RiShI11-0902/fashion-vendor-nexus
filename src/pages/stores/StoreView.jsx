
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useStore } from "../../contexts/StoreContext";
import MainLayout from "../../components/layout/MainLayout";
import { Button } from "../../components/ui/button";
import { ShoppingBag, ArrowLeft, Package, Search } from "lucide-react";
import { Input } from "../../components/ui/input";
import { Badge } from "../../components/ui/badge";
import ProductCard from "../../components/products/ProductCard";

const StoreView = () => {
  const { storeSlug } = useParams();
  const { getStoreBySlug, getStoreProducts } = useStore();
  const [store, setStore] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  
  useEffect(() => {
    if (storeSlug) {
      const foundStore = getStoreBySlug(storeSlug);
      
      if (foundStore) {
        setStore(foundStore);
        const storeProducts = getStoreProducts(foundStore.id);
        setProducts(storeProducts);
      } else {
        setError("Store not found");
      }
      
      setLoading(false);
    }
  }, [storeSlug, getStoreBySlug, getStoreProducts]);
  
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
            The store you're looking for doesn't exist or might have been removed.
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
  
  return (
    <MainLayout>
      <div className="relative">
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
      </div>
      
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/3 lg:w-1/4">
            <div className="sticky top-24">
              <Button asChild variant="ghost" className="mb-6">
                <Link to="/stores" className="flex items-center">
                  <ArrowLeft className="mr-2 h-4 w-4" /> Back to Stores
                </Link>
              </Button>
              
              <div className="bg-gray-50 rounded-lg p-6 mb-6">
                <h3 className="font-display font-semibold mb-4">About the Store</h3>
                <p className="text-gray-600 mb-4">
                  {store.description || "No description available"}
                </p>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-6">
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
                  <p className="text-gray-600">No categories available</p>
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
              <div className="text-center py-12 bg-gray-50 rounded-lg">
                <Package className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <h2 className="text-xl font-display font-semibold mb-2">
                  {searchTerm ? "No products found" : "No products available"}
                </h2>
                <p className="text-gray-600 mb-6">
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
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map(product => (
                  <ProductCard 
                    key={product.id} 
                    product={product} 
                    storeSlug={store.slug} 
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default StoreView;
