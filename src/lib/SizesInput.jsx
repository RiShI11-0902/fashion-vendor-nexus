import { Input } from "../components/ui/input";
import { Plus, X } from "lucide-react";

export const SizesInput = ({ form }) => {
  const sizes = form.watch("sizes") || [];

  const addSize = () => {
    const newSizes = [...sizes, ""];
    form.setValue("sizes", newSizes);
  };

  const updateSize = (index, value) => {
    const newSizes = [...sizes];
    newSizes[index] = value;
    form.setValue("sizes", newSizes);
  };

  const removeSize = (index) => {
    const newSizes = sizes.filter((_, i) => i !== index);
    form.setValue("sizes", newSizes);
  };

  return (
    <div className="col-span-1 md:col-span-4">
      <label className="block text-sm font-medium text-foreground mb-3">Sizes</label>
      <div className="flex flex-wrap gap-2 items-center">
        {sizes.map((size, index) => (
          <div
            key={index}
            className="flex items-center gap-1.5 bg-muted/50 rounded-lg pl-3 pr-1 py-1"
          >
            <Input
              type="text"
              value={size}
              onChange={(e) => updateSize(index, e.target.value)}
              className="w-20 h-8 text-sm bg-transparent border-0 p-0 focus-visible:ring-0 focus-visible:ring-offset-0"
              placeholder="e.g. M"
            />
            <button
              type="button"
              onClick={() => removeSize(index)}
              className="p-1 rounded-md text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={addSize}
          className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-dashed border-muted-foreground/30 text-muted-foreground hover:text-primary hover:border-primary/50 text-sm transition-colors"
        >
          <Plus className="h-3.5 w-3.5" />
          Add Size
        </button>
      </div>
    </div>
  );
};
