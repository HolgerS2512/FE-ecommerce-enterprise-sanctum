import { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import axiosClient from '../../axios-clint';
import ROUTES from '../../Settings/ROUTES';

import BlankForm from '../BlankForm'
import HttpStatusMsg from '../../Views/Notifications/HttpStatusMsg';
import CheckboxText from '../Util/CheckboxText';
import { useNotification } from '../../Contexts/NotificationProvider';

const NewsletterSubscriber = ({ id, newsletter_subscriber, setUserProps }) => {
  // Common
  const { isLoading, setIsLoading } = useOutletContext();
  const { setNotification } = useNotification();
  const {t} = useTranslation();
  // Input states
  const [newsletter, setNewsletter] = useState(false);
  // States
  const [hasUpdate, setHasUpdate] = useState(true);
  const [btnLoader, setBtnLoader] = useState(false);
  // Errorhandling
  const [httpStatus, setHttpStatus] = useState({ visible: false });

  useEffect(() => {
    if (!isNaN(id)) {
      setNewsletter(newsletter_subscriber);
    }
  }, [isLoading]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setHttpStatus({});
    setBtnLoader(true);

    if (typeof newsletter === 'boolean') {

      try {
        const route = `${ROUTES.account.SUBSCRIBERS}/${id}`;
        const payload = { newsletter_subscriber: newsletter };
        const res = await axiosClient.put(route, payload);

        if (res.data.status) {
          setNotification({
            visible : true,
            status : 's',
            msg : res.data.message,
          });
          setUserProps(payload);
          setHasUpdate(true);
          setIsLoading(true);
        } 
      } catch (err) {
        const { message } = err.response.data;
        setHttpStatus({ visible: true, msg: message });
      }
    }
    setBtnLoader(false);
  }

  const handleChange = (e) => {
    const value = e.target.checked;
    const v = e.key === 'Enter' ? !value : value;
    setNewsletter((b) => !b);
    setHasUpdate(newsletter_subscriber === v);
  }

  return (
    <BlankForm
      onSubmit={handleSubmit}
      isLoading={btnLoader}
      submitBtnText={t('update')}
      btnPos='end'
      require={false}
      btnDisabled={hasUpdate}
    >
      {httpStatus.visible && <HttpStatusMsg msg={httpStatus.msg} />}
      <div className="row">

      <span tabIndex={1} className='p mb-4 fw-semibold'>{t('community_informations')}</span>

      <div className='mb-3'>
        <CheckboxText 
          text={t('yes_want_emails')} 
          isChecked={newsletter}
          setIsChecked={handleChange}
          name='newsletter'
        />
      </div>

      </div>
    </BlankForm>
  )
}

export default NewsletterSubscriber
