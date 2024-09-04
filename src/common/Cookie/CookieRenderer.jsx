import { useTranslation } from "react-i18next";

const CookieRenderer = ({ data }) => {
  const { slug, description, max_storage_period, unit, type } = data;
  const {t} = useTranslation();

  return (
    <>
      <li className="mb-2">
        <b className="fw-semibold">{`${t('cookie.name')}: `}</b>
        <span>{slug}</span>
      </li>

      <li className="mb-1">
        <p>{t(`cookie.${description}`)}</p>
      </li>

      <li className="mb-2">
        <b className="fw-semibold">{`${t('cookie.max_storage')}: `}</b>
        {isNaN(max_storage_period) ? t(`cookie.${max_storage_period}`) : max_storage_period}{unit !== null && ` ${t(`cookie.${unit}`)}`}
      </li>

      <li>
        <b className="fw-semibold">{`${t('cookie.save_method')}: `}</b>
        {type}
      </li>
    </>
  )
}

export default CookieRenderer
