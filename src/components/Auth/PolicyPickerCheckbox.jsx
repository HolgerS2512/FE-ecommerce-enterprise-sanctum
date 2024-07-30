import React, { useState } from 'react'
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import ROUTES from '../../Settings/ROUTES';

const PolicyPickerCheckbox = ({ isChecked, setIsChecked, err }) => {
  const { t } = useTranslation();
  const [isHover, setIsHover] = useState(false);

  const handleClick = () => {
    const spanEl = document.querySelector('#pulse');
    spanEl.classList.add('has-pulse');
    setTimeout(() => spanEl.classList.remove('has-pulse'), 250);
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleClick();
      setIsChecked();
      e.preventDefault();
    }
  }

  return (
    <label 
      className="form-check-label pulse-control" 
      htmlFor="tac"
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <span id='pulse' className={isHover ? 'pulse' : ''}></span>
      <div className="form-check">
        <input 
          className='form-check-input'
          type="checkbox" 
          checked={isChecked} 
          id="tac" 
          onChange={setIsChecked}
          onKeyDown={handleKeyDown}
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
          onClick={handleClick}
          aria-required="true"
          aria-labelledby="tac"
          aria-checked={isChecked}
          tabIndex={1}
        />
        
          <div className={(err ? 'error ' : '') + 'policy-notice text-start pt-0 ms-2'}>
            <p>{t('policy_pi_1')}<Link 
              to={ROUTES.pages.TOU}
              aria-label={t('terms')}
              target="_blank"
              rel="noopener noreferrer"
              tabIndex={1}
            >{t('terms')}
            </Link>{t('policy_pi_2')}<Link 
              to={ROUTES.pages.PRIVACY}
              aria-label={t('privacy_policy')}
              target="_blank"
              rel="noopener noreferrer"
              tabIndex={1}
            >{t('privacy_policy')}
            </Link>{t('policy_pi_3')}</p>
          </div>
      </div>
    </label>
  )
}

export default PolicyPickerCheckbox
