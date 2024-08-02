import axiosClient from "../axios-clint";
import ROUTES from "../Settings/ROUTES";

export const FetchUser = async () => {
  try {
    const res = await axiosClient.get(ROUTES.account.PROFILE);
    if (res?.data) {
      return res.data;
    }
  } catch (err) {
    const { message } = err?.response?.data;
    throw new Error(message);
  }
};
