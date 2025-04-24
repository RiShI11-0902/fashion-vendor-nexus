import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  ArrowRight, ShoppingBag, User, Package, Check, Star, 
  TrendingUp, LayoutDashboard, Palette, Zap, Globe, 
  Smartphone, CreditCard, BarChart2, Mail, Gift
} from "lucide-react";
import MainLayout from "../components/layout/MainLayout";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";

// Animation variants
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

const fadeIn = {
  hidden: { opacity: 0 },
  show: { opacity: 1 }
};

const Index = () => {
  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white py-16 md:py-28 lg:py-32">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white z-0" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
            <motion.div 
              className="lg:w-1/2 space-y-6"
              initial="hidden"
              animate="show"
              variants={container}
            >
              <motion.span 
                className="inline-block bg-rose-100 text-rose-600 px-3 py-1 rounded-full text-sm font-medium shadow-sm"
                variants={item}
              >
                NEW COLLECTION TOOLS
              </motion.span>
              <motion.h1 
                className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight"
                variants={item}
              >
                The <span className="text-rose-500">Complete Platform</span> for Fashion Brands
              </motion.h1>
              <motion.p 
                className="text-lg md:text-xl text-gray-600 max-w-lg"
                variants={item}
              >
                Launch your fashion brand online with beautiful storefronts, powerful merchandising tools, and built-in growth features.
              </motion.p>
              <motion.div 
                className="flex flex-col sm:flex-row gap-3 pt-2"
                variants={item}
              >
                <Button size="lg" className="bg-rose-600 hover:bg-rose-700 text-white shadow-lg shadow-rose-500/20" asChild>
                  <Link to="/signup">
                    Start Free Trial
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" className="border-gray-300 hover:bg-gray-50" asChild>
                  <Link to="/demo" className="flex items-center">
                    <span>View Demo</span>
                  </Link>
                </Button>
              </motion.div>
              <motion.div 
                className="flex items-center pt-2 gap-2 text-sm text-gray-500"
                variants={item}
              >
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <span>Rated 4.9/5 by 850+ fashion brands</span>
              </motion.div>
            </motion.div>

            <motion.div 
              className="lg:w-1/2"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-gray-100 group">
                <div className="absolute inset-0 bg-gradient-to-br from-rose-100/20 via-transparent to-transparent" />
                <img 
                  src="https://images.unsplash.com/photo-1551232864-3f0890e580d9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1287&q=80" 
                  alt="Fashion designer working on collection" 
                  className="w-full h-auto object-cover aspect-video group-hover:scale-[1.02] transition-transform duration-500"
                />
                <motion.div 
                  className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-sm p-4 rounded-lg shadow-sm max-w-xs"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    <p className="text-xs font-medium text-gray-600">New collection published</p>
                  </div>
                  <p className="text-sm font-medium">Summer '24 Collection</p>
                  <p className="text-xs text-gray-500">12 new products added</p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Logo Cloud */}
      <motion.section 
        className="py-12 bg-gray-50 border-y border-gray-200"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto px-4">
          <p className="text-center text-gray-500 text-sm mb-6">TRUSTED BY LEADING FASHION BRANDS</p>
          <div className="flex flex-wrap justify-center gap-x-12 gap-y-6 items-center">
            {['Vogue', "ELLE", "Chanel", "Dior", "Zara", "H&M"].map((brand, i) => (
              <motion.div 
                key={i}
                className="text-gray-400 font-medium text-lg opacity-80 hover:opacity-100 transition-opacity"
                whileHover={{ scale: 1.05 }}
              >
                {brand}
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Features Section */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center max-w-3xl mx-auto mb-16"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={container}
          >
            <motion.span 
              className="inline-block bg-rose-100 text-rose-600 px-3 py-1 rounded-full text-sm font-medium mb-4"
              variants={item}
            >
              Fashion-First Features
            </motion.span>
            <motion.h2 
              className="text-3xl md:text-4xl font-bold mb-4"
              variants={item}
            >
              Everything You Need to Launch and Grow
            </motion.h2>
            <motion.p 
              className="text-lg text-gray-600"
              variants={item}
            >
              Our platform is built specifically for fashion brands with tools that make selling online effortless.
            </motion.p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={container}
          >
            {[
              {
                icon: <LayoutDashboard className="h-6 w-6 text-rose-600" />,
                title: "Beautiful Storefronts",
                description: "Customizable templates designed to showcase fashion products",
                features: ["Mobile-optimized", "Seasonal themes", "Brand customization"]
              },
              {
                icon: <Palette className="h-6 w-6 text-rose-600" />,
                title: "Visual Merchandising",
                description: "Showcase your collections with professional tools",
                features: ["Lookbook creator", "Color swatches", "Size guides"]
              },
              {
                icon: <Zap className="h-6 w-6 text-rose-600" />,
                title: "Smart Product Management",
                description: "Easily manage your entire catalog",
                features: ["Inventory tracking", "Variant management", "Collection organization"]
              },
              {
                icon: <Globe className="h-6 w-6 text-rose-600" />,
                title: "Global Selling",
                description: "Sell to customers worldwide",
                features: ["Multi-currency", "Local payment methods", "Automatic taxes"]
              },
              {
                icon: <Smartphone className="h-6 w-6 text-rose-600" />,
                title: "Mobile App",
                description: "Manage your store on the go",
                features: ["Order notifications", "Inventory updates", "Sales analytics"]
              },
              {
                icon: <BarChart2 className="h-6 w-6 text-rose-600" />,
                title: "Growth Tools",
                description: "Built-in marketing to scale your brand",
                features: ["Email campaigns", "Discount engine", "Customer analytics"]
              }
            ].map((feature, index) => (
              <motion.div 
                key={index}
                variants={item}
                whileHover={{ y: -5 }}
              >
                <Card className="group hover:border-rose-100 hover:shadow-sm transition-all duration-300 border border-gray-100 h-full">
                  <CardContent className="p-8">
                    <div className="bg-rose-50 rounded-lg p-3 inline-flex mb-6 group-hover:bg-rose-100 transition-colors">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                    <p className="text-gray-600 mb-5">{feature.description}</p>
                    <ul className="space-y-2">
                      {feature.features.map((item, i) => (
                        <li key={i} className="flex items-center text-gray-600">
                          <Check className="h-4 w-4 text-rose-500 mr-2" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Fashion Showcase */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-rose-50">
        <div className="container mx-auto px-4">
          <motion.div 
            className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={container}
          >
            <motion.div 
              className="lg:w-1/2 space-y-6"
              variants={item}
            >
              <span className="inline-block bg-white text-rose-600 px-3 py-1 rounded-full text-sm font-medium shadow-sm">
                VISUAL MERCHANDISING
              </span>
              <h2 className="text-3xl md:text-4xl font-bold">
                Showcase Your Collections Like a Fashion Magazine
              </h2>
              <p className="text-lg text-gray-600">
                Our platform includes professional tools to present your fashion line with editorial-quality layouts and styling.
              </p>
              <ul className="space-y-4">
                {[
                  "Drag-and-drop lookbook creator",
                  "Model-view product displays",
                  "Seasonal collection templates",
                  "Full-screen image galleries",
                  "Color palette generator"
                ].map((item, i) => (
                  <motion.li 
                    key={i}
                    className="flex items-start"
                    variants={fadeIn}
                    transition={{ delay: i * 0.1 }}
                  >
                    <div className="bg-rose-100 p-1 rounded-full mr-3 mt-0.5">
                      <Check className="h-4 w-4 text-rose-600" />
                    </div>
                    <span className="text-gray-700">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
            <motion.div 
              className="lg:w-1/2"
              variants={item}
            >
              <div className="grid grid-cols-2 gap-4">
                <motion.div 
                  className="relative rounded-xl overflow-hidden shadow-lg aspect-square"
                  whileHover={{ scale: 0.98 }}
                >
                  <img 
                    src="https://images.unsplash.com/photo-1551232864-3f0890e580d9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1287&q=80" 
                    alt="Fashion model wearing designer dress" 
                    className="w-full h-full object-cover"
                  />
                </motion.div>
                <motion.div 
                  className="relative rounded-xl overflow-hidden shadow-lg aspect-square mt-8"
                  whileHover={{ scale: 0.98 }}
                >
                  <img 
                    src="https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1335&q=80" 
                    alt="Fashion accessories close-up" 
                    className="w-full h-full object-cover"
                  />
                </motion.div>
                <motion.div 
                  className="relative rounded-xl overflow-hidden shadow-lg aspect-square"
                  whileHover={{ scale: 0.98 }}
                >
                  <img 
                    src="https://images.unsplash.com/photo-1554412933-514a83d2f3c8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1472&q=80" 
                    alt="Fashion designer working" 
                    className="w-full h-full object-cover"
                  />
                </motion.div>
                <motion.div 
                  className="relative rounded-xl overflow-hidden shadow-lg aspect-square mt-8"
                  whileHover={{ scale: 0.98 }}
                >
                  <img 
                    src="https://images.unsplash.com/photo-1551232864-3f0890e580d9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1287&q=80" 
                    alt="Fashion model in urban setting" 
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center max-w-3xl mx-auto mb-16"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={container}
          >
            <motion.span 
              className="inline-block bg-rose-100 text-rose-600 px-3 py-1 rounded-full text-sm font-medium mb-4"
              variants={item}
            >
              DESIGNER STORIES
            </motion.span>
            <motion.h2 
              className="text-3xl md:text-4xl font-bold mb-4"
              variants={item}
            >
              Fashion Brands That Thrived With Us
            </motion.h2>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={container}
          >
            {[
              {
                name: "Sophia Laurent",
                role: "Creative Director, Maison Noire",
                image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
                quote: "The visual merchandising tools helped us triple our online conversion rate. Our collections have never looked better.",
                stats: "3x conversion rate"
              },
              {
                name: "Carlos Mendez",
                role: "Founder, Urban Threads",
                image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80",
                quote: "From our first collection to now 500+ products, this platform has scaled beautifully with our growth.",
                stats: "500+ products"
              },
              {
                name: "Aisha Johnson",
                role: "Designer, ModernMinimal",
                image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80",
                quote: "The analytics helped us understand our customers better than ever. We've optimized our entire collection based on the data.",
                stats: "60% repeat customers"
              }
            ].map((testimonial, index) => (
              <motion.div 
                key={index}
                variants={item}
                whileHover={{ scale: 1.02 }}
              >
                <Card className="border border-gray-100 hover:shadow-sm transition-shadow duration-300 h-full">
                  <CardContent className="p-8">
                    <div className="flex items-center mb-6">
                      <div className="mr-4">
                        <img
                          src={testimonial.image}
                          alt={testimonial.name}
                          className="h-14 w-14 rounded-full object-cover border-2 border-rose-100"
                        />
                      </div>
                      <div>
                        <h4 className="font-semibold text-lg">{testimonial.name}</h4>
                        <p className="text-sm text-gray-500">{testimonial.role}</p>
                      </div>
                    </div>
                    <p className="text-gray-600 mb-6">"{testimonial.quote}"</p>
                    <div className="bg-rose-50 text-rose-600 px-3 py-1.5 rounded-full text-sm font-medium inline-flex items-center">
                      <TrendingUp className="h-4 w-4 mr-2" />
                      {testimonial.stats}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center max-w-3xl mx-auto mb-16"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={container}
          >
            <motion.span 
              className="inline-block bg-rose-100 text-rose-600 px-3 py-1 rounded-full text-sm font-medium mb-4"
              variants={item}
            >
              SIMPLE PRICING
            </motion.span>
            <motion.h2 
              className="text-3xl md:text-4xl font-bold mb-4"
              variants={item}
            >
              Plans That Grow With Your Brand
            </motion.h2>
            <motion.p 
              className="text-lg text-gray-600"
              variants={item}
            >
              Start small and upgrade as your fashion business grows
            </motion.p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={container}
          >
            {[
              {
                name: "Starter",
                price: "$29",
                period: "per month",
                description: "Perfect for emerging designers",
                features: ["Up to 50 products", "Basic storefront", "Email support"],
                cta: "Start Free Trial"
              },
              {
                name: "Professional",
                price: "$79",
                period: "per month",
                description: "For growing fashion brands",
                features: ["Up to 500 products", "Advanced merchandising", "Priority support", "Analytics dashboard"],
                cta: "Most Popular",
                highlighted: true
              },
              {
                name: "Enterprise",
                price: "Custom",
                period: "",
                description: "For established fashion houses",
                features: ["Unlimited products", "Dedicated account manager", "API access", "Custom integrations"],
                cta: "Contact Sales"
              }
            ].map((plan, index) => (
              <motion.div 
                key={index}
                variants={item}
                whileHover={{ y: -5 }}
              >
                <Card className={`border ${plan.highlighted ? 'border-rose-300 shadow-lg' : 'border-gray-200'} h-full`}>
                  <CardContent className="p-8">
                    {plan.highlighted && (
                      <div className="bg-rose-600 text-white text-xs font-medium px-3 py-1 rounded-full inline-block mb-4">
                        MOST POPULAR
                      </div>
                    )}
                    <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                    <div className="flex items-end mb-4">
                      <span className="text-4xl font-bold">{plan.price}</span>
                      {plan.period && <span className="text-gray-500 ml-1">{plan.period}</span>}
                    </div>
                    <p className="text-gray-600 mb-6">{plan.description}</p>
                    <ul className="space-y-3 mb-8">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-center">
                          <Check className="h-5 w-5 text-rose-500 mr-2" />
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button 
                      size="lg" 
                      className={`w-full ${plan.highlighted ? 'bg-rose-600 hover:bg-rose-700' : 'bg-gray-900 hover:bg-gray-800'}`}
                    >
                      {plan.cta}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Final CTA */}
      <motion.section 
        className="py-20 md:py-28 bg-rose-600"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto px-4">
          <motion.div 
            className="max-w-4xl mx-auto text-center text-white"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={container}
          >
            <motion.h2 
              className="text-3xl md:text-4xl font-bold mb-6"
              variants={item}
            >
              Ready to Launch Your Fashion Brand Online?
            </motion.h2>
            <motion.p 
              className="text-lg text-rose-100 mb-8"
              variants={item}
            >
              Join thousands of fashion designers, brands, and retailers growing with our platform.
            </motion.p>
            <motion.div 
              className="flex flex-col sm:flex-row gap-3 justify-center"
              variants={item}
            >
              <Button size="lg" className="bg-white text-rose-600 hover:bg-gray-100 shadow-lg" asChild>
                <Link to="/signup">
                  Start Free Trial
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="text-white border-white hover:bg-rose-700 hover:text-white" asChild>
                <Link to="/demo">
                  Schedule Demo
                </Link>
              </Button>
            </motion.div>
            <motion.p 
              className="text-rose-100 text-sm mt-4"
              variants={item}
            >
              No credit card required • Cancel anytime
            </motion.p>
          </motion.div>
        </div>
      </motion.section>
    </MainLayout>
  );
};

export default Index;