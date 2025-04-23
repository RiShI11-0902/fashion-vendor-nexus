
import MainLayout from "../components/layout/MainLayout";
import { Button } from "../components/ui/button";
import { Link } from "react-router-dom";
import { ShoppingBag, User, Package, ArrowRight } from "lucide-react";

const About = () => {
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">
            About FashionVendor
          </h1>
          <p className="text-lg text-gray-600">
            We're on a mission to make it easy for fashion entrepreneurs to create
            beautiful online stores and connect with customers around the world.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-24">
          <div>
            <h2 className="text-3xl font-display font-bold mb-6">Our Story</h2>
            <p className="text-gray-600 mb-4">
              FashionVendor was founded with a simple idea: make it easy for fashion designers
              and entrepreneurs to bring their creative vision online without technical barriers.
            </p>
            <p className="text-gray-600 mb-4">
              We understand the unique challenges faced by independent fashion brands.
              From managing inventory to creating a beautiful shopping experience, 
              our platform is designed specifically for the fashion industry.
            </p>
            <p className="text-gray-600">
              Today, we're proud to host hundreds of unique fashion stores, 
              helping designers and entrepreneurs reach customers worldwide.
            </p>
          </div>
          <div className="bg-gray-100 rounded-lg overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80" 
              alt="Fashion designer at work"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        
        <div className="mb-24">
          <h2 className="text-3xl font-display font-bold text-center mb-16">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="bg-gold/10 rounded-full p-4 inline-block mb-6">
                <ShoppingBag className="h-8 w-8 text-gold" />
              </div>
              <h3 className="text-xl font-display font-semibold mb-3">
                Empowering Entrepreneurs
              </h3>
              <p className="text-gray-600">
                We believe in giving fashion entrepreneurs the tools they need to succeed
                in an increasingly digital marketplace.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-gold/10 rounded-full p-4 inline-block mb-6">
                <User className="h-8 w-8 text-gold" />
              </div>
              <h3 className="text-xl font-display font-semibold mb-3">
                Customer Focus
              </h3>
              <p className="text-gray-600">
                We're committed to creating a platform that helps our vendors provide
                exceptional experiences to their customers.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-gold/10 rounded-full p-4 inline-block mb-6">
                <Package className="h-8 w-8 text-gold" />
              </div>
              <h3 className="text-xl font-display font-semibold mb-3">
                Quality & Simplicity
              </h3>
              <p className="text-gray-600">
                We strive to make our platform powerful yet simple, helping fashion
                brands showcase their products beautifully.
              </p>
            </div>
          </div>
        </div>
        
        <div className="mb-24">
          <h2 className="text-3xl font-display font-bold text-center mb-16">Our Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Emma Rodriguez",
                role: "Founder & CEO",
                image: "https://randomuser.me/api/portraits/women/23.jpg",
              },
              {
                name: "Marcus Chen",
                role: "Chief Product Officer",
                image: "https://randomuser.me/api/portraits/men/32.jpg",
              },
              {
                name: "Sophia Wilson",
                role: "Head of Design",
                image: "https://randomuser.me/api/portraits/women/44.jpg",
              },
              {
                name: "David Kim",
                role: "CTO",
                image: "https://randomuser.me/api/portraits/men/11.jpg",
              },
              {
                name: "Aisha Johnson",
                role: "Customer Success",
                image: "https://randomuser.me/api/portraits/women/68.jpg",
              },
              {
                name: "James Thompson",
                role: "Marketing Director",
                image: "https://randomuser.me/api/portraits/men/75.jpg",
              },
            ].map((member, idx) => (
              <div key={idx} className="text-center">
                <div className="mb-4 relative w-32 h-32 mx-auto overflow-hidden rounded-full">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-display font-semibold mb-1">{member.name}</h3>
                <p className="text-gray-600 text-sm">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-gray-900 text-white rounded-xl p-12 text-center mb-12">
          <h2 className="text-3xl font-display font-bold mb-6">
            Ready to Start Your Fashion Store?
          </h2>
          <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of fashion entrepreneurs already selling on our platform.
            Create your store today and start reaching customers worldwide.
          </p>
          <Button size="lg" asChild className="bg-gold hover:bg-gold/90 text-white">
            <Link to="/signup">
              Create Your Store Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </MainLayout>
  );
};

export default About;
