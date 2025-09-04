
import { Link } from "react-router-dom";
import { ShoppingBag } from "lucide-react";
import { Card, CardContent, CardFooter } from "../../components/ui/card";
import { Button } from "../../components/ui/button";

const StoreCard = ({ store }) => {  
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="h-48 bg-gray-100 relative">
        {store.banner ? (
          <img 
            src={store.banner} 
            alt={store.name} 
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400">
            <ShoppingBag className="h-12 w-12" />
          </div>
        )}
      </div>
      
      <CardContent className="pt-6">
        <h3 className="font-display text-lg font-medium mb-2">{store.name}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {store.description || "No description available"}
        </p>
        
        <div className="flex flex-wrap gap-2">
          {store.categories && store.categories.map((category, index) => (
            <span 
              key={index}
              className="inline-block bg-gray-100 px-2 py-1 text-xs rounded-full"
            >
              {category}
            </span>
          ))}
        </div>
      </CardContent>
      
      <CardFooter className="pt-2 pb-6 flex justify-between cursor-pointer">
        <Button asChild variant="outline" size="sm" className="cursor-pointer">
          <Link to={`/store/${store.slug}`}>
            Visit Store
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default StoreCard;
