import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useStateContext } from '../../../Contexts/ContextProvider.jsx';
import { useTranslation } from "react-i18next";

import axiosClient from '../../../axios-clint.js';
import ValidationManager, { createValidator } from '../../../Modules/ValidationManager.jsx';
import ClientErrorManager from '../../../Modules/ClientErrorManager.js';
import ROUTES from '../../../Settings/ROUTES.js';

import HttpStatusMsg from '../../Notifications/HttpStatusMsg.jsx';
import InputForgetCode from '../../../components/Util/InputForgetCode.jsx';
import AuthForm from '../../../components/Auth/AuthForm.jsx';
import PasswordAddition from '../../../components/Helpers/PasswordAddition.jsx';
import PasswordField from '../../../components/Util/PasswordField.jsx';
import UserMessenger from '../../Notifications/UserMessenger.jsx';

const THROTTLE = 5;

const FORGETPWDPwd = () => {
  // Common
  const { lookup } = useStateContext();
  const { t } = useTranslation();
  const navigate = useNavigate();
  // Input states
  const [email] = useState(lookup || '');
  const [password, setPassword] = useState('');
  const [pin, setPin] = useState('');
  // States
  const [btnLoader, setBtnLoader] = useState(false);
  const [hasVal, setHasVal] = useState(false);
  const [hasValChars, setHasValChars] = useState(false);
  const [hasValAddition, setHasValAddition] = useState(false);
  const [url, setUrl] = useState('');
  const [throttle, setThrottle] = useState(THROTTLE);
  const [_, setRender] = useState(false);
  // Errorhandling
  const [httpStatus, setHttpStatus] = useState({ visible: false });
  const [clientError] = useState({
    pin: { msg: [] },
    password: { msg: [] },
    email: { msg: [] },
  });
  const [userMSG] = useState({});
  // Validation
  const { val } = createValidator(clientError);
  const { getErrorMsg } = ClientErrorManager(clientError);

  useEffect(() => {
    if (!email) navigate(ROUTES.auth.LOOKUP);
  }, []);

  const handleSubmit = async () => {
    const payload = {
      pin: pin,
      email: email,
      password: password,
    };

    const check = {...ValidationManager(payload)};

    setHasVal(true);

    if (Boolean(Object.keys(check).length)) {
      Object.keys(check).forEach((name) => {
        clientError[name].msg = check[name] ?? [];
        if (name === 'password') passValidation(password);
      });
      setRender(l => !l);
    } else {
      try {
        const res = await axiosClient.put(`${ROUTES.auth.RESETPWD}/${url}`, payload);
        if (res.data.status) {
          userMSG.visible = true;
          userMSG.status = true;
          userMSG.msg = `${t(res.data.message)} ${t('forwarding')}`;
          throttleUM(throttle, ROUTES.auth.LOOKUP);
        } 
      } catch (err) {
        const { message } = await err.response.data;
        setHttpStatus({ visible: true, msg: message });
      }
    }
    setBtnLoader(false);
  }

  const handlePin = (e) => {
    const { name, value } = e.target;
    setPin(value);
    if (Boolean(value) || value > 6) {
      val(name, value);
    }
  }

  const handlePasswordValue = (e) => {
    const value = e.target.value;
    setPassword(value);
    handlePassword(value);
  }

  const handlePassword = (value) => {
    if (value.length >= 8 && !hasVal) {
      setHasVal(true);
      passValidation(value);
    }
    if (hasVal) passValidation(value);
  }

  const passValidation = (value) => {
    const check = {...ValidationManager({ password: value })};
    const checked = !Boolean(Object.keys(check).length);

    setHasValChars(value.length >= 8);
    setHasValAddition(checked);
    clientError['password'].msg = check['password'] ?? [];
  }

  const throttleUM = (t, route) => {
    userMSG.timer = t;
    if (t > 0) {
      setThrottle(t - 1);
      setTimeout(() => {
        throttleUM(t - 1, route);
      }, 1000);
    } else {
      setThrottle(THROTTLE);
      navigate(route ?? ROUTES.error.NOTFOUND);
      userMSG.visible = false;
    }
  }

  const setResetUrl = (string) => setUrl(string);

  const handleHttpErr = (err) => setHttpStatus(err);

  return (
    <>
      {userMSG.visible && <UserMessenger status={userMSG.status} msg={userMSG.msg} timer={userMSG.timer} />}

      <AuthForm
        onSubmit={(e) => {
          e.preventDefault();
          setBtnLoader(true);
          handleSubmit();
        }}
        isLoading={btnLoader} 
        h1={t('FORGETPWD_pwd_greeting')}
        submitBtnText={t('save')}
        loadBtnClass='mt-2'
        cancel={ROUTES.auth.LOGIN}
        extra={      
          <div className='d-flex mb-3 mb-md-4'>
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

        <InputForgetCode
          label={t('input.pin')} 
          onChange={handlePin}
          value={pin}
          col='mt-3'
          emailValue={email}
          setHttpErr={handleHttpErr}
          setResetUrl={setResetUrl}
          err={getErrorMsg('pin')}
        />

        <PasswordField
          label={t('input.password_k')} 
          onChange={handlePasswordValue}
          value={password} 
          err={getErrorMsg('password')}
          noVal={true}
        />

        <PasswordAddition 
          checked={hasVal}
          chars={hasValChars}
          addition={hasValAddition}
        />

      </AuthForm>
    </>
  )
}

export default FORGETPWDPwd
