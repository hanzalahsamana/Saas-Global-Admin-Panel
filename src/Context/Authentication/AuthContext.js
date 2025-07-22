"use client";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userLoading, setUserLoading] = useState(true);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setCurrentUser(JSON.parse(user));
    }
    setUserLoading(false);
  }, []);

  const login = (user) => {
    setCurrentUser(user);
    localStorage.setItem("user", JSON.stringify(user));
    setUserLoading(false);
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.clear();
    setUserLoading(false);
  };

  return (
    <AuthContext.Provider
      value={{ currentUser, userLoading, login, logout, setUserLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};
