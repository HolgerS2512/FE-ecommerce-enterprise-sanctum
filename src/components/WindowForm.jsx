import { useRef, useEffect, useState } from "react";
import CloseBtn from "./Helpers/CloseBtn";

const WindowForm = ({ children, open, onClose, h1 }) => {
  const targetRef = useRef(null);
  const [documentRead, setDocumentread] = useState(false);

  useEffect(() => {
    if (documentRead && open) {
      const windowEl = document.querySelector('.window');
      const outlet = document.querySelector('.outlet');
      
      // Startfocus on this window
      targetRef.current.focus();

      // Optimize window height
      if (windowEl.offsetHeight - 32 < outlet.offsetHeight) {
        windowEl.style.height = windowEl.offsetHeight + 'px';
      } else if (window.screen.height < 960 && window.screen.width < 960) {
        windowEl.style.height = '100%';
      }
    }
  }, [open, documentRead]);

  // Jumplink to LoadButton
  let guard = false;
  const handleTabPress = (e) => {
    if (e.key === 'Shift') {
      guard = true;
      setTimeout(() => { guard = false }, 1500);
    }
    if (e.key === 'Tab' && guard) {
      const goal = document.querySelector('#jle') || false;
      if (goal) goal.focus();
    }
  };

  const primaryWindow = 'fixed-top bg-trans-black w-100 h-100 d-flex justify-content-center align-items-end align-items-sm-center no-action';

  return (
    <div className={open ? primaryWindow : 'd-none'}>
      <div className="window a15sd1ms fit-4r">

        <div className='mb-3 d-flex justify-content-between align-items-center pe-3 pe-sm-4'>
          <span
            className="h4 fw-semibold me-5 pe-2"
            tabIndex={1} 
            aria-label={h1}
            ref={targetRef}
            id="jls"
            onKeyDown={handleTabPress}
          >{h1}</span>

          <CloseBtn onClick={onClose} ariaLabel='close_window' />
        </div>

        <div className="outlet">
          {children}
        </div>
        
        {!documentRead && setDocumentread(true)}
      </div>
    </div>
  )
}

export default WindowForm
