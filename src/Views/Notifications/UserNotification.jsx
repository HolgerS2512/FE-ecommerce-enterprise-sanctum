import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next'
import { Checkmark, Xclose, Warning } from '../../components/icon/Icons'

import CloseBtn from '../../components/Helpers/CloseBtn'

const UserNotification = ({ notification, onClose, reload = false }) => {
  const { msg, status } = notification;
  const [timer, setTimer] = useState(notification.timer ?? 8);
  const { t } = useTranslation();

  useEffect(() => nTimeout(timer), []);

  const getStatusClass = (s) => {
    let result = '';
    switch (s) {
      case 's': result = 'success'; break;
      case 'e': result = 'error'; break;
      case 'w': result = 'warning'; break;
      default: break;
    }
    return result;
  }

  const getStatusIcon = (s) => {
    let result = null;
    switch (s) {
      case 's': result = <Checkmark size={54} clr='3ecf2a' />; break;
      case 'e': result = <Xclose size={54} clr='d11f46' />; break;
      case 'w': result = <Warning size={60} clr='fff' />; break;
      default: break;
    }
    return result;
  }

  const nTimeout = (t) => {
		setTimer(t);
    if (t > 0) {
      setTimeout(() => {nTimeout(--t)}, 1000);
    } else {
      onClose();
      if (reload) window.location.reload();
    }
  }

  return (
    <div className='xfs-un-modal animated35s fade-notification'>
      <div className={`xfs-un-body ${getStatusClass(status)}`}>

        <div className="xfs-un-clr">
          <div className='svg-body'>
            {getStatusIcon(status)}
          </div>
        </div>

        <div className='xfs-un-msg'>
          <div className='xfs-un-msgc'>
            <p 
              aria-label={(msg.includes('SQLSTATE') ? t('http.5') : msg) + t('close_timer_msg', { timer })}
              role="alert" 
              aria-live="assertive"
              aria-atomic="true" 
              tabIndex={1} 
              className='h6 text text-center'
              >{msg.includes('SQLSTATE') ? t('http.5') : msg}
            </p>
            <p className='h6 text text-center'>{t('close_timer_msg', { timer })}</p>
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