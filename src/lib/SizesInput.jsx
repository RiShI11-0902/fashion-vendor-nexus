import { Input } from "../components/ui/input";

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
    <div>
      <label className="block text-sm font-medium text-foreground mb-2">Sizes</label>
      {sizes.map((size, index) => (
        <div key={index} className="flex items-center mb-2">
          <Input
            type="text"
            value={size}
            onChange={(e) => updateSize(index, e.target.value)}
            className="flex-1"
            placeholder="Enter size (e.g., S, M, L, 28, 29)"
          />
          <button
            type="button"
            onClick={() => removeSize(index)}
            className="ml-2 text-destructive hover:text-destructive/80 transition-colors"
          >
            ✕
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={addSize}
        className="text-primary hover:text-primary/80 text-sm mt-2 transition-colors"
      >
        + Add Size
      </button>
    </div>
  );
};
