import axios from "axios";
import { toast } from "react-toastify";
import { Base_URL } from "../../../config";

export const toggleInvoiceStatus = async (
  token,
  data,
  updateStatus,
  setLoading
) => {
  try {
    setLoading(true);
    const apiUrl = `${Base_URL}/invoice/${data?.id}/status-toggle`;
    const response = await axios.put(
      apiUrl,
      { status: data?.status },
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );
    const res = response.data;
    updateStatus(res.updatedInvoice);
    toast.success(res.message || "User");
    return res;
  } catch (error) {
    toast.error(error?.response?.data?.message || error?.message);
    setLoading(false);
  }
};
