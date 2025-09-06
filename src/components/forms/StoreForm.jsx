
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import { ImageUpload } from "../../components/ui/image-upload";
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
import { X } from "lucide-react";
import { useStoreManager } from "../../stores/useStoreManager";
import { useAuthStore } from "../../stores/useAuthStore";

const storeSchema = z.object({
  name: z.string().min(2, "Store name must be at least 2 characters"),
  slug: z.string()
    .min(3, "Store URL must be at least 3 characters")
    .regex(/^[a-z0-9-]+$/, "Store URL can only contain lowercase letters, numbers, and hyphens")
    .transform(val => val.toLowerCase()),
  description: z.string().optional(),
  imageUrl: z.string().optional(),
  logo: z.string().optional(),
});

const StoreForm = ({ initialData = null }) => {
  const navigate = useNavigate();
  const { createStore, updateStore } = useStoreManager();
  const { currentUser } = useAuthStore();
  const [categories, setCategories] = useState(initialData?.categories || []);
  const [newCategory, setNewCategory] = useState("");
  const [bannerFile, setBannerFile] = useState(null);
  const [logoFile, setLogoFile] = useState(null);

  const form = useForm({
    resolver: zodResolver(storeSchema),
    defaultValues: {
      name: initialData?.name || "",
      slug: initialData?.slug || "",
      description: initialData?.description || "",
      imageUrl: initialData?.imageUrl || "",
      logo: initialData?.imageUrl || "",
    },
  });

 const onSubmit = async (formData) => {
  try {
    // validate with Zod
    const parsedData = storeSchema.parse(formData);

    console.log(parsedData.slug);
    
    // Handle file uploads if files were selected
    let bannerUrl = parsedData.imageUrl;
    let logoUrl = parsedData.logo;
    
    // In a real app, you'd upload files to a service like Cloudinary or AWS S3
    // For now, we'll use the existing URL or a placeholder
    if (bannerFile) {
      // bannerUrl = await uploadFile(bannerFile);
      bannerUrl = URL.createObjectURL(bannerFile);
    }
    
    if (logoFile) {
      // logoUrl = await uploadFile(logoFile);
      logoUrl = URL.createObjectURL(logoFile);
    }

    const storeData = {
      ...parsedData,
      categories,
      ownerId: currentUser?.id,
      url: `http://localhost:8080/store/${parsedData.slug}`,
      mobileNumber: "+91 7498140646",
      banner: bannerUrl,
      logo: logoUrl,
      imageUrl: bannerUrl
    };

    console.log(storeData);
    

    if (initialData) {
      updateStore(initialData.id, storeData);
      navigate("/dashboard/store");
    } else {
      createStore(storeData);
      navigate("/dashboard/store");
    }
  } catch (err) {
    console.error("Validation error:", err.errors);
  }
};

  const addCategory = () => {
    if (newCategory.trim() && !categories.includes(newCategory.trim())) {
      setCategories([...categories, newCategory.trim()]);
      setNewCategory("");
    }
  };

  const removeCategory = (index) => {
    setCategories(categories.filter((_, i) => i !== index));
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addCategory();
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Store Name</FormLabel>
              <FormControl>
                <Input placeholder="My Fashion Store" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="slug"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Store URL</FormLabel>
              <FormControl>
                <Input placeholder="my-fashion-store" {...field} />
              </FormControl>
              <FormDescription>
                This will be used for your store link: fashionvendor.com/store/{field.value || 'your-store-url'}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Store Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell customers about your store..."
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
              <FormLabel>Store Banner</FormLabel>
              <FormControl>
                <ImageUpload
                  value={field.value}
                  onChange={(file) => {
                    setBannerFile(file);
                    if (!file) field.onChange('');
                  }}
                  onUrlChange={field.onChange}
                  placeholder="Upload banner image or enter URL"
                />
              </FormControl>
              <FormDescription>
                Upload or enter a URL for your store banner image
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="logo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Store Logo</FormLabel>
              <FormControl>
                <ImageUpload
                  value={field.value}
                  onChange={(file) => {
                    setLogoFile(file);
                    if (!file) field.onChange('');
                  }}
                  onUrlChange={field.onChange}
                  placeholder="Upload logo image or enter URL"
                />
              </FormControl>
              <FormDescription>
                Upload or enter a URL for your store logo
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="space-y-2">
          <FormLabel>Store Categories</FormLabel>
          <div className="flex">
            <Input
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="e.g. Women's Fashion"
              className="mr-2"
            />
            <Button type="button" onClick={addCategory}>Add</Button>
          </div>
          <FormDescription>
            Press Enter to add multiple categories
          </FormDescription>

          {categories.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {categories.map((category, index) => (
                <div
                  key={index}
                  className="bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-sm flex items-center"
                >
                  {category}
                  <button
                    type="button"
                    onClick={() => removeCategory(index)}
                    className="ml-2 text-gray-500 hover:text-destructive"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex justify-end space-x-4 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate("/dashboard/store")}
          >
            Cancel
          </Button>
          <Button type="submit">
            {initialData ? "Update Store" : "Create Store"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default StoreForm;
