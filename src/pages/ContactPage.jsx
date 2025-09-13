import React from "react";
import MainLayout from "../components/layout/MainLayout";

const ContactPage = () => {
  return (
    <MainLayout>
      <div className=" bg-gray-50 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Contact Me</h1>
      <p className="text-gray-600 mb-8 text-center max-w-md">
        Have questions or need support? Reach out to me through any of the channels below.
      </p>

      <div className="w-full max-w-md bg-white rounded-xl shadow-md p-8 text-center space-y-4">
        <div>
          <p className="text-gray-700 font-medium">Email</p>
          <a
            href="mailto:support@shopmonk.com"
            className="text-indigo-600 hover:text-indigo-800"
          >
            rbagade911@gmail.com
          </a>
        </div>

        <div>
          <p className="text-gray-700 font-medium">Phone</p>
          <a href="tel:+917498140646" className="text-indigo-600 hover:text-indigo-800">
            +91 7498140646
          </a>
        </div>

        <div>
          <p className="text-gray-700 font-medium">WhatsApp</p>
          <a
            href="https://wa.me/917498140646"
            target="_blank"
            rel="noopener noreferrer"
            className="text-green-600 hover:text-green-800"
          >
            Chat with me on WhatsApp
          </a>
        </div>
      </div>
    </div>
    </MainLayout>
  );
};

export default ContactPage;
