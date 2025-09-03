import axios from "axios";
import { Base_URL } from "../../../config";
import { toast } from "react-toastify";

export const fetchInvoices = async (token, setLoading, setData, filters) => {
  setLoading(true);
  try {
    const query = new URLSearchParams(filters).toString();
    const apiUrl = `${Base_URL}/get/invoices?${query}`;
    const response = await axios.get(apiUrl, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    const invoices = response.data;
    setData({
      invoices: invoices?.data,
      pagination: invoices?.pagination,
    });
    return invoices;
  } catch (error) {
    toast.error(error?.response?.data?.message || error?.message);
    setLoading(false);
  }
};
