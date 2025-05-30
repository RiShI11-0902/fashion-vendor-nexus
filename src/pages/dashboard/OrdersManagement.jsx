
import { useState, useEffect } from "react";
import { useAuthStore } from "../../stores/useAuthStore";
import { useStoreManager } from "../../stores/useStoreManager";
import { useOrdersStore } from "../../stores/useOrdersStore";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { Package, ShoppingBag, Clock, CheckCircle, Truck, XCircle } from "lucide-react";

const OrdersManagement = () => {
  const { currentUser } = useAuthStore();
  const { getUserStores } = useStoreManager();
  const { orders, updateOrderStatus, getStoreOrders } = useOrdersStore();
  const [selectedStore, setSelectedStore] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const userStores = currentUser ? getUserStores(currentUser.id) : [];
  
  // Get orders for user's stores
  const allUserOrders = userStores.flatMap(store => getStoreOrders(store.id));
  
  // Apply filters
  const filteredOrders = allUserOrders.filter(order => {
    const storeMatch = selectedStore === "all" || 
      order.items.some(item => item.storeId === selectedStore);
    const statusMatch = statusFilter === "all" || order.status === statusFilter;
    return storeMatch && statusMatch;
  });

  const getStatusIcon = (status) => {
    switch (status) {
      case "pending": return <Clock className="h-4 w-4" />;
      case "confirmed": return <CheckCircle className="h-4 w-4" />;
      case "shipped": return <Truck className="h-4 w-4" />;
      case "delivered": return <CheckCircle className="h-4 w-4" />;
      case "cancelled": return <XCircle className="h-4 w-4" />;
      default: return <Package className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "pending": return "bg-yellow-100 text-yellow-800";
      case "confirmed": return "bg-blue-100 text-blue-800";
      case "shipped": return "bg-purple-100 text-purple-800";
      case "delivered": return "bg-green-100 text-green-800";
      case "cancelled": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const handleStatusUpdate = (orderId, newStatus) => {
    updateOrderStatus(orderId, newStatus);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-display font-bold">Orders Management</h1>
          <p className="text-gray-600">Manage orders from your stores</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <Select value={selectedStore} onValueChange={setSelectedStore}>
            <SelectTrigger className="w-full sm:w-[200px]">
              <SelectValue placeholder="Filter by store" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Stores</SelectItem>
              {userStores.map(store => (
                <SelectItem key={store.id} value={store.id}>
                  {store.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-[200px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="confirmed">Confirmed</SelectItem>
              <SelectItem value="shipped">Shipped</SelectItem>
              <SelectItem value="delivered">Delivered</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {filteredOrders.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <ShoppingBag className="h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-semibold mb-2">No Orders Found</h3>
              <p className="text-gray-600 text-center">
                {allUserOrders.length === 0 
                  ? "You haven't received any orders yet."
                  : "No orders match your current filters."
                }
              </p>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>Orders ({filteredOrders.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Items</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredOrders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">#{order.id}</TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{order.customerName}</div>
                          <div className="text-sm text-gray-600">{order.customerEmail}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          {order.items.map((item, index) => (
                            <div key={index} className="text-sm">
                              {item.name} x{item.quantity}
                            </div>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>${order.totalAmount.toFixed(2)}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(order.status)}>
                          <div className="flex items-center gap-1">
                            {getStatusIcon(order.status)}
                            {order.status}
                          </div>
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {new Date(order.createdAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <Select
                          value={order.status}
                          onValueChange={(value) => handleStatusUpdate(order.id, value)}
                        >
                          <SelectTrigger className="w-[130px]">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="confirmed">Confirmed</SelectItem>
                            <SelectItem value="shipped">Shipped</SelectItem>
                            <SelectItem value="delivered">Delivered</SelectItem>
                            <SelectItem value="cancelled">Cancelled</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
};

export default OrdersManagement;
