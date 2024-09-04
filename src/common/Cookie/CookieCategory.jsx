import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import Cookies from '../../Settings/Cookies';

import { ArrowDown } from '../../components/icon/Icons';
import CookieProviderObj from './CookieProviderObj';

const CookieCategory = ({ cookies, setCookies }) => {
  const {t} = useTranslation();

  const handleChangeSwitch = (e) => {
    const { name, checked } = e.target;
    setCookies({ ...cookies, [name]: checked });
  }

  const countCookiesInDataArr = (arr) => {
    if (arr[0] === undefined) return;
    const counter = [];
    Object.values(arr).forEach((obj) => {
      counter.push(obj.cookies.length);
    });
    return counter.reduce((a, b) => a + b);
  }

  const sendPromptMsg = () => alert(t('cookie.alert_msg'));

  return (Object.values(Cookies).map((category, i) => (
    <li key={i} className="cc-renderer">
      <div className="ms-2">
        <div className="mb-3 me-3 d-flex align-items-center justify-content-between">
          <button 
            tabIndex={1} 
            className="acc-cc-btn btn-nostyle" 
            type="button" 
            data-bs-toggle="collapse" 
            data-bs-target={`#${category.name}`} 
            aria-expanded="false" 
            aria-controls={`${category.name}`}
            aria-label={t(`cookie.${category.name}`)}
            aria-labelledby='cc-cat-cont'
            disabled={!Boolean(countCookiesInDataArr(category.data) ?? 0)}
          >
            <i id="cc-icon"><ArrowDown /></i>
            <span className="txt text-start">{t(`cookie.${category.name}`)}</span>
            <span id="cc-number">{countCookiesInDataArr(category.data) ?? 0}</span>
          </button>

          <div className="form-switch" onClick={category.required ? sendPromptMsg : ()=>{}}>
            <input 
              tabIndex={1} 
              className="form-check-input cc-switch" 
              type="checkbox" 
              name={category.name}
              role="switch" 
              checked={category.required || cookies[category.name]} // hier <---- || true oder fallse falls cookie vorhanden!
              disabled={category.required || !Boolean(countCookiesInDataArr(category.data) ?? 0)}
              onChange={handleChangeSwitch}
              aria-label={`${t(`cookie.cookie`)}: ${t(`cookie.${category.name}`)} ${cookies[category.name] ? t('cookie.deactivate') : t('cookie.activate')}`}
              aria-expanded={cookies[category.name]}
            />
          </div>
        </div>

        <div id="cc-cat-cont" className="me-sm-3">{t(`cookie.${category.name}_txt`)}</div>
      </div>

      {Boolean(countCookiesInDataArr(category.data)) && 
        <div className="collapse" id={`${category.name}`}>
          <div className="card card-body mt-2">
            <div className="pb-4 pt-3 ms-xl-5 ms-3">

              {category.data[0] !== undefined && 
                Object.values(category.data).map((obj, i) => (
                  <div key={i} className={`cc-container${Boolean(i) ? ' mt-3' : ''}`}>
                    <CookieProviderObj data={obj} />
                  </div>
                ))}

            </div>
          </div>
        </div>
      }

      {Object.values(Cookies).length !== (i + 1) && <hr />}
    </li>
  )))
}

export default CookieCategory
