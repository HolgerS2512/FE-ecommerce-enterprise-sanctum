import React, { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

import { useNotification } from "../Contexts/NotificationProvider";
import ROUTES from "../Settings/ROUTES";

import Loading from "../components/Helpers/Loading";

const ErrorHandler = () => {
  // Common
  const { setNotification } = useNotification();
  const location = useLocation();
  // States
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, _setHasError] = useState(false);

	useEffect(() => {
    if (!isLoading) {
      setIsLoading(true);
    }
  }, [location.pathname]);

  const setHasError = (err) => {
    _setHasError(true);
    setNotification({
      visible: true,
      status: 'e',
      error: err,
    });
  } 

  if (hasError) return <Navigate to={ROUTES.pages.HOME} />;
      
  return (
    <>
      {isLoading && <Loading/>}

      <div style={{ visibility: isLoading ? 'hidden' : 'visible' }}>
        <Outlet context={{ isLoading, setIsLoading, setHasError }} />
      </div>
    </>
  );
}

export default ErrorHandler;