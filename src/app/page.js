"use client";

import React from "react";
import ProtectedRoute from "@/AuthenticRouting/ProtectedRoutes";
import dynamic from "next/dynamic";
import { FcBarChart, FcBullish, FcBusinessman, FcParallelTasks, FcPositiveDynamic, FcSalesPerformance, FcShop } from "react-icons/fc";
import { FaRegChartBar, FaUser } from "react-icons/fa";
import { BiSolidStore } from "react-icons/bi";
import { SiGoogleanalytics } from "react-icons/si";
import { GiTwoCoins } from "react-icons/gi";
import { SlGraph } from "react-icons/sl";
import { GrGraphQl } from "react-icons/gr";
import { PiGraphFill } from "react-icons/pi";
import { FaChartSimple } from "react-icons/fa6";





const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const summaryStats = [
  { label: "Total Users", value: 1024, icon: <FaUser size={23} /> },
  { label: "Active Stores", value: 870, icon: <BiSolidStore size={25} /> },
  { label: "Total Sales", value: 1532, icon: <SiGoogleanalytics size={23} /> },
  { label: "Suspended Stores", value: 154, icon: <BiSolidStore size={25} /> },
  { label: "Total Revenue", value: "RS.12,340", icon: <GiTwoCoins size={25} /> },
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
      labels: { style: { colors: "var(--primaryC)" } },
    },
    yaxis: {
      labels: { style: { colors: "var(--primaryC)" } },
    },
    tooltip: { theme: "light" },
    colors: ["var(--accentC)"],
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
    colors: ["var(--primaryC)", "var(--accentC)", "var(--hoverC)", "var(--accentC)"],
    legend: { position: "bottom" },
  },
  series: [400, 300, 200, 124],
};
const topStoresChart = {
  options: {
    labels: ["Store A", "Store B", "Store C", "Store D", "Store E"],
    colors: ["var(--primaryC)", "var(--accentC)", "var(--hoverC)", "var(--primaryC)", "var(--accentC)"],
    legend: { position: "bottom" },
  },
  series: [600, 400, 200, 150, 100],
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
      labels: { style: { colors: "var(--primaryC)" } },
    },
    yaxis: {
      labels: { style: { colors: "var(--primaryC)" } },
    },
    tooltip: { theme: "light" },
    colors: ["var(--accentC)"],
  },
  series: [
    {
      name: "Revenue (Rs)",
      data: [1200, 1400, 1800, 1500, 2000, 2200, 2400],
    },
  ],
};
function Home() {

  return (
    <div className="p-6 space-y-8  min-h-screen">
      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {summaryStats.map((stat, idx) => (
          <div
            key={idx}
            className="bg-primaryC p-5 rounded-xl border border-accentC"
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
        <div className="bg-white p-6 rounded-xl custom-box-shadow">
          <div className="flex items-end gap-x-2 mb-4 ">
            <GrGraphQl size={25} className="text-primaryC" />
            <p className="font-bold text-textC text-lg leading-[1]"> Monthly Revenue</p>
          </div>
          <Chart
            options={revenueChart.options}
            series={revenueChart.series}
            type="area"
            height={300}
          />
        </div>

        {/* Top 5 Stores by Sales */}
        <div className="bg-white p-6 rounded-xl custom-box-shadow">
          <div className="flex items-end gap-x-2 mb-4">
            <FaChartSimple size={26} className="text-primaryC" />
            <p className="font-bold text-textC text-lg leading-[1]">Top Stores</p>
          </div>
          <Chart
            options={topStoresChart.options}
            series={topStoresChart.series}
            type="donut"
            height={320}
          />
        </div>

        {/* Plan Distribution Donut */}
        <div className="bg-white p-6 rounded-xl custom-box-shadow">
          <div className="flex items-end gap-x-2 mb-4 ">
            <PiGraphFill size={30} className="text-primaryC" />
            <p className=" font-bold text-textC text-lg"> Plan Distribution</p>
          </div>
          <Chart
            options={planDistribution.options}
            series={planDistribution.series}
            type="donut"
            height={320}
          />
        </div>

        {/* Monthly Signups Bar Chart */}
        <div className="bg-white p-6 rounded-xl custom-box-shadow">
          <div className="flex items-end gap-x-2 mb-4 ">
            <SiGoogleanalytics size={22} className="text-primaryC" />
            <p className=" font-bold text-textC text-lg leading-[0.9]"> Monthly Signups</p>
          </div>
          <Chart
            options={signupChart.options}
            series={signupChart.series}
            type="bar"
            height={300}
          />
        </div>

      </div>
    </div>
  );
}

export default ProtectedRoute(Home);
