
import { useState } from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../ui/carousel";
import { Badge } from "../ui/badge";

const StoreStories = ({ categories, selectedCategory, onCategorySelect, products }) => {
  // Get product count per category
  const getCategoryCount = (category) => {
    return products.filter(product => product.category === category).length;
  };

  // Add "All" category at the beginning
  const allCategories = ["All", ...categories];

  return (
    <div className="py-6">
      <h3 className="text-lg font-semibold mb-4">Categories</h3>
      <Carousel
        opts={{
          align: "start",
          slidesToScroll: 1,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {allCategories.map((category) => {
            const isSelected = selectedCategory === category;
            const count = category === "All" ? products.length : getCategoryCount(category);
            
            return (
              <CarouselItem key={category} className="pl-2 md:pl-4 basis-auto">
                <div
                  onClick={() => onCategorySelect(category)}
                  className={`cursor-pointer group transition-all duration-300 ${
                    isSelected ? "scale-105" : "hover:scale-105"
                  }`}
                >
                  <div
                    className={`w-20 h-20 rounded-full flex items-center justify-center text-white font-bold text-lg transition-all duration-300 ${
                      isSelected
                        ? "bg-gradient-to-br from-pink-500 to-purple-600 ring-4 ring-pink-200"
                        : "bg-gradient-to-br from-gray-400 to-gray-500 group-hover:from-pink-400 group-hover:to-purple-500"
                    }`}
                  >
                    {category.charAt(0).toUpperCase()}
                  </div>
                  <div className="text-center mt-2">
                    <p className={`text-sm font-medium truncate ${isSelected ? "text-pink-600" : "text-gray-700"}`}>
                      {category}
                    </p>
                    <Badge variant="outline" className="text-xs mt-1">
                      {count}
                    </Badge>
                  </div>
                </div>
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselPrevious className="hidden md:flex" />
        <CarouselNext className="hidden md:flex" />
      </Carousel>
    </div>
  );
};

export default StoreStories;
