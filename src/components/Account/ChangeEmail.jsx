import { useEffect, useState, useRef, useCallback } from "react";
import { redirect } from "react-router-dom";
import { useStateContext } from "../../Contexts/ContextProvider";
import { useNotification } from "../../Contexts/NotificationProvider";
import { useTranslation } from "react-i18next"

import axiosClient from '../../axios-clint';
import ValidationManager, { createValidator } from "../../Modules/ValidationManager";
import ClientErrorManager from "../../Modules/ClientErrorManager";
import ROUTES from "../../Settings/ROUTES";

import BlankForm from "../BlankForm"
import InputPinCode from "../Util/InputPinCode";
import EmailLongAddition from "../Helpers/EmailLongAddition";
import HttpStatusMsg from "../../Views/Notifications/HttpStatusMsg";
import InputInchForwardField from "../Util/InputInchForwardField";

const ChangeEmail = () => {
  // Common
  const { user, setUser, setSessionToken } = useStateContext();
  const { setNotification } = useNotification();
  const {t} = useTranslation();
  // Input States
  const [current_email, setCurrentEmail] = useState('');
  const [email, setEmail] = useState('');
  const [email_confirmation, setEmailConfirmation] = useState('');
  const [pin, setPin] = useState('');
  // Ref
  const currentEmailRef = useRef(null);
  const newEmailRef = useRef(null);
  const confirmEmailRef = useRef(null);
  // States
  const [canUpdate, setCanUpdate] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasUpdate, setHasUpdate] = useState(true);
  const [updateAllowed, setUpdateAllowed] = useState(false);
  // Validation
  const [hasVal, setHasVal] = useState(false);
  const [hasValid, setHasValid] = useState(false);
  const [hasValNewOld, setHasValNewOld] = useState(false);
  const [hasValConfirm, setHasValConfirm] = useState(false);
  // Errorhandling
  const [clientError, setClientError] = useState({
    current_email: { msg: [] },
    email: { msg: [] },
    email_confirmation: { msg: [] },
    pin: { msg: [] },
  });
  const [httpStatus, setHttpStatus] = useState({ visible: false });
  // Input Pincode
  const [editResp, setEditResp] = useState({ visible: false });
  // Validation
  const { val } = createValidator(clientError);
  const { getErrorMsg } = ClientErrorManager(clientError);

  useEffect(() => {
    if (!Boolean(current_email.length) && user.email !== undefined) {
      setCurrentEmail(user.email);
      setUpdateAllowed(true);
    }
  }, [user.email]);

  useEffect(() => {
    if (canUpdate) {
      // Timout debouncer, do not delete!
      setTimeout(() => handleSubmitEdit, 50);
    }
  }, [canUpdate]);

  useEffect(() => {
    const values = [
      hasValid, 
      hasValNewOld, 
      hasValConfirm
    ];
    if (canUpdate) {
      values.push(!val('pin', pin));
    }
    const result = values.every((b) => b === true);
    setHasUpdate(!result);
  }, [hasValid, hasValNewOld, hasValConfirm]);

  const handleSubmitUpdate = async () => {
    setHttpStatus({});
    setIsLoading(true);

    if (hasValid 
      && hasValNewOld 
      && hasValConfirm
      && !Boolean(clientError.pin.msg.length)
    ) {
      const payload = {
        current_email: current_email,
        email: newEmailRef.current.value,
        email_confirmation: confirmEmailRef.current.value,
        pin: pin,
      };

      try {
        const res = await axiosClient.put(ROUTES.account.EMAIL.UPDATE, payload);
        if (res.data.status) {
          setNotification({
            visible : true,
            status : 's',
            message : t('http.success.updated.email'),
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
    setUpdateAllowed(false);
    setIsLoading(false);
  }

  const handleEdit = () => {
    setHttpStatus({});
    if (!hasVal) setHasVal(true);
    setCanUpdate(hasValid
      && hasValNewOld 
      && hasValConfirm
      && !Boolean(clientError.current_email.msg.length)
    );
    // Send btn -> diabled
    if (!hasUpdate) {
      setHasUpdate(true);
    }
  };

  const handleSubmitEdit = async () => {
    const payload = {
      current_email: current_email,
      email: newEmailRef.current.value,
      email_confirmation: confirmEmailRef.current.value,
    };

    try {
      const res = await axiosClient.post(ROUTES.account.EMAIL.EDIT, payload);
      if (await res.data.status) {
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
      emailValidation();
    }
    if (hasVal) {
      emailValidation();
    }
  }

  const emailValidation = useCallback(() => {
    const c_val = currentEmailRef.current.value;
    const n_val = newEmailRef.current.value;
    const co_val = confirmEmailRef.current.value;

    const c_check = {...ValidationManager({ email: c_val })};
    const n_check = {...ValidationManager({ email: n_val })};
    const co_check = {...ValidationManager({ email: co_val })};

    const c_checked = !Boolean(Object.keys(c_check).length);
    const n_checked = !Boolean(Object.keys(n_check).length);
    const co_checked = !Boolean(Object.keys(co_check).length);

    setClientError({
      current_email: { msg: c_checked ? c_check : [] },
      email: { msg: n_checked ? n_check : [] },
      email_confirmation: { msg: co_checked ? co_check : [] },
      pin: { msg: [] },
    });

    setHasValid(c_checked && n_checked && co_checked);
    setHasValNewOld(current_email !== n_val && current_email !== co_val);
    setHasValConfirm(n_val === co_val && n_val.length >= 8 && co_val.length >= 8);
  }, [hasValid, hasValNewOld, hasValConfirm]);

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
          <InputInchForwardField
            label={t('input.email_n')} 
            type='email'
            onChange={(e) => {
              handleChange(e);
              setEmail(e.target.value);
            }}
            value={email} 
            tabIndex={canUpdate ? -1 : 1} // canUpdate request state
            readOnly={canUpdate} // canUpdate request state
            ref={newEmailRef}
            err={hasVal ? !hasValConfirm || !hasValNewOld : false}
          />
        </div>
        <div className="col-md-6 col-lg-5">
          <InputInchForwardField
            label={t('input.email_nc')} 
            type='email'
            onChange={(e) => {
              handleChange(e);
              setEmailConfirmation(e.target.value);
            }}
            value={email_confirmation} 
            tabIndex={canUpdate ? -1 : 1} // canUpdate request state
            readOnly={canUpdate} // canUpdate request state
            ref={confirmEmailRef}
            err={hasVal ? !hasValConfirm || !hasValNewOld : false}
          />
        </div>
        <div className="col-md-6 col-lg-5">
          <InputInchForwardField
            label={t('input.email_c')} 
            type='email'
            onChange={handleChange}
            value={current_email} 
            tabIndex={-1} // canUpdate request state
            readOnly={true} // canUpdate request state
            ref={currentEmailRef}
            err={hasVal ? !hasValNewOld || Boolean(clientError.current_email.msg.length) : false}
          />
        </div>

      </div>
      <div className="row">

        {!canUpdate && <EmailLongAddition 
          checked={hasVal}
          valid={hasValid}
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
}

export default ChangeEmail
