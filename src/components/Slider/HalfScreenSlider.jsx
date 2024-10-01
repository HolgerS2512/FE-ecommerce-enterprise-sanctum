import React, { useEffect, useRef } from 'react'
import CloseBtn from '../Helpers/CloseBtn'
import { useWindowSize } from '../../Modules/Functions'
import { useLayoutContext } from '../../Contexts/LayoutProvider';

const HalfScreenSlider = ({ children, isOpen, onClose, closeAriaLabel, sliderDescription, btnRef, showBtns }) => {
  // Common
  const { WCAG } = useLayoutContext();
  const { animated } = WCAG;
  const { width } = useWindowSize();
  const targetRef = useRef(null);
  const closeBtnRef = useRef(null);
  // Styles
  const inline = {
    top: (width > 992 ? 0 : 'unset'),
    bottom: (width > 992 ? 0 : ((isOpen ? '0' : '-100%'))),
    left: (width > 992 ? (isOpen ? '0' : '-100%') : 0),
    visibility: (isOpen ? 'visible' : 'hidden'),
    borderRight: (width > 992 ? '1px solid grey' : 'none'),
    maxWidth: (width > 992 ? 50 : 100) + '%',
    width: (width > 992 ? 'unset' : 100 + '%'),
    minWidth: (width > 400 ? 400 + 'px' : 0),
  }
  const inlineMain = {
    margin: width > 380 ? `1.5rem 1.25rem ${showBtns ? '83px' : '2rem'} 1.25rem` : `1.5rem .75rem ${showBtns ? '83px' : '2rem'} .5rem`,
  }

  useEffect(() => {
    if (inline.bottom == 0 && inline.left == 0) {
      setTimeout(() => targetRef.current.focus(), 50);
    }
  }, [inline.bottom, inline.left]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        targetRef.current && 
        !targetRef.current.contains(e.target) && 
        btnRef.current && 
        !btnRef.current.contains(e.target) && 
        isOpen
      ) {
        onClose();
      }
    };

    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('click', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <header 
      className={`fixed-top hhs${animated ? ' teio35s' : ''}`} 
      style={{ ...styles.header, ...inline }} 
      ref={targetRef} 
      tabIndex={1}
      role='slider'
      aria-label={sliderDescription}
    >
      <div className='position-absolute' style={styles.close} onClick={() => {closeBtnRef.current.click()}}>
        <CloseBtn aria-label={closeAriaLabel} onClick={onClose} uref={closeBtnRef} />
      </div>

      <div style={styles.container}>
        <div style={{ ...styles.main, ...inlineMain }}>
          {children}
        </div>
      </div>
    </header>
  )
}

const styles = {
  header: {
    backgroundColor: 'white',
    padding: 0,
    height: 100 + '%',
    overflow: 'hidden',
    zIndex: 7,
  },
  container: {
    overflowY: 'auto',
    height: 100 + '%',
  },
  main: {
    margin: '0 0 0 0',
    height: '100%',
  },
  close: {
    top: '-6px',
    right: '-4px',
    padding: '.75rem',
  }
}

export default HalfScreenSlider
