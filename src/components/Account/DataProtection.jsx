import { useEffect, useState } from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import { useCookieContext } from '../../Contexts/CookieProvider';
import { useNotification } from '../../Contexts/NotificationProvider';
import { useTranslation } from 'react-i18next';

import axiosClient from '../../axios-clint';
import ROUTES from '../../Settings/ROUTES';
import COMPANY from '../../Settings/COMPANY';
import HttpStatusMsg from '../../Views/Notifications/HttpStatusMsg';

import BlankForm from '../BlankForm'
import CheckboxText from '../Util/CheckboxText';
import Cookies from '../../Settings/Cookies';
import CookieProviderObj from '../../common/Cookie/CookieProviderObj';
import { findObjsInArr } from '../../Modules/ObjectHelper';

const companyName = COMPANY.name;

const DataProtection = () => {
  // Common
  const { isLoading, setIsLoading } = useOutletContext();
  const { ccSettings, setCcSettings } = useCookieContext();
  const { setNotification } = useNotification();
  const {t} = useTranslation();
  // Input states
  const [inputData, setinputData] = useState(ccSettings);
  // States
  const [hasUpdate, setHasUpdate] = useState(true);
  const [btnLoader, setBtnLoader] = useState(false);
  // Errorhandling
  const [httpStatus, setHttpStatus] = useState({ visible: false });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setHttpStatus({});
    setBtnLoader(true);
    
    const checkLength = Object.keys(ccSettings).length === Object.keys(inputData).length;

    if (checkLength && canSubmit(inputData)) {
      try {
        const route = ROUTES.request.COOKIE;
        const res = await axiosClient.post(route, inputData);

        if (res.data.status) {
          setNotification({
            visible : true,
            status : 's',
            msg : t('http.success.update.settings'),
          });
          setCcSettings(inputData);
          setHasUpdate(true);
          setIsLoading(true);
        } 
      } catch (err) {
        const { message } = err.response.data;
        setHttpStatus({ visible: true, msg: message });
      }
    }
    setBtnLoader(false);
  }

  const canSubmit = (payload) => {
    payload.consented = true;

    const checkIfBool = [];
    Object.values(payload).forEach((value) => {
      checkIfBool.push(typeof value === 'boolean');
    });

    const compareValues = [];
    Object.keys(ccSettings).forEach((key) => {
      const quest = ccSettings[key] === payload[key];
      compareValues.push(quest);
    });

    const result = (
      checkIfBool.every((v) => v) 
      && compareValues.some((b) => b === false)
    );
    setHasUpdate(!result)

    return result;
  }

  const handleChange = (e) => {
    const { name, checked } = e.target;
    const bool = e.key === 'Enter' ? !checked : checked;
    setinputData({ ...inputData, [name]: bool });
    canUpdate(name, bool);
  }

  const canUpdate = (name, currValue) => {
    const result = [
      ccSettings[name] === currValue,
    ];
    Object.keys(ccSettings).forEach((key) => {
      if (key !== name) {
        const quest = ccSettings[key] === inputData[key];
        result.push(quest);
      }
    });
    setHasUpdate(!(result.some((b) => b === false)));
  }

  const generateCheckboxHTML = ({ name, data }) => {
    const notRequired = name === 'necessary';
    return (
      <>
        <hr className='chr-line' />
        <div className='mb-4 pt-3'>
          <div className='d-flex align-items-center'>
            <CheckboxText 
              text={t(`cookie.${name}`)} 
              isChecked={inputData[name]}
              setIsChecked={notRequired ? () => {} : handleChange}
              name={name}
              disabled={notRequired ? notRequired : !Boolean(data[0]?.cookies.length)}
              setDisabled={notRequired ? !notRequired : Boolean(data[0]?.cookies.length)}
            />
            <span id="cc-number" className='mb-1'>{findObjsInArr(data).byLength() ?? 0}</span>
          </div>
          <div className='my-3'>{t(`cookie.${name}_txt`)}</div>

          {/* References START */}
          {Boolean(data[0]?.cookies.length) && 
            Object.values(data).map((obj, i) => (
              <div key={i} className={`cc-container${Boolean(i) ? ' mt-3' : ''}`}>
                <CookieProviderObj data={obj} />
              </div>
            ))}
          {/* References END */}

        </div>
      </>
    )
  }

  return (
    <BlankForm
      onSubmit={handleSubmit}
      isLoading={btnLoader}
      submitBtnText={t('update')}
      btnPos='end'
      require={false}
      btnDisabled={hasUpdate}
    >
      {httpStatus.visible && <HttpStatusMsg msg={httpStatus.msg} />}

      <div tabIndex={1} className='p my-4'>{t('data_protection_setting_txt', {companyName})}</div>
      <div tabIndex={1} className='p mb-3'>{t('data_protection_setting_txt2')}<Link className='inside-link' to={ROUTES.pages.PRIVACY} aria-label={t('privacy_and_cookie_policy')}>{t('privacy_and_cookie_policy')}</Link>.</div>

      <div className='py-2'>

        {Cookies.map((cookie, i) => (
          <div key={i} className="cc-renderer">
            {generateCheckboxHTML(cookie)}
          </div>
        ))}
        
      </div>

    </BlankForm>
  )
}

export default DataProtection
