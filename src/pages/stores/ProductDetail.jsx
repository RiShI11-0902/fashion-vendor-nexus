
import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../stores/useAuthStore";
import MainLayout from "../../components/layout/MainLayout";
import { Button } from "../../components/ui/button";
import { ArrowLeft, ShoppingBag, Package } from "lucide-react";
import { toast } from "sonner";
import { useStoreManager } from "../../stores/useStoreManager";

const ProductDetail = () => {
  const { storeSlug, productId } = useParams();
  const { getStoreBySlug, products } = useStoreManager();
  const [product, setProduct] = useState(null);
  const [store, setStore] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  
  useEffect(() => {
    if (storeSlug && productId) {
      const foundStore = getStoreBySlug(storeSlug);
      
      if (foundStore) {
        setStore(foundStore);
        const foundProduct = products.find(p => p.id === productId && p.storeId === foundStore.id);
        
        if (foundProduct) {
          setProduct(foundProduct);
        } else {
          setError("Product not found");
        }
      } else {
        setError("Store not found");
      }
      
      setLoading(false);
    }
  }, [storeSlug, productId, getStoreBySlug, products]);
  
  const handleAddToCart = () => {
    // In a real app, this would add the product to cart
    toast.success(`${product.name} added to cart`);
  };
  
  if (loading) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      </MainLayout>
    );
  }
  
  if (error || !store || !product) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-12 text-center">
          <Package className="h-12 w-12 mx-auto text-gray-400 mb-4" />
          <h2 className="text-2xl font-display font-semibold mb-2">Product Not Found</h2>
          <p className="text-gray-600 mb-6">
            The product you're looking for doesn't exist or might have been removed.
          </p>
          <Button asChild>
            <Link to={`/store/${storeSlug}`}>Back to Store</Link>
          </Button>
        </div>
      </MainLayout>
    );
  }
  
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-12">
        <Button asChild variant="ghost" className="mb-6">
          <Link to={`/store/${storeSlug}`} className="flex items-center">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to {store.name}
          </Link>
        </Button>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="h-96 md:h-auto bg-gray-100 rounded-lg overflow-hidden">
            {product.imageUrl ? (
              <img 
                src={product.imageUrl} 
                alt={product.name} 
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="flex items-center justify-center h-full text-gray-400">
                <Package className="h-16 w-16" />
              </div>
            )}
          </div>
          
          <div>
            <h1 className="text-3xl font-display font-bold mb-2">{product.name}</h1>
            <div className="flex items-center mb-6">
              <span className="text-2xl font-semibold mr-3">${product.price}</span>
              {product.category && (
                <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                  {product.category}
                </span>
              )}
            </div>
            
            <div className="prose max-w-none mb-8">
              <p className="text-gray-600">
                {product.description || "No description available"}
              </p>
            </div>
            
            <div className="mb-8">
              <h3 className="font-medium mb-2">Availability:</h3>
              <p className="text-gray-700">
                {(product.inventory && product.inventory > 0)
                  ? `In Stock (${product.inventory} available)`
                  : "Out of Stock"
                }
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="flex-1"
                onClick={handleAddToCart}
                disabled={!product.inventory || product.inventory <= 0}
              >
                <ShoppingBag className="mr-2 h-5 w-5" />
                Add to Cart
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="flex-1"
                onClick={() => navigate(`/store/${storeSlug}`)}
              >
                Continue Shopping
              </Button>
            </div>
            
            <div className="mt-12 border-t pt-6">
              <h3 className="font-display font-semibold mb-4">About the Store</h3>
              <div className="flex items-center">
                <div className="mr-4">
                  {store.imageUrl ? (
                    <img 
                      src={store.imageUrl} 
                      alt={store.name} 
                      className="h-12 w-12 rounded-full object-cover"
                    />
                  ) : (
                    <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center">
                      <ShoppingBag className="h-6 w-6 text-gray-400" />
                    </div>
                  )}
                </div>
                <div>
                  <h4 className="font-medium mb-1">{store.name}</h4>
                  <Button asChild variant="link" className="p-0 h-auto">
                    <Link to={`/store/${storeSlug}`}>View Store</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ProductDetail;
