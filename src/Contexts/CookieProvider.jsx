import { createContext, useContext, useEffect, useState } from "react";
import { useNotification } from "./NotificationProvider";

import { CookieSlug } from "../Settings/Cookies";
import CookieManager from "../Modules/CookieManager";
import CookieLayout from '../common/CookieLayout';

const StateContext = createContext({
	categoryVnr: null,
	productVnr: null,
	DSGVO: null,
	cccSettings: null,
	setCcSettings: () => {},
	showCookieConsens: () => {},
})

export const CookieProvider = ({ children }) => {
	// Common
	const { setNotification } = useNotification();
	const cookieManager = new CookieManager();
	// Kernel
	const [cccSettings, setCcSettings] = useState([]);
	const [DSGVO, setDSGVO] = useState(false);
	// Only forwarding
	const [categoryVnr] = useState(cookieManager.getCookie(CookieSlug.categories) ?? CookieSlug.categories);
	const [productVnr] = useState(cookieManager.getCookie(CookieSlug.products) ?? CookieSlug.products);
	// Visible layout events
	const [visible, setVisible] = useState(true);

  useEffect(() => {
		viewBlur();
		bodyOverflow();
  }, [visible]);

	const viewBlur = () => {
		const el = document.querySelector('#ccb');
		if (visible) {
			el.classList.add('cookie-active');
		} else {
			el.classList.remove('cookie-active');
		}
	}

	const bodyOverflow = () => {
    const body = document.querySelector('body');
    body.style.overflow = (visible ? 'hidden' : 'auto');
  }

	const showCookieConsens = () => setVisible(true);

	return (
		<StateContext.Provider value={{
			categoryVnr,
			productVnr,
			DSGVO,
			cccSettings,
			setCcSettings,
			showCookieConsens,
		}}>
			<>
				{ visible && <CookieLayout/> }
				<div id="ccb">
					{ children }
				</div>
			</>
		</StateContext.Provider>
	)
}

export const useCookieContext = () => useContext(StateContext);