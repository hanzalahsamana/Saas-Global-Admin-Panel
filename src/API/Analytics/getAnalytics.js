import axios from "axios";
import { Base_URL } from "../../../config";
import { toast } from "react-toastify";

export const fetchAnalytics = async (handleAnalyticsLoading, handleAnalytics, token, dateRange) => {
    try {
        handleAnalyticsLoading(true)
        const apiUrl = `${Base_URL}/get/analytics/data?dateRange=${dateRange}`;
        const response = await axios.get(apiUrl, {
            headers: {
                authorization: `Bearer ${token}`
            }
        });
        const analytics = response.data;
        console.log("analytics", analytics)
        handleAnalytics(analytics.data)
        return analytics;
    } catch (error) {
        toast.error(error?.response?.data?.message || error?.message);
        handleAnalyticsLoading(false)
    }
};
