import { useEffect } from "react";
import { useTranslation } from "react-i18next";

const ZeroPaymentMeths = ({ closeLoader, btn }) => {
  const {t} = useTranslation();

  useEffect(() => {
    closeLoader()
  }, []);

  return (
    <>
      <div 
        className="p mb-5 fw-semibold" 
        aria-description={t('zero_payment_meths')} 
        tabIndex={1}
      >{t('zero_payment_meths')}</div>

      {btn}
    </>
  )
}

export default ZeroPaymentMeths
