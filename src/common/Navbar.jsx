import { Link } from "react-router-dom";
import { useStateContext } from '../Contexts/ContextProvider';
import { useLayoutContext } from "../Contexts/LayoutProvider";
import { useTranslation } from 'react-i18next';

import ROUTES from '../Settings/ROUTES';
import ProfileMenu from '../components/Nav/ProfileMenu';
import NAVLINKS from '../Settings/NAVLINKS';
import GetIconByName from '../components/Util/GetIconByName';
import GenerateMenuHtml from "./GenerateMenuHtml";
import { useEffect, useState } from "react";
import Logo from "../components/icon/Logo";
import WacgSettings from "../components/WacgSettings";

const Navbar = () => {
  // Common
  const { token, user } = useStateContext();
	const { categories } = useLayoutContext();
  const { t } = useTranslation();
  const { submenu } = NAVLINKS;
  // States
  const [hasUser, setHasUser] = useState(Boolean(Object.keys(user).length));
  const [hasToken, setHasToken] = useState(token !== '');
  // Optik
  const [docReader, setDocReader] = useState(false);

  useEffect(() => {
    setHasUser(Boolean(Object.keys(user).length));
    setHasToken(token !== '');
  }, [user]);

  return (
    <nav role="navigation" className='main-nav'>

      {/* SECTION 1 */}
      <section className='nav-container nav-con-s1'>
        <div className='nav-s1w'>
          {/* <img src={Logo} width={28} height={28} /> */}
        </div>

        <div className='nav-s1w nav-s1we'>
          <WacgSettings />
          <Link>{t('help')}</Link>

          {hasToken 
          ? <ProfileMenu docReader={docReader} /> 
          : <Link
              to={hasUser ? ROUTES.account.PROFILE : ROUTES.auth.LOOKUP}
              aria-label={hasUser ? t('personal_profile') : t('signip')}
              tabIndex={1}
            >
              {t('signin')}
              <GetIconByName name={'Profile'} />
            </Link>}
        </div>
      </section>

      {/* SECTION 2 */}
      <section className='nav-container'>
        <div className="brand-grey">
          <img src={Logo} width={46} height={46} />
        </div>

        <div className='d-flex justify-content-between w-50'>
          <ul>
            {categories && <GenerateMenuHtml categories={categories} />}
          </ul>
        </div>

        <div className='d-flex w-50 justify-content-end'>
          {/* S2 - Search */}
          <input tabIndex={1} placeholder={t('search')} aria-label={t('search')} role="search" />

          {/* S2 - Wishlist & Shopping Card */}
          {Object.values(submenu).map((l, i) => (
            <div key={i}>
              <Link 
                to={l.link}
                aria-label={t(l.name)}
                tabIndex={1}
              >
                <GetIconByName name={l.icon} size={30} />
              </Link>
            </div>
          ))}
        </div>
      </section>
      <hr/>

      {!docReader && setDocReader(true)}
    </nav>
  )
}

export default Navbar

