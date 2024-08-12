import axios from "axios";
import { redirect } from "react-router-dom";
import ROUTES from "./Settings/ROUTES";

const axiosClient = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`,
  withCredentials: true,
});

axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("xFs_at");
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const { response } = error;
    if (response.status === 404) {
      redirect(ROUTES.error.NOTFOUND);
    }
    // if (response.status === 401) {
    //   localStorage.removeItem("xFs_at");
    //   window.location.reload();
    // } else 

    throw error;
  }
);

export default axiosClient;
