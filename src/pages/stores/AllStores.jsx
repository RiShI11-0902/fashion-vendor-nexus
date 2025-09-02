
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useStoreManager } from "../../stores/useStoreManager";
import MainLayout from "../../components/layout/MainLayout";
import StoreCard from "../../components/stores/StoreCard";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { Search, ShoppingBag } from "lucide-react";

const AllStores = () => {
  const { stores } = useStoreManager();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredStores, setFilteredStores] = useState([]);
  
  useEffect(() => {
    // Filter stores based on search term
    const filtered = stores?.filter(store => 
      store.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (store.description && store.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (store.categories && store.categories.some(category => 
        category.toLowerCase().includes(searchTerm.toLowerCase())
      ))
    );
    setFilteredStores(filtered);
  }, [stores, searchTerm]);

  console.log(filteredStores, stores);
  
  
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
            Explore Fashion Stores
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover unique fashion brands and products from independent designers
          </p>
        </div>
        
        <div className="max-w-md mx-auto mb-12">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              placeholder="Search for stores or categories..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        
        {filteredStores?.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <ShoppingBag className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <h2 className="text-xl font-display font-semibold mb-2">No stores found</h2>
            <p className="text-gray-600 mb-6">
              {searchTerm ? `No results for "${searchTerm}"` : "There are no stores available yet"}
            </p>
            {searchTerm && (
              <Button variant="outline" onClick={() => setSearchTerm("")}>
                Clear Search
              </Button>
            )}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredStores?.map(store => (
                <StoreCard key={store.id} store={store} />
              ))}
            </div>
            
            <div className="text-center mt-12">
              <p className="text-lg font-display mb-4">Want to create your own fashion store?</p>
              <Button asChild>
                <Link to="/signup">Start Your Store</Link>
              </Button>
            </div>
          </>
        )}
      </div>
    </MainLayout>
  );
};

export default AllStores;
