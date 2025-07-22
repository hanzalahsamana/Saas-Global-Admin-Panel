"use client";
import ProtectedRoute from "@/AuthenticRouting/ProtectedRoutes";
import { Datepicker } from "@/Components/Actions/DatePicker";
import CustomDropdown from "@/Components/Actions/DropDown";
import SelectedFilters from "@/Components/Actions/SelectedFilters";
import ConfirmationModal from "@/Components/Modals/ConfirmationModal";
import SearchBar from "@/Components/Search/SearchBar";
import Table from "@/Components/Tables/Table";
import TablePagination from "@/Components/Tables/tablePagination";
import { SubscriptionsContext } from "@/Context/Subscription/subscriptionsContext";
import React, { useContext, useEffect, useState } from "react";

const columns = [
  "userName",
  "storeName",
  "plan",
  "paymentStatus",
  "billingCycle",
  "amountPaid",
  "trialStart",
  "trialEnd",
  "subscriptionId",
];

const subscriptionsData = {
  data: [
    {
      userName: "Hanzalah Samana",
      storeName: "Store 1",
      plan: "Basic",
      paymentStatus: "Paid",
      billingCycle: "Monthly",
      amountPaid: "PKR 2,500",
      trialStart: "2025-06-01",
      trialEnd: "2025-06-08",
      subscriptionId: "sub_123456789",
    },
    {
      userName: "Fatima Khan",
      storeName: "Store 2",
      plan: "Premium",
      paymentStatus: "Trial",
      billingCycle: "Monthly",
      amountPaid: "PKR 0",
      trialStart: "2025-07-01",
      trialEnd: "2025-07-08",
      subscriptionId: "trial_987654321",
    },
    {
      userName: "Ali Raza",
      storeName: "Store 3",
      plan: "Advance",
      paymentStatus: "Failed",
      billingCycle: "Annual",
      amountPaid: "PKR 80,000",
      trialStart: "-",
      trialEnd: "-",
      subscriptionId: "sub_77777777",
    },
  ],
  pagination: {
    totalPages: 2,
    skip: 0,
    limit: 10,
    total: 10,
  },
};

const statusData = [
  { label: "Paid", value: "paid" },
  { label: "Failed", value: "failed" },
  { label: "Trial", value: "trial" },
];

const plansData = [
  { label: "Basic", value: "basic" },
  { label: "Advance", value: "advance" },
  { label: "Premium", value: "premium" },
];

const paymentStatusRenderer = ({ value }) => {
  const colorMap = {
    Paid: "bg-green-100 text-green-700",
    Trial: "bg-yellow-100 text-yellow-700",
    Failed: "bg-red-100 text-red-600",
  };

  return (
    <span
      className={`text-xs px-2 py-1 rounded-full font-medium ${
        colorMap[value] || "bg-gray-100 text-gray-600"
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
  const [selectedFilters, setSelectedFilters] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [dataLimit, setDataLimit] = useState(10);
  const [dateRange, setDateRange] = useState([null, null]);

  const { subscriptions, pagination, subscriptionLoading } =
    useContext(SubscriptionsContext);

  const tableActions = (data) => [
    {
      label: "Cancel",
      disabled: data.paymentStatus === "Trial",
      onClick: (row) => {
        setModalShow(true);
        setSelectedSubscription(row);
      },
    },
  ];

  const handleStatusSelect = (value) => {
    console.log("value", value);
    setSelectedFilters((prev) => ({ ...prev, status: value }));
  };

  const handlePlanSelect = (value) => {
    setSelectedFilters((prev) => ({ ...prev, plan: value }));
  };

  const handleSearch = async (value) => {
    setSearchValue(value);
  };

  const handleSubmit = async () => {
    console.log("User Search Value", searchValue);
  };

  const handleFilterRemove = (filter) => {
    const { [filter]: deleted, ...newState } = selectedFilters;
    setSelectedFilters(newState);
  };

  const handleClearAll = (filter) => {
    setSelectedFilters({});
  };

  useEffect(() => {
    console.log("searchValue", searchValue);
  }, [searchValue]);

  useEffect(() => {
    console.log("filters query", {
      ...selectedFilters,
      page: currentPage,
      limit: dataLimit,
    });
  }, [selectedFilters, currentPage, dataLimit]);

  const handleDataLimit = () => {
    console.log("Submit Data Limit", {
      ...selectedFilters,
      limit: dataLimit,
      page: currentPage,
    });
  };
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
          <CustomDropdown
            dropdownData={plansData}
            dropdownHeading={
              selectedFilters.plan ? selectedFilters?.plan : "Plan"
            }
            handleClick={handlePlanSelect}
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
        renderers={{ paymentStatus: paymentStatusRenderer }}
      />
      <TablePagination
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
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
          selectedSubscription?.paymentStatus !== "Trial" && "Cancel"
        } subscription of this store`}
        heading={"Confirm Please"}
        contentHeading="Are you sure?"
      />
    </div>
  );
};

export default ProtectedRoute(Subscriptions);
