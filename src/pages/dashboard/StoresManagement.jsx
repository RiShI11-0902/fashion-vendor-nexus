
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../../stores/useAuthStore";
import { useStoreManager } from "../../stores/useStoreManager";
import DashboardLayout from "../../components/layout/DashboardLayout";
import StoreCard from "../../components/stores/StoreCard";
import { Button } from "../../components/ui/button";
import { Plus, Search } from "lucide-react";
import { Input } from "../../components/ui/input";

const StoresManagement = () => {
  const { currentUser } = useAuthStore();
  const { getUserStores } = useStoreManager();
  const [userStores, setUserStores] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  console.log(getUserStores);
  
  
  useEffect(() => {
    if (currentUser) {
      const stores = getUserStores(currentUser.id);
      setUserStores(stores);
    }
  }, [currentUser, getUserStores]);
  
  const filteredStores = userStores.filter(store => 
    store.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (store.description && store.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );
  
  return (
    <DashboardLayout>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-display font-bold mb-2">Your Stores</h1>
          <p className="text-gray-600">Manage your fashion brand stores</p>
        </div>
        <Button asChild>
          <Link to="/dashboard/create-store">
            <Plus className="mr-2 h-4 w-4" /> Create Store
          </Link>
        </Button>
      </div>
      
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search stores..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      
      {filteredStores.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          {searchTerm ? (
            <>
              <h2 className="text-xl font-semibold mb-2">No stores found</h2>
              <p className="text-gray-600 mb-4">
                No stores match your search for "{searchTerm}"
              </p>
              <Button variant="outline" onClick={() => setSearchTerm("")}>
                Clear Search
              </Button>
            </>
          ) : (
            <>
              <h2 className="text-xl font-display font-semibold mb-2">Create Your First Store</h2>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">
                Get started by creating your first fashion store to showcase your products.
              </p>
              <Button asChild>
                <Link to="/dashboard/create-store">
                  <Plus className="mr-2 h-4 w-4" /> Create Store
                </Link>
              </Button>
            </>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStores.map(store => (
            <div key={store.id} className="relative group">
              <StoreCard store={store} />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100">
                <div className="bg-white/90 rounded-md shadow-md p-2">
                  <div className="flex space-x-2">
                    <Button asChild size="sm" variant="outline">
                      <Link to={`/dashboard/stores/${store.id}`}>
                        Manage
                      </Link>
                    </Button>
                    <Button asChild size="sm">
                      <Link to={`/dashboard/stores/edit/${store.id}`}>
                        Edit
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </DashboardLayout>
  );
};

export default StoresManagement;
