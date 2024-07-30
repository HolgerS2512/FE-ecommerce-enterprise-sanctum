import CancelButton from '../Util/CancelButton';
import LoadButton from '../Util/LoadButton';

const AuthForm = ({ children, onSubmit, isLoading, h1, extra, beforeH1, autoComplete, submitBtnText, loadBtnClass, cancel }) => {
  return (
    <div className='auth-f-wr'>
      {beforeH1}
      <p className='h1 mb-3 mb-md-4' tabIndex={1} aria-label={h1}>{h1}</p>

      {extra}

      <form
        onSubmit={onSubmit}
        noValidate
        autoComplete={autoComplete ?? 'on'}
      >
        {children}
        
        <LoadButton isLoading={isLoading} text={submitBtnText} btnClass={loadBtnClass ?? false}>
          {cancel ? <CancelButton link={cancel} /> : null}
        </LoadButton>
      </form>

    </div>
  )
}

export default AuthForm
