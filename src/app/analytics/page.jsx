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
  const [dateRange, setDateRange] = useState([null, null]);

  const {
    handleAnalyticsLoading,
    handleAnalytics,
    analytics,
    analyticsLoading,
  } = useContext(AnalyticsContext);
  const { currentUser } = useContext(AuthContext);

  const token = currentUser?.token;
  useEffect(() => {
    const getAnalytics = async () => {
      await fetchAnalytics(
        handleAnalyticsLoading,
        handleAnalytics,
        token,
        dateRange[0] && dateRange[1]
          ? `${new Date(dateRange[0]).toDateString().slice(4, 15)} - ${new Date(
              dateRange[1]
            )
              .toDateString()
              .slice(4, 15)}`
          : ""
      );
    };

    getAnalytics();
  }, [dateRange[1]]);

  return (
    <div className="p-6 space-y-8  min-h-[calc(100vh-50px)]">
      <>
        <div className="flex">
          <div className="">
            <Datepicker
              dateRange={dateRange}
              setDateRange={setDateRange}
              placeholderText="Select Date"
            />
          </div>
        </div>
        {/* Charts */}
        {analyticsLoading ? (
          <Loader height="h-[calc(100vh-100px)]" />
        ) : !Object.keys(analytics)?.length === 0 ? (
          <div>Data not found</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <RevenueChart />
            <TopStoresChart />
            <SubscriptionChart />
            <SignupChart />
          </div>
        )}
      </>
    </div>
  );
};

export default ProtectedRoute(Analytics);
