import { BookOpen, MessageCircle, BarChart3, Smartphone, Palette, Zap } from "lucide-react";

const features = [
  {
    icon: BookOpen,
    color: "from-pink-500/20 to-rose-500/10",
    iconColor: "text-pink-500",
    title: "Online Catalog",
    description: "Publish a stunning product catalog with images, prices and descriptions — looks great on every device.",
  },
  {
    icon: MessageCircle,
    color: "from-green-500/20 to-emerald-500/10",
    iconColor: "text-green-400",
    title: "WhatsApp Orders",
    description: "Customers tap a button and their order lands directly in your WhatsApp — zero friction, instant connection.",
  },
  {
    icon: BarChart3,
    color: "from-purple-500/20 to-violet-500/10",
    iconColor: "text-purple-400",
    title: "Order Dashboard",
    description: "View, manage and track every order in one clean dashboard. Know what's pending, shipped or done.",
  },
  {
    icon: Smartphone,
    color: "from-blue-500/20 to-sky-500/10",
    iconColor: "text-blue-400",
    title: "Mobile First",
    description: "Your catalog is perfectly optimised for mobile — the way most customers browse and buy.",
  },
  // {
  //   icon: Palette,
  //   color: "from-orange-500/20 to-amber-500/10",
  //   iconColor: "text-orange-400",
  //   title: "Custom Branding",
  //   description: "Add your logo, banner and brand colors to make the store unmistakably yours.",
  // },
  {
    icon: Zap,
    color: "from-yellow-500/20 to-lime-500/10",
    iconColor: "text-yellow-400",
    title: "Launch in Minutes",
    description: "No coding, no complicated setup. Fill in a form, add products and you're live — seriously.",
  },
];

const FeaturesSection = () => {
  return (
    <section className="py-24 bg-[#0d0d14]">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <span className="inline-block bg-pink-500/10 text-pink-400 text-sm font-semibold px-4 py-1.5 rounded-full mb-4 border border-pink-500/20">
            Everything you need
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
            Sell smarter, not harder
          </h2>
          <p className="text-gray-400 text-lg">
            From catalog to WhatsApp orders to analytics — one platform handles it all for you.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <div
              key={i}
              className="group relative bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.07] hover:border-white/[0.14] rounded-2xl p-6 transition-all duration-300"
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-5`}>
                <feature.icon className={`h-6 w-6 ${feature.iconColor}`} />
              </div>
              <h3 className="text-white font-semibold text-lg mb-2">{feature.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
