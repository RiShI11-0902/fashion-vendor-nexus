import { create } from "zustand";
import { toast } from "sonner";
import axios from "axios";
interface User {
  id: string;
  email: string;
  name: string;
  role?: string;
}

interface AuthState {
  currentUser: User | null;
  loading: boolean;
  signup: (email: string, password: string, name: string) => Promise<User>;
  login: (email: string, password: string) => Promise<User>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  currentUser: null,
  loading: true,

  signup: async (email: string, password: string, name: string) => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/register",
        { email, password, name },
        {
          withCredentials: true, // if using cookies for auth
        }
      );
      const user = res.data.user;
      localStorage.setItem("user", JSON.stringify(user));
      set({ currentUser: user });
      return user;
    } catch (error) {
      toast.error("Failed to create an account");
      throw error;
    }
  },

  login: async (email: string, password: string) => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email,
          password,
        },
        {
          withCredentials: true, // if using cookies for auth
        }
      );
      const user = res.data.user;
      localStorage.setItem("user", JSON.stringify(user));
      set({ currentUser: user });
      toast.success("Logged in successfully");
      return user;
    } catch (error) {
      // Fallback for development when backend is not running
      // if (error.code === "ERR_NETWORK") {
      //   console.warn("Backend not running, using mock authentication");
      //   const user = {
      //     id: Date.now().toString(),
      //     email,
      //     name: email.split("@")[0],
      //     role: "vendor"
      //   };
      //   localStorage.setItem("user", JSON.stringify(user));
      //   set({ currentUser: user });
      //   toast.success("Logged in successfully (mock mode)");
      //   return user;
      // }
      toast.error("Failed to log in");
      throw error;
    }
  },

  logout: () => {
    localStorage.removeItem("user");
    set({ currentUser: null });
    toast.success("Logged out successfully");
  },
}));

// Initialize auth state from localStorage
const initializeAuth = async () => {
  const storedUser = localStorage.getItem("user");
  if (storedUser) {
    useAuthStore.setState({
      currentUser: JSON.parse(storedUser),
      loading: false,
    });
  } else {
    useAuthStore.setState({ loading: false });
  }
};

initializeAuth();
