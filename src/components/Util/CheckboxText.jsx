import React, { useState } from 'react'

const CheckboxText = ({ 
  isChecked, 
  setIsChecked, 
  err = '', 
  text, 
  disabled = false, 
  setDisabled = true,
  name = 'thisCheck', 
  required = false,
}) => {
  const [isHover, setIsHover] = useState(false);

  const handleClick = () => {
    const spanEl = document.querySelector('#pulse-' + name);
    spanEl.classList.add('has-pulse');
    setTimeout(() => spanEl.classList.remove('has-pulse'), 250);
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleClick();
      setIsChecked(e);
      e.preventDefault();
    }
  }

  return (
    <label 
      className='form-check-label pulse-control d-flex'
      htmlFor={name}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <span id={'pulse-' + name} className={isHover ? 'pulse' : ''}></span>
      <div className="form-check">
        <input 
          className='form-check-input me-3'
          type="checkbox" 
          checked={isChecked} 
          id={name} 
          name={name} 
          onChange={setIsChecked}
          onKeyDown={handleKeyDown}
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
          onClick={handleClick}
          aria-labelledby={name}
          aria-checked={isChecked}
          aria-required={required}
          tabIndex={1}
          disabled={disabled}
        />
      </div>
      <span className={disabled && setDisabled ? 'opacity-50' : ''}>
        {text}
      </span>
    </label>
  )
}

export default CheckboxText
