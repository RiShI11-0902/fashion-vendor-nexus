
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useStoreManager } from "../../stores/useStoreManager";
import { useAuthStore } from "../../stores/useAuthStore";
import { Button } from "../ui/button";
import { Form } from "../ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import StoreSelector from "./product/StoreSelector";
import BasicProductDetails from "./product/BasicProductDetails";
import AdditionalDetails from "./product/AdditionalDetails";
import { toast } from "sonner";
import QRCodeModal from "../products/QRCodeModal";

const productSchema = z.object({
  name: z.string().min(2, "Product name must be at least 2 characters"),
  description: z.string().optional(),
  price: z.string().refine(val => !isNaN(Number(val)) && Number(val) >= 0, {
    message: "Price must be a valid number",
  }),
  image: z.string().optional(),
  category: z.string().optional(),
  storeId: z.string().min(1, "Please select a store"),
  inventory: z.string().transform(val => (!val ? "0" : val))
    .refine(val => !isNaN(Number(val)) && Number(val) >= 0, {
      message: "Inventory must be a valid number",
    }),
  discount: z.string()
    .transform(val => (val === "" ? "0" : val))
    .refine(val => !isNaN(Number(val)) && Number(val) >= 0, {
      message: "Discount must be a valid number",
    }),
  sizes: z.array(z.string()).optional(),
});

const ProductForm = ({ initialData = null }) => {
  const navigate = useNavigate();
  const { currentUser } = useAuthStore();
  const { getUserStores, createProduct, updateProduct } = useStoreManager();
  const [userStores, setUserStores] = useState([]);
  const [qrProduct, setQrProduct] = useState(null);
  const [qrStoreSlug, setQrStoreSlug] = useState("");
  const [qrStoreLogo, setQrStoreLogo] = useState("");
  const [showQR, setShowQR] = useState(false);
  

  const fetchStores = async () => {
    const storesData = await getUserStores(currentUser.id);
    setUserStores(storesData);
  };

  useEffect(() => {
    if (currentUser) {
      fetchStores();
    }
  }, [currentUser, getUserStores]);

  const form = useForm({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: initialData?.name || "",
      description: initialData?.description || "",
      price: initialData?.price?.toString() || "",
      image: initialData?.image || "",
      category: initialData?.category || "",
      storeId: initialData?.storeId || "",
      inventory: initialData?.inventory?.toString() || "1",
      discount: initialData?.discount?.toString() || "0",
      sizes: initialData?.sizes || [],
    },
  });

  useEffect(() => {
    if (!initialData && userStores.length > 0 && !form.getValues("storeId")) {
      form.setValue("storeId", userStores[0].id);
    }
  }, [userStores, form, initialData]);

  const onSubmit = async (data) => {
    const productData = {
      ...data,
      price: Number(data.price),
      inventory: Number(data.inventory),
      discount: Number(data.discount) || 0,
      sizes: data.sizes || [],
    };

    const requiredFields = ["name", "price", "inventory", "description", "image", "category"];

    for (let field of requiredFields) {
      if (!productData[field] || productData[field].toString().trim() === "") {
        toast.error(`Please enter ${field}`);
        return;
      }
    }

    if (initialData) {
      await updateProduct(initialData.id, productData);
      navigate("/dashboard/products");
    } else {
      const selectedStore = userStores.find(s => s.id === productData.storeId);
      const created = await createProduct(productData);
      // Show QR modal after successful creation
      setQrProduct(created || productData);
      setQrStoreSlug(selectedStore?.slug || "");      
      setQrStoreLogo(selectedStore?.logo || selectedStore?.imageUrl || "");
      setShowQR(true);
    }
  };

  const onError = (errors) => {
    console.error("Form submission errors:", errors);
  };

  if (userStores.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-semibold mb-4">You need to create a store first</h3>
        <Button asChild>
          <a href="/dashboard/create-store">Create a Store</a>
        </Button>
      </div>
    );
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit, onError)} className="space-y-6">
          <StoreSelector form={form} stores={userStores} />
          <BasicProductDetails form={form} />
          <AdditionalDetails form={form} catgories={userStores[0].categories} />

          <div className="flex justify-end space-x-4 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate("/dashboard/products")}
            >
              Cancel
            </Button>
            <Button type="submit">
              {initialData ? "Update Product" : "Add Product"}
            </Button>
          </div>
        </form>
      </Form>

      <QRCodeModal
        open={showQR}
        onClose={() => {
          setShowQR(false);
          navigate("/dashboard/products");
        }}
        product={qrProduct}
        storeSlug={qrStoreSlug}
        storeLogo={qrStoreLogo}
      />
    </>
  );
};

export default ProductForm;
