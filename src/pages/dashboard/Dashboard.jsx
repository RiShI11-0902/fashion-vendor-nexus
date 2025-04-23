
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useStore } from "../../contexts/StoreContext";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { ShoppingBag, Package, Plus, ArrowRight, Store, Loader } from "lucide-react";

const Dashboard = () => {
  const { currentUser } = useAuth();
  const { getUserStores, getStoreProducts } = useStore();
  const [userStores, setUserStores] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    if (currentUser) {
      const stores = getUserStores(currentUser.id);
      setUserStores(stores);
      
      let productCount = 0;
      stores.forEach(store => {
        const storeProducts = getStoreProducts(store.id);
        productCount += storeProducts.length;
      });
      
      setTotalProducts(productCount);
      setLoading(false);
    }
  }, [currentUser, getUserStores, getStoreProducts]);
  
  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <Loader className="h-8 w-8 animate-spin text-gold" />
        </div>
      </DashboardLayout>
    );
  }
  
  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold mb-2">Welcome, {currentUser?.name || "Vendor"}</h1>
        <p className="text-gray-600">Here's an overview of your fashion business</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Total Stores</CardTitle>
            <Store className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{userStores.length}</div>
            <p className="text-xs text-gray-500 mt-1">
              {userStores.length === 0 ? "Create your first store" : "Manage your stores"}
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Total Products</CardTitle>
            <Package className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{totalProducts}</div>
            <p className="text-xs text-gray-500 mt-1">
              {totalProducts === 0 ? "Add products to your stores" : "Across all stores"}
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Sales</CardTitle>
            <ShoppingBag className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">$0</div>
            <p className="text-xs text-gray-500 mt-1">
              Sales feature coming soon
            </p>
          </CardContent>
        </Card>
      </div>
      
      {userStores.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <ShoppingBag className="h-12 w-12 mx-auto text-gray-400 mb-4" />
          <h2 className="text-xl font-display font-semibold mb-2">Create Your First Store</h2>
          <p className="text-gray-600 mb-6 max-w-md mx-auto">
            Start by creating your first fashion store to showcase your products.
          </p>
          <Button asChild>
            <Link to="/dashboard/create-store">
              <Plus className="mr-2 h-4 w-4" /> Create Store
            </Link>
          </Button>
        </div>
      ) : (
        <>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-display font-semibold">Your Stores</h2>
            <Button asChild variant="outline" size="sm">
              <Link to="/dashboard/stores">
                View All <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {userStores.slice(0, 3).map(store => (
              <Card key={store.id}>
                <div className="h-32 bg-gray-100 relative">
                  {store.imageUrl ? (
                    <img 
                      src={store.imageUrl} 
                      alt={store.name} 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-400">
                      <ShoppingBag className="h-8 w-8" />
                    </div>
                  )}
                </div>
                <CardContent className="py-4">
                  <h3 className="font-medium mb-1">{store.name}</h3>
                  <p className="text-sm text-gray-500 mb-4 line-clamp-1">
                    {store.description || "No description"}
                  </p>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" asChild className="flex-1">
                      <Link to={`/store/${store.slug}`}>View Store</Link>
                    </Button>
                    <Button size="sm" asChild className="flex-1">
                      <Link to={`/dashboard/stores/${store.id}`}>Manage</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
            
            <Card className="border-dashed border-2 flex flex-col items-center justify-center h-64">
              <Button variant="ghost" asChild className="h-full w-full">
                <Link to="/dashboard/create-store" className="flex flex-col items-center justify-center">
                  <Plus className="h-8 w-8 mb-2 text-gray-400" />
                  <span className="font-medium text-gray-600">Create New Store</span>
                </Link>
              </Button>
            </Card>
          </div>
          
          <div className="mt-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-display font-semibold">Quick Actions</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Button asChild variant="outline" size="lg" className="justify-start">
                <Link to="/dashboard/create-store" className="h-auto py-6">
                  <div className="flex flex-col items-center text-center w-full">
                    <ShoppingBag className="h-8 w-8 mb-2" />
                    <span className="font-medium">Create New Store</span>
                  </div>
                </Link>
              </Button>
              
              <Button asChild variant="outline" size="lg" className="justify-start">
                <Link to="/dashboard/products/create" className="h-auto py-6">
                  <div className="flex flex-col items-center text-center w-full">
                    <Package className="h-8 w-8 mb-2" />
                    <span className="font-medium">Add New Product</span>
                  </div>
                </Link>
              </Button>
              
              <Button asChild variant="outline" size="lg" className="justify-start">
                <Link to="/dashboard/settings" className="h-auto py-6">
                  <div className="flex flex-col items-center text-center w-full">
                    <Store className="h-8 w-8 mb-2" />
                    <span className="font-medium">Manage Account</span>
                  </div>
                </Link>
              </Button>
            </div>
          </div>
        </>
      )}
    </DashboardLayout>
  );
};

export default Dashboard;
