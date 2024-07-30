import { useEffect, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useStateContext } from './../../../Contexts/ContextProvider.jsx';
import { useTranslation } from "react-i18next";

import axiosClient from '../../../axios-clint.js';
import HttpStatusMsg from '../../Notifications/HttpStatusMsg.jsx';
import InputValidation from './../../../Modules/InputValidation.jsx';
import PolicyPickerCheckbox from '../../../components/Auth/PolicyPickerCheckbox.jsx';
import AuthForm from '../../../components/Auth/AuthForm.jsx';
import InputInchField from '../../../components/Util/InputInchField.jsx';
import PasswordAddition from '../../../components/Helpers/PasswordAddition.jsx';
import PasswordField from '../../../components/Util/PasswordField.jsx';
import ROUTES from '../../../Settings/ROUTES.js';

const Register = () => {
  const { lookup } = useStateContext();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [email] = useState(lookup || '');
  const [password, setPassword] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [isTacChecked, _setIsTacChecked] = useState(false);
  const [tacErr, setTacErr] = useState(false);
  const [btnLoader, setBtnLoader] = useState(false);
  const [hasVal, setHasVal] = useState(false);
  const [hasValChars, setHasValChars] = useState(false);
  const [hasValAddition, setHasValAddition] = useState(false);
  const [httpStatus, setHttpStatus] = useState({ visible: false });
  const [clientError] = useState({
    firstname: { msg: [] },
    lastname: { msg: [] },
    password: { msg: [] },
    email: { msg: [] },
  });

  useEffect(() => {
    if (!email) navigate(ROUTES.auth.LOOKUP);
  }, []);

  const handleSubmit = async () => {
    const payload = {
      firstname: firstname.trim(),
      lastname: (lastname[0].toUpperCase() + lastname.substring(1)).trim(),
      email: email.trim(),
      password: password.trim(),
    };

    const check = {...InputValidation(payload)};

    setHasVal(true);

    if (Boolean(Object.keys(check).length) || !isTacChecked) {
      setTacErr(!isTacChecked);

      Object.keys(check).forEach((name) => {
        clientError[name].msg = check[name] ?? [];
        if (name === 'password') passValidation(password);
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
    const value = e.target.value;
    const name = e.target.name.toLowerCase();

    switch (name) {
      case 'firstname': 
          setFirstname(value);
          handleValidation(name, value);
        break;
      case 'lastname': 
          setLastname(value);
          handleValidation(name, value);
        break;
      case 'password': 
          setPassword(value);
          handlePassword(value);
        break;
      default:
        break;
    }
  }

  const handleValidation = (name, value) => {
    const check = {...InputValidation({ [name]: value })};

    clientError[name].msg = check[name] ?? [];
  }

  const handlePassword = (value) => {
    if (value.length >= 8 && !hasVal) {
      setHasVal(true);
      passValidation(value);
    }
    if (hasVal) passValidation(value);
  }

  const passValidation = (value) => {
    const check = {...InputValidation({ password: value })};
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

      <div className="row">
        <InputInchField
          col='col-6'
          label={t('input.firstname')} 
          name='firstname'
          onChange={handleChange}
          value={firstname} 
          err={clientError.firstname.msg[0] ? t(clientError.firstname.msg[0]) : ''}
        />

        <InputInchField
          col='col-6'
          label={t('input.lastname')} 
          name='lastname'
          onChange={handleChange}
          value={lastname} 
          err={clientError.lastname.msg[0] ? t(clientError.lastname.msg[0]) : ''}
        />
      </div>

      <PasswordField
        label={t('input.password_k')} 
        onChange={handleChange}
        value={password} 
        err={clientError.password.msg[0] ? t(clientError.password.msg[0]) : ''}
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
