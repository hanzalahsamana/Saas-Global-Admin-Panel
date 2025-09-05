import axios from "axios";
import { Base_URL } from "../../../config";
import { toast } from "react-toastify";

export const fetchUsers = async (token, setUsersLoading, setPagination, setUsers, selectedFilters) => {
    setUsersLoading(true)
    try {
        const query = new URLSearchParams(selectedFilters).toString();
        const apiUrl = `${Base_URL}/get/users?${query}`;
        const response = await axios.get(apiUrl, {
            headers: {
                authorization: `Bearer ${token}`
            }
        });
        const users = response.data;
        setUsers(users.data)
        setPagination(users.pagination)
        return users;
    } catch (error) {
        toast.error(error?.response?.data?.message || error?.message);
        setUsersLoading(false)
    }
};