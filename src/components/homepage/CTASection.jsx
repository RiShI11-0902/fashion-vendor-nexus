import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { Zap } from "lucide-react";

const CTASection = ({ currentUser }) => {
  return (
    <section className="py-20 bg-gradient-to-r from-pink-600 to-purple-600 text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
          Ready to Build Your Professional Store?
        </h2>
        <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
          Join thousands of entrepreneurs who've transformed their businesses into professional online stores
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
  );
};

export default CTASection;