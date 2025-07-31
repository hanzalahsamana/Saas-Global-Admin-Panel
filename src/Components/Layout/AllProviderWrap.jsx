"use client";

import {
  AnalyticsContext,
  AnalyticsProvider,
} from "@/Context/Analytics/analyticsContext";
import { AuthProvider } from "@/Context/Authentication/AuthContext";
import { EmailSuggestProvider } from "@/Context/SearchSuggest/emailSuggestContext";
import { StoresProvider } from "@/Context/Stores/storesContext";
import { SubscriptionsProvider } from "@/Context/Subscription/subscriptionsContext";
import { UsersProvider } from "@/Context/Users/UsersContext";
import { useContext } from "react";

const AllProviders = ({ children }) => {
  // const abc = (akdcj)=>{
  // }

  return (
    <AuthProvider>
      <EmailSuggestProvider>
        <AnalyticsProvider>
          <UsersProvider>
            <StoresProvider>
              <SubscriptionsProvider>{children} </SubscriptionsProvider>
            </StoresProvider>
          </UsersProvider>
        </AnalyticsProvider>
      </EmailSuggestProvider>
    </AuthProvider>
  );
};

export default AllProviders;
