import axios from "axios";
import { Base_URL } from "../../../config";
import { toast } from "react-toastify";

export const fetchEmailSuggest = async (token, setEmailSuggests, setEmailSuggestsLoading, searchValue) => {
    try {
        setEmailSuggestsLoading(true)
        const apiUrl = `${Base_URL}/search/users?searchQuery=${searchValue}`;
        const response = await axios.get(apiUrl, {
            headers: {
                authorization: `Bearer ${token}`
            }
        });
        const emailSuggests = response.data.data;
        setEmailSuggests(emailSuggests)
        return emailSuggests;
    } catch (error) {
        toast.error(error?.response?.data?.message || error?.message);
        setEmailSuggestsLoading(false)
    }
};