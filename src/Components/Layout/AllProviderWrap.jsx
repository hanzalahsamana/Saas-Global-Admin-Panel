"use client";

import { AuthProvider } from "@/Context/Authentication/AuthContext";
import { StoresProvider } from "@/Context/Stores/storesContext";
import { SubscriptionsProvider } from "@/Context/Subscription/subscriptionsContext";
import { UsersProvider } from "@/Context/Users/UsersContext";

const AllProviders = ({ children }) => {
  return (
    <AuthProvider>
      <UsersProvider>
        <StoresProvider>
          <SubscriptionsProvider>{children} </SubscriptionsProvider>
        </StoresProvider>
      </UsersProvider>
    </AuthProvider>
  );
};

export default AllProviders;
