import { createContext, useContext, useEffect, useState } from "react";
import { useNotification } from "./NotificationProvider";

import { CookieSlug } from "../Settings/Cookies";
import ROUTES from "../Settings/ROUTES";
import axiosClient from "../axios-clint";
import CookieManager from "../Modules/CookieManager";
import { useCookieContext } from "./CookieProvider";
import HttpStatusMsg from "../Views/Notifications/HttpStatusMsg";

const StateContext = createContext({
	categories: null,
	products: null,
	setProducts: () => {},
	setCategories: () => {},
})

export const LayoutProvider = ({ children }) => {
	// Common
	const { setNotification } = useNotification();
	const { DSGVO, categoryVnr, productVnr } = useCookieContext();
	const cookieManager = new CookieManager();
	// Kernel
  const [categories, setCategories] = useState(JSON.parse(localStorage.getItem(categoryVnr)) || []);
  const [products, setProducts] = useState(JSON.parse(localStorage.getItem(productVnr)) || []);
	const [isLoading, setIsLoading] = useState(true);
	// Errorhandling
	const [httpStatus, setHttpStatus] = useState({ visible: false });

  useEffect(() => {
    (!Boolean(categories.length)) ? loadCategories() : setIsLoading(false);
		setTimeout(loadProducts, 20);
  }, []);

	const loadCategories = async () => {
		try {
			// DSGVO reject
			const hasRights = DSGVO ? '' : '/1';
			const route = `${ROUTES.request.CATEGORIES}${hasRights}`;
			const res = await axiosClient.get(route);
			
			if (res.data.status) {
				setCategories(res.data.data);
				// DSGVO reject
				if (DSGVO) {
					const cookie = cookieManager.getCookie(CookieSlug.categories);
					setTimeout(() => {
						localStorage.setItem(cookie ?? CookieSlug.categories, JSON.stringify(res.data.data));
					}, 200);
				}
			}
			setIsLoading(false);
		} catch (err) {
			console.log(err)
			const { message } = err?.response?.data;
			setHttpStatus({ visible: true, msg: message });
		}
	};

	const loadProducts = async () => {
		// console.log(categories)
		return;
		try {
			// DSGVO reject
			const hasRights = DSGVO ? '' : '/1';
			const route = `${ROUTES.request.PRODUCTS}${hasRights}`;
			const res = await axiosClient.get(route);
			
			if (res.data.status) {
				setProducts(res.data.data);
				// DSGVO reject
				if (DSGVO) {
					const cookie = cookieManager.getCookie(CookieSlug.products);
					setTimeout(() => {
						localStorage.setItem(cookie ?? CookieSlug.products, JSON.stringify(res.data.data));
					}, 200);
				}
			}
		} catch (err) {
			const { message } = err?.response?.data;
			setHttpStatus({ visible: true, msg: message });
		}
	};

	if (httpStatus.visible) return <div className="mx-2"><HttpStatusMsg msg={httpStatus.msg} /></div>;
	
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