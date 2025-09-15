import React, { useState } from 'react'
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { IndianRupee } from "lucide-react";
import { sendOrderToWhatsApp } from "../../lib/utils"

const Checkout = () => {

    const [customerInfo, setCustomerInfo] = useState({
        customerName: "",
        customerEmail: "",
        customerMobileNumber: "",
        alternateMobileNumber: "",
        customerAddress: ""
    });

    // Handle input changes properly
    const handleInputChange = (e) => {
        e.preventDefault()

        const { id, value } = e.target;
        setCustomerInfo(prev => ({
            ...prev,
            [id]: value
        }));
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

    return (
        <>
            <Layout>
                <div className="container mx-auto px-4 py-12">
                    <h1 className="text-3xl font-bold mb-8">Checkout</h1>

                    <div className="grid lg:grid-cols-2 gap-8">
                        <div>
                            <Card>
                                <CardContent className="p-6">
                                    <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>
                                    <div className="space-y-4">
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
            </Layout>
        </>
    )
}

export default Checkout