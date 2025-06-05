
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useStoreManager } from "../../stores/useStoreManager";
import { useAuthStore } from "../../stores/useAuthStore";
import DashboardLayout from "../../components/layout/DashboardLayout";
import ThemeCustomizer from "../../components/storefront/ThemeCustomizer";
import InstagramFeed from "../../components/storefront/InstagramFeed";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { Button } from "../../components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft, Eye } from "lucide-react";
import { Loader } from "lucide-react";

const StorefrontCustomization = () => {
  const { storeId } = useParams();
  const { stores, getUserStores } = useStoreManager();
  const { currentUser } = useAuthStore();
  const [store, setStore] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (currentUser && storeId) {
      const userStores = getUserStores(currentUser.id);
      const foundStore = userStores.find(store => store.id === storeId);
      
      if (foundStore) {
        setStore(foundStore);
      } else {
        setError("Store not found or you don't have permission to customize it");
      }
      
      setLoading(false);
    }
  }, [currentUser, storeId, stores, getUserStores]);

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <Loader className="h-8 w-8 animate-spin text-gold" />
        </div>
      </DashboardLayout>
    );
  }

  if (error || !store) {
    return (
      <DashboardLayout>
        <div className="text-center py-12">
          <h2 className="text-xl font-semibold mb-4">{error}</h2>
          <Button asChild>
            <Link to="/dashboard/stores">Back to Stores</Link>
          </Button>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <Button asChild variant="ghost" className="mb-4">
              <Link to={`/dashboard/stores/${storeId}`} className="flex items-center">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Store
              </Link>
            </Button>
            <h1 className="text-3xl font-display font-bold">Customize Storefront</h1>
            <p className="text-gray-600 mt-2">
              Personalize the look and feel of <strong>{store.name}</strong>
            </p>
          </div>
          <Button asChild variant="outline">
            <Link to={`/store/${store.slug}`} target="_blank" className="flex items-center">
              <Eye className="mr-2 h-4 w-4" />
              Preview Store
            </Link>
          </Button>
        </div>

        <Tabs defaultValue="theme" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="theme">Theme & Layout</TabsTrigger>
            <TabsTrigger value="instagram">Instagram Feed</TabsTrigger>
          </TabsList>
          
          <TabsContent value="theme" className="space-y-6">
            <ThemeCustomizer 
              storeId={store.id} 
              currentTheme={store.theme || {}} 
            />
          </TabsContent>
          
          <TabsContent value="instagram" className="space-y-6">
            <InstagramFeed 
              storeId={store.id} 
              currentSettings={store.instagramFeed || {}} 
            />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default StorefrontCustomization;
