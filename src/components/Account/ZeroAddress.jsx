import { useEffect } from "react";
import { useTranslation } from "react-i18next";

const ZeroAddress = ({ closeLoader, btn }) => {
  const {t} = useTranslation();

  useEffect(() => {
    closeLoader()
  }, []);

  return (
    <>
      <div 
        className="p mb-5 fw-semibold" 
        aria-description={t('zero_address')} 
        tabIndex={1}
      >{t('zero_address')}</div>

      {btn}
    </>
  )
}

export default ZeroAddress
