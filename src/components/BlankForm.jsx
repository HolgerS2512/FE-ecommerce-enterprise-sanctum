import { useTranslation } from "react-i18next"
import LoadButton from "./Util/LoadButton"

const BlankForm = ({ 
    // form
    onSubmit, 
    autoComplete = 'on',
    children,
    // button
    isLoading,
    submitBtnText,
    loadBtnClass = false,
    btnPos = 'start',
    require = true,
    styles={},
    secondBtn,
    btnDisabled = false,
  }) => {
  const {t} = useTranslation();

  return (
    <>
      <form
        onSubmit={onSubmit}
        noValidate
        autoComplete={autoComplete}
        className="py-2"
        style={styles}
      >
        {children}

        {require && <small>{t('mark_required')}</small>}

        <LoadButton isLoading={isLoading} text={submitBtnText} btnClass={loadBtnClass} position={btnPos} disabled={btnDisabled}>
          {secondBtn ?? null}
        </LoadButton>
      </form>
    </>
  )
}

export default BlankForm
