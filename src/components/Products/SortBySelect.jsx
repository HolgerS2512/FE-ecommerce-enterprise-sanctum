import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowDown } from '../icon/Icons';

const SortBySelect = ({ 
  options = [], 
  selectedOption, 
  setSelectedOption, 
  dropX = { right: 0 }, 
  name = 'sort',
  classes = '',
}) => {
  // Common
  const {t} = useTranslation(); 
  // Kernel
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef(null);

  // Event listener for click outside the select field to close the dropdown
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (selectRef.current && !selectRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('click', handleClickOutside);
    document.addEventListener('keydown', handleClickOutside);
    document.addEventListener('blur', handleClickOutside);
    document.addEventListener('visibilitychange', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
      document.removeEventListener('keydown', handleClickOutside);
      document.removeEventListener('blur', handleClickOutside);
      document.removeEventListener('visibilitychange', handleClickOutside);
    };
  }, []);

  // Function to open/close the dropdown
  const toggleDropdown = (e) => {
    setIsOpen(!isOpen);
  }
  const toggleDropdownKB = (e) => {
    if (e.key === 'Enter' || e.key === 'Escape') setIsOpen(!isOpen);
    e.preventDefault();
  }

  // Selecting an option
  const handleOptionClick = (opt, e = {}) => {
    if (e.key !== undefined && e.key !== 'Enter') return;
    setSelectedOption(opt);
    setIsOpen(false); // Close dropdown after selection
  };

  return (
    <div className="select-similar-container">
      <button 
        className={`similar-select btn-nostyle ${classes}`}
        ref={selectRef} 
        tabIndex={1} 
        onClick={toggleDropdown}
        onKeyDown={toggleDropdownKB}
        role="combobox" 
        aria-expanded={`${isOpen}`} 
        aria-haspopup="listbox" 
        aria-controls={`${name}-box`} 
        aria-autocomplete="list"
        aria-activedescendant={selectedOption}
      >

        {/* The visible selected area */}
        <div className='select-display no-action notouch'>
          {t('sorted_by')}{selectedOption !== null ? ':' : ''} 
          { selectedOption !== null && 
            <span className='ms-2' style={{ color: 'rgb(114, 114, 114)' }}>{t(selectedOption)}</span>
          }
          <div className={`ms-2 teio15s similar-arrow${isOpen?' arrow-up':''}`} style={isOpen ? { transform: 'rotate(180deg)' } : {}}><ArrowDown /></div>
        </div>

        {/* Dropdown list of options */}
        {isOpen && (
          <div className="select-items" style={dropX} role="listbox" id={`${name}-box`}>
            {options.map((opt, i) => (
              <div
                role='option'
                id={opt}
                aria-selected={selectedOption === opt}
                key={i}
                tabIndex={1}
                className={`similar-option ${opt === selectedOption ? 'same-as-selected' : ''}`}
                onClick={() => handleOptionClick(opt)}
                onKeyDown={(e) => handleOptionClick(opt, e)}
              >
                {t(opt)}
              </div>
            ))}
          </div>
        )}
      </button>
    </div>
  )
}

export default SortBySelect
