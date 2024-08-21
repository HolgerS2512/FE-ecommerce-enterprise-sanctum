import { useEffect, useRef, useState } from "react";
import { useNotification } from "../../Contexts/NotificationProvider";
import { useTranslation } from "react-i18next";

import axiosClient from "../../axios-clint";
import { createValidator } from "../../Modules/ValidationManager";
import ClientErrorManager from "../../Modules/ClientErrorManager";
import { findInOptions } from "../../Modules/ObjectHelper";
import ROUTES from "../../Settings/ROUTES";

import BlankForm from "../BlankForm";
import CheckboxText from "../Util/CheckboxText";
import InputInchField from "../Util/InputInchField";
import HttpStatusMsg from "../../Views/Notifications/HttpStatusMsg";
import Select from '../Util/Select';
import GetCountryOpts from "../../Settings/GetCountryOpts";
import RegularBtn from "../Helpers/RegularBtn";

const StoreAddress = ({ data, user, setDataEmpty, open, onClose, httpStatus, setHttpStatus }) => {
  // Common
  const { setNotification } = useNotification();
  const {t} = useTranslation();
  const CountrieOtions = GetCountryOpts();
  const dataObj = {
    firstname: data.firstname ?? user.firstname,
    lastname: data.lastname ?? user.lastname,
    street: data.street ?? '',
    details: data.details ?? '',
    zip: data.zip ?? '',
    city: data.city ?? '',
    state: data.state ?? '',
    phone: data.phone ?? '',
  }
  const errBP = {
    firstname: { msg: [] },
    lastname: { msg: [] },
    street: { msg: [] },
    details: { msg: [] },
    zip: { msg: [] },
    city: { msg: [] },
    state: { msg: [] },
    country: { msg: [] },
    phone: { msg: [] },
  }
  const inputBP = {
    firstname: '',
    lastname: '',
    street: '',
    details: '',
    zip: '',
    city: '',
    state: '',
    country: '',
    phone: '',
  }
  // Input States
  const [payload, setPayload] = useState(inputBP);
  const [activeAddr, setActiveAddr] = useState(false);
  const [isStandard, setIsStandard] = useState(false);
  // Ref
  const countryRef = useRef(null);
  // States
  const [isLoading, setIsLoading] = useState(false);
  const [hasData, setHasData] = useState(false);
  const [hasUpdate, setHasUpdate] = useState(true);
  // Errorhandling
  const [clientError, setClientError] = useState(errBP);
  // Validation
  const { val } = createValidator(clientError);
  const { getErrorMsg } = ClientErrorManager(clientError);

  useEffect(() => {
    setNavigatorLanguage();
  }, []);

  useEffect(() => {
    loadAddress();
  }, [data]);

  useEffect(() => {
    dataGuard();
    clearPrevValues();
  }, [open]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setHttpStatus({});
    setIsLoading(true);

    const check = validPayload();

    if (Boolean(check.length) && check.every((v) => v)) {
      if (activeAddr) payload.active = activeAddr;

      try {
        const route = `${ROUTES.account.ADDRESSES}${hasData ? '/' + data.id : ''}`;
        const res = await (hasData ? axiosClient.put(route, payload) : axiosClient.post(route, payload));

        if (res.data.status) {
          setNotification({
            visible : true,
            status : 's',
            msg : res.data.message,
          });
          onClose();
        } 
      } catch (err) {
        const { message } = err.response.data;
        setHttpStatus({ visible: true, msg: message });
      }
    }
    clearPrevValues()
  }

  const validPayload = () => {
    const countryValue = countryRef.current.getValue()[0].value;
    payload.country = countryValue;
    if (!Boolean(payload.phone.length)) clientError.phone.msg = [];
    return [
      !val('firstname', payload.firstname),
      !val('lastname', payload.lastname),
      !val('street', payload.street),
      !val('details', payload.details),
      !val('zip', payload.zip),
      !val('city', payload.city),
      !val('state', payload.state),
      !val('country', payload.country),
      Boolean(payload.phone.length) ? !val('phone', payload.phone) : true,
    ];
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPayload({ ...payload, [name]: value });
    if (name === 'phone' && value.length <= 6) {
      clientError.phone.msg = [];
      return;
    }
    val(name, value);
    if (open && hasUpdate) setHasUpdate(false);
  }

  const handleSelectChange = (obj) => {
    const { value } = obj;
    setPayload({ ...payload, country: value });
    val('country', value);
  }

  const handleCheckbox = () => {
    setActiveAddr((prev) => !prev);
    if (open && hasUpdate) setHasUpdate(false);
  }

  const loadAddress = () => {
    if (!Boolean(Object.keys(data).length)) return;
    if (data.country) {
      const obj = findInOptions(CountrieOtions).byValue(data.country);
      countryRef.current.setValue(obj);
    }
    if (data.active) {
      setActiveAddr(true);
      setIsStandard(true);
    }
    setPayload({ ...dataObj });
    setHasData(true);
  }

  const setNavigatorLanguage = () => {
    const language = navigator.language || navigator.userLanguage;
    const country = language.split('-')[1] || language.split('-')[0];
    
    CountrieOtions.forEach((o) => {
      const { value, label } = o;
      if (value === country.toUpperCase()) {
        countryRef.current.setValue({ value: value, label: label });
      }
    });
  }

  const clearPrevValues = () => {
    if (!open) {
      setDataEmpty();
      setActiveAddr(false);
      setClientError(errBP);
      setHasData(false);
      setIsStandard(false);
      setNavigatorLanguage();
      setHasUpdate(true);
    }
    setIsLoading(false);
  }

  const dataGuard = () => {
    if (open && !Boolean(Object.keys(data).length)) {
      setPayload(inputBP);
    }
  }

  const handleDelete = async (e) => {
    try {
      const res = await axiosClient.delete(`${ROUTES.account.ADDRESSES}/${data.id}`);

      if (res.data.status) {
        setNotification({
          visible : true,
          status : 's',
          msg : res.data.message,
        });
        onClose();
        clearPrevValues();
      } 
    } catch (err) {
      const { message } = err.response.data;
      setNotification({
        visible : true,
        status : 'e',
        msg : message,
      });
    }
    e.preventDefault();
  }

  const deleteBtn = (
    <RegularBtn 
      onClick={handleDelete} 
      ariaLabel={t('delete')} 
      text={t('delete')} 
      color="secondary"
      classes='pe-2'
    />
  );

  return (
    <BlankForm
      onSubmit={handleSubmit}
      isLoading={isLoading}
      submitBtnText={hasData ? t('update') : t('save')}
      btnPos='end'
      require={false}
      secondBtn={hasData ? deleteBtn : null}
      btnDisabled={hasUpdate}
    >
      {httpStatus.visible && <HttpStatusMsg msg={httpStatus.msg} />}
      <div className="row">

        <InputInchField
          col='col-sm-6'
          label={t('input.firstname')} 
          name='firstname'
          onChange={handleChange}
          value={payload.firstname} 
          err={getErrorMsg('firstname')}
        />

        <InputInchField
          col='col-sm-6'
          label={t('input.lastname')} 
          name='lastname'
          onChange={handleChange}
          value={payload.lastname} 
          err={getErrorMsg('lastname')}
        />

        <InputInchField
          label={t('input.street')} 
          name='street'
          onChange={handleChange}
          value={payload.street} 
          err={getErrorMsg('street')}
          limit={false}
        />

        <InputInchField
          label={t('input.details')} 
          name='details'
          onChange={handleChange}
          value={payload.details} 
          err={getErrorMsg('details')}
          limit={false}
          noRequire={true}
        />

        <InputInchField
          col='col-sm-6'
          label={t('input.zip')} 
          name='zip'
          onChange={handleChange}
          value={payload.zip} 
          err={getErrorMsg('zip')}
        />

        <InputInchField
          col='col-sm-6'
          label={t('input.city')} 
          name='city'
          onChange={handleChange}
          value={payload.city} 
          err={getErrorMsg('city')}
        />

        <InputInchField
          col='col-sm-6'
          label={t('input.state')} 
          name='state'
          onChange={handleChange}
          value={payload.state} 
          err={getErrorMsg('state')}
          noRequire={true}
        />

        <div className='col-sm-6'>
          <Select
            name={t('input.country')}
            ariaLabel={`${t('tab_select_field')}: ${t('input.country')}`}
            onChange={handleSelectChange}
            value={payload.country}
            ref={countryRef}
            options={CountrieOtions} 
            err={getErrorMsg('country')}
            limit={false}
          />
        </div>

        <InputInchField
          label={t('input.phone')} 
          name='phone'
          onChange={handleChange}
          value={payload.phone} 
          err={getErrorMsg('phone')}
          limit={false}
          noRequire={true}
        />

        <div className="mb-5 mb-sm-0 mt-1 ms-3">
          <CheckboxText 
            text={t('as_primary_address')} 
            disabled={isStandard} 
            isChecked={activeAddr}
            setIsChecked={handleCheckbox}
          />
        </div>

      </div>
    </BlankForm>
  )
}

export default StoreAddress
