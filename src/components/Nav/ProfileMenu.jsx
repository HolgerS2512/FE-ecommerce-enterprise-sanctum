import { Link, useLocation } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { useStateContext } from "../../Contexts/ContextProvider";

import NAVLINKS from "../../Settings/NAVLINKS";
import GetIconByName from "../Util/GetIconByName";

const ProfileMenu = () => {
  const { username, logout } = useStateContext();
  const { t } = useTranslation();
  const location = useLocation();
  const { pathname } = location;
  const { links, name, icon } = NAVLINKS.profile;
  const { link: oLink } = links.OVERVIEW;

  const handleSelfLink = (e, link) => {
    if (pathname === link) {
      e.preventDefault();
    }
  }

  return (
    <ul className="desktop-list">
      <li className="acc">
        <Link 
          to={oLink} 
          aria-label={t(name)}
          tabIndex={1}
          className={`${pathname === oLink ? 'nav-active' : ''}`}
          onClick={(e) => handleSelfLink(e, oLink)}
        >
          {/* className={`vnu576 greeting${hasToken? ' a35s' : ''}${hasUser? ' fit-greeting' : ''}`} */}
          <span className='vnu576 greeting'>{`${t('greeting')} ${username}`}</span>
          <GetIconByName name={icon} />
        </Link>
      </li>
      <li>
        <ul className="d-dropdown a35s fit-menu-t28">
          <span className="h4">{t(name)}</span>
          <hr className="my-1" />

          {Object.values(links).map((l, i) => (
            <li key={i}>
              <Link 
                to={l.link}
                aria-label={t(l.name)}
                tabIndex={1}
                className={`${pathname === l.link ? 'nav-active' : ''}`}
                onClick={(e) => handleSelfLink(e, l.link)}
              >{t(l.name)}</Link>
            </li>
          ))}

          <hr className="my-1" />
          <li>
            <a 
              href='#'
              aria-label={t('logout')} 
              onClick={logout}
              tabIndex={1}
            >{t('logout')}</a>
          </li>
        </ul>
      </li>
    </ul>
  )
}

export default ProfileMenu
