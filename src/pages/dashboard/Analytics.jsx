import { useState, useEffect, useMemo } from "react";
import { useAuthStore } from "../../stores/useAuthStore";
import { useStoreManager } from "../../stores/useStoreManager";
import { useOrdersStore } from "../../stores/useOrdersStore";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
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
} from "recharts";
import { TrendingUp, Package, ShoppingCart, IndianRupee } from "lucide-react";
import { formatNumber } from "../../lib/utils";
import NoStoresState from "../../components/dashboard/NoStoresState";
import DateRangeFilter from "../../components/analytics/DateRangeFilter";

const Analytics = () => {
  const { currentUser } = useAuthStore();
  const { getUserStores, getStoreProducts, getlowStockProducts } = useStoreManager();
  const { getOrderStats, getStoreOrders } = useOrdersStore();

  const [rawOrders, setRawOrders] = useState([]);
  const [rawProducts, setRawProducts] = useState([]);
  const [lowStockCount, setLowStockCount] = useState(0);
  const [storeId, setStoreId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState({ from: null, to: null });

  const chartConfig = {
    orders: { label: "Orders", color: "#8b5cf6" },
    revenue: { label: "Revenue", color: "#06b6d4" },
    products: { label: "Products", color: "#10b981" },
  };

  useEffect(() => {
    if (!currentUser) return;

    const fetchAnalytics = async () => {
      setLoading(true);
      try {
        const stores = await getUserStores(currentUser.id);
        if (!stores || stores.length === 0) {
          setLoading(false);
          return;
        }

        const sid = stores[0].id;
        setStoreId(sid);

        const { products: fetchedProducts } = await getStoreProducts(sid);
        setRawProducts(fetchedProducts || []);

        const { lowStockProducts } = await getlowStockProducts(sid);
        setLowStockCount(lowStockProducts?.length || 0);

        const { orders } = await getStoreOrders(sid);
        setRawOrders(orders || []);
      } catch (err) {
        console.error("Failed to fetch analytics data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, [currentUser, getUserStores, getStoreProducts, getlowStockProducts, getStoreOrders]);

  const analyticsData = useMemo(() => {
    if (!storeId || rawOrders.length === 0 && rawProducts.length === 0) return null;

    const filtered = dateRange.from
      ? rawOrders.filter((o) => {
          const d = new Date(o.createdAt);
          return d >= dateRange.from && (!dateRange.to || d <= dateRange.to);
        })
      : rawOrders;

    const totalOrders = filtered.length;
    const totalRevenue = filtered.reduce(
      (sum, o) => (o.status !== "CANCELLED" ? sum + o.totalAmount : sum),
      0
    );
    const pendingOrders = filtered.filter((o) => o.status === "PENDING").length;

    // Monthly data
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const monthlyData = months.map(month => {
      const monthOrders = filtered.filter(order => {
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

    // Top products
    const productSales = {};
    filtered.forEach(order => {
      order.items?.forEach(item => {
        if (item.storeId === storeId) {
          productSales[item.productId] = (productSales[item.productId] || 0) + item.quantity;
        }
      });
    });

    const topProductsData = Object.entries(productSales)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)
      .map(([productId, quantity]) => {
        const product = rawProducts.find(p => p.id === productId);
        return {
          name: product?.name || "Unknown Product",
          sales: quantity,
          revenue: quantity * (product?.price || 0),
        };
      });

    // Order status
    const statusData = [
      { name: "PENDING", value: filtered.filter(o => o.status === "PENDING").length, color: "#f59e0b" },
      { name: "CONFIRMED", value: filtered.filter(o => o.status === "CONFIRMED").length, color: "#10b981" },
      { name: "SHIPPED", value: filtered.filter(o => o.status === "SHIPPED").length, color: "#06b6d4" },
      { name: "DELIVERED", value: filtered.filter(o => o.status === "DELIVERED").length, color: "#8b5cf6" },
      { name: "CANCELLED", value: filtered.filter(o => o.status === "CANCELLED").length, color: "#ef4444" },
    ].filter(item => item.value > 0);

    return {
      stats: { totalOrders, totalRevenue, pendingOrders },
      monthlyData,
      topProductsData,
      statusData,
      lowStockCount,
      totalProducts: rawProducts.length,
    };
  }, [rawOrders, rawProducts, dateRange, storeId, lowStockCount]);

  if (!currentUser) {
    return (
      <DashboardLayout>
        <div className="text-center py-12">
          <h2 className="text-2xl font-semibold mb-4">Please log in to view analytics</h2>
        </div>
      </DashboardLayout>
    );
  }

  if (loading) {
    return (
      <DashboardLayout>
        <div className="text-center py-12 text-muted-foreground">Loading analytics...</div>
      </DashboardLayout>
    );
  }

  if (!analyticsData) {
    return (
      <DashboardLayout>
        <NoStoresState />
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
            <p className="text-muted-foreground">Detailed insights into your store performance</p>
          </div>
        </div>

        {/* Date Range Filter */}
        <DateRangeFilter dateRange={dateRange} onDateRangeChange={setDateRange} />

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
              <ShoppingCart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatNumber(analyticsData.stats.totalOrders)}</div>
              <p className="text-xs text-muted-foreground">
                {formatNumber(analyticsData.stats.pendingOrders)} pending
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <IndianRupee className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹{formatNumber(analyticsData.stats.totalRevenue)}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Products</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatNumber(analyticsData.totalProducts)}</div>
              <p className="text-xs text-destructive">
                {formatNumber(analyticsData.lowStockCount)} low stock
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
                ₹{analyticsData.stats.totalOrders > 0 ? formatNumber((analyticsData.stats.totalRevenue / analyticsData.stats.totalOrders)) : '0.00'}
              </div>
              <p className="text-xs text-muted-foreground">Per order</p>
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
              <div className="h-[250px] sm:h-[300px] w-full">
                <ChartContainer config={chartConfig} className="!aspect-auto h-full w-full">
                  <LineChart data={analyticsData.monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" fontSize={10} tick={{ fill: 'hsl(var(--muted-foreground))' }} />
                    <YAxis yAxisId="left" width={40} fontSize={10} tick={{ fill: 'hsl(var(--muted-foreground))' }} />
                    <YAxis yAxisId="right" orientation="right" width={40} fontSize={10} tick={{ fill: 'hsl(var(--muted-foreground))' }} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Line yAxisId="left" type="monotone" dataKey="revenue" stroke="var(--color-revenue)" strokeWidth={2} />
                    <Line yAxisId="right" type="monotone" dataKey="orders" stroke="var(--color-orders)" strokeWidth={2} />
                    <ChartLegend content={<ChartLegendContent />} />
                  </LineChart>
                </ChartContainer>
              </div>
            </CardContent>
          </Card>

          {/* Top Products */}
          <Card>
            <CardHeader>
              <CardTitle>Top Selling Products</CardTitle>
            </CardHeader>
            <CardContent className="px-2 sm:px-6">
              {analyticsData.topProductsData.length > 0 ? (
                <div className="h-[220px] sm:h-[300px] w-full">
                  <ChartContainer config={chartConfig} className="!aspect-auto h-full w-full">
                    <BarChart data={analyticsData.topProductsData} margin={{ top: 5, right: 5, left: -15, bottom: 40 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" angle={-35} textAnchor="end" height={60} fontSize={10} interval={0} tick={{ fill: 'hsl(var(--muted-foreground))' }} />
                      <YAxis width={30} fontSize={10} tick={{ fill: 'hsl(var(--muted-foreground))' }} />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="sales" fill="var(--color-products)" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ChartContainer>
                </div>
              ) : (
                <p className="text-muted-foreground">No products sold yet</p>
              )}
            </CardContent>
          </Card>

          {/* Order Status Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>Order Status Distribution</CardTitle>
            </CardHeader>
            <CardContent className="px-2 sm:px-6">
              {analyticsData.statusData.length > 0 ? (
                <div className="h-[220px] sm:h-[300px] w-full">
                  <ChartContainer config={chartConfig} className="!aspect-auto h-full w-full">
                    <PieChart>
                      <Pie
                        data={analyticsData.statusData}
                        cx="50%"
                        cy="50%"
                        outerRadius={55}
                        innerRadius={25}
                        dataKey="value"
                        label={({ name, value }) => `${name}: ${value}`}
                        fontSize={9}
                      >
                        {analyticsData.statusData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <ChartTooltip />
                    </PieChart>
                  </ChartContainer>
                </div>
              ) : (
                <p className="text-muted-foreground">You haven't got any orders</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Analytics;
