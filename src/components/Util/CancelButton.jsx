import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next"

const CancelButton = ({ link }) => {
  const { t } = useTranslation();
  return (
    <Link 
      className='btn-nostyle xfs-btn' 
      aria-label={t('cancel')}
      to={link}
    >
      <div className='me-2 mt-2 btn btn-light' style={{ fontWeight: 600 }}>
        {t('cancel')}
      </div>
    </Link>
  )
}

export default CancelButton
