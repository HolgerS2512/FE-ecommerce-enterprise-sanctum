import React, { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useStateContext } from "../Contexts/ContextProvider";

import ROUTES from "../Settings/ROUTES";
import Loading from "../components/Helpers/Loading";

const Middleware = () => {
  // Common
  const { token } = useStateContext();
  const location = useLocation();
  // States
  const [isLoading, setIsLoading] = useState(true);
  const [serverTimeout, setServerTimeout] = useState(false);

	useEffect(() => {
    if (!isLoading) {
      setIsLoading(true);
    }
  }, [location.pathname]);

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