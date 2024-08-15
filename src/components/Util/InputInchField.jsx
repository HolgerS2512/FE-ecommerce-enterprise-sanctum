import { useState } from "react"

const InputInchField = ({ 
  col, 
  type, 
  label, 
  onChange, 
  err = '', 
  value, 
  tabIndex = 1, 
  name, 
  readOnly = false,
  noVal,
  noRequire = false,
  limit = true,
}) => {
  const [changeFocus, setChangeFocus] = useState(false);

  return (
    <div className={col ?? ''}>
      <fieldset className='xfs-v1-control' style={noVal ? { minHeight: 80 + 'px' } : {} && limit ? {} : { maxWidth: '100%' }}>
        <div className={`xfs-v1-wrapper${changeFocus ? ' focus' : ''}${Boolean(err.length) ? ' error' : ''}${readOnly ? ' readonly' : ''}`}>
          <label 
            className={`xfs-v1-label${changeFocus || Boolean(value?.length) ? '' : ' active'}${noRequire ? ' noRequire': ''}`} 
            htmlFor={label} id={label + '-label'}
          >{label}
          </label>
          <input 
            required
            id={label} 
            name={name}
            className='xfs-v1-input'
            type={type ?? 'text'}
            onChange={onChange} 
            value={value}
            onFocus={() => setChangeFocus(true)}
            onBlur={() => setChangeFocus(false)}
            aria-required={!noRequire}
            aria-invalid={Boolean(err.length)}
            aria-labelledby={label + '-label'}
            tabIndex={tabIndex}
          />
        </div>
        {!noVal && Boolean(err?.length) && <p 
          tabIndex={tabIndex}
          className='xfs-v1-i-fb'
          aria-readonly={err ?? ''}
        >{err}</p>}
      </fieldset>
    </div>
  )
}

export default InputInchField
