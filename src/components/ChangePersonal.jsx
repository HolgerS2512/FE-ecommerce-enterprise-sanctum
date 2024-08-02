import { useState, useEffect, useRef } from "react";
import { useStateContext } from "../Contexts/ContextProvider";
import { useTranslation } from "react-i18next"

import ROUTES from "../Settings/ROUTES";
import axiosClient from '../axios-clint';
import DateModel from "../Modules/DateModel";
import InputValidation from "../Modules/InputValidation";
import BlankForm from "./BlankForm"
import HttpStatusMsg from "../Views/Notifications/HttpStatusMsg";
import InputInchField from "./Util/InputInchField";
import Select from "./Util/Select";

const ChangePersonal = ({ closeLoader }) => {
  // Common
  const { user, setNotification } = useStateContext();
  const {t} = useTranslation();

  const salutationOpts = [
    { value: 'z', label: t('not_specified') },
    { value: 'd', label: t('mx') },
    { value: 'w', label: t('mrs') },
    { value: 'm', label: t('mr') },
  ];

  // Input States
  const [salutation, setSalutation] = useState(user.salutation || salutationOpts[0]);
  const [inputData, setInputData] = useState({
    firstname: user.firstname,
    lastname: user.lastname,
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
  const [isLoading, setIsLoading] = useState(false);
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


  useEffect(() => {
    setUserValues();
  }, []);

  useEffect(() => {
    if (selectDay > date.getDays().length) {
      selectDayRef.current.setValue({ value: null, label: null });
      selectDayRef.current.focus();
    }
  }, [selectYear, selectMonth]);

  const calcMonths = () => {
    const monthsArr = date.getMonths();
    return (monthsArr).map((o) => {
      const label = t(`all_months.${o.label}`);
      return { value: o.value, label: label };
    });
  };

  const setUserValues = () => {
    const uSal = user.salutation;

    if (uSal) {
      salutationOpts.forEach((o) => {
        if (o.value === uSal) {
          selectSalutRef?.current?.setValue({ value: o.value, label: o.label });
        }
      });
    } else {
      selectSalutRef?.current?.setValue(salutationOpts[0]);
    }

    if (user.birthday) {
      const split = user.birthday.split('-');

      selectDayRef?.current?.setValue({ value:split[2], label:split[2] });
      selectYearRef?.current?.setValue({ value:split[0], label:split[0] });
      calcMonths().forEach((opt) => {
        if (opt.value === split[1]) {
          selectMonthRef?.current?.setValue({ value:split[1], label: opt.label });
        }
      });
    }
    setTimeout(() => closeLoader(), 200);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setHttpStatus({});
    setIsLoading(true);

    const check = validPayload();

    if (Boolean(check.length) && check.every((v) => v)) {
      const payload = {
        salutation: salutation,
        firstname: inputData.firstname,
        lastname: inputData.lastname,
        birthday: `${selectYear}-${selectMonth}-${selectDay}`,
      };

      try {
        const res = await axiosClient.put(ROUTES.account.DATA.UPDATE, payload);
        if (res.data.status) {
          setNotification({
            visible : true,
            status : 's',
            msg : res.data.message,
          });
        } 
      } catch (err) {
        const { message } = err.response.data;
        setHttpStatus({ visible: true, msg: message });
      }
    }
    setIsLoading(false);
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

  const handleChaneInput = (e) => {
    const { name, value } = e.target;
    setInputData({ ...inputData, [name]: value });
    val(name, value);
  }

  const handleChangeDay = (obj) => {
    setSelectDay(obj.value);
    val('day', obj.value);
  }

  const handleChangeMonth = (obj) => {
    setSelectMonth(obj.value);
    val('month', obj.value);
  }

  const handleChangeYear = (obj) => {
    setSelectYear(obj.value);
    val('year', obj.value);
  }

  const val = (name, value) => {
    const check = {...InputValidation({ [name]: value })};
    const checked = Boolean(Object.keys(check).length);

    clientError[name].msg = checked ? check[name] : [];
    return checked;
  }

  return (
    <BlankForm
      onSubmit={handleSubmit}
      isLoading={isLoading}
      submitBtnText={t('save_changes')}
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
              ref={selectSalutRef}
              noRequire={true}
            />
          </div>
        </div>

        <div className="col-md-6 col-lg-5">
          <InputInchField
            label={t('input.firstname')} 
            name='firstname'
            onChange={handleChaneInput}
            value={inputData.firstname} 
            err={clientError.firstname.msg[0] ? t(clientError.firstname.msg[0]) : ''}
          />
        </div>

        <div className="col-md-6 col-lg-5">
          <InputInchField
            label={t('input.lastname')} 
            name='lastname'
            onChange={handleChaneInput}
            value={inputData.lastname} 
            err={clientError.lastname.msg[0] ? t(clientError.lastname.msg[0]) : ''}
          />
        </div>


        <div className="col-md-6 col-lg-5">
          <small className="b-small" tabIndex={1}>{t('dateofbirth')}</small>
          <div className="birth">
            <Select 
              name={t('day')}
              ariaLabel={`${t('dateofbirth')} ${t('edit').toLowerCase()}: ${t('day')}`}
              onChange={handleChangeDay}
              value={selectDay}
              options={date.getDays()} 
              ref={selectDayRef}
              err={clientError.day.msg[0] ? t(clientError.day.msg[0]) : ''}
              col='b-day'
            />
            <Select 
              name={t('month')}
              ariaLabel={`${t('dateofbirth')} ${t('edit').toLowerCase()}: ${t('month')}`}
              onChange={handleChangeMonth}
              value={selectMonth}
              options={calcMonths()} 
              ref={selectMonthRef}
              err={clientError.month.msg[0] ? t(clientError.month.msg[0]) : ''}
              col='b-month'
            />
            <Select 
              name={t('year')}
              ariaLabel={`${t('dateofbirth')} ${t('edit').toLowerCase()}: ${t('year')}`}
              onChange={handleChangeYear}
              value={selectYear}
              options={date.getYears()} 
              ref={selectYearRef}
              err={clientError.year.msg[0] ? t(clientError.year.msg[0]) : ''}
              col='b-year'
            />
          </div>
        </div>

      </div>

    </BlankForm>
  )
}

export default ChangePersonal
