import { useEffect, useState } from "react";
import { getUserProfile } from "../api/registerApi";
import { AuthContext } from "./AuthContext";
import { useQuery } from "@tanstack/react-query";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const { data, isLoading, isError } = useQuery({
    queryKey: ["authUser"],
    queryFn: getUserProfile,
    retry: false,
  });

  useEffect(() => {
    if (data) setUser(data);
    else if (isError) setUser(null);
  }, [data, isError]);

  return (
    <AuthContext.Provider value={{ user, setUser, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
