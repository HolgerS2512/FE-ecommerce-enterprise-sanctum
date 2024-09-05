import { useTranslation } from "react-i18next"
import { Link } from "react-router-dom"
import ROUTES from "../Settings/ROUTES";
import { useCookieContext } from "../Contexts/CookieProvider";
import { useStateContext } from "../Contexts/ContextProvider";

const Footer = () => {
  const { showCookieConsens } = useCookieContext();
  const { user } = useStateContext();
  const {t} = useTranslation();
  const hasUser = Boolean(Object.keys(user).length);

  const handleCookieSettings = (e) => {
    e.preventDefault();
    showCookieConsens();
  }

  const getConsentsLink = () => {
    if (hasUser) {
      return (
        <Link 
          className='inside-link' 
          to={ROUTES.account.PRIVACYSETTINGS} 
          aria-label={t('privacy_and_cookie_settings')}
        >{t('privacy_and_cookie_settings')}</Link>
      );
    } else {
      return (
        <a 
          href="#" 
          onClick={handleCookieSettings} 
          className='inside-link' 
          aria-label={t('privacy_and_cookie_settings')}
        >{t('privacy_and_cookie_settings')}</a>
      );
    }
  }

  return (
    <footer role="navigation">
      <hr/>
      <h1>Footer</h1>
      <p>
        {getConsentsLink()}
      </p>
      <h4>Link</h4>
      <h4>Link</h4>
      <h4>Link</h4>
    </footer>
  )
}

export default Footer
