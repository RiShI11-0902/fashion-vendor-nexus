import { Link } from "react-router-dom";
import { ShoppingCart, ArrowLeft } from "lucide-react";
import { useCartStore } from "../../stores/useCartStore";
import { Button } from "../ui/button";

const StoreNavbar = ({ store }) => {
    const { getTotalItems } = useCartStore();
    const totalItems = getTotalItems();
    
    return (
        <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Left: Back Button + Logo + Store Name */}
                    <div className="flex items-center gap-4">
                        {/* <Button 
                            asChild 
                            variant="ghost" 
                            size="sm" 
                            className="text-muted-foreground hover:text-foreground"
                        >
                            <Link to="/stores" className="flex items-center gap-2">
                                <ArrowLeft className="h-4 w-4" />
                                <span className="hidden sm:inline">Back</span>
                            </Link>
                        </Button> */}
                        
                        <div className="flex items-center gap-3">
                            {store?.logo && (
                                <img
                                    className="rounded-full w-10 h-10 object-cover border-2 border-border"
                                    src={store.logo}
                                    alt={`${store.name} logo`}
                                />
                            )}
                            <div>
                                <h1 className="text-lg font-semibold text-foreground truncate max-w-[200px] sm:max-w-[300px]">
                                    {store?.name}
                                </h1>
                                {store?.description && (
                                    <p className="text-sm text-muted-foreground truncate max-w-[200px] sm:max-w-[300px] hidden sm:block">
                                        {store.description}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Right: Cart */}
                    <div className="flex items-center">
                        <Button 
                            asChild 
                            variant={totalItems > 0 ? "default" : "ghost"} 
                            size="sm"
                            className="relative"
                        >
                            <Link to={`/${store?.slug}/cart`} className="flex items-center gap-2">
                                <ShoppingCart className="h-5 w-5" />
                                <span className="hidden sm:inline">
                                    Cart
                                </span>
                                {totalItems > 0 && (
                                    <span className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground text-xs font-medium rounded-full h-5 w-5 flex items-center justify-center min-w-5">
                                        {totalItems}
                                    </span>
                                )}
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default StoreNavbar;
