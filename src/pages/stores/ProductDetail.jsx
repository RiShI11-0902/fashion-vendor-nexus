
import { useState, useEffect, useMemo } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useStoreManager } from "../../stores/useStoreManager";
import { useCartStore } from "../../stores/useCartStore";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import {
  ArrowLeft,
  ShoppingBag,
  Package,
  Plus,
  Minus,
  IndianRupee,
  Truck,
  Shield,
  RotateCcw,
  Star,
} from "lucide-react";
import { toast } from "sonner";
import {
  productDetailCache,
  storeSlugCache,
  productsCache,
} from "../../lib/storeCache";
import ProductCard from "../../components/products/ProductCard";

const ProductDetail = () => {
  const { storeSlug, productId } = useParams();
  const { getStoreBySlug, getProductById, getStoreProducts, getDiscountedPrice } =
    useStoreManager();
  const { addToCart, items } = useCartStore();
  const [product, setProduct] = useState(
    () => productDetailCache.get(productId) || null
  );
  const [store, setStore] = useState(
    () => storeSlugCache.get(storeSlug)?.store || null
  );
  const [loading, setLoading] = useState(
    !(productDetailCache.has(productId) && storeSlugCache.has(storeSlug))
  );
  const [error, setError] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [selectSize, setselectSize] = useState(null);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [selectedImage, setSelectedImage] = useState(0);
  const navigate = useNavigate();

  const existingCartItem = items.find((item) => item.productId === productId);

  const fetchStoreAndProduct = async () => {
    if (storeSlugCache.has(storeSlug) && productDetailCache.has(productId)) {
      setStore(storeSlugCache.get(storeSlug)?.store);
      setProduct(productDetailCache.get(productId));
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const [foundStore, foundProduct] = await Promise.all([
        storeSlugCache.has(storeSlug)
          ? Promise.resolve(storeSlugCache.get(storeSlug)?.store)
          : getStoreBySlug(storeSlug),
        productDetailCache.has(productId)
          ? Promise.resolve(productDetailCache.get(productId))
          : getProductById(productId),
      ]);

      if (foundStore) {
        if (!storeSlugCache.has(storeSlug)) {
          storeSlugCache.set(storeSlug, { store: foundStore, feedbacks: [] });
        }
        setStore(foundStore);
      } else {
        setError("Store not found");
        setLoading(false);
        return;
      }

      if (foundProduct) {
        productDetailCache.set(productId, foundProduct);
        setProduct(foundProduct);
      } else {
        setError("Product not found");
      }
    } catch (err) {
      console.error(err);
      setError("Failed to load product");
    } finally {
      setLoading(false);
    }
  };

  // Fetch similar products from same store/category
  const fetchSimilarProducts = async (currentProduct, storeData) => {
    if (!currentProduct || !storeData) return;
    try {
      const cacheKey = `${storeData.id}-1-${currentProduct.category || "All"}`;
      let storeProducts;

      if (productsCache.has(cacheKey)) {
        storeProducts = productsCache.get(cacheKey).products;
      } else {
        const result = await getStoreProducts(
          storeData.id,
          1,
          currentProduct.category || null
        );
        storeProducts = result.products;
      }

      // Filter out current product, pick up to 4
      const similar = (storeProducts || [])
        .filter((p) => p.id !== currentProduct.id)
        .slice(0, 4);
      setSimilarProducts(similar);
    } catch (err) {
      console.error("Failed to fetch similar products", err);
    }
  };

  useEffect(() => {
    if (storeSlug && productId) {
      fetchStoreAndProduct();
    }
  }, [storeSlug, productId]);

  useEffect(() => {
    if (product && store) {
      fetchSimilarProducts(product, store);
    }
  }, [product, store]);

  // Reset state when product changes
  useEffect(() => {
    setQuantity(1);
    setselectSize(null);
    setSelectedImage(0);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [productId]);

  const discountInfo = product
    ? getDiscountedPrice(product.id, product.price)
    : { price: 0, discount: null };
  const hasDiscount =
    discountInfo.discount && discountInfo.price < (product?.price || 0);

  const handleAddToCart = () => {
    if (!product.inventory || product.inventory <= 0) {
      toast.error("Product is out of stock");
      return;
    }
    const currentCartQuantity = existingCartItem
      ? existingCartItem.quantity
      : 0;
    if (currentCartQuantity + quantity > product.inventory) {
      toast.error(`Only ${product.inventory} items available in stock`);
      return;
    }
    if (product.sizes?.length > 0 && selectSize == null) {
      toast.error("Please select a size");
      return;
    }
    for (let i = 0; i < quantity; i++) {
      product.size = selectSize;
      addToCart(product, store);
    }
    setQuantity(1);
  };

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity >= 1 && newQuantity <= (product?.inventory || 0)) {
      setQuantity(newQuantity);
    }
  };

  const isOutOfStock = !product?.inventory || product.inventory <= 0;
  const maxAvailable = product?.inventory || 0;
  const currentCartQuantity = existingCartItem ? existingCartItem.quantity : 0;
  const remainingStock = maxAvailable - currentCartQuantity;

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error || !store || !product) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Package className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
          <h2 className="text-2xl font-display font-semibold text-foreground mb-2">
            Product Not Found
          </h2>
          <p className="text-muted-foreground mb-6">
            The product you're looking for doesn't exist or might have been
            removed.
          </p>
          <Button asChild>
            <Link to={`/store/${storeSlug}`}>Back to Store</Link>
          </Button>
        </div>
      </div>
    );
  }

  const productImages = product.image ? [product.image] : [];

  return (
    <div className="min-h-screen bg-background">
      {/* Top Bar */}
      <div className="sticky top-0 z-30 bg-background/80 backdrop-blur-xl">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate(`/store/${storeSlug}`)}
            className="text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to {store.name}
          </Button>

          <Link
            to={`/store/${storeSlug}`}
            className="flex items-center gap-2"
          >
            {store.logo && (
              <img
                src={store.logo}
                alt={store.name}
                className="h-7 w-7 rounded-full object-cover"
              />
            )}
            <span className="text-sm font-medium text-foreground hidden sm:inline">
              {store.name}
            </span>
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Image Section */}
          <div className="space-y-4">
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-card group">
              {productImages.length > 0 ? (
                <img
                  src={productImages[selectedImage]}
                  alt={product.name}
                  className="w-full h-full object-contain p-4 transition-transform duration-500 group-hover:scale-105"
                />
              ) : (
                <div className="flex items-center justify-center h-full text-muted-foreground">
                  <Package className="h-24 w-24" />
                </div>
              )}

              {/* Badges overlay */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {hasDiscount && (
                  <span className="bg-primary text-primary-foreground text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                    {discountInfo.discount.type === "percentage"
                      ? `${discountInfo.discount.value}% OFF`
                      : `₹${discountInfo.discount.value} OFF`}
                  </span>
                )}
                {isOutOfStock && (
                  <span className="bg-destructive text-destructive-foreground text-xs font-bold px-3 py-1.5 rounded-full">
                    OUT OF STOCK
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Product Info */}
          <div className="flex flex-col">
            {/* Category */}
            {product.category && (
              <Badge
                variant="secondary"
                className="w-fit mb-3 text-xs tracking-wider uppercase"
              >
                {product.category}
              </Badge>
            )}

            {/* Title */}
            <h1 className="text-3xl lg:text-4xl font-display font-bold text-foreground leading-tight mb-4">
              {product.name}
            </h1>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-3xl font-bold text-foreground flex items-center">
                <IndianRupee className="w-6 h-6" />
                {hasDiscount
                  ? discountInfo.price.toFixed(2)
                  : product.price.toFixed(2)}
              </span>
              {hasDiscount && (
                <span className="text-lg text-muted-foreground line-through flex items-center">
                  <IndianRupee className="w-4 h-4" />
                  {product.price.toFixed(2)}
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-muted-foreground leading-relaxed mb-8">
              {product.description || "No description available."}
            </p>

            {/* Sizes */}
            {product.sizes?.length > 0 && (
              <div className="mb-8">
                <p className="text-sm font-medium text-foreground mb-3">
                  Select Size
                </p>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setselectSize(size)}
                      className={`min-w-[3rem] h-11 px-4 flex items-center justify-center rounded-xl text-sm font-medium transition-all duration-200 ${
                        selectSize === size
                          ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30"
                          : "bg-secondary text-secondary-foreground hover:bg-accent"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Availability */}
            <div className="flex items-center gap-2 mb-6">
              <div
                className={`w-2 h-2 rounded-full ${
                  isOutOfStock ? "bg-destructive" : "bg-green-500"
                }`}
              />
              <span
                className={`text-sm font-medium ${
                  isOutOfStock ? "text-destructive" : "text-green-500"
                }`}
              >
                {isOutOfStock
                  ? "Out of Stock"
                  : `In Stock · ${remainingStock} available`}
              </span>
              {existingCartItem && (
                <span className="text-xs text-primary ml-2">
                  ({existingCartItem.quantity} in cart)
                </span>
              )}
            </div>

            {/* Quantity & Add to Cart */}
            {!isOutOfStock && remainingStock > 0 && (
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-4">
                  <span className="text-sm font-medium text-foreground">
                    Qty
                  </span>
                  <div className="flex items-center bg-secondary rounded-xl overflow-hidden">
                    <button
                      onClick={() => handleQuantityChange(quantity - 1)}
                      disabled={quantity <= 1}
                      className="h-11 w-11 flex items-center justify-center text-foreground hover:bg-accent transition-colors disabled:opacity-30"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="w-12 text-center font-medium text-foreground">
                      {quantity}
                    </span>
                    <button
                      onClick={() => handleQuantityChange(quantity + 1)}
                      disabled={quantity >= remainingStock}
                      className="h-11 w-11 flex items-center justify-center text-foreground hover:bg-accent transition-colors disabled:opacity-30"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    size="lg"
                    className="flex-1 h-13 text-base font-semibold rounded-xl shadow-lg shadow-primary/20"
                    onClick={handleAddToCart}
                  >
                    <ShoppingBag className="mr-2 h-5 w-5" />
                    Add {quantity > 1 ? `${quantity} Items` : ""} to Cart
                  </Button>
                  <Button
                    variant="secondary"
                    size="lg"
                    className="flex-1 h-13 text-base rounded-xl"
                    onClick={() => navigate(`/store/${storeSlug}`)}
                  >
                    Continue Shopping
                  </Button>
                </div>
              </div>
            )}

            {isOutOfStock && (
              <Button
                size="lg"
                disabled
                className="w-full h-13 text-base rounded-xl mb-8"
              >
                Out of Stock
              </Button>
            )}

            {/* Trust badges */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { icon: Truck, label: "Fast Delivery" },
                { icon: Shield, label: "Secure Payment" },
                { icon: RotateCcw, label: "Easy Returns" },
              ].map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="flex flex-col items-center gap-2 p-3 rounded-xl bg-secondary/50 text-center"
                >
                  <Icon className="h-4 w-4 text-primary" />
                  <span className="text-[11px] text-muted-foreground font-medium">
                    {label}
                  </span>
                </div>
              ))}
            </div>

            {/* Store info */}
            <div className="mt-8 pt-6">
              <Link
                to={`/store/${storeSlug}`}
                className="flex items-center gap-4 p-4 rounded-xl bg-card hover:bg-accent/50 transition-colors"
              >
                {store.logo ? (
                  <img
                    src={store.logo}
                    alt={store.name}
                    className="h-12 w-12 rounded-full object-cover ring-2 ring-primary/20"
                  />
                ) : (
                  <div className="h-12 w-12 rounded-full bg-secondary flex items-center justify-center">
                    <ShoppingBag className="h-5 w-5 text-muted-foreground" />
                  </div>
                )}
                <div>
                  <p className="font-semibold text-foreground">{store.name}</p>
                  <p className="text-xs text-primary">Visit Store →</p>
                </div>
              </Link>
            </div>
          </div>
        </div>

        {/* Similar Products */}
        {similarProducts.length > 0 && (
          <div className="mt-16 lg:mt-24">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-display font-bold text-foreground">
                  You May Also Like
                </h2>
                <p className="text-muted-foreground text-sm mt-1">
                  Similar products from {store.name}
                </p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="text-primary"
                onClick={() => navigate(`/store/${storeSlug}`)}
              >
                View All →
              </Button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {similarProducts.map((p) => (
                <ProductCard
                  key={p.id}
                  product={p}
                  storeSlug={storeSlug}
                  storeLogo={store.logo}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
