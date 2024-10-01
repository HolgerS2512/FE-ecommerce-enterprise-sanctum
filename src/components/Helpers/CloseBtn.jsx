import { useTranslation } from 'react-i18next'
import { Close } from '../icon/Icons';
import { useLayoutContext } from '../../Contexts/LayoutProvider';

const CloseBtn = ({ onClick, ariaLabel = 'close_msg', uref = ()=>{} }) => {
  const { WCAG } = useLayoutContext();
  const { animated } = WCAG;
  const { t } = useTranslation();

  return (
    <div className='xfs-close'>
      <button 
        ref={uref}
        className='btn-nostyle' 
        tabIndex={1} 
        aria-label={t(ariaLabel)}
        onClick={onClick}
      >
        <div className={`xfs-cbody noevent notouch${animated ? '' : ' noanimated'}`}>
          <Close size={32} stroke={1.5} />
        </div>
      </button>
    </div>
  )
}

export default CloseBtn
