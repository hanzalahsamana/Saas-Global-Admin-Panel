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

  const handleInvoices = (invoices) => {
    setInvoices(invoices?.data);
    setPagination(invoices?.pagination);
    setInvoiceLoading(false);
  };

  const updateInvoiceStatus = (user) => {
    const updatedInvoice = invoices.map((u) =>
      u._id === user._id ? { ...u, status: user?.status } : u
    );
    setInvoices(updatedInvoice);
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
        setInvoiceLoading,
        updateInvoiceStatus,
        setInvoiceStatusLoading,
      }}
    >
      {children}
    </InvoiceContext.Provider>
  );
};
