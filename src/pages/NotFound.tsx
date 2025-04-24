
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import MainLayout from "@/components/layout/MainLayout";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-24 text-center">
        <div className="max-w-md mx-auto">
          <h1 className="text-6xl font-display font-bold text-primary mb-6">404</h1>
          <p className="text-xl text-gray-600 mb-8">
            The page you are looking for doesn't exist or has been moved.
          </p>
          <div className="space-y-4">
            <Button asChild size="lg">
              <Link to="/">Return to Home</Link>
            </Button>
            <div className="pt-2">
              <Button asChild variant="outline">
                <Link to="/stores">Browse Stores</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default NotFound;
