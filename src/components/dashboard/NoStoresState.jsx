
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { Store } from "lucide-react";

const NoStoresState = () => {
  return (
    <div className="text-center py-12 bg-gray-50 rounded-lg">
      <Store className="h-16 w-16 mx-auto text-gray-400 mb-4" />
      <h2 className="text-2xl font-display font-semibold mb-2">
        Create Your First Store
      </h2>
      <p className="text-gray-600 mb-6 max-w-md mx-auto">
        Get started by creating your first fashion store. You can add products, 
        manage inventory, and start selling right away.
      </p>
      <Button asChild size="lg">
        <Link to="/dashboard/create-store">
          <Store className="mr-2 h-5 w-5" /> Create Store
        </Link>
      </Button>
    </div>
  );
};

export default NoStoresState;
