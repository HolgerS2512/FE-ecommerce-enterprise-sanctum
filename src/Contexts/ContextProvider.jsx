import { createContext, useContext, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { FetchAsync } from '../Modules/ServerRequests';
import AesCryptographer from '../Modules/AesCryptographer';
import ROUTES from "../Settings/ROUTES";

const SESSION_LENGTH = 1000 * 60 * 30; // 30 Minutes

const cryptographer = new AesCryptographer();

const StateContext = createContext({
	user: null,
	username: null,
	token: null,
	lookup: null,
	notification: null,
	setUser: () => {},
	setUsername: () => {},
	setUserProps: () => {},
	setSessionToken: () => {},
	setLookup: () => {},
	setNotification: () => {},
})

export const ContextProvider = ({ children }) => {
	const [user, setUser] = useState({});
	const [token, setToken] = useState(localStorage.getItem("xFs_at") || '');
	const [lookup, setLookup] = useState('');
	const [notification, setNotification] = useState({});
	const [username, _setUsername] = useState(cryptographer.decrypt(localStorage.getItem("aC_us")) || '');

	const hasToken = token !== '';
	const isUser = Boolean(Object.keys(user).length);

	const { data, isLoading, error } = useQuery({
			queryKey: ['user'],
			queryFn: () => FetchAsync(ROUTES.account.PROFILE),
			staleTime: SESSION_LENGTH,
			cacheTime: SESSION_LENGTH * 2,
			enabled: hasToken && !isUser, // Execute only if condition is met
	});

	useEffect(() => {
		loadUser();
	}, [data, isLoading, error]);

	const loadUser = async () => {
    if (data && !isLoading && !error) {
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
			localStorage.setItem("xFs_at", token);
		} else {
			localStorage.removeItem("xFs_at");
		}
	}

	const setUsername = (name) => {
		_setUsername(name);
		if (name) {
			localStorage.setItem("aC_us", cryptographer.encrypt(name));
		} else {
			localStorage.removeItem("aC_us");
		}
	}

	const setUserProps = (fresh) => {
		setUser((user) => ({
      ...user,
      ...fresh,
    }));
	}

	// if (hasToken && !isUser && error === null) return;

	return (
		<StateContext.Provider value={{
			user,
			username,
			token,
			lookup,
			notification,
			setUser,
			setUsername,
			setUserProps,
			setSessionToken,
			setLookup,
      setNotification,
		}}>
			{ children }
		</StateContext.Provider>
	)
}

export const useStateContext = () => useContext(StateContext);