
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../../stores/useAuthStore";
import { useStoreManager } from "../../stores/useStoreManager";
import DashboardLayout from "../../components/layout/DashboardLayout";
import ProductCard from "../../components/products/ProductCard";
import { Button } from "../../components/ui/button";
import { Plus, Search, Package } from "lucide-react";
import { Input } from "../../components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";

const ProductsManagement = () => {
  const { currentUser } = useAuthStore();
  const { getUserStores, getStoreProducts, products } = useStoreManager();
  const [userStores, setUserStores] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStore, setSelectedStore] = useState("all");
  
  useEffect(() => {
    const fetchUserStores = async () => {
      if (currentUser) {
        try {
          const stores = await getUserStores(currentUser.id);
          setUserStores(stores || []);          
        } catch (error) {
          console.error('Failed to fetch user stores:', error);
          setUserStores([]);
          setProducts([]);
        }
      }
    };

    fetchUserStores();
  }, [currentUser, getUserStores, getStoreProducts]);
  
  const filteredProducts = products.filter(product => {
    // Filter by store if selected
    if (selectedStore !== "all" && product.storeId !== selectedStore) {
      return false;
    }
    
    // Filter by search term
    return (
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (product.description && product.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (product.category && product.category.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  });
  
  return (
    <DashboardLayout>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-display font-bold mb-2">Your Products</h1>
          <p className="text-gray-600">Manage your fashion products across all stores</p>
        </div>
        <Button asChild>
          <Link to="/dashboard/products/create">
            <Plus className="mr-2 h-4 w-4" /> Add Product
          </Link>
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="md:col-span-2 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search products..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <Select
          value={selectedStore}
          onValueChange={setSelectedStore}
        >
          <SelectTrigger>
            <SelectValue placeholder="Filter by store" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Stores</SelectItem>
            {userStores.map(store => (
              <SelectItem key={store.id} value={store.id}>
                {store.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      {userStores.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <h2 className="text-xl font-display font-semibold mb-2">Create a Store First</h2>
          <p className="text-gray-600 mb-6 max-w-md mx-auto">
            You need to create a store before you can add products.
          </p>
          <Button asChild>
            <Link to="/dashboard/create-store">
              <Plus className="mr-2 h-4 w-4" /> Create Store
            </Link>
          </Button>
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          {searchTerm || selectedStore !== "all" ? (
            <>
              <h2 className="text-xl font-semibold mb-2">No products found</h2>
              <p className="text-gray-600 mb-4">
                Try adjusting your search or filters
              </p>
              <div className="flex justify-center space-x-4">
                {searchTerm && (
                  <Button variant="outline" onClick={() => setSearchTerm("")}>
                    Clear Search
                  </Button>
                )}
                {selectedStore !== "all" && (
                  <Button variant="outline" onClick={() => setSelectedStore("all")}>
                    Show All Stores
                  </Button>
                )}
              </div>
            </>
          ) : (
            <>
              <Package className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <h2 className="text-xl font-display font-semibold mb-2">No Products Yet</h2>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">
                Start adding products to your stores to showcase your fashion items.
              </p>
              <Button asChild>
                <Link to="/dashboard/products/create">
                  <Plus className="mr-2 h-4 w-4" /> Add Product
                </Link>
              </Button>
            </>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-2">
          {filteredProducts.map(product => {
            const store = userStores.find(store => store.id === product.storeId);
            return (
              <ProductCard
                key={product.id}
                product={product}
                isAdmin={true}
                storeSlug={store?.slug || ""}
                storeLogo={store?.logo || store?.imageUrl || ""}
              />
            );
          })}
        </div>
      )}
    </DashboardLayout>
  );
};

export default ProductsManagement;
