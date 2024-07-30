import { Checkmark, Xclose } from '../../components/icon/Icons'

const UserMessenger = ({ status, msg, timer }) => {

  return (
    <div className='xfs-um-modal'>
      <div className={'xfs-um-body ' + (status ? 'success' : 'error')}>
        <div className="xfs-um-clr">
          <div className='svg-body'>
            {status ?
             <Checkmark size={54} clr='3ecf2a' /> :
             <Xclose size={54} clr='d11f46' />}
          </div>
        </div>

        <div className='xfs-um-msg'>
          <div 
            aria-label={`${msg}${timer}`} 
            role="alert" 
            aria-live="assertive" 
            tabIndex={1} 
            className='h5 text text-center'
          >{msg}{timer}</div>
        </div>

      </div>
    </div>
  )
}

export default UserMessenger