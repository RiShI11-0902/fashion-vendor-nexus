import { useState } from "react";
import { Link } from "react-router-dom";
import { Badge } from "../ui/badge";
import { useStoreManager } from "../../stores/useStoreManager";
import { IndianRupee, QrCode } from "lucide-react";
import { useAuthStore } from "../../stores/useAuthStore";
import { Button } from "../../components/ui/button";
import QRCodeModal from "./QRCodeModal";

const ProductCard = ({ product, storeSlug, storeLogo, className = "" }) => {
  const { getDiscountedPrice } = useStoreManager();
  const { price: discountedPrice, discount } = getDiscountedPrice(product.id, product.price);
  const { currentUser } = useAuthStore();
  const { getUserStores } = useStoreManager();
  const store = getUserStores(currentUser?.id);
  const [showQR, setShowQR] = useState(false);

  const hasDiscount = discount && discountedPrice < product.price;

  return (
    <>
      <Link
        to={`/store/${storeSlug}/product/${product.id}`}
        className={`block group break-inside-avoid mb-4 ${className}`}
      >
        <div className="bg-card rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/10">
          {/* Image */}
          <div className="overflow-hidden relative">
            <img
              src={product.image}
              alt={product.name}
              className="w-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
            />
            {hasDiscount && (
              <span className="absolute top-2 left-2 bg-primary text-primary-foreground text-[10px] font-bold px-2 py-0.5 rounded-full">
                SALE
              </span>
            )}
          </div>

          {/* Text */}
          <div className="p-3">
            <h3 className="font-semibold text-foreground text-sm line-clamp-2 leading-snug">
              {product.name}
            </h3>

            {product.description && (
              <p className="text-muted-foreground text-xs mt-1 line-clamp-2 leading-relaxed">
                {product.description}
              </p>
            )}

            {/* Price row */}
            <div className="flex items-center justify-between mt-3 gap-1">
              <div className="flex items-baseline gap-1.5 flex-wrap">
                <span className="font-bold text-foreground text-sm flex items-center gap-0.5">
                  <IndianRupee className="w-3 h-3" />
                  {hasDiscount ? discountedPrice.toFixed(2) : product.price.toFixed(2)}
                </span>
                {hasDiscount && (
                  <span className="text-muted-foreground text-xs line-through flex items-center gap-0.5">
                    <IndianRupee className="w-2.5 h-2.5" />
                    {product.price.toFixed(2)}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-1">
                {product.category && (
                  <Badge variant="secondary" className="text-[10px] px-1.5 py-0 font-normal hidden sm:flex">
                    {product.category}
                  </Badge>
                )}

                {/* QR Code button */}
                <button
                  className="h-6 w-6 flex items-center justify-center rounded-md text-muted-foreground hover:text-primary hover:bg-accent transition-colors"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setShowQR(true);
                  }}
                  title="Generate QR Code"
                >
                  <QrCode className="w-3.5 h-3.5" />
                </button>

                {currentUser && store?.id === product?.storeId && (
                  <Link
                    to={`/dashboard/products/edit/${product.id}`}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Button size="sm" variant="ghost" className="h-6 px-2 text-xs">
                      Edit
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </Link>

      <QRCodeModal
        open={showQR}
        onClose={() => setShowQR(false)}
        product={product}
        storeSlug={storeSlug}
        storeLogo={storeLogo}
      />
    </>
  );
};

export default ProductCard;
