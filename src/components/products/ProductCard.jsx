
import { Link } from "react-router-dom";
import { Badge } from "../ui/badge";
import { useStoreManager } from "../../stores/useStoreManager";
import { Percent, Clock, IndianRupee } from "lucide-react";
import { useAuthStore } from "../../stores/useAuthStore";
import { Button } from "../../components/ui/button";

const ProductCard = ({ product, storeSlug, className = "" }) => {
  const { getDiscountedPrice } = useStoreManager();
  const { price: discountedPrice, discount } = getDiscountedPrice(product.id, product.price);
  const { currentUser } = useAuthStore()

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
      <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 group inline-block md:w-60">
        {/* Image */}
        {/* <div className="overflow-hidden bg-emerald-700 rounded-t-lg">
          <div className="inline-block overflow-hidden rounded-xl shadow-sm group cursor-pointer transition-shadow duration-300 hover:shadow-lg">
            <img
              src={product.image}
              alt={product.name}
              className="block max-w-full max-h-[300px] object-contain transition-transform duration-500 ease-in-out hover:scale-105"
            />
          </div>

        </div> */}
        <div className="flex flex-wrap justify-center gap-6">
          <div className="overflow-hidden rounded-t-lg">
            <div className="inline-block overflow-hidden rounded-xl shadow-sm group cursor-pointer transition-shadow duration-300 hover:shadow-lg">
              <img
                src={product.image}
                alt={product.name}
                className="block max-w-full  max-h-[300px] object-contain transition-transform duration-500 ease-in-out hover:scale-105"
              />
            </div>
          </div>
          {/* Repeat for other products */}
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
          <div className="flex items-center justify-between mt-2">
            <span className="font-bold text-gray-900 text-sm flex items-center gap-1">
              <IndianRupee className="w-5" />{hasDiscount ? discountedPrice.toFixed(2) : product.price.toFixed(2)}
            </span>

            {product.category && (
              <Badge variant="outline" className="text-xs px-2 py-0.5 rounded">
                {product.category}
              </Badge>
            )}

            {
              currentUser && <Link to={`/dashboard/products/edit/${product.id}`}>
                <Button className="s" size={'sm'}>
                  Edit
                </Button>
              </Link>
            }
          </div>
        </div>
      </div>

    </Link>
  );
};

export default ProductCard;
