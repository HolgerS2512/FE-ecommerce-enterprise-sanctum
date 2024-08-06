import axiosClient from "../axios-clint";

export const FetchAsync = async (route) => {
  try {
    const res = await axiosClient.get(route);
    if (res?.data) {
      return res.data;
    }
  } catch (err) {
    const { message } = err?.response?.data;
    throw new Error(message);
  }
};