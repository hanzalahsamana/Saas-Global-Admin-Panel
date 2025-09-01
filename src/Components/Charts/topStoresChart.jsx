import { AnalyticsContext } from "@/Context/Analytics/analyticsContext";
import dynamic from "next/dynamic";
import React, { useContext } from "react";
import { FaChartSimple } from "react-icons/fa6";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const TopStoresChart = () => {
  const { analytics } = useContext(AnalyticsContext);
  const { topStores } = analytics;

  const topStoresChart = {
    options: {
      labels: topStores?.labels,
      colors: [
        "var(--primaryC)",
        "var(--accentC)",
        "var(--hoverC)",
        "var(--primaryC)",
        "var(--accentC)",
      ],
      legend: { position: "bottom" },
    },
    series: topStores?.data,
  };
  return (
    <div className="bg-white p-6 rounded-xl custom-box-shadow">
      <div className="flex items-end gap-x-2 mb-4">
        <FaChartSimple size={26} className="text-primaryC" />
        <p className="font-bold text-textC text-lg leading-[1]">Top Stores</p>
      </div>
      <Chart
        options={topStoresChart?.options}
        series={topStoresChart?.series}
        type="donut"
        height={320}
      />
    </div>
  );
};

export default TopStoresChart;
