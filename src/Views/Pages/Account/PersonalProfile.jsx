import { useTranslation } from "react-i18next"
import { useOutletContext } from "react-router-dom";

import ChangePassword from "../../../components/Account/ChangePassword";
import ChangeEmail from "../../../components/Account/ChangeEmail";
import ChangePersonal from "../../../components/Account/ChangePersonal";

const PersonalProfile = () => {
  const {t} = useTranslation();
  const { isLoading, setIsLoading } = useOutletContext();

  // Important loader not allowed to set true! 
  // Consequences visibility error!
  const closeLoader = () => setIsLoading(false);

  return (
    <div className={`container acc-dist${!isLoading ? '' : ' hidden'} `}>
      <div className="wrap70r">

        <h1 className="mb-5" tabIndex={1} aria-description={t('personal_profile')}>{t('personal_profile')}</h1>
        {/* <div className="p mb-5">{t('check_your_personality')}</div> */}

        <section className="accordion" id="changePersonalData">

          {/* Personal Data */}
          <div className="accordion-item">
            <div className="mb-2">
              <span className="p"><strong>{t('personal_data')}</strong></span>
            </div>
            {/* Personal Data */}
            <h2 className="accordion-header">
              <button tabIndex={1} className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#changePersonal" aria-expanded="true" aria-controls="changePersonal">
                {t('change_personal')}
              </button>
            </h2>
            <div id="changePersonal" className="accordion-collapse collapse show" data-bs-parent="#changePersonalData">
              <div className="accordion-body">
                <ChangePersonal closeLoader={closeLoader} isLoading={isLoading} />
              </div>
            </div>
          </div>


          {/* Access Data */}
          <div className="accordion-item">
            <div className="mt-3 mb-2 pt-4">
              <span className="p"><strong>{t('access_data')}</strong></span>
            </div>
            {/* Access Data */}
            <h2 className="accordion-header">
              <button tabIndex={1} className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#changeEmail" aria-expanded="false" aria-controls="changeEmail">
                {t('change_email')}
              </button>
            </h2>
            <div id="changeEmail" className="accordion-collapse collapse" data-bs-parent="#changePersonalData">
              <div className="accordion-body">
                <ChangeEmail />
              </div>
            </div>
          </div>

          <div className="accordion-item">
            <h2 className="accordion-header">
              <button tabIndex={1} className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#changePassword" aria-expanded="false" aria-controls="changePassword">
                {t('change_password')}
              </button>
            </h2>
            <div id="changePassword" className="accordion-collapse collapse" data-bs-parent="#changePersonalData">
              <div className="accordion-body">
                <ChangePassword />
              </div>
            </div>
          </div>

        </section>

      </div>
    </div>
  )
}

export default PersonalProfile
