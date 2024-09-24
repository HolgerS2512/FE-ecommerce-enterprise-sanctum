import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowDown } from '../icon/Icons';

const SelectSimilarArray = ({ 
  options = [], 
  selectedOption, 
  setSelectedOption, 
  dropX = { right: 0 }, 
  name = 'sort',
}) => {
  // Common
  const {t} = useTranslation(); 
  // Kernel
  const [isOpen, setIsOpen] = useState(false); // Zustand für Dropdown-Sichtbarkeit
  const selectRef = useRef(null); // Referenz auf das Select-Element

  // Event-Listener für Klick außerhalb des Select-Felds zum Schließen des Dropdowns
  useEffect(() => {
    const handleClickOutside = (e) => {
      // console.log(e.key)
      // if (e.key === undefined) return;
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

  // Funktion zum Öffnen/Schließen des Dropdowns
  const toggleDropdown = (e) => {
    if (e.key !== undefined && e.key !== 'Enter') return;
    setIsOpen(!isOpen);
  }

  // Auswahl einer Option
  const handleOptionClick = (opt, e = {}) => {
    if (e.key !== undefined && e.key !== 'Enter') return;
    setSelectedOption(opt);
    setIsOpen(false); // Dropdown schließen nach Auswahl
  };

  return (
    <div className="select-similar-container">
      <button 
        className="similar-select btn-nostyle" 
        ref={selectRef} 
        tabIndex={1} 
        onClick={toggleDropdown}
        onKeyDown={toggleDropdown}
        role="combobox" 
        aria-expanded={`${isOpen}`} 
        aria-haspopup="listbox" 
        aria-controls={`${name}-box`} 
        aria-autocomplete="list"
        aria-activedescendant={selectedOption}
      >

        {/* Der sichtbare ausgewählte Bereich */}
        <div className='select-display'>
          {t('sorted_by')}{selectedOption !== null ? ':' : ''} 
          { selectedOption !== null && 
            <span className='ms-2' style={{ color: 'rgb(114, 114, 114)' }}>{t(selectedOption)}</span>
          }
          <div className={`ms-2 no-action teio15s similar-arrow${isOpen?' arrow-up':''}`} style={isOpen ? { transform: 'rotate(180deg)' } : {}}><ArrowDown /></div>
        </div>

        {/* Dropdown-Liste der Optionen */}
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

export default SelectSimilarArray
