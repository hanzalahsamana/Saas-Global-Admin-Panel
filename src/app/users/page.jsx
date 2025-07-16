"use client";
import ProtectedRoute from "@/AuthenticRouting/ProtectedRoutes";
import Table from "@/Components/Tables/Table";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ConfirmationModal from "@/Components/Modals/ConfirmationModal";
import SearchBar from "@/Components/Search/SearchBar";
import { CustomDropdown } from "@/Components/Actions/DropDown";

const columns = ["name", "email", "plan", "status", "createdAt", "totalStores"];

const users = [
  {
    _id: "10",
    name: "Hanzalah Samana",
    email: "hanzalah@example.com",
    plan: "Pro",
    status: "Active",
    createdAt: "2025-06-01",
    totalStores: 1,
  },
  {
    _id: "14",
    name: "Fatima Khan",
    email: "fatima@example.com",
    plan: "Free",
    status: "Suspended",
    createdAt: "2025-05-12",
    totalStores: 2,
  },
];
const statusRenderer = ({ value }) => {
  const statusColors = {
    Active: "bg-green-100 text-green-700",
    Suspended: "bg-red-100 text-red-600",
  };

  return (
    <span
      className={`text-xs px-2 py-1 rounded-full font-medium ${
        statusColors[value] || "bg-gray-100 text-gray-600"
      }`}
    >
      {value}
    </span>
  );
};
const filterData = ["User Name", "Plan", "Status", "Created At"];

const Users = () => {
  const router = useRouter();
  const [modalShow, setModalShow] = useState(false);
  const [selectedUser, setSelectedUser] = useState({});
  const [searchValue, setSearchValue] = useState("");
  const [selectedFilter, setSelectedFilter] = useState(null);

  const handleClick = (value) => {
    setSelectedFilter(value);
  };

  const actions = (user) => [
    {
      label: "View",
      onClick: () => router.push(`/users/${user._id}`),
    },
    {
      label: user.status === "Suspended" ? "Active" : "Suspend",
      onClick: (row) => {
        setModalShow(true);
        setSelectedUser(row);
      },
    },
  ];

  const handleSearch = async (value) => {
    setSearchValue(value);
  };

  const handleSubmit = async () => {
    console.log("User Search Value", searchValue);
  };

  useEffect(() => {
    console.log("searchValue", searchValue);
  }, [searchValue]);

  return (
    <div className="p-6 space-y-4">
      <h1 className="font-semibold">Users</h1>
      <div className="flex">
        <CustomDropdown
          dropdownData={filterData}
          dropdownHeading={selectedFilter ? selectedFilter : "Filter By"}
          handleClick={handleClick}
        />
        <SearchBar
          handleSearch={handleSearch}
          searchValue={searchValue}
          handleSubmit={handleSubmit}
          placeholder="Search..."
          setSearchValue={setSearchValue}
          suggestData={["hanzalah", "ali", "de", "ded", "ali", "de", "ded"]}
          loading={false}
          isActive={!selectedFilter}
        />
      </div>
      <Table
        columns={columns}
        data={users}
        actions={actions}
        renderers={{
          status: statusRenderer,
        }}
      />
      <ConfirmationModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        content={`You want to ${
          selectedUser?.status === "Active" ? "Suspend" : "Active"
        } this user`}
        heading={"Confirm Please"}
        contentHeading="Are you sure?"
      />
    </div>
  );
};

export default ProtectedRoute(Users);
