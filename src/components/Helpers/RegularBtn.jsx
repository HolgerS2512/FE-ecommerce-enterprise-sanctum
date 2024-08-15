
const RegularBtn = ({ onClick, ariaLabel, tabIndex= 1, position = 'start', text, color = 'dark' }) => {
  return (
    <div className={`text-${position}`}>
      <button 
        className={`btn btn-${color} xfs-btn`}
        tabIndex={tabIndex}
        aria-label={ariaLabel}
        onClick={onClick}
      >{text}</button>
    </div>
  )
}

export default RegularBtn
