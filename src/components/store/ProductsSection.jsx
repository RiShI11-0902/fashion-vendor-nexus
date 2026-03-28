import { useState, useMemo } from "react";
import ProductCard from "../products/ProductCard";
import { Button } from "../../components/ui/button";
import { Skeleton } from "../../components/ui/skeleton";
import { ChevronLeft, ChevronRight, Search, X } from "lucide-react";

const ProductCardSkeleton = () => (
  <div className="break-inside-avoid mb-4">
    <div className="rounded-xl overflow-hidden bg-card">
      <Skeleton className="w-full h-48" />
      <div className="p-3 space-y-2">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-1/2" />
        <Skeleton className="h-4 w-1/3" />
      </div>
    </div>
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

      {/* Products Masonry Grid */}
      <div className="columns-2 sm:columns-2 lg:columns-4 gap-4">
        {loading ? (
          Array.from({ length: 8 }).map((_, i) => <ProductCardSkeleton key={i} />)
        ) : filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} storeSlug={storeSlug} />
          ))
        ) : (
          <div className="col-span-full py-20 flex flex-col items-center gap-3 text-center">
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
      </div>

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
