"use client";
import ProtectedRoute from "@/AuthenticRouting/ProtectedRoutes";
import Table from "@/Components/Tables/Table";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ConfirmationModal from "@/Components/Modals/ConfirmationModal";
import SearchBar from "@/Components/Search/SearchBar";
import { Datepicker } from "@/Components/Actions/DatePicker";
import CustomDropdown from "@/Components/Actions/DropDown";
import SelectedFilters from "@/Components/Actions/SelectedFilters";
import TablePagination from "@/Components/Tables/tablePagination";
import { UsersContext } from "@/Context/Users/UsersContext";
import { fetchUsers } from "@/API/user/getUsers";
import { fetchEmailSuggest } from "@/API/SearchSuggest/getEmailSuggest";
import { EmailSuggestContext } from "@/Context/SearchSuggest/emailSuggestContext";
import { toggleUserStatus } from "@/API/user/toggleUserStatus";
import { AuthContext } from "@/Context/Authentication/AuthContext";

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
  // hooks
  const router = useRouter();
  const [modalShow, setModalShow] = useState(false);
  const [selectedUser, setSelectedUser] = useState({});
  const [searchValue, setSearchValue] = useState("");
  const [dataLimit, setDataLimit] = useState(10);
  const [selectedFilters, setSelectedFilters] = useState({
    limit: dataLimit,
    page: 1,
  });
  const [dateRange, setDateRange] = useState([null, null]);

  const {
    users,
    usersLoading,
    pagination,
    handleUsers,
    handleUsersLoading,
    setPagination,
    updateUserStatus,
    userStatusLoading,
    setUserStatusLoading,
  } = useContext(UsersContext);

  const {
    emailSuggests,
    emailSuggestsLoading,
    handleEmailSuggests,
    handleEmailSuggestLoading,
  } = useContext(EmailSuggestContext);

  const { currentUser } = useContext(AuthContext);
  const { token } = currentUser;

  useEffect(() => {
    const handler = setTimeout(() => {
      fetchEmailSuggest(
        token,
        handleEmailSuggests,
        handleEmailSuggestLoading,
        searchValue
      );
    }, 500);

    return () => clearTimeout(handler);
  }, [searchValue]);

  const handleSelectFilter = (data) => {
    setSelectedFilters((prev) => ({ ...prev, page: 1, ...data }));
  };

  useEffect(() => {
    if (dateRange[0] && dateRange[1]) {
      handleSelectFilter({
        dateRange: `${new Date(dateRange[0])
          .toDateString()
          .slice(4, 15)} - ${new Date(dateRange[1])
          .toDateString()
          .slice(4, 15)}`,
      });
    }
  }, [dateRange]);

  // functions
  const handleStatusSelect = (value) => {
    handleSelectFilter({ status: value });
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

  const handleSearchSubmit = async () => {
    handleSelectFilter({ email: searchValue });
  };

  const handleFilterRemove = (filter) => {
    const { [filter]: deleted, ...newState } = selectedFilters;
    if (filter === "dateRange") {
      setDateRange([null, null]);
    }
    if (filter === "email") {
      setSearchValue("");
    }
    setSelectedFilters({ ...newState, page: 1 });
  };

  const handleClearAll = () => {
    setDateRange([null, null]);
    setSearchValue("");
    setSelectedFilters({ limit: dataLimit, page: 1 });
  };

  const getUsers = useCallback(async () => {
    await fetchUsers(
      token,
      handleUsersLoading,
      setPagination,
      handleUsers,
      selectedFilters
    );
  }, [selectedFilters]);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const handleDataLimit = () => {
    handleSelectFilter({ limit: dataLimit });
  };

  const handleStatusChange = async () => {
    if (selectedUser?._id && modalShow) {
      await toggleUserStatus(
        token,
        {
          id: selectedUser?._id,
          status: selectedUser?.status === "Active" ? "Suspended" : "Active",
        },
        updateUserStatus,
        setUserStatusLoading
      );
      setModalShow(false);
    }
  };

  return (
    <div className="p-6 space-y-6 min-h-[calc(100vh-50px)] flex flex-col">
      <div className="flex flex-col md:flex-row justify-between w-full">
        <SearchBar
          handleSearch={handleSearch}
          searchValue={searchValue}
          handleSubmit={handleSearchSubmit}
          placeholder="Filter by email..."
          setSearchValue={setSearchValue}
          suggestData={emailSuggests}
          loading={emailSuggestsLoading}
          isDisabled={!searchValue}
          tooltipText={"Please enter a value in search bar!"}
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
        setCurrentPage={(page) => handleSelectFilter({ page })}
        currentPage={selectedFilters?.page}
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
        handleConfirm={handleStatusChange}
        loading={userStatusLoading}
      />
    </div>
  );
};

export default ProtectedRoute(Users);
