
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
import axios from "axios";
import { toast } from "sonner";

const storeSchema = z.object({
  name: z.string().min(2, "Store name must be at least 2 characters"),
  slug: z.string()
    .min(3, "Store URL must be at least 3 characters")
    .regex(/^[a-z0-9-]+$/, "Store URL can only contain lowercase letters, numbers, and hyphens")
    .transform(val => val.toLowerCase()),
  description: z.string().optional(),
  banner: z.string().optional(),
  logo: z.string().optional(),
  mobileNumber: z.string(),
  instaHandle: z.string().optional(),
  fbHandle: z.string().optional(),
  location: z.string().optional(),
});

const StoreForm = ({ initialData = null }) => {
  const navigate = useNavigate();
  const { createStore, updateStore , getUserStores} = useStoreManager();
  const { currentUser } = useAuthStore();
  const [categories, setCategories] = useState(initialData?.categories || []);
  const [newCategory, setNewCategory] = useState("");
  const [isUploading, setIsUploading] = useState(false)

  const form = useForm({
    resolver: zodResolver(storeSchema),
    defaultValues: {
      name: initialData?.name || "",
      slug: initialData?.slug || "",
      description: initialData?.description || "",
      banner: initialData?.banner || "",
      logo: initialData?.logo || "",
      mobileNumber: initialData?.mobileNumber.slice(3) || "",
      instaHandle: initialData?.instaHandle || "",
      fbHandle: initialData?.fbHandle || "",
      location: initialData?.location || "",
    },
  });

  const handleImage = async (image, field) => {

    if (!image) return;

    setIsUploading(true)

    const cld_img = new FormData();
    cld_img.append("file", image);
    cld_img.append("upload_preset", "roomhop");
    cld_img.append("cloud_name", "dogievntz");

    const res = await axios.post(
      "https://api.cloudinary.com/v1_1/dogievntz/image/upload",
      cld_img
    );

    field.onChange(res.data.url)

    setIsUploading(false)
  };

  const onSubmit = async (formData) => {

    let mobileNumber = formData.mobileNumber
      ? `+91${formData.mobileNumber}`
      : null;

    const storeData = {
      ...formData,
      mobileNumber,
      categories,
      ownerId: currentUser?.id,
      url: `${import.meta.env.VITE_PRODUCTION_CLIENT_URL}/store/${formData.slug}`,
    };

    if (!storeData.name || !storeData.slug || !storeData.mobileNumber || !storeData.description || !storeData.logo) {
      toast.error("Please enter all field and upload banner and logo")
      return;
    }

    if (initialData) {
      updateStore(initialData.id, storeData);
      getUserStores(currentUser.id, true)
      navigate("/dashboard/store");
    } else {
      createStore(storeData);
      navigate("/dashboard/store");
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

  const onError = (errors) => {
    console.error("Form submission errors:", errors);
    // You can iterate through errors to display them in your UI
    // For example, errors.email?.message will give you the error message for the email field
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit, onError)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Store Name <span className="text-red-600">*</span></FormLabel>
              <FormControl>
                <Input placeholder="My Fashion Store" {...field} autoComplete="off" />
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
              <FormLabel>Store URL <span className="text-red-600">*</span></FormLabel>
              <FormControl>
                <Input placeholder="my-fashion-store" {...field} autoComplete="off" />
              </FormControl>
              <FormDescription>
                This will be used for your store link: shopmonk.shop/store/{field.value || 'your-store-url'}
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
              <FormLabel>Store Description <span className="text-red-600">*</span></FormLabel>
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

        <div className="flex gap-2">
          <FormField
            control={form.control}
            name="mobileNumber"
            render={({ field }) => (
              <FormItem className="flex-1 flex-row items-center justify-center">
                <FormLabel>Store Whatss App Number <span className="text-red-600">*</span></FormLabel>
                <div className="flex-row flex items-center space-x-2 justify-center">
                  <Input placeholder="+91" className="w-14" value="+91" disabled />
                  <FormControl>
                    <Input placeholder="Enter WhatsApp Number" {...field} autoComplete="off" />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>


        <FormField
          control={form.control}
          name="banner"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Store Banner </FormLabel>
              <FormControl>
                <ImageUpload
                  value={field.value}
                  onChange={(file) => {
                    handleImage(file, field)
                    if (!file) field.onChange('');
                  }}
                  onUrlChange={field.onChange}
                  placeholder="Upload banner image"
                  isUploading={isUploading}
                />
              </FormControl>
              <FormDescription>
                Upload your store banner image
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
              <FormLabel>Store Logo <span className="text-red-600">*</span></FormLabel>
              <FormControl>
                <ImageUpload
                  value={field.value}
                  onChange={(file) => {
                    handleImage(file, field)
                    if (!file) field.onChange('');
                  }}
                  onUrlChange={field.onChange}
                  placeholder="Upload logo image or enter URL"
                  isUploading={isUploading}
                />
              </FormControl>
              <FormDescription>
                Upload your store logo
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="space-y-2">
          <FormLabel>Store Categories <span className="text-red-600">*</span></FormLabel>
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
            Press Enter to add multiple categories of products on your store
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

        <FormField
          control={form.control}
          name="instaHandle"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Instagram URL</FormLabel>
              <FormControl>
                <Input placeholder="https://www.instagram.com/your-insta-username" {...field} autoComplete="off" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="fbHandle"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Facebook URL</FormLabel>
              <FormControl>
                <Input placeholder="https://www.facebook.com/your-fb-username" {...field} autoComplete="off" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location URL</FormLabel>
              <FormControl>
                <Input placeholder="https://maps.app.goo.gl/..." {...field} autoComplete="off" />
              </FormControl>
              <FormDescription>
                Paste your google map location here
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end space-x-4 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate("/dashboard/store")}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isUploading}>
            {initialData ? "Update Store" : "Create Store"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default StoreForm;
