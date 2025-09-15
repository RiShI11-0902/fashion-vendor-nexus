
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
  const { currentUser, checkAuth } = useAuthStore();
  const { getUserStores, getStoreProducts, getlowStockProducts } = useStoreManager();
  const { getOrderStats } = useOrdersStore();
  const [userStore, setUserStore] = useState(null);
  const [overallStats, setOverallStats] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchStoreData = async () => {
    setLoading(true);
    const stores = await getUserStores(currentUser.id);
    const store = stores.length > 0 ? stores[0] : null;
    setUserStore(store);

    if (store) {
      // Calculate stats for the single store
      const stats = getOrderStats();
      const totalProducts = await getStoreProducts(store.id);

      const {lowStockProducts} = getlowStockProducts(store.id)      

      setOverallStats({
        ...stats,
        totalProducts: totalProducts.length,
        totalLowStock:  lowStockProducts.length // Will be implemented when needed
      });
    }
    setLoading(false);
  };

  useEffect(() => {
    (async () => {
      await checkAuth();  // ensures Zustand updates
    })();
  }, []);


  useEffect(() => {
    if (currentUser) {
      fetchStoreData();
    }
  }, [currentUser, getUserStores, getOrderStats, getStoreProducts, getlowStockProducts]);

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

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <DashboardHeader userStore={userStore} userName={currentUser.name} />

        {!userStore ? (
          <NoStoresState />
        ) : (
          <>
            <DashboardStats stats={overallStats} />
            <StoreAnalyticsSection
              userStores={[userStore]}
              selectedStore={userStore.id}
              setSelectedStore={() => { }} // No-op since there's only one store
            />
          </>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
