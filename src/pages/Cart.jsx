import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useCartStore } from "../stores/useCartStore";
import { useStoreManager } from "../stores/useStoreManager";
import { useOrdersStore } from "../stores/useOrdersStore";
import { useAuthStore } from "../stores/useAuthStore";
import MainLayout from "../components/layout/MainLayout";
import StoreNavbar from "../components/layout/StoreNavbar";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Minus, Plus, Trash2, ShoppingBag, IndianRupee } from "lucide-react";
import { sendOrderToWhatsApp } from "../lib/utils"

const Cart = () => {
  const { slug } = useParams();
  const { items, updateQuantity, removeFromCart, getTotalPrice, clearCart } = useCartStore();
  const { getStoreBySlug } = useStoreManager();
  const { createOrder } = useOrdersStore();
  const { currentUser } = useAuthStore();
  const navigate = useNavigate();
  const [store, setStore] = useState(null);

  // Get store data for navbar
  useEffect(() => {
    const getbySlug = async () => {
      if (slug) {
        const storeData = await getStoreBySlug(slug);
        setStore(storeData);
      }
    }
    getbySlug();
  }, [slug, getStoreBySlug]);

  const [showCheckout, setShowCheckout] = useState(false);
  const [customerInfo, setCustomerInfo] = useState({
    customerName: "",
    customerEmail: "",
    customerMobileNumber: "",
    alternateMobileNumber: "",
    customerAddress: ""
  });

  // Handle input changes properly
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setCustomerInfo(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleCheckout = () => {
    setShowCheckout(true);
  };

  const handlePlaceOrder = async () => {
    // Validation logic here

    const storeId = items[0]?.storeId;
    if (!storeId) return;

    // Create order with cart items
    const orderItems = items.map(item => ({
      id: item.id,
      productId: item.productId,
      name: item.name,
      price: item.price,
      quantity: item.quantity,
      imageUrl: item.image,
      storeId: item.storeId,
      storeName: item.storeName,
    }));

    const orderData = {
      customerName: customerInfo.customerName,
      customerEmail: customerInfo.customerEmail,
      customerAddress: customerInfo.customerAddress,
      customerMobileNumber: customerInfo.customerMobileNumber,
      alternateMobileNumber: customerInfo.alternateMobileNumber,
      items: orderItems,
      totalAmount: getTotalPrice(),
      status: "pending",
      storeId: storeId,
    };

    const newOrder = await createOrder(orderData);
    if (store?.mobileNumber) {
      sendOrderToWhatsApp(newOrder, store.mobileNumber);
    }
    clearCart();
    setShowCheckout(false);
  };

  // Layout component outside of render logic
  const Layout = ({ children }) => {
    if (slug && store) {
      return (
        <div className="min-h-screen bg-background">
          <StoreNavbar store={store} />
          {children}
        </div>
      );
    }
    return <MainLayout>{children}</MainLayout>;
  };

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center py-12">
          <ShoppingBag className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
          <h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
          <p className="text-muted-foreground mb-8">Looks like you haven't added anything to your cart yet.</p>
          <Button asChild>
            <Link to={slug ? `/store/${slug}` : "/stores"}>Continue Shopping</Link>
          </Button>
        </div>
      </div>
      // <Layout>
      // </Layout>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">

      {
        showCheckout ?
          <div className="container mx-auto px-4 py-12">
            <h1 className="text-3xl font-bold mb-8">Checkout</h1>

            <div className="grid lg:grid-cols-2 gap-8">
              <div>
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>
                    <div className="space-y-4">
                      {/* <input type="text" name="customerName" value={customerInfo.customerName || ""} onChange={(e)=> handleInputChange(e)} /> */}
                      <div>
                        <Label htmlFor="customerName">Full Name *</Label>
                        <Input
                          id="customerName"
                          value={customerInfo.customerName}
                          onChange={handleInputChange}
                          placeholder="Enter your full name"
                        />
                      </div>
                      <div>
                        <Label htmlFor="customerEmail">Email *</Label>
                        <Input
                          id="customerEmail"
                          type="email"
                          value={customerInfo.customerEmail}
                          onChange={handleInputChange}
                          placeholder="Enter your email"
                        />
                      </div>
                      <div>
                        <Label htmlFor="customerMobileNumber">Phone Number *</Label>
                        <Input
                          id="customerMobileNumber"
                          value={customerInfo.customerMobileNumber}
                          onChange={handleInputChange}
                          placeholder="Enter your phone number"
                        />
                      </div>
                      <div>
                        <Label htmlFor="alternateMobileNumber">Alternate Phone Number</Label>
                        <Input
                          id="alternateMobileNumber"
                          value={customerInfo.alternateMobileNumber}
                          onChange={handleInputChange}
                          placeholder="Enter your alternate phone number"
                        />
                      </div>
                      <div>
                        <Label htmlFor="customerAddress">Shipping Address *</Label>
                        <Input
                          id="customerAddress"
                          value={customerInfo.customerAddress}
                          onChange={handleInputChange}
                          placeholder="Enter your complete address"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div>
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                    <div className="space-y-3 mb-4">
                      {items.map((item) => (
                        <div key={`${item.productId}-${item.storeSlug}`} className="flex justify-between">
                          <span>{item.name} x{item.quantity}</span>
                          <span>${(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                      ))}
                    </div>
                    <div className="border-t pt-4">
                      <div className="flex justify-between font-semibold text-lg">
                        <span>Total</span>
                        <span className="flex flex-row items-center space-x-2"><IndianRupee className="w-5" />{getTotalPrice().toFixed(2)}</span>
                      </div>
                    </div>

                    <div className="space-y-3 mt-6">
                      <Button className="w-full" size="lg" onClick={handlePlaceOrder}>
                        Place Order
                      </Button>
                      <Button variant="outline" className="w-full" onClick={() => setShowCheckout(false)}>
                        Back to Cart
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
          : <div className="grid lg:grid-cols-3 gap-8">
            <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <Card key={`${item.productId}-${item.storeSlug}`}>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="w-20 h-20 bg-muted rounded-lg flex items-center justify-center">
                        {item?.image ? (
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover rounded-lg"
                          />
                        ) : (
                          <ShoppingBag className="h-8 w-8 text-muted-foreground" />
                        )}
                      </div>

                      <div className="flex-1">
                        <h3 className="font-semibold">{item?.name}</h3>
                        <p className="text-sm text-muted-foreground">{item?.storeName}</p>
                        <p className="flex flex-row items-center space-x-2 text-lg font-semibold text-primary">
                          <IndianRupee className="w-5" />{item?.price}
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateQuantity(item.productId, item.storeSlug, Math.max(0, item.quantity - 1))}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateQuantity(item.productId, item.storeSlug, item.quantity + 1)}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>

                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFromCart(item.productId, item.storeSlug)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="lg:col-span-1">
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span className="flex flex-row items-center space-x-2">
                        <IndianRupee className="w-5" />{getTotalPrice().toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Shipping</span>
                      <span>Free</span>
                    </div>
                    <div className="border-t pt-2">
                      <div className="flex justify-between font-semibold text-lg">
                        <span>Total</span>
                        <span className="flex flex-row items-center space-x-2">
                          <IndianRupee className="w-5" />{getTotalPrice().toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Button className="w-full" size="lg" onClick={handleCheckout}>
                      Proceed to Checkout
                      {/* <Link to={"/checkout"}>
                    </Link> */}
                    </Button>
                    <Button variant="outline" className="w-full" asChild>
                      <Link to={slug ? `/store/${slug}` : "/stores"}>Continue Shopping</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
      }


    </div>
    // <Layout>
    // </Layout>
  );
};

export default Cart;