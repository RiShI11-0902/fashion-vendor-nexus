
import { useEffect, useState, useRef } from "react";
import { useOrdersStore } from "../../stores/useOrdersStore";
import { useStoreManager } from "../../stores/useStoreManager";
import { dashboardCache } from "../../lib/storeCache";
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
import { formatNumber } from "../../lib/utils";

const StoreAnalytics = ({ storeId }) => {
  const { getOrderStats, getStoreOrders } = useOrdersStore();
  const { getStoreProducts, getlowStockProducts } = useStoreManager();

  const cached = storeId ? dashboardCache._analyticsStore.get(storeId) : null;

  const [stats, setStats] = useState(cached?.stats || null);
  const [topProducts, setTopProducts] = useState(cached?.topProducts || []);
  const [lowStockProducts, setLowStockProducts] = useState(cached?.lowStockProducts || []);
  const [chartData, setChartData] = useState(cached?.chartData || { topProducts: [], orderStatus: [] });
  const fetched = useRef(false);

  const chartConfig = {
    sales: { label: "Sales", color: "#8b5cf6" },
    orders: { label: "Orders", color: "#06b6d4" },
  };

  const fetchUserStore = async () => {
    // Use cache if available
    if (dashboardCache._analyticsStore.has(storeId)) {
      const c = dashboardCache._analyticsStore.get(storeId);
      setStats(c.stats);
      setTopProducts(c.topProducts);
      setLowStockProducts(c.lowStockProducts);
      setChartData(c.chartData);
      return;
    }

    const { orders: storeOrders } = await getStoreOrders(storeId);
    const { products } = await getStoreProducts(storeId);
    const orderStats = await getOrderStats(storeId);

    setStats(orderStats);
    const { lowStockProducts: lsp } = getlowStockProducts(storeId);

    const productSales = {};
    storeOrders.forEach((order) => {
      order.items.forEach((item) => {
        if (item.storeId === storeId) {
          productSales[item.productId] = (productSales[item.productId] || 0) + item.quantity;
        }
      });
    });

    const topSellingProducts = Object.entries(productSales)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)
      .map(([productId, quantity]) => {
        const product = products?.find((p) => p.id === productId);
        return { product, quantity, name: product?.name || "Unknown", sales: quantity };
      })
      .filter((item) => item.product);

    const statusData = [
      { name: "PENDING", value: storeOrders.filter((o) => o.status === "PENDING").length, color: "#f59e0b" },
      { name: "CONFIRMED", value: storeOrders.filter((o) => o.status === "CONFIRMED").length, color: "#10b981" },
      { name: "SHIPPED", value: storeOrders.filter((o) => o.status === "SHIPPED").length, color: "#06b6d4" },
      { name: "DELIVERED", value: storeOrders.filter((o) => o.status === "DELIVERED").length, color: "#8b5cf6" },
      { name: "CANCELLED", value: storeOrders.filter((o) => o.status === "CANCELLED").length, color: "#ef4444" },
    ].filter((item) => item.value > 0);

    const newChartData = { topProducts: topSellingProducts, orderStatus: statusData };

    // Cache the results
    dashboardCache._analyticsStore.set(storeId, {
      stats: orderStats,
      topProducts: topSellingProducts,
      lowStockProducts: lsp,
      chartData: newChartData,
    });

    setTopProducts(topSellingProducts);
    setLowStockProducts(lsp);
    setChartData(newChartData);
  };

  useEffect(() => {
    if (storeId && !fetched.current) {
      fetched.current = true;
      fetchUserStore();
    }
  }, [storeId]);

  if (!storeId) {
    return (
      <div className="text-center py-12">
        <Package className="h-16 w-16 mx-auto text-gray-400 mb-4" />
        <h2 className="text-2xl font-semibold mb-4">No stores found</h2>
        <p className="text-gray-600 mb-6">Create your first store to see analytics</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatNumber(stats?.totalOrders)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{formatNumber(stats?.totalRevenue)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Orders</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.pendingOrders}</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-sm sm:text-base">
              <TrendingUp className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
              Top Selling Products
            </CardTitle>
          </CardHeader>
          <CardContent className="px-2 sm:px-6">
            {chartData.topProducts.length > 0 ? (
              <div className="space-y-4">
                <div className="h-[220px] sm:h-[250px] w-full">
                  <ChartContainer config={chartConfig} className="!aspect-auto h-full w-full">
                    <BarChart data={chartData.topProducts} margin={{ top: 5, right: 5, left: -15, bottom: 40 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" angle={-35} textAnchor="end" height={60} fontSize={10} interval={0} tick={{ fill: 'hsl(var(--muted-foreground))' }} />
                      <YAxis width={30} fontSize={10} tick={{ fill: 'hsl(var(--muted-foreground))' }} />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="sales" fill="var(--color-sales)" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ChartContainer>
                </div>
                <div className="space-y-2">
                  {topProducts.slice(0, 3).map(({ product, quantity }, index) => (
                    <div key={product.id} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Badge variant="outline">{index + 1}</Badge>
                        <div>
                          <p className="font-medium text-sm">{product.name}</p>
                          <p className="text-xs text-muted-foreground">₹{product.price}</p>
                        </div>
                      </div>
                      <Badge>{quantity} sold</Badge>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <p className="text-muted-foreground">No sales data available</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Package className="mr-2 h-5 w-5" />
              Order Status Distribution
            </CardTitle>
          </CardHeader>
          <CardContent className="px-2 sm:px-6">
            {chartData.orderStatus.length > 0 ? (
              <div className="h-[220px] sm:h-[250px] w-full">
                <ChartContainer config={chartConfig} className="!aspect-auto h-full w-full">
                  <PieChart>
                    <Pie
                      data={chartData.orderStatus}
                      cx="50%"
                      cy="50%"
                      outerRadius={55}
                      innerRadius={25}
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}`}
                      fontSize={9}
                    >
                      {chartData.orderStatus.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <ChartTooltip />
                  </PieChart>
                </ChartContainer>
              </div>
            ) : (
              <p className="text-muted-foreground">No order data available</p>
            )}
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center">
              <AlertTriangle className="mr-2 h-5 w-5 text-yellow-500" />
              Low Stock Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            {lowStockProducts?.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {lowStockProducts?.map((product) => (
                  <div key={product?.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                    <div>
                      <p className="font-medium">{product?.name}</p>
                      <p className="text-sm text-muted-foreground">₹{product?.price}</p>
                    </div>
                    <Badge variant="destructive">{product?.inventory} left</Badge>
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
