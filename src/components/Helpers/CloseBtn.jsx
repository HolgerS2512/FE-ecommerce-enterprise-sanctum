import { useTranslation } from 'react-i18next'
import { Close } from '../icon/Icons';

const CloseBtn = ({ onClick }) => {
  const { t } = useTranslation();

  return (
    <div className='xfs-close'>
      <button 
        className='btn-nostyle' 
        tabIndex={1} 
        aria-label={t('close_msg')}
        onClick={onClick}
      >
        <div className='xfs-cbody'>
          <Close size={32} stroke={1.5} />
        </div>
      </button>
    </div>
  )
}

export default CloseBtn
