import axios from "axios";
import { toast } from "react-toastify";
import { Base_URL } from "../../../config";

export const loginUser = async (data, login) => {
    try {
        const apiUrl = `${Base_URL}/login`;
        const response = await axios.post(apiUrl, data);
        const res = response.data;
        if (res?.user?.role !== "superAdmin") {
            throw new Error("Access denied!")
        }
        login({ ...res.user, token: res.token })
        localStorage.setItem("token", JSON.stringify(res.token));
        toast.success("Login Successfully");
        return res;
    } catch (error) {
        toast.error(error?.response?.data?.message || error?.message);
    }
};
