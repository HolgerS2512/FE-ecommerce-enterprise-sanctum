import { useTranslation } from "react-i18next"
import { useLayoutContext } from "../../Contexts/LayoutProvider";

const CatalogPrice = ({ fullPrice, currentPrice }) => {
  // Common
  const { WCAG } = useLayoutContext();
  const { colors } = WCAG;
  const {t} = useTranslation();
  // Kernel
  const hasReduce = fullPrice !== currentPrice;
  const fieldDistance = 2;

  // Regular - NO Reduced result
  const regularPrice = (
    <div style={{ marginBottom: fieldDistance + 'rem' }}>
      <span 
        className="product-price"
      >
        {fullPrice} {t('currency_item')}
      </span> 
    </div>
  );

  // Reduced result
  const reducedPrice = (
    <div style={{ marginBottom: fieldDistance + 'rem' }}>
      <span 
        className={`${colors ? 'text-reduced' : 'text-body-secondary'} product-price`}
      >
        {currentPrice} {t('currency_item')}
      </span>

      <s 
        className="old-price"
      >
        {fullPrice} {t('currency_item')}
      </s> 
    </div>
  );

  return (
    <>
      {hasReduce ? reducedPrice : regularPrice}
    </>
  )
}

export default CatalogPrice
