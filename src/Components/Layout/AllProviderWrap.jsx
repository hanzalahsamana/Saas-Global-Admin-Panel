"use client";

import { AuthProvider } from "@/Context/Authentication/AuthContext";
import { StoresProvider } from "@/Context/Stores/storesSlice";
import { UsersProvider } from "@/Context/Users/UsersContext";

const AllProviders = ({ children }) => {
  return (
    <AuthProvider>
      <UsersProvider>
        <StoresProvider>{children}</StoresProvider>
      </UsersProvider>
    </AuthProvider>
  );
};

export default AllProviders;
