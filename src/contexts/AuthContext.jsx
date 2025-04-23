
import { createContext, useContext, useState, useEffect } from "react";
import { toast } from "sonner";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in from localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // Sign up function
  const signup = async (email, password, name) => {
    try {
      // This would connect to a real backend in production
      const user = { id: Date.now().toString(), email, name, role: "vendor" };
      localStorage.setItem("user", JSON.stringify(user));
      setCurrentUser(user);
      return user;
    } catch (error) {
      toast.error("Failed to create an account");
      throw error;
    }
  };

  // Sign in function
  const login = async (email, password) => {
    try {
      // Mock authentication - would call API in real app
      // For demo purposes, allowing any credentials to work
      const user = { id: Date.now().toString(), email, name: email.split("@")[0], role: "vendor" };
      localStorage.setItem("user", JSON.stringify(user));
      setCurrentUser(user);
      toast.success("Logged in successfully");
      return user;
    } catch (error) {
      toast.error("Failed to log in");
      throw error;
    }
  };

  // Sign out function
  const logout = () => {
    localStorage.removeItem("user");
    setCurrentUser(null);
    toast.success("Logged out successfully");
  };

  const value = {
    currentUser,
    signup,
    login,
    logout,
    loading
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
