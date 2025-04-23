
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { Button } from "../ui/button";
import { Menu, X, ShoppingBag, User } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="bg-white border-b sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <ShoppingBag className="h-6 w-6 text-gold mr-2" />
          <span className="font-display text-xl font-semibold">FashionVendor</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-sm font-medium hover:text-gold transition-colors">
            Home
          </Link>
          <Link to="/stores" className="text-sm font-medium hover:text-gold transition-colors">
            Explore Stores
          </Link>
          <Link to="/about" className="text-sm font-medium hover:text-gold transition-colors">
            About
          </Link>
          
          {currentUser ? (
            <>
              <Link 
                to="/dashboard" 
                className="text-sm font-medium hover:text-gold transition-colors"
              >
                Dashboard
              </Link>
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleLogout}
              >
                Sign Out
              </Button>
            </>
          ) : (
            <div className="flex items-center space-x-4">
              <Link to="/login">
                <Button variant="outline" size="sm">Sign In</Button>
              </Link>
              <Link to="/signup">
                <Button size="sm">Sign Up</Button>
              </Link>
            </div>
          )}
        </nav>
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden" 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X /> : <Menu />}
        </button>
      </div>
      
      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden py-4 px-4 bg-white border-t">
          <nav className="flex flex-col space-y-4">
            <Link 
              to="/"
              className="text-sm font-medium hover:text-gold transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/stores"
              className="text-sm font-medium hover:text-gold transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Explore Stores
            </Link>
            <Link 
              to="/about"
              className="text-sm font-medium hover:text-gold transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            
            {currentUser ? (
              <>
                <Link 
                  to="/dashboard"
                  className="text-sm font-medium hover:text-gold transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                >
                  Sign Out
                </Button>
              </>
            ) : (
              <div className="flex flex-col space-y-2">
                <Link 
                  to="/login"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Button variant="outline" size="sm" className="w-full">Sign In</Button>
                </Link>
                <Link 
                  to="/signup"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Button size="sm" className="w-full">Sign Up</Button>
                </Link>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
