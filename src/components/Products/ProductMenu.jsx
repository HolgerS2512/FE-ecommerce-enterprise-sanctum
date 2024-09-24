import React, { useRef } from 'react'
import { useTranslation } from 'react-i18next';
import SelectSimilarObj from '../Util/SelectSimilarObj';
import SelectSimilarArray from '../Util/SelectSimilarArray';

const optionsTest = [
  { name: 'Select car:', value: '0' },
  { name: 'Audi', value: '1' },
  { name: 'BMW', value: '2' },
  { name: 'Ford', value: '3' },
  { name: 'Honda', value: '4' },
  { name: 'Jaguar', value: '5' },
  { name: 'Mercedes', value: '6' },
]

const ProductMenu = ({ sortOptions }) => {
  // Common
  const {t} = useTranslation();

  return (
    <div>
      {/* <SelectSimilarObj options={optionsTest} /> */}
      <SelectSimilarArray options={sortOptions} />
    </div>
  )
}

export default ProductMenu
