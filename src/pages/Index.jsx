
import { Link } from "react-router-dom";
import { useAuthStore } from "../stores/useAuthStore";
import MainLayout from "../components/layout/MainLayout";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { 
  Store, 
  Package, 
  TrendingUp, 
  Users, 
  Smartphone,
  Shield,
  Zap,
  ArrowRight,
  Star,
  Heart,
  Camera,
  Truck,
  RotateCcw,
  Award,
  ShieldCheck,
  Instagram,
  Globe,
  BarChart3,
  Palette
} from "lucide-react";

const Index = () => {
  const { currentUser } = useAuthStore();

  const featuredProducts = [
    {
      id: 1,
      name: "Elegant Dresses",
      image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=600&fit=crop",
      price: "Starting from $94",
      category: "Women"
    },
    {
      id: 2,
      name: "Designer Jeans",
      image: "https://images.unsplash.com/photo-1542272454315-7ad9b1ba6f84?w=400&h=600&fit=crop",
      price: "Starting from $55",
      category: "Denim"
    },
    {
      id: 3,
      name: "Premium Outerwear",
      image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=600&fit=crop",
      price: "Starting from $89",
      category: "Outerwear"
    },
    {
      id: 4,
      name: "Summer Collection",
      image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=400&h=600&fit=crop",
      price: "Starting from $65",
      category: "Summer"
    }
  ];

  const features = [
    {
      icon: Instagram,
      title: "Instagram Integration",
      description: "Connect your Instagram feed directly to your professional storefront"
    },
    {
      icon: Globe,
      title: "Professional Website",
      description: "Transform your Instagram business into a credible online store"
    },
    {
      icon: Palette,
      title: "Custom Branding",
      description: "Match your website design with your Instagram aesthetic"
    },
    {
      icon: BarChart3,
      title: "Business Analytics",
      description: "Track performance beyond Instagram's limited insights"
    }
  ];

  const successStories = [
    {
      name: "@fashionista_mode",
      followers: "25K",
      achievement: "Built a 6-figure fashion business",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b647?w=100&h=100&fit=crop&crop=face"
    },
    {
      name: "@streetstyle_co",
      followers: "18K",
      achievement: "Launched professional brand website",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
    },
    {
      name: "@boho_boutique",
      followers: "32K",
      achievement: "Scaled beyond Instagram limitations",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face"
    }
  ];

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-pink-50 via-white to-purple-50 overflow-hidden">
        <div className="container mx-auto px-4 py-8 md:py-16">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-8">
              <div className="text-center lg:text-left">
                <div className="flex items-center gap-2 mb-6 justify-center lg:justify-start">
                  <Instagram className="h-6 w-6 text-pink-600" />
                  <span className="text-sm font-medium text-gray-600">For Instagram Fashion Entrepreneurs</span>
                </div>
                
                <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                  Turn Your <span className="text-pink-600">Instagram</span> Fashion Business Into a 
                  <span className="text-purple-600"> Professional Store</span>
                </h1>
                
                <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto lg:mx-0">
                  Stop losing customers to Instagram's limitations. Create a stunning, professional website 
                  that showcases your fashion brand and builds trust with your audience.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
                  {currentUser ? (
                    <Button asChild size="lg" className="bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white px-8 py-3">
                      <Link to="/dashboard">
                        Create Your Store <ArrowRight className="ml-2 h-5 w-5" />
                      </Link>
                    </Button>
                  ) : (
                    <>
                      <Button asChild size="lg" className="bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white px-8 py-3">
                        <Link to="/signup">
                          Start Building Free <ArrowRight className="ml-2 h-5 w-5" />
                        </Link>
                      </Button>
                      <Button asChild variant="outline" size="lg" className="px-8 py-3 border-2">
                        <Link to="/stores">See Examples</Link>
                      </Button>
                    </>
                  )}
                </div>

                <div className="flex items-center gap-6 text-sm text-gray-600 justify-center lg:justify-start">
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <span>No coding required</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Zap className="h-4 w-4 text-blue-500" />
                    <span>Launch in minutes</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=600&h=800&fit=crop"
                alt="Fashion Entrepreneur"
                className="w-full h-[500px] md:h-[700px] object-cover rounded-2xl shadow-2xl"
              />
              <div className="absolute top-4 left-4 bg-white/95 rounded-lg px-4 py-2">
                <div className="flex items-center gap-2">
                  <Instagram className="h-4 w-4 text-pink-500" />
                  <span className="text-sm font-medium">25K followers</span>
                </div>
              </div>
              <div className="absolute bottom-4 right-4 bg-white/95 rounded-lg px-4 py-2">
                <div className="flex items-center gap-2">
                  <Globe className="h-4 w-4 text-blue-500" />
                  <span className="text-sm font-medium">Professional Website</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Instagram Sellers Choose Us</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Bridge the gap between social media and professional e-commerce with tools designed specifically for fashion entrepreneurs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center p-6 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
                <div className="w-16 h-16 bg-gradient-to-br from-pink-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="h-8 w-8 text-pink-600" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-purple-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Instagram Entrepreneurs Who Made It</h2>
            <p className="text-lg text-gray-600">Real fashion influencers who transformed their Instagram presence into thriving businesses</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {successStories.map((story, index) => (
              <div key={index} className="bg-white rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-shadow">
                <img 
                  src={story.image}
                  alt={story.name}
                  className="w-16 h-16 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="font-semibold text-lg mb-1">{story.name}</h3>
                <p className="text-gray-500 text-sm mb-3">{story.followers} followers</p>
                <p className="text-gray-700 font-medium">{story.achievement}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Example Products */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Professional Product Showcases</h2>
            <p className="text-lg text-gray-600">See how your Instagram posts transform into professional product galleries</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {featuredProducts.map((product, index) => (
              <div key={product.id} className="group cursor-pointer">
                <div className="relative overflow-hidden rounded-lg mb-4">
                  <img 
                    src={product.image}
                    alt={product.name}
                    className="w-full h-64 md:h-80 object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300"></div>
                  <Badge className="absolute top-3 right-3 bg-white/90 text-gray-900">
                    {product.category}
                  </Badge>
                </div>
                <div className="text-center">
                  <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
                  <p className="text-gray-600">{product.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-pink-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
            Ready to Grow Beyond Instagram?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join thousands of fashion entrepreneurs who've transformed their Instagram businesses into professional online stores
          </p>
          
          {!currentUser && (
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="secondary" className="text-lg px-8 py-3 bg-white text-pink-600 hover:bg-gray-100">
                <Link to="/signup">
                  Start Building Your Store <Zap className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="text-lg px-8 py-3 border-white text-white hover:bg-white/10">
                <Link to="/stores">
                  View Store Examples
                </Link>
              </Button>
            </div>
          )}
        </div>
      </section>
    </MainLayout>
  );
};

export default Index;
