import { useEffect, useState, useRef, useCallback } from "react";
import { redirect } from "react-router-dom";
import { useStateContext } from "../../Contexts/ContextProvider";
import { useNotification } from "../../Contexts/NotificationProvider";
import { useTranslation } from "react-i18next"

import ValidationManager, { createValidator } from "../../Modules/ValidationManager";
import ClientErrorManager from "../../Modules/ClientErrorManager";
import ROUTES from "../../Settings/ROUTES";

import BlankForm from "../BlankForm"
import PasswordLongAddition from "../Helpers/PasswordLongAddition";
import InputPinCode from "../Util/InputPinCode";
import axiosClient from '../../axios-clint';
import PasswordForwardField from "../Util/PasswordForwardField";
import HttpStatusMsg from "../../Views/Notifications/HttpStatusMsg";

const ChangePassword = () => {
  // Common
  const { setUser, setSessionToken } = useStateContext();
  const { setNotification } = useNotification();
  const {t} = useTranslation();
  // Input States
  const [current_password, setCurrentPassword] = useState('');
  const [new_password, setPassword] = useState('');
  const [new_password_confirmation, setPasswordConfirmation] = useState('');
  const [pin, setPin] = useState('');
  // Ref
  const currentPwdRef = useRef(null);
  const newPwdRef = useRef(null);
  const confirmPwdRef = useRef(null);
  // States
  const [canUpdate, setCanUpdate] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasUpdate, setHasUpdate] = useState(true);
  // Validation
  const [hasVal, setHasVal] = useState(false);
  const [hasValChars, setHasValChars] = useState(false);
  const [hasValAddition, setHasValAddition] = useState(false);
  const [hasValNewOld, setHasValNewOld] = useState(false);
  const [hasValConfirm, setHasValConfirm] = useState(false);
  // Errorhandling
  const [clientError, setClientError] = useState({
    current_password: { msg: [] },
    new_password: { msg: [] },
    new_password_confirmation: { msg: [] },
    pin: { msg: [] },
  });
  const [httpStatus, setHttpStatus] = useState({ visible: false });
  // Input Pincode
  const [editResp, setEditResp] = useState({ visible: false });
  // Validation
  const { val } = createValidator(clientError);
  const { getErrorMsg } = ClientErrorManager(clientError);

  useEffect(() => {
    if (canUpdate) {
      // Timout debouncer, do not delete!
      setTimeout(() => handleSubmitEdit, 50);
    }
  }, [canUpdate]);

  useEffect(() => {
    const values = [
      hasValChars, 
      hasValAddition, 
      hasValNewOld, 
      hasValConfirm
    ];
    if (canUpdate) {
      values.push(!val('pin', pin));
    }
    const result = values.every((b) => b === true);
    setHasUpdate(!result);
  }, [hasValChars, hasValAddition, hasValNewOld, hasValConfirm]);

  const handleSubmitUpdate = async () => {
    setHttpStatus({});
    setIsLoading(true);

    if (hasValChars 
      && hasValAddition 
      && hasValNewOld 
      && hasValConfirm
      && !Boolean(clientError.pin.msg.length)
    ) {
      const payload = {
        current_password: currentPwdRef.current.value,
        new_password: newPwdRef.current.value,
        new_password_confirmation: confirmPwdRef.current.value,
        pin: pin,
      };

      try {
        const res = await axiosClient.put(ROUTES.account.PASSWORD.UPDATE, payload);
        if (res.data.status) {
          setNotification({
            visible : true,
            status : 's',
            message : t('http.success.updated.password'),
          });
          setUser({});
          setSessionToken('');
          redirect(ROUTES.pages.HOME);
        } 
      } catch (err) {
        setHttpStatus({ visible: true, error: err });
      }
    }
    setHasUpdate(true);
    setIsLoading(false);
  }

  const handleEdit = () => {
    setHttpStatus({});
    if (!hasVal) setHasVal(true);
    setCanUpdate(hasValChars 
      && hasValAddition 
      && hasValNewOld 
      && hasValConfirm
      && !Boolean(clientError.current_password.msg.length)
    );
    // Send btn -> diabled
    if (!hasUpdate) {
      setHasUpdate(true);
    }
  };

  const handleSubmitEdit = async () => {
    const payload = {
      current_password: currentPwdRef.current.value,
      new_password: newPwdRef.current.value,
      new_password_confirmation: confirmPwdRef.current.value,
    };

    try {
      const res = await axiosClient.post(ROUTES.account.PASSWORD.EDIT, payload);
      if (res.data.status) {
        setEditResp({ 
          visible: true, 
          status: res.data.status, 
        });
      } 
    } catch (err) {
      setEditResp({ 
        visible: true, 
        status: err.response.data.status, 
      });
      setHttpStatus({ visible: true, error: err });
      setTimeout(() => {
        setEditResp({ visible: false });
        setCanUpdate(false);
      }, 4000);
    }
  }

  const handleChange = (e) => {
    if (e.target.value.length >= 8 && !hasVal) {
      setHasVal(true);
      passValidation();
    }
    if (hasVal) {
      passValidation();
    }
  }

  const passValidation = useCallback(() => {
    const c_val = currentPwdRef.current.value;
    const n_val = newPwdRef.current.value;
    const co_val = confirmPwdRef.current.value;

    const c_check = {...ValidationManager({ password: c_val })};
    const n_check = {...ValidationManager({ password: n_val })};
    const co_check = {...ValidationManager({ password: co_val })};

    const c_checked = !Boolean(Object.keys(c_check).length);
    const n_checked = !Boolean(Object.keys(n_check).length);
    const co_checked = !Boolean(Object.keys(co_check).length);

    setClientError({
      current_password: { msg: c_checked ? c_check : [] },
      new_password: { msg: n_checked ? n_check : [] },
      new_password_confirmation: { msg: co_checked ? co_check : [] },
      pin: { msg: [] },
    });

    setHasValChars(c_val.length >= 8 && n_val.length >= 8 && co_val.length >= 8);
    setHasValAddition(c_checked && n_checked && co_checked);
    setHasValNewOld(c_val !== n_val && c_val !== co_val);
    setHasValConfirm(n_val === co_val && n_val.length >= 8 && co_val.length >= 8);
  }, [hasValChars, hasValAddition, hasValNewOld, hasValConfirm]);

  const handlePin = (e) => {
    const { value } = e.target;
    setPin(value);
    val('pin', value);
    setHasUpdate(val('pin', value));
  }

  return (
    <BlankForm
      onSubmit={(e) => {
        e.preventDefault();
        canUpdate ? handleSubmitUpdate() : handleEdit(); // canUpdate request state
      }}
      isLoading={isLoading}
      submitBtnText={canUpdate ? t('save_changes') : t('request_code')} // canUpdate request state
      btnDisabled={hasUpdate}
    >

      {httpStatus.visible && <HttpStatusMsg error={httpStatus.error} />}

      <div className="row">

        <div className="col-md-6 col-lg-5">
          <PasswordForwardField
            tabIndex={canUpdate ? -1 : 1} // canUpdate request state
            readOnly={canUpdate} // canUpdate request state
            label={t('input.new_password')} 
            onChange={(e) => {
              handleChange(e);
              setPassword(e.target.value);
            }}
            value={new_password} 
            autoComplete='new-password'
            ref={newPwdRef}
            err={hasVal ? !hasValConfirm || !hasValNewOld : false}
          />
        </div>
        <div className="col-md-6 col-lg-5">
          <PasswordForwardField
            tabIndex={canUpdate ? -1 : 1} // canUpdate request state
            readOnly={canUpdate} // canUpdate request state
            label={t('input.new_password_confirmation')} 
            name='new_password_confirmation'
            onChange={(e) => {
              handleChange(e);
              setPasswordConfirmation(e.target.value);
            }}
            value={new_password_confirmation} 
            autoComplete='new-password'
            ref={confirmPwdRef}
            err={hasVal ? !hasValConfirm || !hasValNewOld : false}
          />
        </div>
        <div className="col-md-6 col-lg-5">
          <PasswordForwardField
            tabIndex={canUpdate ? -1 : 1} // canUpdate request state
            readOnly={canUpdate} // canUpdate request state
            label={t('input.current_password')} 
            name='current_password'
            onChange={(e) => {
              handleChange(e);
              setCurrentPassword(e.target.value);
            }}
            value={current_password} 
            autoComplete='new-password'
            ref={currentPwdRef}
            err={hasVal ? !hasValNewOld || Boolean(clientError.current_password.msg.length) : false}
          />
        </div>
        
      </div>
      <div className="row">

        {!canUpdate && <PasswordLongAddition 
          checked={hasVal}
          chars={hasValChars}
          addition={hasValAddition}
          newold={hasValNewOld}
          confirmation={hasValConfirm}
        />}

        {canUpdate && 
          <div className="col-md-6 col-lg-5">
            <InputPinCode
              col='mb-4 mb-md-0'
              label={t('input.pin')} 
              onChange={handlePin}
              value={pin} 
              err={getErrorMsg('pin')}
              onSubmit={handleSubmitEdit}
              response={editResp}
            />
          </div>}

      </div>
    </BlankForm>
  )
};

export default ChangePassword
