import { AnalyticsContext } from "@/Context/Analytics/analyticsContext";
import dynamic from "next/dynamic";
import React, { useContext } from "react";
import { SiGoogleanalytics } from "react-icons/si";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const SignupChart = () => {
  const { analytics } = useContext(AnalyticsContext);
  const { monthlySignups } = analytics;
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
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
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
        data: monthlySignups,
      },
    ],
  };
  return (
    <div>
      <div className="bg-white p-6 rounded-xl custom-box-shadow">
        <div className="flex items-end gap-x-2 mb-4 ">
          <SiGoogleanalytics size={22} className="text-primaryC" />
          <p className=" font-bold text-textC text-lg leading-[0.9]">
            {" "}
            Monthly Signups
          </p>
        </div>
        <Chart
          options={signupChart?.options}
          series={signupChart?.series}
          type="bar"
          height={300}
        />
      </div>
    </div>
  );
};

export default SignupChart;
