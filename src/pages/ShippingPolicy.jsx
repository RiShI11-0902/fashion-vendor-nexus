import DashboardLayout from "../components/layout/DashboardLayout";
import MainLayout from "../components/layout/MainLayout";

const ShippingPolicy = () => {
    return (
        <MainLayout>
            <div className="max-w-3xl mx-auto py-12 px-6">
                <h1 className="text-3xl font-bold mb-6">Shipping Policy</h1>

                <div className="prose max-w-none text-gray-700 space-y-6">
                    <p>
                        At <strong>ShopMonk</strong>, we provide a platform that enables
                        independent sellers and brands to showcase their products online.
                        Please note that <strong>ShopMonk does not handle shipping or
                            delivery of products</strong> directly.
                    </p>

                    <p>
                        Each vendor or store owner is solely responsible for managing their
                        own shipping, delivery, and order fulfillment processes. This means
                        that shipping timelines, methods, charges, and delivery experience
                        may vary depending on the individual store you are purchasing from.
                    </p>

                    <p>
                        If you have any questions or issues related to shipping or delivery
                        of a product, we recommend contacting the respective vendor or store
                        directly through their provided support details.
                    </p>

                    <p>
                        ShopMonk is committed to empowering entrepreneurs and businesses by
                        offering them an easy-to-use platform, but the responsibility for
                        product delivery lies entirely with the vendors.
                    </p>

                    <p className="italic text-gray-500">
                        Thank you for using ShopMonk to discover and shop from amazing
                        stores worldwide.
                    </p>
                </div>
            </div>
        </MainLayout>
    );
};

export default ShippingPolicy;
