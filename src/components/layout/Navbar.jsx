
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { Menu, X, Crown, Loader } from "lucide-react";
import { useAuthStore } from "../../stores/useAuthStore";
import { useCartStore } from "../../stores/useCartStore";
import google from "../../assets/google.png";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { currentUser, logout } = useAuthStore();
  const { getTotalItems } = useCartStore();
  const navigate = useNavigate();
  const [loading, setLoading] = useState({ isLogin: null, state: null });
  const totalItems = getTotalItems();

  const handleLogout = () => {
    setLoading(true);
    logout();
    setLoading(false);
    navigate("/");
  };

  const handleGoogleLogin = () => {
    setLoading({ isLogin: true, state: true });
    window.location.href = `${import.meta.env.VITE_DEV_BACKEND_URL}/api/auth/google`;
  };

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About" },
    { to: "/pricing", label: "Pricing" },
  ];

  return (
    <header className="bg-[#0a0a0f]/95 backdrop-blur border-b border-white/[0.08] sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <img
            src="/full_logo.png"
            alt="logo"
            className="w-28 sm:w-36 md:w-40 h-auto max-w-full brightness-200"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {navLinks.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className="text-sm font-medium text-gray-400 hover:text-white transition-colors"
            >
              {label}
            </Link>
          ))}
          <Link
            to="/ai-video"
            className="text-sm flex flex-row font-medium items-center text-gray-400 hover:text-white transition-colors"
          >
            AI Model <Crown className="w-3 -mt-3 text-yellow-500 ml-0.5" />
          </Link>

          {currentUser ? (
            <>
              <Link
                to="/dashboard"
                className="text-sm font-medium text-gray-400 hover:text-white transition-colors"
              >
                Dashboard
              </Link>
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="border-white/10 text-gray-300 hover:text-white hover:bg-white/5 bg-transparent"
                disabled={loading.state}
              >
                {loading.state ? <Loader className="w-4 h-4 animate-spin" /> : "Sign Out"}
              </Button>
            </>
          ) : (
            <Button
              variant="outline"
              size="sm"
              className="border-white/10 text-gray-300 hover:text-white hover:bg-white/5 bg-transparent min-w-[140px]"
              onClick={handleGoogleLogin}
              disabled={loading.isLogin && loading.state}
            >
              {loading.isLogin && loading.state ? (
                <Loader className="animate-spin w-4 h-4" />
              ) : (
                <span className="flex items-center gap-2">
                  Sign in with <img className="w-4" src={google} alt="Google" />
                </span>
              )}
            </Button>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-400 hover:text-white transition-colors"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden py-4 px-4 bg-[#0d0d14] border-t border-white/[0.08]">
          <nav className="flex flex-col space-y-4">
            {navLinks.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className="text-sm font-medium text-gray-400 hover:text-white transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {label}
              </Link>
            ))}
            <Link
              to="/ai-video"
              className="text-sm flex flex-row font-medium items-center text-gray-400 hover:text-white transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              AI Model <Crown className="w-3 -mt-3 text-yellow-500 ml-0.5" />
            </Link>

            {currentUser ? (
              <>
                <Link
                  to="/dashboard"
                  className="text-sm font-medium text-gray-400 hover:text-white transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => { handleLogout(); setIsMenuOpen(false); }}
                  className="border-white/10 text-gray-300 bg-transparent w-fit"
                >
                  {loading.state ? <Loader className="w-4 animate-spin mx-auto" /> : "Sign Out"}
                </Button>
              </>
            ) : (
              <button
                onClick={handleGoogleLogin}
                className="flex items-center gap-2 text-sm text-gray-400"
              >
                Sign in with <img className="w-4" src={google} alt="Google" />
              </button>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
