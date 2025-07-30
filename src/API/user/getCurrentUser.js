import axios from "axios";
import { Base_URL } from "../../../config";
import { toast } from "react-toastify";

export const getCurrentUser = async (token, setUserLoading, login) => {
    try {
        const apiUrl = `${Base_URL}/getUserFromToken`;
        const response = await axios.get(apiUrl, {
            headers: {
                authorization: `Bearer ${token}`
            }
        });
        const user = response.data.user;
        login(user)
        return user;
    } catch (error) {
        toast.error(error?.response?.data?.message || error?.message);
        setUserLoading(false)
    }
};
