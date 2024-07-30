import { Outlet } from "react-router-dom";

import ShortHeader from "../common/ShortHeader.jsx";
import Footer from "../common/Footer.jsx";

const ShortLayout = () => {
  return (
		<>
			<ShortHeader />
			<main className='short-layout'>
				<Outlet />
			</main>
			<Footer />
		</>
  )
}

export default ShortLayout
