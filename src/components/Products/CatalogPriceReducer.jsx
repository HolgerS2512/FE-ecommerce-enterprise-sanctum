import { useTranslation } from "react-i18next"
import { useLayoutContext } from "../../Contexts/LayoutProvider";

const CatalogPriceReducer = ({ fullPrice, currentPrice }) => {
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

  // Reduced result
  const reducedPrice = (
    <div style={{ marginBottom: (fieldDistance - .12) + 'rem' }}>
      <div style={{ lineHeight: .75 }}>
        <span className={`${colors ? 'bg-reduced' : 'bg-secondary'} p-reduced`}>
          {t('upToPrice', { reduce: calcReduceInPercent() })}
        </span>
      </div>
    </div>
  );

  return (
    <>
      {hasReduce && reducedPrice}
    </>
  )
}

export default CatalogPriceReducer
