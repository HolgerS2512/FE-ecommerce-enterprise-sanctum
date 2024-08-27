import React from 'react'
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import ROUTES from '../../Settings/ROUTES';
import COMPANY from '../../Settings/COMPANY';

const companyName = COMPANY.name;

const PolicyPicker = () => {
  const { t } = useTranslation();

  return (
    <div className='policy-notice'>
      <p>{t('policy_p_1')}<Link
        to={ROUTES.pages.TOU}
        aria-label={t('terms')}
        target="_blank"
        rel="noopener noreferrer"
        tabIndex={1}
      >{t('terms')}
      </Link>{t('policy_p_2', {companyName})}<Link 
        to={ROUTES.pages.PRIVACY}
        aria-label={t('privacy_policy')}
        target="_blank"
        rel="noopener noreferrer"
        tabIndex={1}
      >{t('privacy_policy')}
      </Link>{t('policy_p_3', {companyName})}</p>
    </div>
  )
}

export default PolicyPicker
