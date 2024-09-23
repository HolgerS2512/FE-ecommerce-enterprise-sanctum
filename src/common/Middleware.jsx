import React, { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation, useOutletContext } from "react-router-dom";
import { useStateContext } from "../Contexts/ContextProvider";

import ROUTES from "../Settings/ROUTES";
import Loading from "../components/Helpers/Loading";

const Middleware = () => {
  // Common
  const { isLoading: rhl, setIsLoading: rhsl } = useOutletContext();
  const { token } = useStateContext();
  const location = useLocation();
  // States
  const [isLoading, setIsLoading] = useState(true);
  const [serverTimeout, setServerTimeout] = useState(false);

	useEffect(() => {
    // Loading with spinner
    if (!isLoading) {
      setIsLoading(true);
    }
  }, [location.pathname]);

  useEffect(() => {
    /*
    * Loading without spinner
    * Have to set every false - in this middleware managing loading state
    */
    if (rhl) rhsl(false);
  }, [rhl]);

  const setMiddlewareTimeout = () => setServerTimeout(true);

  if (!token) return <Navigate to={ROUTES.pages.HOME} />;

  if (serverTimeout) return <h1>timeout</h1>;
    
  return (
    <>
      {isLoading && <Loading/>}

      <div style={{ visibility: isLoading ? 'hidden' : 'visible' }}>
        <Outlet context={{ isLoading, setIsLoading, setMiddlewareTimeout }} />
      </div>
    </>
  );
}

export default Middleware;