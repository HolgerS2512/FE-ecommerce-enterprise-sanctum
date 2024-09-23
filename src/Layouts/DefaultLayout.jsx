import { Outlet, useOutletContext } from "react-router-dom";

import Navbar from "./../common/Navbar.jsx";
import Footer from "./../common/Footer.jsx";
import JumpLink from "../components/Helpers/JumpLink.jsx";

const DefaultLayout = () => {
	const { isLoading, setIsLoading, setHasError } = useOutletContext();
	return (
		<>
			<JumpLink role='navigation' link='main' />
			<Navbar />
			<main role="main" id="main">
				<Outlet context={{ isLoading, setIsLoading, setHasError }} />
			</main>
			<Footer />
		</>
	)
}

export default DefaultLayout;

// import HttpStatusMsg from "../Views/Notifications/HttpStatusMsg.jsx";
// const [httpStatus, setHttpStatus] = useState({ visible: false });
// setHttpStatus({ visible: true, error: err });
// if (httpStatus.visible) return <HttpStatusMsg error={httpStatus.error} />
