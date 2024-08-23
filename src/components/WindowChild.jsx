import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next'
import RegularBtn from './Helpers/RegularBtn';

const WindowChild = ({ setQuest, setWindowInner }) => {
  const {t} = useTranslation();
  const targetRef = useRef(null);

  useEffect(() => {
    setTimeout(() => {
      targetRef.current.focus();
    }, 50);
  }, []);

  // Jumplink to LoadButton
  let guard = false;
  const handleTabPressEnd = (e) => {
    if (e.key === 'Shift') {
      guard = true;
      setTimeout(() => { guard = false }, 1500);
    }
    if (e.key === 'Tab' && !guard) {
      const goal = document.querySelector('#jlwis') || false;
      if (goal) goal.focus();
    }
  };

  let guard2 = false;
  const handleTabPressStart = (e) => {
    if (e.key === 'Shift') {
      guard2 = true;
      setTimeout(() => { guard2 = false }, 1500);
    }
    if (e.key === 'Tab' && guard2) {
      const goal = document.querySelector('#jlwie') || false;
      if (goal) goal.focus();
    }
  };

  const answer = () => setQuest(true);

  const cancel = () => setWindowInner(false);

  return (
    <div className='fixed-top bg-trans-black w-100 h-100 d-flex justify-content-center align-items-end align-items-sm-center no-action'>
      <div 
        className='window window-inner a15sd1ms fit-4r' 
        ref={targetRef}
      >

        <span 
          id='jlwis'
          tabIndex={1} 
          className='d-block my-3 px-2 h5 fw-semibold'
          aria-label={t('delete_address_action')}
          onKeyDown={handleTabPressStart}
        >{t('delete_address_action')}</span>

        <RegularBtn
          onClick={cancel} 
          ariaLabel={t('cancel')} 
          text={t('cancel')}
          classes='w-100'
          color="secondary"
        />
        <RegularBtn
          onClick={answer} 
          ariaLabel={t('delete')} 
          text={t('delete')}
          classes='w-100'
        />

        <span 
          tabIndex={1} 
          onKeyDown={handleTabPressEnd} 
          id='jlwie'
        ></span>

      </div>
    </div>
  )
}

export default WindowChild
