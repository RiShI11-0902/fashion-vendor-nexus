
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useStore } from "../../contexts/StoreContext";
import { useAuth } from "../../contexts/AuthContext";
import DashboardLayout from "../../components/layout/DashboardLayout";
import StoreForm from "../../components/forms/StoreForm";
import { Loader } from "lucide-react";

const EditStore = () => {
  const { storeId } = useParams();
  const { stores, getUserStores } = useStore();
  const { currentUser } = useAuth();
  const [store, setStore] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  
  useEffect(() => {
    if (currentUser && storeId) {
      const userStores = getUserStores(currentUser.id);
      const foundStore = userStores.find(store => store.id === storeId);
      
      if (foundStore) {
        setStore(foundStore);
      } else {
        setError("Store not found or you don't have permission to edit it");
        setTimeout(() => {
          navigate("/dashboard/stores");
        }, 3000);
      }
      
      setLoading(false);
    }
  }, [currentUser, storeId, stores, getUserStores, navigate]);
  
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
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold mb-2">Edit Store</h1>
        <p className="text-gray-600">Update your store details</p>
      </div>
      
      <div className="bg-white p-6 rounded-lg border">
        <StoreForm initialData={store} />
      </div>
    </DashboardLayout>
  );
};

export default EditStore;
