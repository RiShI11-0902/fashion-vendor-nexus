
import DashboardLayout from "../../components/layout/DashboardLayout";
import DiscountForm from "../../components/forms/DiscountForm";

const DiscountsManagement = () => {
  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold mb-2">Discount Management</h1>
        <p className="text-gray-600">Create and manage limited-time and percentage discounts for your products</p>
      </div>
      
      <DiscountForm />
    </DashboardLayout>
  );
};

export default DiscountsManagement;
