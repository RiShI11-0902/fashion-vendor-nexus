
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
  ShieldCheck
} from "lucide-react";

const Index = () => {
  const { currentUser } = useAuthStore();

  const featuredProducts = [
    {
      id: 1,
      name: "Jumpsuits",
      image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=600&fit=crop",
      price: "Starting from $94",
      category: "Women"
    },
    {
      id: 2,
      name: "Jeans",
      image: "https://images.unsplash.com/photo-1542272454315-7ad9b1ba6f84?w=400&h=600&fit=crop",
      price: "Starting from $55",
      category: "Denim"
    },
    {
      id: 3,
      name: "Coats & Jackets",
      image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=600&fit=crop",
      price: "Starting from $89",
      category: "Outerwear"
    },
    {
      id: 4,
      name: "Playsuits",
      image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=400&h=600&fit=crop",
      price: "Starting from $65",
      category: "Summer"
    }
  ];

  const promoSections = [
    {
      id: 1,
      title: "Summer Offer",
      discount: "20%",
      subtitle: "The Brand",
      image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=500&h=400&fit=crop",
      bgColor: "bg-gradient-to-br from-pink-100 to-orange-100"
    },
    {
      id: 2,
      title: "SALE UP TO",
      discount: "50%",
      subtitle: "Clearance Offer",
      image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=500&h=400&fit=crop",
      bgColor: "bg-gradient-to-br from-blue-100 to-cyan-100"
    }
  ];

  const trustFeatures = [
    {
      icon: Truck,
      title: "Free Delivery",
      description: "On order above $25"
    },
    {
      icon: RotateCcw,
      title: "Easy Returns",
      description: "7 Day free returns"
    },
    {
      icon: Award,
      title: "High Quality",
      description: "Premium quality products"
    },
    {
      icon: ShieldCheck,
      title: "Security Guarantee",
      description: "100% Secured shopping experience"
    }
  ];

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-pink-50 via-white to-purple-50 overflow-hidden">
        <div className="container mx-auto px-4 py-8 md:py-16">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=600&h=800&fit=crop"
                alt="Fashion Model"
                className="w-full h-[500px] md:h-[700px] object-cover rounded-2xl shadow-2xl"
              />
              <div className="absolute top-4 left-4 bg-white/95 rounded-lg px-4 py-2">
                <div className="flex items-center gap-2">
                  <Heart className="h-4 w-4 text-red-500" />
                  <span className="text-sm font-medium">2.5K</span>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div className="text-center lg:text-left">
                <div className="text-6xl md:text-8xl font-bold mb-4">
                  <span className="text-gray-900">50%</span>
                </div>
                <div className="text-2xl md:text-3xl font-semibold mb-4">
                  Off
                </div>
                <h1 className="text-xl md:text-2xl font-medium mb-6">
                  Top Brands On Offer Price*
                </h1>
                <p className="text-gray-600 mb-8 max-w-md mx-auto lg:mx-0">
                  Mauris tempor lorem quis vel molestie lorem. At magna lorem quis, 
                  dictum viverra quis vel eros tempor. Vestibulum placerat lorem et elit tempor.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  {currentUser ? (
                    <Button asChild size="lg" className="bg-gray-900 hover:bg-gray-800 text-white px-8 py-3">
                      <Link to="/dashboard">
                        Launch Your Store <ArrowRight className="ml-2 h-5 w-5" />
                      </Link>
                    </Button>
                  ) : (
                    <>
                      <Button asChild size="lg" className="bg-gray-900 hover:bg-gray-800 text-white px-8 py-3">
                        <Link to="/signup">
                          Shop Now <ArrowRight className="ml-2 h-5 w-5" />
                        </Link>
                      </Button>
                      <Button asChild variant="outline" size="lg" className="px-8 py-3">
                        <Link to="/stores">Browse Stores</Link>
                      </Button>
                    </>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <img 
                  src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=300&h=400&fit=crop"
                  alt="Fashion"
                  className="w-full h-48 object-cover rounded-lg"
                />
                <img 
                  src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=300&h=400&fit=crop"
                  alt="Fashion"
                  className="w-full h-48 object-cover rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Features */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {trustFeatures.map((feature, index) => (
              <div key={index} className="flex items-center gap-3 p-4 rounded-lg bg-gray-50">
                <div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <feature.icon className="h-5 w-5 text-pink-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm">{feature.title}</h3>
                  <p className="text-xs text-gray-600">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Exclusive Products */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-gray-500 text-sm mb-2">Highly Rated</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-8">Exclusive Products</h2>
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

      {/* Promotional Grid */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Summer Offer */}
            <div className="bg-gradient-to-br from-pink-100 to-orange-100 rounded-2xl p-8 relative overflow-hidden">
              <div className="relative z-10">
                <p className="text-sm text-gray-600 mb-2">The Brand</p>
                <h3 className="text-2xl font-bold mb-4">Summer Offer</h3>
                <div className="text-4xl font-bold mb-4">20%</div>
                <Button variant="outline" size="sm" className="bg-white/80 hover:bg-white">
                  Explore Now <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
              <img 
                src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=200&h=300&fit=crop"
                alt="Summer Fashion"
                className="absolute -right-4 -bottom-4 w-32 h-48 object-cover rounded-lg opacity-80"
              />
            </div>

            {/* Sale Offer */}
            <div className="bg-gradient-to-br from-blue-100 to-cyan-100 rounded-2xl p-8 relative overflow-hidden">
              <div className="relative z-10">
                <p className="text-sm text-gray-600 mb-2">Clearance Offer</p>
                <h3 className="text-lg font-bold mb-2">SALE UP TO</h3>
                <div className="text-4xl font-bold mb-4">50%</div>
                <div className="text-lg font-semibold mb-4">OFF</div>
                <Button variant="outline" size="sm" className="bg-white/80 hover:bg-white">
                  Explore Now <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Featured Product */}
            <div className="relative rounded-2xl overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=600&fit=crop"
                alt="Summer Collection"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-6 left-6 right-6">
                <div className="bg-white/95 backdrop-blur-sm rounded-lg p-4">
                  <h3 className="font-bold text-lg mb-2">Summer Trouser Suit</h3>
                  <Button size="sm" className="bg-gray-900 hover:bg-gray-800">
                    Shop Now
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cosmetics Section */}
      <section className="py-16 bg-gradient-to-r from-purple-900 to-pink-900 text-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-pink-200 mb-4">The Inner Beauty Brand</p>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Long Wearing Cosmetics</h2>
              <Button variant="outline" className="border-white text-white hover:bg-white hover:text-purple-900">
                Shop Now <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=500&h=400&fit=crop"
                alt="Cosmetics"
                className="w-full h-64 object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-pink-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
            Ready to Launch Your Fashion Empire?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join thousands of fashion entrepreneurs who've built successful online boutiques
          </p>
          
          {!currentUser && (
            <Button asChild size="lg" variant="secondary" className="text-lg px-8 py-3 bg-white text-pink-600 hover:bg-gray-100">
              <Link to="/signup">
                Create Your Fashion Store <Zap className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          )}
        </div>
      </section>
    </MainLayout>
  );
};

export default Index;
