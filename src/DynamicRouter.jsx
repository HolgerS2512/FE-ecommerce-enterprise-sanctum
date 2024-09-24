import React, { useEffect, useState, lazy } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useLayoutContext } from "./Contexts/LayoutProvider.jsx";
import { transformSlug } from "./Modules/ObjectHelper.js";
import ROUTES from "./Settings/ROUTES.js";

// Outlets
// DSVGO check & manage Loading states
import RouteHandler from './common/RouteHandler.jsx';

// Middlewares* - between loader
import Middleware from './common/Middleware.jsx';
import RemoveLoader from './common/RemoveLoader.jsx';

// Layouts
import DefaultLayout from './Layouts/DefaultLayout.jsx';
const ShortLayout = lazy(() => import("./Layouts/ShortLayout.jsx"));
// Without Outlet
import CategoryLayout from './components/Categories/CategoryLayout.jsx';
import ProductsLayout from './components/Products/ProductsLayout.jsx';

// Account
const Overview = lazy(() => import("./Views/Pages/Account/Overview.jsx"));
const PersonalProfile = lazy(() => import("./Views/Pages/Account/PersonalProfile.jsx"));
const Orders = lazy(() => import("./Views/Pages/Account/Orders.jsx"));
const Addresses = lazy(() => import("./Views/Pages/Account/Addresses.jsx"));
const PaymentMethods = lazy(() => import("./Views/Pages/Account/PaymentMethods.jsx"));
const Settings = lazy(() => import("./Views/Pages/Account/Settings.jsx"));

// Auth
const LookUpAccount = lazy(() => import("./Views/Pages/Auth/LookUpAccount.jsx"));
const Login = lazy(() => import("./Views/Pages/Auth/Login.jsx"));
const Register = lazy(() => import("./Views/Pages/Auth/Register.jsx"));
const VerifyEmail = lazy(() => import("./Views/Pages/Auth/VerifyEmail.jsx"));
const ForgetPwd = lazy(() => import("./Views/Pages/Auth/ForgetPwd.jsx"));

// Pages
const Home = lazy(() => import("./Views/Pages/Home.jsx"));
const Contact = lazy(() => import("./Views/Pages/Contact.jsx"));

// Not Found 404
const NotFound = lazy(() => import("./Views/Notifications/NotFound.jsx"));


const DynamicRouter = () => {
  const { categories } = useLayoutContext();
  const [dynamicRoutes, setDynamicRoutes] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Track loading state

  useEffect(() => {
    if (categories && categories.length > 0) {
      const generatedRoutes = categories.flatMap((category) => 
        renderDynamicRoutes(category)
      );
      setDynamicRoutes(generatedRoutes);
      setIsLoading(false); // Loading complete once routes are generated
    }
  }, [categories]);

  const renderDynamicRoutes = (category, parentName = '') => {
    const hasSubcategories = Boolean(category.subcategories.length);
    // Create the path for the current category (use parent to include the parent path)
    const currentPath = `${transformSlug(category.name, parentName)}${hasSubcategories ? '' : '/:sort?'}`;

    // Get the related layout
    const el = hasSubcategories 
    ? <CategoryLayout category={category} /> 
    : <ProductsLayout id={category.id} />

    // Create route for the current category and saved in context id array
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
  const ProtectedRoutes = [
    { path: ROUTES.account.OVERVIEW, element: <Overview /> },
    { path: ROUTES.account.PROFILE, element: <PersonalProfile /> },
    { path: ROUTES.account.ORDERS, element: <Orders /> },
    { path: ROUTES.account.ADDRESSES, element: <Addresses /> },
    { path: ROUTES.account.PAYMENTMETHODS, element: <PaymentMethods /> },
    { path: `${ROUTES.account.SETTINGS}/:slug?`, element: <Settings /> },
  ];
  // ! ---> Protected Account Routes END <--- !

  const RouteObject = [
    // --- Default Layout Routes --- //
    {
      path: ROUTES.pages.HOME,
      element: <DefaultLayout />, // Outlet
      children: [
        {
          // Usual paths not used loader
          path: "/",
          element: <RemoveLoader />, // Outlet
          children: [
            { path: "*", element: <NotFound /> },
            { path: ROUTES.pages.HOME, element: <Home /> },
            { path: ROUTES.pages.TOU, element: <div>terms_of_use</div> },
            { path: ROUTES.pages.PRIVACY, element: <div>privacy_policy</div> },
            { path: ROUTES.pages.IMPRINT, element: <div>imprint</div> },
            { path: ROUTES.pages.CONTACT, element: <Contact /> },
          ],
        },
        // --- Dynamic --- //
        ...dynamicRoutes,
        // --- Dynamic --- //
        {
          path: ROUTES.account.route,
          element: <Middleware />, // Outlet
          children: [
            ...ProtectedRoutes
          ],
        },
      ],
    },
    /*
    * RemoveLoader -> Short Layout Routes
    * not used loader
    */
    {
      path: "/",
      element: <RemoveLoader />, // Outlet
      children: [
        {
          path: "/",
          element: <ShortLayout />, // Outlet
          children: [
            { path: ROUTES.auth.LOOKUP, element: <LookUpAccount /> },
            { path: ROUTES.auth.REGISTER, element: <Register /> },
            { path: ROUTES.auth.LOGIN, element: <Login /> },
            { path: ROUTES.auth.FORGETPWD, element: <ForgetPwd /> },
          ],
        },
        {
          // Path can also be called outside
          path: `${ROUTES.auth.VERIFYEMAIL}/:url`,
          element: <VerifyEmail />,
        },
      ],
    },
  ];

  const router = createBrowserRouter([
    {
      // DSVGO check & manage Loading states
      path: "/",
      element: <RouteHandler />, // Outlet
      children: RouteObject,
    },
  ]);
  
  // Display a loading indicator while routes are being generated
  if (isLoading) return;

  // Return the RouterProvider once the dynamic routes are ready
  return <RouterProvider router={ router } />;
};

export default DynamicRouter;
