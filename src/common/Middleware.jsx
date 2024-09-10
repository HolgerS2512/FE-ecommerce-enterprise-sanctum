import React, { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useStateContext } from "../Contexts/ContextProvider";

import ROUTES from "../Settings/ROUTES";
import Loading from "../components/Helpers/Loading";

const Middleware = () => {
  const { token, error } = useStateContext();
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

	useEffect(() => {
    if (!isLoading) {
      setIsLoading(true);
    }
  }, [location.pathname]);

  if (error || !token) return <Navigate to={ROUTES.pages.HOME} />;
    
  return (
    <>
      {isLoading && <Loading/>}

      <div style={{ visibility: isLoading ? 'hidden' : 'visible' }}>
        <Outlet context={{ isLoading, setIsLoading }} />
      </div>
    </>
  );
}

export default Middleware;