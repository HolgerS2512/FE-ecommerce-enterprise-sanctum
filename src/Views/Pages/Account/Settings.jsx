import { useEffect, useRef, useState } from 'react';
import { useLocation, useOutletContext } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useStateContext } from '../../../Contexts/ContextProvider';

import ROUTES from '../../../Settings/ROUTES';

import NewsletterSubscriber from '../../../components/Account/NewsletterSubscriber';
import RegularBtn from '../../../components/Helpers/RegularBtn';
import WindowForm from '../../../components/WindowForm';
import DeleteAccount from '../../../components/Account/DeleteAccount';
import DataProtection from '../../../components/Account/DataProtection';

const Settings = () => {
  // Common
  const { user, setUserProps } = useStateContext();
  const { isLoading, setIsLoading } = useOutletContext();
  const {t} = useTranslation();
  const targetRef = useRef();
  const location = useLocation();
  const { pathname } = location;
  // States
  const [visible, setVisible] = useState(false);
  const [windowCn, setWindowCn] = useState(false);
  // Newsletter subscriber states
  const { id, newsletter_subscriber } = user;
  // Open Accordion
  const lastParam = pathname.replace(`${ROUTES.account.SETTINGS}/`, '');
  const isPrivacyActive = 'privacy' === lastParam;
  
  useEffect(() => {
    if (isPrivacyActive && !isLoading) {
      scrollToElement();
    }
  }, [isPrivacyActive]);

  useEffect(() => {
    if (Boolean(Object.keys(user).length) && isLoading) {
      setTimeout(() => setIsLoading(false), 200);
    }
    setVisible(!isLoading);
  }, [user, isLoading]);

  const scrollToElement = () => {
    const btn = targetRef.current.querySelector('.accordion-button');
    if (btn) {
      targetRef.current.scrollIntoView({ behavior: 'smooth' });
      setFocusAfterScroll(btn);
    }
  };

  const setFocusAfterScroll = (btn) => {
    let isScrolling;
    window.addEventListener('scroll', () => {
      window.clearTimeout(isScrolling);
      // Set a timeout to run after scrolling ends
      isScrolling = setTimeout(() => {
        btn.focus();
      }, 150); // Adjust the delay as necessary
    }, { passive: true });
  }

  const handleWindow = () => setWindowCn((b) => !b);

  return (
    <div className='position-relative hidden' style={visible ? { visibility: 'visible' } : null}>

      {windowCn &&
        <div className='hl-big'>
          <WindowForm
            open={windowCn} 
            onClose={() => setWindowCn(false)} 
            h1={t('question_delete_account')}
            >
            <DeleteAccount onClose={() => setWindowCn(false)} />
          </WindowForm>
        </div>
        }

      <div className="container acc-dist">
        <div className="wrap35r">

          <h1 className="mb-5" tabIndex={1} aria-description={t('settings')}>{t('settings')}</h1>

          <section className="accordion" id="changeAccountData">

            {/* Newsletter Subscriber */}
            <div className="accordion-item">
              <div className="mb-2">
                <span className="p"><strong>{t('notification_setting')}</strong></span>
              </div>
              {/* Newsletter Subscriber */}

              <h2 className="accordion-header">
                <button tabIndex={1} className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#changeSubscriber" aria-expanded={!isPrivacyActive ? 'true' : 'false'} aria-controls="changeSubscriber">
                  {t('change_general_notifications')}
                </button>
              </h2>
              <div id="changeSubscriber" className={`accordion-collapse collapse${isPrivacyActive ? '' : ' show'}`} data-bs-parent="#changeAccountData">
                <div className="accordion-body">
                  <NewsletterSubscriber 
                    id={id}
                    newsletter_subscriber={newsletter_subscriber}
                    setUserProps={setUserProps}
                  />
                </div>
              </div>
            </div>


            {/* Data Protection */}
            <div ref={targetRef} className="accordion-item">
              <div className="mt-3 mb-2 pt-4">
                <span className="p"><strong>{t('data_protection')}</strong></span>
              </div>
              {/* Data Protection */}

              <h2 className="accordion-header">
                <button tabIndex={1} className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#changeDataProtection" aria-expanded={isPrivacyActive ? 'true' : 'false'} aria-controls="changeDataProtection">
                  {t('change_cookie_settings')}
                </button>
              </h2>
              <div id="changeDataProtection" className={`accordion-collapse collapse${isPrivacyActive ? ' show' : ''}`} data-bs-parent="#changeAccountData">
                <div className="accordion-body">
                  <DataProtection />
                </div>
                <hr className='chr-line' />
              </div>
            </div>

            {/* Account Settings */}
            <div className="accordion-item">
              <div className="mt-3 mb-2 pt-4">
                <span className="p"><strong>{t('account_settings')}</strong></span>
              </div>
              {/* Account Settings */}

              <div className="d-flex justify-content-between align-items-center">
                <span>{t('delete_account')}</span>
                <RegularBtn
                  onClick={handleWindow} 
                  disabled={false}
                  position="end" 
                  ariaLabel={t('delete')} 
                  text={t('delete')}
                  color='secondary'
                />
              </div>
            </div>

          </section>

        </div>
      </div>
    </div>
  )
}

export default Settings
