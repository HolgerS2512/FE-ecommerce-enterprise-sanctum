import { createContext, useContext, useState } from "react";

const StateContext = createContext({
	user: null,
	token: null,
	lookup: null,
	notification: null,
	hasLoader: null,
	setUser: () => {},
	setSessionToken: () => {},
	setLookup: () => {},
	setNotification: () => {},
	setHasLoader: () => {},
})

export const ContextProvider = ({ children }) => {
	const [user, setUser] = useState({});
	const [token, setToken] = useState(localStorage.getItem("xFs_at") || '');
	const [lookup, setLookup] = useState('');
	const [notification, setNotification] = useState({});
	const [hasLoader, _setHasLoader] = useState(true);

	const setSessionToken = (token) => {
		setToken(token);
		if (token) {
			localStorage.setItem("xFs_at", token);
		} else {
			localStorage.removeItem("xFs_at");
		}
	}

	const setHasLoader = (bool, timer = false) => {
		if (user) {
			if (timer) {
				setTimeout(() => _setHasLoader(bool), timer);
			} else {
				_setHasLoader(bool);
			}
    }
	}

	return (
		<StateContext.Provider value={{
			user,
			token,
			lookup,
			notification,
			hasLoader,
			setUser,
			setSessionToken,
			setLookup,
      setNotification,
			setHasLoader,
		}}>
			{ children }
		</StateContext.Provider>
	)
}

export const useStateContext = () => useContext(StateContext);