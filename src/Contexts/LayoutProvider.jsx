import { createContext, useContext, useEffect, useState } from "react";
import { useNotification } from "./NotificationProvider";

import ROUTES from "../Settings/ROUTES";
import axiosClient from "../axios-clint";
import CookieManager from "../Modules/CookieManager";

const StateContext = createContext({
	categories: null,
	products: null,
	setProducts: () => {},
	setCategories: () => {},
})

export const LayoutProvider = ({ children }) => {
	const { setNotification } = useNotification();
	const cookieManager = new CookieManager();
	const layoutCategoryCookie = cookieManager.getCookie('L_CD') ?? 'L_CD';
	const layoutProductCookie = cookieManager.getCookie('AA_PvAC') ?? 'AA_PvAC';
  const [categories, setCategories] = useState(JSON.parse(localStorage.getItem(layoutCategoryCookie)) || []);
  const [products, setProducts] = useState(JSON.parse(localStorage.getItem(layoutProductCookie)) || []);
	const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (!Boolean(categories.length)) ? loadCategories() : setIsLoading(false);
		setTimeout(loadProducts, 20);
  }, []);

	const loadCategories = async () => {
		try {
			const res = await axiosClient.get(ROUTES.request.CATEGORIES);
			
			if (res.data.status) {
				const cookie = cookieManager.getCookie('L_CD');
				setCategories(res.data.data);
				setTimeout(() => {
					localStorage.setItem(cookie ?? 'L_CD', JSON.stringify(res.data.data));
				}, 200);
			}
			setIsLoading(false);
		} catch (err) {
			const { message } = err?.response?.data;
			setNotification({
				visible : true,
				status : 'e',
				msg : message,
			})
		}
	};

	const loadProducts = async () => {
		// console.log(categories)
		return;
		try {
			const res = await axiosClient.get(ROUTES.request.PRODUCTS);
			
			if (res.data.status) {
				const cookie = cookieManager.getCookie('AA_PvAC');
				setProducts(res.data.data);
				setTimeout(() => {
					localStorage.setItem(cookie ?? 'AA_PvAC', JSON.stringify(res.data.data));
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

	// if (FEHLER BEIM LADEN) then Http error class visible, not setNotification!
	
	if (isLoading) return;

	return (
		<StateContext.Provider value={{
			categories,
			products,
			setProducts,
			setCategories,
		}}>
			{ children }
		</StateContext.Provider>
	)
}

export const useLayoutContext = () => useContext(StateContext);