import React from "react";
import MainLayout from "../components/layout/MainLayout";

const RefundPolicyPage = () => {
  return (
    <MainLayout>
    <div className="bg-gray-50 flex flex-col items-center justify-start py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Cancellations & Refunds</h1>

      <div className="w-full max-w-3xl bg-white rounded-xl shadow-md p-8 space-y-6">
        <p className="text-gray-700">
          At Shop Monk, we are committed to providing a seamless experience for all our users. 
          We currently offer a <strong>free trial</strong> period to help you explore and understand our platform.
        </p>

        <p className="text-gray-700">
          Since the trial period is provided at no cost, we do not offer cancellations or refunds 
          during this period. This policy ensures that we can continue to maintain and improve the 
          platform for all our users.
        </p>

        <p className="text-gray-700">
          For paid services or additional usage beyond the free trial, payments are considered final. 
          We encourage you to review your usage and subscription plan before making any payments.
        </p>

        <p className="text-gray-700">
          We appreciate your understanding and support as we work to provide the best possible experience 
          for all our creators and entrepreneurs.
        </p>

        <p className="text-gray-700">
          If you have any questions about our policy, please feel free to <a 
            href="/contact" 
            className="text-indigo-600 hover:text-indigo-800 font-medium">
            contact us
          </a>.
        </p>
      </div>
    </div>
    </MainLayout>
  );
};

export default RefundPolicyPage;
