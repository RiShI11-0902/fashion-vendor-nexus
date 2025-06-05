
import { useState } from "react";
import { Link } from "react-router-dom";
import { Image, Edit, Trash2, Heart, Eye, ShoppingBag } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../../components/ui/alert-dialog";
import { useAuthStore } from "../../stores/useAuthStore";

const ProductCard = ({ product, isAdmin = false, storeSlug, layout = 'grid' }) => {
  const { deleteProduct } = useAuthStore();
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleDelete = () => {
    deleteProduct(product.id);
    setIsOpen(false);
  };

  if (layout === 'list') {
    return (
      <div className="flex bg-white rounded-lg shadow-sm border overflow-hidden hover:shadow-md transition-shadow">
        <div className="w-32 h-32 bg-gray-100 relative flex-shrink-0">
          {product.imageUrl ? (
            <img 
              src={product.imageUrl} 
              alt={product.name} 
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-400">
              <Image className="h-8 w-8" />
            </div>
          )}
        </div>
        
        <div className="p-4 flex-1 flex justify-between items-center">
          <div>
            <h3 className="font-display text-lg font-medium mb-1">{product.name}</h3>
            <p className="text-gray-600 text-sm mb-2 line-clamp-1">
              {product.description || "No description available"}
            </p>
            {product.category && (
              <Badge variant="secondary" className="text-xs">
                {product.category}
              </Badge>
            )}
          </div>
          
          <div className="text-right">
            <p className="font-bold text-xl text-gold mb-3">${product.price}</p>
            {isAdmin ? (
              <div className="flex space-x-2">
                <Button asChild variant="outline" size="sm">
                  <Link to={`/dashboard/products/edit/${product.id}`}>
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Link>
                </Button>
                
                <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive" size="sm">
                      <Trash2 className="h-4 w-4 mr-1" />
                      Delete
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This will permanently delete the product "{product.name}".
                        This action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            ) : (
              <Button asChild variant="default" size="sm" className="rounded-full">
                <Link to={`/store/${storeSlug}/product/${product.id}`}>
                  <ShoppingBag className="h-4 w-4 mr-1" />
                  View
                </Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="group relative overflow-hidden rounded-lg bg-white shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="aspect-square bg-gray-100 relative overflow-hidden">
        {product.imageUrl ? (
          <img 
            src={product.imageUrl} 
            alt={product.name} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400 bg-gradient-to-br from-gray-50 to-gray-100">
            <Image className="h-16 w-16" />
          </div>
        )}
        
        {/* Hover Overlay */}
        <div className={`absolute inset-0 bg-black bg-opacity-30 transition-opacity duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        } flex items-center justify-center`}>
          <div className="flex space-x-3">
            <div className="bg-white bg-opacity-90 rounded-full p-2 cursor-pointer hover:bg-opacity-100 transition-all">
              <Eye className="h-5 w-5 text-gray-800" />
            </div>
            <div className="bg-white bg-opacity-90 rounded-full p-2 cursor-pointer hover:bg-opacity-100 transition-all">
              <Heart className="h-5 w-5 text-gray-800" />
            </div>
          </div>
        </div>
        
        {/* Price Badge */}
        <div className="absolute top-3 left-3">
          <Badge className="bg-white/95 text-gray-900 font-bold shadow-sm">
            ${product.price}
          </Badge>
        </div>
        
        {/* Category Badge */}
        {product.category && (
          <div className="absolute top-3 right-3">
            <Badge variant="secondary" className="bg-black/70 text-white text-xs">
              {product.category}
            </Badge>
          </div>
        )}
      </div>
      
      {/* Content */}
      <div className="p-4">
        <h3 className="font-display text-lg font-semibold mb-2 line-clamp-1">
          {product.name}
        </h3>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-2 h-10">
          {product.description || "No description available"}
        </p>
        
        {/* Action Buttons */}
        {isAdmin ? (
          <div className="flex space-x-2">
            <Button asChild variant="outline" size="sm" className="flex-1 rounded-full">
              <Link to={`/dashboard/products/edit/${product.id}`}>
                <Edit className="h-4 w-4 mr-1" />
                Edit
              </Link>
            </Button>
            
            <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" size="sm" className="rounded-full">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This will permanently delete the product "{product.name}".
                    This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        ) : (
          <Button asChild className="w-full rounded-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-medium">
            <Link to={`/store/${storeSlug}/product/${product.id}`}>
              <ShoppingBag className="h-4 w-4 mr-2" />
              View Details
            </Link>
          </Button>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
