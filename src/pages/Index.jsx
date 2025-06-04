
import { Link } from "react-router-dom";
import { useAuthStore } from "../stores/useAuthStore";
import MainLayout from "../components/layout/MainLayout";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { 
  Store, 
  Package, 
  TrendingUp, 
  Users, 
  Smartphone,
  Shield,
  Zap,
  ArrowRight
} from "lucide-react";

const Index = () => {
  const { currentUser } = useAuthStore();

  const features = [
    {
      icon: Store,
      title: "Create Your Store",
      description: "Set up your fashion store in minutes with our easy-to-use tools"
    },
    {
      icon: Package,
      title: "Inventory Management",
      description: "Track stock levels with automatic updates and low-stock alerts"
    },
    {
      icon: TrendingUp,
      title: "Analytics & Insights",
      description: "Monitor your sales, revenue, and top-performing products"
    },
    {
      icon: Users,
      title: "Customer Management",
      description: "Handle orders and customer information efficiently"
    },
    {
      icon: Smartphone,
      title: "Mobile Optimized",
      description: "Manage your business on the go with our mobile-first design"
    },
    {
      icon: Shield,
      title: "Secure Platform",
      description: "Your data and customers' information are always protected"
    }
  ];

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-50 to-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-display font-bold mb-6">
            Build Your Fashion Empire
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            The complete platform for fashion entrepreneurs to create stores, manage inventory, 
            and grow their business online.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {currentUser ? (
              <Button asChild size="lg" className="text-lg px-8 py-3">
                <Link to="/dashboard">
                  Go to Dashboard <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            ) : (
              <>
                <Button asChild size="lg" className="text-lg px-8 py-3">
                  <Link to="/signup">
                    Start Your Store <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="text-lg px-8 py-3">
                  <Link to="/login">Sign In</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Everything You Need to Succeed
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              From inventory management to customer analytics, we provide all the tools 
              to help your fashion business thrive.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-6 text-center">
                  <feature.icon className="h-12 w-12 mx-auto mb-4 text-primary" />
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-12">
            Trusted by Fashion Entrepreneurs
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="text-4xl font-bold text-primary mb-2">500+</div>
              <div className="text-gray-600">Active Stores</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">10K+</div>
              <div className="text-gray-600">Products Listed</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">50K+</div>
              <div className="text-gray-600">Orders Processed</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
            Ready to Start Your Fashion Journey?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join thousands of successful fashion entrepreneurs who trust our platform 
            to power their business growth.
          </p>
          
          {!currentUser && (
            <Button asChild size="lg" variant="secondary" className="text-lg px-8 py-3">
              <Link to="/signup">
                Create Your Free Store <Zap className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          )}
        </div>
      </section>
    </MainLayout>
  );
};

export default Index;
