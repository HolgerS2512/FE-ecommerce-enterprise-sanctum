import { Outlet, useLocation, useNavigate } from 'react-router-dom';
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
  // States
  const [path, setPath] = useState('');
  
  const protectedRoutes = {
    login: ROUTES.auth.LOGIN,
    register: ROUTES.auth.REGISTER,
  };

  const protectValues = {
    routes: protectedRoutes, 
    message: t('cookie_required_request_route'), 
    state: 'w',
  };

  useEffect(() => {
    if (!DSGVO) {
      showCookieConsens();
    }
  }, [path]);

  useEffect(() => {
    setPath(location.pathname);
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

  return <Outlet context={{ path }} />;
};

export default RouteHandler;
