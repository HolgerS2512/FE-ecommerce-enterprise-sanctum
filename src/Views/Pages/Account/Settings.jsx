import { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import NewsletterSubscriber from '../../../components/Account/NewsletterSubscriber';
import { useStateContext } from '../../../Contexts/ContextProvider';
import RegularBtn from '../../../components/Helpers/RegularBtn';
import WindowForm from '../../../components/WindowForm';
import DeleteAccount from '../../../components/Account/DeleteAccount';

const Settings = () => {
  // Common
  const { user, setUserProps } = useStateContext();
  const { isLoading, setIsLoading } = useOutletContext();
  const {t} = useTranslation();
  // States
  const [visible, setVisible] = useState(false);
  const [window, setWindow] = useState(false);
  // Newsletter subscriber states
  const { id, newsletter_subscriber } = user;

  useEffect(() => {
    if (Boolean(Object.keys(user).length) && isLoading) {
      setTimeout(() => setIsLoading(false), 200);
    }
    setVisible(!isLoading);
  }, [user, isLoading]);

  const handleWindow = () => setWindow((b) => !b);

  return (
    <div className='position-relative hidden' style={visible ? { visibility: 'visible' } : null}>

      {window &&
        <div className='hl-big'>
          <WindowForm
            open={window} 
            onClose={() => setWindow(false)} 
            h1={t('question_delete_account')}
            >
            <DeleteAccount onClose={() => setWindow(false)} />
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
                <button tabIndex={1} className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#changeSubscriber" aria-expanded="true" aria-controls="changeSubscriber">
                  {t('change_general_notifications')}
                </button>
              </h2>
              <div id="changeSubscriber" className="accordion-collapse collapse show" data-bs-parent="#changeAccountData">
                <div className="accordion-body mt-3">
                  <NewsletterSubscriber 
                    id={id}
                    newsletter_subscriber={newsletter_subscriber}
                    setUserProps={setUserProps}
                  />
                </div>
              </div>
            </div>


            {/* Data Protection */}
            <div className="accordion-item">
              <div className="mt-3 mb-2 pt-4">
                <span className="p"><strong>{t('data_protection')}</strong></span>
              </div>
              {/* Data Protection */}

              <h2 className="accordion-header">
                <button tabIndex={1} className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#changeDataProtection" aria-expanded="false" aria-controls="changeDataProtection">
                  {t('change_cookie_settings')}
                </button>
              </h2>
              <div id="changeDataProtection" className="accordion-collapse collapse" data-bs-parent="#changeAccountData">
                <div className="accordion-body">
                  {/* <ChangeEmail /> */}
                </div>
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
