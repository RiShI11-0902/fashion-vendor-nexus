import { Link } from "react-router-dom";
import { Package } from "lucide-react";
import { Button } from "../ui/button";
import MainLayout from "../layout/MainLayout";

const StoreNotFound = () => {
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-12 text-center">
        <Package className="h-12 w-12 mx-auto text-gray-400 mb-4" />
        <h2 className="text-2xl font-display font-semibold mb-2">Store Not Found</h2>
        <p className="text-gray-600 mb-6">
          The store you're looking for doesn't exist or might have been removed.
        </p>
        <Button asChild>
          <Link to="/stores">Explore Other Stores</Link>
        </Button>
      </div>
    </MainLayout>
  );
};

export default StoreNotFound;