import { useEffect, useRef, useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useLayoutContext } from '../Contexts/LayoutProvider';
import SwitchButton from './Util/SwitchButton';

const WacgSettings = () => {
  // Common
  const { WCAG, setWCAGuidlines } = useLayoutContext();
  const { animated } = WCAG;
  const { t } = useTranslation();
  // States
  const [isOpen, setIsOpen] = useState(false);
  const [scrollTracker, setScrollTracker] = useState(0);
  // Ref
  const targetRef = useRef(null);

  /*
  * Close component when scroll
  *
  */
  useEffect(() => {
    if (scrollTracker < -30) setIsOpen(false);
  }, [scrollTracker]);

  // Handle Outside Click
  const handleClickOutside = useCallback((e) => {
    if (targetRef.current && !targetRef.current.contains(e.target) && isOpen) {
      setIsOpen(false);
    }
  }, [isOpen]);

  // Handle Key Down
  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Escape' && isOpen) {
      setIsOpen(false);
    } else if (e.key === 'Enter') {
      setIsOpen((prev) => !prev);
      e.preventDefault();
    }
  }, [isOpen]);

  // Scroll tracker
  const checkIfOutOfView = useCallback(() => {
    if (isOpen && targetRef.current) {
      const rect = targetRef.current.getBoundingClientRect();
      setScrollTracker(rect.top);
    }
  }, [isOpen]);

  setInterval(checkIfOutOfView, 500);

  // Handle Change
  const handleChange = (e) => setWCAGuidlines(e.target.name, e.target.checked);

  // Handle Click
  const handleClick = (e) => {
    e.preventDefault();
    setIsOpen((prev) => !prev);
  };

  // Visibility Styles
  const visibility = isOpen ? { 
    top: document.querySelector('.wacg-search')?.offsetHeight + 14 + 'px',
  } : {};

  /*
  * Admininistration Events
  *
  */
  useEffect(() => {
    // Add Event Listeners
    if (isOpen) {
      document.addEventListener('click', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);

      // Cleanup
      return () => {
        document.removeEventListener('click', handleClickOutside);
        document.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [isOpen, handleClickOutside, handleKeyDown]);

  return (
    <div className='wacg-settings' ref={targetRef}>
      <a 
        className='wacg-search alltouch allevent nocaret noselect' 
        href='#'
        tabIndex={1} 
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        aria-description={t('wcag_settings')}
      >
        {t('wcag_short')}
      </a>

      <div 
        className={`wacg-container${animated ? '' : ' noanimated'}`} 
        style={visibility}
      >
        <div className='p mb-3 pe-3 no-action notouch'>
          <b>{t('wcag_settings')}</b>
        </div>
        {(WCAG && isOpen) && Object.keys(WCAG).map((gl, i) => (
          <div key={i} className='d-flex justify-content-between mb-2'>
            <div className='me-2 mt-1 text-nowrap no-action notouch'>{t(`wcag_${gl}`)}</div>
            <SwitchButton
              tabIndex={Number(isOpen)}
              name={gl}
              checked={WCAG[gl]}
              onChange={handleChange}
              ariaLabel={t(`wcag_${gl}`)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default WacgSettings;
