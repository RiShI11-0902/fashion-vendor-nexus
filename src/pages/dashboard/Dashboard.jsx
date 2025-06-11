
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../../stores/useAuthStore";
import { useStoreManager } from "../../stores/useStoreManager";
import { useOrdersStore } from "../../stores/useOrdersStore";
import DashboardLayout from "../../components/layout/DashboardLayout";
import DashboardHeader from "../../components/dashboard/DashboardHeader";
import DashboardStats from "../../components/dashboard/DashboardStats";
import NoStoresState from "../../components/dashboard/NoStoresState";
import StoreAnalyticsSection from "../../components/dashboard/StoreAnalyticsSection";
import { Button } from "../../components/ui/button";

const Dashboard = () => {
  const { currentUser } = useAuthStore();
  const { getUserStores, getStoreProducts, getLowStockProducts } = useStoreManager();
  const { getOrderStats } = useOrdersStore();
  const [selectedStore, setSelectedStore] = useState("");
  const [userStores, setUserStores] = useState([]);
  const [overallStats, setOverallStats] = useState(null);

  useEffect(() => {
    if (currentUser) {
      const stores = getUserStores(currentUser.id);
      setUserStores(stores);
      
      if (stores.length > 0 && !selectedStore) {
        setSelectedStore(stores[0].id);
      }

      // Calculate overall stats
      const stats = getOrderStats();
      const totalProducts = stores.reduce((sum, store) => {
        return sum + getStoreProducts(store.id).length;
      }, 0);
      
      const totalLowStock = stores.reduce((sum, store) => {
        return sum + getLowStockProducts(store.id).length;
      }, 0);

      setOverallStats({
        ...stats,
        totalStores: stores.length,
        totalProducts,
        totalLowStock
      });
    }
  }, [currentUser, getUserStores, getOrderStats, getStoreProducts, getLowStockProducts, selectedStore]);

  if (!currentUser) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <h2 className="text-2xl font-display font-semibold mb-4">
              Please log in to access your dashboard
            </h2>
            <Button asChild>
              <Link to="/login">Login</Link>
            </Button>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <DashboardHeader userName={currentUser.name} />

        {userStores.length === 0 ? (
          <NoStoresState />
        ) : (
          <>
            <DashboardStats stats={overallStats} />
            <StoreAnalyticsSection 
              userStores={userStores}
              selectedStore={selectedStore}
              setSelectedStore={setSelectedStore}
            />
          </>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
