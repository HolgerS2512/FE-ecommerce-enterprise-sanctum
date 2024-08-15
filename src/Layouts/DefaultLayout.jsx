import { Outlet } from "react-router-dom";
import { useStateContext } from "../Contexts/ContextProvider.jsx";
import { useLayoutContext } from "../Contexts/LayoutProvider.jsx";

import Navbar from "./../common/Navbar.jsx";
import Footer from "./../common/Footer.jsx";
import JumpLink from "../components/Helpers/JumpLink.jsx";

const DefaultLayout = () => {
	const { token, user } = useStateContext();
	const { categories } = useLayoutContext();

	const hasToken = token !== '';

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
		</>
	)
}

export default DefaultLayout;

// import HttpStatusMsg from "../Views/Notifications/HttpStatusMsg.jsx";
// const [httpStatus, setHttpStatus] = useState({ visible: false });
// setHttpStatus({ visible: true, msg: message });
// if (httpStatus.visible) return <HttpStatusMsg msg={httpStatus.msg} />
