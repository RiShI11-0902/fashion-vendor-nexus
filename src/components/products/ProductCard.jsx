
import { Link } from "react-router-dom";
import { Badge } from "../ui/badge";
import { useStoreManager } from "../../stores/useStoreManager";
import { IndianRupee } from "lucide-react";
import { useAuthStore } from "../../stores/useAuthStore";
import { Button } from "../../components/ui/button";

const ProductCard = ({ product, storeSlug, className = "" }) => {
  const { getDiscountedPrice } = useStoreManager();
  const { price: discountedPrice, discount } = getDiscountedPrice(product.id, product.price);
  const { currentUser } = useAuthStore();

  const hasDiscount = discount && discountedPrice < product.price;

  return (
    <Link
      to={`/store/${storeSlug}/product/${product.id}`}
      className={`block group break-inside-avoid mb-4 ${className}`}
    >
      <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
        {/* Image */}
        <div className="overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full object-cover transition-transform duration-500 ease-in-out hover:scale-105"
          />
        </div>

        {/* Text */}
        <div className="p-3">
          <h3 className="font-semibold text-gray-900 text-sm line-clamp-2">
            {product.name}
          </h3>

          {product.description && (
            <p className="text-gray-600 text-xs mt-1 line-clamp-2">
              {product.description}
            </p>
          )}

          {/* Price & Category */}
          <div className="flex flex-col sm:flex-col md:flex-row items-start md:items-center justify-between mt-2 gap-2">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-5">
              <p className="font-bold text-gray-900 text-sm flex items-center gap-1">
                <IndianRupee className="w-4" />
                {hasDiscount ? discountedPrice.toFixed(2) : product.price.toFixed(2)}
              </p>

              {product.category && (
                <Badge variant="outline" className="text-xs px-2 py-0.5 rounded">
                  {product.category}
                </Badge>
              )}
            </div>

            {currentUser && (
              <Link to={`/dashboard/products/edit/${product.id}`}>
                <Button size="sm">Edit</Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;