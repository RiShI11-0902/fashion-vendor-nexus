
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../../stores/useAuthStore";
import { useStoreManager } from "../../stores/useStoreManager";
import { useOrdersStore } from "../../stores/useOrdersStore";
import { dashboardCache } from "../../lib/storeCache";
import DashboardLayout from "../../components/layout/DashboardLayout";
import DashboardHeader from "../../components/dashboard/DashboardHeader";
import DashboardStats from "../../components/dashboard/DashboardStats";
import NoStoresState from "../../components/dashboard/NoStoresState";
import StoreAnalyticsSection from "../../components/dashboard/StoreAnalyticsSection";
import { Button } from "../../components/ui/button";

const Dashboard = () => {
  const { currentUser, checkAuth } = useAuthStore();
  const { getStoreProducts, getUserStores, getlowStockProducts } = useStoreManager();
  const { getOrderStats } = useOrdersStore();
  const [userStore, setUserStore] = useState(() => dashboardCache.userStores);
  const [overallStats, setOverallStats] = useState(() => dashboardCache.overallStats);
  const [loading, setLoading] = useState(!dashboardCache.userStores);
  const fetched = useRef(false);

  const fetchStoreData = async () => {
    // Use cache if available
    if (dashboardCache.userStores && dashboardCache.overallStats) {
      setUserStore(dashboardCache.userStores);
      setOverallStats(dashboardCache.overallStats);
      setLoading(false);
      return;
    }

    setLoading(true);
    const store = await getUserStores(currentUser.id);
    dashboardCache.userStores = store;
    setUserStore(store);

    if (store.length > 0) {
      const stats = getOrderStats();
      const { total } = await getStoreProducts(store[0]?.id);
      const { lowStockProducts } = await getlowStockProducts(store[0]?.id);

      const computedStats = {
        ...stats,
        totalProducts: total,
        totalLowStock: lowStockProducts?.length || 0,
      };
      dashboardCache.overallStats = computedStats;
      setOverallStats(computedStats);
    }
    setLoading(false);
  };

  useEffect(() => {
    (async () => {
      await checkAuth();
    })();
  }, []);

  useEffect(() => {
    if (currentUser && !fetched.current) {
      fetched.current = true;
      fetchStoreData();
    }
  }, [currentUser]);

  if (!currentUser) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <h2 className="text-2xl font-display font-semibold mb-4">
              Please log in to access your dashboard
            </h2>
            <Button asChild>
              <Link to="/">Go to Homepage</Link>
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

        {userStore.length == 0 ? (
          <NoStoresState />
        ) : (
          <>
            <DashboardStats stats={overallStats} />
            <StoreAnalyticsSection selectedStore={userStore[0]?.id} />
          </>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
