// import { useEffect, useState } from "react";
import { useEffect, useState } from "react";
import { getUserProfile } from "../api/registerApi";
import { AuthContext } from "./AuthContext";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export const AuthProvider = ({ children }) => {
  const queryClient = useQueryClient();
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => localStorage.getItem("is_logged_in") === "true"
  );
  const {
    data: queryData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["authUser"],
    queryFn: getUserProfile,
    retry: false,
    enabled: isAuthenticated,
  });

  const user = isAuthenticated ? queryData : null;

  useEffect(() => {
    if (isError) {
      updateCache(queryClient, null, setIsAuthenticated);
    }
  }, [isError, queryClient]);

  const setUser = (newUser) => {
    updateCache(queryClient, newUser, setIsAuthenticated);
  };

  if (isAuthenticated && isLoading) {
    return <div>Session Loading...</div>;
  }

  return (
    <AuthContext.Provider value={{ user, setUser, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

const updateCache = (queryClient, newUser, setIsAuthenticated) => {
  if (newUser) {
    localStorage.setItem("is_logged_in", "true");
    setIsAuthenticated(true);
    queryClient.setQueryData(["authUser"], newUser);
  } else {
    localStorage.removeItem("is_logged_in");
    queryClient.setQueryData(["authUser"], null);
    setIsAuthenticated(false);
    queryClient.removeQueries({ queryKey: ["authUser"], exact: true });
  }
};
