import { createContext, useContext, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { FetchAsync } from '../Modules/ServerRequests';
import AesCryptographer from '../Modules/AesCryptographer';
import { useNotification } from "./NotificationProvider";
import axiosClient from "../axios-clint";
import ROUTES from "../Settings/ROUTES";
import { CookieSlug } from "../Settings/Cookies";

const SESSION_LENGTH = 1000 * 60 * 30; // 30 Minutes

const cryptographer = new AesCryptographer();

const StateContext = createContext({
	user: null,
	username: null,
	token: null,
	lookup: null,
	setUser: () => {},
	setUsername: () => {},
	setUserProps: () => {},
	setSessionToken: () => {},
	setLookup: () => {},
	logout: () => {},
})

export const ContextProvider = ({ children }) => {
	// Common
	const { setNotification } = useNotification();
	// Kernel
	const [user, setUser] = useState({});
	const [token, setToken] = useState(localStorage.getItem(CookieSlug.auth) || '');
	const [lookup, setLookup] = useState('');
	const [username, _setUsername] = useState(cryptographer.decrypt(localStorage.getItem(CookieSlug.username)) || '');

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

      setUser(JSON.parse(decrypted));
    } else if (error) {
      setNotification({
        visible: true,
        status: 'e',
        msg: error.message,
      });
    }
	};

	const setSessionToken = (token) => {
		setToken(token);
		if (token) {
			localStorage.setItem(CookieSlug.auth, token);
		} else {
			localStorage.removeItem(CookieSlug.auth);
		}
	}

	const setUsername = (name) => {
		_setUsername(name);
		if (name) {
			localStorage.setItem(CookieSlug.username, cryptographer.encrypt(name));
		} else {
			localStorage.removeItem(CookieSlug.username);
		}
	}

	const setUserProps = (fresh) => {
		setUser((user) => ({
      ...user,
      ...fresh,
    }));
	}

	const logout = (e) => {
    e.preventDefault();
    axiosClient.get(ROUTES.auth.LOGOUT).then((res) => {
      if (res.status === 204) {
        setUser({});
        setSessionToken('');
        setUsername('');
        window.location.reload(); 
      }
    });
  };

	// if (hasToken && !hasUser && error === null) return;

	return (
		<StateContext.Provider value={{
			user,
			username,
			token,
			lookup,
			error,
			isUserLaoding,
			setUser,
			setUsername,
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