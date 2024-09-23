import { Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom';
import ROUTES from '../Settings/ROUTES';
import { useEffect, useState } from 'react';
import { useNotification } from '../Contexts/NotificationProvider';
import { useCookieContext } from '../Contexts/CookieProvider';
import { useTranslation } from 'react-i18next';

const RouteHandler = () => {
  // Common
  const { setNotification } = useNotification();
  const { t } = useTranslation();
  const { DSGVO, showCookieConsens } = useCookieContext();
  const location = useLocation();
  const navigate = useNavigate();
  // Kernel
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, _setHasError] = useState(false);

  // routeProtector: routes
  const protectedRoutes = {
    login: ROUTES.auth.LOGIN,
    register: ROUTES.auth.REGISTER,
  };

  // routeProtector: notification values
  const protectValues = {
    routes: protectedRoutes, 
    message: t('cookie_required_request_route'), 
    state: 'w',
  };

  useEffect(() => {
    if (!DSGVO) {
      showCookieConsens();
    }
    if (!isLoading) {
      setIsLoading(true);
    }
    // routeProtector(protectValues);
  }, [location.pathname]);

  const routeProtector = ({ routes, message, state }) => {
    Object.values(routes).forEach((route) => {
      if (route === location.pathname && !DSGVO) {
        navigate(ROUTES.pages.HOME);
        setNotification({
          visible: true,
          status: state,
          message: message,
        });
      }
    });
  }

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
      {/* {isLoading && <Loading/>} */}

      <div style={{ visibility: isLoading ? 'hidden' : 'visible' }}>
        <Outlet context={{ isLoading, setIsLoading, setHasError }} />
      </div>
    </>
  );
};

export default RouteHandler;
