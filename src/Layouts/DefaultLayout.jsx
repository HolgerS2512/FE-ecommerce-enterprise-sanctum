import { Outlet } from "react-router-dom";
import { useStateContext } from "../Contexts/ContextProvider.jsx";

import axiosClient from "../axios-clint.js";
import ROUTES from "../Settings/ROUTES.js";
import UserNotification from "../Views/Notifications/UserNotification.jsx";
import Navbar from "./../common/Navbar.jsx";
import Footer from "./../common/Footer.jsx";
import JumpLink from "../components/Helpers/JumpLink.jsx";

const DefaultLayout = () => {
	const { user, dataLoader, notification, setNotification } = useStateContext();

	const loadCategories = async () => {
		try {
			const res = await axiosClient.get(ROUTES.pages.CATEGORIES);
			if (res?.data?.status) {
				console.log(res.data.data);
			}
		} catch (err) {
			const { message } = err?.response?.data;
			setNotification({
				visible : true,
				status : 'e',
				msg : message,
			})
		}
	};

	const handleCloseNotification = () => {
		setNotification({});
		if (notification.reload) window.location.reload();
	}

	if (dataLoader) return;

	return (
		<>
			<JumpLink role='navigation' link='main' />
			<Navbar user={user} />
			<main role="main" id="main">
				<Outlet />
			</main>
			<Footer />
			{notification.visible && <UserNotification onClose={handleCloseNotification} notification={notification} reload={notification.reload} />}
		</>
	)
}

export default DefaultLayout;

// import HttpStatusMsg from "../Views/Notifications/HttpStatusMsg.jsx";
// const [httpStatus, setHttpStatus] = useState({ visible: false });
// setHttpStatus({ visible: true, msg: message });
// if (httpStatus.visible) return <HttpStatusMsg msg={httpStatus.msg} />


// setNotification({
// 	visible : true,
// 	status : 'w',
// 	msg : 'lorem ipsum',
// });