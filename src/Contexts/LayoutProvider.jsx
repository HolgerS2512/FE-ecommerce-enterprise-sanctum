import { createContext, useContext, useEffect, useState } from "react";
import { useCookieContext } from "./CookieProvider";

import { CookieSlug } from "../Settings/Cookies";
import ROUTES from "../Settings/ROUTES";
import axiosClient from "../axios-clint";
import CookieManager from "../Modules/CookieManager";
import { useNotification } from "./NotificationProvider.jsx";
import { useQuery } from "react-query";
import { useWindowSize } from "../Modules/Functions.jsx";

import HttpStatusMsg from "../Views/Notifications/HttpStatusMsg";

const SESSION_LENGTH = 1000 * 60 * 30; // 30 Minutes

const StateContext = createContext({
	categories: null,
	products: null,
	setProducts: () => {},
	setCategories: () => {},
});

export const LayoutProvider = ({ children }) => {
	// Common
	const { hiddenCookieConsens } = useCookieContext();
	const { activateMaintenance } = useNotification();
	const { width, height } = useWindowSize();
	const cookieManager = new CookieManager();
	// Kernel
  const [categories, setCategories] = useState([]);
  const [products, _setProducts] = useState({
		entries: {}
	});
	// const [entryPoint, setEntryPoint] = useState({
	// 	products: false,
	// 	categories: false,
	// });
	// const [isLoading, setIsLoading] = useState(true);

	// Errorhandling
	const [httpStatus, setHttpStatus] = useState({ visible: false });

  useEffect(() => {
    loadCategories();
		loadEntries(); // ca 16 products via catgeory
  }, []);

	// useEffect(() => {
	// 	setIsLoading(!Object.entries(entryPoint).every((point) => point[1]));
	// }, [entryPoint]);

	const loadCategories = async () => {
		try {
			const res = await axiosClient.get(ROUTES.request.CATEGORIES);

			if (res.data.status) {
				setCategories(res.data.data);
				// setEntryPoint((prev) => ({ ...prev, categories: true }));
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

	const loadEntries = async () => {
		try {
			const res = await axiosClient.get(ROUTES.request.PRODUCTS);

			if (res.data.status) {
				setProducts('entries', res.data.entries);
				// setEntryPoint((prev) => ({ ...prev, products: true }));
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
	}

	const setProducts = (dynamicKey, values) => {
		_setProducts((prev) => ({  ...prev, [dynamicKey]: values }));
	}

	if (httpStatus.visible) return <div className="mx-2"><HttpStatusMsg error={httpStatus.error} /></div>;
	
	// Burger menu categories not immediately visible
	// if (width > 998 && height > 998) {
		// if (isLoading) return;
	// }

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