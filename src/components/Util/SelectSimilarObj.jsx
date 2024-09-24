import React, { useState, useEffect, useRef } from 'react';

const SelectSimilarObj = ({ options = [] }) => {
  const [selectedOption, setSelectedOption] = useState(null); // Standardmäßig die erste Option
  const [isOpen, setIsOpen] = useState(false); // Zustand für Dropdown-Sichtbarkeit
  const selectRef = useRef(null); // Referenz auf das Select-Element

  // Event-Listener für Klick außerhalb des Select-Felds zum Schließen des Dropdowns
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (selectRef.current && !selectRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    console.log(selectedOption)
  }, [selectedOption]);

  // Funktion zum Öffnen/Schließen des Dropdowns
  const toggleDropdown = () => setIsOpen(!isOpen);

  // Auswahl einer Option
  const handleOptionClick = (opt) => {
    setSelectedOption(opt.value);
    setIsOpen(false); // Dropdown schließen nach Auswahl
  };
  
  return (
    <div className="select-similar-container">
      <div className="similar-select" ref={selectRef} tabIndex={1}>

        {/* Der sichtbare ausgewählte Bereich */}
        <div className={`select-display ${isOpen ? 'select-arrow-active' : ''}`} onClick={toggleDropdown}>
          Sortiert
        </div>

        {/* Dropdown-Liste der Optionen */}
        {isOpen && (
          <div className="select-items">
            {options.map((opt, i) => (
              <div
                key={i}
                tabIndex={1}
                className={`similar-option ${opt.name === selectedOption ? 'same-as-selected' : ''}`}
                onClick={() => handleOptionClick(opt)}
              >
                {opt.name}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default SelectSimilarObj
