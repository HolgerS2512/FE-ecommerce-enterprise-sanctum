import { Outlet } from "react-router-dom";
import { useStateContext } from "../Contexts/ContextProvider.jsx";

import UserNotification from "../Views/Notifications/UserNotification.jsx";
import Navbar from "./../common/Navbar.jsx";
import Footer from "./../common/Footer.jsx";
import JumpLink from "../components/Helpers/JumpLink.jsx";
import { useLayoutContext } from "../Contexts/LayoutProvider.jsx";

const DefaultLayout = () => {
	const { token, user, notification, setNotification } = useStateContext();
	const { categories } = useLayoutContext();

	const hasToken = token !== '';

	const handleCloseNotification = () => {
		setNotification({});
		if (notification.reload) window.location.reload();
	}

	fetch('https://api.escuelajs.co/api/v1/categories')
    .then(res=>res.json())
    .then(json=>console.log(json))

	return (
		<>
			<JumpLink role='navigation' link='main' />
			<Navbar 
				categories={categories} 
				user={user ?? {}} 
				hasToken={hasToken}
			/>
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