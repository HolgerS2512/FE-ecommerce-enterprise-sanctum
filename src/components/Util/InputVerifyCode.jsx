import { useState } from "react"
import { useTranslation } from "react-i18next";
import { postAjax } from '../../Modules/Ajax';
import { Refresh, Checkmark, Xclose } from '../icon/Icons';

import ROUTES from '../../Settings/ROUTES';

const InputVerifyCode = ({ col, label, onChange, err, value, nextTab = 1, noVal, setHttpErr, emailVal }) => {
  const THROTTLE = 60;
  const { t } = useTranslation();
  const [changeFocus, setChangeFocus] = useState(false);
  const [throttle, setThrottle] = useState(THROTTLE);
  const [status, setStatus] = useState({ visible: false });

  const handleSubmit = async (e) => {
    if (throttle !== THROTTLE) return;
    const btn = e.currentTarget;

    handleCss(btn);
    throttleBtn(throttle);
    clear();

    postAjax(ROUTES.auth.UPDATETOKEN, { email : emailVal }, async (resp) => {
      const data = await resp;
      const json = await JSON.parse(data.response);

      setStatus({ visible: true, status: json.status });

      if (data.status !== 200) {
        setHttpErr({ visible: true, msg: json.message });
      }
      btn.classList.remove('move');
    });
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

  const clear = () => {
    setHttpErr({});
    setStatus({});
  }

  const handleCss = (btn) => {
    btn.classList.add('pulse', 'move');
    setTimeout(() => btn.classList.remove('pulse'), 250);
  }

  return (
    <div className={col ?? ''}>
      <fieldset className='xfs-v1-control' style={noVal ? { minHeight: 62 + 'px' } : {}}>
        <div className='xfs-v1-throttle'>
          <p className='mt-1 ms-1 mb-0'>{throttle !== THROTTLE ? t('new_pin_in', { throttle }) : ''}</p>
          {(status.visible && throttle !== THROTTLE) && (status.status ?
            <Checkmark size={50} clr='198754' /> :
            <Xclose size={50} clr='d11f46' />)}
        </div>
        <div className={`xfs-v1-wrapper${changeFocus ? ' focus' : ''}${Boolean(err?.length) ? ' error' : ''}`}>
          <label 
            className={`xfs-v1-label${changeFocus || Boolean(value?.length) ? '' : ' active'}`} 
            htmlFor={label} id={label + '-label'}
          >{label}
          </label>
          <input 
            required
            id={label} 
            className='xfs-v1-input'
            type='text'
            onChange={onChange} 
            value={value}
            onFocus={() => setChangeFocus(true)}
            onBlur={() => setChangeFocus(false)}
            aria-required="true"
            aria-invalid="false"
            aria-labelledby={label + '-label'}
            tabIndex={nextTab}
          />
            <button 
              disabled={throttle !== THROTTLE}
              type='button'
              className='btn-nostyle xfs-svg-rotate'
              aria-label={throttle !== THROTTLE ? t('new_pin_in', { throttle }) : t('new_pin')}
              aria-busy={throttle !== THROTTLE ? t('new_pin_in', { throttle }) : ''}
              onClick={handleSubmit}
              tabIndex={nextTab}
            >
              <Refresh size={28} />
            </button>
        </div>        

        {(!noVal && Boolean(err?.length)) && <p 
          tabIndex={nextTab}
          className='xfs-v1-i-fb'
          aria-errormessage={err ?? ''}
        >{err}</p>}

      </fieldset>
    </div>
  )
}

export default InputVerifyCode
