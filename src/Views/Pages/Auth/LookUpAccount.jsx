import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStateContext } from '../../../Contexts/ContextProvider.jsx';
import { useTranslation } from "react-i18next";

import axiosClient from '../../../axios-clint.js';
import { createValidator } from './../../../Modules/ValidationManager.jsx';
import ClientErrorManager from '../../../Modules/ClientErrorManager.js';
import ROUTES from '../../../Settings/ROUTES.js';

import HttpStatusMsg from '../../Notifications/HttpStatusMsg.jsx';
import PolicyPicker from '../../../components/Auth/PolicyPicker.jsx';
import InputInchField from '../../../components/Util/InputInchField.jsx';
import AuthForm from '../../../components/Auth/AuthForm.jsx';

const LookUpAccount = () => {
  // Common
  const { setLookup, lookup, token } = useStateContext();
  const { t } = useTranslation();
  const navigate = useNavigate();
  // Input states
  const [email, setEmail] = useState(lookup || '');
  // States
  const [btnLoader, setBtnLoader] = useState(false);
  // Errorhandling
  const [httpStatus, setHttpStatus] = useState({ visible: false });
  const [clientError] = useState({ email: { msg: [] } });
  // Validation
  const { val } = createValidator(clientError);
  const { getErrorMsg } = ClientErrorManager(clientError);

  useEffect(() => {
    if (token) navigate(ROUTES.pages.HOME);
  }, []);

  const handleSubmit = async () => {
    const check = [ !val('email', email) ];

    if (Boolean(check.length) && check.every((v) => v)) {
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
    const { name, value } = e.target;
    setEmail(value);
    val(name, value);
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
        name='email'
        err={getErrorMsg('email')}
      />

      <PolicyPicker />
    </AuthForm>
  )
}

export default LookUpAccount
