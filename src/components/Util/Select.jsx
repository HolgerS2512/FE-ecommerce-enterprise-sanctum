import { forwardRef, useState } from 'react'
import ReactSelect from 'react-select'

const Select = forwardRef(({ 
  options, 
  onChange, 
  value, 
  name, 
  err = '', 
  readOnly, 
  col = false, 
  noRequire = false, 
  ariaLabel,
  tabIndex,
  limit = true,
}, ref) => {
  const [changeFocus, setChangeFocus] = useState(false);

  return (
    <fieldset className={'xfs-s1-control' + (col ? ' ' + col : '')} style={limit ? {} : { maxWidth: '100%' }}>
      <div className={`xfs-s1-wrapper ${changeFocus ? ' focus' : ''}${Boolean(err?.length) ? ' error' : ''}${readOnly ? ' readonly' : ''}`}>
        <span className={`xfs-s1-label ${changeFocus || (Boolean(value) || Boolean(ref?.current?.getValue()[0]?.value)) ? '' : ' active'}${noRequire ? ' noRequire' : ''}`}>{name}</span>
        <ReactSelect 
          placeholder=''
          tabIndex={tabIndex ?? 1}
          setValue={value}
          onChange={onChange}
          options={options} 
          ref={ref}
          onFocus={() => setChangeFocus(true)}
          onBlur={() => setChangeFocus(false)}
          theme={(theme) => ({
            ...theme,
            colors: {
              ...theme.colors,
              primary25: '#d9d9d9',
              primary: 'black',
              
            },
          })}
          aria-label={ariaLabel}
          aria-invalid={Boolean(err.length)}
          aria-required={!noRequire}
        />
      </div>
    </fieldset>
  )
})

export default Select