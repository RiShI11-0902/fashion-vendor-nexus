
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
  ArrowRight,
  Star,
  Heart,
  Camera
} from "lucide-react";

const Index = () => {
  const { currentUser } = useAuthStore();

  const features = [
    {
      icon: Store,
      title: "Launch Your Fashion Brand",
      description: "Create a stunning online boutique that showcases your unique style and collections"
    },
    {
      icon: Package,
      title: "Smart Inventory Control",
      description: "Track your fashion inventory with size variations, color options, and automatic restock alerts"
    },
    {
      icon: TrendingUp,
      title: "Fashion Analytics",
      description: "Understand your customers' style preferences and trending fashion pieces"
    },
    {
      icon: Users,
      title: "Style Community",
      description: "Build a loyal customer base with personalized styling recommendations"
    },
    {
      icon: Camera,
      title: "Instagram Integration",
      description: "Seamlessly showcase your fashion content from social media platforms"
    },
    {
      icon: Shield,
      title: "Secure & Trusted",
      description: "Bank-level security for your fashion business and customer data"
    }
  ];

  const testimonials = [
    {
      name: "Priya Sharma",
      role: "Fashion Designer",
      content: "This platform helped me turn my Instagram fashion page into a thriving business!",
      rating: 5
    },
    {
      name: "Arjun Patel",
      role: "Boutique Owner",
      content: "The inventory management is perfect for tracking my clothing sizes and colors.",
      rating: 5
    },
    {
      name: "Sneha Singh",
      role: "Fashion Entrepreneur",
      content: "From zero to 100+ orders in just 2 months. Amazing platform for fashion sellers!",
      rating: 5
    }
  ];

  return (
    <MainLayout>
      {/* Hero Section with Fashion Model */}
      <section className="relative bg-gradient-to-br from-pink-50 via-white to-purple-50 py-20 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-left">
              <h1 className="text-4xl md:text-6xl font-display font-bold mb-6 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                Your Fashion Empire Starts Here
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Join thousands of fashion entrepreneurs who've built successful online boutiques. 
                From trendy streetwear to elegant couture - showcase your style to the world.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                {currentUser ? (
                  <Button asChild size="lg" className="text-lg px-8 py-3 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700">
                    <Link to="/dashboard">
                      Launch Your Boutique <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                ) : (
                  <>
                    <Button asChild size="lg" className="text-lg px-8 py-3 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700">
                      <Link to="/signup">
                        Start Your Fashion Store <ArrowRight className="ml-2 h-5 w-5" />
                      </Link>
                    </Button>
                    <Button asChild variant="outline" size="lg" className="text-lg px-8 py-3 border-pink-200 hover:bg-pink-50">
                      <Link to="/login">Sign In</Link>
                    </Button>
                  </>
                )}
              </div>

              <div className="flex items-center gap-6 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 text-yellow-500 fill-current" />
                  <span className="font-medium">4.9/5</span>
                </div>
                <div>500+ Fashion Brands</div>
                <div>50K+ Happy Customers</div>
              </div>
            </div>

            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Fashion Model Showcase"
                  className="w-full h-[600px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
              
              {/* Floating Cards */}
              <div className="absolute -top-4 -left-4 bg-white rounded-lg shadow-lg p-3 animate-bounce">
                <div className="flex items-center gap-2">
                  <Heart className="h-4 w-4 text-red-500" />
                  <span className="text-sm font-medium">2.5K Likes</span>
                </div>
              </div>
              
              <div className="absolute -bottom-4 -right-4 bg-white rounded-lg shadow-lg p-3">
                <div className="text-center">
                  <div className="text-lg font-bold text-green-600">₹1.2L</div>
                  <div className="text-xs text-gray-600">Monthly Revenue</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Everything Your Fashion Business Needs
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              From concept to customer - we provide all the tools to make your fashion dreams a reality.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-pink-100 to-purple-100 rounded-2xl flex items-center justify-center">
                    <feature.icon className="h-8 w-8 text-pink-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Fashion Showcase */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-pink-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Fashion Success Stories
            </h2>
            <p className="text-xl text-gray-600">
              Real entrepreneurs, real results
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-white border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center mb-3">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-500 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4 italic">"{testimonial.content}"</p>
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-gray-500">{testimonial.role}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-12">
            Join the Fashion Revolution
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="text-4xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-2">500+</div>
              <div className="text-gray-600">Fashion Stores</div>
            </div>
            <div>
              <div className="text-4xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-2">25K+</div>
              <div className="text-gray-600">Fashion Products</div>
            </div>
            <div>
              <div className="text-4xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-2">100K+</div>
              <div className="text-gray-600">Happy Customers</div>
            </div>
            <div>
              <div className="text-4xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-2">₹5Cr+</div>
              <div className="text-gray-600">Revenue Generated</div>
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
            Transform your fashion passion into a profitable business. Start selling online today 
            with zero setup fees and complete creative control.
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
