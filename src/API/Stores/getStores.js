import axios from "axios";
import { Base_URL } from "../../../config";
import { toast } from "react-toastify";

export const fetchStores = async (token, setStoresLoading, setStoresPagination, setStores, selectedFilters) => {
    setStoresLoading(true)
    try {
        const query = new URLSearchParams(selectedFilters).toString();
        const apiUrl = `${Base_URL}/get/stores?${query}`;
        const response = await axios.get(apiUrl, {
            headers: {
                authorization: `Bearer ${token}`
            }
        });
        const stores = response.data;
        setStores(stores.data)
        setStoresPagination(stores.pagination)
        return stores;
    } catch (error) {
        toast.error(error?.response?.data?.message || error?.message);
        setStoresLoading(false)
    }
};