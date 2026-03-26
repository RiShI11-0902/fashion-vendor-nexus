import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { useCartStore } from "../../stores/useCartStore";
import { Button } from "../ui/button";

const StoreNavbar = ({ store }) => {
  const { getTotalItems } = useCartStore();
  const totalItems = getTotalItems();

  return (
    <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo + Store Name */}
          <div className="flex items-center gap-3">
            {store?.logo && (
              <img
                className="rounded-full w-9 h-9 object-cover ring-2 ring-primary/40"
                src={store.logo}
                alt={`${store.name} logo`}
              />
            )}
            <span className="text-base font-semibold text-foreground truncate max-w-[200px] sm:max-w-[320px]">
              {store?.name}
            </span>
          </div>

          {/* Cart */}
          <Link to={`/${store?.slug}/cart`}>
            <Button
              variant={totalItems > 0 ? "default" : "ghost"}
              size="sm"
              className="relative gap-2"
            >
              <ShoppingCart className="h-4 w-4" />
              <span className="hidden sm:inline">Cart</span>
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-[10px] font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Button>
          </Link>
        </div>
      </div>

      {/* subtle bottom glow line */}
      <div className="h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
    </nav>
  );
};

export default StoreNavbar;
