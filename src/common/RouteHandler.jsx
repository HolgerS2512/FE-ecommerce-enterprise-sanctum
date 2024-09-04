import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import ROUTES from '../Settings/ROUTES';
import { useEffect, useState } from 'react';
import { useNotification } from '../Contexts/NotificationProvider';
import { useCookieContext } from '../Contexts/CookieProvider';
import { useTranslation } from 'react-i18next';

const RouteHandler = () => {
  const { setNotification } = useNotification();
  const { t } = useTranslation();
  const { DSGVO, showCookieConsens } = useCookieContext();
  const location = useLocation();
  const navigate = useNavigate();
  const [path, setPath] = useState('');
  
  const requiredDSGVO = {
    login: ROUTES.auth.LOGIN,
    register: ROUTES.auth.REGISTER,
  };

  useEffect(() => {
    if (!DSGVO) {
      showCookieConsens();
    }
  }, [path]);

  useEffect(() => {
    setPath(location.pathname);
    cookieRouteProtector();
  }, [location.pathname]);

  const cookieRouteProtector = () => {
    Object.values(requiredDSGVO).forEach((route) => {
      if (route === location.pathname && !DSGVO) {
        navigate(ROUTES.pages.HOME);
        setNotification({
          visible: true,
          status: 'w',
          msg: t('cookie_required_request_route'),
        });
      }
    });
  }

  return <Outlet context={{ path }} />;
};

export default RouteHandler;
