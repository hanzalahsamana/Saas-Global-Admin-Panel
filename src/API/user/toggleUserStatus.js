import axios from "axios";
import { toast } from "react-toastify";
import { Base_URL } from "../../../config";

export const toggleUserStatus = async (token, id, updateUserStatus, statusUpdateLoading) => {
    try {
        statusUpdateLoading(true)
        const apiUrl = `${Base_URL}/users/${id}/status-toggle`;
        const response = await axios.put(apiUrl, {}, {
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
