import axios from "axios";
import { redirect } from "react-router-dom";
import ROUTES from "./Settings/ROUTES";
// import CookieManager from "./Modules/CookieManager";

const axiosClient = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`,
  withCredentials: true,
});

axiosClient.interceptors.request.use((config) => {
  // const cookieManager = new CookieManager();
  const token = localStorage.getItem("xFs_at");
  // const CSRF_TOKEN = cookieManager.getCookie('xFs_csL');

  config.headers.Authorization = `Bearer ${token}`;
  // config.headers['X-CSRF-TOKEN'] = CSRF_TOKEN;
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

    if (response.status === 401) {
      localStorage.removeItem("xFs_at");
    }

    throw error;
  }
);

export default axiosClient;
