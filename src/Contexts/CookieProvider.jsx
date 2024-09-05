import { createContext, useContext, useEffect, useState } from "react";

import { CookieSlug, cookieStateBP } from "../Settings/Cookies";
import axiosClient from "../axios-clint";
import CookieManager from "../Modules/CookieManager";
import CookieLayout from '../common/Cookie/CookieLayout';
import ROUTES from "../Settings/ROUTES";

const StateContext = createContext({
	DSGVO: null,
	ccSettings: null,
	setCcSettings: () => {},
	showCookieConsens: () => {},
	hiddenCookieConsens: () => {},
})

export const CookieProvider = ({ children }) => {
	// Common
	const cookieManager = new CookieManager();
	// Kernel
	const settings = JSON.parse(cookieManager.getCookie(CookieSlug.cc)) || {};
	const hasCC = Boolean(Object.keys(settings).length);
	const [ccSettings, _setCcSettings] = useState(hasCC ? settings : cookieStateBP);
	const [DSGVO, setDSGVO] = useState(ccSettings.necessary);
	// Visible layout events
	const [visible, setVisible] = useState(!DSGVO);

  useEffect(() => {
		viewBlur();
		bodyOverflow();
  }, [visible]);

	const saveDsgvoRightsInDB = async (payload) => {
		try {
			const res = await axiosClient.post(ROUTES.request.COOKIE, payload);
			if (res.data.status) {
				cookieManager.setCookie(CookieSlug.cc, payload, { 
					expires: 60 * 60 * 24 * 30 * 6,
					sameSite: "Strict", 
					path: '/',
				}); // 6 Months in sec
			}
		} catch (err) {
			const { message } = err?.response?.data;
			setHttpStatus({ visible: true, msg: message });
		}
	}

	const setCcSettings = (obj) => {
		if (confirmNewValues(obj)) {
			saveDsgvoRightsInDB(obj);
			_setCcSettings(obj);
		}
		(!DSGVO) && setDSGVO(obj.necessary);
		hiddenCookieConsens();
	}

	const confirmNewValues = (obj) => {
		const ccJson = cookieManager.getCookie(CookieSlug.cc);
		if (ccJson === null) return true;

		const compareValues = [];

		Object.keys(settings).forEach((key) => {
      const quest = settings[key] === obj[key];
      compareValues.push(quest);
		});

		return (compareValues.some((b) => b === false));
	}

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

	const showCookieConsens = () => {
		if (!visible) setVisible(true);
	}
	const hiddenCookieConsens = () => {
		if (visible) setVisible(false);
	}

	return (
		<StateContext.Provider value={{
			DSGVO,
			ccSettings,
			setCcSettings,
			showCookieConsens,
			hiddenCookieConsens,
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