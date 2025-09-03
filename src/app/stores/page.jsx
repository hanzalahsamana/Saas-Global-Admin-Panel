"use client";
import { fetchStoresSuggest } from "@/API/SearchSuggest/getStoresName";
import { fetchStores } from "@/API/Stores/getStores";
import { toggleStoreStatus } from "@/API/Stores/toggleStoreStatus";
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
import { StoresContext } from "@/Context/Stores/storesContext";
import React, { useCallback, useContext, useEffect, useState } from "react";

const columns = [
  { key: "_id", label: "Store Id" },
  { key: "storeName", label: "Store Name" },
  { key: "email", label: "Created At" },
  { key: "createdAt", label: "Created At" },
  { key: "storeStatus", label: "Store Status" },
  { key: "subscriptionStatus", label: "Subscription Status" },
];

const subscriptionStatus = [
  { label: "Trial", value: "trial" },
  { label: "Trial Expired", value: "trial expired" },
  { label: "Pending", value: "pending" },
  { label: "Active", value: "active" },
  { label: "Cancelled", value: "cancelled" },
];

const renderers = {
  storeStatus: ({ value }) => {
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
        {value || "-"}
      </span>
    );
  },
  subscriptionStatus: ({ value }) => {
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
          statusColors[value] || "text-textC"
        }`}
      >
        {value || "-"}
      </span>
    );
  },
};

const Stores = () => {
  const [modalShow, setModalShow] = useState(false);
  const [selectedStore, setSelectedStore] = useState({});
  const [searchValue, setSearchValue] = useState("");
  const [dataLimit, setDataLimit] = useState(10);
  const [selectedFilters, setSelectedFilters] = useState({
    limit: dataLimit,
    page: 1,
  });
  const [dateRange, setDateRange] = useState([null, null]);
  const {
    stores,
    handleSetStores,
    storesLoading,
    handleSetStoresLoading,
    pagination,
    setPagination,
    updateStoreStatus,
    storeStatusLoading,
    setStoreStatusLoading,
  } = useContext(StoresContext);
  const {
    storesSuggests,
    storesSuggestsLoading,
    handleStoresSuggests,
    setStoresSuggestsLoading,
  } = useContext(StoresSuggestContext);
  const { currentUser } = useContext(AuthContext);
  const { token } = currentUser;

  const actions = (store) => [
    {
      label: store?.storeStatus === "Suspended" ? "Active" : "Suspend",
      onClick: (row) => {
        setModalShow(true);
        setSelectedStore(row);
      },
    },
  ];

  const handlePlanSelect = (value) => {
    handleSelectFilter({ plan: value });
  };

  const handleSearch = async (value) => {
    setSearchValue(value);
  };

  const handleSelectFilter = async (data) => {
    setSelectedFilters((prev) => ({ ...prev, page: 1, ...data }));
  };

  const handleSubmit = async () => {
    handleSelectFilter({ storeName: searchValue });
  };

  const handleFilterRemove = (filter) => {
    const { [filter]: deleted, ...newState } = selectedFilters;
    if (filter === "dateRange") {
      setDateRange([null, null]);
    }
    if (filter === "storeName") {
      setSearchValue("");
    }
    setSelectedFilters({ ...newState, page: 1 });
  };

  const handleClearAll = (filter) => {
    setDateRange([null, null]);
    setSearchValue("");
    setSelectedFilters({ limit: dataLimit, page: 1 });
  };

  const getStores = useCallback(async () => {
    await fetchStores(
      token,
      handleSetStoresLoading,
      setPagination,
      handleSetStores,
      selectedFilters
    );
  }, [selectedFilters]);

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

  useEffect(() => {
    getStores();
  }, [getStores]);

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
      handleSelectFilter({ ...filterValues });
    }
  }, [dateRange]);

  const handleDataLimit = () => {
    handleSelectFilter({ limit: dataLimit });
  };

  const handleStatusChange = async () => {
    await toggleStoreStatus(
      token,
      {
        id: selectedStore?._id,
        status:
          selectedStore?.storeStatus === "Active" ? "Suspended" : "Active",
      },
      updateStoreStatus,
      setStoreStatusLoading
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
          placeholder="Filter by Store Name..."
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
            dropdownData={subscriptionStatus}
            dropdownHeading={
              selectedFilters.plan
                ? selectedFilters?.plan
                : "Subscription Status"
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
        data={stores}
        actions={actions}
        renderers={renderers}
        loading={storesLoading}
      />

      <TablePagination
        setCurrentPage={(page) =>
          // setSelectedFilters((prev) => ({ ...prev, page }))
          handleSelectFilter({ page })
        }
        currentPage={selectedFilters?.page}
        dataLimit={dataLimit}
        setDataLimit={setDataLimit}
        loading={storesLoading}
        handleSubmit={handleDataLimit}
        data={{ pagination, data: stores }}
      />
      <ConfirmationModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        content={`You want to ${
          selectedStore?.storeStatus === "Active" ? "Suspend" : "Active"
        } this store`}
        heading={"Confirm Please"}
        contentHeading="Are you sure?"
        handleConfirm={handleStatusChange}
        loading={storeStatusLoading}
      />
    </div>
  );
};

export default ProtectedRoute(Stores);
