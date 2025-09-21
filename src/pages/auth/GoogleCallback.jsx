import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../stores/useAuthStore";

const GoogleCallback = () => {
  const { checkAuth } = useAuthStore();
  const urlParams = new URLSearchParams(window.location.search);
  const token = urlParams.get("token");

  // store it (e.g., localStorage or memory)
  localStorage.setItem("token", token);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      await checkAuth(); // calls backend /api/auth/check and sets currentUser
      navigate("/dashboard"); // if checkAuth fails, your Zustand sets currentUser = null
    };
    fetchUser();
  }, [checkAuth, navigate]);

  return <div>Loading...</div>;
}

export default GoogleCallback