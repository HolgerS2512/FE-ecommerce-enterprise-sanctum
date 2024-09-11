import { createContext, useContext, useEffect, useState } from "react";
import UserNotification from "../Views/Notifications/UserNotification";
import ROUTES from "../Settings/ROUTES";

const StateContext = createContext({
	notification: null,
	setNotification: () => {},
})

export const NotificationProvider = ({ children }) => {
	const [notification, _setNotification] = useState({});

	const handleCloseNotification = () => {
		_setNotification({});
		if (notification.reload) window.location.reload();
	}

	const setNotification = (obj) => {
		_setNotification({ visible: false });
		setTimeout(() => {
			_setNotification({ ...obj, timer: 8 });
		}, 0);
	}

	return (
		<StateContext.Provider value={{
			notification,
      setNotification,
		}}>
			{ children }
			{notification.visible && 
				<UserNotification 
					onClose={handleCloseNotification} 
					notification={notification} 
					reload={notification.reload} 
				/>
			}
		</StateContext.Provider>
	)
}

export const useNotification = () => useContext(StateContext);