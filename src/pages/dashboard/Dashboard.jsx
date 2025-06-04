
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../../stores/useAuthStore";
import { useStoreManager } from "../../stores/useStoreManager";
import { useOrdersStore } from "../../stores/useOrdersStore";
import DashboardLayout from "../../components/layout/DashboardLayout";
import StoreAnalytics from "../../components/analytics/StoreAnalytics";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { 
  Store, 
  Package, 
  ShoppingCart, 
  Plus,
  TrendingUp,
  AlertTriangle
} from "lucide-react";

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
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-display font-bold">
              Welcome back, {currentUser.name}!
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

        {userStores.length === 0 ? (
          /* No Stores State */
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
        ) : (
          <>
            {/* Overall Stats */}
            {overallStats && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Stores</CardTitle>
                    <Store className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{overallStats.totalStores}</div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Products</CardTitle>
                    <Package className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{overallStats.totalProducts}</div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
                    <ShoppingCart className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{overallStats.totalOrders}</div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Low Stock Items</CardTitle>
                    <AlertTriangle className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {overallStats.totalLowStock}
                      {overallStats.totalLowStock > 0 && (
                        <Badge variant="destructive" className="ml-2 text-xs">
                          Alert
                        </Badge>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Store Analytics */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-display font-semibold">Store Analytics</h2>
                <Select value={selectedStore} onValueChange={setSelectedStore}>
                  <SelectTrigger className="w-64">
                    <SelectValue placeholder="Select a store" />
                  </SelectTrigger>
                  <SelectContent>
                    {userStores.map(store => (
                      <SelectItem key={store.id} value={store.id}>
                        {store.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              {selectedStore && <StoreAnalytics storeId={selectedStore} />}
            </div>
          </>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
