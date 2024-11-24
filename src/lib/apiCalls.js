import axios from "axios";

export const getCompanies = async () => {
    const response = await axios.get(
        import.meta.env.VITE_API_URL + "companies",
    );
    return response.data;
};