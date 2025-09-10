
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { Menu, X, ShoppingBag, User, ShoppingCart, Crown } from "lucide-react";
import { useAuthStore } from "../../stores/useAuthStore";
import { useCartStore } from "../../stores/useCartStore";
import google from "../../assets/google.png";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { currentUser, logout } = useAuthStore();
  const { getTotalItems } = useCartStore();
  const navigate = useNavigate();
  const totalItems = getTotalItems();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:5000/api/auth/google";
  };
  return (
    <header className="bg-white border-b sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <img
            src="/full_logo.png"
            alt="logo"
            className="w-28 sm:w-36 md:w-48 lg:w-48 h-auto max-w-full"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-sm font-medium hover:text-purple-600 transition-colors">
            Home
          </Link>
          <Link to="/about" className="text-sm font-medium hover:text-purple-600 transition-colors">
            About
          </Link>
          <Link to="/ai-video" className="text-sm flex flex-row font-medium items-center hover:text-purple-600 transition-colors">
            Ai Model <Crown className="w-3 -mt-3 text-yellow-500" />
          </Link>
          <Link to="/pricing" className="text-sm font-medium hover:text-purple-600 transition-colors">
            Pricing
          </Link>

          {/* Cart Icon - Only show if there are items */}
          {totalItems > 0 && (
            <Link to="/cart" className="relative">
              <ShoppingCart className="h-6 w-6 text-gray-700 hover:text-purple-600 transition-colors" />
              <span className="absolute -top-2 -right-2 bg-gold text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {totalItems}
              </span>
            </Link>
          )}

          {currentUser ? (
            <>
              <Link
                to="/dashboard"
                className="text-sm font-medium hover:text-purple-600 transition-colors"
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
              <Button variant="outline" size="sm" onClick={handleGoogleLogin}>
                Sign in with
                <img className="w-5" src={google} alt="" srcset="" />
              </Button>
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
              className="text-sm font-medium hover:text-purple-600 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/about"
              className="text-sm font-medium hover:text-purple-600 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link to="/ai-video" className="text-sm flex flex-row font-medium items-center hover:text-purple-600 transition-colors">
              Ai Model <Crown className="w-3 -mt-3 text-yellow-500" />
            </Link>
            <Link
              to="/pricing"
              className="text-sm font-medium hover:text-purple-600 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Pricing
            </Link>

            {/* Mobile Cart Link - Only show if there are items */}
            {totalItems > 0 && (
              <Link
                to="/cart"
                className="flex items-center text-sm font-medium hover:text-purple-600 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <ShoppingCart className="h-4 w-4 mr-2" />
                Cart ({totalItems})
              </Link>
            )}

            {currentUser ? (
              <>
                <Link
                  to="/dashboard"
                  className="text-sm font-medium hover:text-purple-600 transition-colors"
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
