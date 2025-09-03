
import { useEffect, useState } from "react";
import { useOrdersStore } from "../../stores/useOrdersStore";
import { useStoreManager } from "../../stores/useStoreManager";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "../ui/chart";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { TrendingUp, Package, AlertTriangle, DollarSign } from "lucide-react";

const StoreAnalytics = ({ storeId }) => {
  const { getOrderStats, getStoreOrders } = useOrdersStore();
  const { getStoreProducts, getLowStockProducts } = useStoreManager();
  const [stats, setStats] = useState(null);
  const [topProducts, setTopProducts] = useState([]);
  const [lowStockProducts, setLowStockProducts] = useState([]);
  const [chartData, setChartData] = useState({ topProducts: [], orderStatus: [] });

  const chartConfig = {
    sales: {
      label: "Sales",
      color: "#8b5cf6",
    },
    orders: {
      label: "Orders",
      color: "#06b6d4",
    },
  };

  useEffect(() => {
    if (storeId) {
      const orderStats = getOrderStats(storeId);
      setStats(orderStats);

      const storeOrders = getStoreOrders(storeId);
      const products = getStoreProducts(storeId);
      const lowStock =  0 ;
      
      // Calculate top selling products getLowStockProducts(storeId)
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
          return { product, quantity, name: product?.name || 'Unknown', sales: quantity };
        })
        .filter(item => item.product);

      // Order status for pie chart
      const statusData = [
        { name: 'Pending', value: storeOrders.filter(o => o.status === 'pending').length, color: '#f59e0b' },
        { name: 'Confirmed', value: storeOrders.filter(o => o.status === 'confirmed').length, color: '#10b981' },
        { name: 'Shipped', value: storeOrders.filter(o => o.status === 'shipped').length, color: '#06b6d4' },
        { name: 'Delivered', value: storeOrders.filter(o => o.status === 'delivered').length, color: '#8b5cf6' },
      ].filter(item => item.value > 0);

      setTopProducts(topSellingProducts);
      setLowStockProducts(lowStock);
      setChartData({
        topProducts: topSellingProducts,
        orderStatus: statusData
      });
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
            <div className="text-2xl font-bold">₹{stats.totalRevenue.toFixed(2)}</div>
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

      {/* Charts and Data */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Products Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="mr-2 h-5 w-5" />
              Top Selling Products
            </CardTitle>
          </CardHeader>
          <CardContent>
            {chartData.topProducts.length > 0 ? (
              <div className="space-y-4">
                <ChartContainer config={chartConfig} className="h-[200px]">
                  <BarChart data={chartData.topProducts}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" angle={-45} textAnchor="end" height={60} />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="sales" fill="var(--color-sales)" />
                  </BarChart>
                </ChartContainer>
                
                {/* Product List */}
                <div className="space-y-2">
                  {topProducts.slice(0, 3).map(({ product, quantity }, index) => (
                    <div key={product.id} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Badge variant="outline">{index + 1}</Badge>
                        <div>
                          <p className="font-medium text-sm">{product.name}</p>
                          <p className="text-xs text-gray-500">₹{product.price}</p>
                        </div>
                      </div>
                      <Badge>{quantity} sold</Badge>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <p className="text-gray-500">No sales data available</p>
            )}
          </CardContent>
        </Card>

        {/* Order Status Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Package className="mr-2 h-5 w-5" />
              Order Status Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            {chartData.orderStatus.length > 0 ? (
              <ChartContainer config={chartConfig} className="h-[200px]">
                <PieChart>
                  <Pie
                    data={chartData.orderStatus}
                    cx="50%"
                    cy="50%"
                    outerRadius={60}
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}`}
                  >
                    {chartData.orderStatus.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <ChartTooltip />
                </PieChart>
              </ChartContainer>
            ) : (
              <p className="text-gray-500">No order data available</p>
            )}
          </CardContent>
        </Card>

        {/* Low Stock Alerts */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center">
              <AlertTriangle className="mr-2 h-5 w-5 text-yellow-500" />
              Low Stock Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            {lowStockProducts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {lowStockProducts.map(product => (
                  <div key={product.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">{product.name}</p>
                      <p className="text-sm text-gray-500">₹{product.price}</p>
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
