"use client";
import ProtectedRoute from "@/AuthenticRouting/ProtectedRoutes";
import Table from "@/Components/Tables/Table";
import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ConfirmationModal from "@/Components/Modals/ConfirmationModal";
import SearchBar from "@/Components/Search/SearchBar";
import { Datepicker } from "@/Components/Actions/DatePicker";
import CustomDropdown from "@/Components/Actions/DropDown";
import SelectedFilters from "@/Components/Actions/SelectedFilters";
import TablePagination from "@/Components/Tables/tablePagination";
import { UsersContext } from "@/Context/Users/UsersContext";
import { fetchUsers } from "@/API/user/getUsers";

const columns = ["email", "status", "createdAt", "totalStores"];

const statusRenderer = ({ value }) => {
  const statusColors = {
    Active: "bg-green-100 text-green-700",
    Suspended: "bg-red-100 text-red-600",
  };

  return (
    <span
      className={`text-xs px-4 py-1 rounded-sm font-medium ${
        statusColors[value] || "bg-gray-100 text-gray-600"
      }`}
    >
      {value}
    </span>
  );
};

const statusData = [
  { label: "Active", value: "active" },
  { label: "Suspended", value: "suspended" },
];

const Users = () => {
  const router = useRouter();
  const [modalShow, setModalShow] = useState(false);
  const [selectedUser, setSelectedUser] = useState({});
  const [searchValue, setSearchValue] = useState("");
  const [selectedFilters, setSelectedFilters] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [dataLimit, setDataLimit] = useState(10);
  const [dateRange, setDateRange] = useState([null, null]);

  const {
    users,
    usersLoading,
    pagination,
    handleUsers,
    handleUsersLoading,
    setPagination,
  } = useContext(UsersContext);

  const handleStatusSelect = (value) => {
    setSelectedFilters((prev) => ({ ...prev, status: value }));
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

  const handleFilterRemove = (filter) => {
    const { [filter]: deleted, ...newState } = selectedFilters;
    if (filter === "date") {
      setDateRange([null, null]);
    }
    setSelectedFilters(newState);
  };

  const handleClearAll = (filter) => {
    setSelectedFilters({});
    setDateRange([null, null]);
  };

  useEffect(() => {
    console.log("searchValue", searchValue);
  }, [searchValue]);

  const getUsers = async (page) => {
    const token = localStorage.getItem("token");
    if (page) {
      setCurrentPage(page);
    }
    await fetchUsers(token, handleUsersLoading, setPagination, handleUsers, {
      ...selectedFilters,
      page: page ? page : currentPage,
      limit: dataLimit,
    });
  };

  useEffect(() => {
    getUsers();
  }, [selectedFilters, currentPage]);

  const handleDataLimit = () => {
    getUsers(1);
  };

  useEffect(() => {
    if (dateRange[0] && dateRange[1]) {
      const filterValues = {
        ...selectedFilters,
        dateRange: `${new Date(dateRange[0])
          .toDateString()
          .slice(4, 15)} - ${new Date(dateRange[1])
          .toDateString()
          .slice(4, 15)}`,
      };
      setSelectedFilters(filterValues);
    }
  }, [dateRange]);

  return (
    <div className="p-6 space-y-6 min-h-[calc(100vh-50px)] flex flex-col">
      <div className="flex flex-col md:flex-row justify-between w-full">
        <SearchBar
          handleSearch={handleSearch}
          searchValue={searchValue}
          handleSubmit={handleSubmit}
          placeholder="Search..."
          setSearchValue={setSearchValue}
          suggestData={["hanzalah", "ali", "de", "ded", "ali", "de", "ded"]}
          loading={false}
          // isDisabled={!selectedSort}
        />
        <div className="flex items-center justify-end gap-x-2 w-full">
          <div>
            <Datepicker
              dateRange={dateRange}
              setDateRange={setDateRange}
              placeholderText="Select Date"
            />
          </div>
          <CustomDropdown
            dropdownData={statusData}
            dropdownHeading={
              selectedFilters.status ? selectedFilters?.status : "Status"
            }
            handleClick={handleStatusSelect}
          />{" "}
        </div>
      </div>
      <SelectedFilters
        selectedFilters={selectedFilters}
        handleRemove={handleFilterRemove}
        handleClearAll={handleClearAll}
      />
      <Table
        columns={columns}
        data={users}
        actions={actions}
        renderers={{
          status: statusRenderer,
        }}
        loading={usersLoading}
      />
      <TablePagination
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
        dataLimit={dataLimit}
        setDataLimit={setDataLimit}
        loading={usersLoading}
        handleSubmit={handleDataLimit}
        data={{ pagination, data: users }}
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
