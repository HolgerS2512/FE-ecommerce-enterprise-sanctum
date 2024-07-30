import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStateContext } from '../../../Contexts/ContextProvider.jsx';
import { getAjax } from '../../../Modules/Ajax.jsx';
import { useTranslation } from "react-i18next";

import axiosClient from '../../../axios-clint.js';
import HttpStatusMsg from '../../Notifications/HttpStatusMsg.jsx';
import InputValidation from '../../../Utils/InputValidation.jsx';
import AuthForm from '../../../components/Auth/AuthForm.jsx';
import InputVerifyCode from '../../../components/Util/InputVerifyCode.jsx';
import Loading from '../../../components/Helpers/Loading.jsx'
import ShortHeader from '../../../common/ShortHeader.jsx';
import Footer from '../../../common/Footer.jsx';
import UserMessenger from '../../Notifications/UserMessenger.jsx';
import PolicyPicker from '../../../components/Auth/PolicyPicker.jsx';
import ROUTES from '../../../Settings/ROUTES.js';

const THISPATH = window.location.pathname;
const THROTTLE = 5;

const VerifyEmail = () => {
  const { setLookup } = useStateContext();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [pin, setPin] = useState('');
  const [email, setEmail] = useState('');
  const [btnLoader, setBtnLoader] = useState(false);
  const [httpStatus, setHttpStatus] = useState({ 
    visible: false,
    msg: '',
  });
  const [clientError, setClientError] = useState({ pin: { msg: [] } });
  const [isLoading, setLoading] = useState(true);
  const [userMSG] = useState({});
  const [throttle, setThrottle] = useState(THROTTLE);

  useEffect(() => {
    loadEmail();
  }, []);

  const loadEmail = async () => {
    getAjax(THISPATH, async (resp) => {
      const data = await resp;
      const json = await JSON.parse(data.response);

      if (data.status === 200 && json.email) {
        setEmail(json.email);
      } else {

        if (data.status === 408 && json.email) {
          setEmail(json.email);
        }

        if (data.status !== 429 && data.status !== 408) {
          userMSG.visible = true;
          userMSG.status = false;
          userMSG.msg = `${json.message} ${t('forwarding')}`;
          throttleUM(throttle, ROUTES.auth.LOGIN);
        } else {
          setHttpStatus({ visible: true, msg: json.message });
        }
      }
    });

    setLoading(false);
  }

  const handleSubmit = async () => {
    const check = {...InputValidation({ pin : pin })};

    if (Boolean(Object.keys(check).length)) {
      setClientError({ pin: { msg: check.pin } });
    } else {
      try {
        const res = await axiosClient.post(THISPATH, { pin : pin });
        if (res.data.status) {
          setHttpStatus({});
          setLookup(email);
          userMSG.visible = true;
          userMSG.status = true;
          userMSG.msg = t('verify_email_success');
          throttleUM(throttle, ROUTES.auth.LOGIN);
        }
      } catch (err) {
        const { message } = err.response.data;
        setHttpStatus({ visible: true, msg: message });
      }
    }
    setBtnLoader(false);
  }

  const handleChange = (e) => {
    const value = e.target.value;
    setPin(value);

    if (Boolean(value) || value > 6) {
      const check = {...InputValidation({ pin: value })};
      const checked = Boolean(Object.keys(check).length);

      setClientError( { pin: { msg: checked ? check.pin : [] } } );
    }
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

  const handleHttpErr = (err) => setHttpStatus(err);

  if (isLoading) return <Loading />;

  return (
    <>
      {userMSG.visible && <UserMessenger status={userMSG.status} msg={userMSG.msg} timer={userMSG.timer} />}
      <ShortHeader />
      <main className='short-layout'>
        <AuthForm 
          onSubmit={(e) => {
            e.preventDefault();
            setBtnLoader(true);
            handleSubmit();
          }}
          isLoading={btnLoader} 
          h1={t('new_pin_greeting')}
          submitBtnText={t('continue')}
        >
          {httpStatus.visible && <HttpStatusMsg msg={httpStatus.msg} />}

          <InputVerifyCode
            label={t('input.pin')} 
            onChange={handleChange}
            value={pin} 
            col='mt-3'
            emailVal={email}
            setHttpErr={handleHttpErr}
            err={clientError.pin.msg[0] ? t(clientError.pin.msg[0], { chars: 5 }) : ''}
          />

          <PolicyPicker />

        </AuthForm>
      </main>
      <Footer />
    </>
  )
}

export default VerifyEmail
