import { Link } from "react-router-dom";
import { Plus } from "lucide-react";
import { Button } from "../ui/button";

const StoresHeader = () => {
  return (
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
  );
};

export default StoresHeader;