
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
import { Package, ShoppingBag, Clock, CheckCircle, Truck, XCircle, EllipsisVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"

const OrdersManagement = () => {
  const { currentUser } = useAuthStore();
  const { getUserStores } = useStoreManager();
  const { orders, updateOrderStatus, getStoreOrders } = useOrdersStore();
  const [selectedStore, setSelectedStore] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [userStores, setUserStores] = useState([]);
  const [allUserOrders, setAllUserOrders] = useState([]);

  useEffect(() => {
    const fetchUserStores = async () => {
      if (currentUser) {
        try {
          const stores = await getUserStores(currentUser.id);
          setUserStores(stores || []);
          
          // Get orders for user's stores
          const orders = (stores || []).flatMap(store => getStoreOrders(store.id));
          setAllUserOrders(orders);
        } catch (error) {
          console.error('Failed to fetch user stores:', error);
          setUserStores([]);
          setAllUserOrders([]);
        }
      }
    };

    fetchUserStores();
  }, [currentUser, getUserStores, getStoreOrders]);

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
                    {/* <TableHead>Address</TableHead> */}
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
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <button className="p-2 rounded-md hover:bg-gray-100">
                              <EllipsisVertical className="h-5 w-5" />
                            </button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => {
                              setSelectedOrder(order);
                              setOpenDialog(true);
                            }}
                            >View</DropdownMenuItem>
                            <DropdownMenuItem>Delete</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}
      </div>

      <div>
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogContent className="max-w-2xl p-6">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold">Order Details</DialogTitle>
              <DialogDescription className="text-gray-500">
                Complete information for order #{selectedOrder?.id}
              </DialogDescription>
            </DialogHeader>

            {selectedOrder && (
              <div className="space-y-6">
                {/* Customer Info */}
                <div className="grid grid-cols-2 gap-4 border-b pb-4">
                  <div>
                    <p className="text-sm text-gray-500">Customer</p>
                    <p className="font-medium">{selectedOrder.customerName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium">{selectedOrder.customerEmail}</p>
                  </div>
                </div>

                {/* Items */}
                <div className="border-b pb-4">
                  <p className="text-sm text-gray-500 mb-2">Items</p>
                  <ul className="space-y-1 text-sm">
                    {selectedOrder.items.map((item, idx) => (
                      <li
                        key={idx}
                        className="flex justify-between rounded-md bg-gray-50 px-3 py-2"
                      >
                        <span>
                          {item.name} × {item.quantity}
                        </span>
                        <span className="font-medium">${item.price}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Order Status & Total */}
                <div className="grid grid-cols-2 gap-6 border-b pb-4">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Update Status</p>
                    <Select
                      value={selectedOrder.status}
                      onValueChange={(value) =>
                        handleStatusUpdate(selectedOrder.id, value)
                      }
                    >
                      <SelectTrigger className="w-[160px]">
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
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">Total</p>
                    <p className="text-lg font-semibold">
                      ${selectedOrder.totalAmount.toFixed(2)}
                    </p>
                  </div>
                </div>

                {/* Date */}
                <div className="flex justify-between items-center">
                  <p className="text-sm text-gray-500">Placed On</p>
                  <p className="font-medium">
                    {new Date(selectedOrder.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>

    </DashboardLayout>
  );
};

export default OrdersManagement;
