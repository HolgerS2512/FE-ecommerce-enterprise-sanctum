import { createContext, useContext, useEffect, useState } from "react";
import { useCookieContext } from "./CookieProvider";

import { CookieSlug } from "../Settings/Cookies";
import ROUTES from "../Settings/ROUTES";
import axiosClient from "../axios-clint";
import CookieManager from "../Modules/CookieManager";
import { useNotification } from "./NotificationProvider.jsx";
import { useQuery } from "react-query";
import { transformSlug } from "../Modules/ObjectHelper.js";

import HttpStatusMsg from "../Views/Notifications/HttpStatusMsg";
import Contact from "../Views/Pages/Contact.jsx";

const SESSION_LENGTH = 1000 * 60 * 30; // 30 Minutes

const StateContext = createContext({
	categories: null,
	products: null,
	slugs: null,
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
	// Slug handling
	const [slugs, setSlugs] = useState([]);
	// Errorhandling
	const [httpStatus, setHttpStatus] = useState({ visible: false });

  useEffect(() => {
    loadCategories();
  }, []);

	useEffect(() => {
    if (categories.length > 0) {
      loadSlug();
    }
  }, [categories]);

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

	const loadSlug = () => {
		const result = [];
    categories.forEach((category) => {
			// result.push({ path: `/${transformSlug(false, category)}`, element: <Contact /> });
    });
		setSlugs(result);
  }

	if (httpStatus.visible) return <div className="mx-2"><HttpStatusMsg error={httpStatus.error} /></div>;
	
	if (isLoading) return;

	return (
		<StateContext.Provider value={{
			categories,
			products,
			slugs,
			setProducts,
			setCategories,
		}}>
			{ children }
		</StateContext.Provider>
	)
}

export const useLayoutContext = () => useContext(StateContext);