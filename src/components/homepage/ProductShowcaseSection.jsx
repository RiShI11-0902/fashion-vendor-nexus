import { Badge } from "../ui/badge";
import { MessageCircle, ShoppingBag } from "lucide-react";
import model1 from "../../assets/model1.png";
import model2 from "../../assets/model2.png";
import watch from "../../assets/watch.png";
import bag from "../../assets/bag.png";

const products = [
  { id: 1, name: "Men Watch", image: watch,  price: "₹500", category: "Accessories" },
  { id: 2, name: "Designer Shirts", image: model1, price: "₹700", category: "Fashion" },
  { id: 3, name: "Premium Outerwear", image: model2, price: "₹900", category: "Outerwear" },
  { id: 4, name: "Women HandBag", image: bag,  price: "₹1,000", category: "Bags" },
];

const ProductShowcaseSection = () => {
  return (
    <section className="py-24 bg-[#0a0a0f] relative overflow-hidden">
      {/* Soft glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-purple-900/10 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-14 max-w-2xl mx-auto">
          <span className="inline-block bg-purple-500/10 text-purple-400 text-sm font-semibold px-4 py-1.5 rounded-full mb-4 border border-purple-500/20">
            Live preview
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Your catalog, beautifully displayed
          </h2>
          <p className="text-gray-400 text-lg">
            Every product looks professional — customers browse, choose and order straight from WhatsApp.
          </p>
        </div>

        {/* Product grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {products.map((product) => (
            <div key={product.id} className="group cursor-pointer">
              <div className="relative overflow-hidden rounded-2xl bg-white/[0.04] border border-white/[0.08] mb-4">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-64 md:h-80 object-contain transition-transform duration-500 group-hover:scale-105 p-2"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <Badge className="absolute top-3 left-3 bg-white/10 backdrop-blur-md text-white border-white/20 text-xs">
                  {product.category}
                </Badge>

                {/* WhatsApp order overlay */}
                <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                  <div className="flex items-center justify-center gap-2 bg-green-500 text-white rounded-xl py-2 text-sm font-semibold shadow-lg">
                    <MessageCircle className="h-4 w-4" />
                    Order on WhatsApp
                  </div>
                </div>
              </div>

              <div className="px-1">
                <h3 className="font-semibold text-white text-sm mb-1">{product.name}</h3>
                <p className="text-pink-400 font-bold text-sm">from {product.price}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom note */}
        <div className="text-center mt-12">
          <div className="inline-flex items-center gap-2 text-gray-500 text-sm">
            <ShoppingBag className="h-4 w-4" />
            This is what your customers see when they visit your catalog
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductShowcaseSection;
