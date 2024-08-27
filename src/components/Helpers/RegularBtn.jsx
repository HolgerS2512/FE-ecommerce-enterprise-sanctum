
const RegularBtn = ({ 
  onClick, 
  ariaLabel, 
  tabIndex= 1, 
  position = 'start', 
  text, 
  color = 'dark', 
  disabled = false,
  classes, 
  type,
  style = {},
}) => {
  return (
    <div className={`text-${position}`}>
      <button 
        className={`btn-nostyle xfs-btn${classes ? ' ' + classes : ''}${disabled ? ' opacity-50' : ''}`}
        tabIndex={tabIndex}
        aria-label={ariaLabel}
        onClick={onClick}
        disabled={disabled}
        type={type ?? 'button'}
      >
        <div className={`btn btn-${color}`} style={style}>
          {text}
        </div>
      </button>
    </div>
  )
}

export default RegularBtn
