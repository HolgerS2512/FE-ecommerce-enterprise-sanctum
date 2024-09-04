import { createContext, useContext, useEffect, useState } from "react";

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
	const { DSGVO } = useCookieContext();
	const cookieManager = new CookieManager();
	// Kernel
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	// Errorhandling
	const [httpStatus, setHttpStatus] = useState({ visible: false });

  useEffect(() => {
    loadCategories();
		setTimeout(loadProducts, 20);
  }, []);

	const loadCategories = async () => {
		try {
			const res = await axiosClient.get(ROUTES.request.CATEGORIES);
			if (res.data.status) {
				setCategories(res.data.data);
			}
		} catch (err) {
			const { message } = err?.response?.data;
			setHttpStatus({ visible: true, msg: message });
		}
		setIsLoading(false);
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