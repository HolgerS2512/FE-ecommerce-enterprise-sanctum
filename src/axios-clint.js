import axios from "axios";
import { redirect } from "react-router-dom";
import ROUTES from "./Settings/ROUTES";
import CookieManager from "./Modules/CookieManager";
import { CookieSlug } from "./Settings/Cookies";

const cookieManager = new CookieManager();

const axiosClient = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`,
  withCredentials: true,
  headers: {
    Accept: "application/json",
  },
});

// Get cookie CSRF-Token from Sanctum
const getCsrfToken = async (token) => {
  try {
    const res = await axios.get(
      `${import.meta.env.VITE_API_BASE_URL}/sanctum/csrf-cookie`,
      { withCredentials: true, }
    );
    const { request, status } = res;
    const { readyState } = request;

    if (status === 204 && readyState === 4) {
      token = cookieManager.getCookie(CookieSlug.csrf);
    }
  } catch (error) {
    console.error("GET Error CSRF-Token:", error);
  }
};

axiosClient.interceptors.request.use(
  async (config) => {
    let csrfToken = cookieManager.getCookie(CookieSlug.csrf);
    
    if (!csrfToken) {
      await getCsrfToken(csrfToken);
    }

    const bearerToken = localStorage.getItem(CookieSlug.auth);

    if (csrfToken) {
      config.headers["X-XSRF-TOKEN"] = csrfToken;
    }

    if (bearerToken) {
      config.headers["Authorization"] = `Bearer ${bearerToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

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
      localStorage.removeItem(CookieSlug.auth);
    }

    throw error;
  }
);

export default axiosClient;
