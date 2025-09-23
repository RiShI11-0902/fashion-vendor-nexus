import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { ArrowRight, Star, Zap, Globe, TrendingUp } from "lucide-react";
import img5 from "../../assets/img5.png";
import img2 from "../../assets/img2.png";
import img3 from "../../assets/img3.png";
import img4 from "../../assets/img4.png";

const HeroSection = ({ currentUser }) => {
  return (
    <section className="relative bg-gradient-to-br from-pink-50 via-white to-purple-50 overflow-hidden">
      <div className="container mx-auto px-4 py-8 md:py-16">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <div className="space-y-8">
            <div className="text-center lg:text-left">
              <div className="flex items-center gap-2 mb-6 justify-center lg:justify-start">
                <Globe className="h-6 w-6 text-pink-600" />
                <span className="text-sm font-medium text-gray-600">For All Entrepreneurs</span>
              </div>
              
              <h1 className="text-2xl md:text-3xl text-center font-bold mb-6 leading-tight">
                Build Your <span className="text-pink-600">Professional</span> Online Store in 
                <span className="text-purple-600"> Minutes</span>
              </h1>
              
              <p className="text-lg md:text-lg text-center text-gray-600 mb-8 max-w-2xl mx-auto lg:mx-0">
                Create a stunning, professional website that showcases your products and builds trust with your customers. 
                No coding required.
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

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <img 
                src={img2}
                alt="E-commerce showcase"
                className="w-full h-48 object-cover rounded-lg shadow-lg"
              />
              <img 
                src={img5}
                alt="Online store management"
                className="w-full h-32 object-cover rounded-lg shadow-lg"
              />
            </div>
            <div className="space-y-4 mt-8">
              <img 
                src={img4}
                alt="Mobile shopping interface"
                className="w-full h-32 object-cover rounded-lg shadow-lg"
              />
              <img 
                src={img3}
                alt="Product photography"
                className="w-full h-48 object-cover rounded-lg shadow-lg"
              />
            </div>
            
            <div className="absolute top-4 left-4 bg-white/95 rounded-lg px-4 py-2">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-green-500" />
                <span className="text-sm font-medium">Growing Business</span>
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
  );
};

export default HeroSection;