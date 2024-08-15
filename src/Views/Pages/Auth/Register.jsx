import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useStateContext } from './../../../Contexts/ContextProvider.jsx';
import { useTranslation } from "react-i18next";

import axiosClient from '../../../axios-clint.js';
import ValidationManager, { createValidator } from './../../../Modules/ValidationManager.jsx';
import ClientErrorManager from '../../../Modules/ClientErrorManager.js';
import ROUTES from '../../../Settings/ROUTES.js';

import HttpStatusMsg from '../../Notifications/HttpStatusMsg.jsx';
import PolicyPickerCheckbox from '../../../components/Auth/PolicyPickerCheckbox.jsx';
import AuthForm from '../../../components/Auth/AuthForm.jsx';
import InputInchField from '../../../components/Util/InputInchField.jsx';
import PasswordAddition from '../../../components/Helpers/PasswordAddition.jsx';
import PasswordField from '../../../components/Util/PasswordField.jsx';

const Register = () => {
  // Common
  const { lookup } = useStateContext();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const inputBP = {
    firstname: '',
    lastname: '',
    password: '',
    email: lookup || '',
  };
  // Input States
  const [inputData, setInputData] = useState(inputBP);
  const [isTacChecked, _setIsTacChecked] = useState(false);
  const [tacErr, setTacErr] = useState(false);
  // States
  const [btnLoader, setBtnLoader] = useState(false);
  const [hasVal, setHasVal] = useState(false);
  const [hasValChars, setHasValChars] = useState(false);
  const [hasValAddition, setHasValAddition] = useState(false);
  // Errorhandling
  const [httpStatus, setHttpStatus] = useState({ visible: false });
  const [clientError] = useState({
    firstname: { msg: [] },
    lastname: { msg: [] },
    password: { msg: [] },
    email: { msg: [] },
  });
  // Validation
  const { val } = createValidator(clientError);
  const { getErrorMsg } = ClientErrorManager(clientError);

  useEffect(() => {
    if (!inputData.email) navigate(ROUTES.auth.LOOKUP);
  }, []);

  const handleSubmit = async () => {
    const payload = {
      firstname: (inputData.firstname[0].toUpperCase() + inputData.firstname.substring(1)).trim(),
      lastname: (inputData.lastname[0].toUpperCase() + inputData.lastname.substring(1)).trim(),
      email: inputData.email.trim(),
      password: inputData.password.trim(),
    };

    const check = {...ValidationManager(payload)};

    setHasVal(true);

    if (Boolean(Object.keys(check).length) || !isTacChecked) {
      setTacErr(!isTacChecked);

      Object.keys(check).forEach((name) => {
        clientError[name].msg = check[name] ?? [];
        if (name === 'password') passValidation(inputData.password);
      });
    } else {
      try {
        const res = await axiosClient.post(ROUTES.auth.REGISTER, payload);
        if (res.data.status) {
          navigate(`${ROUTES.auth.VERIFYEMAIL}/${res.data.url}`);
        } 
      } catch (err) {
        const { message } = err.response.data;
        setHttpStatus({ visible: true, msg: message });
      }
    }
    setBtnLoader(false);
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputData({ ...inputData, [name]: value });
    val(name, value);
  }

  const passValidation = (value) => {
    const check = {...ValidationManager({ password: value })};
    const checked = !Boolean(Object.keys(check).length);

    setHasValChars(value.length >= 8);
    setHasValAddition(checked);
    clientError['password'].msg = check['password'] ?? [];
  }

  const setIsTacChecked = () =>{
    setTacErr(isTacChecked);
    _setIsTacChecked((tac) => !tac);
  }

  return (
    <AuthForm
      onSubmit={(e) => {
        e.preventDefault();
        setBtnLoader(true);
        handleSubmit();
      }}
      isLoading={btnLoader} 
      beforeH1={<p className='h1 mb-3'>{t('register_greeting')}</p>}
      h1={t('register_greeting2')}
      submitBtnText={t('signup')}
      extra={      
        <div className='d-flex mb-3 mb-md-4'>
          <span className='me-1 fw-semibold'>{inputData.email}</span>
          <Link 
            className='cg-link' 
            to={ROUTES.auth.LOOKUP} 
            aria-label={`${inputData.email} ${t('edit')}`} 
            tabIndex={1}
          >{t('edit')}</Link>
        </div>}
    >
      {httpStatus.visible && <HttpStatusMsg msg={httpStatus.msg} />}

      <div className="row">
        <InputInchField
          col='col-6'
          label={t('input.firstname')} 
          name='firstname'
          onChange={handleChange}
          value={inputData.firstname} 
          err={getErrorMsg('firstname')}
        />

        <InputInchField
          col='col-6'
          label={t('input.lastname')} 
          name='lastname'
          onChange={handleChange}
          value={inputData.lastname} 
          err={getErrorMsg('lastname')}
        />
      </div>

      <PasswordField
        label={t('input.password_k')} 
        onChange={handleChange}
        value={inputData.password} 
        name='password'
        err={getErrorMsg('password')}
        noVal={true}
      />

      <PasswordAddition 
        checked={hasVal}
        chars={hasValChars}
        addition={hasValAddition}
      />

      <PolicyPickerCheckbox 
        isChecked={isTacChecked} 
        setIsChecked={setIsTacChecked} 
        err={tacErr} 
      />

    </AuthForm>
  )
}

export default Register
