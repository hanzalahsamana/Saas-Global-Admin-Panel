import { AnalyticsContext } from "@/Context/Analytics/analyticsContext";
import dynamic from "next/dynamic";
import React, { useContext } from "react";
import { PiGraphFill } from "react-icons/pi";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const SubscriptionChart = () => {
    const { analytics } = useContext(AnalyticsContext);
    const { subscriptionPlan, } = analytics;
    const planDistribution = {
        options: {
            labels: subscriptionPlan?.labels,
            colors: ["var(--primaryC)", "var(--accentC)", "var(--hoverC)", "var(--accentC)"],
            legend: { position: "bottom" },
        },
        series: subscriptionPlan?.data,
    };
    return (
        <div className="bg-white p-6 rounded-xl custom-box-shadow">
            <div className="flex items-end gap-x-2 mb-4 ">
                <PiGraphFill size={30} className="text-primaryC" />
                <p className=" font-bold text-textC text-lg"> Plan Distribution</p>
            </div>
            <Chart
                options={planDistribution?.options}
                series={planDistribution?.series}
                type="donut"
                height={320}
            />
        </div>
    );
};

export default SubscriptionChart;
