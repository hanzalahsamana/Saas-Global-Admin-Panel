"use client";
import ProtectedRoute from "@/AuthenticRouting/ProtectedRoutes";
import { Datepicker } from "@/Components/Actions/DatePicker";
import CustomDropdown from "@/Components/Actions/DropDown";
import SelectedFilters from "@/Components/Actions/SelectedFilters";
import ConfirmationModal from "@/Components/Modals/ConfirmationModal";
import SearchBar from "@/Components/Search/SearchBar";
import Table from "@/Components/Tables/Table";
import TablePagination from "@/Components/Tables/tablePagination";
import React, { useEffect, useState } from "react";

const columns = ["name", "domain", "ownerEmail", "status", "createdAt", "plan"];

const storesData = {
  data: [
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
  ],
  pagination: {
    totalPages: 2,
    skip: 0,
    limit: 10,
    total: 10,
  },
};

const plansData = [
  { label: "Basic", value: "basic" },
  { label: "Advance", value: "advance" },
  { label: "Premium", value: "premium" },
];

const Stores = () => {
  const [modalShow, setModalShow] = useState(false);
  const [selectedStore, setSelectedStore] = useState({});
  const [searchValue, setSearchValue] = useState("");
  const [selectedFilters, setSelectedFilters] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [dataLimit, setDataLimit] = useState(10);
  const [dateRange, setDateRange] = useState([null, null]);

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
    <div className="p-6 space-y-4 min-h-[calc(100vh-50px)] flex flex-col">
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
        data={storesData.data}
        actions={actions}
        renderers={renderers}
      />

      <TablePagination
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
        dataLimit={dataLimit}
        setDataLimit={setDataLimit}
        loading={false}
        handleSubmit={handleDataLimit}
        data={storesData}
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
