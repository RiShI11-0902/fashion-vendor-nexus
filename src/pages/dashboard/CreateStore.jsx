
import DashboardLayout from "../../components/layout/DashboardLayout";
import StoreForm from "../../components/forms/StoreForm";

const CreateStore = () => {
  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold mb-2">Create a New Store</h1>
        <p className="text-gray-600">Set up your fashion brand's online store</p>
      </div>
      
      <div className="bg-white p-6 rounded-lg border">
        <StoreForm />
      </div>
    </DashboardLayout>
  );
};

export default CreateStore;
