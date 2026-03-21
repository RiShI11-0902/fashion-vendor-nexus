
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useStoreManager } from "../../stores/useStoreManager";
import { useAuthStore } from "../../stores/useAuthStore";
import DashboardLayout from "../../components/layout/DashboardLayout";
import ProductForm from "../../components/forms/ProductForm";
import { Loader } from "lucide-react";

const EditProduct = () => {
  const { productId } = useParams();
  const { products, getUserStores } = useStoreManager();
  const { currentUser } = useAuthStore();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const fetchUserStore = async () => {
    const userStores = await getUserStores(currentUser.id);
    const userStoreIds = userStores.map(store => store.id);

    const foundProduct = products?.find(p => p.id === productId);

    if (foundProduct && userStoreIds.includes(foundProduct.storeId)) {
      setProduct(foundProduct);
    } else {
      setError("Product not found or you don't have permission to edit it");
      setTimeout(() => {
        navigate("/dashboard/products");
      }, 3000);
    }

    setLoading(false);
  }

  useEffect(() => {
    if (currentUser && productId) {
      fetchUserStore()
    }
  }, [currentUser, productId, products, getUserStores, navigate]);

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
          <p className="text-gray-600">Redirecting to your products...</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold mb-2">Edit Product</h1>
        <p className="text-gray-600">Update your product details</p>
      </div>

      <div className="bg-card p-6 rounded-lg border border-border">
        <ProductForm initialData={product} />
      </div>
    </DashboardLayout>
  );
};

export default EditProduct;
