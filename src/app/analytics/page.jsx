"use client";
import { fetchAnalytics } from "@/API/Analytics/getAnalytics";
import ProtectedRoute from "@/AuthenticRouting/ProtectedRoutes";
import { Datepicker } from "@/Components/Actions/DatePicker";
import CustomDropdown from "@/Components/Actions/DropDown";
import SelectedFilters from "@/Components/Actions/SelectedFilters";
import RevenueChart from "@/Components/Charts/revenueChart";
import SignupChart from "@/Components/Charts/signupChart";
import SubscriptionChart from "@/Components/Charts/subscriptionChart";
import TopStoresChart from "@/Components/Charts/topStoresChart";
import Loader from "@/Components/Loader/loader";
import { AnalyticsContext } from "@/Context/Analytics/analyticsContext";
import { AuthContext } from "@/Context/Authentication/AuthContext";
import React, { useContext, useEffect, useState } from "react";

const Analytics = () => {
  const [selectedFilters, setSelectedFilters] = useState({});
  const [dateRange, setDateRange] = useState([null, null]);

  const {
    handleAnalyticsLoading,
    handleAnalytics,
    analytics,
    analyticsLoading,
  } = useContext(AnalyticsContext);
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const token = currentUser?.token;
    const getAnalytics = async () => {
      await fetchAnalytics(handleAnalyticsLoading, handleAnalytics, token);
    };
    getAnalytics();
  }, []);

  const dateRangeOptions = [
    { label: "Last Year", value: "lastYear" },
    { label: "Last Month", value: "lastMonth" },
    { label: "Last 7 Days", value: "last7Days" },
  ];
  const handleSelectFilter = (data) => {
    setSelectedFilters((prev) => ({ ...prev, page: 1, ...data }));
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
  return (
    <div className="p-6 space-y-8  min-h-[calc(100vh-50px)]">
      {analyticsLoading ? (
        <Loader height="h-[calc(100vh-100px)]" />
      ) : !Object.keys(analytics)?.length === 0 ? (
        <div>Data not found</div>
      ) : (
        <>
          <div className="flex gap-2 iems-center">
            <div>
              <Datepicker
                dateRange={dateRange}
                setDateRange={setDateRange}
                placeholderText="Select Date"
              />
            </div>
            <CustomDropdown
              dropdownData={dateRangeOptions}
              dropdownHeading={
                selectedFilters?.datePeriod
                  ? selectedFilters?.datePeriod
                  : "Select Period"
              }
              handleClick={(value) => {
                handleSelectFilter({ datePeriod: value });
              }}
            />
          </div>
          <SelectedFilters
            selectedFilters={selectedFilters}
            handleRemove={handleFilterRemove}
            handleClearAll={handleClearAll}
          />
          {/* Charts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <RevenueChart />
            <TopStoresChart />
            <SubscriptionChart />
            <SignupChart />
          </div>
        </>
      )}
    </div>
  );
};

export default ProtectedRoute(Analytics);
