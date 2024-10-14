import { useTranslation } from "react-i18next"
import { useLayoutContext } from "../../Contexts/LayoutProvider";

const ProductPrices = ({ fullPrice, currentPrice }) => {
  // Common
  const { WCAG } = useLayoutContext();
  const { colors } = WCAG;
  const {t} = useTranslation();
  // Kernel
  const hasReduce = fullPrice !== currentPrice;
  const fieldDistance = 2;

  const calcReduceInPercent = () => {
    return Math.round(100 - (currentPrice * 100 / fullPrice));
  }

  // Regular - NO Reduced result
  const regularPrice = (
    <div style={{ marginBottom: fieldDistance + 'rem' }}>
      <span 
        className="product-price"
      >
        {fullPrice} {t('currency_item')}
      </span> 

      <span 
        className="vat-included"
      >
        {t('VATincluded')}
      </span>
    </div>
  );

  // Reduced result
  const reducedPrice = (
    <div style={{ marginBottom: (fieldDistance - .12) + 'rem' }}>
      <div style={{ lineHeight: .75 }}>
        <span className={`${colors ? 'bg-reduced' : 'bg-secondary'} p-reduced`}>
          {t('upToPrice', { reduce: calcReduceInPercent() })}
        </span>
        <s 
          className="old-price"
        >
          {fullPrice} {t('currency_item')}
        </s> 
      </div>

      <span 
        className={`${colors ? 'text-reduced' : 'text-body-secondary'} product-price`}
      >
        {t('fromPrices')} {currentPrice} {t('currency_item')}
      </span>

      <span 
        className="vat-included"
      >
        {t('VATincluded')}
      </span>
    </div>
  );

  return (
    <>
      {/* test hidden after! */}{!hasReduce ? reducedPrice : regularPrice}{/* test hidden after! */}
      {hasReduce ? reducedPrice : regularPrice}
    </>
  )
}



export default ProductPrices
