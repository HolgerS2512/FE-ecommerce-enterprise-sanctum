import { useState, forwardRef } from "react"

const InputInchForwardField = forwardRef(({ 
  col, 
  type, 
  label, 
  onChange, 
  err = false, 
  value, 
  tabIndex = 1, 
  name, 
  readOnly = false,
  noVal = true 
}, ref) => {
  const [changeFocus, setChangeFocus] = useState(false);

  return (
    <div className={col ?? ''}>
      <fieldset className='xfs-v1-control' style={noVal ? { minHeight: 80 + 'px' } : {}}>
        <div className={`xfs-v1-wrapper${changeFocus ? ' focus' : ''}${err ? ' error' : ''}${readOnly ? ' readonly' : ''}`}>
          <label 
            className={`xfs-v1-label${changeFocus || Boolean(value?.length) ? '' : ' active'}`} 
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
            ref={ref}
            onFocus={() => setChangeFocus(true)}
            onBlur={() => setChangeFocus(false)}
            aria-required="true"
            aria-invalid="false"
            aria-labelledby={label + '-label'}
            tabIndex={tabIndex}
          />
        </div>
      </fieldset>
    </div>
  )
})

export default InputInchForwardField
