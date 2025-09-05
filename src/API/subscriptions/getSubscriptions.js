import axios from "axios";
import { Base_URL } from "../../../config";
import { toast } from "react-toastify";

export const fetchSubscriptions = async (
  token,
  setLoading,
  setData,
  filters
) => {
  setLoading(true);
  try {
    const query = new URLSearchParams(filters).toString();
    const apiUrl = `${Base_URL}/get/subscriptions?${query}`;
    const response = await axios.get(apiUrl, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    const subscriptions = response.data;
    setData({
      subscriptions: subscriptions?.data,
      pagination: subscriptions?.pagination,
      counts: subscriptions?.counts,
    });
    return subscriptions;
  } catch (error) {
    toast.error(error?.response?.data?.message || error?.message);
    setLoading(false);
  }
};
