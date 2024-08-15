import React from 'react'
import { useTranslation } from 'react-i18next';

const JumpLink = ({ role, link, tabIndex }) => {
  const {t} = useTranslation();

  return (
    <a 
      role={role} 
      href={`#${link}`} 
      className="src-only" 
      aria-label={t(`sro_${link}`)} 
      tabIndex={tabIndex ?? 1}
    >
      {t(`sro_${link}`)}
    </a>
  )
}

export default JumpLink
