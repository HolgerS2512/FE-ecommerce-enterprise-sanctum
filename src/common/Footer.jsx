import { useTranslation } from "react-i18next"
import { Link } from "react-router-dom"
import ROUTES from "../Settings/ROUTES";

const Footer = () => {
  const {t} = useTranslation();

  return (
    <footer role="navigation">
      <hr/>
      <h1>Footer</h1>
      <p>
      <Link className='inside-link' to={ROUTES.account.PRIVACYSETTINGS} aria-label={t('privacy_and_cookie_settings')}>{t('privacy_and_cookie_settings')}</Link>
      </p>
      <h4>Link</h4>
      <h4>Link</h4>
      <h4>Link</h4>
    </footer>
  )
}

export default Footer
