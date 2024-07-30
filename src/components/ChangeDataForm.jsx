import { useTranslation } from "react-i18next"
import LoadButton from "./Util/LoadButton"

const ChangeDataForm = ({ 
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
  }) => {
    const {t} = useTranslation()
    // useState()
  return (
    <>
      <form
        onSubmit={onSubmit}
        noValidate
        autoComplete={autoComplete}
        className="py-2"
      >
        {children}

        {require && <small>{t('mark_required')}</small>}
        <LoadButton isLoading={isLoading} text={submitBtnText} btnClass={loadBtnClass} position={btnPos} />
      </form>
    </>
  )
}

export default ChangeDataForm
