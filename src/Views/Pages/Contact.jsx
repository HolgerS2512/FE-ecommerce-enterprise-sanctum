import { useRef, useState } from 'react';
import { useStateContext } from '../../Contexts/ContextProvider';
import { useTranslation } from 'react-i18next';
import axiosClient from '../../axios-clint';
import BlankForm from '../../components/BlankForm';
import HttpStatusMsg from '../Notifications/HttpStatusMsg';
import Select from '../../components/Util/Select';
import InputInchField from '../../components/Util/InputInchField';
import PolicyPickerCheckbox from '../../components/Auth/PolicyPickerCheckbox';
import InputInchText from '../../components/Util/InputInchText';
import InputValidation from '../../Modules/InputValidation';
import ROUTES from '../../Settings/ROUTES';
import { reloadResources } from 'i18next';

const Contact = () => {
  // Common
  const { setNotification } = useStateContext();
  const {t} = useTranslation();

  const salutationOpts = [
    { value: 'z', label: t('not_specified') },
    { value: 'd', label: t('mx') },
    { value: 'w', label: t('mrs') },
    { value: 'm', label: t('mr') },
  ];

  // Input States
  const [salutation, setSalutation] = useState('');
  const [inputData, setInputData] = useState({
    salutation: '',
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    message: '',
  });
  const [isTacChecked, _setIsTacChecked] = useState(false);
  const [tacErr, setTacErr] = useState(false);
  // Refs
  const selectSalutRef = useRef();
  // States
  const [isLoading, setIsLoading] = useState(false);
  // Errorhandling
  const [clientError] = useState({
    salutation: { msg: [] },
    firstname: { msg: [] },
    lastname: { msg: [] },
    email: { msg: [] },
    phone: { msg: [] },
    message: { msg: [] },
  });
  const [httpStatus, setHttpStatus] = useState({ visible: false });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setHttpStatus({});
    setIsLoading(true);

    const check = validPayload();

    if (Boolean(check.length) && check.every((v) => v)) {
      const payload = {
        firstname: inputData.firstname,
        lastname: inputData.lastname,
        email: inputData.email,
        message: inputData.message,
      };

      if (inputData.phone.length) payload.phone = inputData.phone;
      if (salutation.length && salutation !== 'z') payload.salutation = salutation;

      try {
        const res = await axiosClient.post(ROUTES.pages.CONTACT, payload);
        if (res.data.status) {
          setNotification({
            visible : true,
            status : 's',
            msg : res.data.message,
            reload: true,
          });
        } else {
          setHttpStatus({ visible: true, msg: message });
          setIsLoading(false);
        }
      } catch (err) {
        const { message } = err.response.data;
        setHttpStatus({ visible: true, msg: message });
        setIsLoading(false);
      }
    }
  }

  const validPayload = () => {
    if (!isTacChecked) setTacErr(!isTacChecked);
    if (!Boolean(inputData.phone.length)) clientError.phone.msg = [];

    return [
      Boolean(inputData.salutation.length) ? !val('salutation', inputData.salutation) : true,
      !val('firstname', inputData.firstname),
      !val('lastname', inputData.lastname),
      !val('email', inputData.email),
      Boolean(inputData.phone.length) ? !val('phone', inputData.phone) : true,
      !val('message', inputData.message),
      isTacChecked,
    ];
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputData({ ...inputData, [name]: value });

    if (name === 'phone' && !value.length) {
      clientError.phone.msg = [];
      return;
    }
    val(name, value);
  }

  const val = (name, value) => {
    const check = {...InputValidation({ [name]: value })};
    const checked = Boolean(Object.keys(check).length);
    clientError[name].msg = checked ? check[name] : [];
    return checked;
  }

  const setIsTacChecked = () =>{
    setTacErr(isTacChecked);
    _setIsTacChecked((tac) => !tac);
  }

  return (
    <div className='container-xl mt-5 pt-5'>
      <BlankForm
        onSubmit={handleSubmit}
        isLoading={isLoading}
        submitBtnText={t('send')}
        autoComplete='off'
        loadBtnClass='px-5'
        require={false}
        styles={{ maxWidth: '780px' }}
      >

        {httpStatus.visible && <HttpStatusMsg msg={httpStatus.msg} />}

        <div className="row">

          <div>
            <div style={{ width: '180px' }}>
              <Select
                name={t('salutation')}
                ariaLabel={`${t('salutation')} ${t('no_required')}`}
                onChange={(obj) => {setSalutation(obj.value)}}
                value={salutation}
                options={salutationOpts} 
                err={clientError.salutation.msg[0] ? t(clientError.salutation.msg[0]) : ''}
                // ref={selectSalutRef}
                noRequire={true}
              />
            </div>
          </div>

          <div className="col-md-6 col-lg-5">
            <InputInchField
              label={t('input.firstname')} 
              name='firstname'
              onChange={handleChange}
              value={inputData.firstname} 
              err={clientError.firstname.msg[0] ? t(clientError.firstname.msg[0]) : ''}
            />
          </div>

          <div className="col-md-6 col-lg-5">
            <InputInchField
              label={t('input.lastname')} 
              name='lastname'
              onChange={handleChange}
              value={inputData.lastname} 
              err={clientError.lastname.msg[0] ? t(clientError.lastname.msg[0]) : ''}
            />
          </div>

          <div className="col-md-6 col-lg-5">
            <InputInchField
              label={t('input.email')} 
              type='email'
              name='email'
              onChange={handleChange}
              value={inputData.email} 
              err={clientError.email.msg[0] ? t(clientError.email.msg[0]) : ''}
            />
          </div>

          <div className="col-md-6 col-lg-5">
            <InputInchField
              label={t('input.phone')} 
              type='tel'
              name='phone'
              onChange={handleChange}
              value={inputData.phone} 
              err={clientError.phone.msg[0] ? t(clientError.phone.msg[0]) : ''}
              noRequire={true}
            />
          </div>

          <div className="col-lg-10">
            <InputInchText
              label={t('input.message')} 
              name='message'
              onChange={handleChange}
              value={inputData.message} 
              err={clientError.message.msg[0] ? t(clientError.message.msg[0]) : ''}
            />
          </div>

          <small className='mb-4'>{t('mark_required')}</small>

          <div className="col-sm-9 col-md-10">
            <PolicyPickerCheckbox 
              isChecked={isTacChecked} 
              setIsChecked={setIsTacChecked} 
              err={tacErr} 
            />
          </div>

        </div>

      </BlankForm>
    </div>
  )
}

export default Contact
