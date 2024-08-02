import { createContext, useContext, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { FetchUser } from '../Modules/ServerRequests';

const SESSION_LENGTH_MS = 1000 * 60 * 30; // 30 Minutes

const StateContext = createContext({
	user: null,
	token: null,
	lookup: null,
	notification: null,
	dataLoader: null,
	setUser: () => {},
	setSessionToken: () => {},
	setLookup: () => {},
	setNotification: () => {},
	setDataLoader: () => {},
})

export const ContextProvider = ({ children }) => {
	const [user, setUser] = useState({});
	const [token, setToken] = useState(localStorage.getItem("xFs_at") || '');
	const [lookup, setLookup] = useState('');
	const [notification, setNotification] = useState({});
	const [dataLoader, setDataLoader] = useState(true);
	const { data, isLoading, error } = useQuery('user', FetchUser, {
    staleTime: SESSION_LENGTH_MS,
    cacheTime: SESSION_LENGTH_MS,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });

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
			lookup,
			notification,
			dataLoader,
			setUser,
			setSessionToken,
			setLookup,
      setNotification,
			setDataLoader,
		}}>
			{ children }
		</StateContext.Provider>
	)
}

export const useStateContext = () => useContext(StateContext);