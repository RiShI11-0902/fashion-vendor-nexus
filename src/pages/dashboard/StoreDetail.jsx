
import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../stores/useAuthStore";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { Button } from "../../components/ui/button";
import {  //////////useAuthStore
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../../components/ui/alert-dialog";
import { Badge } from "../../components/ui/badge";
import {
  Edit,
  Trash2,
  Plus,
  ExternalLink,
  Loader,
  Package,
  ShoppingBag,
  IndianRupee
} from "lucide-react";
import { useStoreManager } from "../../stores/useStoreManager";

const StoreDetail = () => {
  const { storeId } = useParams();
  const { getUserStores, getStoreProducts, deleteStore } = useStoreManager();
  const { currentUser } = useAuthStore();
  const [store, setStore] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isOpenDeleteDialog, setIsOpenDeleteDialog] = useState(false);
  const navigate = useNavigate();

  const fetchUserStore = async () => {
    const userStores = await getUserStores(currentUser.id);
    const foundStore = userStores.find(store => store.id === storeId);

    console.log("found Store is", foundStore);
    

    if (foundStore) {
      setStore(foundStore);
      const storeProducts = await getStoreProducts(foundStore.id);
      setProducts(storeProducts);
    } else {
      setError("Store not found or you don't have permission to view it");
      setTimeout(() => {
        navigate("/dashboard/stores");
      }, 3000);
    }
  }

  useEffect(() => {
    if (currentUser && storeId) {
      fetchUserStore()

      setLoading(false);
    }
  }, [currentUser, storeId, getUserStores, getStoreProducts, navigate]);

  const handleDeleteStore = () => {
    deleteStore(storeId);
    navigate("/dashboard/stores");
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <Loader className="h-8 w-8 animate-spin text-gold" />
        </div>
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout>
        <div className="text-center py-12">
          <h2 className="text-xl font-semibold mb-4">{error}</h2>
          <p className="text-gray-600">Redirecting to your stores...</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-display font-bold">{store?.name}</h1>
            <Badge variant="outline" className="ml-2">
              {products?.length} products
            </Badge>
          </div>
          <p className="text-gray-600 mt-2">
            {store?.description || "No description provided"}
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {store?.categories && store?.categories.map((category, index) => (
              <Badge key={index} variant="secondary">
                {category}
              </Badge>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <Button asChild variant="outline" size="sm">
            <a href={`${store?.url}`} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="h-4 w-4 mr-2" /> View Store
            </a>
          </Button>
          <Button asChild size="sm">
            <Link to={`/dashboard/stores/edit/${store?.id}`}>
              <Edit className="h-4 w-4 mr-2" /> Edit Store
            </Link>
          </Button>

          <AlertDialog open={isOpenDeleteDialog} onOpenChange={setIsOpenDeleteDialog}>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" size="sm">
                <Trash2 className="h-4 w-4 mr-2" /> Delete Store
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete the store
                  "{store?.name}" and all of its products.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleDeleteStore}>
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
        <div>
          <div className="bg-white rounded-lg border overflow-hidden">
            <div className="h-64 bg-gray-100">
              {store?.banner ? (
                <img
                  src={store?.banner}
                  alt={store?.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex items-center justify-center h-full text-gray-400">
                  <ShoppingBag className="h-12 w-12" />
                </div>
              )}
            </div>
            <div className="p-6">
              <h3 className="font-display text-lg font-semibold mb-2">Store Information</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500">Store URL</p>
                  <div className="flex items-center">
                    <code className="bg-gray-100 px-2 py-1 rounded text-sm flex-grow">
                      {store?.url}
                    </code>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        navigator.clipboard.writeText(`${store.url}`);
                        toast.success("URL copied to clipboard");
                      }}
                    >
                      Copy
                    </Button>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Store ID</p>
                  <p className="font-mono text-sm">{store?.id}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Created On</p>
                  <p className="text-sm">{new Date(store?.createdAt).toLocaleDateString()}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Products</h2>
            <Button asChild size="sm">
              <Link to={`/dashboard/products/create?storeId=${store?.id}`}>
                <Plus className="h-4 w-4 mr-2" /> Add Product
              </Link>
            </Button>
          </div>

          {products.length === 0 ? (
            <div className="text-center py-8 bg-gray-50 rounded-lg border border-dashed">
              <Package className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-semibold mb-2">No Products Yet</h3>
              <p className="text-gray-600 mb-6 max-w-xs mx-auto">
                Start adding products to your store to showcase your fashion items.
              </p>
              <Button asChild size="sm">
                <Link to={`/dashboard/products/create?storeId=${store?.id}`}>
                  <Plus className="h-4 w-4 mr-2" /> Add First Product
                </Link>
              </Button>
            </div>
          ) : (
            <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
              {products?.map(product => (
                <div key={product.id} className="flex items-center justify-between bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center">
                    <div className="h-16 w-16 bg-gray-100 rounded mr-4 overflow-hidden">
                      {product.image ? (
                        <img
                          src={product.image}
                          alt={product.name}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full text-gray-400">
                          <Package className="h-8 w-8" />
                        </div>
                      )}
                    </div>
                    <div>
                      <h4 className="font-semibold">{product.name}</h4>
                      <p className="text-sm text-gray-600 flex flex-row space-x-2 items-center"><IndianRupee className="w-[0.9rem]" />{product.price}</p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button asChild variant="ghost" size="sm">
                      <Link to={`/dashboard/products/edit/${product.id}`}>
                        Edit
                      </Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default StoreDetail;
