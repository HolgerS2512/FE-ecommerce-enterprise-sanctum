import { useState } from "react"

const InputInchText = ({ 
  col, 
  label, 
  onChange, 
  err = '', 
  value, 
  nextTab = 1, 
  name, 
  readOnly = false,
  noVal,
  noRequire = false,
}) => {
  const [changeFocus, setChangeFocus] = useState(false);

  return (
    <div className={col ?? ''}>
      <fieldset className='xfs-v1-control xfs-v1t-control' style={noVal ? { minHeight: 80 + 'px' } : {}}>
        <div className={`xfs-v1-wrapper${changeFocus ? ' focus' : ''}${Boolean(err?.length) ? ' error' : ''}${readOnly ? ' readonly' : ''}`}>
          <label 
            className={`xfs-v1-label${changeFocus || Boolean(value.length) ? '' : ' active'}${noRequire ? ' noRequire': ''}`} 
            htmlFor={label} id={label + '-label'}
          >{label}
          </label>
          <textarea 
            required
            id={label} 
            name={name}
            className='xfs-v1-input'
            onChange={onChange} 
            value={value}
            onFocus={() => setChangeFocus(true)}
            onBlur={() => setChangeFocus(false)}
            aria-required="true"
            aria-invalid="false"
            aria-labelledby={label + '-label'}
            tabIndex={nextTab}
            rows={6}
            cols='auto'
          />
        </div>
        {!noVal && Boolean(err?.length) && <p 
          tabIndex={nextTab}
          className='xfs-v1-i-fb'
          aria-readonly={err ?? ''}
        >{err}</p>}
      </fieldset>
    </div>
  )
}

export default InputInchText
