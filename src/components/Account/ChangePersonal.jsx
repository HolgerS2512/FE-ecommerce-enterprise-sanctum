import { useState, useEffect, useRef } from "react";
import { useStateContext } from "../../Contexts/ContextProvider";
import { useNotification } from "../../Contexts/NotificationProvider";
import { useTranslation } from "react-i18next"
import { useOutletContext } from "react-router-dom";

import axiosClient from '../../axios-clint';
import { createValidator } from "../../Modules/ValidationManager";
import ClientErrorManager from "../../Modules/ClientErrorManager";
import ROUTES from "../../Settings/ROUTES";
import AesCryptographer from "../../Modules/AesCryptographer";

import DateModel from "../../Modules/DateModel";
import BlankForm from "../BlankForm"
import HttpStatusMsg from "../../Views/Notifications/HttpStatusMsg";
import InputInchField from "../Util/InputInchField";
import Select from "../Util/Select";

const cryptographer = new AesCryptographer();

const ChangePersonal = ({ closeLoader, isLoading }) => {
  // Common
  const { user,  setUserProps } = useStateContext();
  const { setMiddlewareTimeout } = useOutletContext();
  const { setNotification } = useNotification();
  const {t} = useTranslation();

  const salutationOpts = [
    { value: 'z', label: t('not_specified') },
    { value: 'd', label: t('mx') },
    { value: 'w', label: t('mrs') },
    { value: 'm', label: t('mr') },
  ];

  // Input States
  const [salutation, setSalutation] = useState(salutationOpts[0]);
  const [inputData, setInputData] = useState({
    firstname: '',
    lastname: '',
  });
	const [selectDay, setSelectDay] = useState('');
  const [selectMonth, setSelectMonth] = useState('');
	const [selectYear, setSelectYear] = useState('');
  // Refs
  const selectSalutRef = useRef();
  const selectDayRef = useRef();
  const selectMonthRef = useRef();
  const selectYearRef = useRef();
  // States
  const [canUpdate, setCanUpdate] = useState(true);
  const [btnLoading, setBtnLoading] = useState(false);
  // Errorhandling
  const [clientError] = useState({
    firstname: { msg: [] },
    lastname: { msg: [] },
    day: { msg: [] },
    month: { msg: [] },
    year: { msg: [] },
    salutation: { msg: [] },
  });
  const [httpStatus, setHttpStatus] = useState({ visible: false });
  // DateModel & Options
  const date = new DateModel(selectYear, selectMonth, selectDay);
  // Validation
  const { val } = createValidator(clientError);
  const { getErrorMsg } = ClientErrorManager(clientError);

  useEffect(() => {
    loadUserData();
  }, []);

  useEffect(() => {
    if (selectDay > date.getDays().length) {
      selectDayRef.current.setValue({ value: null, label: null });
      selectDayRef.current.focus();
    }
  }, [selectYear, selectMonth]);

  const loadUserData = async () => {
    try {
      const res = await axiosClient.get(ROUTES.account.PROFILE);
      const { data, status } = res.data;

      if (status) {
        const decrypted = cryptographer.decrypt(data);
        setUserProps(JSON.parse(decrypted));
        setUserValues(JSON.parse(decrypted));
      } 
    } catch (err) {
      if (err.response.status === 504) {
        setMiddlewareTimeout();
      } else {
        setNotification({
          visible: true,
          status: 'e',
          error: err,
        });
      }
    }
  }

  const calcMonths = () => {
    const monthsArr = date.getMonths();
    return (monthsArr).map((o) => {
      const label = t(`all_months.${o.label}`);
      return { value: o.value, label: label };
    });
  };

  const setSalutValues = (data) => {
    const uSal = data.salutation;

    if (uSal) {
      salutationOpts.forEach((o) => {
        if (o.value === uSal) {
          selectSalutRef?.current?.setValue({ value: o.value, label: o.label });
        }
      });
    } else {
      selectSalutRef?.current?.setValue(salutationOpts[0]);
    }
  }

  const setBirthday = (data) => {
    if (data.birthday) {
      const split = data.birthday.split('-');

      selectDayRef?.current?.setValue({ value:split[2], label:split[2] });
      selectYearRef?.current?.setValue({ value:split[0], label:split[0] });

      calcMonths().forEach((opt) => {
        if (opt.value === split[1]) {
          selectMonthRef?.current?.setValue({ value:split[1], label: opt.label });
        }
      });
    }
  }

  const setUserValues = (data) => {
    setSalutValues(data);
    setBirthday(data);
    setInputData({
      firstname: data.firstname,
      lastname: data.lastname,
    });
    setTimeout(closeLoader, 200);
    setCanUpdate(true);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setHttpStatus({});
    setBtnLoading(true);

    const check = validPayload();

    if (Boolean(check.length) && check.every((v) => v === true)) {
      const payload = {
        salutation: salutation,
        firstname: inputData.firstname,
        lastname: inputData.lastname,
        birthday: `${selectYear}-${selectMonth}-${selectDay}`,
      };

      try {
        const route = `${ROUTES.account.PROFILE}/${user.id}`;
        const res = await axiosClient.put(route, payload);

        if (res.data.status) {
          setNotification({
            visible : true,
            status : 's',
            message : t('http.success.updated.user_data'),
          });
          setUserProps(payload);
          setUserValues(payload);
        } 
      } catch (err) {
        setHttpStatus({ visible: true, error: err });
      }
    }
    setBtnLoading(false);
  }

  const validPayload = () => {
    return [
      !val('salutation', selectSalutRef?.current?.getValue()[0]?.value),
      !val('firstname', inputData.firstname),
      !val('lastname', inputData.lastname),
      !val('day', selectDayRef?.current?.getValue()[0]?.value),
      !val('month', selectMonthRef?.current?.getValue()[0]?.value),
      !val('year', selectYearRef?.current?.getValue()[0]?.value)
    ];
  }

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setInputData({ ...inputData, [name]: value });
    val(name, value);
    setLockDown();
  }

  const handleChangeDay = (obj) => {
    setSelectDay(obj.value);
    val('day', obj.value);
    setLockDown();
  }

  const handleChangeMonth = (obj) => {
    setSelectMonth(obj.value);
    val('month', obj.value);
    setLockDown();
  }

  const handleChangeYear = (obj) => {
    setSelectYear(obj.value);
    val('year', obj.value);
    setLockDown();
  }

  const handleChangeSalut = (obj) => {
    setSalutation(obj.value);
    setLockDown();
  }

  const setLockDown = () => {
    if (!isLoading && canUpdate) {
      setCanUpdate(false);
    }
  }

  return (
    <BlankForm
      onSubmit={handleSubmit}
      isLoading={btnLoading}
      submitBtnText={t('save_changes')}
      btnDisabled={canUpdate}
    >

      {httpStatus.visible && <HttpStatusMsg error={httpStatus.error} />}

      <div className="row">

        <div>
          <div style={{ width: '180px' }}>
            <Select 
              name={t('salutation')}
              ariaLabel={`${t('salutation')} ${t('no_required')}`}
              onChange={handleChangeSalut}
              value={salutation}
              options={salutationOpts} 
              ref={selectSalutRef}
              noRequire={true}
            />
          </div>
        </div>

        <div className="col-md-6 col-lg-5">
          <InputInchField
            label={t('input.firstname')} 
            name='firstname'
            onChange={handleChangeInput}
            value={inputData.firstname} 
            err={getErrorMsg('firstname')}
          />
        </div>

        <div className="col-md-6 col-lg-5">
          <InputInchField
            label={t('input.lastname')} 
            name='lastname'
            onChange={handleChangeInput}
            value={inputData.lastname} 
            err={getErrorMsg('lastname')}
          />
        </div>


        <div>
          <small className="b-small" tabIndex={1}>{t('dateofbirth')}</small>
          <div className="birth">
            <Select 
              name={t('day')}
              ariaLabel={`${t('dateofbirth')} ${t('edit').toLowerCase()}: ${t('day')}`}
              onChange={handleChangeDay}
              value={selectDay}
              options={date.getDays()} 
              ref={selectDayRef}
              err={getErrorMsg('day')}
              col='b-day'
            />
            <Select 
              name={t('month')}
              ariaLabel={`${t('dateofbirth')} ${t('edit').toLowerCase()}: ${t('month')}`}
              onChange={handleChangeMonth}
              value={selectMonth}
              options={calcMonths()} 
              ref={selectMonthRef}
              err={getErrorMsg('month')}
              col='b-month'
            />
            <Select 
              name={t('year')}
              ariaLabel={`${t('dateofbirth')} ${t('edit').toLowerCase()}: ${t('year')}`}
              onChange={handleChangeYear}
              value={selectYear}
              options={date.getYears()} 
              ref={selectYearRef}
              err={getErrorMsg('year')}
              col='b-year'
            />
          </div>
        </div>

      </div>

    </BlankForm>
  )
}

export default ChangePersonal
