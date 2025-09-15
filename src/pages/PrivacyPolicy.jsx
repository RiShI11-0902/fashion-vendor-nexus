import MainLayout from "../components/layout/MainLayout";

const PrivacyPolicy = () => {
    return (
        <MainLayout>
            <div className="max-w-4xl mx-auto px-6 py-12">
                <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
                <p className="text-gray-700 mb-4">
                    At <span className="font-semibold">Shop Monk</span>, accessible from{" "}
                    <a href="https://shopmonk.shop" className="text-blue-600 underline">
                        https://shopmonk.shop
                    </a>, we respect your privacy and are committed to protecting the personal
                    information you share with us. This Privacy Policy explains how we
                    collect, use, and safeguard your information when you use our platform.
                </p>

                <h2 className="text-2xl font-semibold mt-8 mb-4">1. Information We Collect</h2>
                <p className="text-gray-700 mb-4">
                    When you use Shop Monk, we may collect the following information:
                </p>
                <ul className="list-disc ml-6 text-gray-700 mb-4">
                    <li>Basic account details (name, email, phone number, etc.)</li>
                    <li>Store information provided when creating your online shop</li>
                    <li>Billing and payment information for subscriptions</li>
                    <li>Usage data such as interactions with our platform</li>
                </ul>

                <h2 className="text-2xl font-semibold mt-8 mb-4">2. How We Use Your Information</h2>
                <p className="text-gray-700 mb-4">We use the information we collect to:</p>
                <ul className="list-disc ml-6 text-gray-700 mb-4">
                    <li>Provide and improve our services</li>
                    <li>Process payments and manage subscriptions</li>
                    <li>Send important updates, notifications, and support messages</li>
                    <li>Ensure compliance with our Terms and Conditions</li>
                </ul>

                <h2 className="text-2xl font-semibold mt-8 mb-4">3. Data Sharing</h2>
                <p className="text-gray-700 mb-4">
                    We do not sell or rent your personal data. However, we may share
                    information with trusted third-party services (like payment gateways)
                    strictly for providing our services.
                </p>

                <h2 className="text-2xl font-semibold mt-8 mb-4">4. Data Security</h2>
                <p className="text-gray-700 mb-4">
                    We take appropriate technical and organizational measures to protect
                    your data. However, please note that no system is 100% secure.
                </p>

                <h2 className="text-2xl font-semibold mt-8 mb-4">5. Your Rights</h2>
                <p className="text-gray-700 mb-4">
                    You have the right to access, update, or delete your information by
                    contacting us. You may also opt-out of marketing communications at any
                    time.
                </p>

                <h2 className="text-2xl font-semibold mt-8 mb-4">6. Cookies</h2>
                <p className="text-gray-700 mb-4">
                    Shop Monk may use cookies and similar technologies to enhance your
                    browsing experience and analyze site traffic.
                </p>

                <h2 className="text-2xl font-semibold mt-8 mb-4">7. Changes to This Policy</h2>
                <p className="text-gray-700 mb-4">
                    We may update this Privacy Policy from time to time. Any updates will be
                    posted on this page with a revised date.
                </p>

                <h2 className="text-2xl font-semibold mt-8 mb-4">8. Contact Us</h2>
                <p className="text-gray-700 mb-4">
                    If you have any questions about this Privacy Policy, please contact us:
                </p>
                <ul className="list-none ml-2 text-gray-700">
                    <li>Email: <a href="mailto:support@shopmonk.shop" className="text-blue-600 underline">rbaagde911@gmail.com</a></li>
                    <li>Phone/WhatsApp: +91-7498140646</li>
                </ul>
            </div>
        </MainLayout>
    );
}

export default PrivacyPolicy
