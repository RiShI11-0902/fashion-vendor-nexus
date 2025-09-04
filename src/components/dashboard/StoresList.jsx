import { Link } from "react-router-dom";
import { Plus } from "lucide-react";
import StoreCard from "../stores/StoreCard";
import { Button } from "../ui/button";

const StoresList = ({ stores, searchTerm, onClearSearch }) => {
  console.log(stores);
  
  if (stores.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-50 rounded-lg">
        {searchTerm ? (
          <>
            <h2 className="text-xl font-semibold mb-2">No stores found</h2>
            <p className="text-gray-600 mb-4">
              No stores match your search for "{searchTerm}"
            </p>
            <Button variant="outline" onClick={onClearSearch}>
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
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {stores?.map(store => (
        <div key={store.id} className="relative group">
          <StoreCard store={store} />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100">
            <div className="bg-white/90 rounded-md shadow-md p-2">
              <div className="flex space-x-2">
                <Button asChild size="sm" variant="outline">
                  <Link to={`/dashboard/stores/${store?.id}`}>
                    Manage
                  </Link>
                </Button>
                <Button asChild size="sm">
                  <Link to={`/dashboard/stores/edit/${store?.id}`}>
                    Edit
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StoresList;