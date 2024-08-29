import { useEffect, useState } from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useNotification } from '../../Contexts/NotificationProvider';

import axiosClient from '../../axios-clint';
import ROUTES from '../../Settings/ROUTES';
import COMPANY from '../../Settings/COMPANY';
import HttpStatusMsg from '../../Views/Notifications/HttpStatusMsg';

import BlankForm from '../BlankForm'
import CheckboxText from '../Util/CheckboxText';

const companyName = COMPANY.name;

const DataProtection = ({ id, newsletter_subscriber, setUserProps }) => {
  // Common
  const { isLoading, setIsLoading } = useOutletContext();
  const { setNotification } = useNotification();
  const {t} = useTranslation();
  // Input states
  const inputBP = {
    required: true,
    performance: false,
    experience: false,
    advertising: false,
  };
  const [inputData, setinputData] = useState(inputBP);
  // States
  const [hasUpdate, setHasUpdate] = useState(true);
  const [btnLoader, setBtnLoader] = useState(false);
  // Errorhandling
  const [httpStatus, setHttpStatus] = useState({ visible: false });

  useEffect(() => {
    if (!isNaN(id)) {
      // setNewsletter(newsletter_subscriber);
    }
  }, [isLoading]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setHttpStatus({});
    setBtnLoader(true);

    const check = [];
    const payload = {
      value: true,
      value2: false,
      value3: true,
    };

    Object.values(payload).forEach((value) => {
      check.push(typeof value === 'boolean');
    });

    console.log(check.every((v) => v))
    return;

    if (Boolean(check.length) && check.length === Object.keys(inputData).length && check.every((v) => v)) {
      try {
        const route = `${ROUTES.request.COOKIE}/${id}`;
        const res = await axiosClient.put(route, payload);

        if (res.data.status) {
          setNotification({
            visible : true,
            status : 's',
            msg : res.data.message,
          });
          // setUserProps(payload);
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

  const handleChange = (e) => {
    const { name, checked } = e.target;
    const bool = e.key === 'Enter' ? !checked : checked;
    setinputData({ ...inputData, [name]: bool });
    canUpdate(name, bool);
  }

  const canUpdate = (name, currValue) => {
    // ungleich dann true
    const equalCurrValue = inputBP[name] !== currValue;
    // vergleich hier auf das gesamte obj!
    // console.log(name, currValue)
    setHasUpdate(false);
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
        <hr className='chr-line' />
        <div className='mb-4 pt-3'>
          <CheckboxText 
            text={t('cookie_required')} 
            isChecked={inputData.required}
            setIsChecked={() => {}}
            name='required'
            disabled={true}
            setDisabled={false}
          />
          <div className='mt-3'>{t('cookie_required_txt')}</div>
        </div>
        
        <hr className='chr-line' />
        <div className='mb-4 pt-3'>
          <CheckboxText 
            text={t('cookie_performance')} 
            isChecked={inputData.performance}
            setIsChecked={handleChange}
            name='performance'
          />
          <div className='mt-3'>{t('cookie_performance_txt')}</div>
        </div>
        
        <hr className='chr-line' />
        <div className='mb-4 pt-3'>
          <CheckboxText 
            text={t('cookie_experience')} 
            isChecked={inputData.experience}
            setIsChecked={handleChange}
            name='experience'
          />
          <div className='mt-3'>{t('cookie_experience_txt')}</div>
        </div>
        
        <hr className='chr-line' />
        <div className='mb-4 pt-3'>
          <CheckboxText 
            text={t('cookie_advertising')} 
            isChecked={inputData.advertising}
            setIsChecked={handleChange}
            name='advertising'
          />
          <div className='mt-3'>{t('cookie_advertising_txt')}</div>
        </div>

      </div>

    </BlankForm>
  )
}

export default DataProtection
