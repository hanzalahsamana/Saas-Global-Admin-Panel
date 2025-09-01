import axios from "axios";
import { toast } from "react-toastify";
import { Base_URL } from "../../../config";

export const toggleUserStatus = async (token, data, updateUserStatus, statusUpdateLoading) => {
    try {
        statusUpdateLoading(true)
        const apiUrl = `${Base_URL}/users/${data?.id}/status-toggle`;
        const response = await axios.put(apiUrl, { status: data?.status }, {
            headers: {
                authorization: `Bearer ${token}`
            }
        });
        const res = response.data;
        updateUserStatus(res.user)
        toast.success(res.message || "User");
        return res;
    } catch (error) {
        toast.error(error?.response?.data?.message || error?.message);
        statusUpdateLoading(false)
    }
};
