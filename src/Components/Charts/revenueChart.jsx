import { AnalyticsContext } from "@/Context/Analytics/analyticsContext";
import dynamic from "next/dynamic";
import React, { useContext } from "react";
import { GrGraphQl } from "react-icons/gr";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const RevenueChart = () => {
  const { analytics } = useContext(AnalyticsContext);
  const { monthlyRevenue } = analytics;

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
        categories: monthlyRevenue?.labels || [], // ✅ backend se labels
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
        data: monthlyRevenue?.data || [], // ✅ backend se data
      },
    ],
  };

  return (
    <div className="bg-white p-6 rounded-xl custom-box-shadow">
      <div className="flex items-end gap-x-2 mb-4 ">
        <GrGraphQl size={25} className="text-primaryC" />
        <p className="font-bold text-textC text-lg leading-[1]">
          Total Revenue
        </p>
      </div>
      {monthlyRevenue?.data?.length > 0 ? (
        <Chart
          options={revenueChart.options}
          series={revenueChart.series}
          type="area"
          height={300}
        />
      ) : (
        <p className="flex justify-center items-center">data not found</p>
      )}
    </div>
  );
};

export default RevenueChart;
