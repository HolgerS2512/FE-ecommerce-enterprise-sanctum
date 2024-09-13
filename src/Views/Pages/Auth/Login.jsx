import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useStateContext } from './../../../Contexts/ContextProvider.jsx';
import { useTranslation } from "react-i18next";

import axiosClient from '../../../axios-clint.js';
import { createValidator } from './../../../Modules/ValidationManager.jsx';
import ClientErrorManager from '../../../Modules/ClientErrorManager.js';

import HttpStatusMsg from '../../Notifications/HttpStatusMsg.jsx';
import PasswordField from '../../../components/Util/PasswordField.jsx';
import AuthForm from '../../../components/Auth/AuthForm.jsx';
import SendPinAgain from '../../Notifications/SendPinAgain.jsx';
import ROUTES from '../../../Settings/ROUTES.js';

const Login = () => {
  // Common
  const {setUser, setSessionToken, lookup, setLookup} = useStateContext();
  const { t } = useTranslation();
  const navigate = useNavigate();
  // Input states
  const [inputData, setInputData] = useState({
    email: lookup || '',
    password: '',
  });
  // States
  const [btnLoader, setBtnLoader] = useState(false);
  const [verify, setVerify] = useState(false);
  // Errorhandling
  const [httpStatus, setHttpStatus] = useState({ visible: false });
  const [clientError] = useState({
    password: { msg: [] },
    email: { msg: [] }
  });
  // Validation
  const { val } = createValidator(clientError);
  const { getErrorMsg } = ClientErrorManager(clientError);

  useEffect(() => {
    if (!inputData.email) navigate(ROUTES.auth.LOOKUP);
  }, []);

  const handleSubmit = async () => {
    const check = [
      !val('email', inputData.email),
      !val('password', inputData.password),
    ];

    if (Boolean(check.length) && check.every((v) => v)) {
      const payload = {
      email: inputData.email,
      password: inputData.password,
      };
    
      try {
        const res = await axiosClient.post(ROUTES.auth.LOGIN, payload);
        if (await res.data) {
          const { user, token } = await res.data;
          setLookup('');
          setUser(user);
          setSessionToken(token);
          // setTimeout(() => window.location.reload(), 0);
          navigate(ROUTES.pages.HOME);
        } 
      } catch (err) {
        if (err.response.status === 408) {
          setVerify(true);
        }
        setHttpStatus({ visible: true, error: err });
      }
    }
    setBtnLoader(false);
  }
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputData({ ...inputData, [name]: value });
    val(name, value);
  }

  const handleHttpErr = (err) => setHttpStatus(err)

  return (
    <AuthForm 
      onSubmit={(e) => {
        e.preventDefault();
        setBtnLoader(true);
        handleSubmit();
      }}
      isLoading={btnLoader} 
      h1={t('login_greeting')}
      submitBtnText={t('continue')}
      extra={      
      <div className='d-flex mb-4'>
        <span className='me-1 fw-semibold'>{inputData.email}</span>
        <Link 
          className='cg-link' 
          to={ROUTES.auth.LOOKUP}
          aria-label={`${inputData.email} ${t('edit')}`} 
          tabIndex={1}
        >{t('edit')}</Link>
      </div>}
    >
      {httpStatus.visible && <HttpStatusMsg error={httpStatus.error} />}

      {verify && <SendPinAgain email={inputData.email} setHttpErr={handleHttpErr} />}

      <PasswordField
        label={t('input.password_k')} 
        onChange={handleChange}
        value={inputData.password} 
        err={getErrorMsg('password')}
      />

      <Link 
        className='cg-link' 
        to={ROUTES.auth.FORGETPWD}
        aria-label={t('FORGETPWD_password')}
        tabIndex={1}
      >{t('FORGETPWD_password')}</Link>

    </AuthForm>
  )
}

export default Login
