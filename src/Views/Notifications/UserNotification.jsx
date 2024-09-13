import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next'
import { Checkmark, Xclose, Warning } from '../../components/icon/Icons'

import CloseBtn from '../../components/Helpers/CloseBtn'
import HttpTranslator from '../../Modules/HttpTranslator';

const UserNotification = ({ notification, onClose, reload = false }) => {
  // Common
  const { t } = useTranslation();
  const targetRef = useRef(null);
  // Handling
  const [timer, setTimer] = useState(notification.timer ?? 8);
  const [statusMessage, setStatusMessage] = useState(null);
  const { status, message, error } = notification;
  // Optik
  const [statusIcon, setStatusIcon] = useState(null);
  const [statusClass, setStatusClass] = useState(null);

  useEffect(() => {
    setStatusMessage(message ?? t(HttpTranslator(error?.response)));
    setStatusClass(getStatusClass(status));
    setStatusIcon(getStatusIcon(status));
    nTimeout(timer);
  }, []);
  
  useEffect(() => targetRef.current.focus(), [notification.visible]);

  useEffect(() => {
    if (timer === 0) {
      onClose();
      if (reload) {
        window.location.reload();
      }
    }
  }, [timer]);

  const getStatusClass = (s) => {
    let result = '';
    switch (s) {
      case 's': result = 'success'; break;
      case 'w': result = 'warning'; break;
      case 'e': result = 'error'; break;
      default: break;
    }
    return result;
  }

  const getStatusIcon = (s) => {
    let result = null;
    switch (s) {
      case 's': result = <Checkmark size={54} clr='3ecf2a' />; break;
      case 'w': result = <Warning size={60} clr='fff' />; break;
      case 'e': result = <Xclose size={54} clr='d11f46' />; break;
      default: break;
    }
    return result;
  }

  const nTimeout = (t) => {
		setTimer(t);
    if (t > 0) {
      setTimeout(() => {nTimeout(--t)}, 1000);
    }
  }

  return (
    <div className='xfs-un-modal animated35s fade-notification'>
      <div className={`xfs-un-body ${statusClass}`}>

        <div className="xfs-un-clr">
          <div className='svg-body'>
            {statusIcon}
          </div>
        </div>

        <div className='xfs-un-msg'>
          <div className='xfs-un-msgc'>
            <p 
              ref={targetRef}
              aria-label={statusMessage}
              role="alert" 
              aria-live="assertive"
              aria-atomic="true" 
              tabIndex={1} 
              className='h6 text text-center ncss-focus'
            >{statusMessage}
            </p>
            <p tabIndex={1} className='h6 text text-center ncss-focus'>{t('close_timer_msg', { timer })}</p>
          </div>
          <CloseBtn onClick={onClose} />
        </div>

      </div>
    </div>
  )
}

export default UserNotification

// warning: ece91c
// error: d11f46
// success: 3ecf2a