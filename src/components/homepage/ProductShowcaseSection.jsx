import { Badge } from "../ui/badge";

const ProductShowcaseSection = () => {
  const featuredProducts = [
    {
      id: 1,
      name: "Elegant Dresses",
      image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=600&fit=crop",
      price: "Starting from $94",
      category: "Fashion"
    },
    {
      id: 2,
      name: "Designer Jeans",
      image: "https://images.unsplash.com/photo-1542272454315-7ad9b1ba6f84?w=400&h=600&fit=crop",
      price: "Starting from $55",
      category: "Denim"
    },
    {
      id: 3,
      name: "Premium Outerwear",
      image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=600&fit=crop",
      price: "Starting from $89",
      category: "Outerwear"
    },
    {
      id: 4,
      name: "Summer Collection",
      image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=400&h=600&fit=crop",
      price: "Starting from $65",
      category: "Summer"
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Professional Product Showcases</h2>
          <p className="text-lg text-gray-600">See how your products transform into professional online galleries</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {featuredProducts.map((product, index) => (
            <div key={product.id} className="group cursor-pointer">
              <div className="relative overflow-hidden rounded-lg mb-4">
                <img 
                  src={product.image}
                  alt={product.name}
                  className="w-full h-64 md:h-80 object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300"></div>
                <Badge className="absolute top-3 right-3 bg-white/90 text-gray-900">
                  {product.category}
                </Badge>
              </div>
              <div className="text-center">
                <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
                <p className="text-gray-600">{product.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductShowcaseSection;