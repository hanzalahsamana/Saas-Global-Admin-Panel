import axios from "axios";
import { Base_URL } from "../../../config";
import { toast } from "react-toastify";

export const fetchStoresSuggest = async (token, setStoresName, setLoading, searchQuery) => {
    try {
        setLoading(true)
        const apiUrl = `${Base_URL}/search/stores?searchQuery=${searchQuery}`;
        const response = await axios.get(apiUrl, {
            headers: {
                authorization: `Bearer ${token}`
            }
        });
        const storesNames = response.data.data;
        setStoresName(storesNames)
        return storesNames;
    } catch (error) {
        toast.error(error?.response?.data?.message || error?.message);
        setLoading(false)
    }
};