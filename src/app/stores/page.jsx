"use client";
import ProtectedRoute from "@/AuthenticRouting/ProtectedRoutes";
import ConfirmationModal from "@/Components/Modals/ConfirmationModal";
import Table from "@/Components/Tables/Table";
import React, { useState } from "react";

const columns = ["name", "domain", "ownerEmail", "status", "createdAt", "plan"];

const stores = [
  {
    name: "Al-Haram Fabrics",
    slug: "al-haram-fabrics",
    domain: "alharam.mysaas.com",
    ownerEmail: "hanzalah@example.com",
    status: "Active",
    createdAt: "2025-05-01",
    plan: "Pro",
  },
  {
    name: "Fabrico",
    slug: "fabrico",
    domain: "fabrico.mysaas.com",
    ownerEmail: "fatima@example.com",
    status: "Suspended",
    createdAt: "2025-06-10",
    plan: "Free",
  },
];

const Stores = () => {
  const [modalShow, setModalShow] = useState(false);
  const [selectedStore, setSelectedStore] = useState({});

  const actions = (store) => [
    {
      label: "View",
      onClick: (row) =>
        console.log("Redirect to dashboard for store:", row.slug),
    },
    {
      label: store.status === "Suspended" ? "Active" : "Suspend",
      onClick: (row) => {
        setModalShow(true);
        setSelectedStore(row);
      },
    },
  ];

  const renderers = {
    status: ({ value }) => {
      const statusColor =
        value === "Active"
          ? "bg-green-100 text-green-700"
          : "bg-red-100 text-red-600";
      return (
        <span
          className={`text-xs px-2 py-1 rounded-full font-medium ${statusColor}`}
        >
          {value}
        </span>
      );
    },
  };

  return (
    <div className="p-6 space-y-4">
      <h1 className="font-semibold">Stores</h1>

      <Table
        columns={columns}
        data={stores}
        actions={actions}
        renderers={renderers}
      />
      <ConfirmationModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        content={`You want to ${
          selectedStore?.status === "Active" ? "Suspend" : "Active"
        } this store`}
        heading={"Confirm Please"}
        contentHeading="Are you sure?"
      />
    </div>
  );
};

export default ProtectedRoute(Stores);
