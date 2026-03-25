
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
import { Package, ShoppingBag, Clock, CheckCircle, Truck, XCircle, EllipsisVertical, IndianRupee } from "lucide-react";
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
import { Input } from "../../components/ui/input";
import { toast } from "sonner";

const OrdersManagement = () => {
  const { currentUser } = useAuthStore();
  const { getUserStores } = useStoreManager();
  const { orders, updateOrderStatus, getStoreOrders } = useOrdersStore();
  const [statusFilter, setStatusFilter] = useState("all");
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [userStores, setUserStores] = useState([]);
  const [allUserOrders, setAllUserOrders] = useState([]);
  const [orderNumber, setorderNumber] = useState()
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState()
  useEffect(() => {
    const fetchUserStores = async () => {
      if (currentUser) {
        try {
          const store = await getUserStores(currentUser.id);
          setUserStores(store || []);
          // Get orders for user's stores
          if (store.length > 0) {
            const orders = await getStoreOrders(store[0]?.id,page,statusFilter,orderNumber);
            setAllUserOrders(orders.orders);
            setTotal(orders.total)
          }
        } catch (error) {
          toast.error('Failed to fetch user stores');
        }
      }
    };

    fetchUserStores();
  }, [currentUser, getUserStores, getStoreOrders,page,statusFilter,orderNumber]);

  // Apply filters
  const filteredOrders = orders?.filter(order => {
    const orderNumberMatch = orderNumber ?
      Number(orderNumber) === order.orderNumber : true;
    const statusMatch = statusFilter === "all" || order.status === statusFilter;
    return orderNumberMatch && statusMatch;
  });

  const getStatusIcon = (status) => {
    switch (status) {
      case "PENDING": return <Clock className="h-4 w-4" />;
      case "CONFIRMED": return <CheckCircle className="h-4 w-4" />;
      case "SHIPPED": return <Truck className="h-4 w-4" />;
      case "DELIVERED": return <CheckCircle className="h-4 w-4" />;
      case "CANCELLED": return <XCircle className="h-4 w-4" />;
      default: return <Package className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "PENDING": return "bg-yellow-500/20 text-yellow-400";
      case "CONFIRMED": return "bg-blue-500/20 text-blue-400";
      case "SHIPPED": return "bg-purple-500/20 text-purple-400";
      case "DELIVERED": return "bg-green-500/20 text-green-400";
      case "CANCELLED": return "bg-destructive/20 text-destructive";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const handleStatusUpdate = async (orderId, newStatus) => {
    await updateOrderStatus(orderId, newStatus);
    setSelectedOrder((prev) =>
      prev ? { ...prev, newStatus } : prev
    );
  };

  const totalPages = Math.ceil(total / 10);


  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-display font-bold">Orders Management</h1>
          <p className="text-muted-foreground">Manage orders from your stores</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <Input placeholder='Search by order Number' onChange={(e) => setorderNumber(e.target.value)}  autoComplete="off" />

          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-[200px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="PENDING">Pending</SelectItem>
              <SelectItem value="CONFIRMED">Confirmed</SelectItem>
              <SelectItem value="SHIPPED">Shipped</SelectItem>
              <SelectItem value="DELIVERED">Delivered</SelectItem>
              <SelectItem value="CANCELLED">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {filteredOrders?.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <ShoppingBag className="h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-semibold mb-2">No Orders Found</h3>
              <p className="text-gray-600 text-center">
                {allUserOrders?.length === 0
                  ? "You haven't received any orders yet."
                  : "No orders match your current filters."
                }
              </p>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>Orders ({filteredOrders?.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order Number</TableHead>
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
                  {filteredOrders?.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">#{order.orderNumber}</TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{order.customerName}</div>
                          <div className="text-sm text-muted-foreground">{order.customerEmail}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          {order?.items?.map((item, index) => (
                            <div key={index} className="text-sm">
                              {item.name} x{item.quantity}
                            </div>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell >
                        <div className="flex flex-row space-x-2 items-center">
                          <IndianRupee className="w-4" />
                          {order.totalAmount.toFixed(2)}
                        </div>
                      </TableCell>
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

      <div className="flex items-center flex-row w-full mx-auto justify-around mt-10">
        <Button onClick={() => setPage(page - 1)} disabled={page === 1}>
          Prev
        </Button>
        <span>{page} / {totalPages}</span>
        <Button onClick={() => setPage(page + 1)} disabled={page >= totalPages}>
          Next
        </Button>
      </div>


      <div>
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogContent className="max-w-2xl p-6">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold">Order Details</DialogTitle>
              <DialogDescription className="text-gray-500">
                Complete information for order #{selectedOrder?.orderNumber}
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
                  <div>
                    <p className="text-sm text-gray-500">Mobile Number</p>
                    <p className="font-medium">{selectedOrder.customerMobileNumber}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Address</p>
                    <p className="font-medium">{selectedOrder.customerAddress}</p>
                  </div>
                </div>

                {/* Items */}
                <div className="border-b pb-4">
                  <p className="text-sm text-gray-500 mb-2">Items</p>
                  <ul className="space-y-1 text-sm">
                    {selectedOrder?.items?.map((item, idx) => (
                      <li
                        key={idx}
                        className="flex justify-between rounded-md bg-gray-50 px-3 py-2"
                      >
                        <span>
                          {item.name} × {item.quantity}
                        </span>
                        <span>Size: {item.size}</span>
                        <div className="flex flex-row space-x-2 items-center">
                          <IndianRupee className="w-4" />
                          {item.price}
                        </div>

                      </li>
                    ))}
                  </ul>
                </div>

                {/* Order Status & Total */}
                <div className="grid grid-cols-2 gap-6 border-b pb-4">
                  <div>
                    <p className="text-sm text-black mb-1">Update Status</p>
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
                        <SelectItem value="PENDING">Pending</SelectItem>
                        <SelectItem value="CONFIRMED">Confirmed</SelectItem>
                        <SelectItem value="SHIPPED">Shipped</SelectItem>
                        <SelectItem value="DELIVERED">Delivered</SelectItem>
                        <SelectItem value="CANCELLED">Cancelled</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">Total</p>
                    <p className="flex flex-row space-x-2 items-center text-lg">
                      <IndianRupee className="w-4" />
                      {selectedOrder.totalAmount.toFixed(2)}
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
