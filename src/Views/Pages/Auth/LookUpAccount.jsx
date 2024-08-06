import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStateContext } from '../../../Contexts/ContextProvider.jsx';
import { useTranslation } from "react-i18next";

import axiosClient from '../../../axios-clint.js';
import HttpStatusMsg from '../../Notifications/HttpStatusMsg.jsx';
import InputValidation from './../../../Modules/InputValidation.jsx';
import PolicyPicker from '../../../components/Auth/PolicyPicker.jsx';
import InputInchField from '../../../components/Util/InputInchField.jsx';
import AuthForm from '../../../components/Auth/AuthForm.jsx';
import ROUTES from '../../../Settings/ROUTES.js';

const LookUpAccount = () => {
  const { setLookup, lookup, token } = useStateContext();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [email, setEmail] = useState(lookup || '');
  const [btnLoader, setBtnLoader] = useState(false);
  const [httpStatus, setHttpStatus] = useState({ visible: false });
  const [clientError, setClientError] = useState({ email: { msg: [] } });

  useEffect(() => {
    if (token) navigate(ROUTES.pages.HOME);
  }, []);

  const handleSubmit = async () => {
    const check = {...InputValidation({ email: email })};

    if (Boolean(Object.keys(check).length)) {
      setClientError({ email: { msg: check.email } });
    } else {
      try {
        const res = await axiosClient.post(ROUTES.auth.LOOKUP, { email: email });
        setLookup(email);
        navigate(`/${res?.data?.route}`);
      } catch (err) {
        const { message } = err.response.data;
        setHttpStatus({ visible: true, msg: message });
      }
    }
    setBtnLoader(false);
  }
  
  const handleChange = (e) => {
    const value = e.target.value.replaceAll(' ', '');
    setEmail(value);

    if (Boolean(value) || value > 6) {
      const check = {...InputValidation({ email: value })};
      const checked = Boolean(Object.keys(check).length);

      setClientError( { email: { msg: checked ? check.email : [] } } );
    }
  }

  return (
    <AuthForm 
      onSubmit={(e) => {
        e.preventDefault();
        setBtnLoader(true);
        handleSubmit();
      }}
      isLoading={btnLoader} 
      h1={t('lookup_greeting')}
      submitBtnText={t('continue')}
    >
      {httpStatus.visible && <HttpStatusMsg msg={httpStatus.msg} />}

      <InputInchField
        label={t('input.email')} 
        type='email'
        onChange={handleChange}
        value={email} 
        err={clientError.email.msg[0] ? t(clientError.email.msg[0]) : ''}
      />

      <PolicyPicker />
    </AuthForm>
  )
}

export default LookUpAccount
