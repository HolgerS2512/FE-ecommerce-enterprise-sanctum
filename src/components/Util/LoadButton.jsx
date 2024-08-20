import BtnSpinner from "../Helpers/BtnSpinner"

const LoadButton = ({ isLoading, text, position, btnClass, children, disabled }) => {
  // Jumplink to start id='jts'
  let guard = true;
  const handleTabPress = (e) => {
    if (e.key === 'Shift') {
      guard = false;
      setTimeout(() => { guard = true }, 1000);
    }
    if (e.key === 'Tab' && guard) {
      const goal = document.querySelector('#jls') || false;
      if (goal) goal.focus();
    }
  };

  return (
    <div className={`w-100 d-flex justify-content-${position ?? 'end'} mt-md-4`}>

      {children}

      <button 
        id="jle"
        className='btn-nostyle xfs-btn' 
        type={isLoading ? 'button' : 'submit'}
        aria-label={text}
        aria-busy={isLoading}
        tabIndex={1}
        onKeyDown={handleTabPress}
        disabled={disabled ?? false}
      >
        <div className={'btn btn-dark' + (btnClass ? ` ${btnClass}` : '') + (disabled ? ' disabled' : '')}>
          {isLoading ? <BtnSpinner /> : text}
        </div>
      </button>
    </div>
  )
}

export default LoadButton
