
const RegularBtn = ({ 
  onClick, 
  ariaLabel, 
  tabIndex= 1, 
  position = 'start', 
  text, 
  color = 'dark', 
  disabled = false,
  classes, 
}) => {
  return (
    <div className={`text-${position}`}>
      <button 
        className={`btn-nostyle xfs-btn${classes ? ' ' + classes : ''}`}
        tabIndex={tabIndex}
        aria-label={ariaLabel}
        onClick={onClick}
        disabled={disabled}
      >
        <div className={`btn btn-${color}`}>
          {text}
        </div>
      </button>
    </div>
  )
}

export default RegularBtn
