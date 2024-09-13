import { createContext, useContext, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { FetchAsync } from '../Modules/ServerRequests';
import AesCryptographer from '../Modules/AesCryptographer';
import { useNotification } from "./NotificationProvider";
import axiosClient from "../axios-clint";
import ROUTES from "../Settings/ROUTES";
import { CookieSlug } from "../Settings/Cookies";
import CookieManager from "../Modules/CookieManager";
import { redirect } from "react-router-dom";
import { useTranslation } from "react-i18next";

const SESSION_LENGTH = 1000 * 60 * 30; // 30 Minutes

const cryptographer = new AesCryptographer();

const StateContext = createContext({
	user: null,
	token: null,
	lookup: null,
	setUser: () => {},
	setUserProps: () => {},
	setSessionToken: () => {},
	setLookup: () => {},
	logout: () => {},
})

export const ContextProvider = ({ children }) => {
	// Common
	const cookieManager = new CookieManager();
	const {t} = useTranslation();
	const { setNotification } = useNotification();
	// Communication (oauth) cookie - (auth) localstorage
	const hasAuthCookie = cookieManager.getCookie(CookieSlug.oauth) !== null;
	if (!hasAuthCookie) localStorage.removeItem(CookieSlug.auth);
	// Kernel
	const [user, setUser] = useState({});
	const [token, setToken] = useState(localStorage.getItem(CookieSlug.auth) || '');
	const [lookup, setLookup] = useState('');

	const hasToken = token !== '';
	const hasUser = Boolean(Object.keys(user).length);

	const { data, isLoading: isUserLaoding, error } = useQuery({
		queryKey: ['user'],
		queryFn: () => FetchAsync(ROUTES.account.PROFILE),
		staleTime: SESSION_LENGTH,
		cacheTime: SESSION_LENGTH * 2,
		enabled: hasToken && !hasUser, // Execute only if condition is met
	});

	useEffect(() => {
		loadUser();
	}, [isUserLaoding]);

	const loadUser = async () => {
    if (data && !isUserLaoding && error === null) {
			const decrypted = cryptographer.decrypt(data);
			const user = JSON.parse(decrypted);

      setUser(user);
			// Extends the original expired date.
			cookieManager.setCookie(
				CookieSlug.oauth, token, { 
					expires: 60 * 60 * 24 * 10,
					sameSite: "Strict", 
				}
			); // 10 days
    } else if (error) {
      setNotification({
        visible: true,
        status: 'e',
        message: t('http.500'),
      });
			logout();
    }
	};

	const setSessionToken = (token) => {
		setToken(token);
		if (token) {
			localStorage.setItem(CookieSlug.auth, token);
		} else {
			localStorage.removeItem(CookieSlug.auth);
			cookieManager.deleteCookie(CookieSlug.oauth, {
				sameSite: 'Strict',
				path: '/',
			});
		}
	}

	const setUserProps = (fresh) => {
		setUser((user) => ({
      ...user,
      ...fresh,
    }));
	}

	const logout = (e = false) => {
    if (e) e.preventDefault();
    axiosClient.get(ROUTES.auth.LOGOUT).then((res) => {
      if (res.status === 204) {
				window.location.href = ROUTES.pages.HOME;
        setUser({});
        setSessionToken('');
        // window.location.reload(); 
      }
    });
  };

	// if (hasToken && !hasUser && error === null) return;

	return (
		<StateContext.Provider value={{
			user,
			token,
			lookup,
			error,
			isUserLaoding,
			setUser,
			setUserProps,
			setSessionToken,
			setLookup,
			logout,
		}}>
			{ children }
		</StateContext.Provider>
	)
}

export const useStateContext = () => useContext(StateContext);