import { Globe, Palette, BarChart3, Smartphone } from "lucide-react";

const FeaturesSection = () => {
  const features = [
    {
      icon: Globe,
      title: "Professional Website",
      description: "Create a credible online presence that builds trust with your customers"
    },
    {
      icon: Smartphone,
      title: "Mobile Optimized",
      description: "Your store looks perfect on all devices - mobile, tablet, and desktop"
    },
    {
      icon: Palette,
      title: "Custom Branding",
      description: "Match your website design with your brand aesthetic and style"
    },
    {
      icon: BarChart3,
      title: "Business Analytics",
      description: "Track performance and understand your customers better"
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Entrepreneurs Choose Us</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Bridge the gap between social media and professional e-commerce with tools designed for modern businesses
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
  );
};

export default FeaturesSection;