
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Main Pages
import Index from "./pages/Index";
import About from "./pages/About";
import NotFound from "./pages/NotFound";

// Auth Pages
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";

// Dashboard Pages
import Dashboard from "./pages/dashboard/Dashboard";
import StoresManagement from "./pages/dashboard/StoresManagement";
import ProductsManagement from "./pages/dashboard/ProductsManagement";
import CreateStore from "./pages/dashboard/CreateStore";
import EditStore from "./pages/dashboard/EditStore";
import CreateProduct from "./pages/dashboard/CreateProduct";
import EditProduct from "./pages/dashboard/EditProduct";
import StoreDetail from "./pages/dashboard/StoreDetail";
import Settings from "./pages/dashboard/Settings";

// Store Pages
import AllStores from "./pages/stores/AllStores";
import StoreView from "./pages/stores/StoreView";
import ProductDetail from "./pages/stores/ProductDetail";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Main Routes */}
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          
          {/* Auth Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          
          {/* Dashboard Routes */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/stores" element={<StoresManagement />} />
          <Route path="/dashboard/products" element={<ProductsManagement />} />
          <Route path="/dashboard/create-store" element={<CreateStore />} />
          <Route path="/dashboard/stores/edit/:storeId" element={<EditStore />} />
          <Route path="/dashboard/stores/:storeId" element={<StoreDetail />} />
          <Route path="/dashboard/products/create" element={<CreateProduct />} />
          <Route path="/dashboard/products/edit/:productId" element={<EditProduct />} />
          <Route path="/dashboard/settings" element={<Settings />} />
          
          {/* Store Routes */}
          <Route path="/stores" element={<AllStores />} />
          <Route path="/store/:storeSlug" element={<StoreView />} />
          <Route path="/store/:storeSlug/product/:productId" element={<ProductDetail />} />
          
          {/* Not Found */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
