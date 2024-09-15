import { createContext, useContext, useEffect, useState } from "react";
import { useCookieContext } from "./CookieProvider";

import { CookieSlug } from "../Settings/Cookies";
import ROUTES from "../Settings/ROUTES";
import axiosClient from "../axios-clint";
import CookieManager from "../Modules/CookieManager";

import HttpStatusMsg from "../Views/Notifications/HttpStatusMsg";
import { useNotification } from "./NotificationProvider.jsx";
import { useQuery } from "react-query";

const SESSION_LENGTH = 1000 * 60 * 30; // 30 Minutes

const StateContext = createContext({
	categories: null,
	products: null,
	setProducts: () => {},
	setCategories: () => {},
});

export const LayoutProvider = ({ children }) => {
	// Common
	const { DSGVO, hiddenCookieConsens } = useCookieContext();
	const { activateMaintenance } = useNotification();
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
		try {;
			const res = await axiosClient.get(ROUTES.request.CATEGORIES);

			if (res.data.status) {
				setCategories(res.data.data);
				setIsLoading(false);
			}
		} catch (err) {
			if (err.response.status === 503) {
				activateMaintenance();
				hiddenCookieConsens();
			}
			if (err.response.status === 504) {
				hiddenCookieConsens();
			}
			setHttpStatus({ visible: true, error: err });
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
			setHttpStatus({ visible: true, error: err });
		}
	};

	if (httpStatus.visible) return <div className="mx-2"><HttpStatusMsg error={httpStatus.error} /></div>;
	
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