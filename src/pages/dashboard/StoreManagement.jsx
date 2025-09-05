
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../../stores/useAuthStore";
import { useStoreManager } from "../../stores/useStoreManager";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Store, Settings, ExternalLink, Edit3 } from "lucide-react";

const StoreManagement = () => {
  const { currentUser } = useAuthStore();
  const { getUserStores } = useStoreManager();
  const [userStore, setUserStore] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUserStore = async () => {
    setLoading(true);
    const stores = await getUserStores(currentUser.id);
    setUserStore(stores.length > 0 ? stores[0] : null);
    setLoading(false);
  };

  useEffect(() => {
    if (currentUser) {
      fetchUserStore();
    }
  }, [currentUser, getUserStores]);

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">My Store</h1>
            <p className="text-muted-foreground">
              Manage your online store and products
            </p>
          </div>
        </div>

        {!userStore ? (
          <Card>
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 p-4 bg-primary/10 rounded-full w-fit">
                <Store className="h-8 w-8 text-primary" />
              </div>
              <CardTitle>Create Your Store</CardTitle>
              <p className="text-muted-foreground">
                You haven't created your store yet. Get started by creating your first online store.
              </p>
            </CardHeader>
            <CardContent className="text-center">
              <Button asChild size="lg">
                <Link to="/dashboard/create-store">
                  Create Store
                </Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  {userStore.logo && (
                    <img
                      src={userStore.logo}
                      alt={userStore.name}
                      className="w-16 h-16 rounded-lg object-cover border"
                    />
                  )}
                  <div>
                    <CardTitle className="text-xl">{userStore.name}</CardTitle>
                    <p className="text-muted-foreground text-sm">
                      {userStore.description || "No description"}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge variant="secondary">
                        {userStore.slug}
                      </Badge>
                      <Badge variant={userStore.isActive ? "default" : "secondary"}>
                        {userStore.isActive ? "Active" : "Inactive"}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-3">
                <Button asChild variant="default">
                  <Link to={`/dashboard/stores/edit/${userStore.id}`}>
                    <Edit3 className="h-4 w-4 mr-2" />
                    Edit Store
                  </Link>
                </Button>
                <Button asChild variant="outline">
                  <Link to={`/dashboard/stores/${userStore.id}`}>
                    <Settings className="h-4 w-4 mr-2" />
                    Manage
                  </Link>
                </Button>
                <Button asChild variant="outline">
                  <Link to={`/store/${userStore.slug}`} target="_blank">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    View Store
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
};

export default StoreManagement;
