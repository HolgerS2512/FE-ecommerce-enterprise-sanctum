import { lazy } from 'react';
import { createBrowserRouter } from "react-router-dom";

import ShortLayout from "../src/Layouts/ShortLayout.jsx";
import DefaultLayout from "../src/Layouts/DefaultLayout.jsx";
import NotFound from "../src/Views/Notifications/NotFound.jsx";
import Home from "../src/Views/Pages/Home.jsx";
import Login from "../src/Views/Pages/Auth/Login.jsx";
import Register from "../src/Views/Pages/Auth/Register.jsx";
import ForgetPwd from "../src/Views/Pages/Auth/ForgetPwd.jsx";
import LookUpAccount from "../src/Views/Pages/Auth/LookUpAccount.jsx";
import ROUTES from "../src/Settings/ROUTES.js";
import Middleware from '../src/common/Middleware.jsx';
import Contact from "../src/Views/Pages/Contact.jsx";
import PersonalProfile from "../src/Views/Pages/Account/PersonalProfile.jsx";
import Overview from "../src/Views/Pages/Account/Overview.jsx";
import Orders from "../src/Views/Pages/Account/Orders.jsx";
import PaymentMethods from "../src/Views/Pages/Account/PaymentMethods.jsx";
import RouteHandler from '../src/common/RouteHandler.jsx';

const VerifyEmail = lazy(() => import("../src/Views/Pages/Auth/VerifyEmail.jsx"));

const Addresses = lazy(() => import('../src/Views/Pages/Account/Addresses.jsx'));

const Settings = lazy(() => import('../src/Views/Pages/Account/Settings.jsx'));

// ! ---> Protected Account Routes <--- !
const ProtectedMiddlewareRoutes = {
  // /account
  path: ROUTES.account.route,
  element: <Middleware />,
  children: [
    { path: ROUTES.account.OVERVIEW, element: <Overview /> },
    { path: ROUTES.account.PROFILE, element: <PersonalProfile /> },
    { path: ROUTES.account.ORDERS, element: <Orders /> },
    { path: ROUTES.account.ADDRESSES, element: <Addresses /> },
    { path: ROUTES.account.PAYMENTMETHODS, element: <PaymentMethods /> },
    { path: `${ROUTES.account.SETTINGS}/:slug?`, element: <Settings /> },
  ],
};
// ! ---> Protected Account Routes END <--- !

const RouteObject = [
	// Default Layout Routes
  {
    path: ROUTES.pages.HOME,
    element: (
			<DefaultLayout />
    ),
    children: [
      { path: '*', element: <NotFound /> },
      { path: ROUTES.pages.HOME, element: <Home /> },
      { path: ROUTES.pages.TOU, element: <div>terms_of_use</div> },
      { path: ROUTES.pages.PRIVACY, element: <div>privacy_policy</div> },
      { path: ROUTES.pages.IMPRINT, element: <div>imprint</div> },
      { path: ROUTES.pages.CONTACT, element: <Contact /> },
      ProtectedMiddlewareRoutes,
    ],
  },
	// Short Layout Routes
  {
    path: ROUTES.pages.HOME,
    element: <ShortLayout />,
    children: [
      { path: ROUTES.auth.LOOKUP, element: <LookUpAccount /> },
      { path: ROUTES.auth.REGISTER, element: <Register /> },
      { path: ROUTES.auth.LOGIN, element: <Login /> },
      { path: ROUTES.auth.FORGETPWD, element: <ForgetPwd /> },
    ],
  },
  {
    path: `${ROUTES.auth.VERIFYEMAIL}/:url`,
    element: <VerifyEmail />,
  },
];

const router = createBrowserRouter([
	{	
		path: '/',
		element: <RouteHandler />,
		children: RouteObject
	}
]);

export default router;