import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { ArrowRight, MessageCircle, BarChart3, BookOpen, CheckCircle2, Sparkles } from "lucide-react";
import img5 from "../../assets/img5.png";
import img2 from "../../assets/img2.png";
import img3 from "../../assets/img3.png";
import img4 from "../../assets/img4.png";
import google from "../../assets/google.png";
import { handleGoogleLogin } from "../../lib/utils";

const HeroSection = ({ currentUser }) => {
  return (
    <section className="relative bg-[#0a0a0f] overflow-hidden min-h-screen flex items-center">
      {/* Gradient orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-pink-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-900/10 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left — copy */}
          <div className="space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-2 text-sm text-pink-400 font-medium">
              <Sparkles className="h-4 w-4" />
              The easiest way to sell online
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight">
              Build your catalog.
              <br />
              <span className="bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
                Get orders on WhatsApp.
              </span>
            </h1>

            <p className="text-lg text-gray-400 max-w-xl leading-relaxed">
              Create a beautiful online catalog in minutes, share it with customers,
              receive orders directly on <span className="text-green-400 font-semibold">WhatsApp</span> — then track and analyze everything from your dashboard.
            </p>

            {/* Trust points */}
            <div className="space-y-3">
              {[
                "Beautiful product catalog — no coding needed",
                "Customers order via WhatsApp instantly",
                "Manage, track & analyze all orders in one place",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3 text-gray-300 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-pink-500 shrink-0" />
                  {item}
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white font-semibold px-8 rounded-xl shadow-lg shadow-pink-900/30 transition-all"
              >
                <Button onClick={handleGoogleLogin}>
                  Start for free <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Button>
            </div>
          </div>

          {/* Right — visual dashboard mockup */}
          <div className="relative">
            {/* Main card */}
            <div className="relative bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-sm shadow-2xl">
              <div className="grid grid-cols-2 gap-3 mb-3">
                <img src={img2} alt="Product catalog" className="w-full h-44 object-cover rounded-xl" />
                <img src={img3} alt="Store products" className="w-full h-44 object-cover rounded-xl" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <img src={img4} alt="Mobile orders" className="w-full h-32 object-cover rounded-xl" />
                <img src={img5} alt="Dashboard analytics" className="w-full h-32 object-cover rounded-xl" />
              </div>

              {/* Floating order notification */}
              <div className="absolute -top-4 -right-4 bg-green-500 text-white rounded-2xl px-4 py-2.5 shadow-xl flex items-center gap-2.5 text-sm font-semibold">
                <MessageCircle className="h-4 w-4" />
                New WhatsApp order!
              </div>

              {/* Floating stats */}
              <div className="absolute -bottom-4 -left-4 bg-[#1a1a2e] border border-white/10 rounded-2xl px-4 py-3 shadow-xl flex items-center gap-3">
                <div className="w-8 h-8 bg-pink-600/20 rounded-lg flex items-center justify-center">
                  <BarChart3 className="h-4 w-4 text-pink-400" />
                </div>
                <div>
                  <p className="text-xs text-gray-400">Orders today</p>
                  <p className="text-white font-bold text-sm">+24 new</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;
