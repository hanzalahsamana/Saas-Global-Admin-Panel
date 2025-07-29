import axios from "axios";
import { Base_URL } from "../../../config";
import { toast } from "react-toastify";

export const fetchAnalytics = async (handleAnalyticsLoading, handleAnalytics) => {
    try {
        handleAnalyticsLoading(true)
        const apiUrl = `${Base_URL}/get/analytics/data`;
        const response = await axios.get(apiUrl);
        const analytics = response.data;
        handleAnalytics(analytics.data)
        return analytics;
    } catch (error) {
        toast.error(error?.response?.data?.message || error?.message);
        handleAnalyticsLoading(false)
    }
};
