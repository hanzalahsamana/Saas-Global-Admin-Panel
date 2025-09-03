"use client";
import { createContext, useState } from "react";

export const InvoiceContext = createContext();

export const InvoiceProvider = ({ children }) => {
  const [invoices, setInvoices] = useState([]);

  const [pagination, setPagination] = useState({
    totalPages: 0,
    skip: 0,
    limit: 0,
    total: 0,
  });

  const [invoiceLoading, setInvoiceLoading] = useState(true);
  const [invoiceStatusLoading, setInvoiceStatusLoading] = useState(false);

  const handleInvoices = (newUsers) => {
    setInvoices(newUsers);
    setInvoiceLoading(false);
  };

  const updateInvoiceStatus = (user) => {
    const updatedUsers = invoices.map((u) => (u._id === user._id ? user : u));
    setInvoices(updatedUsers);
    setInvoiceStatusLoading(false);
  };

  return (
    <InvoiceContext.Provider
      value={{
        invoiceStatusLoading,
        invoiceLoading,
        invoices,
        pagination,
        handleInvoices,
        setPagination,
        setInvoiceLoading,
        updateInvoiceStatus,
        setInvoiceStatusLoading,
      }}
    >
      {children}
    </InvoiceContext.Provider>
  );
};
