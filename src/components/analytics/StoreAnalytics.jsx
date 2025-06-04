
import { useEffect, useState } from "react";
import { useOrdersStore } from "../../stores/useOrdersStore";
import { useStoreManager } from "../../stores/useStoreManager";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { TrendingUp, Package, AlertTriangle, DollarSign } from "lucide-react";

const StoreAnalytics = ({ storeId }) => {
  const { getOrderStats, getStoreOrders } = useOrdersStore();
  const { getStoreProducts, getLowStockProducts } = useStoreManager();
  const [stats, setStats] = useState(null);
  const [topProducts, setTopProducts] = useState([]);
  const [lowStockProducts, setLowStockProducts] = useState([]);

  useEffect(() => {
    if (storeId) {
      const orderStats = getOrderStats(storeId);
      setStats(orderStats);

      const storeOrders = getStoreOrders(storeId);
      const products = getStoreProducts(storeId);
      const lowStock = getLowStockProducts(storeId);
      
      // Calculate top selling products
      const productSales = {};
      storeOrders.forEach(order => {
        order.items.forEach(item => {
          if (item.storeId === storeId) {
            productSales[item.productId] = (productSales[item.productId] || 0) + item.quantity;
          }
        });
      });

      const topSellingProducts = Object.entries(productSales)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 5)
        .map(([productId, quantity]) => {
          const product = products.find(p => p.id === productId);
          return { product, quantity };
        })
        .filter(item => item.product);

      setTopProducts(topSellingProducts);
      setLowStockProducts(lowStock);
    }
  }, [storeId, getOrderStats, getStoreOrders, getStoreProducts, getLowStockProducts]);

  if (!stats) return null;

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalOrders}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${stats.totalRevenue.toFixed(2)}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Orders</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pendingOrders}</div>
          </CardContent>
        </Card>
      </div>

      {/* Top Products and Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Selling Products */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="mr-2 h-5 w-5" />
              Top Selling Products
            </CardTitle>
          </CardHeader>
          <CardContent>
            {topProducts.length > 0 ? (
              <div className="space-y-3">
                {topProducts.map(({ product, quantity }, index) => (
                  <div key={product.id} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Badge variant="outline">{index + 1}</Badge>
                      <div>
                        <p className="font-medium">{product.name}</p>
                        <p className="text-sm text-gray-500">${product.price}</p>
                      </div>
                    </div>
                    <Badge>{quantity} sold</Badge>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No sales data available</p>
            )}
          </CardContent>
        </Card>

        {/* Low Stock Alerts */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <AlertTriangle className="mr-2 h-5 w-5 text-yellow-500" />
              Low Stock Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            {lowStockProducts.length > 0 ? (
              <div className="space-y-3">
                {lowStockProducts.map(product => (
                  <div key={product.id} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{product.name}</p>
                      <p className="text-sm text-gray-500">${product.price}</p>
                    </div>
                    <Badge variant="destructive">{product.inventory} left</Badge>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-green-600">All products have sufficient stock</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StoreAnalytics;
