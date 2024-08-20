import { createContext, useContext, useEffect, useState } from "react";
import { useNotification } from "./NotificationProvider";

import ROUTES from "../Settings/ROUTES";
import axiosClient from "../axios-clint";
import CookieManager from "../Modules/CookieManager";

const StateContext = createContext({
	categories: null,
	setCategories: () => {},
})

export const LayoutProvider = ({ children }) => {
	const { setNotification } = useNotification();
	const cookieManager = new CookieManager();
	const layoutCookie = cookieManager.getCookie('L_CD') ?? 'L_CD';
  const [categories, setCategories] = useState(JSON.parse(localStorage.getItem(layoutCookie)) || '');

  useEffect(() => {
    if (categories === '') loadCategories();
  }, []);

	const loadCategories = async () => {
		try {
			const res = await axiosClient.get(ROUTES.pages.CATEGORIES);
			
			if (res.data.status) {
				const cookie = cookieManager.getCookie('L_CD');
				setCategories(res.data.data);
				setTimeout(() => {
					localStorage.setItem(cookie ?? 'L_CD', JSON.stringify(res.data.data));
				}, 200);
			}
		} catch (err) {
			const { message } = err?.response?.data;
			setNotification({
				visible : true,
				status : 'e',
				msg : message,
			})
		}
	};
	
	if (categories === '') return;

	return (
		<StateContext.Provider value={{
			categories,
			setCategories,
		}}>
			{ children }
		</StateContext.Provider>
	)
}

export const useLayoutContext = () => useContext(StateContext);