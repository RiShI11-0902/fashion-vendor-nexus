
import { useState, useEffect } from "react";
import { useStoreManager } from "../../stores/useStoreManager";
import { useAuthStore } from "../../stores/useAuthStore";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Trash2, Percent, Calendar } from "lucide-react";

const DiscountForm = () => {
  const { currentUser } = useAuthStore();
  const { 
    getUserStores, 
    getStoreProducts, 
    createDiscount, 
    updateDiscount, 
    deleteDiscount,
    discounts,
    getProductDiscount 
  } = useStoreManager();
  
  const [selectedStore, setSelectedStore] = useState("");
  const [selectedProduct, setSelectedProduct] = useState("");
  const [discountType, setDiscountType] = useState("percentage");
  const [discountValue, setDiscountValue] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [userStores, setUserStores] = useState([]);
  const [storeProducts, setStoreProducts] = useState([]);
  const [activeDiscounts, setActiveDiscounts] = useState([]);

  useEffect(() => {
    if (currentUser) {
      const stores = getUserStores(currentUser.id);
      setUserStores(stores);
      if (stores.length > 0 && !selectedStore) {
        setSelectedStore(stores[0].id);
      }
    }
  }, [currentUser, getUserStores]);

  useEffect(() => {
    if (selectedStore) {
      const products = getStoreProducts(selectedStore);
      setStoreProducts(products);
      
      // Filter discounts for this store
      const storeProductIds = products.map(p => p.id);
      const storeDiscounts = discounts.filter(d => storeProductIds.includes(d.productId));
      setActiveDiscounts(storeDiscounts);
    }
  }, [selectedStore, getStoreProducts, discounts]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!selectedProduct || !discountValue || !startDate || !endDate) {
      return;
    }

    // Check if product already has an active discount
    const existingDiscount = getProductDiscount(selectedProduct);
    if (existingDiscount) {
      alert("This product already has an active discount. Please remove it first.");
      return;
    }

    createDiscount({
      productId: selectedProduct,
      type: discountType,
      value: parseFloat(discountValue),
      startDate: new Date(startDate).toISOString(),
      endDate: new Date(endDate).toISOString(),
      isActive: true
    });

    // Reset form
    setSelectedProduct("");
    setDiscountValue("");
    setStartDate("");
    setEndDate("");
  };

  const handleDeleteDiscount = (discountId) => {
    deleteDiscount(discountId);
  };

  const getProductName = (productId) => {
    const product = storeProducts.find(p => p.id === productId);
    return product ? product.name : "Unknown Product";
  };

  const isDiscountActive = (discount) => {
    const now = new Date();
    const start = new Date(discount.startDate);
    const end = new Date(discount.endDate);
    return discount.isActive && now >= start && now <= end;
  };

  return (
    <div className="space-y-6">
      {/* Create Discount Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Percent className="h-5 w-5" />
            Create New Discount
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="store">Store</Label>
                <Select value={selectedStore} onValueChange={setSelectedStore}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select store" />
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

              <div>
                <Label htmlFor="product">Product</Label>
                <Select value={selectedProduct} onValueChange={setSelectedProduct}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select product" />
                  </SelectTrigger>
                  <SelectContent>
                    {storeProducts.map(product => (
                      <SelectItem key={product.id} value={product.id}>
                        {product.name} - ${product.price}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="discountType">Discount Type</Label>
                <Select value={discountType} onValueChange={setDiscountType}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="percentage">Percentage (%)</SelectItem>
                    <SelectItem value="fixed">Fixed Amount ($)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="discountValue">
                  Discount Value {discountType === 'percentage' ? '(%)' : '($)'}
                </Label>
                <Input
                  id="discountValue"
                  type="number"
                  value={discountValue}
                  onChange={(e) => setDiscountValue(e.target.value)}
                  placeholder={discountType === 'percentage' ? '10' : '5.00'}
                  min="0"
                  max={discountType === 'percentage' ? '100' : undefined}
                  step={discountType === 'percentage' ? '1' : '0.01'}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="startDate">Start Date</Label>
                <Input
                  id="startDate"
                  type="datetime-local"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="endDate">End Date</Label>
                <Input
                  id="endDate"
                  type="datetime-local"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>
            </div>

            <Button type="submit" className="w-full">
              Create Discount
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Active Discounts */}
      <Card>
        <CardHeader>
          <CardTitle>Active Discounts</CardTitle>
        </CardHeader>
        <CardContent>
          {activeDiscounts.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No discounts created yet</p>
          ) : (
            <div className="space-y-4">
              {activeDiscounts.map(discount => (
                <div key={discount.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium">{getProductName(discount.productId)}</h4>
                      <Badge variant={isDiscountActive(discount) ? "default" : "secondary"}>
                        {isDiscountActive(discount) ? "Active" : "Scheduled"}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600">
                      {discount.type === 'percentage' ? `${discount.value}% off` : `$${discount.value} off`}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {new Date(discount.startDate).toLocaleDateString()}
                      </span>
                      <span>to</span>
                      <span>{new Date(discount.endDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                  
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDeleteDiscount(discount.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default DiscountForm;
