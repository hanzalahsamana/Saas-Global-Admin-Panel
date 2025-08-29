import axios from "axios";
import { toast } from "react-toastify";
import { Base_URL } from "../../../config";

export const toggleStoreStatus = async (token, data, updatedStoreData, statusUpdateLoading) => {
    try {
        statusUpdateLoading(true)
        const apiUrl = `${Base_URL}/stores/${data?.id}/status-toggle?status=${data?.status}`;
        const response = await axios.put(apiUrl, {}, {
            headers: {
                authorization: `Bearer ${token}`
            }
        });
        const res = response.data;
        updatedStoreData(res?.updatedStore)
        toast.success(res?.message || `Store ${data?.status} successfully!`);
        return res;
    } catch (error) {
        toast.error(error?.response?.data?.message || error?.message);
        statusUpdateLoading(false)
    }
};
