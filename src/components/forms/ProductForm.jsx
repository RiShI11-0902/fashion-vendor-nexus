
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useStore } from "../../contexts/StoreContext";
import { useAuth } from "../../contexts/AuthContext";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { 
  FormControl, 
  FormDescription, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage, 
  Form 
} from "../../components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const productSchema = z.object({
  name: z.string().min(2, "Product name must be at least 2 characters"),
  description: z.string().optional(),
  price: z.string().refine(val => !isNaN(Number(val)) && Number(val) >= 0, {
    message: "Price must be a valid number",
  }),
  imageUrl: z.string().optional(),
  category: z.string().optional(),
  storeId: z.string().min(1, "Please select a store"),
  inventory: z.string().transform(val => (!val ? "0" : val))
    .refine(val => !isNaN(Number(val)) && Number(val) >= 0, {
      message: "Inventory must be a valid number",
    }),
});

const ProductForm = ({ initialData = null }) => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { stores, getUserStores, addProduct, updateProduct } = useStore();
  const [userStores, setUserStores] = useState([]);
  
  useEffect(() => {
    if (currentUser) {
      const storesData = getUserStores(currentUser.id);
      setUserStores(storesData);
    }
  }, [currentUser, getUserStores]);
  
  const form = useForm({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: initialData?.name || "",
      description: initialData?.description || "",
      price: initialData?.price?.toString() || "",
      imageUrl: initialData?.imageUrl || "",
      category: initialData?.category || "",
      storeId: initialData?.storeId || (userStores[0]?.id || ""),
      inventory: initialData?.inventory?.toString() || "0",
    },
  });
  
  // Update form values when userStores changes
  useEffect(() => {
    if (!initialData && userStores.length > 0 && !form.getValues("storeId")) {
      form.setValue("storeId", userStores[0].id);
    }
  }, [userStores, form, initialData]);
  
  const onSubmit = (data) => {
    const productData = {
      ...data,
      price: Number(data.price),
      inventory: Number(data.inventory),
    };
    
    if (initialData) {
      updateProduct(initialData.id, productData);
      navigate("/dashboard/products");
    } else {
      addProduct(productData);
      navigate("/dashboard/products");
    }
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
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="storeId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Select Store</FormLabel>
              <Select 
                onValueChange={field.onChange} 
                defaultValue={field.value}
                value={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a store" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {userStores.map((store) => (
                    <SelectItem key={store.id} value={store.id}>
                      {store.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product Name</FormLabel>
              <FormControl>
                <Input placeholder="Stylish Shirt" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price ($)</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    min="0" 
                    step="0.01" 
                    placeholder="29.99" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="inventory"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Inventory</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    min="0"
                    step="1" 
                    placeholder="100" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <FormControl>
                <Input placeholder="T-shirts" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product Description</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Describe your product..." 
                  className="resize-none min-h-32"
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="imageUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product Image URL</FormLabel>
              <FormControl>
                <Input placeholder="https://example.com/image.jpg" {...field} />
              </FormControl>
              <FormDescription>
                Enter a URL for your product image
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
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
  );
};

export default ProductForm;
