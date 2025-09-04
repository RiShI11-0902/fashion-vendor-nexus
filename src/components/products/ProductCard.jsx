
import { Link } from "react-router-dom";
import { Badge } from "../ui/badge";
import { useStoreManager } from "../../stores/useStoreManager";
import { Percent, Clock } from "lucide-react";

const ProductCard = ({ product, storeSlug, className = "" }) => {
  const { getDiscountedPrice } = useStoreManager();
  const { price: discountedPrice, discount } = getDiscountedPrice(product.id, product.price);
  
  const hasDiscount = discount && discountedPrice < product.price;
  const discountPercentage = hasDiscount && discount.type === 'percentage' ? discount.value : null;
  
  // Calculate time remaining for discount
  const getTimeRemaining = () => {
    if (!discount) return null;
    
    const now = new Date();
    const endDate = new Date(discount.endDate);
    const timeDiff = endDate.getTime() - now.getTime();
    
    if (timeDiff <= 0) return null;
    
    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    if (days > 0) return `${days}d ${hours}h left`;
    return `${hours}h left`;
  };

  const timeRemaining = getTimeRemaining();

  return (
    <Link 
      to={`/store/${storeSlug}/product/${product.id}`}
      className={`block group ${className}`}
    >
      <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
        <div className="relative">
          <img 
            src={product.image}
            alt={product.name}
            className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          
          {/* Discount Badge */}
          {hasDiscount && (
            <div className="absolute top-3 left-3">
              <Badge className="bg-red-500 text-white flex items-center gap-1">
                <Percent className="h-3 w-3" />
                {discount.type === 'percentage' ? `${discount.value}% OFF` : `$${discount.value} OFF`}
              </Badge>
            </div>
          )}
          
          {/* Time remaining badge */}
          {hasDiscount && timeRemaining && (
            <div className="absolute top-3 right-3">
              <Badge variant="outline" className="bg-white/90 text-gray-700 flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {timeRemaining}
              </Badge>
            </div>
          )}
        </div>
        
        <div className="p-4">
          <h3 className="font-semibold text-lg mb-2 group-hover:text-pink-600 transition-colors">
            {product.name}
          </h3>
          
          {product.description && (
            <p className="text-gray-600 text-sm mb-3 line-clamp-2">
              {product.description}
            </p>
          )}
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {hasDiscount ? (
                <>
                  <span className="text-xl font-bold text-pink-600">
                    ${discountedPrice.toFixed(2)}
                  </span>
                  <span className="text-sm text-gray-500 line-through">
                    ${product.price.toFixed(2)}
                  </span>
                </>
              ) : (
                <span className="text-xl font-bold text-gray-900">
                  ${product.price.toFixed(2)}
                </span>
              )}
            </div>
            
            {product.category && (
              <Badge variant="outline" className="text-xs">
                {product.category}
              </Badge>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
