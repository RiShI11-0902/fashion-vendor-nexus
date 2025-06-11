
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";

const DashboardHeader = ({ userName }) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div>
        <h1 className="text-3xl font-display font-bold">
          Welcome back, {userName}!
        </h1>
        <p className="text-gray-600">
          Here's what's happening with your fashion business today.
        </p>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-3">
        <Button asChild variant="outline">
          <Link to="/dashboard/products/create">
            <Plus className="mr-2 h-4 w-4" /> Add Product
          </Link>
        </Button>
        <Button asChild>
          <Link to="/dashboard/create-store">
            <Plus className="mr-2 h-4 w-4" /> Create Store
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default DashboardHeader;
