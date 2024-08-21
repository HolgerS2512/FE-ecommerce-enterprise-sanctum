import { lazy } from 'react';
import { createBrowserRouter } from "react-router-dom";

import ShortLayout from "./Layouts/ShortLayout.jsx";
import DefaultLayout from "./Layouts/DefaultLayout.jsx";
import NotFound from "./Views/Notifications/NotFound.jsx";
import Home from "./Views/Pages/Home.jsx";
import Login from "./Views/Pages/Auth/Login.jsx";
import Register from "./Views/Pages/Auth/Register.jsx";
import ForgetPwd from "./Views/Pages/Auth/ForgetPwd.jsx";
import LookUpAccount from "./Views/Pages/Auth/LookUpAccount.jsx";
import ROUTES from "./Settings/ROUTES.js";
import Middleware from './common/Middleware.jsx';
import Contact from "./Views/Pages/Contact.jsx";
import PersonalProfile from "./Views/Pages/Account/PersonalProfile.jsx";

const VerifyEmail = lazy(() => import("./Views/Pages/Auth/VerifyEmail.jsx"));

const Addresses = lazy(() => import('./Views/Pages/Account/Addresses.jsx'));

const loader = async () => {
	console.log('loader')
  return null;
};


const router = createBrowserRouter([
	{
		// '/'
		path: ROUTES.pages.HOME,
		element: <DefaultLayout />,
		children: [
			{
				path: '*',
				element: <NotFound />
			},
			{
				// '/404'
				path: ROUTES.error.NOTFOUND,
				element: <NotFound />
			},
			{
				// '/'
				path: ROUTES.pages.HOME,
				element: <Home />
			},
			{
				// '/terms_of_use'
				path: ROUTES.pages.TOU,
				element: <div>terms_of_use</div>
			},
			{
				// '/privacy_policy'
				path: ROUTES.pages.PRIVACY,
				element: <div>privacy_policy</div>
			},
			{
				// '/imprint'
				path: ROUTES.pages.IMPRINT,
				element: <div>imprint</div>
			},
			{
				// '/contact' --- NOT visible ---
				path: ROUTES.pages.CONTACT,
				element: <Contact />
			},
			{
				// ! ---> Protected Account Routes <--- !
				// /account
				path: ROUTES.account.route,
				element: <Middleware />,
				// loader: loader,
				children: [
					{
						// '/account'
						path: ROUTES.account.OVERVIEW,
						element: <PersonalProfile />
					},
					{
						// '/account/profile'
						path: ROUTES.account.PROFILE,
						element: <PersonalProfile />
					},
					{
						// '/account/orders'
						path: ROUTES.account.ORDERS,
						element: <PersonalProfile />
					},
					{
						// '/account/addresses'
						path: ROUTES.account.ADDRESSES,
						element: <Addresses />
					},
					{
						// '/account/payment'
						path: ROUTES.account.PAYMENTMETHODS,
						element: <PersonalProfile />
					},
				]
				// ! ---> Protected Account Routes END <--- !
			},
		]
	},
	{
		// '/'
		path: ROUTES.pages.HOME,
		element: <ShortLayout />,
		children: [
			{
				// '/lookup_account'
				path: ROUTES.auth.LOOKUP,
				element: <LookUpAccount />
			},
			{
				// '/register'
				path: ROUTES.auth.REGISTER,
				element: <Register />
			},
			{
				// '/login'
				path: ROUTES.auth.LOGIN,
				element: <Login />
			},
			{
				// '/forget/password'
				path: ROUTES.auth.FORGETPWD,
				element: <ForgetPwd />
			},
		]
	},
	{
		// '/email/verify/:url'
		path: `${ROUTES.auth.VERIFYEMAIL}/:url`,
		element: <VerifyEmail />
	},
]);

// Add a fixed delay so you can see the loading state
// Called Suspense fallback={<Loading />} !!!

// const Delay = (promise) => {
//   return new Promise(resolve => {
//     // Called after resolve !
//     setTimeout(resolve, 2000);
//   }).then(() => promise);
// }

export default router;