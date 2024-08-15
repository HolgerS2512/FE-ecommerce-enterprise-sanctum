import { createContext, useContext, useState } from "react";
import UserNotification from "../Views/Notifications/UserNotification";

const StateContext = createContext({
	notification: null,
	setNotification: () => {},
})

export const NotificationProvider = ({ children }) => {
	const [notification, setNotification] = useState({});

	const handleCloseNotification = () => {
		setNotification({});
		if (notification.reload) window.location.reload();
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