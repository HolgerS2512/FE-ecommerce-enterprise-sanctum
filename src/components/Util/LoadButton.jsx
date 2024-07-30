import BtnSpinner from "../Helpers/BtnSpinner"

const LoadButton = ({ isLoading, text, position, btnClass, children }) => {
  
  return (
    <div className={`w-100 d-flex justify-content-${position ?? 'end'} mt-md-4`}>

      {children}

      <button 
        className='btn-nostyle xfs-btn' 
        type={isLoading ? 'button' : 'submit'}
        aria-label={text}
        aria-busy={isLoading}
        tabIndex={1}
      >
        <div className={'btn btn-dark' + (btnClass ? ` ${btnClass}` : '')}>
          {isLoading ? <BtnSpinner /> : text}
        </div>
      </button>
    </div>
  )
}

export default LoadButton
