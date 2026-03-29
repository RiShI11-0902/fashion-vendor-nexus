
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Main Pages
import Index from "./pages/Index";
import About from "./pages/About";
import Pricing from "./pages/Pricing";
import AiVideo from "./pages/AIVideo";
import NotFound from "./pages/NotFound";
import Cart from "./pages/Cart";
import ContactPage from "./pages/ContactPage"
import RefundPolicyPage from "./pages/RefundPolicyPage"
import TermsPage from "./pages/TermsPage"
import PaymentSuccess from "./pages/PaymentSuccess"; 
import PaymentFailed from "./pages/PaymentFailed";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import ShippingPolicy from "./pages/ShippingPolicy";

// Auth Pages
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import GoogleCallback from "./pages/auth/GoogleCallback"

// Dashboard Pages
import Dashboard from "./pages/dashboard/Dashboard";
import Analytics from "./pages/dashboard/Analytics";
import StoreManagement from "./pages/dashboard/StoreManagement";
import ProductsManagement from "./pages/dashboard/ProductsManagement";
import OrdersManagement from "./pages/dashboard/OrdersManagement";
import DiscountsManagement from "./pages/dashboard/DiscountsManagement";
import CreateStore from "./pages/dashboard/CreateStore";
import EditStore from "./pages/dashboard/EditStore";
import CreateProduct from "./pages/dashboard/CreateProduct";
import EditProduct from "./pages/dashboard/EditProduct";
import StoreDetail from "./pages/dashboard/StoreDetail";
import Settings from "./pages/dashboard/Settings";
import StorefrontCustomization from "./pages/dashboard/StorefrontCustomization";
import GenerateModel from "./pages/dashboard/GenerateModel";
import CreateAd from "./pages/dashboard/CreateAd";



// Store Pages
import AllStores from "./pages/stores/AllStores";
import StoreView from "./pages/stores/StoreView";
import ProductDetail from "./pages/stores/ProductDetail";
import Checkout from "./components/store/Checkout"
import { useEffect } from "react";
import { useAuthStore } from "../src/stores/useAuthStore";

const queryClient = new QueryClient();

const App = () => {
  const { checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth(); // ✅ makes sure backend cookie is used
  }, [checkAuth]);
  

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Main Routes */}
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/ai-video" element={<AiVideo />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/refund-policy" element={<RefundPolicyPage />} />
            <Route path="/terms-condition" element={<TermsPage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/shipping-policy" element={<ShippingPolicy />} />
            <Route path="/:slug/cart" element={<Cart />} />

            {/* Auth Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/auth/callback" element={<GoogleCallback />} />

            {/* Dashboard Routes */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard/analytics" element={<Analytics />} />
            <Route path="/dashboard/store" element={<StoreManagement />} />
            <Route path="/dashboard/products" element={<ProductsManagement />} />
            <Route path="/dashboard/orders" element={<OrdersManagement />} />
            <Route path="/dashboard/discounts" element={<DiscountsManagement />} />
            <Route path="/dashboard/create-store" element={<CreateStore />} />
            <Route path="/dashboard/stores/edit/:storeId" element={<EditStore />} />
            <Route path="/dashboard/stores/:storeId" element={<StoreDetail />} />
            <Route
              path="/dashboard/stores/:storeId/customize"
              element={<StorefrontCustomization />}
            />
            <Route path="/dashboard/generate-model" element={<GenerateModel />} />
            <Route path="/dashboard/create-ad" element={<CreateAd />} />
            <Route path="/dashboard/products/create" element={<CreateProduct />} />
            <Route path="/dashboard/products/edit/:productId" element={<EditProduct />} />
            <Route path="/dashboard/settings" element={<Settings />} />
            <Route path='/payment-success' element={<PaymentSuccess />} />
            <Route path='/payment-failed' element={<PaymentFailed />} />


            {/* Store Routes */}
            <Route path="/stores" element={<AllStores />} />
            <Route path="/store/:storeSlug" element={<StoreView />} />
            <Route
              path="/store/:storeSlug/product/:productId"
              element={<ProductDetail />}
            />
            <Route
              path="/checkout"
              element={<Checkout />}
            />

            {/* Not Found */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};


export default App;
