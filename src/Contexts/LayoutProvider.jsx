import { createContext, useContext, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { FetchAsync } from "../Modules/ServerRequests";
import ROUTES from "../Settings/ROUTES";

const SESSION_LENGTH_30M = 1000 * 60 * 60 * 24; // 60 Minutes * 24 H = 1 Tag

const StateContext = createContext({
	user: null,
	token: null,
	notification: null,
	dataLoader: null,
	setUser: () => {},
	setSessionToken: () => {},
	setNotification: () => {},
	setDataLoader: () => {},
})

export const LayoutProvider = ({ children }) => {
	const [user, setUser] = useState({});
	const [token, setToken] = useState(localStorage.getItem("xFs_at") || '');
	const [notification, setNotification] = useState({});
	const [dataLoader, setDataLoader] = useState(true);

	const hasToken = token === null ? false : Boolean(token.length);

	const { data, isLoading, error } = useQuery(
		'categories', 
    () => FetchAsync(ROUTES.pages.CATEGORIES),
    {
			staleTime: SESSION_LENGTH_30M,
			cacheTime: SESSION_LENGTH_30M,
			enabled: !!hasToken, // Execute only if condition is met
		}
	);

	useEffect(() => {
		loadUser();
	}, []);

	useEffect(() => {
		loadUser();
	}, [isLoading]);

	const loadUser = async () => {
		const hasToken = token === null ? false : Boolean(token.length);
		const hasUser = !Boolean(Object.keys(user).length);

		if (hasToken && !isLoading && hasUser) {
			if (error === null) {
				setUser(data);
			} else {
				setNotification({
					visible : true,
					status : 'e',
					msg : error.message,
				});
			}
			if (dataLoader) setDataLoader(false);
		}

		if (!hasToken && dataLoader) setDataLoader(false);
	};

	const setSessionToken = (token) => {
		setToken(token);
		if (token) {
			localStorage.setItem("xFs_at", token);
		} else {
			localStorage.removeItem("xFs_at");
		}
	}

	return (
		<StateContext.Provider value={{
			user,
			token,
			notification,
			dataLoader,
			setUser,
			setSessionToken,
      setNotification,
			setDataLoader,
		}}>
			{ children }
		</StateContext.Provider>
	)
}

export const useStateContext = () => useContext(StateContext);