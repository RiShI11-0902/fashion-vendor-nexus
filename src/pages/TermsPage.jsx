import React from "react";
import MainLayout from "../components/layout/MainLayout";

const TermsPage = () => {
  return (
   <MainLayout>
     <div className=" bg-gray-50 flex flex-col items-center justify-start py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Terms & Conditions</h1>

      <div className="w-full  bg-white rounded-xl shadow-md p-8 space-y-6 text-gray-700">
        <p>
          Welcome to Shop Monk! By using our platform, you agree to comply with and be bound by the following terms and conditions. Please read them carefully before using our services.
        </p>

        <h2 className="text-xl font-semibold mt-4">1. Free Trial</h2>
        <p>
          Shop Monk offers a free trial to help you explore the platform. The free trial allows limited usage and access to features. By signing up, you acknowledge that the trial is free of charge and intended solely for evaluation purposes.
        </p>

        <h2 className="text-xl font-semibold mt-4">2. Paid Services & Usage</h2>
        <p>
          Any usage beyond the free trial or additional paid services requires payment. Payments are final and non-refundable. Please review your subscription plan carefully before making a purchase.
        </p>

        <h2 className="text-xl font-semibold mt-4">3. Cancellations & Refunds</h2>
        <p>
          We do not offer cancellations or refunds for free trials or paid usage. This policy ensures the sustainability and continuous improvement of our platform. For more details, please refer to our <a href="/refund-policy" className="text-indigo-600 hover:text-indigo-800 font-medium">Cancellations & Refunds</a> page.
        </p>

        <h2 className="text-xl font-semibold mt-4">4. User Responsibility</h2>
        <p>
          Users are responsible for providing accurate information when creating accounts and using the platform. You agree not to misuse or disrupt the services provided by Shop Monk.
        </p>

        <h2 className="text-xl font-semibold mt-4">5. Intellectual Property</h2>
        <p>
          All content, logos, and materials on Shop Monk are the property of Shop Monk and protected under copyright and other intellectual property laws. Users may not use any content without explicit permission.
        </p>

        <h2 className="text-xl font-semibold mt-4">6. Changes to Terms</h2>
        <p>
          Shop Monk may update these terms and conditions from time to time. Users are encouraged to review this page periodically for any changes.
        </p>

        <p className="mt-6">
          By using Shop Monk, you acknowledge that you have read, understood, and agreed to these terms and conditions.
        </p>
      </div>
    </div>
   </MainLayout>
  );
};

export default TermsPage;
