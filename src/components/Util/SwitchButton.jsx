import React from 'react'
import { useLayoutContext } from '../../Contexts/LayoutProvider'
import { useTranslation } from 'react-i18next';

const SwitchButton = ({ name, checked = false, onChange, ariaLabel, tabIndex = 1 }) => {
  const { WCAG } = useLayoutContext();
  const { animated, colors } = WCAG;
  const {t} = useTranslation();

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const checkbox = document.getElementById(`cswID${name}`);
      checkbox.click();
    }
  }

  return (
      <div id='switch' className={`${colors ? '' : 'nocolor'}`}>
        {(!colors || !animated) && 
          <small className='me-2' style={{ marginTop: '.225rem' }}>{checked ? t('on') : t('off')}</small>
        }
        <input
          type="checkbox" 
          id={`cswID${name}`} 
          className='noevent notouch'
          name={name} 
          checked={checked ?? false}
          value={checked ?? false}
          onChange={onChange}
          aria-checked={checked ?? false}
        />
        <label 
          className="switch-label" 
          htmlFor={`cswID${name}`} 
          tabIndex={tabIndex} 
          aria-label={`${ariaLabel}`}
          role="checkbox"
          onKeyDown={handleKeyDown}
        >
          <span className={`noevent notouch${animated ? '' : ' noanimated'}`}>
            {animated && 
            <svg width="10px" height="10px" viewBox="0 0 10 10">
              <path d="M5,1 L5,1 C2.790861,1 1,2.790861 1,5 L1,5 C1,7.209139 2.790861,9 5,9 L5,9 C7.209139,9 9,7.209139 9,5 L9,5 C9,2.790861 7.209139,1 5,1 L5,9 L5,1 Z"></path>
            </svg>}
          </span>
        </label>    
      </div>
  )
}

export default SwitchButton
