import { createContext, useContext, useEffect, useState } from "react";
import ROUTES from "../Settings/ROUTES";
import axiosClient from "../axios-clint";
import CookieManager from "../Modules/CookieManager";
import { useStateContext } from "./ContextProvider";

const StateContext = createContext({
	categories: null,
	setCategories: () => {},
})

export const LayoutProvider = ({ children }) => {
	const { setNotification } = useStateContext();
	const cookieManager = new CookieManager();
  const [categories, setCategories] = useState(JSON.parse(localStorage.getItem(cookieManager.getCookie('L_CD'))) || '');

  useEffect(() => {
    if (categories === '') loadCategories();
  }, []);

	const loadCategories = async () => {
		try {
			const res = await axiosClient.get(ROUTES.pages.CATEGORIES);
			if (res.data.status) {
				setCategories(res.data.data);
				setTimeout(() => {
					localStorage.setItem(cookieManager.getCookie('L_CD'), JSON.stringify(res.data.data));
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