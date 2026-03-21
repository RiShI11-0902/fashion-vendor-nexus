
import DashboardLayout from "../../components/layout/DashboardLayout";
import ProductForm from "../../components/forms/ProductForm";

const CreateProduct = () => {
  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold mb-2">Add New Product</h1>
        <p className="text-gray-600">Add a new fashion product to your store</p>
      </div>
      
      <div className="bg-card p-6 rounded-lg border border-border">
        <ProductForm />
      </div>
    </DashboardLayout>
  );
};

export default CreateProduct;
