import { useState, forwardRef } from "react"
import { useTranslation } from "react-i18next";
import { VisibilityOff, Visibility } from '../icon/Icons';

const PasswordForwardField = forwardRef(({ 
  col, 
  label, 
  onChange, 
  err = false, 
  value, 
  tabIndex, 
  noVal = true, 
  readOnly = false, 
  name = 'password', 
  autoComplete = 'current-password',
}, ref) => {
  const { t } = useTranslation();
  const [changeFocus, setChangeFocus] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = (e) => {
    const el = e.currentTarget;
    setShowPassword((show) => !show);

    if (el.type === 'button') {
      el.classList.add('pulse');
      setTimeout(() => el.classList.remove('pulse'), 250);
    }
  }

  const handleMouseDown = (e) => e.preventDefault();

  const cLabel = () => name.toLowerCase().replaceAll('_', '-');

  return (
    <div className={col ?? ''}>
      <fieldset className='xfs-v1-control' style={noVal ? { minHeight: 80 + 'px' } : {}}>
        <div className={`xfs-v1-wrapper${changeFocus ? ' focus' : ''}${err ? ' error' : ''}${readOnly ? ' readonly' : ''}`}>
          <label 
            className={`xfs-v1-label${changeFocus || Boolean(value.length) ? '' : ' active'}`} 
            htmlFor={cLabel()} id={cLabel() + '-label'}
          >{label}
          </label>
          <input 
            readOnly={readOnly}
            required
            id={cLabel()} 
            name={name}
            className='xfs-v1-input'
            type={showPassword ? 'text' : 'password'}
            onChange={onChange} 
            value={value}
            ref={ref}
            onFocus={() => setChangeFocus(true)}
            onBlur={() => setChangeFocus(false)}
            aria-required="true"
            aria-invalid="false"
            aria-labelledby={cLabel() + '-label'}
            tabIndex={tabIndex ?? 1}
            autoComplete={autoComplete}
          />
            <button 
              className='btn-nostyle' 
              type='button'
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDown}
              aria-description={t('pwd_src_only')}
              aria-current={!showPassword ? t('pwd_visible') : t('pwd_hidden')}
              tabIndex={tabIndex ?? 1}
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </button>
        </div>

      </fieldset>
    </div>
  )
})

export default PasswordForwardField
