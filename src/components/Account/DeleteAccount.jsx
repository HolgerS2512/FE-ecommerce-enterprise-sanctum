import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useNotification } from '../../Contexts/NotificationProvider';
import { useStateContext } from '../../Contexts/ContextProvider';

import ROUTES from '../../Settings/ROUTES';
import COMPANY from '../../Settings/COMPANY';
import axiosClient from '../../axios-clint';

import HttpStatusMsg from '../../Views/Notifications/HttpStatusMsg'
import RegularBtn from '../Helpers/RegularBtn';
import BlankForm from '../BlankForm';
import CheckboxText from '../Util/CheckboxText';

const companyName = COMPANY.name;

const DeleteAccount = ({ onClose }) => {
  // Common
  const { user, logout } = useStateContext();
  const { setNotification } = useNotification();
  const {t} = useTranslation();
  // Input
  const [destroy, setDestroy] = useState(false);
  // States
  const [hasUpdate, setHasUpdate] = useState(true);
  // Errorhandling
  const [httpStatus, setHttpStatus] = useState({ visible: false });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setHttpStatus({});

    if (typeof destroy === 'boolean') {

      try {
        const route = `${ROUTES.account.SETTINGS}/${user.id}`;
        const res = await axiosClient.delete(route);

        if (res.status === 200) {
          setNotification({
            visible : true,
            status : 's',
            msg : res.data.message,
          });
          logout();
        } 
      } catch (err) {
        setHttpStatus({ visible: true, msg: t('http.5') });
      }
      setDestroy(false);
      setHasUpdate(true);
    }
  }

  const handleChange = () => {
    setDestroy((b) => !b);
    setHasUpdate((b) => !b);
  }

  const deleteBtn = (
    <RegularBtn
      onClick={() => {}} 
      disabled={hasUpdate}
      position="end" 
      ariaLabel={t('delete_account')} 
      text={t('delete_account')}
      color='secondary'
      classes='pe-2'
      type='submit'
    />
  );

  return (
    <>
      <div>
        <span className='p fw-semibold regular-list'>{t('benefits_account_holders')}</span>
        <ul className='p fw-semibold regular-list'>
          <li>{t('benefits_fast_payment')}</li>
          <li>{t('benefits_personal_wishlist')}</li>
          <li>{t('benefits_exclusive_newsletter')}</li>
        </ul>

        <span className='p fw-semibold regular-list'>{t('consequence_delete_konto')}</span>
        <ul className='p fw-semibold regular-list'>
          <li>{t('consequence_no_action_account', {companyName})}</li>
          <li>{t('consequence_da_infos')}<Link tabIndex={1} className='rl-link' to={ROUTES.pages.CUSTOMERSERVICE} aria-label={t('customer_service')}>{t('customer_service')}</Link>{t('consequence_da_infoe')}</li>
        </ul>

        <span className='p fw-semibold'>{t('information_note_da', {companyName})}</span>
      </div>

      <BlankForm
        onSubmit={handleSubmit}
        isLoading={false}
        submitBtnText={t('cancel')}
        submitByMainBtn={false}
        mainBtnFn={onClose}
        btnPos='end'
        require={false}
        secondBtn={deleteBtn}
      >
        {httpStatus.visible && <HttpStatusMsg msg={httpStatus.msg} />}

        <div className='m-sm-3 mb-3'>
          <CheckboxText 
            text={t('checkbox_delete_account')} 
            isChecked={destroy}
            setIsChecked={handleChange}
            name='newsletter'
          />
        </div>

      </BlankForm>
    </>
  )
}

export default DeleteAccount
