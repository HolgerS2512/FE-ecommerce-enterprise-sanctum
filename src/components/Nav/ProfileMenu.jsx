import { Link } from "react-router-dom"
import { useTranslation } from "react-i18next"

import NAVLINKS from "../../Settings/NAVLINKS";
import GetIconByName from "../Util/GetIconByName";

const ProfileMenu = ({ onLogout, greeting }) => {
  const { t } = useTranslation();
  const { links, name, icon } = NAVLINKS.profile;
  const { link: oLink } = links.OVERVIEW;

  return (
    <ul className="desktop-list">
      <li className="acc">
        <Link 
          to={oLink} 
          aria-label={t(name)}
          tabIndex={1}
        >
          <span className="vnu576 greeting">{greeting}</span>
          <GetIconByName name={icon} />
        </Link>
      </li>
      <li>
        <ul className="d-dropdown a35s fit-menu-t28">
          <span className="h4">{t(name)}</span>

          {Object.values(links).map((l, i) => (
            <li key={i}>
              <Link 
                to={l.link}
                aria-label={t(l.name)}
                tabIndex={1}
              >{t(l.name)}</Link>
            </li>
          ))}

          <li>
            <a 
              href='#'
              aria-label={t('logout')} 
              onClick={onLogout}
              tabIndex={1}
            >{t('logout')}</a>
          </li>
        </ul>
      </li>
    </ul>
  )
}

export default ProfileMenu
