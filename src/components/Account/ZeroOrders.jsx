import { useTranslation } from "react-i18next";

const ZeroOrders = () => {
  const {t} = useTranslation();

  return (
    <div 
      className="p mb-5 fw-semibold" 
      aria-description={t('zero_orders')} 
      tabIndex={1}
    >{t('zero_orders')}</div>
  )
}

export default ZeroOrders
