import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next";
import { Refresh, Checkmark, Xclose } from '../icon/Icons';

const InputPinCode = ({ col, label, onChange, err, value, tabIndex = 1, noVal, onSubmit, response }) => {
  const THROTTLE = 60;
  const { t } = useTranslation();
  const [changeFocus, setChangeFocus] = useState(false);
  const [throttle, setThrottle] = useState(THROTTLE);
  const [status, setStatus] = useState({ visible: false });
  const [documentReader, setDocumentReader] = useState(false);
  const [btn, setBtn] = useState({});

  useEffect(() => {
    if (documentReader) {
      setTimeout(() => {
        setBtn(document.querySelector('.xfs-btn'));
        handleClick();
      }, 100);
    }
  }, []);

  useEffect(() => {
    if (documentReader && response.visible) {
      setStatus({ visible: true, status: response.status });
      btn.classList.remove('move');
    }
  }, [response]);

  const handleClick = async (e = false) => {
    if (throttle !== THROTTLE) return;
    const btn = e.currentTarget || document.querySelector('.xfs-btn');
    handleCss(btn);
    throttleBtn(throttle);
    setStatus({});
    onSubmit();
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
            name='pin'
            onChange={onChange} 
            value={value}
            onFocus={() => setChangeFocus(true)}
            onBlur={() => setChangeFocus(false)}
            aria-required="true"
            aria-invalid={Boolean(err?.length) ? true : false}
            aria-labelledby={label + '-label'}
            tabIndex={tabIndex}
          />
          <button 
            disabled={throttle !== THROTTLE}
            type='button'
            className='xfs-btn btn-nostyle xfs-svg-rotate'
            aria-label={throttle !== THROTTLE ? t('new_pin_in', { throttle }) : t('new_pin')}
            aria-busy={throttle !== THROTTLE ? t('new_pin_in', { throttle }) : ''}
            onClick={handleClick}
            tabIndex={tabIndex}
          >
            <Refresh size={28} />
          </button>
        </div>        
        {Boolean(err?.length) && 
          <div 
            className="ms-1 mt-1 msg-error"
            aria-label={err}
            tabIndex={tabIndex}
          >{err}</div>}
        {!documentReader && setDocumentReader(true)}

      </fieldset>
    </div>
  )
}

export default InputPinCode
