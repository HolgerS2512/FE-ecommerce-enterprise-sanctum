import { useTranslation } from "react-i18next";

const ZeroAddress = () => {
  const {t} = useTranslation();

  return (
    <div 
      className="p mb-5 fw-semibold" 
      aria-description={t('zero_address')} 
      tabIndex={1}
    >{t('zero_address')}</div>
  )
}

export default ZeroAddress
