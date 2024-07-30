import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';
import { Checkmark, Refresh, Xclose } from '../../components/icon/Icons';

import axiosClient from '../../axios-clint';
import ROUTES from '../../Settings/ROUTES';

const SendPinAgain = ({ tabIndex = 1, email, setHttpErr }) => {
  const THROTTLE = 60;
  const { t } = useTranslation();
  const [throttle, setThrottle] = useState(THROTTLE);
  const [status, setStatus] = useState({ visible: false });

  const handleSubmit = async (e) => {
    const currBtn = e.currentTarget;

    e.preventDefault();
    currBtn.classList.add('move');
    throttleBtn(throttle);
    setHttpErr({});
    setStatus({});

    try {
      const res = await axiosClient.post(ROUTES.auth.UPDATETOKEN, { email : email });
      if (res.data.status) {
        setStatus({ visible: true, status: res.data.status });
        currBtn.classList.remove('move');
      }
    } catch (err) {
      if (err.response.data) {
        const { message } = err.response.data;
        setHttpErr({ visible: true, msg: message });
        setStatus({ visible: true, status : err.response.data.status });
        currBtn.classList.remove('move');
      }
    }
  }

  const throttleBtn = (t) => {
    if (t > 0) {
      setThrottle(t - 1);
      setTimeout(() => {
        throttleBtn(t - 1);
      }, 1000);
    } else {
      setThrottle(THROTTLE);
    }
  }

  return (
    <div className='mb-4'>
      <div className='d-flex align-items-center justify-content-between' style={{ minHeight: '50px' }}>
        <div className='d-flex align-items-center'>
        
          <button 
            disabled={throttle !== THROTTLE}
            type='button'
            className={'btn-nostyle xfs-svg-clr'} 
            aria-label={throttle !== THROTTLE ? t('new_pin_in', { throttle }) : t('new_pin')}
            aria-busy={throttle !== THROTTLE}
            onClick={handleSubmit}
            tabIndex={tabIndex}
          >
            <Refresh size={36} />
          </button>

          <p className='mb-0  ms-3'>{throttle !== THROTTLE ? t('new_pin_in', { throttle }) : t('new_pin')}</p>

        </div>

        {status.visible && (status.status ?
          <Checkmark size={50} clr='198754' /> :
          <Xclose size={50} clr='d11f46' />)}

      </div>
    </div>
  )
}

export default SendPinAgain
