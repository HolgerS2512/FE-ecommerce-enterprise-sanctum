import { useEffect, useRef, useState } from "react";
import { useNotification } from "../../Contexts/NotificationProvider";
import { useTranslation } from "react-i18next";

import axiosClient from "../../axios-clint";
import { createValidator } from "../../Modules/ValidationManager";
import ClientErrorManager from "../../Modules/ClientErrorManager";

import BlankForm from "../BlankForm";
import CheckboxText from "../Util/CheckboxText";
import InputInchField from "../Util/InputInchField";
import HttpStatusMsg from "../../Views/Notifications/HttpStatusMsg";
import Select from '../Util/Select';
import GetCountryOpts from "../../Settings/GetCountryOpts";

const AddAddress = ({ open, onClose }) => {
  // Common
  const { setNotification } = useNotification();
  const {t} = useTranslation();
  const CountrieOtions = GetCountryOpts();
  const errBP = {
    firstname: { msg: [] },
    lastname: { msg: [] },
    address: { msg: [] },
    details: { msg: [] },
    zip: { msg: [] },
    location: { msg: [] },
    state: { msg: [] },
    country: { msg: [] },
    phone: { msg: [] },
  }
  const inputBP = {
    firstname: '',
    lastname: '',
    address: '',
    details: '',
    zip: '',
    location: '',
    state: '',
    country: '',
    phone: '',
  }
  // Input States
  const [inputData, setInputData] = useState(inputBP);
  const [checkbox, setCheckbox] = useState(false);
  // Ref
  const countryRef = useRef(null);
  // States
  const [isLoading, setIsLoading] = useState(false);
  // Errorhandling
  const [clientError, setClientError] = useState(errBP);
  const [httpStatus, setHttpStatus] = useState({ visible: false });
  // Validation
  const { val } = createValidator(clientError);
  const { getErrorMsg } = ClientErrorManager(clientError);


  useEffect(() => {
    setUserValues();
  }, []);

  useEffect(() => {
    clearPrevValues();
  }, [open]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setHttpStatus({});
    setIsLoading(true);

    const check = validPayload();

    if (Boolean(check.length) && check.every((v) => v)) {
      const payload = {
        firstname: inputData.firstname,
        lastname: inputData.lastname,
        address: inputData.address,
        zip: inputData.zip,
        location: inputData.location,
        phone: inputData.address,
      };

      try {
        const res = await axiosClient.put(ROUTES.account, payload);
        if (res.data.status) {
          setNotification({
            visible : true,
            status : 's',
            msg : res.data.message,
          });
          // setAddress(payload.firstname);
          onClose();
        } 
      } catch (err) {
        const { message } = err.response.data;
        setHttpStatus({ visible: true, msg: message });
      }
    }
    setIsLoading(false);
  }

  const validPayload = () => {
    const countryValue = countryRef.current.getValue()[0].value;
    if (!Boolean(inputData.phone.length)) clientError.phone.msg = [];
    return [
      !val('firstname', inputData.firstname),
      !val('lastname', inputData.lastname),
      !val('address', inputData.address),
      !val('details', inputData.details),
      !val('zip', inputData.zip),
      !val('location', inputData.location),
      !val('state', inputData.state),
      !val('country', countryValue),
      Boolean(inputData.phone.length) ? !val('phone', inputData.phone) : true,
    ];
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputData({ ...inputData, [name]: value });
    if (name === 'phone' && value.length >= 6) {
      val(name, value);
    } else {
      clientError.phone.msg = [];
    }
  }

  const handleSelectChange = (obj) => {
    const { value } = obj;
    setInputData({ ...inputData, country: value });
    val('country', value);
  }

  const handleCheckbox = () => setCheckbox((prev) => !prev);

  const setUserValues = () => {
    setUserSelect();
  }

  const setUserSelect = () => {
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
      setInputData(inputBP);
      setClientError(errBP);
      setIsLoading(false);
    }
  }

  return (
    <BlankForm
      onSubmit={handleSubmit}
      isLoading={isLoading}
      submitBtnText={t('save')}
      btnPos='end'
      require={false}
    >
      {httpStatus.visible && <HttpStatusMsg msg={httpStatus.msg} />}
      <div className="row">

        <InputInchField
          col='col-sm-6'
          label={t('input.firstname')} 
          name='firstname'
          onChange={handleChange}
          value={inputData.firstname} 
          err={getErrorMsg('firstname')}
        />

        <InputInchField
          col='col-sm-6'
          label={t('input.lastname')} 
          name='lastname'
          onChange={handleChange}
          value={inputData.lastname} 
          err={getErrorMsg('lastname')}
        />

        <InputInchField
          label={t('input.address')} 
          name='address'
          onChange={handleChange}
          value={inputData.address} 
          err={getErrorMsg('address')}
          limit={false}
        />

        <InputInchField
          label={t('input.details')} 
          name='details'
          onChange={handleChange}
          value={inputData.details} 
          err={getErrorMsg('details')}
          limit={false}
          noRequire={true}
        />

        <InputInchField
          col='col-sm-6'
          label={t('input.zip')} 
          name='zip'
          onChange={handleChange}
          value={inputData.zip} 
          err={getErrorMsg('zip')}
        />

        <InputInchField
          col='col-sm-6'
          label={t('input.location')} 
          name='location'
          onChange={handleChange}
          value={inputData.location} 
          err={getErrorMsg('location')}
        />

        <InputInchField
          col='col-sm-6'
          label={t('input.state')} 
          name='state'
          onChange={handleChange}
          value={inputData.state} 
          err={getErrorMsg('state')}
          noRequire={true}
        />

        <div className='col-sm-6'>
          <Select
            name={t('input.country')}
            ariaLabel={`${t('tab_select_field')}: ${t('input.country')}`}
            onChange={handleSelectChange}
            value={inputData.country}
            ref={countryRef}
            options={CountrieOtions} 
            // ref={selectCountryRef}
            err={getErrorMsg('country')}
            limit={false}
          />
        </div>

        <InputInchField
          label={t('input.phone')} 
          name='phone'
          onChange={handleChange}
          value={inputData.phone} 
          err={getErrorMsg('phone')}
          limit={false}
          noRequire={true}
        />

        <div className="mb-3 mb-sm-0 mt-1 ms-3">
          <CheckboxText 
            text={t('as_primary_address')} 
            // disabled={true} 
            isChecked={checkbox}
            setIsChecked={handleCheckbox}
          />
        </div>

      </div>
    </BlankForm>
  )
}

export default AddAddress
