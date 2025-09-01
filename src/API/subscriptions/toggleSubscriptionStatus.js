import axios from "axios";
import { toast } from "react-toastify";
import { Base_URL } from "../../../config";

export const toggleSubsStatus = async (token, data, setData, setLoading) => {
    try {
        setLoading(true)
        const apiUrl = `${Base_URL}/subscriptions/${data?.id}/status-toggle`;
        const response = await axios.put(apiUrl, { status: data?.status }, {
            headers: {
                authorization: `Bearer ${token}`
            }
        });
        const res = response.data;
        setData(res?.data)
        toast.success(res?.message || `Subscription ${data?.status} successfully!`);
        return res;
    } catch (error) {
        toast.error(error?.response?.data?.message || error?.message);
        setLoading(false)
    }
};
