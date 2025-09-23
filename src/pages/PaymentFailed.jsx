import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { XCircle } from "lucide-react";
import MainLayout from "../components/layout/MainLayout";

const PaymentFailed = () => {
  const location = useLocation();
  const [referenceId, setReferenceId] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const ref = params.get("referenceid");
    setReferenceId(ref);
  }, [location]);

  return (
   <MainLayout>

     <div className="mt-20 mb-20 flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-lg w-full text-center">
        <div className="flex justify-center mb-4">
          <XCircle className="w-16 h-16 text-red-500" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Payment Failed ❌
        </h1>
        <p className="text-gray-600 mb-6">
          Oops! Something went wrong while processing your payment.  
          Please try again or <Link to={"/contact"} className="text-blue-700">contact</Link> support if the issue persists.
        </p>

        {referenceId && (
          <div className="bg-gray-100 rounded-md py-3 px-4 mb-6 text-sm text-gray-700">
            <p>
              <span className="font-medium">Reference ID:</span>{" "}
              {referenceId}
            </p>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/pricing"
            className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-md font-medium transition"
          >
            Try Again
          </Link>
          <Link
            to="/"
            className="w-full sm:w-auto border border-gray-300 text-gray-700 hover:bg-gray-100 px-6 py-2 rounded-md font-medium transition"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
   </MainLayout>
  );
};

export default PaymentFailed;
