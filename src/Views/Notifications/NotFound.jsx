import React from 'react'
import { useTranslation } from 'react-i18next'

const NotFound = () => {
  const {t} = useTranslation();

  return (
    <div className='text-center my-5 py-5'>
      <span className='h4 d-block fw-semibold mb-1' tabIndex={1} aria-label={`${t('not_found')} ${t('not_found_2')}`}>
        {t('not_found')}
        <br/>
        {t('not_found_2')}</span>
    </div>
  )
}

export default NotFound
