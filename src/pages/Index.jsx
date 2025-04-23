
import { Link } from "react-router-dom";
import { ArrowRight, ShoppingBag, User, Package } from "lucide-react";
import MainLayout from "../components/layout/MainLayout";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
} from "../components/ui/card";

const Index = () => {
  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-white to-gray-50 py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2 animate-fade-in">
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                Launch Your Fashion Brand <span className="text-gold">Online</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-600 mb-8">
                Create your own fashion store, showcase your products, and start selling in minutes.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="w-full sm:w-auto bg-gold hover:bg-gold/90" asChild>
                  <Link to="/signup">
                    Get Started
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" className="w-full sm:w-auto" asChild>
                  <Link to="/stores">Explore Stores</Link>
                </Button>
              </div>
            </div>
            <div className="md:w-1/2 animate-fade-in [--animate-delay:200ms]">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-tr from-gold/30 to-transparent rounded-lg transform rotate-3"></div>
                <div className="relative transform hover:scale-[1.02] transition-transform duration-300">
                  <img 
                    src="https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80" 
                    alt="Fashion Store" 
                    className="rounded-lg w-full h-full object-cover shadow-2xl"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 md:py-32 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              Everything You Need to Sell Fashion Online
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our platform gives you all the tools to create a stunning online store for your fashion brand.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <ShoppingBag className="h-6 w-6 text-gold" />,
                title: "Create Your Store",
                description: "Set up your personalized store with your brand colors, logo, and custom domain."
              },
              {
                icon: <Package className="h-6 w-6 text-gold" />,
                title: "Manage Products",
                description: "Easily add, edit, and organize your fashion products with our intuitive dashboard."
              },
              {
                icon: <User className="h-6 w-6 text-gold" />,
                title: "Grow Your Brand",
                description: "Reach new customers and build your fashion brand with our marketing tools."
              }
            ].map((feature, index) => (
              <Card key={index} className="group hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-8">
                  <div className="bg-gold/10 rounded-full p-3 inline-block mb-4 group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="font-display text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-gray-600 mb-4">{feature.description}</p>
                  <Link to="/signup" className="text-gold font-medium inline-flex items-center hover:underline">
                    Learn more <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-gray-50 py-20 md:py-32">
        <div className="container mx-auto px-4">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-center mb-16 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
            Loved by Fashion Entrepreneurs
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Sofia Rodriguez",
                role: "Founder, Eleganza",
                image: "https://randomuser.me/api/portraits/women/44.jpg",
                quote: "FashionVendor helped me turn my design passion into a thriving online business. Setting up my store was incredibly easy!"
              },
              {
                name: "Marcus Chen",
                role: "Owner, UrbanThreads",
                image: "https://randomuser.me/api/portraits/men/32.jpg",
                quote: "The platform is incredibly intuitive. I was able to launch my streetwear brand in just a few days and sales started immediately."
              },
              {
                name: "Aisha Johnson",
                role: "Designer, ModernMinimal",
                image: "https://randomuser.me/api/portraits/women/68.jpg",
                quote: "The customization options are fantastic. My store perfectly reflects my minimalist brand aesthetic and customers love it."
              }
            ].map((testimonial, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-8">
                  <div className="flex items-center mb-4">
                    <div className="mr-4">
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="h-12 w-12 rounded-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-semibold">{testimonial.name}</h4>
                      <p className="text-sm text-gray-500">{testimonial.role}</p>
                    </div>
                  </div>
                  <p className="text-gray-600 italic">{testimonial.quote}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-8 md:p-16 text-white text-center">
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
