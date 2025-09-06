
import { useState } from 'react';
import { FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "../../ui/form";
import { Input } from "../../ui/input";
import { Textarea } from "../../ui/textarea";
import { ImageUpload } from "../../ui/image-upload";

const AdditionalDetails = ({ form }) => {
  const [imageFile, setImageFile] = useState(null);

  return (
    <>
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
        name="image"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Product Image</FormLabel>
            <FormControl>
              <ImageUpload
                value={field.value}
                onChange={(file) => {
                  setImageFile(file);
                  if (!file) field.onChange('');
                }}
                onUrlChange={field.onChange}
                placeholder="Upload product image or enter URL"
              />
            </FormControl>
            <FormDescription>
              Upload or enter a URL for your product image
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};

export default AdditionalDetails;
