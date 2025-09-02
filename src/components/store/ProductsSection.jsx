import { Package } from "lucide-react";
import ProductCard from "../products/ProductCard";

const ProductsSection = ({ filteredProducts, selectedCategory, storeSlug }) => {
  return (
    <div>
      <div className="mb-4">
        <h2 className="text-2xl font-display font-bold">
          {selectedCategory === "All" ? "All Products" : selectedCategory}
        </h2>
        <p className="text-gray-600">
          {filteredProducts.length} {filteredProducts.length === 1 ? "product" : "products"} available
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.length > 0 ? (
          filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} storeSlug={storeSlug} />
          ))
        ) : (
          <div className="text-center py-8 col-span-full">
            <Package className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-semibold mb-2">
              {selectedCategory === "All" ? "No Products Available" : `No ${selectedCategory} Products`}
            </h3>
            <p className="text-gray-600">
              {selectedCategory === "All" 
                ? "This store doesn't have any products yet. Check back later!" 
                : `No products found in the ${selectedCategory} category.`
              }
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductsSection;