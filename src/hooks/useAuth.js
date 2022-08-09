import { useLocalStorage } from "@mantine/hooks";
import React, { createContext, useContext } from "react";
import { useNavigate } from "react-router-dom";

const authContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useLocalStorage({
    key: "user",
    defaultValue: null,
  });

  const navigate = useNavigate();

  const login = (userDetails) => {
    setUser(userDetails);
    navigate("/dashboard");
  };

  const logout = () => {
    setUser(null);
    navigate("/");
  };

  return (
    <authContext.Provider value={{ user, login, logout }}>
      {children}
    </authContext.Provider>
  );
}

export const useAuth = () => {
  return useContext(authContext);
};
