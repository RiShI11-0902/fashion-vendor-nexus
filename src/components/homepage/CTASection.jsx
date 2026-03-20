import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { ArrowRight, MessageCircle } from "lucide-react";

const CTASection = ({ currentUser }) => {
  return (
    <section className="py-24 bg-[#0d0d14] relative overflow-hidden">
      {/* Glow blobs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-64 bg-pink-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-purple-700/15 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          {/* WhatsApp pill */}
          <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/20 text-green-400 rounded-full px-4 py-2 text-sm font-medium mb-8">
            <MessageCircle className="h-4 w-4" />
            Orders directly to your WhatsApp
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            Ready to grow your
            <span className="bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent"> business?</span>
          </h2>

          <p className="text-gray-400 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
            Join thousands of entrepreneurs who've built their online catalog, 
            started receiving WhatsApp orders and scaled with our dashboard.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white font-semibold px-10 rounded-xl shadow-2xl shadow-pink-900/30 transition-all text-base"
            >
              <Link to={currentUser ? "/dashboard/store" : "/signup"}>
                Create your catalog free <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>

          <p className="text-gray-600 text-sm mt-6">No credit card required · Set up in minutes</p>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
