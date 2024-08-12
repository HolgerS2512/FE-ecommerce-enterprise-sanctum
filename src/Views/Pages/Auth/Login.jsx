import { useEffect, useState } from 'react';
import { Link, redirect, useNavigate } from 'react-router-dom';
import { useStateContext } from './../../../Contexts/ContextProvider.jsx';
import { useTranslation } from "react-i18next";

import axiosClient from '../../../axios-clint.js';
import HttpStatusMsg from '../../Notifications/HttpStatusMsg.jsx';
import InputValidation from './../../../Modules/InputValidation.jsx';
import PasswordField from '../../../components/Util/PasswordField.jsx';
import AuthForm from '../../../components/Auth/AuthForm.jsx';
import SendPinAgain from '../../Notifications/SendPinAgain.jsx';
import ROUTES from '../../../Settings/ROUTES.js';

const Login = () => {
  const {setUser, setUsername, setSessionToken, lookup, setLookup} = useStateContext();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [pwdValue, setPwdValue] = useState('');
  const [btnLoader, setBtnLoader] = useState(false);
  const [email] = useState(lookup || '');
  const [httpStatus, setHttpStatus] = useState({ visible: false });
  const [clientError, setClientError] = useState({
    password: { msg: [] },
    email: { msg: [] }
  });
  const [verify, setVerify] = useState(false);

  useEffect(() => {
    if (!email) navigate(ROUTES.auth.LOOKUP);
  }, []);

  const handleSubmit = async () => {
    const payload = {
      email: email,
      password: pwdValue,
    };
    
    const check = {...InputValidation(payload)};

    if (Boolean(Object.keys(check).length)) {
      setClientError({
        password: {  msg: check.password },
      })
    } else {
      try {
        const res = await axiosClient.post(ROUTES.auth.LOGIN, payload);
        if (res?.data) {
          setLookup('');
          setUser(res.data.user);
          setUsername(res.data.user.firstname);
          setSessionToken(res.data.token);
          setTimeout(() => window.location.reload(), 0);
          // navigate(ROUTES.pages.HOME);
        } 
      } catch (err) {
        const { message } = err.response.data;
        if (err.response.status === 408) {
          setVerify(true);
        }
        setHttpStatus({ visible: true, msg: message });
      }
    }
    setBtnLoader(false);
  }
  
  const handleChange = (e) => {
    const check = {...InputValidation({ password: pwdValue })};
    const checked = Boolean(Object.keys(check).length);

    setPwdValue(e.target.value);

    if (Boolean(pwdValue) && e.target.value.length > 8) {
      setClientError({
        password: { msg: checked ? check.password : [] }
      });
    }
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
        <span className='me-1 fw-semibold'>{email}</span>
        <Link 
          className='cg-link' 
          to={ROUTES.auth.LOOKUP}
          aria-label={`${email} ${t('edit')}`} 
          tabIndex={1}
        >{t('edit')}</Link>
      </div>}
    >
      {httpStatus.visible && <HttpStatusMsg msg={httpStatus.msg} />}

      {verify && <SendPinAgain email={email} setHttpErr={handleHttpErr} />}

      <PasswordField
        label={t('input.password_k')} 
        onChange={handleChange}
        value={pwdValue} 
        err={clientError.password.msg[0] ? t(clientError.password.msg[0]) : ''}
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
