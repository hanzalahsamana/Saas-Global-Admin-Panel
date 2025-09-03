"use client";

import {
  AnalyticsContext,
  AnalyticsProvider,
} from "@/Context/Analytics/analyticsContext";
import { AuthProvider } from "@/Context/Authentication/AuthContext";
import { InvoiceProvider } from "@/Context/Invoices/invoiceContext";
import { EmailSuggestProvider } from "@/Context/SearchSuggest/emailSuggestContext";
import { StoresSuggestProvider } from "@/Context/SearchSuggest/storesSuggestContext";
import { StoresProvider } from "@/Context/Stores/storesContext";
import { SubscriptionsProvider } from "@/Context/Subscription/subscriptionsContext";
import { UsersProvider } from "@/Context/Users/UsersContext";
import { useContext } from "react";

const AllProviders = ({ children }) => {
  // const abc = (akdcj)=>{
  // }

  return (
    <AuthProvider>
      <StoresSuggestProvider>
        <InvoiceProvider>
          <EmailSuggestProvider>
            <AnalyticsProvider>
              <UsersProvider>
                <StoresProvider>
                  <SubscriptionsProvider>{children} </SubscriptionsProvider>
                </StoresProvider>
              </UsersProvider>
            </AnalyticsProvider>
          </EmailSuggestProvider>
        </InvoiceProvider>
      </StoresSuggestProvider>
    </AuthProvider>
  );
};

export default AllProviders;
