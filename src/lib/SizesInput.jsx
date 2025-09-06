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
      <label className="block font-medium mb-2">Sizes</label>
      {sizes.map((size, index) => (
        <div key={index} className="flex items-center mb-2">
          <input
            type="text"
            value={size}
            onChange={(e) => updateSize(index, e.target.value)}
            className="border rounded p-2 flex-1"
            placeholder="Enter size (e.g., S, M, L, 28, 29)"
          />
          <button
            type="button"
            onClick={() => removeSize(index)}
            className="ml-2 text-red-500"
          >
            ✕
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={addSize}
        className="text-blue-500 mt-2"
      >
        + Add Size
      </button>
    </div>
  );
};
