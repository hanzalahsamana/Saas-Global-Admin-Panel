"use client";

import React from "react";
import ProtectedRoute from "@/AuthenticRouting/ProtectedRoutes";
import dynamic from "next/dynamic";
import { FcBarChart, FcBullish, FcBusinessman, FcParallelTasks, FcPositiveDynamic, FcSalesPerformance, FcShop } from "react-icons/fc";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

function Home() {
  const summaryStats = [
    { label: "Total Users", value: 1024, icon: <FcBusinessman size={30} /> },
    { label: "Active Stores", value: 870, icon: <FcShop size={30} /> },
    { label: "Total Sales", value: 1532, icon: <FcPositiveDynamic size={30} /> },
    { label: "Suspended Stores", value: 154, icon: <FcShop size={30} /> },
    { label: "Total Revenue", value: "RS.12,340", icon: <FcSalesPerformance size={30} /> },
  ];

  const signupChart = {
    options: {
      chart: {
        type: "bar",
        height: 300,
        toolbar: { show: false },
      },
      plotOptions: {
        bar: {
          borderRadius: 6,
          columnWidth: "45%",
        },
      },
      dataLabels: { enabled: false },
      xaxis: {
        categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
        labels: { style: { colors: "#6B7280" } },
      },
      yaxis: {
        labels: { style: { colors: "#6B7280" } },
      },
      tooltip: { theme: "light" },
      colors: ["#3B82F6"],
    },
    series: [
      {
        name: "Signups",
        data: [20, 40, 65, 50, 70, 90, 110],
      },
    ],
  };

  const planDistribution = {
    options: {
      labels: ["Free", "Basic", "Pro", "Enterprise"],
      colors: ["#F59E0B", "#3B82F6", "#10B981", "#8B5CF6"],
      legend: { position: "bottom" },
    },
    series: [400, 300, 200, 124],
  };

  const revenueChart = {
    options: {
      chart: {
        type: "area",
        height: 300,
        toolbar: { show: false },
      },
      dataLabels: { enabled: false },
      stroke: {
        curve: "smooth",
        width: 3,
      },
      fill: {
        type: "gradient",
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.4,
          opacityTo: 0.1,
          stops: [0, 90, 100],
        },
      },
      xaxis: {
        categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
        labels: { style: { colors: "#6B7280" } },
      },
      yaxis: {
        labels: { style: { colors: "#6B7280" } },
      },
      tooltip: { theme: "light" },
      colors: ["#10B981"],
    },
    series: [
      {
        name: "Revenue (Rs)",
        data: [1200, 1400, 1800, 1500, 2000, 2200, 2400],
      },
    ],
  };

  return (
    <div className="p-6 space-y-8  min-h-screen">
      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {summaryStats.map((stat, idx) => (
          <div
            key={idx}
            className="bg-white p-5 rounded-xl shadow border border-gray-100"
          >
            <p className="">{stat?.icon}</p>
            <p className="text-sm text-gray-500">{stat.label}</p>
            <p className="text-2xl font-semibold text-gray-800">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Monthly Revenue Area Chart */}
        <div className="bg-white p-6 rounded-xl shadow border border-gray-100">
          <div className="flex items-end gap-x-2 mb-4 ">
            <FcBullish size={25} />
            <p className=" font-semibold text-lg leading-tight"> Monthly Revenue</p>
          </div>
          <Chart
            options={revenueChart.options}
            series={revenueChart.series}
            type="area"
            height={300}
          />
        </div>

        {/* Monthly Signups Bar Chart */}
        <div className="bg-white p-6 rounded-xl shadow border border-gray-100">
          <div className="flex items-end gap-x-2 mb-4 ">
            <FcBarChart size={25} />
            <p className=" font-semibold text-lg leading-tight"> Monthly Signups</p>
          </div>
          {/* <h2 className="text-lg font-semibold mb-4">Monthly Signups</h2> */}
          <Chart
            options={signupChart.options}
            series={signupChart.series}
            type="bar"
            height={300}
          />
        </div>

        {/* Plan Distribution Donut */}
        <div className="bg-white p-6 rounded-xl shadow border border-gray-100 md:col-span-2">
          <div className="flex items-end gap-x-2 mb-4 ">
            <FcParallelTasks size={25} />
            <p className=" font-semibold text-lg leading-tight"> Plan Distribution</p>
          </div>
          {/* <h2 className="text-lg font-semibold mb-4">🧑‍💼 Plan Distribution</h2> */}
          <Chart
            options={planDistribution.options}
            series={planDistribution.series}
            type="donut"
            height={320}
          />
        </div>
      </div>
    </div>
  );
}

export default ProtectedRoute(Home);
