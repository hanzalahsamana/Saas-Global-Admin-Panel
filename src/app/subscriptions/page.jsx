"use client";
import { fetchStoresSuggest } from "@/API/SearchSuggest/getStoresName";
import { fetchSubscriptions } from "@/API/subscriptions/getSubscriptions";
import { toggleSubsStatus } from "@/API/subscriptions/toggleSubscriptionStatus";
import ProtectedRoute from "@/AuthenticRouting/ProtectedRoutes";
import Button from "@/Components/Actions/Button";
import { Datepicker } from "@/Components/Actions/DatePicker";
import SelectedFilters from "@/Components/Actions/SelectedFilters";
import ConfirmationModal from "@/Components/Modals/ConfirmationModal";
import SearchBar from "@/Components/Search/SearchBar";
import Table from "@/Components/Tables/Table";
import TablePagination from "@/Components/Tables/tablePagination";
import { TableTabs } from "@/Components/Tables/tableTabs";
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
  { key: "subsStart", label: "Subscription Start", type: "date" },
  { key: "subsEnd", label: "Subscription End", type: "date" },
  { key: "createdAt", label: "Created At", type: "date" },
];

const statusData = [
  { label: "All", value: "all" },
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
    status: "all",
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
    counts,
  } = useContext(SubscriptionsContext);
  const {
    storesSuggests,
    storesSuggestsLoading,
    handleStoresSuggests,
    setStoresSuggestsLoading,
  } = useContext(StoresSuggestContext);

  const tableActions = (data) => {
    const status = data?.status;

    return ["Active", "Cancel"].map((label) => ({
      label,
      onClick: (row) => {
        setModalShow(true);
        setSelectedSubscription(row);
      },
      disabled:
        ["trial", "trial expired"].includes(status) ||
        (label === "Active" && status === "active") ||
        (label === "Cancel" && status === "cancelled"),
    }));
  };
  const statuses =
    Array.isArray(selectedSubscription) && selectedSubscription.length > 0
      ? selectedSubscription.map((s) => s?.status?.toLowerCase())
      : [];

  const noStatus = statuses.length === 0;

  const handleCheckBoxAction = (label) => {
    const updatedSubscription = selectedSubscription.map((s, i) => ({
      ...s,
      label,
    }));
    setSelectedSubscription(updatedSubscription);
    setModalShow(true);
  };

  const checkBoxActions = [
    {
      label: "Active",
      onClick: handleCheckBoxAction,
      disabled:
        noStatus ||
        statuses.includes("trial") ||
        statuses.includes("trial expired") ||
        statuses.includes("active"),
    },
    {
      label: "Cancel",
      onClick: handleCheckBoxAction,
      disabled:
        noStatus ||
        statuses.includes("trial") ||
        statuses.includes("trial expired") ||
        statuses.includes("cancelled"),
    },
  ];

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
    let data = { id: [], status: "" };
    if (Array.isArray(selectedSubscription)) {
      data.id = selectedSubscription.map((item) => item?._id);
      data.status = selectedSubscription[0]?.label;
    } else if (selectedSubscription?._id) {
      data.id = [selectedSubscription._id];
      data.status = selectedSubscription?.label;
    }
    await toggleSubsStatus(token, data, updateSubsStatus, setSubsStatusLoading);
    setSelectedSubscription({});
    setModalShow(false);
  };

  const handleCheckbox = (e, row) => {
    if (e.target.checked) {
      if (Array.isArray(selectedSubscription)) {
        setSelectedSubscription([...selectedSubscription, row]);
      } else {
        setSelectedSubscription([row]);
      }
    } else {
      if (Array.isArray(selectedSubscription)) {
        setSelectedSubscription(
          selectedSubscription.filter((r) => r._id !== row._id)
        );
      } else {
        setSelectedSubscription(null);
      }
    }
  };

  const handleCheckboxSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedSubscription(subscriptions);
    } else {
      setSelectedSubscription({});
    }
  };

  const isCheckbox =
    selectedFilters.status !== "all" &&
    selectedFilters.status !== "trial" &&
    selectedFilters.status !== "trial expired";
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
          tooltipText={"Please ente a value in search bar!"}
        />
        <div>
          <Datepicker
            dateRange={dateRange}
            setDateRange={setDateRange}
            placeholderText="Select Date"
          />
        </div>
      </div>
      <SelectedFilters
        selectedFilters={selectedFilters}
        handleRemove={handleFilterRemove}
        handleClearAll={handleClearAll}
        hideFilter={["limit", "page", "status"]}
      />
      <div className="grow">
        <div className="flex justify-between items-center mb-1">
          <TableTabs
            tabs={statusData}
            activeTabLength={counts}
            setActiveTab={(v) => handleSelectFilter({ status: v })}
            activeTab={selectedFilters?.status}
          />
          <div>
            {isCheckbox &&
              checkBoxActions.map((action, aIdx) => {
                return action ? (
                  <Button
                    key={aIdx}
                    action={() => action.onClick(action?.label)}
                    variant="outline"
                    className="!text-xs !py-2 !rounded-sm !mr-2 !h-max"
                    label={action.label}
                    disabled={action?.disabled}
                  />
                ) : (
                  <p key={aIdx}>-</p>
                );
              })}
          </div>
        </div>

        <Table
          columns={columns}
          data={subscriptions}
          actions={tableActions}
          renderers={{ status: statusRenderer }}
          loading={subscriptionLoading}
          isCheckbox={isCheckbox}
          handleCheckbox={handleCheckbox}
          selectedData={selectedSubscription}
          handleCheckboxSelectAll={handleCheckboxSelectAll}
        />
      </div>
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
        onHide={() => {
          setSelectedSubscription({});
          setModalShow(false);
        }}
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
