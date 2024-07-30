import { useTranslation } from "react-i18next";

const ImageAltMaker = ( values, ext ) => {
  const { t } = useTranslation();
  const company = t('company').toLowerCase().replaceAll(' ', '-');
  const after = t('seo_kw').toLowerCase().replaceAll(',', '').replaceAll(' ', '-');
  const maped = values.map((el) => t(el).toLowerCase().replace(' ', '-'));

  return `${maped.join('-')}-${company}-${after}-${ext}`;
}

export default ImageAltMaker
