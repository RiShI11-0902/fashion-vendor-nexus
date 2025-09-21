
import StoreAnalytics from "../analytics/StoreAnalytics";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const StoreAnalyticsSection = ({ userStores, selectedStore, setSelectedStore }) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-display font-semibold">Store Analytics</h2>
      </div>
      
      {<StoreAnalytics storeId={selectedStore} />}
    </div>
  );
};

export default StoreAnalyticsSection;
