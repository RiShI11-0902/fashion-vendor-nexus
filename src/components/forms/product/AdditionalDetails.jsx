
import { useState } from 'react';
import { FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "../../ui/form";
import { Input } from "../../ui/input";
import { Textarea } from "../../ui/textarea";
import { ImageUpload } from "../../ui/image-upload";
import axios from 'axios';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';

const AdditionalDetails = ({ form,catgories }) => {
  const [isUploading, setIsUploading] = useState(false) 
    
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

  return (
    <>
  <FormField
  control={form.control}
  name="category"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Category</FormLabel>
      <FormControl>
        <Select
          value={field.value}
          onValueChange={field.onChange}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent>
            {catgories?.map((cat, idx) => (
              <SelectItem key={idx} value={cat}>
                {cat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </FormControl>
      <FormDescription>
        Select a category from the list
      </FormDescription>
      <FormMessage />
    </FormItem>
  )}
/>


      {/* <FormField
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
      /> */}

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
        name="image"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex flex-row items-center space-x-5">
              <p>Product Image</p>
            </FormLabel>
            <FormControl>
              <ImageUpload
                value={field.value}
                onChange={(file) => {
                  handleImage(file, field); // This handles file uploads to Cloudinary
                  if (!file) field.onChange(''); // Clear field if no file
                }}
                onUrlChange={(url) => {
                  field.onChange(url); // Set the URL directly in form field
                }}
                placeholder="Upload product image or enter URL"
                isUploading={isUploading}
              />
            </FormControl>

            <FormDescription>Upload your product image</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

    </>
  );
};

export default AdditionalDetails;
