"use client";
import { fetchCurrentUser } from "@/API/user/getCurrentUser";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userLoading, setUserLoading] = useState(true);

  const login = (user) => {
    setCurrentUser(user);
    setUserLoading(false);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    const getUser = async () => {
      await fetchCurrentUser(JSON.parse(token), setUserLoading, login)
    }
    if (token) {
      getUser()
    } else {
      setUserLoading(false)
    }
  }, []);


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
