
import { useState, useEffect } from "react";
import { useAuthStore } from "../../stores/useAuthStore";
import { useStoreManager } from "../../stores/useStoreManager";
import { useOrdersStore } from "../../stores/useOrdersStore";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "../../components/ui/chart";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { 
  TrendingUp, 
  Package, 
  ShoppingCart, 
  DollarSign,
  AlertTriangle,
  Calendar
} from "lucide-react";

const Analytics = () => {
  const { currentUser } = useAuthStore();
  const { getUserStores, getStoreProducts, getLowStockProducts } = useStoreManager();
  const { getOrderStats, getStoreOrders } = useOrdersStore();
  const [selectedStore, setSelectedStore] = useState("");
  const [userStores, setUserStores] = useState([]);
  const [analyticsData, setAnalyticsData] = useState(null);

  const chartConfig = {
    orders: {
      label: "Orders",
      color: "#8b5cf6",
    },
    revenue: {
      label: "Revenue",
      color: "#06b6d4",
    },
    products: {
      label: "Products",
      color: "#10b981",
    },
  };

  useEffect(() => {
    const fetchUserStores = async () => {
      if (currentUser) {
        try {
          const stores = await getUserStores(currentUser.id);
          setUserStores(stores || []);
          
          if (stores && stores.length > 0 && !selectedStore) {
            setSelectedStore(stores[0].id);
          }
        } catch (error) {
          console.error('Failed to fetch user stores:', error);
          setUserStores([]);
        }
      }
    };

    fetchUserStores();
  }, [currentUser, getUserStores]);

  useEffect(() => {
    if (selectedStore) {
      const stats = getOrderStats(selectedStore);
      const orders = getStoreOrders(selectedStore);
      const products = getStoreProducts(selectedStore);
      // const lowStockProducts = getLowStockProducts(selectedStore);

      // Generate monthly data for charts
      const monthlyData = generateMonthlyData(orders);
      
      // Top products data
      const productSales = {};
      orders.forEach(order => {
        order.items.forEach(item => {
          if (item.storeId === selectedStore) {
            productSales[item.productId] = (productSales[item.productId] || 0) + item.quantity;
          }
        });
      });

      const topProductsData = Object.entries(productSales)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 5)
        .map(([productId, quantity]) => {
          const product = products.find(p => p.id === productId);
          return { 
            name: product?.name || 'Unknown Product', 
            sales: quantity,
            revenue: quantity * (product?.price || 0)
          };
        });

      // Order status distribution
      const statusData = [
        { name: 'Pending', value: orders.filter(o => o.status === 'pending').length, color: '#f59e0b' },
        { name: 'Confirmed', value: orders.filter(o => o.status === 'confirmed').length, color: '#10b981' },
        { name: 'Shipped', value: orders.filter(o => o.status === 'shipped').length, color: '#06b6d4' },
        { name: 'Delivered', value: orders.filter(o => o.status === 'delivered').length, color: '#8b5cf6' },
        { name: 'Cancelled', value: orders.filter(o => o.status === 'cancelled').length, color: '#ef4444' },
      ].filter(item => item.value > 0);

      setAnalyticsData({
        stats,
        monthlyData,
        topProductsData,
        statusData,
        // lowStockCount: lowStockProducts.length,
        totalProducts: products.length
      });
    }
  }, [selectedStore, getOrderStats, getStoreOrders, getStoreProducts, getLowStockProducts]);

  const generateMonthlyData = (orders) => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
    return months.map(month => {
      const monthOrders = orders.filter(order => {
        const orderMonth = new Date(order.createdAt).toLocaleDateString('en', { month: 'short' });
        return orderMonth === month;
      });
      
      return {
        month,
        orders: monthOrders.length,
        revenue: monthOrders.reduce((sum, order) => sum + order.totalAmount, 0),
        customers: new Set(monthOrders.map(order => order.customerId)).size
      };
    });
  };

  if (!currentUser) {
    return (
      <DashboardLayout>
        <div className="text-center py-12">
          <h2 className="text-2xl font-semibold mb-4">Please log in to view analytics</h2>
        </div>
      </DashboardLayout>
    );
  }

  if (userStores.length === 0) {
    return (
      <DashboardLayout>
        <div className="text-center py-12">
          <Package className="h-16 w-16 mx-auto text-gray-400 mb-4" />
          <h2 className="text-2xl font-semibold mb-4">No stores found</h2>
          <p className="text-gray-600 mb-6">Create your first store to see analytics</p>
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
            <h1 className="text-3xl font-display font-bold">Analytics Dashboard</h1>
            <p className="text-gray-600">Detailed insights into your store performance</p>
          </div>
          
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

        {analyticsData && (
          <>
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
                  <ShoppingCart className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{analyticsData.stats.totalOrders}</div>
                  <p className="text-xs text-muted-foreground">
                    {analyticsData.stats.pendingOrders} pending
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">₹{analyticsData.stats.totalRevenue.toFixed(2)}</div>
                  <p className="text-xs text-muted-foreground">
                    +12% from last month
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Products</CardTitle>
                  <Package className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{analyticsData.totalProducts}</div>
                  <p className="text-xs text-muted-foreground">
                    {analyticsData.lowStockCount} low stock
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Avg Order Value</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    ₹{analyticsData.stats.totalOrders > 0 ? (analyticsData.stats.totalRevenue / analyticsData.stats.totalOrders).toFixed(2) : '0.00'}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Per order
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Monthly Revenue Trend */}
              <Card className="col-span-1 lg:col-span-2">
                <CardHeader>
                  <CardTitle>Monthly Revenue & Orders Trend</CardTitle>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={chartConfig} className="h-[300px]">
                    <LineChart data={analyticsData.monthlyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis yAxisId="left" />
                      <YAxis yAxisId="right" orientation="right" />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Line yAxisId="left" type="monotone" dataKey="revenue" stroke="var(--color-revenue)" strokeWidth={2} />
                      <Line yAxisId="right" type="monotone" dataKey="orders" stroke="var(--color-orders)" strokeWidth={2} />
                      <ChartLegend content={<ChartLegendContent />} />
                    </LineChart>
                  </ChartContainer>
                </CardContent>
              </Card>

              {/* Top Products */}
              <Card>
                <CardHeader>
                  <CardTitle>Top Selling Products</CardTitle>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={chartConfig} className="h-[300px]">
                    <BarChart data={analyticsData.topProductsData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="sales" fill="var(--color-products)" />
                    </BarChart>
                  </ChartContainer>
                </CardContent>
              </Card>

              {/* Order Status Distribution */}
              <Card>
                <CardHeader>
                  <CardTitle>Order Status Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={chartConfig} className="h-[300px]">
                    <PieChart>
                      <Pie
                        data={analyticsData.statusData}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        dataKey="value"
                        label={({ name, value }) => `${name}: ${value}`}
                      >
                        {analyticsData.statusData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <ChartTooltip />
                    </PieChart>
                  </ChartContainer>
                </CardContent>
              </Card>
            </div>
          </>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Analytics;
