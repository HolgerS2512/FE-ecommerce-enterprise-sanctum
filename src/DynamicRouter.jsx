import React, { useEffect, useState, lazy } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useLayoutContext } from "./Contexts/LayoutProvider.jsx";
import { transformSlug } from "./Modules/ObjectHelper.js";

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
import Overview from "./Views/Pages/Account/Overview.jsx";
import Orders from "./Views/Pages/Account/Orders.jsx";
import PaymentMethods from "./Views/Pages/Account/PaymentMethods.jsx";
import RouteHandler from './common/RouteHandler.jsx';
import CategoryLayout from "./Layouts/CategoryLayout.jsx";
import ProductsLayout from "./Layouts/ProductsLayout.jsx";
import LoadingScreen from "./common/ErrorHandler.jsx";

const VerifyEmail = lazy(() => import("./Views/Pages/Auth/VerifyEmail.jsx"));

const Addresses = lazy(() => import("./Views/Pages/Account/Addresses.jsx"));

const Settings = lazy(() => import("./Views/Pages/Account/Settings.jsx"));

const DynamicRouter = () => {
  const { categories } = useLayoutContext();
  const [dynamicRoutes, setDynamicRoutes] = useState([]);

  useEffect(() => {
    if (categories && categories.length > 0) {
      const generatedRoutes = categories.flatMap((category) => 
        renderDynamicRoutes(category)
      );
      setDynamicRoutes(generatedRoutes);
    }
  }, [categories]);

  const renderDynamicRoutes = (category, parentName = '') => {
    // Create the path for the current category (use parent to include the parent path)
    const currentPath = `${transformSlug(category.name, parentName)}`;

    // Get the related layout
    const el = Boolean(category.subcategories.length) 
    ? <CategoryLayout category={category} /> 
    : <ProductsLayout id={category.id} />

    // Create route for the current category
    const route = {
      path: currentPath,
      element: el,
    };

    // If subcategories exist, routes created for these
    const childRoutes = category.subcategories?.flatMap((subcategory) =>
      renderDynamicRoutes(subcategory, currentPath)
    ) || [];

    // Return the current route object and all children (in a flat structure)
    return [route, ...childRoutes];
  }

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
      element: <DefaultLayout />,
      children: [
        { path: "*", element: <NotFound /> },
        { path: ROUTES.pages.HOME, element: <Home /> },
        { path: ROUTES.pages.TOU, element: <div>terms_of_use</div> },
        { path: ROUTES.pages.PRIVACY, element: <div>privacy_policy</div> },
        { path: ROUTES.pages.IMPRINT, element: <div>imprint</div> },
        { path: ROUTES.pages.CONTACT, element: <Contact /> },
        {
          path: '*',
          element: <LoadingScreen />,
          children: [
            ...dynamicRoutes,
          ]
        },
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
      path: "/",
      element: <RouteHandler />,
      children: RouteObject,
    },
  ]);

  return <RouterProvider router={ router } />;
};

export default DynamicRouter;
