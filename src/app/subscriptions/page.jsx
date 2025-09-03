"use client";
import { fetchStoresSuggest } from "@/API/SearchSuggest/getStoresName";
import { fetchSubscriptions } from "@/API/subscriptions/getSubscriptions";
import { toggleSubsStatus } from "@/API/subscriptions/toggleSubscriptionStatus";
import ProtectedRoute from "@/AuthenticRouting/ProtectedRoutes";
import { Datepicker } from "@/Components/Actions/DatePicker";
import CustomDropdown from "@/Components/Actions/DropDown";
import SelectedFilters from "@/Components/Actions/SelectedFilters";
import ConfirmationModal from "@/Components/Modals/ConfirmationModal";
import SearchBar from "@/Components/Search/SearchBar";
import Table from "@/Components/Tables/Table";
import TablePagination from "@/Components/Tables/tablePagination";
import { AuthContext } from "@/Context/Authentication/AuthContext";
import { StoresSuggestContext } from "@/Context/SearchSuggest/storesSuggestContext";
import { SubscriptionsContext } from "@/Context/Subscription/subscriptionsContext";
import React, { useCallback, useContext, useEffect, useState } from "react";

const columns = [
  { key: "_id", label: "Subscription Id" },
  { key: "email", label: "Email" },
  { key: "storeName", label: "Store Name" },
  { key: "status", label: "Status" },
  { key: "billingCycle", label: "Billing Cycle" },
  { key: "subsStart", label: "Subscription Start" },
  { key: "subsEnd", label: "Subscription End" },
  { key: "createdAt", label: "Created At" },
];

const statusData = [
  { label: "Trial", value: "trial" },
  { label: "Trial Expired", value: "trial expired" },
  { label: "Pending", value: "pending" },
  { label: "Active", value: "active" },
  { label: "Cancelled", value: "cancelled" },
];

const statusRenderer = ({ value }) => {
  const statusColors = {
    active: "bg-green-100 text-green-700",
    trial: "bg-yellow-100 text-yellow-700",
    cancelled: "bg-red-100 text-red-600",
    pending: "bg-blue-100 text-blue-700",
    "trial expired": "bg-red-100 text-red-600",
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

const Subscriptions = () => {
  const [modalShow, setModalShow] = useState(false);
  const [selectedSubscription, setSelectedSubscription] = useState({});
  const [searchValue, setSearchValue] = useState("");
  const [dataLimit, setDataLimit] = useState(10);
  const [selectedFilters, setSelectedFilters] = useState({
    limit: dataLimit,
    page: 1,
  });
  const [dateRange, setDateRange] = useState([null, null]);

  const { currentUser } = useContext(AuthContext);
  const { token } = currentUser;
  const {
    subscriptions,
    handleSetSubscription,
    subscriptionLoading,
    setSubscriptionsLoading,
    pagination,
    updateSubsStatus,
    setSubsStatusLoading,
    subsStatusLoading,
  } = useContext(SubscriptionsContext);
  const {
    storesSuggests,
    storesSuggestsLoading,
    handleStoresSuggests,
    setStoresSuggestsLoading,
  } = useContext(StoresSuggestContext);

  const tableActions = (data) => {
    const status = data?.status;

    if (["trial", "trial expired"].includes(status)) return [""];

    if (status === "pending") {
      return ["Active", "Cancel"].map((label) => ({
        label,
        onClick: (row) => {
          setModalShow(true);
          setSelectedSubscription(row);
        },
      }));
    }

    const label =
      status === "cancelled" ? "Active" : status === "active" ? "Cancel" : "";

    return [
      {
        label,
        onClick: (row) => {
          setModalShow(true);
          setSelectedSubscription(row);
        },
      },
    ];
  };

  const handleStatusSelect = (value) => {
    handleSelectFilter({ status: value });
  };

  const handleSearch = async (value) => {
    setSearchValue(value);
  };

  const handleSubmit = async () => {
    handleSelectFilter({ storeName: searchValue });
  };

  const handleFilterRemove = (filter) => {
    const { [filter]: deleted, ...newState } = selectedFilters;
    setSelectedFilters(newState);
  };

  const handleClearAll = (filter) => {
    setSelectedFilters({ limit: dataLimit, page: 1 });
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      fetchStoresSuggest(
        token,
        handleStoresSuggests,
        setStoresSuggestsLoading,
        searchValue
      );
    }, 500);

    return () => clearTimeout(handler);
  }, [searchValue]);

  const getSubscriptions = useCallback(async () => {
    await fetchSubscriptions(
      token,
      setSubscriptionsLoading,
      handleSetSubscription,
      selectedFilters
    );
  }, [selectedFilters]);

  useEffect(() => {
    getSubscriptions();
  }, [getSubscriptions]);

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

  const handleDataLimit = () => {
    handleSelectFilter({ limit: dataLimit });
  };

  const handleSelectFilter = (data) => {
    setSelectedFilters((prev) => ({ ...prev, page: 1, ...data }));
  };

  const handleModalConfirm = async () => {
    await toggleSubsStatus(
      token,
      {
        id: selectedSubscription?._id,
        status:
          selectedSubscription?.status === "pending"
            ? "active"
            : selectedSubscription?.status === "active"
            ? "cancelled"
            : "active",
      },
      updateSubsStatus,
      setSubsStatusLoading
    );
    setModalShow(false);
  };
  return (
    <div className="p-6 space-y-6 min-h-[calc(100vh-50px)] flex flex-col">
      <div className="flex flex-col md:flex-row justify-between w-full">
        <SearchBar
          handleSearch={handleSearch}
          searchValue={searchValue}
          handleSubmit={handleSubmit}
          placeholder="Filter by Store Name"
          setSearchValue={setSearchValue}
          suggestData={storesSuggests}
          loading={storesSuggestsLoading}
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
        data={subscriptions}
        actions={tableActions}
        renderers={{ status: statusRenderer }}
        loading={subscriptionLoading}
      />
      <TablePagination
        setCurrentPage={(page) => handleSelectFilter({ page })}
        currentPage={selectedFilters.page}
        dataLimit={dataLimit}
        setDataLimit={setDataLimit}
        loading={subscriptionLoading}
        handleSubmit={handleDataLimit}
        data={{ pagination, data: subscriptions }}
      />
      <ConfirmationModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        content={`You want to ${
          selectedSubscription?.status === "pending" ||
          selectedSubscription?.status === "cancelled"
            ? "active"
            : "Cancel"
        } subscription of this store`}
        heading={"Confirm Please"}
        contentHeading="Are you sure?"
        handleConfirm={handleModalConfirm}
        loading={subsStatusLoading}
      />
    </div>
  );
};

export default ProtectedRoute(Subscriptions);
