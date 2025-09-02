"use client";

import React, { useContext, useEffect } from "react";
import ProtectedRoute from "@/AuthenticRouting/ProtectedRoutes";
import dynamic from "next/dynamic";
import { FaUser } from "react-icons/fa";
import { BiSolidStore } from "react-icons/bi";
import { SiGoogleanalytics } from "react-icons/si";
import { GiTwoCoins } from "react-icons/gi";
import { fetchAnalytics } from "@/API/Analytics/getAnalytics";
import { AnalyticsContext } from "@/Context/Analytics/analyticsContext";
import Loader from "@/Components/Loader/loader";
import { AuthContext } from "@/Context/Authentication/AuthContext";
import SignupChart from "@/Components/Charts/signupChart";
import SubscriptionChart from "@/Components/Charts/subscriptionChart";
import TopStoresChart from "@/Components/Charts/topStoresChart";
import RevenueChart from "@/Components/Charts/revenueChart";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

function Home() {
  const { currentUser } = useContext(AuthContext)

  const { handleAnalyticsLoading, handleAnalytics, analytics, analyticsLoading } = useContext(AnalyticsContext);
  const { activeStores, suspendedStores, totalRevenue, totalSales, users } = analytics

  useEffect(() => {
    const token = currentUser?.token
    const getAnalytics = async () => {
      await fetchAnalytics(handleAnalyticsLoading, handleAnalytics, token,"")
    }
    getAnalytics()
  }, [])




  const summaryStats = [
    { label: "Total Users", value: users, icon: <FaUser size={23} /> },
    { label: "Active Stores", value: activeStores, icon: <BiSolidStore size={25} /> },
    { label: "Total Sales", value: totalSales, icon: <SiGoogleanalytics size={23} /> },
    { label: "Suspended Stores", value: suspendedStores, icon: <BiSolidStore size={25} /> },
    { label: "Total Revenue", value: `RS.${totalRevenue}`, icon: <GiTwoCoins size={25} /> },
  ];
  return (
    <div className="p-6 space-y-8  min-h-[calc(100vh-50px)]">
      {analyticsLoading ? <Loader /> : !Object.keys(analytics)?.length === 0 ? <div>Data not found</div> :
        <>
          {/* Summary Cards */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {summaryStats.map((stat, idx) => (
              <div
                key={idx}
                className="bg-accentC p-5 rounded-xl border border-primaryC"
              >
                <p className="text-secondaryC mb-2">{stat?.icon}</p>
                <p className="text-sm text-secondaryC">{stat.label}</p>
                <p className="text-2xl font-semibold text-secondaryC">{stat.value}</p>
              </div>
            ))}
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Monthly Revenue Area Chart */}
            <RevenueChart />

            {/* Top 5 Stores by Sales */}
            <TopStoresChart />

            {/* Plan Distribution Donut */}
            <SubscriptionChart />

            {/* Monthly Signups Bar Chart */}
            <SignupChart />
          </div>
        </>}

    </div>
  );
}

export default ProtectedRoute(Home);
