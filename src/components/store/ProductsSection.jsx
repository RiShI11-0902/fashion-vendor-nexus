import { useState, useMemo } from "react";
import ProductCard from "../products/ProductCard";
import { Button } from "../../components/ui/button";
import { Skeleton } from "../../components/ui/skeleton";
import { ChevronLeft, ChevronRight, Search, X, TrendingUp, Award } from "lucide-react";

const ProductCardSkeleton = () => (
  <div className="rounded-xl overflow-hidden bg-card">
    <Skeleton className="w-full aspect-square" />
    <div className="p-3 space-y-2">
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-3 w-1/2" />
      <Skeleton className="h-4 w-1/3" />
    </div>
  </div>
);

const SectionHeader = ({ icon: Icon, title, color, count }) => (
  <div className="flex items-center gap-2 mb-4">
    <div className={`p-1.5 rounded-lg ${color}`}>
      <Icon className="w-4 h-4 text-white" />
    </div>
    <h3 className="text-lg font-bold text-foreground">{title}</h3>
    <span className="text-xs text-muted-foreground">({count})</span>
  </div>
);

const ProductGrid = ({ products, storeSlug }) => (
  <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
    {products.map((product) => (
      <ProductCard key={product.id} product={product} storeSlug={storeSlug} />
    ))}
  </div>
);

const ProductsSection = ({
  filteredProducts,
  selectedCategory,
  storeSlug,
  categories,
  handleCategorySelect,
  page,
  setPage,
  total,
  loading,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const totalPages = Math.ceil(total / 10);

  const displayedProducts = useMemo(() => {
    if (!searchQuery.trim()) return filteredProducts;
    const q = searchQuery.toLowerCase();
    return filteredProducts.filter(
      (p) =>
        p.name?.toLowerCase().includes(q) ||
        p.description?.toLowerCase().includes(q)
    );
  }, [filteredProducts, searchQuery]);

  const { trending, bestSellers, normal } = useMemo(() => {
    const trending = [];
    const bestSellers = [];
    const normal = [];
    const trendingIds = new Set();
    const bestSellerIds = new Set();

    for (const p of displayedProducts) {
      if (p.tags?.includes("trending") && trending.length < 5) {
        trending.push(p);
        trendingIds.add(p.id);
      }
      if (p.tags?.includes("best-seller") && bestSellers.length < 5) {
        bestSellers.push(p);
        bestSellerIds.add(p.id);
      }
    }

    for (const p of displayedProducts) {
      if (!trendingIds.has(p.id) && !bestSellerIds.has(p.id)) {
        normal.push(p);
      }
    }

    return { trending, bestSellers, normal };
  }, [displayedProducts]);

  return (
    <div className="flex flex-col gap-6">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-10 py-2.5 rounded-full bg-muted/50 text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => handleCategorySelect("All")}
          className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
            selectedCategory === "All"
              ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
              : "bg-muted text-muted-foreground hover:bg-accent hover:text-foreground"
          }`}
        >
          All
        </button>
        {categories?.map((cat, idx) => (
          <button
            key={idx}
            onClick={() => handleCategorySelect(cat)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
              selectedCategory === cat
                ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                : "bg-muted text-muted-foreground hover:bg-accent hover:text-foreground"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Section header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">
            {selectedCategory === "All" ? "All Products" : selectedCategory}
          </h2>
          <p className="text-muted-foreground text-sm mt-0.5">
            {total} {total === 1 ? "product" : "products"} available
          </p>
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      ) : displayedProducts.length > 0 ? (
        <div className="space-y-10">
          {/* Trending Section */}
          {trending.length > 0 && (
            <div>
              <SectionHeader
                icon={TrendingUp}
                title="Trending Now"
                color="bg-orange-500"
                count={trending.length}
              />
              <ProductGrid products={trending} storeSlug={storeSlug} />
            </div>
          )}

          {/* Best Sellers Section */}
          {bestSellers.length > 0 && (
            <div>
              <SectionHeader
                icon={Award}
                title="Best Sellers"
                color="bg-yellow-500"
                count={bestSellers.length}
              />
              <ProductGrid products={bestSellers} storeSlug={storeSlug} />
            </div>
          )}

          {/* Normal Products */}
          {normal.length > 0 && (
            <div>
              {(trending.length > 0 || bestSellers.length > 0) && (
                <div className="flex items-center gap-2 mb-4">
                  <h3 className="text-lg font-bold text-foreground">All Products</h3>
                  <span className="text-xs text-muted-foreground">({normal.length})</span>
                </div>
              )}
              <ProductGrid products={normal} storeSlug={storeSlug} />
            </div>
          )}
        </div>
      ) : (
        <div className="py-20 flex flex-col items-center gap-3 text-center">
          <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center text-3xl">
            📦
          </div>
          <p className="text-muted-foreground">
            {selectedCategory === "All"
              ? "This store doesn't have any products yet."
              : `No products found in "${selectedCategory}".`}
          </p>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-4 pt-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setPage(page - 1)}
            disabled={page === 1}
            className="gap-1"
          >
            <ChevronLeft className="h-4 w-4" />
            Prev
          </Button>
          <span className="text-sm text-muted-foreground">
            Page <span className="text-foreground font-medium">{page}</span> of {totalPages}
          </span>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setPage(page + 1)}
            disabled={page >= totalPages}
            className="gap-1"
          >
            Next
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default ProductsSection;
