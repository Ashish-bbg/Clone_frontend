import { useState } from "react";
import { useAuth } from "../context/useAuth";
import { performLogout } from "../utiles/signout";
import { useNavigate } from "react-router-dom";

export const useSignout = () => {
  const [loading, setLoading] = useState(false);
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const signout = async () => {
    try {
      setLoading(true);
      setUser(null);
      await performLogout();
      navigate("/");
    } catch (err) {
      console.error("Logout failed", err);
    } finally {
      setLoading(false);
    }
  };
  return { signout, loading };
};
