import { useTranslation } from "react-i18next"
import { Link } from "react-router-dom"
import ROUTES from "../Settings/ROUTES";
import { useCookieContext } from "../Contexts/CookieProvider";

const Footer = () => {
  const { showCookieConsens } = useCookieContext();
  const {t} = useTranslation();

  const handleCookieSettings = (e) => {
    e.preventDefault();
    showCookieConsens();
  }

  return (
    <footer role="navigation">
      <hr/>
      <h1>Footer</h1>
      <p>
      <a href="#" onClick={handleCookieSettings} className='inside-link' aria-label={t('privacy_and_cookie_settings')}>{t('privacy_and_cookie_settings')}</a>
      {/* <Link className='inside-link' to={ROUTES.account.PRIVACYSETTINGS} aria-label={t('privacy_and_cookie_settings')}>{t('privacy_and_cookie_settings')}</Link> */}
      </p>
      <h4>Link</h4>
      <h4>Link</h4>
      <h4>Link</h4>
    </footer>
  )
}

export default Footer
