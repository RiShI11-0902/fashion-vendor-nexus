
import { useState } from "react";
import { Link } from "react-router-dom";
import { Image, Edit, Trash2 } from "lucide-react";
import { Card, CardContent, CardFooter } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
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
import { useStore } from "../../contexts/StoreContext";

const ProductCard = ({ product, isAdmin = false, storeSlug }) => {
  const { deleteProduct } = useStore();
  const [isOpen, setIsOpen] = useState(false);

  const handleDelete = () => {
    deleteProduct(product.id);
    setIsOpen(false);
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="h-48 bg-gray-100 relative">
        {product.imageUrl ? (
          <img 
            src={product.imageUrl} 
            alt={product.name} 
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400">
            <Image className="h-12 w-12" />
          </div>
        )}
      </div>
      
      <CardContent className="pt-6">
        <div className="flex justify-between items-start">
          <h3 className="font-display text-lg font-medium mb-1">{product.name}</h3>
          <p className="font-medium text-gold">${product.price}</p>
        </div>
        
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {product.description || "No description available"}
        </p>
        
        {product.category && (
          <span className="inline-block bg-gray-100 px-2 py-1 text-xs rounded-full">
            {product.category}
          </span>
        )}
      </CardContent>
      
      <CardFooter className="pt-2 pb-6 flex justify-between">
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
          <Button asChild variant="outline" size="sm">
            <Link to={`/store/${storeSlug}/product/${product.id}`}>
              View Details
            </Link>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
