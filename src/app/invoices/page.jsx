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
import { fetchEmailSuggest } from "@/API/SearchSuggest/getEmailSuggest";
import { EmailSuggestContext } from "@/Context/SearchSuggest/emailSuggestContext";
import { AuthContext } from "@/Context/Authentication/AuthContext";
import { InvoiceContext } from "@/Context/Invoices/invoiceContext";
import { fetchInvoices } from "@/API/Invoices/getInvoices";
import { toggleInvoiceStatus } from "@/API/Invoices/toggleInvoiceStatus";

const columns = [
  { key: "serial", label: "No" },
  { key: "_id", label: "Invoice Id" },
  { key: "email", label: "Email" },
  { key: "status", label: "Status" },
  { key: "createdAt", label: "Created At", type: "date" },
  { key: "amount", label: "Amount" },
  { key: "imageUrl", label: "Image" },
];

const statusRenderer = ({ value }) => {
  const statusColors = {
    paid: "bg-green-100 text-green-700",
    failed: "bg-red-100 text-red-600",
    pending: "bg-[#F2E4A0] text-[#A16213]",
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
  { label: "Failed", value: "failed" },
  { label: "Pending", value: "pending" },
  { label: "Paid", value: "paid" },
];

const Invoices = () => {
  // hooks
  const router = useRouter();
  const [modalShow, setModalShow] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState({});
  const [searchValue, setSearchValue] = useState("");
  const [dataLimit, setDataLimit] = useState(10);
  const [selectedFilters, setSelectedFilters] = useState({
    limit: dataLimit,
    page: 1,
  });
  const [dateRange, setDateRange] = useState([null, null]);

  const {
    invoices,
    invoiceLoading,
    pagination,
    handleInvoices,
    setInvoiceLoading,
    updateInvoiceStatus,
    invoiceStatusLoading,
    setInvoiceStatusLoading,
  } = useContext(InvoiceContext);
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
  const tableActions = (data) => {
    const status = data?.status;
    const labels = ["Paid", "Failed"];
    return labels.map((label) => ({
      label,
      onClick: (row) => {
        setModalShow(true);
        setSelectedInvoice(row);
      },
      disabled:
        (status === "paid" && label === "Paid") ||
        (status === "failed" && label === "Failed"),
    }));
  };

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

  const getInvoices = useCallback(async () => {
    await fetchInvoices(
      token,
      setInvoiceLoading,
      handleInvoices,
      selectedFilters
    );
  }, [selectedFilters]);

  useEffect(() => {
    getInvoices();
  }, [getInvoices]);

  const handleDataLimit = () => {
    handleSelectFilter({ limit: dataLimit });
  };

  const handleStatusChange = async () => {
    if (selectedInvoice?._id && modalShow) {
      await toggleInvoiceStatus(
        token,
        {
          id: selectedInvoice?._id,
          status: selectedInvoice?.label,
        },
        updateInvoiceStatus,
        setInvoiceStatusLoading
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
        data={invoices}
        actions={tableActions}
        renderers={{
          status: statusRenderer,
        }}
        loading={invoiceLoading}
      />
      <TablePagination
        setCurrentPage={(page) => handleSelectFilter({ page })}
        currentPage={selectedFilters?.page}
        dataLimit={dataLimit}
        setDataLimit={setDataLimit}
        loading={invoiceLoading}
        handleSubmit={handleDataLimit}
        data={{ pagination, data: invoices }}
      />
      <ConfirmationModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        content={`You want to ${
          selectedInvoice?.status === "Active" ? "Suspend" : "Active"
        } this user`}
        heading={"Confirm Please"}
        contentHeading="Are you sure?"
        handleConfirm={handleStatusChange}
        loading={invoiceStatusLoading}
      />
    </div>
  );
};

export default ProtectedRoute(Invoices);
