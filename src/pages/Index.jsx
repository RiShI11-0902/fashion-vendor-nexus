
import { Link } from "react-router-dom";
import { ArrowRight, ShoppingBag, User, Package } from "lucide-react";
import MainLayout from "../components/layout/MainLayout";
import { Button } from "../components/ui/button";

const Index = () => {
  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-white to-gray-50 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                Launch Your Fashion Brand <span className="text-gold">Online</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-600 mb-8">
                Create your own fashion store, showcase your products, and start selling in minutes.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Button size="lg" asChild>
                  <Link to="/signup">
                    Get Started
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link to="/stores">Explore Stores</Link>
                </Button>
              </div>
            </div>
            <div className="md:w-1/2 md:pl-12">
              <div className="relative">
                <div className="bg-gold rounded-lg p-4 transform rotate-3 shadow-xl">
                  <img 
                    src="https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80" 
                    alt="Fashion Store" 
                    className="rounded w-full h-full object-cover shadow-lg"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              Everything You Need to Sell Fashion Online
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our platform gives you all the tools to create a stunning online store for your fashion brand.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="bg-gold/10 rounded-full p-3 inline-block mb-4">
                <ShoppingBag className="h-6 w-6 text-gold" />
              </div>
              <h3 className="font-display text-xl font-semibold mb-3">Create Your Store</h3>
              <p className="text-gray-600 mb-4">
                Set up your personalized store with your brand colors, logo, and custom domain.
              </p>
              <Link to="/signup" className="text-gold font-medium inline-flex items-center hover:underline">
                Learn more <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="bg-gold/10 rounded-full p-3 inline-block mb-4">
                <Package className="h-6 w-6 text-gold" />
              </div>
              <h3 className="font-display text-xl font-semibold mb-3">Manage Products</h3>
              <p className="text-gray-600 mb-4">
                Easily add, edit, and organize your fashion products with our intuitive dashboard.
              </p>
              <Link to="/signup" className="text-gold font-medium inline-flex items-center hover:underline">
                Learn more <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="bg-gold/10 rounded-full p-3 inline-block mb-4">
                <User className="h-6 w-6 text-gold" />
              </div>
              <h3 className="font-display text-xl font-semibold mb-3">Grow Your Brand</h3>
              <p className="text-gray-600 mb-4">
                Reach new customers and build your fashion brand with our marketing tools.
              </p>
              <Link to="/signup" className="text-gold font-medium inline-flex items-center hover:underline">
                Learn more <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-gray-50 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-center mb-16">
            Loved by Fashion Entrepreneurs
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100">
              <div className="flex items-center mb-4">
                <div className="mr-4">
                  <img
                    src="https://randomuser.me/api/portraits/women/44.jpg"
                    alt="Sofia Rodriguez"
                    className="h-12 w-12 rounded-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-semibold">Sofia Rodriguez</h4>
                  <p className="text-sm text-gray-500">Founder, Eleganza</p>
                </div>
              </div>
              <p className="text-gray-600">
                "FashionVendor helped me turn my design passion into a thriving online business. Setting up my store was incredibly easy!"
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100">
              <div className="flex items-center mb-4">
                <div className="mr-4">
                  <img
                    src="https://randomuser.me/api/portraits/men/32.jpg"
                    alt="Marcus Chen"
                    className="h-12 w-12 rounded-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-semibold">Marcus Chen</h4>
                  <p className="text-sm text-gray-500">Owner, UrbanThreads</p>
                </div>
              </div>
              <p className="text-gray-600">
                "The platform is incredibly intuitive. I was able to launch my streetwear brand in just a few days and sales started immediately."
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100">
              <div className="flex items-center mb-4">
                <div className="mr-4">
                  <img
                    src="https://randomuser.me/api/portraits/women/68.jpg"
                    alt="Aisha Johnson"
                    className="h-12 w-12 rounded-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-semibold">Aisha Johnson</h4>
                  <p className="text-sm text-gray-500">Designer, ModernMinimal</p>
                </div>
              </div>
              <p className="text-gray-600">
                "The customization options are fantastic. My store perfectly reflects my minimalist brand aesthetic and customers love it."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-xl p-8 md:p-12 text-white text-center">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              Ready to Launch Your Fashion Store?
            </h2>
            <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
              Join thousands of fashion entrepreneurs already selling on our platform.
              Start your free trial today.
            </p>
            <Button size="lg" className="bg-gold hover:bg-gold/90 text-white" asChild>
              <Link to="/signup">
                Create Your Store Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Index;
