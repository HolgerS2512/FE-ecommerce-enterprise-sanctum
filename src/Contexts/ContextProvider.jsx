import { createContext, useContext, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { FetchAsync } from '../Modules/ServerRequests';
import AesCryptographer from '../Modules/AesCryptographer';
import ROUTES from "../Settings/ROUTES";
import { useNotification } from "./NotificationProvider";

const SESSION_LENGTH = 1000 * 60 * 30; // 30 Minutes

const cryptographer = new AesCryptographer();

const StateContext = createContext({
	user: null,
	username: null,
	addresses: null,
	token: null,
	lookup: null,
	userError: null,
	isUserLoading: null,
	setUser: () => {},
	setUsername: () => {},
	setUserProps: () => {},
	setSessionToken: () => {},
	setLookup: () => {},
})

export const ContextProvider = ({ children }) => {
	const { setNotification } = useNotification();
	const [user, setUser] = useState({});
	const [addresses, setAddresses] = useState({});
	const [token, setToken] = useState(localStorage.getItem("xFs_at") || '');
	const [lookup, setLookup] = useState('');
	const [username, _setUsername] = useState(cryptographer.decrypt(localStorage.getItem("aC_us")) || '');
	const [userError, setUserError] = useState(false);
	const [isUserLoading, setIsUserLoading] = useState(false);

	const hasToken = token !== '';
	const hasUser = Boolean(Object.keys(user).length);
	const hasAddress = Boolean(Object.keys(addresses).length);

	const { data, isLoading, error } = useQuery({
			queryKey: ['user'],
			queryFn: () => FetchAsync(ROUTES.account.PROFILE),
			staleTime: SESSION_LENGTH,
			cacheTime: SESSION_LENGTH * 2,
			enabled: hasToken && !hasUser, // Execute only if condition is met
	});

	const { data: addressData, isLoading: isAddressLoading, error: addressErr } = useQuery({
			queryKey: ['addresses'],
			queryFn: () => FetchAsync(ROUTES.account.ADDRESSES),
			staleTime: SESSION_LENGTH,
			cacheTime: SESSION_LENGTH * 2,
			enabled: !hasAddress, // Execute only if condition is met
	});

	useEffect(() => {
		loadAddress();
	}, [addressData, isAddressLoading, addressErr]);

	useEffect(() => {
		loadUser();
		setUserError(Boolean(error));
		setIsUserLoading(isLoading);
	}, [data, isLoading, error]);

	const loadUser = async () => {
		setIsUserLoading(true);
    if (data && !isLoading && error === null) {
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

	const loadAddress = async () => {
		if (addressData !== null && !isAddressLoading && addressErr === null) {
			const decrypted = cryptographer.decrypt(addressData);

      setAddresses(JSON.parse(decrypted));
		} else if (addressErr) {
      setNotification({
        visible: true,
        status: 'e',
        msg: error.message,
      });
    }
	}

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

	// if (hasToken && !hasUser && error === null) return;

	return (
		<StateContext.Provider value={{
			user,
			username,
			addresses,
			token,
			lookup,
			userError,
			isUserLoading,
			setUser,
			setUsername,
			setUserProps,
			setSessionToken,
			setLookup,
		}}>
			{ children }
		</StateContext.Provider>
	)
}

export const useStateContext = () => useContext(StateContext);