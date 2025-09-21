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
  setCurrentUser: (user: User | null) => void;
  isAuthenticated: boolean;
  checkAuth: () => Promise<void>;
}
const API_URL = import.meta.env.VITE_DEV_BACKEND_URL;

export const useAuthStore = create<AuthState>((set) => ({
  currentUser: null,
  loading: true,
  isAuthenticated: false,

  setCurrentUser: (user: User | null) => set({ currentUser: user }),

  checkAuth: async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(`${API_URL}/api/auth/check`, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`, // middleware reads this
        },
      });
      const user = res.data.user; // make sure backend sends this
      if (user) {
        set({ currentUser: user, isAuthenticated: true, loading: false });
        localStorage.setItem("user", JSON.stringify(user));
      } else {
        set({ currentUser: null, isAuthenticated: false, loading: false });
      }
    } catch (err) {
      console.error("checkAuth failed", err);
      set({ currentUser: null, isAuthenticated: false, loading: false });
    }
  },

  signup: async (email: string, password: string, name: string) => {
    try {
      const res = await axios.post(
        `${API_URL}/api/auth/register`,
        { email, password, name },
        {
          withCredentials: true, // if using cookies for auth
        }
      );
      const user = res.data.user;
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", res.data.token);

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
        `${API_URL}/api/auth/login`,
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
      localStorage.setItem("token", res.data.token);
      set({ currentUser: user });
      toast.success("Logged in successfully");
      return user;
    } catch (error) {
      toast.error("Failed to log in");
      throw error;
    }
  },

  logout: async () => {
    try {
      await axios.post(`${API_URL}/api/auth/logout`, {
        withCredentials: true, // if using cookies for auth
      });
      localStorage.removeItem("user");
      localStorage.removeItem("store-manager");
      localStorage.removeItem("token");
      set({ currentUser: null });
      toast.success("Logged out successfully");
    } catch (error) {
      toast.error("Error Ocuured");
    }
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
