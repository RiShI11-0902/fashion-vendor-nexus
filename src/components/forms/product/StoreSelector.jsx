
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../../ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";

const StoreSelector = ({ form, stores }) => {
  return (
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
              {stores?.map((store) => (
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
  );
};

export default StoreSelector;
